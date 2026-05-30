<!-- GSD:project-start source:PROJECT.md -->
## Project

**Mian Muhammad Athar Portfolio**

This is a client-facing portfolio for Mian Muhammad Athar: an electronics engineer, ecommerce operator, and software product builder who can take rough client ideas into planned, implemented, verified software. The portfolio should onboard clients by showing credible proof across shipped apps, AI products, business systems, games, ecommerce operations, and engineering background.

The site is not just a static CV. It should act like a conversion system: visitors understand what Mian can build, ask an AI chatbot that behaves like a concise second self, and submit qualified project leads through a secure contact path.

**Core Value:** Convert serious visitors into confident client conversations by proving Mian can understand business needs, plan the right product, build it with modern AI-assisted workflows, and secure the public touchpoints.

### Constraints

- **Security**: Do not expose OpenAI, Resend, payment, signing, private project, or document secrets in client code or generated public copy — public portfolio is attacker-facing.
- **Privacy**: Use CV and letters for positioning, but avoid publishing addresses, phone numbers, private file paths, or sensitive document details unless the user explicitly approves exact public content.
- **Copy accuracy**: Follow `PRODUCT_INVENTORY.md`; do not claim public launch for projects whose publication status is not verified.
- **Dependency changes**: Do not add CAPTCHA, analytics, Redis/KV, monitoring, validation libraries, or UI packages without approval.
- **Current stack**: Existing app is Next.js App Router, React, TypeScript, global CSS, OpenAI server route, and Resend server route.
- **Verification**: Security and frontend claims require lint, typecheck, build, endpoint validation tests or manual route checks, and browser screenshots for desktop/mobile.
- **Design**: Preserve a professional client-facing product-lab feel; avoid generic stock/agency visuals, emoji icons, inaccessible motion, and mobile text overlap.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.9.3 - Application code, route handlers, React components, and configuration in `app/**/*.ts`, `app/**/*.tsx`, `next.config.ts`, and `tsconfig.json`.
- TSX / React JSX - Page and client component implementation in `app/page.tsx`, `app/layout.tsx`, `app/ui/chat-board.tsx`, and `app/ui/contact-form.tsx`.
- CSS - Global visual system and responsive layout in `app/globals.css`.
- JSON - Package and TypeScript configuration in `package.json`, `package-lock.json`, and `tsconfig.json`.
- ESM JavaScript - ESLint flat config in `eslint.config.mjs`.
- SVG - App icon asset in `app/icon.svg`.
## Runtime
- Node.js v20.20.2 - Detected from `node --version`; server route handlers explicitly use Node runtime via `export const runtime = "nodejs"` in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Browser runtime - Client components in `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx` use `"use client"`, React state, DOM forms, and `fetch()`.
- npm 10.8.2 - Detected from `npm --version`.
- Lockfile: present at `package-lock.json` with lockfileVersion 3.
## Frameworks
- Next.js 16.2.6 - App Router application, API route handlers, metadata, and build/dev server; configured by `package.json`, `next.config.ts`, and files under `app/`.
- React 19.2.6 - UI rendering and client state in `app/page.tsx`, `app/layout.tsx`, `app/ui/chat-board.tsx`, and `app/ui/contact-form.tsx`.
- React DOM 19.2.6 - Next-managed DOM rendering dependency in `package.json`.
- Not detected - No Jest, Vitest, Playwright config, or test files were found in the repository scan.
- Next CLI 16.2.6 - `npm run dev`, `npm run build`, and `npm run start` invoke `next dev`, `next build`, and `next start` from `package.json`.
- Turbopack - Next config sets `turbopack.root = process.cwd()` in `next.config.ts`.
- TypeScript compiler 5.9.3 - `npm run typecheck` runs `tsc --noEmit` from `package.json`; strict compile settings live in `tsconfig.json`.
- ESLint 9 - `npm run lint` runs `eslint`; config comes from `eslint.config.mjs`.
- eslint-config-next 16.2.6 - Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` in `eslint.config.mjs`.
## Key Dependencies
- `next` 16.2.6 - Owns routing, API handlers, server rendering, dev server, and production build for the portfolio app; declared in `package.json`.
- `react` 19.2.6 - Owns component state and rendering for `app/page.tsx`, `app/ui/chat-board.tsx`, and `app/ui/contact-form.tsx`.
- `react-dom` 19.2.6 - Required by Next/React browser rendering; declared in `package.json`.
- `openai` 6.39.1 - Server-only OpenAI SDK used by the portfolio assistant endpoint in `app/api/chat/route.ts`.
- `resend` 6.12.4 - Server-only Resend SDK used by the contact email endpoint in `app/api/contact/route.ts`.
- `typescript` ^5.9.3 - Static typing and `tsc --noEmit` validation through `tsconfig.json`.
- `eslint` ^9 - Lint runner configured by `eslint.config.mjs`.
- `eslint-config-next` 16.2.6 - Next.js lint rules for Core Web Vitals and TypeScript in `eslint.config.mjs`.
- `@types/node` ^20 - Node API typings for route handlers and config files.
- `@types/react` ^19 and `@types/react-dom` ^19 - React typings for TSX components.
## Configuration
- Environment variables are loaded from local runtime environment files, with `.env.example` present as a template surface and `.env` / `.env*.local` ignored by `.gitignore`.
- Chat configuration uses `OPENAI_API_KEY` and optional `OPENAI_MODEL` in `app/api/chat/route.ts`; defaults to `gpt-5.5` when `OPENAI_MODEL` is absent.
- Contact email configuration uses `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in `app/api/contact/route.ts`.
- Setup docs in `README.md` and `OPERATIONS.md` instruct local developers to copy `.env.example` to `.env.local` and keep real keys uncommitted.
- `package.json` defines `dev`, `build`, `start`, `lint`, and `typecheck` scripts.
- `tsconfig.json` enables strict TypeScript, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `noEmit: true`, and includes `app/**/*.ts`, `app/**/*.tsx`, `next-env.d.ts`, `.next/types/**/*.ts`, and `.next/dev/types/**/*.ts`.
- `next.config.ts` configures Turbopack root using `process.cwd()`.
- `eslint.config.mjs` uses Next Core Web Vitals and Next TypeScript rule presets.
- `.gitignore` excludes `.next/`, `node_modules/`, `out/`, `dist/`, `coverage/`, `.env`, `.env*.local`, logs, and `*.tsbuildinfo`.
## Platform Requirements
- Use repository root `/Users/atharmushtaq/projects/portfolio`.
- Install dependencies with `npm install` using `package-lock.json`.
- Run local dev server with `npm run dev`; docs in `README.md` and `OPERATIONS.md` use `http://localhost:3000`.
- Run verification commands from `OPERATIONS.md`: `npm run lint`, `npm run typecheck`, and `npm run build`.
- Configure server-side env vars before testing live chat or contact delivery: `OPENAI_API_KEY`, optional `OPENAI_MODEL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.
- Deployment target is not explicitly configured in repo; no `vercel.json`, Dockerfile, Netlify config, or CI workflow was detected.
- The app expects a Node-capable Next.js host because `app/api/chat/route.ts` and `app/api/contact/route.ts` declare `runtime = "nodejs"` and instantiate server SDK clients.
- Production hosts must provide server-side OpenAI and Resend environment variables; these keys must not be exposed to client components.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Use Next.js App Router conventions for route and layout files: `app/page.tsx`, `app/layout.tsx`, `app/api/chat/route.ts`, and `app/api/contact/route.ts`.
- Use kebab-case for component module filenames under `app/ui/`: `app/ui/contact-form.tsx` and `app/ui/chat-board.tsx`.
- Keep global styling in `app/globals.css`; component-specific CSS is not split into CSS modules in the current codebase.
- Keep framework configuration filenames at the repository root: `next.config.ts`, `eslint.config.mjs`, and `tsconfig.json`.
- Use PascalCase for exported React components: `RootLayout` in `app/layout.tsx`, `Home` in `app/page.tsx`, `ContactForm` in `app/ui/contact-form.tsx`, and `ChatBoard` in `app/ui/chat-board.tsx`.
- Use all-caps HTTP verb handlers for Next route handlers: `POST` in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Use camelCase for local helpers and event handlers: `rateLimit` in `app/api/chat/route.ts`, `getString`, `isEmail`, and `rateLimit` in `app/api/contact/route.ts`, `handleSubmit` in `app/ui/contact-form.tsx`, and `sendMessage` / `handleSubmit` in `app/ui/chat-board.tsx`.
- Keep helper functions colocated with the route or component they support unless they become shared by multiple files.
- Use camelCase for local variables and React state: `formData`, `payload`, `response`, and `result` in `app/ui/contact-form.tsx`; `messages`, `input`, `isSending`, and `error` in `app/ui/chat-board.tsx`.
- Use upper snake case for module-level limits and timing constants: `MAX_MESSAGE_LENGTH`, `WINDOW_MS`, and `MAX_REQUESTS_PER_WINDOW` in `app/api/chat/route.ts`; `MAX_REQUESTS_PER_WINDOW` and `WINDOW_MS` in `app/api/contact/route.ts`.
- Use lower camelCase for static data arrays rendered by pages: `projects`, `capabilities`, and `process` in `app/page.tsx`; `starterMessages` and `prompts` in `app/ui/chat-board.tsx`.
- Use descriptive payload keys that match form field names and API contracts: `name`, `email`, `projectType`, `budget`, and `message` in `app/ui/contact-form.tsx` and `app/api/contact/route.ts`.
- Use PascalCase for type aliases: `Status` in `app/ui/contact-form.tsx`, `Message` in `app/ui/chat-board.tsx`, and `ContactPayload` in `app/api/contact/route.ts`.
- Use narrow string unions for UI state and roles: `Status` in `app/ui/contact-form.tsx` and `Message["role"]` in `app/ui/chat-board.tsx`.
- Use framework-provided types where available: `Metadata` in `app/layout.tsx`, `NextConfig` in `next.config.ts`, and `FormEvent` in `app/ui/contact-form.tsx` / `app/ui/chat-board.tsx`.
## Code Style
- Formatting is enforced by ESLint and TypeScript conventions; no Prettier configuration file is present.
- Use two-space indentation in TypeScript/TSX and CSS, matching `app/page.tsx`, `app/api/contact/route.ts`, and `app/globals.css`.
- Use double quotes for strings and imports, matching `eslint.config.mjs`, `app/page.tsx`, and all TypeScript source files.
- Use semicolons consistently, matching `app/api/chat/route.ts`, `app/ui/chat-board.tsx`, and `next.config.ts`.
- Prefer multi-line objects and JSX props when values are long, as in `metadata` in `app/layout.tsx`, `projects` in `app/page.tsx`, and `fetch` calls in `app/ui/contact-form.tsx`.
- Use trailing commas in multi-line arrays, objects, and function calls, matching `NextResponse.json(..., { status: 429 },)` in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Use ESLint 9 through the root script `npm run lint` in `package.json`.
- ESLint configuration lives in `eslint.config.mjs` and combines `eslint-config-next/core-web-vitals` with `eslint-config-next/typescript`.
- TypeScript strictness is configured in `tsconfig.json` with `strict: true`, `allowJs: false`, `isolatedModules: true`, and `moduleResolution: "bundler"`.
- Run `npm run typecheck` from `package.json` for `tsc --noEmit`; the current app passes typecheck.
## Import Organization
- No path aliases are configured in `tsconfig.json`.
- Use relative imports inside `app/`, such as `./ui/chat-board` and `./ui/contact-form` in `app/page.tsx`.
- Do not introduce alias imports unless `tsconfig.json` is updated deliberately and all callers adopt the new convention.
## Error Handling
- API route handlers return structured JSON errors with explicit HTTP status codes using `NextResponse.json`, as in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Parse request bodies as `unknown` first, then validate shape and field types before using values. `app/api/chat/route.ts` checks the `message` field manually; `app/api/contact/route.ts` rejects non-object and array payloads before creating `ContactPayload`.
- Catch malformed JSON separately and return `400` with a short user-safe message in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Do not expose provider errors to clients. `app/api/chat/route.ts` catches OpenAI failures and returns `502` with a generic message; `app/api/contact/route.ts` catches Resend failures and returns `502` with a generic message.
- Client components convert failed API responses into user-visible UI state. `app/ui/contact-form.tsx` throws with `result.error` when `/api/contact` is not OK; `app/ui/chat-board.tsx` throws with `payload.error` when `/api/chat` is not OK or lacks a reply.
- Use `caught instanceof Error ? caught.message : fallback` when displaying client-side caught errors, as in `app/ui/contact-form.tsx` and `app/ui/chat-board.tsx`.
## Logging
- There are no `console.*` statements in `app/`.
- Keep API responses user-safe and avoid logging request bodies, prompts, contact messages, environment values, or provider responses.
- Follow `OPERATIONS.md` security guidance: do not log full user messages, secrets, signed URLs, uploaded files, or private local paths.
## Comments
- Source files currently rely on clear names and straightforward control flow rather than explanatory comments.
- Add comments sparingly for non-obvious security, validation, rate limiting, or provider behavior. Keep ordinary JSX and simple helpers uncommented.
- No JSDoc or TSDoc pattern is used in current source files.
- Prefer TypeScript types over documentation comments for local data contracts, as shown by `ContactPayload` in `app/api/contact/route.ts`, `Status` in `app/ui/contact-form.tsx`, and `Message` in `app/ui/chat-board.tsx`.
## Function Design
## Module Design
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
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
- Keep public content and section composition in the server component page at `app/page.tsx`; add interactivity by importing isolated client components from `app/ui/`.
- Keep third-party secrets and SDK calls inside route handlers under `app/api/**/route.ts`; client components call same-origin endpoints with `fetch`.
- Use module-local constants for static content, validation limits, prompt context, and route rate-limit buckets in `app/page.tsx`, `app/api/chat/route.ts`, and `app/api/contact/route.ts`.
- Use global CSS classes from `app/globals.css` rather than CSS modules or component-scoped style files.
## Layers
- Purpose: Provide the document wrapper, metadata, and global stylesheet.
- Location: `app/layout.tsx`
- Contains: `metadata`, `RootLayout`, `<html lang="en">`, and `<body>{children}</body>`.
- Depends on: `next` metadata types and `app/globals.css`.
- Used by: Every App Router route, including `app/page.tsx` and `app/api/**/route.ts` at runtime.
- Purpose: Render the portfolio landing page and compose static content with interactive widgets.
- Location: `app/page.tsx`
- Contains: Static arrays for projects, capabilities, and process; the `Home` server component; anchor sections; imports for `ChatBoard` and `ContactForm`.
- Depends on: `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`, and CSS class names defined in `app/globals.css`.
- Used by: The root `/` route.
- Purpose: Manage browser-only form state and network submissions.
- Location: `app/ui/`
- Contains: `"use client"` React components, `useState`, form handlers, same-origin `fetch` calls, and user-visible status/error state.
- Depends on: React, browser `fetch`, and API response contracts from `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Used by: `app/page.tsx`.
- Purpose: Provide public POST endpoints that validate input, enforce lightweight abuse controls, and call external services.
- Location: `app/api/chat/route.ts` and `app/api/contact/route.ts`
- Contains: `runtime = "nodejs"`, `POST` handlers, request JSON parsing, validation, module-local rate limiting, environment variable reads, SDK calls, and `NextResponse.json` responses.
- Depends on: `next/server`, `openai`, `resend`, and server environment variables.
- Used by: Client components in `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx`.
- Purpose: Centralize the full visual system and responsive behavior.
- Location: `app/globals.css`
- Contains: CSS variables, base element styles, portfolio section layouts, cards, chat UI, forms, buttons, and media queries.
- Depends on: Class names emitted by `app/page.tsx`, `app/ui/chat-board.tsx`, and `app/ui/contact-form.tsx`.
- Used by: `app/layout.tsx` imports the stylesheet globally.
## Data Flow
### Primary Page Render Path
### Chat Flow
### Contact Flow
- Server-rendered portfolio content is static module-local data in `app/page.tsx`.
- Client UI state is local React state in `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx`; there is no global client store.
- Public API rate limiting uses process-local `Map` instances in `app/api/chat/route.ts:10` and `app/api/contact/route.ts:8`; this state resets with the Node process and is not shared across instances.
- There is no database, persistent cache, queue, session store, or lead storage in this repo.
## Key Abstractions
- Purpose: Keep secret-backed integrations server-only and expose small JSON contracts to the browser.
- Examples: `app/api/chat/route.ts`, `app/api/contact/route.ts`
- Pattern: `export const runtime = "nodejs"` plus `export async function POST(request: Request)` returning `NextResponse.json`.
- Purpose: Isolate client-side stateful behavior from the static page shell.
- Examples: `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`
- Pattern: `"use client"` at file top, React `useState`, local async submit handlers, and fetches to same-origin API routes.
- Purpose: Keep current portfolio copy colocated with the rendered sections that consume it.
- Examples: `projects`, `capabilities`, and `process` in `app/page.tsx`
- Pattern: Module constants mapped directly in JSX with stable display keys.
- Purpose: Keep endpoint-specific validation close to the request handler.
- Examples: `getString`, `isEmail`, and `rateLimit` in `app/api/contact/route.ts`; `rateLimit` in `app/api/chat/route.ts`
- Pattern: Small module-local helpers with no shared utility layer.
- Purpose: Link JSX class names to a single stylesheet.
- Examples: `hero-shell`, `project-grid`, `chat-board`, `contact-form`, and `form-error` in `app/globals.css`
- Pattern: Components emit semantic class names and `app/globals.css` owns all layout and visual behavior.
## Entry Points
- Location: `app/page.tsx`
- Triggers: Browser GET request to `/`.
- Responsibilities: Render the portfolio, section anchors, static product evidence, chat section, and contact section.
- Location: `app/layout.tsx`
- Triggers: Next.js App Router wraps every route.
- Responsibilities: Set metadata, language, body wrapper, and global CSS import.
- Location: `app/api/chat/route.ts`
- Triggers: Browser POST request to `/api/chat` from `app/ui/chat-board.tsx`.
- Responsibilities: Rate limit, validate message input, call OpenAI Responses API, return assistant reply.
- Location: `app/api/contact/route.ts`
- Triggers: Browser POST request to `/api/contact` from `app/ui/contact-form.tsx`.
- Responsibilities: Rate limit, validate lead input, send email via Resend, return success/error JSON.
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
### Adding Shared Utilities Before Duplication Justifies It
### Treating In-Memory Rate Limits As Durable Abuse Protection
## Error Handling
- Invalid JSON returns `400` in `app/api/chat/route.ts:85` and `app/api/contact/route.ts:61`.
- Missing or invalid required fields return `400` in `app/api/chat/route.ts:97` and `app/api/contact/route.ts:84`.
- Rate limits return `429` in `app/api/chat/route.ts:67` and `app/api/contact/route.ts:51`.
- Missing service configuration returns `503` in `app/api/chat/route.ts:75` and `app/api/contact/route.ts:108`.
- Third-party call failures return `502` in `app/api/chat/route.ts:120` and `app/api/contact/route.ts:133`.
- Client components catch thrown errors and render `.form-error` in `app/ui/chat-board.tsx:111` and `app/ui/contact-form.tsx:112`.
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| ui-ux-pro-max | UI/UX design intelligence with searchable database | `.codex/skills/ui-ux-pro-max/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
