# Coding Conventions

## Scope

- This document records conventions observed in the current repository as of 2026-06-06.
- Runtime application code lives under `app/`; root Markdown files provide operational and product guidance.
- Present practices are distinguished from documented expectations and inconsistencies.

## File And Module Organization

- Next.js App Router entry points use framework names: `app/layout.tsx`, `app/page.tsx`, and `app/api/**/route.ts`.
- Reusable UI components live in `app/ui/` and use kebab-case filenames such as `app/ui/contact-form.tsx` and `app/ui/site-nav.tsx`.
- Shared portfolio copy and typed content collections are centralized in `app/lib/content.ts`.
- Global styling remains in the single stylesheet `app/globals.css`; no CSS Modules or CSS-in-JS system is present.
- Route-specific helpers stay beside their route when not reused elsewhere, as shown by `app/api/chat/security.ts`.
- Root configuration uses conventional filenames: `package.json`, `tsconfig.json`, `eslint.config.mjs`, and `next.config.ts`.
- Planning and historical design documents are kept outside runtime code under `.planning/`, `new-implemntation/`, `newclaude/`, and `newoverhaul/`.

## TypeScript And React Style

- TypeScript is configured with `strict: true`, `noEmit: true`, and `isolatedModules: true` in `tsconfig.json`.
- Exported React components use PascalCase names, including `ContactForm`, `SiteNav`, and `PreDeploymentSafety`.
- Interactive components begin with `"use client"`; static components and `app/page.tsx` remain server components.
- Local functions and event handlers use camelCase, such as `handleSubmit`, `toggleTheme`, `rateLimit`, and `validateRequest`.
- Types and interfaces use PascalCase, such as `ContactPayload`, `Project`, `ProjectTileProps`, and `Theme`.
- Narrow string unions model controlled states and content categories in `app/ui/contact-form.tsx` and `app/lib/content.ts`.
- Static collections and limits use uppercase names where they act as configuration, such as `PROJECTS`, `SECURITY_CONFIG`, and `ALLOWED_BUDGETS`.
- Component-local static collections use lower camelCase where appropriate, such as `navLinks` in `app/ui/site-nav.tsx`.
- Relative imports are used throughout `app/`; no path alias is configured in `tsconfig.json`.
- Content arrays are rendered with `.map()` and stable domain keys such as `project.id`, `item.step`, or `link.href`.
- The `satisfies` operator is used in `app/lib/content.ts` to check selected content collections without widening their inferred values.

## Formatting

- Most TypeScript and TSX uses two-space indentation, double-quoted strings, semicolons, and trailing commas in multiline constructs.
- JSX props are generally split across lines when elements carry several attributes, especially in `app/ui/site-nav.tsx` and `app/ui/project-tile.tsx`.
- The repository has no Prettier configuration or formatting script; formatting consistency relies on author discipline and ESLint.
- Some current files deviate from the dominant style: `app/api/chat/route.ts`, `app/api/chat/security.ts`, `app/ui/chat-board.tsx`, and parts of `app/page.tsx` use single quotes or compact inline JSX.
- Inline `style` objects exist in `app/page.tsx` and `app/ui/project-tile.tsx`, although the primary styling convention is named classes in `app/globals.css`.
- Comments are sparse in ordinary UI code but extensive in the security-focused modules `app/api/chat/route.ts` and `app/api/chat/security.ts`.

## Content And Data Conventions

- Public claims, project statuses, page copy, and shared assistant defaults are intended to use `app/lib/content.ts` as the source of truth.
- Product publication rules and supporting evidence are documented separately in `PRODUCT_INVENTORY.md`.
- Project records use explicit status values and labels so public launch claims can be controlled in `app/lib/content.ts`.
- Server-rendered page composition imports content constants rather than embedding most long-form copy directly in `app/page.tsx`.
- Environment variable names use uppercase snake case and are listed in `.env.example`.
- Secrets are read only in server route code; client components call same-origin endpoints instead of importing provider SDKs.

## CSS And UI Conventions

- `app/globals.css` defines a tokenized visual system with custom properties under `:root` and `:root[data-theme="dark"]`.
- CSS class names use descriptive kebab-case names such as `.project-grid`, `.contact-form`, and `.mobile-nav-menu`.
- Responsive behavior is centralized in media queries in `app/globals.css`, primarily at `1024px` and `760px`.
- Motion includes a global reduced-motion override and a progressive `animation-timeline` enhancement in `app/globals.css`.
- Focus styling is explicitly defined for major links, buttons, navigation controls, and form fields.
- Interactive controls generally include accessibility attributes such as `aria-label`, `aria-expanded`, `aria-controls`, and `aria-pressed`.
- Decorative SVGs and images use `aria-hidden="true"` or empty alternative text where appropriate.

## Error Handling

- Public contact requests are parsed as `unknown`, checked for object shape, normalized with `getString`, and validated server-side in `app/api/contact/route.ts`.
- Contact validation failures return structured JSON errors with explicit `400`, `429`, `502`, or `503` statuses.
- The contact route catches malformed JSON separately and does not return provider exception details to the browser.
- `app/ui/contact-form.tsx` converts failed responses into a narrow status state and renders a user-facing error message.
- Chat request validation and rate/cost decisions are delegated to `app/api/chat/security.ts`.
- The chat route returns JSON errors for validation and limit failures, while successful responses are streamed from `app/api/chat/route.ts`.
- `app/ui/chat-board.tsx` attempts to parse structured API errors and falls back to the supplied error message.
- The theme bootstrap in `app/layout.tsx` catches storage or media-query failures and falls back to the light theme.
- Current inconsistency: `app/api/chat/route.ts` catches all failures as `500` and logs the raw error object with `console.error`, while `OPERATIONS.md` says not to log secrets or full private responses.
- Current inconsistency: the contact route uses `NextResponse.json`, while the chat route manually constructs `Response` objects and JSON headers.

## Quality And Security Practices

- Public endpoints implement server-side validation and best-effort in-memory rate limiting in `app/api/contact/route.ts` and `app/api/chat/security.ts`.
- The contact form includes a honeypot field named `website` in `app/ui/contact-form.tsx`, with silent success handling in `app/api/contact/route.ts`.
- The chat security helper limits input length, history length, output tokens, burst requests, daily requests, and estimated spend.
- In-memory rate and cost state is explicitly documented as process-local and resettable in `app/api/chat/security.ts`.
- External project links in `app/page.tsx` use `target="_blank"` with `rel="noopener noreferrer"`.
- `.gitignore` excludes local environment files, build output, coverage output, logs, and TypeScript build metadata.
- `AGENTS.md` and `OPERATIONS.md` define scope, security, dependency, and verification expectations beyond what tooling automatically enforces.

## Documented Expectations Versus Present Practice

- `OPERATIONS.md` requires `npm run lint`, `npm run typecheck`, and `npm run build` before completion; these are documented gates, not automatically enforced by CI.
- `app/lib/content.ts` describes conventional commit logging and review gates; `COMMITS.md` records selected historical work, but the repository has no automated commit-message enforcement.
- `AGENTS.md` requires endpoint validation and desktop/mobile browser screenshots for security and frontend claims; screenshot artifacts exist, but no executable browser test suite is committed.
- The codebase generally follows its stated naming and module conventions, but formatting and error-response patterns are not fully uniform.

## Guidance For New Work

- Keep changes scoped to existing module boundaries and place shared public copy in `app/lib/content.ts`.
- Preserve server-only ownership of OpenAI and Resend integrations.
- Follow the dominant two-space, double-quote, semicolon, and trailing-comma style.
- Reuse global CSS tokens and semantic class names before introducing inline styling or another styling system.
- Return user-safe structured errors with explicit status codes and avoid logging request bodies, secrets, provider payloads, or private paths.
- Treat the verification commands and manual checks in `OPERATIONS.md` as required until automated coverage is added.
