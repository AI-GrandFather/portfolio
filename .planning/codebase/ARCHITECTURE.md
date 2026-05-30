<!-- refreshed: 2026-05-30 -->
# Architecture

**Analysis Date:** 2026-05-30

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router UI                    │
├──────────────────┬──────────────────┬───────────────────────┤
│   Root Layout    │   Home Page      │   Client Widgets      │
│ `app/layout.tsx` │ `app/page.tsx`   │ `app/ui/*.tsx`        │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Server Route Handlers                      │
│      `app/api/chat/route.ts`, `app/api/contact/route.ts`    │
└────────┬────────────────────────────────────────┬───────────┘
         │                                        │
         ▼                                        ▼
┌──────────────────────────────┐       ┌──────────────────────┐
│ OpenAI Responses API          │       │ Resend Email API     │
│ `OPENAI_API_KEY`              │       │ `RESEND_API_KEY`     │
└──────────────────────────────┘       └──────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root layout | Defines global metadata, imports global styles, and wraps every route in the App Router document shell. | `app/layout.tsx` |
| Home page | Owns the static portfolio content arrays, anchor navigation, and section composition for hero, work, capabilities, process, chat, and contact. | `app/page.tsx` |
| Chat board | Runs client-side chat state, prompt buttons, message submission, loading state, and error rendering. | `app/ui/chat-board.tsx` |
| Contact form | Runs client-side form collection, submission state, success/error rendering, and reset on successful send. | `app/ui/contact-form.tsx` |
| Chat API route | Validates public chat requests, applies in-memory IP rate limiting, calls OpenAI, and returns assistant text as JSON. | `app/api/chat/route.ts` |
| Contact API route | Validates lead payloads, applies in-memory IP rate limiting, sends email through Resend, and returns JSON status. | `app/api/contact/route.ts` |
| Global visual system | Defines CSS variables, page layout classes, responsive rules, form styling, chat styling, and card/grid styling. | `app/globals.css` |

## Pattern Overview

**Overall:** Small Next.js App Router portfolio with server-rendered content, client-side interactive islands, and server-only integration routes.

**Key Characteristics:**
- Keep public content and section composition in the server component page at `app/page.tsx`; add interactivity by importing isolated client components from `app/ui/`.
- Keep third-party secrets and SDK calls inside route handlers under `app/api/**/route.ts`; client components call same-origin endpoints with `fetch`.
- Use module-local constants for static content, validation limits, prompt context, and route rate-limit buckets in `app/page.tsx`, `app/api/chat/route.ts`, and `app/api/contact/route.ts`.
- Use global CSS classes from `app/globals.css` rather than CSS modules or component-scoped style files.

## Layers

**App Shell:**
- Purpose: Provide the document wrapper, metadata, and global stylesheet.
- Location: `app/layout.tsx`
- Contains: `metadata`, `RootLayout`, `<html lang="en">`, and `<body>{children}</body>`.
- Depends on: `next` metadata types and `app/globals.css`.
- Used by: Every App Router route, including `app/page.tsx` and `app/api/**/route.ts` at runtime.

**Page Composition:**
- Purpose: Render the portfolio landing page and compose static content with interactive widgets.
- Location: `app/page.tsx`
- Contains: Static arrays for projects, capabilities, and process; the `Home` server component; anchor sections; imports for `ChatBoard` and `ContactForm`.
- Depends on: `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`, and CSS class names defined in `app/globals.css`.
- Used by: The root `/` route.

**Client Interaction:**
- Purpose: Manage browser-only form state and network submissions.
- Location: `app/ui/`
- Contains: `"use client"` React components, `useState`, form handlers, same-origin `fetch` calls, and user-visible status/error state.
- Depends on: React, browser `fetch`, and API response contracts from `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Used by: `app/page.tsx`.

**Server API Routes:**
- Purpose: Provide public POST endpoints that validate input, enforce lightweight abuse controls, and call external services.
- Location: `app/api/chat/route.ts` and `app/api/contact/route.ts`
- Contains: `runtime = "nodejs"`, `POST` handlers, request JSON parsing, validation, module-local rate limiting, environment variable reads, SDK calls, and `NextResponse.json` responses.
- Depends on: `next/server`, `openai`, `resend`, and server environment variables.
- Used by: Client components in `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx`.

**Styling:**
- Purpose: Centralize the full visual system and responsive behavior.
- Location: `app/globals.css`
- Contains: CSS variables, base element styles, portfolio section layouts, cards, chat UI, forms, buttons, and media queries.
- Depends on: Class names emitted by `app/page.tsx`, `app/ui/chat-board.tsx`, and `app/ui/contact-form.tsx`.
- Used by: `app/layout.tsx` imports the stylesheet globally.

## Data Flow

### Primary Page Render Path

1. Next.js loads the root route and applies `RootLayout` from `app/layout.tsx:10`.
2. `RootLayout` imports `app/globals.css` at `app/layout.tsx:2` and injects route children into the body at `app/layout.tsx:17`.
3. The `/` route renders `Home` from `app/page.tsx:87`.
4. `Home` maps static arrays into sections: projects at `app/page.tsx:157`, capabilities at `app/page.tsx:173`, and process items at `app/page.tsx:185`.
5. `Home` mounts `ChatBoard` at `app/page.tsx:205` and `ContactForm` at `app/page.tsx:216` as client-side interactive islands.

### Chat Flow

1. `ChatBoard` stores local messages, input, sending state, and error state with `useState` in `app/ui/chat-board.tsx:25`.
2. Manual form submit calls `handleSubmit` at `app/ui/chat-board.tsx:67`; prompt buttons call `sendMessage` directly at `app/ui/chat-board.tsx:76`.
3. `sendMessage` posts `{ message }` to `/api/chat` at `app/ui/chat-board.tsx:42`.
4. `POST` in `app/api/chat/route.ts:60` derives an IP key from request headers and checks `rateLimit` at `app/api/chat/route.ts:66`.
5. The route checks `OPENAI_API_KEY` at `app/api/chat/route.ts:73`, parses JSON at `app/api/chat/route.ts:83`, validates required and max-length input at `app/api/chat/route.ts:96` and `app/api/chat/route.ts:100`.
6. The route creates an OpenAI client at `app/api/chat/route.ts:108`, calls `client.responses.create` at `app/api/chat/route.ts:109`, and returns `{ reply: response.output_text }` at `app/api/chat/route.ts:118`.
7. `ChatBoard` appends the assistant reply at `app/ui/chat-board.tsx:53` or displays an error at `app/ui/chat-board.tsx:61`.

### Contact Flow

1. `ContactForm` tracks submission `status` and `error` in `app/ui/contact-form.tsx:8`.
2. `handleSubmit` collects form fields with `FormData` at `app/ui/contact-form.tsx:17` and posts JSON to `/api/contact` at `app/ui/contact-form.tsx:27`.
3. `POST` in `app/api/contact/route.ts:44` derives an IP key and checks `rateLimit` at `app/api/contact/route.ts:50`.
4. The route parses JSON at `app/api/contact/route.ts:59`, rejects non-object bodies at `app/api/contact/route.ts:64`, normalizes strings with `getString` from `app/api/contact/route.ts:18`, and validates required fields/email at `app/api/contact/route.ts:77`.
5. The route enforces field length caps at `app/api/contact/route.ts:90`.
6. The route requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` at `app/api/contact/route.ts:103`.
7. The route creates a Resend client at `app/api/contact/route.ts:115`, sends the lead email at `app/api/contact/route.ts:116`, and returns `{ ok: true }` at `app/api/contact/route.ts:131`.
8. `ContactForm` resets the form and marks `sent` at `app/ui/contact-form.tsx:38`, or marks `error` at `app/ui/contact-form.tsx:41`.

**State Management:**
- Server-rendered portfolio content is static module-local data in `app/page.tsx`.
- Client UI state is local React state in `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx`; there is no global client store.
- Public API rate limiting uses process-local `Map` instances in `app/api/chat/route.ts:10` and `app/api/contact/route.ts:8`; this state resets with the Node process and is not shared across instances.
- There is no database, persistent cache, queue, session store, or lead storage in this repo.

## Key Abstractions

**Route Handler Boundary:**
- Purpose: Keep secret-backed integrations server-only and expose small JSON contracts to the browser.
- Examples: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Pattern: `export const runtime = "nodejs"` plus `export async function POST(request: Request)` returning `NextResponse.json`.

**Interactive Island Components:**
- Purpose: Isolate client-side stateful behavior from the static page shell.
- Examples: `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`
- Pattern: `"use client"` at file top, React `useState`, local async submit handlers, and fetches to same-origin API routes.

**Static Portfolio Data Arrays:**
- Purpose: Keep current portfolio copy colocated with the rendered sections that consume it.
- Examples: `projects`, `capabilities`, and `process` in `app/page.tsx`
- Pattern: Module constants mapped directly in JSX with stable display keys.

**Inline Validation Helpers:**
- Purpose: Keep endpoint-specific validation close to the request handler.
- Examples: `getString`, `isEmail`, and `rateLimit` in `app/api/contact/route.ts`; `rateLimit` in `app/api/chat/route.ts`
- Pattern: Small module-local helpers with no shared utility layer.

**Global CSS Contract:**
- Purpose: Link JSX class names to a single stylesheet.
- Examples: `hero-shell`, `project-grid`, `chat-board`, `contact-form`, and `form-error` in `app/globals.css`
- Pattern: Components emit semantic class names and `app/globals.css` owns all layout and visual behavior.

## Entry Points

**Root Web Page:**
- Location: `app/page.tsx`
- Triggers: Browser GET request to `/`.
- Responsibilities: Render the portfolio, section anchors, static product evidence, chat section, and contact section.

**App Layout:**
- Location: `app/layout.tsx`
- Triggers: Next.js App Router wraps every route.
- Responsibilities: Set metadata, language, body wrapper, and global CSS import.

**Chat API:**
- Location: `app/api/chat/route.ts`
- Triggers: Browser POST request to `/api/chat` from `app/ui/chat-board.tsx`.
- Responsibilities: Rate limit, validate message input, call OpenAI Responses API, return assistant reply.

**Contact API:**
- Location: `app/api/contact/route.ts`
- Triggers: Browser POST request to `/api/contact` from `app/ui/contact-form.tsx`.
- Responsibilities: Rate limit, validate lead input, send email via Resend, return success/error JSON.

**Development Commands:**
- Location: `package.json`
- Triggers: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, and `npm run typecheck`.
- Responsibilities: Run the Next.js dev server, production build, production server, ESLint, and TypeScript no-emit checks.

## Architectural Constraints

- **Threading:** The app uses the standard Next.js Node.js request model. API routes explicitly set `runtime = "nodejs"` in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- **Global state:** Module-level rate-limit buckets live in `app/api/chat/route.ts:10` and `app/api/contact/route.ts:8`; use them only for best-effort per-process throttling.
- **Circular imports:** Not detected. Imports flow from `app/page.tsx` to `app/ui/*`, and client components call API routes over HTTP rather than importing server code.
- **Path aliases:** No custom import aliases are configured in `tsconfig.json`; use relative imports inside `app/`.
- **Secrets:** Environment variables are read only inside server route files: `OPENAI_API_KEY` and `OPENAI_MODEL` in `app/api/chat/route.ts`, plus `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in `app/api/contact/route.ts`.
- **Persistence:** No persistent storage layer exists. Contact submissions are delivered by email only, and chat history is browser-local component state only.
- **Styling:** Styling is global and class-name based in `app/globals.css`; do not introduce a competing styling system without a deliberate migration.

## Anti-Patterns

### Importing Server Integrations Into Client Components

**What happens:** Client components could import `openai`, `resend`, or server route helpers directly.
**Why it's wrong:** It risks bundling server-only code or exposing secret-dependent behavior to the browser.
**Do this instead:** Keep SDK creation and environment reads inside `app/api/chat/route.ts` and `app/api/contact/route.ts`; call those endpoints from `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx`.

### Adding Shared Utilities Before Duplication Justifies It

**What happens:** Small endpoint-specific helpers could be moved into broad utility folders too early.
**Why it's wrong:** The current codebase is intentionally small; premature shared layers add navigation cost without reducing meaningful complexity.
**Do this instead:** Keep route-specific helpers near the handlers, as with `getString`, `isEmail`, and `rateLimit` in `app/api/contact/route.ts`. Extract only when multiple files need the same behavior and tests or types benefit.

### Treating In-Memory Rate Limits As Durable Abuse Protection

**What happens:** The `Map` buckets in route modules could be assumed to enforce global limits across deployments.
**Why it's wrong:** Module-local state resets on process restart and is not shared across server instances.
**Do this instead:** Keep current `Map` throttles for lightweight protection in `app/api/chat/route.ts` and `app/api/contact/route.ts`; add an external store-backed limiter before scaling to multiple instances or high-risk public traffic.

## Error Handling

**Strategy:** Validate requests early, return JSON errors with specific HTTP status codes, and show endpoint-provided messages in client components.

**Patterns:**
- Invalid JSON returns `400` in `app/api/chat/route.ts:85` and `app/api/contact/route.ts:61`.
- Missing or invalid required fields return `400` in `app/api/chat/route.ts:97` and `app/api/contact/route.ts:84`.
- Rate limits return `429` in `app/api/chat/route.ts:67` and `app/api/contact/route.ts:51`.
- Missing service configuration returns `503` in `app/api/chat/route.ts:75` and `app/api/contact/route.ts:108`.
- Third-party call failures return `502` in `app/api/chat/route.ts:120` and `app/api/contact/route.ts:133`.
- Client components catch thrown errors and render `.form-error` in `app/ui/chat-board.tsx:111` and `app/ui/contact-form.tsx:112`.

## Cross-Cutting Concerns

**Logging:** No application logging is implemented. Route handlers intentionally catch failures without logging request payloads or third-party response bodies in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
**Validation:** Validation is hand-written in route handlers, with length caps mirrored by client field attributes where applicable in `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx`.
**Authentication:** Not applicable. All routes are public portfolio endpoints.
**Rate limiting:** Best-effort in-memory IP windows exist in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
**Configuration:** Runtime configuration is read from environment variables in route handlers and documented in `README.md` and `OPERATIONS.md`.
**Responsive design:** Media queries at `app/globals.css:499` and `app/globals.css:513` adapt the layout for tablet and mobile viewports.

---

*Architecture analysis: 2026-05-30*
