# Project Research Summary

**Project:** Mian Muhammad Athar Portfolio
**Domain:** Client-facing product-builder portfolio with bounded AI lead assistant
**Researched:** 2026-05-30
**Confidence:** HIGH

## Executive Summary

This project is a client-onboarding portfolio, not a generic resume site. It should prove that Mian Muhammad Athar can turn rough client ideas into planned, implemented, verified software by combining product-building proof, ecommerce and electronics credibility, a strong conversion flow, and a bounded AI assistant that answers portfolio and project-fit questions.

The recommended approach is to keep the current Next.js App Router, React, TypeScript, global CSS, server-only OpenAI route, and server-only Resend route. The next roadmap should improve the product in layers: first establish public-safe claim and content architecture, then upgrade the homepage proof hierarchy and AI delivery narrative, then strengthen the chatbot/contact conversion flow, then harden public endpoints and verify behavior with focused checks.

The main risks are public-facing trust failures: overclaiming project publication, leaking private CV or document details, allowing the chatbot to make unsupported commitments, treating per-process rate limits as production-grade abuse protection, and shipping inaccessible or broken mobile conversion flows. Mitigation should be built into requirements: inventory-backed copy, privacy-safe bio facts, bounded assistant context, generic public errors, server-side validation, budget/abuse guardrails, and desktop/mobile/accessibility verification before claiming completion.

## Key Findings

### Recommended Stack

Keep the existing stack for this milestone. The research found no need for a migration or new dependency: the current Next.js App Router structure already supports server-rendered portfolio content, small client interaction islands, and server-only public endpoints for AI chat and contact email.

Do not add CAPTCHA, analytics, Redis/KV, monitoring, validation libraries, UI kits, icon packs, or test frameworks without explicit approval. First-pass improvements can be done with TypeScript, local allowlists, helper extraction, safer errors, honeypot spam friction, bounded prompts, endpoint checks, lint, typecheck, build, and browser inspection.

**Core technologies:**
- Next.js 16.2.6 App Router: page composition and Route Handlers — keep because it matches the current architecture and public endpoint boundary.
- React 19.2.6: UI runtime — keep because the site needs mostly server-rendered sections plus chat/contact client islands.
- TypeScript 5.9.3: type-safe content and validation — use more heavily for public-safe facts, enum allowlists, and endpoint helper contracts.
- Global CSS: visual system — keep for this one-page milestone, with careful sectioning before considering a styling migration.
- OpenAI SDK 6.39.1: server-side assistant calls — keep route-only; verify the deployed `OPENAI_MODEL` because `gpt-5.5` should not be assumed available.
- Resend SDK 6.12.4: server-side contact email — keep route-only; normalize and validate all user-controlled email fields before provider calls.

### Expected Features

The portfolio should move serious visitors through four decisions: who Mian is, what he can build, whether there is proof, and what to send next. The feature set should lead with product-building capability, then use electronics engineering, ecommerce operations, service/account experience, and CV-backed credentials as proof.

**Must have (table stakes):**
- Client-first hero positioning — make the first viewport say that Mian builds software products from rough ideas, not just that he has broad skills.
- Primary conversion CTAs — make "start a project", "view proof", and "ask the assistant" paths obvious, with chat promoted only after boundaries are safe.
- Proof-backed project grid — show project category, status, stack/proof, and client-relevant outcome.
- Project status labels — distinguish Published, Built, Prototype, Internal, Experiment, Pipeline, and In Progress to avoid overclaiming.
- Capability map by client problem — connect mobile apps, AI products, dashboards, SaaS/POS, games, and automation to proof projects.
- Process section with verification — make planning, building, security, UI QA, endpoint checks, and launch readiness part of the delivery story.
- Bounded AI chat assistant — answer portfolio, process, project-fit, AI-workflow, and contact-routing questions while refusing secrets, guarantees, unsupported claims, and unrelated advice.
- Contact form with lead qualification — collect concise useful fields and set clear post-submit expectations.
- Privacy-safe bio narrative — use CV and letters as proof inputs without publishing private identifiers or unverified scanned-letter details.
- Responsive and accessible polish — ensure keyboard focus, async states, form errors, reduced motion, and mobile layout are verified.

**Should have (competitive):**
- Second-self assistant with portfolio grounding — makes browsing interactive and can guide serious leads to the contact path.
- Client-fit project planner — helps visitors shape an MVP, risks, and likely phases without becoming a formal quote.
- Evidence matrix — maps capability to proof, status, and safe claim level.
- Compact case-study cards — show context, build, stack, risk handled, and result/proof without requiring full pages.
- AI-assisted delivery workflow timeline — explains practical use of Codex, Claude Code, Gemini, MCPs, agents, skills, plugins, and structured workflows.
- Cross-domain credibility strip — frames electronics, ecommerce, service, and software background as operational product judgment.
- Security-as-product section — makes safe AI/contact boundaries part of the trust story once verified.
- "What to send" lead guidance — improves inquiry quality.

**Defer (v2+):**
- Full CRM or lead database — requires privacy, retention, deletion, admin access, and abuse policies.
- Durable shared limiter, CAPTCHA/Turnstile, analytics, monitoring, or hosted bot controls — requires dependency, infrastructure, and privacy approval.
- Full case-study pages and project filters — useful after proof metadata and homepage hierarchy are stable.
- Testimonials or logos — only if real, approved, and sourceable.
- Retrieval, uploaded private documents, persistent chat memory, or lead capture inside chat — too much privacy, retention, prompt-injection, and budget risk for v1.

### Architecture Approach

Use four boundaries: typed content modules for public-safe proof and assistant facts, server page/section composition for static portfolio content, client islands for chat/contact browser state, and server-only public endpoints for validation, abuse controls, provider calls, and safe errors. Extract gradually; do not create architecture for its own sake.

**Major components:**
1. `app/content/portfolio.ts` — public-safe project proof, bio facts, capability copy, AI workflow claims, process copy, and contact enums.
2. `app/content/assistant-context.ts` — bounded assistant persona and allowed claims generated from approved public facts.
3. `app/page.tsx` and `app/sections/*` — route-level composition and static server-rendered sections in conversion order.
4. `app/ui/chat-board.tsx` — client-only chat state, starter prompts, capped local history, reset, loading/error/status UI, and same-origin `/api/chat` fetch.
5. `app/ui/contact-form.tsx` — client-only form state, validation UX, honeypot field, accessible status/errors, and same-origin `/api/contact` fetch.
6. `app/api/_lib/*` — shared server-only helpers for JSON parsing, public errors, client key extraction, limiter cleanup, and request utilities where duplication appears.
7. `app/api/chat/route.ts` — authoritative chat validation, rate/budget checks, bounded prompt assembly, OpenAI call, timeout handling, and generic public errors.
8. `app/api/contact/route.ts` — authoritative contact validation, allowlists, spam friction, normalized email construction, Resend call, and generic public errors.

### Critical Pitfalls

1. **Treating per-process rate limits as production protection** — keep them as fallback only; add shared limits, global quotas, platform IP trust policy, and an emergency chat disable flag before broad production promotion.
2. **Exposing configuration details in public errors** — return generic unavailable messages to users and keep provider/env details out of client-visible responses.
3. **Overclaiming project publication or capability** — treat `PRODUCT_INVENTORY.md` as the source of truth, use explicit project status labels, and avoid launch, revenue, pricing, timeline, or guarantee claims unless verified.
4. **Turning the assistant into unbounded general chat** — derive prompt context from approved public facts, add refusal rules, test prompt-injection and overclaim probes, and keep serious commitments in direct follow-up.
5. **Contact endpoint becoming a spam relay** — enforce server-side allowlists, honeypot rejection, URL-heavy spam checks, subject normalization, limiter cleanup, and provider failure handling.
6. **Publishing private bio or document details** — summarize credentials and experience at a public-safe level; manually verify scanned letters before quoting exact duties, dates, or metrics.
7. **Accessibility and mobile regressions in conversion flow** — require keyboard checks, ARIA status/error wiring, visible focus, reduced-motion respect, and screenshots at 375px, 768px, 1024px, and 1440px.
8. **Security claims outrunning verification** — define "secure enough for this milestone" as verified behavior with route checks/tests, not intent or code review alone.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Claim And Content Architecture
**Rationale:** Every later section and the chatbot depend on accurate, reusable, public-safe facts.
**Delivers:** Typed content modules for project proof, statuses, capabilities, bio facts, AI workflow claims, process copy, contact enums, and assistant-safe facts.
**Addresses:** Project status labels, proof-backed grid foundation, privacy-safe bio boundary, assistant claim boundary.
**Avoids:** Homepage/assistant claim drift, private CV leakage, unverified scanned-letter detail, unsupported launch claims.

### Phase 2: Homepage Proof And Conversion Structure
**Rationale:** Client trust and conversion hierarchy should be fixed before making the assistant more prominent.
**Delivers:** Client-first hero, CTA hierarchy, proof-backed project grid, capability map, cross-domain credibility strip, AI-assisted delivery section, process-with-verification section, and contact positioning.
**Uses:** Next.js server components, React, TypeScript content modules, existing global CSS.
**Avoids:** Generic agency redesign, overclaiming, mobile overflow, inaccessible conversion states.

### Phase 3: Bounded Assistant And Chat UX
**Rationale:** The chatbot should be built from approved facts and clear UI/UX expectations rather than a loose prompt.
**Delivers:** Assistant context generator, stricter allowed/refused topics, concise second-self behavior, starter prompts, capped local chat history, reset, improved loading/error/status semantics, and project-fit guidance.
**Addresses:** Bounded AI chat assistant, chat starter prompts, client-fit project planner, trust-safe AI microcopy.
**Avoids:** Prompt injection, unsupported commitments, general advice drift, secret requests, persistent memory without policy.

### Phase 4: Contact And Public Endpoint Hardening
**Rationale:** Public AI and email endpoints are attacker-facing and should be hardened as focused work with route-level review.
**Delivers:** Shared API helpers where useful, generic public errors, server-side allowlists, honeypot field, URL/spam heuristics, limiter cleanup, request timeouts, model/env documentation, emergency disable flags, and safer email normalization.
**Uses:** Existing Route Handlers, OpenAI SDK, Resend SDK, TypeScript helpers, no new dependency by default.
**Avoids:** Spam relay behavior, public config leakage, trusting frontend validation, budget abuse, sensitive logging.

### Phase 5: Verification Coverage And Release Readiness
**Rationale:** Security, AI, accessibility, and conversion claims require proof before they are marked complete.
**Delivers:** Lint, typecheck, build, route checks or focused tests for chat/contact validation and failure modes, chatbot probe set, contact inbox smoke check, keyboard checks, and desktop/mobile screenshots.
**Addresses:** Public endpoint trust signals, responsive/accessibility polish, verified security posture.
**Avoids:** Claiming secure/working after build-only checks, missing provider failure paths, inaccessible lead flow.

### Phase 6: Case-Study Depth And Optional Enhancements
**Rationale:** Richer proof should come after homepage hierarchy, claim boundaries, and conversion flows are stable.
**Delivers:** Compact case-study expansions, optional project filters, richer proof media, and testimonials/logos only if verified and approved.
**Addresses:** Differentiators such as case-study cards, evidence matrix depth, richer portfolio scan paths.
**Avoids:** Building polish before trust boundaries and conversion foundations are reliable.

### Phase Ordering Rationale

- Public-safe facts must come first because both the homepage and chatbot need one verified source of truth.
- Static proof and conversion sections should precede chatbot promotion because visitors need context before asking fit questions.
- Assistant work should precede endpoint hardening only where it defines the request/response behavior that hardening must protect.
- Endpoint hardening should be isolated from broad UI changes to reduce review risk and keep security behavior testable.
- Verification must be its own phase or explicit phase gate because lint/build alone will not catch AI overclaiming, spam relay behavior, mobile overflow, or inaccessible async flows.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3:** OpenAI model choice and assistant behavior should be checked against current official docs and the deployed account before implementation.
- **Phase 4:** Durable rate limiting, trusted client IP metadata, bot protection, provider quotas, and monitoring depend on the production host and require current official docs plus approval.
- **Phase 5:** If formal route/browser tests are added, test runner choice requires dependency approval and package/version research.
- **Phase 6:** Case-study claims and any testimonials/logos require source validation and user approval before publication.

Phases with standard patterns (skip research-phase):
- **Phase 1:** Typed local content modules and public-safe claim boundaries are straightforward within the current TypeScript app.
- **Phase 2:** Server-rendered section composition and existing CSS refinement are standard for this codebase.
- **Phase 5 manual checks:** Lint, typecheck, build, curl/manual route checks, and browser screenshots are established project verification patterns.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Grounded in current repo files and official Next.js, OpenAI, and Resend docs checked on 2026-05-30; exact OpenAI model remains account-dependent. |
| Features | HIGH | Directly derived from `.planning/PROJECT.md`, current portfolio goals, product inventory boundaries, and existing page/chat/contact structure. |
| Architecture | HIGH | Matches current App Router structure and codebase maps; production abuse controls are medium-confidence until hosting is known. |
| Pitfalls | HIGH | Repository-specific endpoint, privacy, copy-accuracy, accessibility, and verification risks are well evidenced by current files and planning docs. |

**Overall confidence:** HIGH

### Gaps to Address

- **OpenAI model availability:** Verify `OPENAI_MODEL` against the deployed account and current official model docs before hard-coding or documenting a model recommendation.
- **Production hosting assumptions:** Identify deployment platform before selecting trusted client IP source, durable limiter, quota mechanism, or shared abuse controls.
- **CV and experience-letter exact claims:** Manually verify scanned/partial documents before publishing duties, dates, metrics, identifiers, or employer-specific statements.
- **Dependency approvals:** Any CAPTCHA, Redis/KV, analytics, monitoring, schema validation, browser test runner, or UI package needs explicit approval before implementation.
- **Security completion criteria:** Define exact route checks/tests and chatbot probes in requirements before a phase can claim endpoint hardening is complete.
- **Public copy approval:** Confirm which contact details, business metrics, employer details, and project statuses are intentionally public before publishing.

## Sources

### Primary (HIGH confidence)
- `.planning/PROJECT.md` — project purpose, active requirements, constraints, security/privacy boundaries, and positioning.
- `.planning/research/STACK.md` — current stack recommendation, version notes, dependency policy, API docs checked on 2026-05-30.
- `.planning/research/FEATURES.md` — table stakes, differentiators, anti-features, dependencies, and MVP recommendation.
- `.planning/research/ARCHITECTURE.md` — recommended component boundaries, data flow, patterns, anti-patterns, and build order.
- `.planning/research/PITFALLS.md` — critical/moderate/minor pitfalls, phase warnings, and later verification checklist.
- `PRODUCT_INVENTORY.md` — publication boundaries and safe project claim rules.
- `.planning/codebase/CONCERNS.md` — endpoint, validation, testing, accessibility, and production hardening risks.
- `app/page.tsx`, `app/api/chat/route.ts`, `app/api/contact/route.ts`, `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`, `app/globals.css` — current implementation evidence.

### Secondary (MEDIUM confidence)
- `.codex/skills/ui-ux-pro-max/SKILL.md` and local design-system query on 2026-05-30 — portfolio layout, accessibility, responsive, and conversion guidance.
- Nielsen Norman Group and conversational-AI UX references cited by feature research — support for general UX/chat trust patterns, with implementation still requiring local QA.

### Tertiary (LOW confidence)
- No roadmap-critical recommendation depends only on tertiary sources. Exact scanned-letter details, live product/publication claims beyond inventory, and future testimonials/logos need validation before use.

---
*Research completed: 2026-05-30*
*Ready for roadmap: yes*
