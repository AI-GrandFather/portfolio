# Technology Stack

**Analysis Date:** 2026-06-06
**Repository Root:** `/Users/atharmushtaq/projects/portfolio`

## Stack Summary

| Area | Current Technology | Current-State Evidence |
|---|---|---|
| Application framework | Next.js App Router 16.2.6 | `package.json`, `app/page.tsx`, `app/layout.tsx`, `app/api/**/route.ts` |
| UI runtime | React 19.2.6 and React DOM 19.2.6 | `package.json`, client components under `app/ui/` |
| Primary language | TypeScript 5.9.3 with TSX | `package.json`, `tsconfig.json`, `app/**/*.ts`, `app/**/*.tsx` |
| Styling | One global CSS stylesheet | `app/globals.css`, imported by `app/layout.tsx` |
| Server integrations | Vercel AI SDK/OpenAI provider and Resend | `app/api/chat/route.ts`, `app/api/contact/route.ts` |
| Package manager | npm 10.8.2 with lockfile version 3 | Environment command output and `package-lock.json` |
| Local runtime | Node.js v20.20.2 | Environment command output |

## Languages and File Formats

- TypeScript is the application and configuration language in `app/**/*.ts`, `app/**/*.tsx`, and `next.config.ts`.
- TSX is used for the server-rendered page shell and React components in `app/page.tsx`, `app/layout.tsx`, and `app/ui/*.tsx`.
- CSS is centralized in `app/globals.css`; no CSS Modules, Tailwind, Sass, CSS-in-JS, or component styling package is present.
- ESM JavaScript is used for the ESLint flat configuration in `eslint.config.mjs`.
- JSON supplies dependency and compiler configuration through `package.json`, `package-lock.json`, `tsconfig.json`, and `skills-lock.json`.
- SVG and raster assets are served from `app/icon.svg`, `public/`, and local image files referenced by `app/lib/content.ts`.
- Markdown is used for repository documentation, planning references, and product evidence.

## Application Framework and Rendering

- Next.js 16.2.6 provides the App Router, server rendering, route handlers, image optimization, font loading, build tooling, and production server.
- The root route is implemented as a server component in `app/page.tsx`.
- The document shell and metadata are defined in `app/layout.tsx`.
- Browser-only behavior is isolated with `"use client"` in `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`, `app/ui/pre-deployment-safety.tsx`, and `app/ui/site-nav.tsx`.
- `next/image` is used by `app/page.tsx` and `app/ui/project-tile.tsx`.
- `next/font/google` loads Inter and Geist Mono through `app/layout.tsx`.
- Theme preference is stored in browser `localStorage` under `portfolio-theme` by `app/ui/site-nav.tsx` and applied before hydration by `app/layout.tsx`.

## AI and Content Rendering Stack

- `ai` 4.3.19 is the active AI orchestration dependency.
- Server-side chat streaming uses `streamText` from `ai` in `app/api/chat/route.ts`.
- Client-side chat state and streaming transport use `useChat` from `ai/react` in `app/ui/chat-board.tsx`.
- `@ai-sdk/openai` 1.3.24 is the active OpenAI provider adapter used by `app/api/chat/route.ts`.
- `react-markdown` 10.1.0 renders assistant Markdown in `app/ui/chat-board.tsx`.
- `remark-gfm` 4.0.1 adds GitHub Flavored Markdown support to assistant responses.
- `openai` 6.39.1 remains declared and installed but no current source file imports it.

## Server Runtime and API Routes

- `app/api/contact/route.ts` explicitly declares `export const runtime = "nodejs"`.
- `app/api/chat/route.ts` does not explicitly declare a runtime; it relies on the current Next.js route-handler default.
- Both public endpoints accept JSON POST requests and keep third-party credentials on the server.
- Chat request validation, token estimation, rate limiting, and cost tracking are implemented in `app/api/chat/security.ts`.
- Contact request validation, honeypot handling, rate limiting, and email dispatch are colocated in `app/api/contact/route.ts`.
- Rate-limit and usage state is process-local memory backed by module-level `Map` values; no durable shared store exists.

## Build, Typecheck, and Lint Tooling

- `npm run dev` executes `next dev`.
- `npm run build` executes `next build`.
- `npm run start` executes `next start`.
- `npm run lint` executes ESLint 9 using `eslint.config.mjs`.
- `npm run typecheck` executes `tsc --noEmit`.
- `eslint.config.mjs` combines `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- `tsconfig.json` enables strict TypeScript, `moduleResolution: "bundler"`, `isolatedModules`, `noEmit`, and the React JSX transform.
- `next.config.ts` sets `turbopack.root` to `process.cwd()`.
- No Jest, Vitest, Playwright test configuration, test directory, or repository-owned automated test files were detected.

## Dependency Inventory

| Dependency | Declared Version | Role |
|---|---:|---|
| `next` | `16.2.6` | App Router, rendering, routing, build, and server |
| `react` / `react-dom` | `19.2.6` | UI rendering and client state |
| `ai` | `^4.3.19` | Streaming AI server/client primitives |
| `@ai-sdk/openai` | `^1.3.24` | OpenAI model provider for Vercel AI SDK |
| `react-markdown` | `^10.1.0` | Assistant response rendering |
| `remark-gfm` | `^4.0.1` | GFM parsing extension |
| `resend` | `6.12.4` | Transactional contact email delivery |
| `openai` | `^6.39.1` | Installed but not imported by current source |
| `typescript` | `^5.9.3` | Static type checking |
| `eslint` / `eslint-config-next` | `^9` / `16.2.6` | Linting and Next.js rules |

## Configuration and Environment Contract

- `.env.example` documents `OPENAI_API_KEY`, `OPENAI_MODEL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.
- `OPENAI_MODEL` is read by `app/api/chat/route.ts`, which defaults to `gpt-4o`.
- `OPENAI_API_KEY` is consumed implicitly by the `@ai-sdk/openai` provider.
- Resend configuration is read explicitly in `app/api/contact/route.ts`.
- `.gitignore` excludes `.env` and `.env*.local` while retaining `.env.example`.
- `README.md` and `OPERATIONS.md` direct developers to use `.env.local` and run the app at `http://localhost:3000`.

## Deployment and Infrastructure State

- No `vercel.json`, Dockerfile, Netlify configuration, or repository CI workflow was detected.
- The site is deployable to a Next.js-capable host that can provide server-side environment variables.
- The contact endpoint requires a Node.js-compatible runtime because it explicitly declares Node runtime and uses the Resend SDK.
- The chat endpoint streams responses and requires a host that supports the route handler's streaming response.
- No database, persistent cache, object storage, queue, authentication provider, analytics SDK, or monitoring SDK is present.
- `npm ls --depth=0` reports an extraneous local `@emnapi/runtime` package; it is not declared in `package.json`.

## Practical Verification Commands

```bash
npm run lint
npm run typecheck
npm run build
```

These commands are the repository's documented verification baseline in `OPERATIONS.md`.
