# External Integrations

**Analysis Date:** 2026-06-06
**Repository Root:** `/Users/atharmushtaq/projects/portfolio`

## Integration Summary

| Integration | Status | Boundary | Primary Evidence |
|---|---|---|---|
| OpenAI through Vercel AI SDK | Active | Server route plus streaming client | `app/api/chat/route.ts`, `app/ui/chat-board.tsx` |
| Resend email delivery | Active | Server-only route | `app/api/contact/route.ts` |
| Google-hosted fonts through Next.js | Active at build/runtime handling | Framework font loader | `app/layout.tsx` |
| External portfolio links | Active outbound links | Browser navigation | `app/lib/content.ts` |
| Database, auth, storage, analytics, monitoring | Not detected | Not applicable | `package.json`, `app/` scan |

## OpenAI Chat Integration

**Purpose:** Power the public portfolio assistant with concise, portfolio-specific streamed answers.

- The first-party endpoint is `POST /api/chat`, implemented in `app/api/chat/route.ts`.
- The client integration uses `useChat({ api: "/api/chat" })` from `ai/react` in `app/ui/chat-board.tsx`.
- The current request contract is the Vercel AI SDK chat shape containing a `messages` array.
- The route calls `streamText` from `ai` with `openai(...)` from `@ai-sdk/openai`.
- The route returns `result.toDataStreamResponse()`, so responses are streamed rather than returned as a single `{ reply }` JSON object.
- `OPENAI_API_KEY` is the provider credential; it is consumed implicitly by `@ai-sdk/openai`.
- `OPENAI_MODEL` is an optional model override; `app/api/chat/route.ts` defaults to `gpt-4o`.
- The assistant system context is embedded directly in `app/api/chat/route.ts`.
- Input validation and conversation truncation live in `app/api/chat/security.ts`.
- Chat guardrails cap input length, retained message history, output tokens, burst traffic, daily traffic, per-user estimated cost, and global estimated cost.
- Chat usage and cost counters are stored only in process memory and reset on restart or deployment.
- The route derives its user key from `x-forwarded-for` with an `anonymous` fallback.
- `app/api/chat/route.ts` currently logs the caught error object with `console.error`; client responses remain generic.
- The installed `openai` package is not the active client for this route and is not imported by current application source.

## Resend Contact Integration

**Purpose:** Deliver qualified project leads from the public contact form to a configured mailbox.

- The first-party endpoint is `POST /api/contact`, implemented in `app/api/contact/route.ts`.
- `app/ui/contact-form.tsx` submits same-origin JSON using browser `fetch`.
- The active payload fields are `name`, `email`, `building`, `platform`, `timeline`, `budget`, optional `source`, and honeypot `website`.
- The route uses the `Resend` SDK and calls `resend.emails.send(...)`.
- `RESEND_API_KEY` authenticates the provider request.
- `CONTACT_TO_EMAIL` configures the recipient.
- `CONTACT_FROM_EMAIL` configures the sender.
- The submitted visitor email is assigned to `replyTo`.
- The route validates required fields, allowed select values, email shape, and field lengths before calling Resend.
- A populated hidden `website` field is treated as a bot submission and receives a successful no-send response.
- Contact abuse control is a process-local per-IP limit of five attempts per 60 seconds.
- The route derives its rate-limit key from `x-forwarded-for`, then `x-real-ip`, then `local`.
- The endpoint explicitly uses the Node.js runtime through `export const runtime = "nodejs"`.

## First-Party Public API Surface

| Route | Client | External Service | Success Form | Failure Handling |
|---|---|---|---|---|
| `POST /api/chat` | `app/ui/chat-board.tsx` | OpenAI via `@ai-sdk/openai` | Vercel AI SDK data stream | JSON error response with generic user-safe message |
| `POST /api/contact` | `app/ui/contact-form.tsx` | Resend | JSON `{ "ok": true }` | JSON error response with explicit HTTP status |

- Both endpoints are unauthenticated and intentionally public.
- Neither endpoint persists request data to a database.
- Both endpoints rely on caller IP headers supplied by the hosting/proxy layer.
- Current in-memory throttling is best-effort only and is not shared across server instances.

## Framework-Managed External Resources

- `app/layout.tsx` imports `Inter` and `Geist_Mono` from `next/font/google`.
- Next.js manages font fetching/optimization rather than the page directly loading a Google Fonts stylesheet.
- `next/image` handles local image rendering in `app/page.tsx` and `app/ui/project-tile.tsx`.
- No remote image host allowlist is configured in `next.config.ts`; current rendered project imagery is local.

## Outbound Browser Links

- LinkedIn profile URL is defined in `app/lib/content.ts`.
- GitHub profile URL is defined in `app/lib/content.ts`.
- A deployed NexPOS/AuraPOS project URL on Vercel is defined in `app/lib/content.ts`.
- Two Apple App Store product URLs are defined in `app/lib/content.ts`.
- Project links rendered by `app/page.tsx` use `target="_blank"` and `rel="noopener noreferrer"`.
- These links are navigation integrations only; the app does not call their APIs or exchange credentials with them.

## Data Storage and State

- No database client, database environment variable, ORM, or migration system was detected.
- No cloud object storage or upload integration was detected.
- No persistent cache, Redis, Upstash, Vercel KV, or queue integration was detected.
- Chat cost/rate state is stored in module memory in `app/api/chat/security.ts`.
- Contact rate-limit state is stored in module memory in `app/api/contact/route.ts`.
- Theme preference is the only detected browser-persisted value and is stored in `localStorage` by `app/ui/site-nav.tsx`.
- Chat conversation state and contact form state remain local to React components.

## Authentication, Analytics, and Observability

- No authentication or authorization provider is integrated.
- No cookies, sessions, account model, or protected application route was detected.
- No analytics, advertising, telemetry, or product-event SDK was detected.
- No Sentry, Datadog, Axiom, OpenTelemetry, or external monitoring SDK was detected.
- No incoming third-party webhook receiver was detected.
- No outgoing webhook callback integration was detected beyond direct OpenAI and Resend API calls.

## Environment Variables

| Variable | Required For | Read Location |
|---|---|---|
| `OPENAI_API_KEY` | Live OpenAI chat | Implicit provider configuration used by `app/api/chat/route.ts` |
| `OPENAI_MODEL` | Optional model selection | `app/api/chat/route.ts` |
| `RESEND_API_KEY` | Contact email authentication | `app/api/contact/route.ts` |
| `CONTACT_TO_EMAIL` | Contact recipient | `app/api/contact/route.ts` |
| `CONTACT_FROM_EMAIL` | Contact sender | `app/api/contact/route.ts` |

- Variable names are documented in `.env.example`, `README.md`, and `OPERATIONS.md`.
- Real values belong in `.env.local` or deployment-provider secret storage.
- `.gitignore` excludes local environment files and preserves `.env.example`.

## Current-State Operational Notes

- `README.md` and `OPERATIONS.md` describe `OPENAI_MODEL=gpt-5.5`, while `.env.example` and the current route fallback use `gpt-4o`.
- The `/api/chat` curl example in `OPERATIONS.md` submits `{ "message": ... }`, but the current route validates a `messages` array.
- The `/api/contact` curl example in `OPERATIONS.md` uses older field names, while the current route requires `building`, `platform`, `timeline`, and `budget`.
- The missing-environment expectation documented for chat is a `503`, but the current chat route has no explicit configuration check and catches provider failure as a `500`.
- No deployment configuration or CI pipeline is present, so host-level secret configuration, proxy-header trust, streaming support, and multi-instance rate limiting must be verified outside the repository.
