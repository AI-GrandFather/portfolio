# Domain Pitfalls

**Domain:** Client-facing portfolio and lead onboarding site
**Project:** Mian Muhammad Athar Portfolio
**Researched:** 2026-05-30
**Scope:** Security, privacy, overclaiming, AI chatbot behavior, accessibility, mobile layout, and public endpoint abuse
**Overall confidence:** HIGH for repository-specific risks; MEDIUM for production abuse likelihood without live traffic data

## Critical Pitfalls

Mistakes that can create security exposure, privacy leakage, reputational harm, lost leads, or expensive public abuse.

### Pitfall 1: Treating Per-Process Rate Limits As Production Abuse Protection

**Likely roadmap phase:** Public endpoint hardening

**What goes wrong:** The chat and contact endpoints look protected because they limit requests per IP, but the limiter is a module-local `Map`. In serverless, multi-region, horizontally scaled, or restarted deployments, each process has its own bucket. Attackers can also vary spoofable request headers if the platform does not overwrite them.

**Why it happens:** `app/api/chat/route.ts` and `app/api/contact/route.ts` both calculate IP identity from `x-forwarded-for` / `x-real-ip` and store counters in memory. That is useful as a local fallback but not a durable public control.

**Consequences:**
- OpenAI spend can be driven up through distributed `/api/chat` requests.
- Resend can be used to push repeated lead-spam emails.
- Abuse may appear low in local testing but spike in production.
- Future roadmap phases may overstate "secure endpoints" while the main protection fails under real hosting conditions.

**Warning signs:**
- Security copy says "rate limited" without qualifying centralized limits or provider quotas.
- Production is deployed to serverless or multiple regions with no shared limiter.
- Rate-limit tests pass locally but no test simulates multiple instances or spoofed headers.
- Unexpected OpenAI or Resend usage appears despite per-IP limits.

**Prevention strategy:**
- Keep the in-memory limiter only as a fallback.
- Add a shared production limiter before increasing traffic or promoting the chatbot heavily.
- Use platform-provided client IP metadata or only trust forwarded headers from known proxies.
- Add endpoint-level quotas: per-IP, per-endpoint, and global daily caps.
- Add an emergency kill switch such as `CHAT_ENABLED=false` before broad launch.
- Add tests for 429 behavior, invalid IP headers, and rate-limit helper drift.

**Source evidence:** `.planning/codebase/CONCERNS.md`; `app/api/chat/route.ts`; `app/api/contact/route.ts`

### Pitfall 2: Shipping Public Configuration Details In Error Responses

**Likely roadmap phase:** Public endpoint hardening

**What goes wrong:** Public visitors can learn whether `OPENAI_API_KEY`, Resend settings, or contact email configuration are missing. No secret value is leaked, but deployment state becomes externally observable.

**Why it happens:** The chat route returns "Add OPENAI_API_KEY on the server" when missing. The contact route returns "Contact email is not configured yet" when Resend configuration is absent.

**Consequences:**
- Attackers can fingerprint misconfigured environments.
- Prospective clients may see implementation details instead of a polished unavailable state.
- Future troubleshooting messages can accidentally become more revealing.

**Warning signs:**
- Error messages mention env var names, provider names, or internal setup tasks.
- Frontend renders raw API errors directly in the chat or contact UI.
- Production and development use the same public error text.

**Prevention strategy:**
- Return generic production-safe messages to clients.
- Log detailed configuration causes server-side only.
- Keep UI copy user-facing: "This channel is temporarily unavailable."
- Test missing configuration paths before claiming production hardening is complete.

**Source evidence:** `app/api/chat/route.ts`; `app/api/contact/route.ts`; `.planning/codebase/CONCERNS.md`

### Pitfall 3: Overclaiming Project Publication Or Capability

**Likely roadmap phase:** Homepage repositioning and proof-backed bio/case studies

**What goes wrong:** The portfolio or chatbot may imply that all listed products are launched, client-used, revenue-generating, or production-hardened when only some statuses are verified.

**Why it happens:** `PRODUCT_INVENTORY.md` allows "published" only for Block Crush Game and marks several other products as built, prototype, internal, in progress, pipeline, or unverified for public launch. The chat prompt and homepage copy manually restate claims, so drift is easy.

**Consequences:**
- Reputational damage if a client asks for public links or proof.
- Legal or ethical risk from exaggerated credentials, launch status, revenue, or AI delivery guarantees.
- Chatbot responses can contradict inventory rules and become a public source of false claims.

**Warning signs:**
- Copy uses "shipped", "published", "launched", "live", or "production" for FurrFind, Soleris Ledger, AuraPOS, Handtracking, Jungle Rush, Rally Crush, or related pipeline projects without new verification.
- Chatbot answers confidently about App Store, Google Play, client adoption, revenue, or timelines not present in the inventory.
- Case cards do not distinguish published product, built project, prototype, internal utility, and pipeline work.

**Prevention strategy:**
- Treat `PRODUCT_INVENTORY.md` as the source of truth for project claims.
- Use explicit status labels in UI and chat context.
- Update inventory first whenever a product status changes.
- Add a copy review checklist for publication verbs and guaranteed outcomes.
- Avoid guaranteed pricing, delivery dates, success outcomes, or private access claims.

**Source evidence:** `PRODUCT_INVENTORY.md`; `.planning/PROJECT.md`; `PROJECT_NOTES.md`; `app/api/chat/route.ts`

### Pitfall 4: Turning The Portfolio Assistant Into An Unbounded General Chatbot

**Likely roadmap phase:** Chatbot "second self" upgrade

**What goes wrong:** The chatbot stops behaving like a bounded lead assistant and starts answering arbitrary questions, producing unsupported business commitments, requesting sensitive inputs, or giving advice outside the portfolio scope.

**Why it happens:** The current route sends the visitor message directly to the OpenAI Responses API with a concise instruction block. It does not include retrieval from a verified content model, tool restrictions, refusal examples, multi-turn memory boundaries, or a formal claim policy beyond a few prompt rules.

**Consequences:**
- The assistant may ask for secrets, private files, account details, or credentials.
- It may invent experience, client results, prices, timelines, or capabilities.
- It may create a mismatch between human sales follow-up and chatbot promises.
- Prompt injection attempts can redirect it away from client onboarding.

**Warning signs:**
- Users can get the assistant to ignore portfolio boundaries or answer unrelated topics.
- Responses contain "guaranteed", exact prices, exact delivery dates, or unsupported credentials.
- The bot gives legal, financial, medical, security, or platform-policy advice as if authoritative.
- The assistant mentions private repo paths, implementation internals, env vars, or local evidence sources.

**Prevention strategy:**
- Expand the system prompt around allowed topics, refusal behavior, unsupported claims, and privacy boundaries.
- Feed the assistant only a curated public claim set derived from inventory and approved bio content.
- Add tests or scripted probes for prompt injection, overclaiming, secret requests, and unsupported commitments.
- Keep replies concise and route serious leads to the contact form.
- Avoid adding conversation persistence until privacy, retention, and deletion expectations are defined.

**Source evidence:** `app/api/chat/route.ts`; `PROJECT_NOTES.md`; `.planning/PROJECT.md`; `PRODUCT_INVENTORY.md`

### Pitfall 5: Contact Endpoint Becoming A Spam Relay

**Likely roadmap phase:** Public endpoint hardening and contact flow verification

**What goes wrong:** Attackers submit arbitrary valid-looking contact payloads that are forwarded to the inbox. The endpoint becomes a low-friction email relay within the current limits.

**Why it happens:** The server validates required fields, basic email syntax, and lengths, then forwards text through Resend. `projectType` and `budget` are frontend selects but not server allowlists. There is no honeypot, CAPTCHA/Turnstile, URL-heavy spam filter, shared limiter, or content classification.

**Consequences:**
- Inbox quality drops and real leads are missed.
- Email provider reputation or quota can be affected.
- User-controlled subject fragments and reply-to metadata increase the outbound message surface.
- Spam payloads may include malicious links or social engineering content.

**Warning signs:**
- Contact emails contain unexpected project types or budget values not present in the UI.
- Repeated messages arrive from many IPs with similar content.
- Messages are URL-heavy, template-like, or unrelated to project inquiries.
- Resend errors or quota warnings increase after launch.

**Prevention strategy:**
- Enforce server-side allowlists for `projectType` and `budget`.
- Add a hidden honeypot field without new dependency.
- Reject obvious URL-heavy or empty-value spam patterns.
- Normalize subject text and keep user content in the body.
- Add shared production rate limiting before paid bot protection.
- Consider CAPTCHA/Turnstile only after dependency and privacy approval.

**Source evidence:** `app/api/contact/route.ts`; `app/ui/contact-form.tsx`; `.planning/codebase/CONCERNS.md`

### Pitfall 6: Publishing Private Bio Or Document Details While Strengthening Credibility

**Likely roadmap phase:** Proof-backed bio narrative

**What goes wrong:** The portfolio uses CVs, experience letters, or local project evidence too directly and exposes private identifiers, addresses, phone numbers, private file paths, scanned-document details, or unapproved employment specifics.

**Why it happens:** The roadmap asks for a stronger proof-backed bio from CV and letters, but project notes say PDF extraction was partial and scanned letters should be inspected manually before quoting exact duties.

**Consequences:**
- Personal privacy exposure.
- Public claims that are difficult to substantiate.
- Client trust loss if proof copy feels careless or too revealing.
- Future lead storage work starts from a weak privacy boundary.

**Warning signs:**
- Public copy includes document wording copied from scanned letters without manual verification.
- Local filesystem paths, sibling repo names, or private source evidence appear in UI or chatbot replies.
- Contact or bio sections expose more phone/address/employment details than explicitly approved.

**Prevention strategy:**
- Use documents for positioning, not raw publication.
- Ask for approval before publishing exact private contact details or employer letter claims.
- Keep private source paths out of public copy and assistant context.
- Maintain a public-safe bio claim list separate from internal notes.
- Defer lead database/storage until retention, admin access, deletion, and abuse policies exist.

**Source evidence:** `.planning/PROJECT.md`; `PROJECT_NOTES.md`; `PRODUCT_INVENTORY.md`

## Moderate Pitfalls

### Pitfall 7: Accessibility Regressions In The Primary Conversion Flow

**Likely roadmap phase:** UI/UX conversion restructure and verification

**What goes wrong:** The portfolio looks stronger visually but becomes harder to use with a keyboard, screen reader, low vision, reduced motion, or mobile assistive technology.

**Why it happens:** Current chat has `aria-live="polite"`, but errors are plain paragraphs. Contact and chat loading states do not expose `aria-busy`; error text is not wired with `aria-describedby`; success/error announcements are not explicit status or alert regions.

**Consequences:**
- Some visitors cannot complete the lead flow.
- Accessibility issues undermine client-facing quality claims.
- Browser screenshots can pass while keyboard and screen-reader flows are broken.

**Warning signs:**
- Error messages appear visually but are not announced.
- Focus disappears or is hard to see after redesign.
- Buttons, prompt chips, selects, or textareas cannot be operated comfortably by keyboard.
- Color alone distinguishes error, success, selected, or disabled states.

**Prevention strategy:**
- Add explicit error IDs, `aria-describedby`, `role="alert"` for errors, and `role="status"` for non-error async states.
- Use `aria-busy` for sending states.
- Preserve visible focus states through CSS changes.
- Verify keyboard-only chat and contact submission flows.
- Check color contrast for text, borders, buttons, and disabled states.

**Source evidence:** `.planning/codebase/CONCERNS.md`; `.codex/skills/ui-ux-pro-max/SKILL.md`; `app/ui/chat-board.tsx`; `app/ui/contact-form.tsx`

### Pitfall 8: Mobile Layout Breaking Under Stronger Portfolio Content

**Likely roadmap phase:** UI/UX conversion restructure and case-study cards

**What goes wrong:** New proof sections, case-study cards, AI-workflow copy, or denser CTAs cause horizontal scroll, overlapping text, cramped form controls, or unreadable headings on mobile.

**Why it happens:** The visual direction uses a dense editorial style. The codebase concerns note fixed minimum grid columns, large clamp headings, rotated panels, and global overflow handling. Adding more proof content without viewport testing can break the first conversion path.

**Consequences:**
- Mobile visitors cannot scan proof or submit leads.
- Important CTA and chat sections are pushed too far down or visually crowded.
- Automated lint/typecheck/build still pass while the real page feels broken.

**Warning signs:**
- Horizontal scroll appears at 375px or 390px width.
- Buttons wrap awkwardly, labels overlap fields, or long words overflow cards.
- Chat prompt buttons consume too much vertical space.
- Dense project grids look like unrelated blocks instead of a guided proof flow.

**Prevention strategy:**
- Screenshot and inspect 375px, 768px, 1024px, and 1440px after layout changes.
- Avoid fixed min widths that exceed mobile containers.
- Keep proof cards scannable with short labels and status chips.
- Make chat/contact controls stable with responsive grid or single-column layouts.
- Respect `prefers-reduced-motion` and avoid motion that hides content state.

**Source evidence:** `.planning/codebase/CONCERNS.md`; `.codex/skills/ui-ux-pro-max/SKILL.md`; `PROJECT_NOTES.md`

### Pitfall 9: Client Trust Falling Because Security Claims Outrun Verification

**Likely roadmap phase:** Security hardening plus verification coverage

**What goes wrong:** The site markets security-minded product delivery before the public endpoints have tests, durable rate limits, safe error behavior, and a documented operations path.

**Why it happens:** Security is part of the portfolio story, but current controls are intentionally basic: server-side keys, input length checks, generic provider failures, and per-process rate limits. The codebase has no endpoint tests yet.

**Consequences:**
- Security positioning becomes a liability during client diligence.
- Future agents may mark security work complete based only on code review.
- Endpoint regressions can ship unnoticed.

**Warning signs:**
- Roadmap phases use "secure" as a done criterion without specific checks.
- No tests cover invalid JSON, overlength payloads, missing config, provider errors, and rate limiting.
- Operations docs do not define model, quota, disable flag, or contact-email smoke checks.

**Prevention strategy:**
- Define security completion as verified behavior, not intent.
- Add focused route tests for chat/contact validation and failure modes.
- Run lint, typecheck, build, and route checks before claiming hardening is complete.
- Document the verified OpenAI model and Resend sender configuration date.
- Keep dependency additions gated by approval.

**Source evidence:** `.planning/PROJECT.md`; `.planning/codebase/CONCERNS.md`; `app/api/chat/route.ts`; `app/api/contact/route.ts`

### Pitfall 10: Losing Leads Because Provider Calls Are Fully Synchronous And Unobserved

**Likely roadmap phase:** Contact flow verification and operations hardening

**What goes wrong:** Chat and contact requests wait for provider calls. If OpenAI or Resend is slow, unavailable, misconfigured, or rate-limited, the visitor sees an error and there is little operational evidence beyond the failed response.

**Why it happens:** Both routes call providers inline. There is no timeout classification, structured logging, queue, persistence, retry path, or lead storage.

**Consequences:**
- Real leads can be lost during transient provider failures.
- Chat delays can make the portfolio feel broken.
- Contact failures may not be noticed until a visitor reports them.

**Warning signs:**
- Users report "assistant could not respond" or "could not send" without enough logs to diagnose.
- Provider calls hang longer than expected.
- Contact form success is assumed but no inbox smoke test is run.

**Prevention strategy:**
- Add explicit request timeouts and classify provider errors.
- Keep logs minimal and privacy-safe: status class, endpoint, duration, and coarse error type only.
- For v1, keep email-only leads but add a manual production smoke test.
- Add durable lead storage only after privacy and retention policy decisions.

**Source evidence:** `.planning/codebase/CONCERNS.md`; `app/api/chat/route.ts`; `app/api/contact/route.ts`; `PROJECT_NOTES.md`

### Pitfall 11: Validation Logic Drifting Between Frontend And Server

**Likely roadmap phase:** Public endpoint hardening and form UX polish

**What goes wrong:** The UI appears constrained, but attackers bypass the browser and submit values the server never expected. Future edits may tighten frontend options while leaving server validation loose.

**Why it happens:** Contact selects define expected project type and budget options on the client. The server only checks presence and max length. Chat max length exists in both client and server, but route behavior is still hand-written.

**Consequences:**
- Email subjects contain unexpected or messy values.
- Spam filtering is harder.
- Tests can miss route behavior because validation is duplicated manually.

**Warning signs:**
- Server accepts values that cannot be selected in the UI.
- New project type options are added in the frontend only.
- Error copy changes in the UI without route tests.

**Prevention strategy:**
- Make server-side validation authoritative.
- Add local allowlists for small enumerations before introducing schema dependencies.
- Keep route tests close to accepted and rejected payload examples.
- Avoid adding validation libraries without dependency-change approval.

**Source evidence:** `app/api/contact/route.ts`; `app/ui/contact-form.tsx`; `.planning/codebase/CONCERNS.md`

## Minor Pitfalls

### Pitfall 12: Chat State Growing Without A Reset Boundary

**Likely roadmap phase:** Chatbot UX polish

**What goes wrong:** Long chat sessions grow local message state indefinitely and make the chat board unwieldy.

**Warning signs:** The chat log becomes slow, very tall, or hard to recover from after several exchanges.

**Prevention strategy:** Cap retained turns, add a clear/reset action, and decide whether multi-turn context is needed before storing conversation history.

**Source evidence:** `app/ui/chat-board.tsx`; `.planning/codebase/CONCERNS.md`

### Pitfall 13: Generic Agency Redesign Diluting The Product-Lab Identity

**Likely roadmap phase:** Homepage repositioning and UI/UX restructure

**What goes wrong:** The redesign adds generic hero language, stock-like visuals, decorative effects, or vague capability cards that weaken the specific proof of product-building range.

**Warning signs:** The first viewport could describe any freelancer; product proof is below the fold; project status labels disappear; AI workflow copy becomes buzzword-heavy.

**Prevention strategy:** Preserve the editorial product-lab style, lead with Mian Muhammad Athar as the first-viewport identity, and structure proof around specific built products and bounded capabilities.

**Source evidence:** `PROJECT_NOTES.md`; `.planning/PROJECT.md`; `.codex/skills/ui-ux-pro-max/SKILL.md`

### Pitfall 14: Logging Sensitive Visitor Or Provider Data During Hardening

**Likely roadmap phase:** Public endpoint hardening and observability

**What goes wrong:** Attempts to improve observability accidentally log full user messages, private project briefs, emails, provider responses, file paths, signed URLs, or secrets.

**Warning signs:** Logs include complete chat prompts, contact messages, email addresses, provider payloads, or environment-derived configuration.

**Prevention strategy:** Log only minimal metadata: endpoint, status class, coarse error code, duration, and rate-limit hit. Never log full request bodies, secrets, private prompts, or provider responses.

**Source evidence:** Global security rules in provided AGENTS.md; `.planning/PROJECT.md`; `.planning/codebase/CONCERNS.md`

### Pitfall 15: Dependency-Based Hardening Without Approval

**Likely roadmap phase:** Public endpoint hardening

**What goes wrong:** A phase adds CAPTCHA, analytics, Redis/KV, monitoring, schema validation, or new UI packages without explicit approval, creating privacy, cost, security, and compatibility commitments outside the requested scope.

**Warning signs:** Package files change during a "small hardening" phase; roadmap assumes paid bot protection; validation is migrated to a new library before local allowlists are considered.

**Prevention strategy:** Start with no-dependency improvements: generic errors, allowlists, honeypot, helper extraction, route tests, and documented production requirements. Request approval before any dependency, SDK, hosted store, CAPTCHA, analytics, or monitoring addition.

**Source evidence:** Provided AGENTS.md; `.planning/PROJECT.md`; `.planning/codebase/CONCERNS.md`

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Homepage repositioning | Generic copy or unsupported launch claims | Use inventory-backed claims and explicit project status labels |
| Proof-backed bio | Private document details leak into public copy | Use approved public bio claims; avoid private identifiers and raw letter text |
| AI workflow positioning | Buzzwords or guaranteed delivery outcomes | Describe practical workflow, not guaranteed speed/cost/results |
| Chatbot second self | Prompt injection, overclaiming, or secret-seeking behavior | Curated context, refusal rules, probe tests, concise bounded replies |
| Public endpoint hardening | In-memory limiter mistaken for production protection | Add shared limits, proxy trust policy, global budget caps, kill switch |
| Contact form polish | Browser-only validation trusted as security | Server allowlists, honeypot, spam heuristics, route tests |
| UI/UX restructure | Mobile overflow and inaccessible async states | Screenshot multiple widths; add ARIA status/error wiring and focus checks |
| Verification coverage | "Secure" claimed after build-only checks | Add endpoint and client-flow tests for validation, failures, and abuse controls |

## Verification Checklist For Later Phases

- Chat endpoint rejects invalid JSON, missing message, empty message, overlength message, missing config, provider failure, and rate-limited requests.
- Contact endpoint rejects invalid JSON, missing fields, invalid email, overlength fields, invalid `projectType`, invalid `budget`, honeypot submissions, missing config, provider failure, and rate-limited requests.
- Production public errors do not reveal env var names, provider configuration details, local file paths, or private implementation state.
- Chatbot probe set covers prompt injection, unrelated advice, secret requests, overclaiming, pricing/timeline guarantees, and project-publication claims.
- Contact and chat flows expose visible focus, `aria-describedby`, `role="alert"` for errors, `role="status"` for async success/loading, and usable disabled states.
- Screenshots or browser checks cover 375px, 768px, 1024px, and 1440px with no horizontal scroll or text overlap.
- Portfolio copy review confirms only Block Crush Game is called published unless new proof is verified.
- No dependency, analytics, CAPTCHA, Redis/KV, monitoring, storage, or SDK change is made without explicit approval.

## Sources

- `.planning/PROJECT.md` - project requirements, active scope, constraints, and roadmap intent.
- `.planning/codebase/CONCERNS.md` - security, scaling, validation, accessibility, testing, and dependency risks.
- `PRODUCT_INVENTORY.md` - publication boundaries and safe portfolio claim rules.
- `PROJECT_NOTES.md` - product shape, chat/contact scope, design direction, and privacy boundaries.
- `.codex/skills/ui-ux-pro-max/SKILL.md` - UI/UX quality, accessibility, responsive, and interaction checklist.
- `app/api/chat/route.ts` - chat endpoint, prompt, rate limit, OpenAI call, and public errors.
- `app/api/contact/route.ts` - contact endpoint, validation, rate limit, Resend call, and public errors.
- `app/ui/chat-board.tsx` - chat client behavior, error display, prompt buttons, and message state.
- `app/ui/contact-form.tsx` - contact form behavior, frontend fields, success/error display, and submit state.
