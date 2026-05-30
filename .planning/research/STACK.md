# Technology Stack Research: Client-Onboarding Portfolio Improvement

**Project:** Mian Muhammad Athar Portfolio
**Dimension:** Stack and implementation approach
**Researched:** 2026-05-30
**Overall confidence:** HIGH for current codebase recommendations; MEDIUM for model-name recommendation until the deployed OpenAI account is checked.

## Recommendation

Keep the existing stack: Next.js App Router, React, TypeScript, global CSS, server-only OpenAI SDK usage, and server-only Resend SDK usage. Do not add dependencies for this milestone. The portfolio is small enough that client onboarding, AI capability presentation, a bounded second-self assistant, and first-pass endpoint hardening should be implemented with the framework and libraries already present.

The implementation should be a disciplined tightening of the current system, not a stack migration:

- Keep `app/page.tsx` as the server-rendered composition layer for the one-page portfolio, but move growing content arrays into typed local modules only when edits become unwieldy.
- Keep `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx` as client islands because the current UI needs local loading, error, and conversational state.
- Keep `/api/chat` and `/api/contact` as Next.js Route Handlers because they are public JSON endpoints with explicit validation, rate limiting, secret-backed SDK calls, and clear same-origin browser contracts.
- Keep the OpenAI and Resend SDKs server-only. No API keys, private document evidence, private project paths, or internal prompts should enter client components.
- Harden within TypeScript first: allowlists, stricter length and shape validation, generic public errors, bounded prompt context, local helper extraction, endpoint tests, and explicit environment configuration.

## Current Stack Baseline

| Layer | Current Technology | Recommendation | Confidence | Rationale |
|-------|--------------------|----------------|------------|-----------|
| Web framework | Next.js 16.2.6 App Router | Keep | HIGH | Current architecture already matches Route Handler and server component patterns. Official docs describe Route Handlers as the `app` directory mechanism for custom request handlers using Web Request/Response APIs. |
| UI runtime | React 19.2.6 | Keep | HIGH | Existing page is simple and benefits from server-rendered content plus small client components; no global state library is justified. |
| Language | TypeScript 5.9.3 | Keep and lean harder on it | HIGH | Add local types, literal unions, and helper return types before considering validation dependencies. |
| Styling | `app/globals.css` | Keep for milestone, section carefully | HIGH | The app is one page. A styling-system migration would be out of scope. Split later only if CSS growth starts causing change risk. |
| AI SDK | `openai` 6.39.1 | Keep server-side | HIGH | Current route uses the Responses API, which supports `instructions`, `input`, `max_output_tokens`, reasoning config, and text config. |
| Email SDK | `resend` 6.12.4 | Keep server-side | HIGH | Current contact endpoint maps to Resend's documented `emails.send` flow with `from`, `to`, `subject`, and `text`. |
| Tests | None detected | Add only if dependency approval allows; otherwise manual route checks plus existing lint/typecheck/build | MEDIUM | Proper route tests likely need a test runner dependency. Without approval, verification should use built-in scripts and direct endpoint checks. |
| Bot protection / durable limiter | None | Avoid new service/dependency until approved | HIGH | CAPTCHA, Redis/KV, analytics, monitoring, and hosted bot controls are dependency/privacy/security decisions requiring approval. |

## What To Keep

### Next.js Route Handlers for Chat and Contact

Use Route Handlers for both public endpoints. They make the security boundary obvious: client components submit JSON to same-origin endpoints, and the server routes own parsing, validation, rate limiting, environment reads, and provider calls.

Do not replace `/api/chat` with a Server Action. Chat is not a plain form mutation; it is an interactive JSON conversation endpoint with client-side message state and provider error handling.

Consider a Server Action for the contact form only in a later phase if progressive enhancement becomes a priority. Current Next.js docs state Server Functions are reachable by direct POST requests, so they still require the same server-side validation and abuse controls as Route Handlers.

### Server-Only SDK Boundaries

Keep `openai` inside `app/api/chat/route.ts` or a server-only helper imported only by that route. Keep `resend` inside `app/api/contact/route.ts` or a server-only helper imported only by that route.

This is the correct boundary for an attacker-facing portfolio: public components should never import SDK clients, read environment variables, or receive detailed configuration errors.

### Simple Content Architecture

For the onboarding upgrade, keep portfolio content local and typed:

- `app/page.tsx` can continue to compose sections.
- If the page grows, move content to `app/data/portfolio.ts` with literal types for project status, proof level, capability category, and CTA target.
- Keep the source-of-truth rules aligned with `PRODUCT_INVENTORY.md`; only Block Crush Game should be described as published unless other launches are verified.

This avoids a CMS, database, or markdown pipeline that the project does not need yet.

### Existing Verification Scripts

Keep the current verification baseline:

```bash
npm run lint
npm run typecheck
npm run build
```

For endpoint hardening, add manual `curl` checks or a small no-dependency Node script only if tests cannot be added without approval. If dependency approval is granted later, add a focused route test runner before deeper security changes.

## What To Avoid

| Avoid | Reason | Use Instead | Confidence |
|-------|--------|-------------|------------|
| Adding CAPTCHA, Turnstile, Redis/KV, analytics, monitoring, Zod, Vitest, Playwright, Tailwind, icon packs, or UI kits without approval | Global rules require approval for dependency changes; several also affect privacy/security posture | Hand-written validation, honeypot field, allowlists, generic errors, direct manual checks | HIGH |
| Moving chat to client-side OpenAI calls | Would expose secrets and budget controls to the browser | Keep OpenAI calls in `/api/chat` | HIGH |
| Treating in-memory rate limits as production-grade abuse prevention | `Map` state is per process and not shared across instances or restarts | Present it as fallback only; require approved shared limiter for scale | HIGH |
| Trusting `x-forwarded-for` blindly | Client-supplied proxy headers may be spoofable depending on host behavior | Document host trust assumptions; prefer platform-provided IP metadata when available | HIGH |
| Exposing missing env var names to public users | Reveals deployment configuration state | Return generic unavailable messages publicly; keep detail in private logs | HIGH |
| Adding Retrieval-Augmented Generation, file search, uploaded docs, or private CV/letter ingestion now | Increases privacy, prompt-injection, retention, and source-control risks | Use a bounded, static prompt from approved public claims | HIGH |
| Overbuilding a lead database or CRM | Requires retention, deletion, access control, privacy, and abuse policy decisions | Keep email-only lead delivery for now | HIGH |
| Claiming unsupported AI speed/cost guarantees | Portfolio copy must remain evidence-backed | Explain workflow concretely without guarantees | HIGH |

## Implementation Approach By Goal

### Client Onboarding

Use the current page architecture. Add sections and content structure before changing infrastructure:

- Hero: lead with "product engineer for client ideas into shipped software" rather than broad resume positioning.
- Proof: add case-study cards grouped by published, built, prototype, and pipeline status.
- Process: make shape, plan, build, verify more specific to client handoff and decision points.
- Contact: collect only the minimum useful project lead fields; no database until policy exists.

Stack impact: no new dependencies. Use typed arrays, semantic HTML, accessible labels, and existing CSS.

Confidence: HIGH.

### AI Capability Presentation

Represent AI capability as a delivery workflow, not as vague AI branding:

- Planning agents for research and roadmap generation.
- Coding agents such as Codex and Claude Code for implementation support.
- Multi-model checks with Gemini or similar tools when useful.
- MCPs, skills, plugins, and structured workflows for repeatable tool use.
- Human review, verification, and security boundaries as part of the process.

Stack impact: static content only. Do not integrate extra AI providers into this portfolio unless a future phase explicitly approves them.

Confidence: HIGH.

### Bounded AI Chatbot Second Self

Keep the OpenAI Responses API route, but tighten behavior:

- Build the prompt from a compact, approved facts object rather than a loose prose block.
- Add explicit refusal rules for secrets, private docs, exact pricing, guaranteed timelines, unsupported credentials, legal/financial advice, and unavailable project claims.
- Keep answers concise and lead-oriented.
- Keep `max_output_tokens` low for budget control; current `700` is acceptable but can be reduced for a lead assistant.
- Add an emergency env flag such as `CHAT_ENABLED=false` before provider calls.
- Add request timeout handling with `AbortController` if supported by the SDK call path.
- Avoid multi-turn server-side conversation state for now; browser-local display history is enough.

Model configuration needs attention. Current code and `.env.example` default to `gpt-5.5`; current OpenAI model docs found `gpt-5.2`, `gpt-5.1`, `gpt-5`, `gpt-5 mini`, and `gpt-5 nano`, but not `gpt-5.5`. For this portfolio, make `OPENAI_MODEL` explicit in deployment and prefer a cost-controlled model such as `gpt-5 mini` or another account-verified model. Do not hard-code a questionable default.

Confidence: HIGH for bounded route approach; MEDIUM for exact model choice until account access and pricing tolerance are verified.

### Security Hardening Without New Dependencies

First-pass hardening should be local and dependency-free:

- Extract shared server helpers only if both endpoints need them: `parseJsonObject`, `getClientKey`, `fixedWindowLimit`, `jsonError`.
- Add server-side allowlists for contact `projectType` and `budget`; do not rely on frontend select options.
- Add a hidden honeypot field to the contact form and reject if filled.
- Reject URL-heavy or control-character-heavy contact messages with simple local checks.
- Cap rate-limit map size and opportunistically delete expired buckets.
- Return generic public errors for missing provider configuration.
- Normalize email subject fragments before sending.
- Keep logs minimal if added: status class, endpoint, coarse reason, no payloads, no emails, no prompts, no provider responses.

Production-grade abuse controls still need approved infrastructure. A shared limiter, CAPTCHA/Turnstile, durable budget counters, and monitoring cannot be honestly claimed without dependency/service approval.

Confidence: HIGH.

## UI/UX Stack Guidance

Use the local `ui-ux-pro-max` guidance as design input, but do not import a new design framework.

The skill search recommended a portfolio-grid foundation, strong project showcase, monochrome with blue accent, visible CTAs, and responsive/accessibility checks. Apply this through existing CSS:

- Keep neutral background, strong text contrast, and one restrained CTA accent.
- Use proof cards and category filters only if they are implemented without new dependencies and without hiding table-stakes content.
- Use real accessible text labels; avoid emoji icons and decorative icon dependency additions.
- Preserve visible focus states, keyboard navigation, reduced-motion handling, and mobile overflow checks.
- Avoid motion-heavy effects unless they respect `prefers-reduced-motion` and do not distract from client conversion.

Confidence: HIGH.

## Dependency Policy

No dependency additions are required for the next implementation pass.

If a future phase requests dependency approval, evaluate these separately:

| Need | Candidate | Why It Might Be Worth Approval Later | Current Recommendation |
|------|-----------|---------------------------------------|------------------------|
| Route tests | Vitest or Node test runner setup | Safer API validation regression coverage | Defer unless approval is granted |
| Browser/UI tests | Playwright | Conversion flow and mobile screenshot regression checks | Defer unless approval is granted |
| Runtime validation | Zod or Valibot | Less fragile schemas for public endpoints | Use local validators first |
| Durable rate limiting | Upstash Redis, Vercel KV, platform limiter | Real abuse and budget control across instances | Defer until production host/privacy decisions |
| Bot friction | Turnstile or similar | Reduces contact spam and AI budget abuse | Defer; use honeypot first |
| Icons | Lucide or Heroicons | Consistent non-emoji UI icons | Defer; use inline SVG only if necessary |
| CSS framework | Tailwind or component kit | Faster component iteration in larger apps | Avoid for this one-page app |

## Recommended Phase Order

1. **Content and Conversion Restructure** - Update page sections, proof hierarchy, AI workflow copy, and contact positioning using current Next.js/React/CSS only.
2. **Bounded Assistant Prompt and API Guardrails** - Tighten `portfolioContext`, model config, public errors, token limits, timeout path, emergency disable flag, and refusal boundaries.
3. **Contact Endpoint Hardening** - Add allowlists, honeypot support, subject normalization, generic config errors, spam heuristics, and rate-limit cleanup.
4. **Verification Pass** - Run lint, typecheck, build, endpoint checks, and desktop/mobile browser inspection. Add formal tests only after dependency approval.

This order improves client-facing value first while keeping the public endpoints from being marketed as production-grade before hardening lands.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Keep Next.js App Router and Route Handlers | HIGH | Matches current files and official Next.js Route Handler docs. |
| Avoid new dependencies for first pass | HIGH | Existing stack can handle the requested improvements; global rules require approval for dependency changes. |
| Keep OpenAI server-side Responses API | HIGH | Current implementation matches official Responses API shape for instructions, input, and output limits. |
| Exact OpenAI model | MEDIUM | Current docs found no `gpt-5.5`; deployed account must verify chosen `OPENAI_MODEL`. |
| Keep Resend server-side email route | HIGH | Current implementation matches documented Resend `emails.send` use. |
| Production abuse protection without external service | MEDIUM | Local hardening reduces risk but cannot provide durable distributed controls. |
| UI approach through existing CSS | HIGH | Local skill guidance and current app scope favor refining the existing visual system. |

## Sources

- Project files read on 2026-05-30: `.planning/PROJECT.md`, `.planning/codebase/STACK.md`, `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/CONCERNS.md`, `.codex/skills/ui-ux-pro-max/SKILL.md`, `app/page.tsx`, `app/api/chat/route.ts`, `app/api/contact/route.ts`, `package.json`, `.env.example`, `next.config.ts`.
- Next.js Route Handlers docs, checked 2026-05-30: https://nextjs.org/docs/app/getting-started/route-handlers
- Next.js Mutating Data / Server Functions docs, checked 2026-05-30: https://nextjs.org/docs/app/getting-started/mutating-data
- OpenAI Responses API reference, checked 2026-05-30: https://platform.openai.com/docs/api-reference/responses/object
- OpenAI Models docs, checked 2026-05-30: https://platform.openai.com/docs/models
- Resend Email API docs, checked 2026-05-30: https://resend.com/docs/api-reference/emails
- Resend Usage Limits docs, checked 2026-05-30: https://resend.com/docs/api-reference/rate-limit
- Local `ui-ux-pro-max` searches run 2026-05-30: design system query `portfolio client onboarding AI assistant Next.js professional`; stack query `responsive forms accessibility conversion`.
