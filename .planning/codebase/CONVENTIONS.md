# Coding Conventions

**Analysis Date:** 2026-05-30

## Naming Patterns

**Files:**
- Use Next.js App Router conventions for route and layout files: `app/page.tsx`, `app/layout.tsx`, `app/api/chat/route.ts`, and `app/api/contact/route.ts`.
- Use kebab-case for component module filenames under `app/ui/`: `app/ui/contact-form.tsx` and `app/ui/chat-board.tsx`.
- Keep global styling in `app/globals.css`; component-specific CSS is not split into CSS modules in the current codebase.
- Keep framework configuration filenames at the repository root: `next.config.ts`, `eslint.config.mjs`, and `tsconfig.json`.

**Functions:**
- Use PascalCase for exported React components: `RootLayout` in `app/layout.tsx`, `Home` in `app/page.tsx`, `ContactForm` in `app/ui/contact-form.tsx`, and `ChatBoard` in `app/ui/chat-board.tsx`.
- Use all-caps HTTP verb handlers for Next route handlers: `POST` in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Use camelCase for local helpers and event handlers: `rateLimit` in `app/api/chat/route.ts`, `getString`, `isEmail`, and `rateLimit` in `app/api/contact/route.ts`, `handleSubmit` in `app/ui/contact-form.tsx`, and `sendMessage` / `handleSubmit` in `app/ui/chat-board.tsx`.
- Keep helper functions colocated with the route or component they support unless they become shared by multiple files.

**Variables:**
- Use camelCase for local variables and React state: `formData`, `payload`, `response`, and `result` in `app/ui/contact-form.tsx`; `messages`, `input`, `isSending`, and `error` in `app/ui/chat-board.tsx`.
- Use upper snake case for module-level limits and timing constants: `MAX_MESSAGE_LENGTH`, `WINDOW_MS`, and `MAX_REQUESTS_PER_WINDOW` in `app/api/chat/route.ts`; `MAX_REQUESTS_PER_WINDOW` and `WINDOW_MS` in `app/api/contact/route.ts`.
- Use lower camelCase for static data arrays rendered by pages: `projects`, `capabilities`, and `process` in `app/page.tsx`; `starterMessages` and `prompts` in `app/ui/chat-board.tsx`.
- Use descriptive payload keys that match form field names and API contracts: `name`, `email`, `projectType`, `budget`, and `message` in `app/ui/contact-form.tsx` and `app/api/contact/route.ts`.

**Types:**
- Use PascalCase for type aliases: `Status` in `app/ui/contact-form.tsx`, `Message` in `app/ui/chat-board.tsx`, and `ContactPayload` in `app/api/contact/route.ts`.
- Use narrow string unions for UI state and roles: `Status` in `app/ui/contact-form.tsx` and `Message["role"]` in `app/ui/chat-board.tsx`.
- Use framework-provided types where available: `Metadata` in `app/layout.tsx`, `NextConfig` in `next.config.ts`, and `FormEvent` in `app/ui/contact-form.tsx` / `app/ui/chat-board.tsx`.

## Code Style

**Formatting:**
- Formatting is enforced by ESLint and TypeScript conventions; no Prettier configuration file is present.
- Use two-space indentation in TypeScript/TSX and CSS, matching `app/page.tsx`, `app/api/contact/route.ts`, and `app/globals.css`.
- Use double quotes for strings and imports, matching `eslint.config.mjs`, `app/page.tsx`, and all TypeScript source files.
- Use semicolons consistently, matching `app/api/chat/route.ts`, `app/ui/chat-board.tsx`, and `next.config.ts`.
- Prefer multi-line objects and JSX props when values are long, as in `metadata` in `app/layout.tsx`, `projects` in `app/page.tsx`, and `fetch` calls in `app/ui/contact-form.tsx`.
- Use trailing commas in multi-line arrays, objects, and function calls, matching `NextResponse.json(..., { status: 429 },)` in `app/api/chat/route.ts` and `app/api/contact/route.ts`.

**Linting:**
- Use ESLint 9 through the root script `npm run lint` in `package.json`.
- ESLint configuration lives in `eslint.config.mjs` and combines `eslint-config-next/core-web-vitals` with `eslint-config-next/typescript`.
- TypeScript strictness is configured in `tsconfig.json` with `strict: true`, `allowJs: false`, `isolatedModules: true`, and `moduleResolution: "bundler"`.
- Run `npm run typecheck` from `package.json` for `tsc --noEmit`; the current app passes typecheck.

## Import Organization

**Order:**
1. External package imports first: `OpenAI` and `NextResponse` in `app/api/chat/route.ts`; `NextResponse` and `Resend` in `app/api/contact/route.ts`; `FormEvent` and `useState` in UI components.
2. Local component imports next: `ChatBoard` and `ContactForm` in `app/page.tsx`.
3. Side-effect style imports after type imports when required by the framework: `./globals.css` in `app/layout.tsx`.

**Path Aliases:**
- No path aliases are configured in `tsconfig.json`.
- Use relative imports inside `app/`, such as `./ui/chat-board` and `./ui/contact-form` in `app/page.tsx`.
- Do not introduce alias imports unless `tsconfig.json` is updated deliberately and all callers adopt the new convention.

## Error Handling

**Patterns:**
- API route handlers return structured JSON errors with explicit HTTP status codes using `NextResponse.json`, as in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Parse request bodies as `unknown` first, then validate shape and field types before using values. `app/api/chat/route.ts` checks the `message` field manually; `app/api/contact/route.ts` rejects non-object and array payloads before creating `ContactPayload`.
- Catch malformed JSON separately and return `400` with a short user-safe message in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Do not expose provider errors to clients. `app/api/chat/route.ts` catches OpenAI failures and returns `502` with a generic message; `app/api/contact/route.ts` catches Resend failures and returns `502` with a generic message.
- Client components convert failed API responses into user-visible UI state. `app/ui/contact-form.tsx` throws with `result.error` when `/api/contact` is not OK; `app/ui/chat-board.tsx` throws with `payload.error` when `/api/chat` is not OK or lacks a reply.
- Use `caught instanceof Error ? caught.message : fallback` when displaying client-side caught errors, as in `app/ui/contact-form.tsx` and `app/ui/chat-board.tsx`.

## Logging

**Framework:** No application logging framework is configured.

**Patterns:**
- There are no `console.*` statements in `app/`.
- Keep API responses user-safe and avoid logging request bodies, prompts, contact messages, environment values, or provider responses.
- Follow `OPERATIONS.md` security guidance: do not log full user messages, secrets, signed URLs, uploaded files, or private local paths.

## Comments

**When to Comment:**
- Source files currently rely on clear names and straightforward control flow rather than explanatory comments.
- Add comments sparingly for non-obvious security, validation, rate limiting, or provider behavior. Keep ordinary JSX and simple helpers uncommented.

**JSDoc/TSDoc:**
- No JSDoc or TSDoc pattern is used in current source files.
- Prefer TypeScript types over documentation comments for local data contracts, as shown by `ContactPayload` in `app/api/contact/route.ts`, `Status` in `app/ui/contact-form.tsx`, and `Message` in `app/ui/chat-board.tsx`.

## Function Design

**Size:** Keep route handlers and components compact enough to read in one file. Current source files are small: `app/ui/contact-form.tsx`, `app/ui/chat-board.tsx`, `app/api/chat/route.ts`, and `app/api/contact/route.ts` each keep helper logic local and avoid extra abstraction.

**Parameters:** Use typed framework/event parameters at boundaries, such as `Request` in API `POST` handlers and `FormEvent<HTMLFormElement>` in form submit handlers.

**Return Values:** Return JSX from React components, `NextResponse.json(...)` from API routes, booleans from rate-limit helpers, and strings from validation helpers such as `getString` in `app/api/contact/route.ts`.

## Module Design

**Exports:** Use named exports for reusable UI components (`ContactForm` and `ChatBoard`) and default exports for Next app entry components (`RootLayout` and `Home`). Use named `POST` exports for API route handlers.

**Barrel Files:** Not used. Import components directly from their files, as in `app/page.tsx`.

---

*Convention analysis: 2026-05-30*
