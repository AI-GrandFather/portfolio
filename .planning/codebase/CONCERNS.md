# Codebase Concerns

**Analysis Date:** 2026-05-30

## Tech Debt

**In-memory rate limiting on public API routes:**
- Issue: Public endpoint throttling uses module-local `Map` buckets in both API route files. This is simple and works in a single long-lived Node process, but it is not shared across serverless instances, deployment regions, restarts, or horizontally scaled workers.
- Files: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Impact: Abuse controls can be bypassed by cold starts, multiple instances, region fan-out, or deployment restarts. The chat endpoint can still spend OpenAI budget and the contact endpoint can still send repeated emails under distributed traffic.
- Fix approach: Keep the local limit as a fallback, but add a shared production limiter backed by the deployment platform, Redis/KV, Upstash, Vercel KV, or another centralized store. Apply separate quotas for IP, endpoint, and global daily budget.

**Duplicated endpoint plumbing:**
- Issue: IP extraction, fixed-window rate limiting, JSON parsing, and error response shape are implemented separately in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Files: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Impact: Security and validation changes must be duplicated manually. Future endpoint additions can easily drift from the intended abuse-control behavior.
- Fix approach: Extract shared server helpers into `app/api/_lib/` or `app/lib/server/`, covering `getClientIp`, `rateLimit`, JSON parsing, and consistent error responses. Keep route-specific validation in each route.

**Homepage content is hard-coded in a large page module:**
- Issue: Portfolio projects, capability labels, process copy, and layout rendering all live inside `app/page.tsx`.
- Files: `app/page.tsx`, `PRODUCT_INVENTORY.md`, `PROJECT_NOTES.md`
- Impact: Content updates require code edits and can drift from the source-of-truth documents. The page becomes harder to review as more case studies or project metadata are added.
- Fix approach: Move static portfolio data to typed constants in `app/data/portfolio.ts` or a nearby `app/content/portfolio.ts`, then render from those types in `app/page.tsx`. Keep `PRODUCT_INVENTORY.md` aligned when changing claims.

**Single global stylesheet owns all UI styling:**
- Issue: `app/globals.css` contains the full visual system, page layout, forms, chat UI, responsive rules, and component states in one 557-line file.
- Files: `app/globals.css`, `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`, `app/page.tsx`
- Impact: Component changes require scanning unrelated selectors. Global class names can collide as new UI grows, and responsive changes can accidentally affect multiple sections.
- Fix approach: For new components, use locally scoped CSS modules such as `app/ui/chat-board.module.css` and `app/ui/contact-form.module.css`, or introduce a clear sectioned stylesheet convention. Keep shared tokens in `app/globals.css`.

**Generated build artifacts exist in the working tree:**
- Issue: Generated artifacts such as `.next/` and `tsconfig.tsbuildinfo` are present in the filesystem, although `.gitignore` excludes them.
- Files: `.next/`, `tsconfig.tsbuildinfo`, `.gitignore`
- Impact: Local scans and line-count metrics are noisy, and future agents can accidentally inspect generated framework output instead of source files. This repository root is not a Git checkout, so ignored generated files may still persist between mapping and QA runs.
- Fix approach: Treat `.next/` and `tsconfig.tsbuildinfo` as disposable local artifacts. Exclude them from code searches and remove them only after explicit confirmation because cleanup is destructive.

## Known Bugs

**OpenAI default model may fail when the environment variable is omitted:**
- Symptoms: `/api/chat` defaults to `gpt-5.5` if `OPENAI_MODEL` is unset. If that model is unavailable to the account or invalid in the deployed OpenAI API, the route catches the SDK error and returns a generic `502`.
- Files: `app/api/chat/route.ts`, `.env.example`, `README.md`, `OPERATIONS.md`
- Trigger: Deploy with `OPENAI_API_KEY` set and `OPENAI_MODEL` omitted, then submit a chat message through `app/ui/chat-board.tsx`.
- Workaround: Set `OPENAI_MODEL` explicitly in the deployment environment to a model verified for the OpenAI account and current Responses API.

**Contact endpoint can be used as a lead-spam relay within current limits:**
- Symptoms: A client can submit arbitrary `name`, `email`, `projectType`, `budget`, and `message` text and the server forwards it by email through Resend.
- Files: `app/api/contact/route.ts`, `app/ui/contact-form.tsx`
- Trigger: Repeated POST requests to `/api/contact` with syntactically valid payloads, especially from many IPs or scaled instances.
- Workaround: Keep `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` server-only. Add CAPTCHA, honeypot fields, shared rate limits, domain verification, and abuse monitoring before higher-traffic deployment.

## Security Considerations

**No durable abuse controls or budget guardrails for AI spend:**
- Risk: Public chat requests invoke the OpenAI Responses API with `max_output_tokens: 700`. The only controls are message length, per-process IP rate limits, and a low reasoning setting.
- Files: `app/api/chat/route.ts`, `app/ui/chat-board.tsx`, `OPERATIONS.md`
- Current mitigation: `app/api/chat/route.ts` limits input to 900 characters, caps responses at 700 output tokens, uses a server-side `OPENAI_API_KEY`, and applies 8 requests per minute per detected IP in memory.
- Recommendations: Add centralized rate limiting, daily spend caps, endpoint-level monitoring, request timeout handling, and a global emergency disable flag such as `CHAT_ENABLED=false`. Consider lower per-request token limits if the assistant remains lead-generation only.

**Trust boundary depends on proxy headers:**
- Risk: IP identity is taken directly from `x-forwarded-for` or `x-real-ip`. If the deployment path does not strip or overwrite untrusted client-supplied proxy headers, clients can spoof IPs and bypass per-IP limits.
- Files: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Current mitigation: Both routes fall back to `"local"` when headers are absent, and the limiter still blocks repeated same-key requests in a single process.
- Recommendations: Use platform-provided request IP metadata where available, or validate forwarded headers only from trusted proxies. Document the expected hosting provider behavior in `OPERATIONS.md`.

**Contact form lacks bot friction and content classification:**
- Risk: The endpoint accepts public POSTs and forwards submitted text to email without CAPTCHA, honeypot, URL filtering, attachment handling, or spam scoring.
- Files: `app/api/contact/route.ts`, `app/ui/contact-form.tsx`
- Current mitigation: Server-side required fields, length limits, basic email format validation, and per-process rate limit are present.
- Recommendations: Add a hidden honeypot field, CAPTCHA or Turnstile for production, reject obvious URL-heavy spam, and log only minimal metadata such as status and coarse failure class.

**Error responses reveal missing server configuration:**
- Risk: `/api/chat` returns that `OPENAI_API_KEY` is missing, and `/api/contact` returns that contact email is not configured. These messages are useful locally but expose deployment configuration state to public clients.
- Files: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Current mitigation: Secret values are never returned, and `.env.example` contains only variable names.
- Recommendations: Keep detailed configuration errors in server logs only. Return generic unavailable messages to public clients in production.

**Email headers use user-controlled reply-to and subject fragments:**
- Risk: `replyTo` uses the submitted email, and the email subject includes submitted `projectType`. Resend should normalize headers, but user-controlled email metadata is still part of the outbound message surface.
- Files: `app/api/contact/route.ts`
- Current mitigation: `email` is checked with a basic regex, `projectType` is length-limited, and the frontend presents fixed select options.
- Recommendations: Enforce `projectType` and `budget` against server-side allowlists, use stricter email validation or provider validation, and normalize subject text before sending.

## Performance Bottlenecks

**OpenAI call is synchronous in the chat request path:**
- Problem: `/api/chat` waits for the full OpenAI Responses API call before returning JSON.
- Files: `app/api/chat/route.ts`, `app/ui/chat-board.tsx`
- Cause: The route calls `client.responses.create` and returns `response.output_text` after the model completes.
- Improvement path: Add an `AbortSignal` timeout, handle SDK timeout classes explicitly, and consider streaming only if the UI needs progressive responses. For lead-generation use, keeping non-streaming is acceptable after adding timeout and monitoring.

**Resend email send is synchronous in the contact request path:**
- Problem: `/api/contact` waits for Resend to accept/send the email before returning success.
- Files: `app/api/contact/route.ts`, `app/ui/contact-form.tsx`
- Cause: The route awaits `resend.emails.send` inline.
- Improvement path: Keep inline send for simple v1 behavior, but add timeout/error classification. If traffic increases, enqueue lead submissions and send email asynchronously after durable validation.

**Chat message state can grow for long sessions:**
- Problem: `ChatBoard` appends every user and assistant message to client state with no cap, persistence boundary, or reset control.
- Files: `app/ui/chat-board.tsx`
- Cause: `setMessages` always spreads the full current array and appends a new message.
- Improvement path: Limit the retained messages to the most recent N turns, add a clear/reset action, or store only the current conversation if multi-turn context is later implemented.

**Large global CSS increases maintenance cost more than runtime cost:**
- Problem: The CSS bundle is not large by web standards, but all page and component styling ships through one global file.
- Files: `app/globals.css`
- Cause: Every selector is loaded globally for the single-page app.
- Improvement path: Split component-level CSS when adding more pages or UI modules. Keep critical global tokens and body styling in `app/globals.css`.

## Fragile Areas

**Prompt and public copy can drift from verified project evidence:**
- Files: `app/api/chat/route.ts`, `app/page.tsx`, `PRODUCT_INVENTORY.md`, `PROJECT_NOTES.md`
- Why fragile: The assistant context and homepage copy manually restate product claims that are governed by `PRODUCT_INVENTORY.md` publication rules. Any update to project status needs synchronized edits in multiple files.
- Safe modification: Update `PRODUCT_INVENTORY.md` first, then update `app/page.tsx` and `portfolioContext` in `app/api/chat/route.ts` from the same claim set. Avoid claiming launch/publication for projects marked unverified.
- Test coverage: No automated tests verify that assistant claims match inventory rules.

**API route validation is hand-written and easy to loosen accidentally:**
- Files: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Why fragile: Validation uses manual type checks, regex email validation, length checks, and frontend select options without shared schema enforcement.
- Safe modification: Keep server-side validation authoritative. Add schema validation with an existing or approved dependency only after dependency-change approval, or implement small local allowlist validators for `projectType` and `budget`.
- Test coverage: No route tests cover invalid JSON, missing fields, overlength fields, rate limiting, provider errors, or successful provider calls.

**Rate limit memory can grow under many unique IP keys:**
- Files: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Why fragile: Expired buckets are only replaced when the same key is seen again; there is no periodic cleanup or maximum map size.
- Safe modification: Add cleanup during `rateLimit`, cap map size, or move to a shared TTL-backed limiter.
- Test coverage: No tests cover bucket reset behavior, map growth, or per-IP isolation.

**UI accessibility states are minimal:**
- Files: `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`, `app/globals.css`
- Why fragile: The chat log uses `aria-live="polite"`, but form errors are plain paragraphs without explicit `role="alert"` or `aria-describedby` wiring. Loading states do not expose `aria-busy`.
- Safe modification: Add explicit error IDs, `aria-describedby`, `role="status"` or `role="alert"` where appropriate, and preserve existing visual copy.
- Test coverage: No accessibility tests or browser assertions are present.

**Responsive typography and fixed minimum grid columns need screenshot checks:**
- Files: `app/globals.css`, `qa-screenshots/portfolio-desktop.png`, `qa-screenshots/portfolio-mobile.png`
- Why fragile: The visual style uses large clamp-based headings, fixed minimum columns such as `minmax(320px, 1fr)`, rotated panels, and global overflow hiding on `main`.
- Safe modification: Run desktop and mobile screenshots after layout changes, especially around `.hero-grid`, `.project-grid`, `.chat-section`, `.contact-section`, and `.chat-form`.
- Test coverage: Existing screenshots are static artifacts, not automated regression tests.

## Scaling Limits

**Public chat capacity:**
- Current capacity: 8 requests per minute per detected IP per Node process, each with up to 900 input characters and 700 output tokens.
- Limit: Capacity and cost controls do not hold across horizontally scaled instances or spoofable headers.
- Scaling path: Add shared rate limits, global daily request/token budgets, provider timeouts, and monitoring around `app/api/chat/route.ts`.

**Public contact capacity:**
- Current capacity: 5 requests per minute per detected IP per Node process, each forwarded through Resend email.
- Limit: Email deliverability and inbox quality degrade under spam or many distributed clients.
- Scaling path: Add bot friction, shared limiter, provider-specific send quotas, and optional durable queue/storage after privacy and retention policy are decided.

**No lead persistence:**
- Current capacity: Leads exist only as outbound emails; the app has no database.
- Limit: Lost provider responses, email delivery failures, or inbox filtering can lose contact submissions.
- Scaling path: Add storage only after defining retention, access control, deletion policy, and abuse controls as already noted in `PROJECT_NOTES.md`.

## Dependencies at Risk

**Next.js transitive PostCSS advisory:**
- Risk: `npm audit --omit=dev` reports a moderate advisory for `postcss <8.5.10` through `next@16.2.6`; the suggested forced audit fix installs `next@9.3.3`, which is a breaking downgrade.
- Impact: Security scanners will continue reporting 2 moderate vulnerabilities until Next or its dependency chain resolves the vulnerable PostCSS range. Running the forced fix would break the current framework baseline.
- Migration plan: Do not run `npm audit fix --force`. Track official Next.js releases and upgrade Next normally once a compatible patch is available, then run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm audit --omit=dev`.

**OpenAI Responses API model compatibility:**
- Risk: The code depends on `openai@6.39.1`, the Responses API, and a default `OPENAI_MODEL` value.
- Impact: Chat availability depends on the deployed account having access to the configured model and the SDK request shape remaining compatible.
- Migration plan: Pin `OPENAI_MODEL` in server configuration, document the verified model/date in `OPERATIONS.md`, and test `/api/chat` after any OpenAI SDK or model change.

**Resend email delivery configuration:**
- Risk: Contact delivery depends on `resend@6.12.4`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.
- Impact: Incorrect sender/domain configuration causes contact submissions to return `502` or silently degrade deliverability at the provider layer.
- Migration plan: Verify sender domain configuration in Resend, keep keys server-only, and add a production smoke test for `/api/contact` using a non-sensitive test payload.

## Missing Critical Features

**Automated tests:**
- Problem: No `*.test.*`, `*.spec.*`, Jest, Vitest, or Playwright config files were detected.
- Blocks: Changes to validation, abuse controls, provider error handling, and UI forms rely on manual checks plus lint/typecheck/build.

**Production observability:**
- Problem: There is no detected logging, metrics, tracing, error tracking, or structured event reporting for API route outcomes.
- Blocks: Operators cannot easily see chat failures, contact send failures, rate-limit events, provider latency, or abuse attempts.

**Centralized configuration validation:**
- Problem: Environment variables are checked lazily inside route handlers rather than validated during startup or deployment.
- Blocks: Misconfigured deployments are discovered only when a user hits `/api/chat` or `/api/contact`.

**Privacy and retention policy for future lead storage:**
- Problem: `PROJECT_NOTES.md` explicitly states that lead storage should wait for privacy, retention, admin access, and abuse controls.
- Blocks: Adding a database-backed lead dashboard safely requires policy decisions before implementation.

## Test Coverage Gaps

**Chat endpoint behavior:**
- What's not tested: Invalid JSON handling, missing message, overlength message, missing `OPENAI_API_KEY`, successful OpenAI response, OpenAI provider failure, rate-limit behavior, and model configuration.
- Files: `app/api/chat/route.ts`
- Risk: A future edit can remove input limits, break provider calls, leak configuration details, or weaken budget controls unnoticed.
- Priority: High

**Contact endpoint behavior:**
- What's not tested: Invalid payloads, email validation, overlength fields, missing Resend config, successful email send, provider failure, and rate-limit behavior.
- Files: `app/api/contact/route.ts`
- Risk: A future edit can break lead delivery, accept spam-prone payloads, or expose more operational details to clients.
- Priority: High

**Client form flows:**
- What's not tested: Disabled states, success/error rendering, form reset, prompt button behavior, chat error display, and long-message handling.
- Files: `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`
- Risk: UI regressions can block the primary conversion path without being caught by lint/typecheck/build.
- Priority: Medium

**Responsive and visual regression coverage:**
- What's not tested: Mobile layout, desktop layout, text overflow, chat/contact form layout, and section spacing after CSS changes.
- Files: `app/globals.css`, `app/page.tsx`, `qa-screenshots/portfolio-desktop.png`, `qa-screenshots/portfolio-mobile.png`
- Risk: The editorial layout can regress visually while automated build checks still pass.
- Priority: Medium

**Security regression coverage:**
- What's not tested: Headers used for client identity, abuse-control bypass cases, bot/spam patterns, and production-safe error messages.
- Files: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Risk: Public endpoints can become easier to abuse or more revealing after routine edits.
- Priority: High

---

*Concerns audit: 2026-05-30*
