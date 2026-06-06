# Codebase Concerns

## Executive Summary

The portfolio builds cleanly, but its two public server endpoints have fragile abuse controls and limited verification coverage. The highest-priority risks are spoofable/in-memory rate limits, client-supplied system messages reaching the AI model, inaccurate AI cost accounting, and contact submissions that may report success when Resend returns an error result. Operational documentation has also drifted from the implemented API contracts.

## Security and Abuse Controls

### High: Client-supplied AI system messages are accepted

- **Evidence:** `app/api/chat/security.ts` treats `"system"` as an allowed client message role and forwards sanitized history to `streamText` in `app/api/chat/route.ts`.
- **Impact:** A caller can inject higher-priority instructions into the model history, weakening the portfolio guardrails, changing assistant behavior, or encouraging disclosure/invention outside the intended scope.
- **Mitigation:** Reject all client roles except `"user"` and `"assistant"`, ensure the final message is from the user, and keep the only system prompt server-owned.

### High: Public endpoint rate limits trust spoofable forwarding headers

- **Evidence:** `app/api/chat/route.ts` uses the complete `x-forwarded-for` value as its key. `app/api/contact/route.ts` uses the first forwarded value or `x-real-ip`. Neither route validates that the deployment proxy supplied or sanitized these headers.
- **Impact:** On hosts that pass user-controlled forwarding headers, attackers can rotate header values to bypass per-IP limits and generate AI spend or email traffic.
- **Mitigation:** Document the deployment provider's trusted client-IP contract, normalize a single trusted address, and reject or ignore untrusted forwarding headers.

### High: Rate limits and AI budget caps are process-local

- **Evidence:** `app/api/chat/security.ts` stores per-user and global usage in a module-level `Map` and variable; `app/api/contact/route.ts` uses another module-level `Map`. Comments in `app/api/chat/security.ts` acknowledge that state resets on restart.
- **Impact:** Limits reset on deployments and cold starts and are not shared across server instances. The advertised global daily AI cost cap is therefore not a dependable budget control, and contact abuse can fan out across instances.
- **Mitigation:** Before production traffic, move counters to a durable shared store or enforce quotas at an API gateway/provider. Add provider-side OpenAI budget limits as a final backstop.

### Medium: Rate-limit maps have no eviction

- **Evidence:** `usageStore` in `app/api/chat/security.ts` and `buckets` in `app/api/contact/route.ts` retain keys indefinitely while a process remains alive.
- **Impact:** Sustained requests with unique IP/header keys can grow memory usage without bound on a long-lived Node process.
- **Mitigation:** Delete expired entries periodically or use a bounded TTL-based store.

### Medium: Chat validation can turn malformed history into server errors

- **Evidence:** `app/api/chat/security.ts` only validates the last message before mapping every item and reading `msg.role`; array entries such as `null` can throw. `app/api/chat/route.ts` then returns a generic `500`.
- **Impact:** Malformed public requests create avoidable server errors and noisy logs and can be used for low-cost error-volume abuse.
- **Mitigation:** Validate every array entry as a non-null object with allowed fields before reading it; return `400` for malformed history.

### Medium: Chat errors are logged as raw provider/runtime objects

- **Evidence:** `app/api/chat/route.ts` calls `console.error("Chat API Error:", err)`, while `OPERATIONS.md` says not to log full user messages, secrets, or provider responses.
- **Impact:** Depending on SDK error contents, production logs may capture request/provider details that violate the repository's own privacy guidance.
- **Mitigation:** Log a small structured error category and request correlation ID, not the raw exception object; confirm provider error serialization before enabling production logging.

### Medium: No explicit application security headers

- **Evidence:** `next.config.ts` only configures the Turbopack root. There is no Content Security Policy, frame restriction, referrer policy, permissions policy, or other explicit header configuration.
- **Impact:** Browser-side defense in depth is limited, especially around the inline theme script in `app/layout.tsx` and any future third-party integrations.
- **Mitigation:** Define and test a deployment-appropriate header policy. A CSP will need a nonce/hash strategy because `app/layout.tsx` currently injects an inline script.

## Correctness and Reliability

### High: Contact delivery may report success without confirming Resend acceptance

- **Evidence:** `app/api/contact/route.ts` awaits `resend.emails.send(...)` but ignores its returned result and always returns `{ ok: true }` unless the SDK throws.
- **Impact:** If Resend returns an error result rather than throwing, a lead sees a success message although no email was accepted, causing silent lead loss.
- **Mitigation:** Inspect the returned `{ data, error }`, return a safe failure response when `error` exists, and test both accepted and rejected provider responses.

### High: AI cost accounting underestimates and can miss usage

- **Evidence:** `app/api/chat/route.ts` estimates input tokens from only the last message plus the system prompt, while the model receives up to ten history messages. `app/api/chat/security.ts` deliberately allows requests that exceed the per-user estimated cap. Actual cost is added only in `onFinish`.
- **Impact:** Long conversations, interrupted streams, provider failures after token use, or concurrent requests can exceed the stated user/global caps.
- **Mitigation:** Estimate the complete forwarded history, reserve estimated cost atomically before calling the provider, reconcile actual usage afterward, and enforce caps in shared storage.

### Medium: The AI prompt is not actually generated from the content source of truth

- **Evidence:** `app/api/chat/route.ts` describes `portfolioContext` as programmatically generated, but it is a separate hard-coded string and does not import `app/lib/content.ts`.
- **Impact:** Portfolio claims and assistant answers can drift. Most project details in `app/lib/content.ts` are unavailable to the assistant despite the UI inviting questions about the work.
- **Mitigation:** Build a minimal server-only grounding payload from approved fields in `app/lib/content.ts`, with explicit exclusions for private material.

### Medium: Operations endpoint checks are stale and will not validate current behavior

- **Evidence:** `OPERATIONS.md` posts `{"message": ...}` to `/api/chat`, but the route requires a `messages` array. Its contact example uses `projectType` and `message`, while `app/api/contact/route.ts` requires `building`, `platform`, `timeline`, and `budget`. It also expects a chat `503`, but `app/api/chat/route.ts` has no explicit missing-key check.
- **Impact:** Manual verification produces misleading failures and cannot serve as a dependable deployment runbook.
- **Mitigation:** Update examples to the implemented contracts and include expected status/body checks for valid, invalid, rate-limited, and unconfigured cases.

### Medium: AI model configuration is inconsistent

- **Evidence:** `.env.example` and `app/api/chat/route.ts` default to `gpt-4o`, while `README.md` and `OPERATIONS.md` instruct `gpt-5.5`.
- **Impact:** Local, documented, and deployed behavior may differ, affecting availability, cost assumptions, output quality, and debugging.
- **Mitigation:** Choose one supported model policy, document it once, and validate the configured model at startup or request time with a safe configuration error.

## Testing and Maintainability

### High: No automated endpoint or component tests

- **Evidence:** `package.json` defines only `dev`, `build`, `start`, `lint`, and `typecheck`; no test files or test configuration are present.
- **Impact:** Security-sensitive validation, rate limiting, AI cost calculations, Resend result handling, chat rendering, and form contracts can regress while lint, typecheck, and build remain green.
- **Mitigation:** Add focused tests first for `app/api/chat/security.ts`, `/api/chat`, and `/api/contact`, then add a small browser smoke test for chat/contact and responsive navigation.

### Medium: Endpoint validation and provider logic are tightly coupled

- **Evidence:** `app/api/contact/route.ts` owns validation, throttling, environment checks, provider construction, email formatting, and HTTP responses in one module. `app/api/chat/route.ts` similarly combines request parsing, identity, budgeting, model configuration, streaming, and logging.
- **Impact:** Provider failures and security edge cases are difficult to isolate and test, increasing regression risk in the most exposed code.
- **Mitigation:** Extract only testable pure functions and provider adapters where needed; avoid a broad architecture rewrite.

### Medium: Large global stylesheet is a fragile change surface

- **Evidence:** `app/globals.css` is approximately 1,782 lines and owns all component, theme, animation, and responsive behavior.
- **Impact:** Selector collisions and responsive regressions become harder to detect as the site grows, particularly because there are no visual regression tests.
- **Mitigation:** Keep new selectors narrowly scoped, document shared tokens, and add desktop/mobile screenshot checks before considering any styling-system migration.

## Dependencies and Supply Chain

### High: Production dependency advisories are present

- **Evidence:** On 2026-06-06, `npm audit --omit=dev` reported 8 production vulnerabilities: 4 moderate and 4 low. Direct dependencies affected include `ai`, `@ai-sdk/openai`, and `next`; transitive findings include `postcss`, `jsondiffpatch`, and AI SDK utilities.
- **Impact:** The current production dependency graph includes known resource-consumption and XSS-related advisories. Some advisory paths may not be reachable in this app, but that has not been demonstrated.
- **Mitigation:** Review upstream release notes and advisory reachability, then plan compatible upgrades with endpoint/UI regression testing. Do not use the audit tool's suggested forced Next downgrade.

### Low: An unused OpenAI SDK appears to remain installed

- **Evidence:** `package.json` includes both `@ai-sdk/openai` and `openai`, while application imports use `@ai-sdk/openai` and no source file imports `openai`.
- **Impact:** Unused production dependencies increase install size and supply-chain surface.
- **Mitigation:** Confirm no deployment/runtime tooling needs `openai`, then remove it only through an approved dependency change.

## Privacy and Repository Hygiene

### High: Private-looking source documents are tracked in the repository

- **Evidence:** `CV.pdf`, `Fauji FreshnFreeze Experience Letter.pdf`, `OP SELLERS Letter.pdf`, and `Ublox Experience Letter.pdf` are tracked at repository root.
- **Impact:** CVs and employment letters commonly contain personal, employment, address, signature, or contact details. Anyone with repository access or future repository exposure may receive more private data than the public site needs.
- **Mitigation:** Review each document for approved retention and access scope. If they are not required in version control, remove them from the repository and history through a separately approved privacy cleanup.

### Medium: QA artifacts and duplicated assets increase repository noise and weight

- **Evidence:** Tracked files include `.playwright-mcp/*`, `qa-screenshots/*`, root-level review/phase screenshots, and duplicate icon copies under both `icons/` and `public/icons/`. Several images exceed 1 MB.
- **Impact:** Review diffs become noisy, clones grow, and accidental capture of browser/runtime information is more likely. Duplicate assets can drift.
- **Mitigation:** Define which QA evidence must be retained, ignore transient browser logs/snapshots, and keep one authoritative copy of runtime assets.

## Performance and Operations

### Medium: The public portrait source is unusually large

- **Evidence:** `public/55D670AB-C554-4417-86F0-C65863EDE18E.PNG` is about 1.9 MB and is used as the priority hero image through `next/image` in `app/page.tsx`.
- **Impact:** Next.js optimization helps, but first-request image transformation, cache misses, and hosts without effective image optimization can increase latency and bandwidth.
- **Mitigation:** Create an appropriately sized, compressed WebP/AVIF source and verify desktop/mobile visual quality and Largest Contentful Paint.

### Medium: No deployment, monitoring, or rollback configuration is present

- **Evidence:** The repository has no CI workflow, deployment manifest, health check, uptime check, or monitoring configuration. `OPERATIONS.md` covers local commands only.
- **Impact:** Production verification, environment validation, dependency auditing, incident detection, and rollback depend on manual discipline.
- **Mitigation:** Add a minimal CI gate for lint/typecheck/build/tests and document the actual host, environment ownership, smoke checks, monitoring, and rollback procedure.

## Verification Snapshot

- `npm run lint`: passed on 2026-06-06.
- `npm run typecheck`: passed on 2026-06-06.
- `npm run build`: passed on 2026-06-06; generated `/`, `/api/chat`, and `/api/contact`.
- `npm audit --omit=dev`: failed with 8 production dependency advisories (4 moderate, 4 low).
- Automated tests: unavailable because the repository defines no test command or test suite.
