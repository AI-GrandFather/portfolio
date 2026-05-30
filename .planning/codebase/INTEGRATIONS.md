# External Integrations

**Analysis Date:** 2026-05-30

## APIs & External Services

**AI:**
- OpenAI Responses API - Powers the portfolio chat assistant exposed by `app/api/chat/route.ts`.
  - SDK/Client: `openai` 6.39.1 from `package.json`; imported as `OpenAI` in `app/api/chat/route.ts`.
  - Auth: `OPENAI_API_KEY`.
  - Model config: optional `OPENAI_MODEL`; `app/api/chat/route.ts` defaults to `gpt-5.5`.
  - Runtime boundary: server-only Next route handler with `export const runtime = "nodejs"` in `app/api/chat/route.ts`.
  - Client entry: `app/ui/chat-board.tsx` posts `{ message }` to `/api/chat`.

**Email Delivery:**
- Resend - Sends contact form submissions to the configured recipient from `app/api/contact/route.ts`.
  - SDK/Client: `resend` 6.12.4 from `package.json`; imported as `Resend` in `app/api/contact/route.ts`.
  - Auth: `RESEND_API_KEY`.
  - Routing config: `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
  - Runtime boundary: server-only Next route handler with `export const runtime = "nodejs"` in `app/api/contact/route.ts`.
  - Client entry: `app/ui/contact-form.tsx` posts contact payloads to `/api/contact`.

**First-Party API Routes:**
- `/api/chat` - Next.js POST route implemented in `app/api/chat/route.ts`; validates JSON, rate-limits by forwarded IP header, calls OpenAI, and returns `{ reply }` or an error JSON response.
  - Client: `app/ui/chat-board.tsx`.
  - Abuse control: in-memory per-IP bucket with `MAX_REQUESTS_PER_WINDOW = 8` and `WINDOW_MS = 60_000` in `app/api/chat/route.ts`.
- `/api/contact` - Next.js POST route implemented in `app/api/contact/route.ts`; validates contact fields, rate-limits by forwarded IP header, sends email with Resend, and returns `{ ok: true }` or an error JSON response.
  - Client: `app/ui/contact-form.tsx`.
  - Abuse control: in-memory per-IP bucket with `MAX_REQUESTS_PER_WINDOW = 5` and `WINDOW_MS = 60_000` in `app/api/contact/route.ts`.

## Data Storage

**Databases:**
- Not detected.
  - Connection: Not applicable.
  - Client: Not applicable.
  - Evidence: No database clients or connection environment variables were detected in `package.json`, `app/api/chat/route.ts`, `app/api/contact/route.ts`, `README.md`, or `OPERATIONS.md`.

**File Storage:**
- Local repository assets only.
  - App icon: `app/icon.svg`.
  - QA screenshots: `qa-screenshots/portfolio-desktop.png` and `qa-screenshots/portfolio-mobile.png`.
  - No S3, Supabase Storage, Cloudinary, UploadThing, or filesystem upload flow was detected.

**Caching:**
- In-memory route-level rate-limit buckets only.
  - Chat bucket: module-level `Map<string, { count: number; resetAt: number }>` in `app/api/chat/route.ts`.
  - Contact bucket: module-level `Map<string, { count: number; resetAt: number }>` in `app/api/contact/route.ts`.
  - No Redis, CDN cache config, KV store, or persistent cache integration was detected.

## Authentication & Identity

**Auth Provider:**
- Not detected.
  - Implementation: Public portfolio with unauthenticated routes and forms.
  - User identity is not persisted; public endpoints derive a rate-limit key from `x-forwarded-for`, `x-real-ip`, or `"local"` in `app/api/chat/route.ts` and `app/api/contact/route.ts`.

## Monitoring & Observability

**Error Tracking:**
- None detected.
  - No Sentry, LogRocket, Datadog, Axiom, OpenTelemetry, or analytics SDK dependency was found in `package.json`.

**Logs:**
- No application logging is implemented in the scanned source.
  - `app/api/chat/route.ts` and `app/api/contact/route.ts` catch integration errors and return generic JSON errors without logging response bodies or user-submitted content.
  - `OPERATIONS.md` explicitly instructs not to log full user messages, secrets, signed URLs, uploaded files, or private local paths.

## CI/CD & Deployment

**Hosting:**
- Not explicitly configured.
  - No `vercel.json`, `netlify.toml`, Dockerfile, or deployment workflow was detected.
  - The app is compatible with a Node-capable Next.js host because API routes in `app/api/chat/route.ts` and `app/api/contact/route.ts` require `runtime = "nodejs"`.

**CI Pipeline:**
- None detected.
  - No `.github/workflows` directory or CI config file was found in the repository scan.
  - Local verification commands are documented in `OPERATIONS.md`: `npm run lint`, `npm run typecheck`, and `npm run build`.

## Environment Configuration

**Required env vars:**
- `OPENAI_API_KEY` - Required by `app/api/chat/route.ts` for live chat.
- `OPENAI_MODEL` - Optional model override read by `app/api/chat/route.ts`.
- `RESEND_API_KEY` - Required by `app/api/contact/route.ts` for email delivery.
- `CONTACT_TO_EMAIL` - Required recipient address used by `app/api/contact/route.ts`.
- `CONTACT_FROM_EMAIL` - Required sender address used by `app/api/contact/route.ts`.

**Secrets location:**
- Local development uses `.env.local` per `README.md` and `OPERATIONS.md`.
- `.env.example` exists as a committed template surface, but secret values must not be committed.
- `.gitignore` excludes `.env` and `.env*.local`; real values should stay in local or deployment-provider secret storage.

## Webhooks & Callbacks

**Incoming:**
- None detected.
  - `app/api/chat/route.ts` and `app/api/contact/route.ts` are public POST endpoints for first-party UI forms, not third-party webhook receivers.

**Outgoing:**
- OpenAI API call from `app/api/chat/route.ts` via `client.responses.create(...)`.
- Resend email API call from `app/api/contact/route.ts` via `resend.emails.send(...)`.
- No outgoing webhook callbacks to third-party user-configured URLs were detected.

---

*Integration audit: 2026-05-30*
