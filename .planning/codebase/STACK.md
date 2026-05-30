# Technology Stack

**Analysis Date:** 2026-05-30

## Languages

**Primary:**
- TypeScript 5.9.3 - Application code, route handlers, React components, and configuration in `app/**/*.ts`, `app/**/*.tsx`, `next.config.ts`, and `tsconfig.json`.
- TSX / React JSX - Page and client component implementation in `app/page.tsx`, `app/layout.tsx`, `app/ui/chat-board.tsx`, and `app/ui/contact-form.tsx`.

**Secondary:**
- CSS - Global visual system and responsive layout in `app/globals.css`.
- JSON - Package and TypeScript configuration in `package.json`, `package-lock.json`, and `tsconfig.json`.
- ESM JavaScript - ESLint flat config in `eslint.config.mjs`.
- SVG - App icon asset in `app/icon.svg`.

## Runtime

**Environment:**
- Node.js v20.20.2 - Detected from `node --version`; server route handlers explicitly use Node runtime via `export const runtime = "nodejs"` in `app/api/chat/route.ts` and `app/api/contact/route.ts`.
- Browser runtime - Client components in `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx` use `"use client"`, React state, DOM forms, and `fetch()`.

**Package Manager:**
- npm 10.8.2 - Detected from `npm --version`.
- Lockfile: present at `package-lock.json` with lockfileVersion 3.

## Frameworks

**Core:**
- Next.js 16.2.6 - App Router application, API route handlers, metadata, and build/dev server; configured by `package.json`, `next.config.ts`, and files under `app/`.
- React 19.2.6 - UI rendering and client state in `app/page.tsx`, `app/layout.tsx`, `app/ui/chat-board.tsx`, and `app/ui/contact-form.tsx`.
- React DOM 19.2.6 - Next-managed DOM rendering dependency in `package.json`.

**Testing:**
- Not detected - No Jest, Vitest, Playwright config, or test files were found in the repository scan.

**Build/Dev:**
- Next CLI 16.2.6 - `npm run dev`, `npm run build`, and `npm run start` invoke `next dev`, `next build`, and `next start` from `package.json`.
- Turbopack - Next config sets `turbopack.root = process.cwd()` in `next.config.ts`.
- TypeScript compiler 5.9.3 - `npm run typecheck` runs `tsc --noEmit` from `package.json`; strict compile settings live in `tsconfig.json`.
- ESLint 9 - `npm run lint` runs `eslint`; config comes from `eslint.config.mjs`.
- eslint-config-next 16.2.6 - Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` in `eslint.config.mjs`.

## Key Dependencies

**Critical:**
- `next` 16.2.6 - Owns routing, API handlers, server rendering, dev server, and production build for the portfolio app; declared in `package.json`.
- `react` 19.2.6 - Owns component state and rendering for `app/page.tsx`, `app/ui/chat-board.tsx`, and `app/ui/contact-form.tsx`.
- `react-dom` 19.2.6 - Required by Next/React browser rendering; declared in `package.json`.
- `openai` 6.39.1 - Server-only OpenAI SDK used by the portfolio assistant endpoint in `app/api/chat/route.ts`.
- `resend` 6.12.4 - Server-only Resend SDK used by the contact email endpoint in `app/api/contact/route.ts`.

**Infrastructure:**
- `typescript` ^5.9.3 - Static typing and `tsc --noEmit` validation through `tsconfig.json`.
- `eslint` ^9 - Lint runner configured by `eslint.config.mjs`.
- `eslint-config-next` 16.2.6 - Next.js lint rules for Core Web Vitals and TypeScript in `eslint.config.mjs`.
- `@types/node` ^20 - Node API typings for route handlers and config files.
- `@types/react` ^19 and `@types/react-dom` ^19 - React typings for TSX components.

## Configuration

**Environment:**
- Environment variables are loaded from local runtime environment files, with `.env.example` present as a template surface and `.env` / `.env*.local` ignored by `.gitignore`.
- Chat configuration uses `OPENAI_API_KEY` and optional `OPENAI_MODEL` in `app/api/chat/route.ts`; defaults to `gpt-5.5` when `OPENAI_MODEL` is absent.
- Contact email configuration uses `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in `app/api/contact/route.ts`.
- Setup docs in `README.md` and `OPERATIONS.md` instruct local developers to copy `.env.example` to `.env.local` and keep real keys uncommitted.

**Build:**
- `package.json` defines `dev`, `build`, `start`, `lint`, and `typecheck` scripts.
- `tsconfig.json` enables strict TypeScript, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `noEmit: true`, and includes `app/**/*.ts`, `app/**/*.tsx`, `next-env.d.ts`, `.next/types/**/*.ts`, and `.next/dev/types/**/*.ts`.
- `next.config.ts` configures Turbopack root using `process.cwd()`.
- `eslint.config.mjs` uses Next Core Web Vitals and Next TypeScript rule presets.
- `.gitignore` excludes `.next/`, `node_modules/`, `out/`, `dist/`, `coverage/`, `.env`, `.env*.local`, logs, and `*.tsbuildinfo`.

## Platform Requirements

**Development:**
- Use repository root `/Users/atharmushtaq/projects/portfolio`.
- Install dependencies with `npm install` using `package-lock.json`.
- Run local dev server with `npm run dev`; docs in `README.md` and `OPERATIONS.md` use `http://localhost:3000`.
- Run verification commands from `OPERATIONS.md`: `npm run lint`, `npm run typecheck`, and `npm run build`.
- Configure server-side env vars before testing live chat or contact delivery: `OPENAI_API_KEY`, optional `OPENAI_MODEL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.

**Production:**
- Deployment target is not explicitly configured in repo; no `vercel.json`, Dockerfile, Netlify config, or CI workflow was detected.
- The app expects a Node-capable Next.js host because `app/api/chat/route.ts` and `app/api/contact/route.ts` declare `runtime = "nodejs"` and instantiate server SDK clients.
- Production hosts must provide server-side OpenAI and Resend environment variables; these keys must not be exposed to client components.

---

*Stack analysis: 2026-05-30*
