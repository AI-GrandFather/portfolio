# Architecture

## System Overview

The repository contains a single-page client-facing portfolio built with Next.js App Router, React, and TypeScript.
The root page presents static portfolio evidence, interactive navigation, a bounded AI chat assistant, and a qualified-lead contact form.
Server-rendered content and browser-only widgets are separated through React Server Component and `"use client"` boundaries.
Public third-party integrations are isolated behind same-origin API routes so OpenAI and Resend credentials remain server-side.
There is no database, persistent cache, authentication system, background worker, or separate backend service in this repository.

```text
Browser
  -> GET `/`
     -> `app/layout.tsx`
     -> `app/page.tsx`
        -> `app/lib/content.ts`
        -> `app/ui/*`
        -> `app/globals.css`
  -> POST `/api/chat`
     -> `app/api/chat/route.ts`
     -> `app/api/chat/security.ts`
     -> OpenAI through `@ai-sdk/openai`
  -> POST `/api/contact`
     -> `app/api/contact/route.ts`
     -> Resend email API
```

## Architectural Style

- The application is a compact monolithic Next.js deployment with page rendering and API routes in one runtime.
- The presentation model is content-driven: `app/lib/content.ts` exports typed facts and copy consumed by the page and UI components.
- The homepage is section-oriented: `app/page.tsx` composes the complete conversion journey rather than routing to separate case-study pages.
- Interactivity is component-local: client state lives inside modules under `app/ui/`; there is no shared client store or context provider.
- Integrations are route-local: external SDKs are imported only by `app/api/**/route.ts`, preserving the browser/server trust boundary.
- Styling is centralized: `app/globals.css` owns tokens, themes, layout, components, interaction states, and responsive rules.

## Layers And Responsibilities

| Layer | Responsibility | Primary Files |
|---|---|---|
| App shell | Defines metadata, fonts, global CSS, document language, and pre-hydration theme selection. | `app/layout.tsx`, `app/icon.svg` |
| Page composition | Builds the root `/` page, orders conversion sections, and connects content to components. | `app/page.tsx` |
| Public content model | Stores typed biography facts, project claims, process copy, safety copy, and assistant starter content. | `app/lib/content.ts` |
| Server UI components | Render reusable presentational sections and project visuals without browser state. | `app/ui/document-stack.tsx`, `app/ui/project-tile.tsx` |
| Client UI components | Own navigation/theme state, accordion state, chat state, and contact form state. | `app/ui/site-nav.tsx`, `app/ui/pre-deployment-safety.tsx`, `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx` |
| API boundary | Validates public requests, applies abuse controls, invokes providers, and returns user-safe responses. | `app/api/chat/route.ts`, `app/api/contact/route.ts` |
| Chat security utility | Validates chat history, estimates cost, and maintains process-local message/cost limits. | `app/api/chat/security.ts` |
| Visual system | Defines light/dark theme variables, layout primitives, component classes, focus states, motion, and breakpoints. | `app/globals.css` |
| Static assets | Supplies the hero portrait and project icons through Next.js public asset paths. | `public/55D670AB-C554-4417-86F0-C65863EDE18E.PNG`, `public/icons/*` |

## Component Responsibilities

| Component | Responsibility | Dependencies |
|---|---|---|
| `RootLayout` | Loads Inter and Geist Mono, exports site metadata, imports global CSS, and applies the saved/system theme before hydration. | `app/layout.tsx`, `app/globals.css`, `next/font/google` |
| `Home` | Composes hero, story, work, build process, document stack, safety, technology stack, lifecycle, contact, footer, and chat. | `app/page.tsx`, `app/lib/content.ts`, `app/ui/*` |
| `SiteNav` | Controls desktop/mobile navigation, outside-click menu closing, theme persistence, and theme toggling. | `app/ui/site-nav.tsx`, browser DOM, `localStorage` |
| `ProjectTile` | Renders project artwork from an image icon or one of five inline SVG motifs. | `app/ui/project-tile.tsx`, `next/image` |
| `DocumentStack` | Maps document-process content into a reusable workflow rail section. | `app/ui/document-stack.tsx`, `DOCUMENT_STACK` |
| `PreDeploymentSafety` | Presents the safety checklist as a client-side accordion with ARIA state. | `app/ui/pre-deployment-safety.tsx`, `PRE_DEPLOYMENT_SAFETY` |
| `ChatBoard` | Manages the popup assistant, starter prompts, message history, Markdown rendering, streaming state, and reset behavior. | `app/ui/chat-board.tsx`, `ai/react`, `/api/chat` |
| `ContactForm` | Collects lead qualification fields, submits JSON, and presents sending/success/error states. | `app/ui/contact-form.tsx`, `/api/contact` |

## Primary Page Data Flow

1. A browser requests `/`, which Next.js resolves through `app/layout.tsx` and `app/page.tsx`.
2. `app/layout.tsx` emits metadata, font variables, global styles, and an inline theme bootstrap script.
3. `app/page.tsx` imports approved public content from `app/lib/content.ts`.
4. The server component maps typed arrays such as `PROJECTS`, `PROCESS`, and `STACK_GROUPS` into page sections.
5. Server-rendered markup hydrates only the imported client components that require browser state.
6. `app/globals.css` styles the complete page through semantic class names and `data-theme` variables.
7. Images referenced as `/...` URLs are served from `public/` through Next.js static asset handling.

## Chat Data Flow

1. `app/ui/chat-board.tsx` initializes `useChat` with `/api/chat`, a greeting, and locally rendered starter questions.
2. The AI SDK sends the current message array to `app/api/chat/route.ts`.
3. `app/api/chat/route.ts` parses the request and delegates structural validation and history truncation to `app/api/chat/security.ts`.
4. `checkLimits` uses the forwarded IP or `"anonymous"` key to enforce process-local burst, daily-count, user-cost, and global-cost caps.
5. The route calls `streamText` with a route-local portfolio system prompt and the validated history.
6. The route streams the AI SDK data response back to `ChatBoard`, which renders assistant Markdown with `react-markdown` and `remark-gfm`.
7. Completion usage updates the process-local cost counters; all counters reset when the process restarts.

## Contact Data Flow

1. `app/ui/contact-form.tsx` collects name, email, project description, platform, timeline, budget, referral source, and a hidden honeypot field.
2. The client serializes those fields to JSON and posts them to `/api/contact`.
3. `app/api/contact/route.ts` derives a request key from proxy headers and applies a process-local per-minute limit.
4. The route parses unknown JSON, normalizes string fields, checks required values, validates enumerated selections, validates lengths, and accepts honeypot submissions without sending mail.
5. The route reads `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` only on the server.
6. Resend delivers a plain-text lead email; no lead is persisted by the application.
7. The client resets the form on success or displays the route's safe error message.

## Entry Points

| Entry Point | Trigger | Responsibility |
|---|---|---|
| `app/layout.tsx` | Every App Router render | Global document shell, fonts, metadata, theme bootstrap, and CSS import. |
| `app/page.tsx` | Browser `GET /` | Root portfolio page and all section composition. |
| `app/api/chat/route.ts` | Browser `POST /api/chat` | Bounded streaming AI assistant endpoint. |
| `app/api/contact/route.ts` | Browser `POST /api/contact` | Validated contact email endpoint. |
| `package.json` scripts | Developer or deployment command | Starts development/production servers and runs lint, typecheck, or build. |
| `next.config.ts` | Next.js startup/build | Sets the Turbopack repository root. |

## Boundaries And Trust Model

- `app/page.tsx`, `app/lib/content.ts`, and server UI modules are safe to include in server-rendered output and must contain only public facts.
- Files marked `"use client"` under `app/ui/` execute in the browser and must not import server credentials or provider SDK clients.
- `app/api/chat/route.ts` and `app/api/contact/route.ts` are attacker-facing public endpoints and are the only live integration boundary.
- Environment variables listed in `.env.example` are consumed server-side; real `.env` values are ignored by Git.
- `app/api/chat/security.ts` and the contact route use in-memory maps, so abuse controls are best-effort per process rather than durable across instances.
- `PRODUCT_INVENTORY.md` is the copy-accuracy boundary for publication claims, while `app/lib/content.ts` is the runtime public-content source.
- `public/` is the deployable static-asset boundary; root-level PDFs, screenshots, and evidence files are repository artifacts, not referenced public assets.

## External Integrations

| Integration | Used By | Purpose | Configuration |
|---|---|---|---|
| OpenAI via `@ai-sdk/openai` and `ai` | `app/api/chat/route.ts` | Streams bounded assistant responses. | `OPENAI_API_KEY`, optional `OPENAI_MODEL` |
| Resend | `app/api/contact/route.ts` | Sends qualified contact leads by email. | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |
| Next.js image optimization | `app/page.tsx`, `app/ui/project-tile.tsx` | Renders the portrait and project icons. | Assets under `public/` |
| Google fonts through Next.js | `app/layout.tsx` | Loads Inter and Geist Mono as CSS variables. | Build/runtime managed by `next/font/google` |

## State And Persistence

- Navigation menu state, selected theme, safety accordion state, chat popup state, chat history, and contact status are local React state.
- Theme preference is the only browser-persisted state and is stored under `localStorage["portfolio-theme"]`.
- Chat and contact rate-limit/cost state is process-local memory in `Map` objects.
- Chat history exists only in the mounted browser component and is reset by the UI or page lifecycle.
- Contact leads are delivered to email and are not stored in this repository's runtime.

## Architectural Constraints

- Keep secret-backed SDK usage inside `app/api/**/route.ts` or other server-only modules.
- Keep public claims synchronized between `PRODUCT_INVENTORY.md`, `app/lib/content.ts`, and route-local assistant grounding.
- Preserve the App Router server/client boundary; add `"use client"` only to modules that require browser APIs or React state.
- Continue using relative imports because `tsconfig.json` defines no path aliases.
- Continue using `app/globals.css` unless a deliberate styling migration is approved.
- Treat process-local limits as lightweight safeguards, not distributed production enforcement.
- Verification commands are defined in `package.json`: `npm run lint`, `npm run typecheck`, and `npm run build`.
