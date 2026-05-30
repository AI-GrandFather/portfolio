# Architecture Patterns

**Domain:** Client-onboarding portfolio with AI assistant and public lead endpoints
**Project:** Mian Muhammad Athar Portfolio
**Researched:** 2026-05-30
**Overall confidence:** HIGH for current repo structure and local architectural recommendations; MEDIUM for production abuse-control recommendations because final hosting/runtime is not specified.

## Recommended Architecture

Keep the portfolio as a focused Next.js App Router application with four clear boundaries:

1. **Content source modules** for proof, capabilities, process, bio, AI workflow copy, and assistant-safe facts.
2. **Server page composition** for the root portfolio route, organized into richer but still static sections.
3. **Client interaction islands** for chat and contact only, with no secrets, no provider SDKs, and no authority over validation.
4. **Server-only public endpoint layer** for validation, abuse controls, third-party calls, and production-safe error responses.

The current app already has the right foundation: `app/page.tsx` renders the page, `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx` isolate browser state, and `app/api/chat/route.ts` plus `app/api/contact/route.ts` keep OpenAI and Resend calls server-side. The improvement roadmap should strengthen those seams without introducing a broad architecture rewrite.

```text
app/
├── content/
│   ├── portfolio.ts          # typed project proof, bio facts, capability copy
│   └── assistant-context.ts  # bounded public facts shared by chat route
├── page.tsx                  # root route composition only
├── sections/
│   ├── hero-section.tsx
│   ├── proof-section.tsx
│   ├── ai-capability-section.tsx
│   ├── process-section.tsx
│   ├── chat-section.tsx
│   └── contact-section.tsx
├── ui/
│   ├── chat-board.tsx        # client state and /api/chat fetch
│   └── contact-form.tsx      # client state and /api/contact fetch
└── api/
    ├── _lib/
    │   ├── request.ts        # JSON parsing, client key extraction
    │   ├── rate-limit.ts     # local limiter fallback and cleanup
    │   └── responses.ts      # consistent public JSON errors
    ├── chat/route.ts         # chat validation, budget guardrails, OpenAI call
    └── contact/route.ts      # contact validation, spam friction, Resend call
```

Do not create all of this at once. Use this structure as the target shape while improving the portfolio. Extract only when the next section or endpoint hardening step would otherwise make the current files hard to review.

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `app/content/portfolio.ts` | Public-safe portfolio facts: projects, proof categories, bio claims, AI workflow capabilities, process copy, contact select values. | Imported by server page/sections and, selectively, assistant context builder. |
| `app/content/assistant-context.ts` | Bounded chat persona and allowed claims derived from public-safe facts. | Imported only by `app/api/chat/route.ts`; never by client components if it includes prompt instructions. |
| `app/page.tsx` | Route-level composition, section ordering, anchors, metadata-adjacent page structure. | Imports server sections and client islands indirectly. |
| `app/sections/*` | Static server components for hero, proof, case studies, AI capabilities, process, chat intro, and contact intro. | Read typed content modules; render semantic HTML and global/CSS-module classes. |
| `app/ui/chat-board.tsx` | Browser-only chat state, starter prompts, submit state, accessible status/errors, same-origin fetch to `/api/chat`. | Calls `/api/chat`; does not know OpenAI model, prompt, rate limits, or API key. |
| `app/ui/contact-form.tsx` | Browser-only form state, field collection, submit state, accessible status/errors, same-origin fetch to `/api/contact`. | Calls `/api/contact`; does not validate authoritatively or know Resend configuration. |
| `app/api/_lib/*` | Shared public endpoint plumbing: safe JSON parsing, client key extraction, local limiter fallback, public error shape. | Used by chat/contact routes; must remain server-only. |
| `app/api/chat/route.ts` | Chat request validation, rate/budget checks, prompt assembly, OpenAI Responses API call, safe public errors. | Receives browser POST; calls OpenAI with server env only. |
| `app/api/contact/route.ts` | Lead validation, allowlists, bot friction, rate checks, email normalization, Resend send. | Receives browser POST; calls Resend with server env only. |
| `app/globals.css` | Shared tokens, base layout, and current global visual language. | Used by all sections/components until component CSS growth justifies scoped styles. |

## Data Flow

### Portfolio Render Flow

1. `app/page.tsx` imports public-safe content from `app/content/portfolio.ts`.
2. `page.tsx` composes sections in conversion order: hero, proof-backed bio, selected work/case-study proof, AI delivery capability, process, chat, contact.
3. Static server sections map typed data into semantic HTML. This keeps richer proof sections reviewable without turning `page.tsx` into a long mixed content/rendering file.
4. `ChatBoard` and `ContactForm` remain the only client components unless a future section requires browser state.
5. CSS remains grounded in the existing product-lab style. Split styles only when a component becomes independently complex enough that global selectors create review risk.

### Chat Flow

1. `ChatBoard` sends `{ message }` to `/api/chat`.
2. The chat route parses JSON safely, rejects malformed/oversized payloads, applies local and production limiter hooks, and checks an emergency disable/budget flag if added.
3. The route assembles the assistant context from a public-safe facts module plus explicit behavior rules.
4. OpenAI is called server-side only. The route returns `{ reply }` on success or a generic public error on failure.
5. `ChatBoard` renders the assistant reply and bounded error/status states. It should cap retained messages and provide a clear/reset action if longer sessions are supported.

Important architectural decision: keep the assistant stateless for this milestone. Multi-turn memory, lead capture inside chat, retrieval, or private document search would add privacy, retention, and prompt-injection complexity that is not needed for a client-onboarding v1.

### Contact Flow

1. `ContactForm` sends `{ name, email, projectType, budget, message, honeypot? }` to `/api/contact`.
2. The contact route parses JSON safely and validates every field server-side.
3. Server-side allowlists validate `projectType` and `budget`; client select options are convenience only.
4. Bot friction runs before Resend: honeypot rejection, URL-density checks, message length caps, per-client throttling, and generic public failures.
5. Resend is called server-side only. User-provided values are normalized before inclusion in subject, reply-to, and email body.
6. The route returns a small success/error JSON contract. No lead database is introduced until retention, access control, deletion, and abuse policies are defined.

## Patterns to Follow

### Pattern 1: Typed Content Modules as Claim Boundaries

**What:** Move portfolio facts out of `app/page.tsx` into typed public-safe modules before adding richer proof sections.

**When:** Use this before expanding project cards into case-study cards, proof-backed bio blocks, AI capability copy, and assistant context.

**Why:** The current `app/page.tsx` colocates content arrays with rendering. That is acceptable for the current small page, but richer proof sections will make claim review harder. A typed content module creates one place to verify public claims against `PRODUCT_INVENTORY.md` and source documents.

**Example:**

```typescript
export type ProjectProof = {
  name: string;
  status: "published" | "built" | "prototype" | "pipeline";
  category: string;
  publicClaim: string;
  proofPoints: string[];
  safeToDescribeAsLaunched: boolean;
};
```

Keep this module public-safe. Do not include private CV file paths, private document identifiers, secret repository details, addresses, or unpublished client-sensitive data.

### Pattern 2: Server Sections Before New Client Components

**What:** Build proof, AI capability, bio, case studies, and process improvements as server components.

**When:** Default to server components for all static or content-driven sections. Use `"use client"` only for stateful interactions.

**Why:** Static client-onboarding content does not need browser JavaScript. Keeping it server-rendered preserves the current simple data flow and reduces hydration surface.

**Example:**

```typescript
import { projectProof } from "../content/portfolio";

export function ProofSection() {
  return (
    <section className="section proof-section" id="proof">
      {projectProof.map((project) => (
        <article className="proof-card" key={project.name}>
          <p>{project.category}</p>
          <h3>{project.name}</h3>
          <ul>
            {project.proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
```

### Pattern 3: Server-Only API Helpers for Public Endpoints

**What:** Extract repeated public endpoint plumbing only after chat/contact hardening begins.

**When:** Use this once both routes need the same parsing, public error shape, IP/client key logic, and limiter cleanup.

**Why:** The current duplication is small, but security fixes will otherwise be copied by hand across two public endpoints. Shared helpers reduce drift while leaving route-specific validation close to each route.

**Example boundaries:**

```typescript
// app/api/_lib/responses.ts
export function publicError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// app/api/contact/route.ts
// Route owns allowlists, field validation, Resend payload construction.
```

Do not move OpenAI or Resend SDK calls into generic helpers unless a second route truly shares that provider.

### Pattern 4: Public Assistant Context Generated from Approved Facts

**What:** Build the chat prompt from a curated facts object instead of manually duplicating project claims in the route.

**When:** Use this before upgrading the chatbot into a stronger second self.

**Why:** The assistant and homepage must not drift. If `Block Crush Game` is the only verified published app, both the public copy and assistant must honor that same boundary.

**Recommendation:** Store public facts in `app/content/portfolio.ts`; export a function from `app/content/assistant-context.ts` that converts only approved facts into instructions. Keep behavior rules explicit: concise, no guaranteed pricing/timelines, no secret requests, no claims beyond inventory, encourage contact form for concrete leads.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Chatbot as a General Memory System

**What:** Adding persistent chat history, private document retrieval, or lead qualification inside the chat before policy and security boundaries exist.

**Why bad:** It creates privacy, retention, prompt-injection, and budget-abuse risk. The current goal is a bounded public second self, not a CRM.

**Instead:** Keep the assistant stateless and public-fact-bound. Let it answer capability, fit, process, and first-plan questions, then route serious leads to the contact form.

### Anti-Pattern 2: Client-Side Validation as Authority

**What:** Relying on `maxLength`, `required`, select options, or hidden fields in the browser as the main protection.

**Why bad:** Public clients can post directly to `/api/chat` and `/api/contact`.

**Instead:** Treat client validation as UX only. Enforce message caps, contact field caps, enum allowlists, spam checks, and rate limits inside route handlers.

### Anti-Pattern 3: One Large Page and One Large Stylesheet Forever

**What:** Adding all new proof sections, AI copy, bio narrative, case-study cards, and responsive styling directly into `app/page.tsx` and `app/globals.css`.

**Why bad:** Review becomes harder, copy claims drift from source documents, and UI changes can accidentally affect unrelated sections.

**Instead:** Extract typed content first, then server section components. Keep global CSS tokens/base styles, but split styles later only when selector ownership becomes unclear.

### Anti-Pattern 4: Adding Infrastructure Before Policy

**What:** Adding lead storage, analytics, monitoring SDKs, paid CAPTCHA, Redis/KV, or CRM integrations without explicit approval and policy decisions.

**Why bad:** This project has strict dependency, privacy, and security constraints. New infrastructure changes retention, cost, and operational risk.

**Instead:** First harden with no-new-dependency steps where feasible: server allowlists, honeypot, safer errors, lower token caps, endpoint tests, timeout handling, and local limiter cleanup. Escalate durable rate limiting or CAPTCHA as a separate approved decision.

## Build Order Implications

Recommended phase order:

1. **Claim and content architecture**
   - Create public-safe typed content modules for projects, proof, bio facts, AI workflow claims, process copy, and contact enums.
   - Rationale: richer UI and assistant behavior both depend on accurate, reusable facts.
   - Avoids: homepage/assistant claim drift and accidental publication of private CV or document details.

2. **Section architecture and UI/UX composition**
   - Split `app/page.tsx` into server sections only where it improves reviewability.
   - Add proof-backed sections, case-study cards, AI capability section, stronger conversion CTAs, and accessible section structure.
   - Rationale: builds client-onboarding value without changing endpoint behavior.
   - Avoids: unrelated API/security churn during visual/content work.

3. **Bounded chatbot second self**
   - Generate assistant context from approved public facts.
   - Expand prompts and responses around capabilities, project fit, process, AI workflows, and safe next steps.
   - Add client UX improvements such as reset, capped local history, `aria-busy`, and clearer error/status semantics.
   - Rationale: assistant quality depends on claim architecture and public facts.
   - Avoids: unsupported claims and unnecessary persistent memory.

4. **Public endpoint hardening**
   - Extract shared server helpers only where chat/contact duplicate security plumbing.
   - Add server allowlists, safer public errors, honeypot/contact spam friction, limiter cleanup, timeouts, generic config errors, model/env documentation, and emergency disable flags.
   - Rationale: security changes need focused review and tests.
   - Avoids: weakening public endpoints while copy and UI are still moving.

5. **Verification coverage**
   - Add focused route tests for validation, malformed JSON, overlength payloads, rate limits, provider failure, and success mocks.
   - Add client flow checks for chat/contact success and error states.
   - Add desktop/mobile screenshot verification after layout changes.
   - Rationale: security and conversion claims require proof before completion.

## Security Boundaries

| Boundary | Rule | Current State | Recommendation |
|----------|------|---------------|----------------|
| Browser to API | Browser sends only user input; server decides validity. | Client components call same-origin `/api/chat` and `/api/contact`. | Keep this. Add clearer response contracts and accessible client error handling. |
| Client to secrets | No secrets or provider SDKs in client bundles. | OpenAI and Resend are route-only. | Keep SDK/env reads in route handlers or server-only modules. |
| Public facts to assistant | Assistant may only claim public-safe, verified facts. | `portfolioContext` duplicates facts inside chat route. | Generate context from approved content module to prevent drift. |
| Public endpoints to providers | Validate and throttle before paid/provider calls. | Basic length validation and per-process rate limits exist. | Add enum allowlists, bot friction, timeout handling, budget flags, and generic errors. |
| IP/client identity | Do not trust arbitrary proxy headers without hosting assumptions. | Routes read `x-forwarded-for`/`x-real-ip` directly. | Document hosting behavior; prefer platform-provided client IP when available; keep local fallback best-effort. |
| Contact email surface | User input must not control unsafe headers or broad subject content. | `replyTo` and subject include submitted fields after basic checks. | Server-side allowlists for project/budget, stricter normalization, generic subjects with sanitized category. |
| Lead persistence | No storage until policy exists. | Email-only, no database. | Keep email-only for this milestone unless privacy/retention/admin/deletion policies are defined. |
| Error messages | Public users should not see deployment internals. | Missing config messages are explicit. | Return generic unavailable messages publicly; keep detail for server logs only if logging is added safely. |

## Scalability Considerations

| Concern | Current / 100 users | 10K users | 1M users |
|---------|----------------------|-----------|----------|
| Static portfolio content | Current App Router static/server render is enough. | Typed content modules and server sections remain fine. | Consider CMS/static generation only if non-developers need frequent edits. |
| Chat cost and abuse | In-memory limiter and token caps are best-effort. | Requires shared limiter, global daily token/request budgets, monitoring, and emergency disable. | Requires durable abuse platform, observability, queueing or stricter gating, and formal incident process. |
| Contact spam | Basic validation and per-process throttling only. | Requires bot friction, shared limiter, provider quota monitoring, and spam heuristics. | Requires durable lead pipeline, reputation monitoring, and privacy/retention program. |
| UI maintenance | Single page and global CSS are manageable. | Section components and typed content are needed. | Consider design system conventions and visual regression automation. |
| Assistant quality | Static prompt is acceptable. | Public-fact context builder and test prompts become necessary. | Retrieval/evals may be needed, but only with privacy and prompt-injection controls. |

## Research Flags

- **Endpoint hardening needs deeper implementation research if production hosting is chosen.** The correct durable limiter and trusted client IP source depend on deployment platform.
- **OpenAI model choice should be verified against current official OpenAI docs and the deployed account before implementation.** Current code defaults to `gpt-5.5`; availability should not be assumed.
- **Bot protection or shared rate limiting requires dependency/infrastructure approval.** Do not add Turnstile, CAPTCHA, Redis/KV, Upstash, analytics, or monitoring SDKs without an explicit approval step.
- **Proof copy needs source validation before exact claims.** CV and experience-letter details should be manually verified before publishing precise duties, metrics, identifiers, or document-derived claims.

## Sources

- `.planning/PROJECT.md` - project purpose, active requirements, constraints, and security/privacy boundaries.
- `.planning/codebase/ARCHITECTURE.md` - current App Router layers, route handlers, data flow, and architectural constraints.
- `.planning/codebase/STRUCTURE.md` - current directory layout and where new code belongs.
- `.planning/codebase/CONCERNS.md` - public endpoint risks, validation gaps, drift risks, and testing gaps.
- `app/page.tsx` - current single-page composition and hard-coded content arrays.
- `app/globals.css` - current global visual system and responsive layout.
- `app/ui/chat-board.tsx` - current client chat island and `/api/chat` contract.
- `app/ui/contact-form.tsx` - current client contact island and `/api/contact` contract.
- `app/api/chat/route.ts` - current OpenAI route, prompt context, validation, and rate limit behavior.
- `app/api/contact/route.ts` - current Resend route, validation, email construction, and rate limit behavior.
