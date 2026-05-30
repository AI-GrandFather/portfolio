# Codebase Structure

**Analysis Date:** 2026-05-30

## Directory Layout

```text
portfolio/
├── app/                    # Next.js App Router source
│   ├── api/                # Server route handlers for public POST endpoints
│   │   ├── chat/           # OpenAI-backed chat endpoint
│   │   └── contact/        # Resend-backed contact email endpoint
│   ├── ui/                 # Client-side interactive React components
│   ├── globals.css         # Global visual system and responsive CSS
│   ├── icon.svg            # App icon asset
│   ├── layout.tsx          # App Router root layout and metadata
│   └── page.tsx            # Root portfolio page
├── .planning/codebase/     # Generated codebase maps for GSD workflows
├── qa-screenshots/         # Manual/automated visual QA screenshots
├── README.md               # Setup, commands, and project file guide
├── OPERATIONS.md           # Local workflow, verification, and security notes
├── PRODUCT_INVENTORY.md    # Portfolio product evidence and safe copy rules
├── PROJECT_NOTES.md        # Portfolio positioning and context notes
├── package.json            # npm scripts and dependencies
├── package-lock.json       # npm lockfile
├── next.config.ts          # Next.js config
├── eslint.config.mjs       # ESLint flat config
├── tsconfig.json           # TypeScript config
├── next-env.d.ts           # Next.js generated TypeScript declarations
└── tsconfig.tsbuildinfo    # TypeScript incremental build metadata
```

## Directory Purposes

**`app/`:**
- Purpose: Own all application source code for the Next.js App Router.
- Contains: Route segments, root layout, root page, global CSS, app icon, API routes, and interactive UI components.
- Key files: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/api/chat/route.ts`, `app/api/contact/route.ts`, `app/ui/chat-board.tsx`, `app/ui/contact-form.tsx`.

**`app/api/`:**
- Purpose: Own server-only public API endpoints.
- Contains: Nested route segment folders that each expose a `route.ts` file.
- Key files: `app/api/chat/route.ts` and `app/api/contact/route.ts`.

**`app/api/chat/`:**
- Purpose: Own the `/api/chat` POST endpoint.
- Contains: `app/api/chat/route.ts` with input validation, OpenAI configuration, OpenAI Responses API call, and best-effort IP rate limiting.
- Key files: `app/api/chat/route.ts`.

**`app/api/contact/`:**
- Purpose: Own the `/api/contact` POST endpoint.
- Contains: `app/api/contact/route.ts` with contact payload validation, Resend email delivery, and best-effort IP rate limiting.
- Key files: `app/api/contact/route.ts`.

**`app/ui/`:**
- Purpose: Own reusable client components that require browser state or event handlers.
- Contains: `"use client"` React components for chat and contact form workflows.
- Key files: `app/ui/chat-board.tsx` and `app/ui/contact-form.tsx`.

**`.planning/codebase/`:**
- Purpose: Store generated architecture, structure, stack, testing, convention, integration, and concern maps for GSD planning/execution agents.
- Contains: Markdown files written by mapper agents.
- Key files: `.planning/codebase/ARCHITECTURE.md` and `.planning/codebase/STRUCTURE.md`.

**`qa-screenshots/`:**
- Purpose: Store visual QA screenshots for desktop and mobile portfolio checks.
- Contains: PNG screenshots.
- Key files: `qa-screenshots/portfolio-desktop.png` and `qa-screenshots/portfolio-mobile.png`.

**Repository root:**
- Purpose: Own project configuration, operational docs, package metadata, lockfile, and generated framework/type artifacts.
- Contains: `package.json`, `package-lock.json`, `next.config.ts`, `eslint.config.mjs`, `tsconfig.json`, `README.md`, `OPERATIONS.md`, `PRODUCT_INVENTORY.md`, `PROJECT_NOTES.md`, `.env.example`, `.gitignore`, `next-env.d.ts`, and `tsconfig.tsbuildinfo`.
- Key files: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`.

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root App Router layout, metadata, global stylesheet import, and document wrapper.
- `app/page.tsx`: Root `/` page and main portfolio composition.
- `app/api/chat/route.ts`: `/api/chat` POST route handler.
- `app/api/contact/route.ts`: `/api/contact` POST route handler.

**Configuration:**
- `package.json`: npm scripts, runtime dependencies, development dependencies, and module type.
- `package-lock.json`: Locked npm dependency tree.
- `next.config.ts`: Next.js config with Turbopack root set to `process.cwd()`.
- `tsconfig.json`: Strict TypeScript config scoped to `app/**/*.ts`, `app/**/*.tsx`, `next-env.d.ts`, and generated Next type directories.
- `eslint.config.mjs`: ESLint flat config using Next core web vitals and TypeScript presets.
- `.env.example`: Example environment variable names only; do not store real secrets.
- `.gitignore`: Ignore rules for generated and local files.

**Core Logic:**
- `app/page.tsx`: Static portfolio data and section rendering.
- `app/ui/chat-board.tsx`: Client chat UI state and `/api/chat` submission.
- `app/ui/contact-form.tsx`: Client contact form state and `/api/contact` submission.
- `app/api/chat/route.ts`: OpenAI chat request handling.
- `app/api/contact/route.ts`: Resend contact email request handling.

**Styling and Assets:**
- `app/globals.css`: CSS variables, base styles, layout grids, cards, forms, chat UI, and media queries.
- `app/icon.svg`: App icon asset consumed by Next.js metadata/icon handling.

**Documentation:**
- `README.md`: Setup, environment variables, commands, and file overview.
- `OPERATIONS.md`: Working directory, verification commands, local runtime expectations, security notes, and operational warnings.
- `PRODUCT_INVENTORY.md`: Product list and copy guidance for portfolio content.
- `PROJECT_NOTES.md`: Portfolio positioning and project evidence notes.

**Testing and QA:**
- `qa-screenshots/portfolio-desktop.png`: Desktop screenshot artifact.
- `qa-screenshots/portfolio-mobile.png`: Mobile screenshot artifact.
- Automated test directories are not detected in the current repo.

## Naming Conventions

**Files:**
- Use Next.js App Router reserved names for route-level files: `app/layout.tsx`, `app/page.tsx`, and `app/api/**/route.ts`.
- Use kebab-case for custom component filenames under `app/ui/`: `chat-board.tsx`, `contact-form.tsx`.
- Use lowercase global stylesheet naming for the App Router stylesheet: `app/globals.css`.
- Use uppercase root documentation names for project context docs: `README.md`, `OPERATIONS.md`, `PRODUCT_INVENTORY.md`, `PROJECT_NOTES.md`.

**Directories:**
- Use App Router route segment names for URL paths: `app/api/chat/` maps to `/api/chat`, and `app/api/contact/` maps to `/api/contact`.
- Use `app/ui/` for browser-interactive UI components imported by page routes.
- Use `.planning/codebase/` for generated mapper output only.
- Use `qa-screenshots/` for screenshot artifacts; do not place source code there.

**Components and Exports:**
- Use PascalCase for React component exports: `ChatBoard`, `ContactForm`, `Home`, and `RootLayout`.
- Use default exports for App Router page/layout components: `app/page.tsx` and `app/layout.tsx`.
- Use named exports for reusable UI components in `app/ui/`.
- Use named `POST` exports for route handlers in `app/api/**/route.ts`.

**CSS Classes:**
- Use semantic kebab-case class names that describe UI role: `hero-shell`, `topbar`, `project-grid`, `chat-board`, `contact-form`, `form-error`.
- Keep class names in JSX aligned with selectors in `app/globals.css`.

## Where to Add New Code

**New Page Section on `/`:**
- Primary code: Add content arrays or JSX sections in `app/page.tsx`.
- Styling: Add matching classes or extend existing section/card patterns in `app/globals.css`.
- Tests/QA: Add visual verification screenshots under `qa-screenshots/` only when intentionally updating QA artifacts.

**New Interactive Component:**
- Implementation: Add a kebab-case file under `app/ui/`, export a PascalCase component, and include `"use client"` only when state, event handlers, or browser APIs are needed.
- Consumer: Import the component from `app/page.tsx` or another App Router component using relative paths.
- Styling: Add global class selectors in `app/globals.css` using semantic class names.

**New API Endpoint:**
- Implementation: Add `app/api/<endpoint>/route.ts`.
- Handler pattern: Export `runtime = "nodejs"` when Node-only SDKs or environment access are required; export `POST`, `GET`, or the relevant HTTP method with `NextResponse.json` responses.
- Validation: Keep endpoint-specific validation helpers in the same `route.ts` unless they are shared by multiple endpoints.
- Secrets: Read environment variables only in route handlers or server-only modules; never in `app/ui/` components.

**New External Integration:**
- Primary code: Place SDK usage in `app/api/<endpoint>/route.ts` or a server-only helper if multiple route handlers use it.
- Client boundary: Call the route from `app/ui/` with `fetch`; do not import SDKs into client components.
- Documentation: Update `README.md` and `OPERATIONS.md` with required environment variable names and verification commands.

**New Static Asset:**
- App icon or route-level metadata asset: Place under `app/` when it follows Next.js conventions, like `app/icon.svg`.
- QA image: Place under `qa-screenshots/` only when it is a verification artifact.
- Public assets: No `public/` directory exists; create one only when an asset must be served directly by URL.

**Utilities:**
- Shared helpers: No shared utility directory exists. Keep helpers colocated with route/component files first.
- Extract to a new helper module only when at least two files need the same behavior; place server-only helpers near `app/api/` consumers and client-safe helpers near `app/ui/` consumers.

**Tests:**
- Automated test structure is not present. If tests are introduced, colocate narrow tests next to the implementation or create a clearly named test directory consistent with the selected test runner.
- Keep API route tests focused on validation, status codes, and external SDK mocking for `app/api/chat/route.ts` and `app/api/contact/route.ts`.

## Special Directories

**`.next/`:**
- Purpose: Next.js generated build/dev output.
- Generated: Yes.
- Committed: No; treat as disposable framework output.

**`node_modules/`:**
- Purpose: Installed npm dependencies.
- Generated: Yes.
- Committed: No; install from `package-lock.json`.

**`.planning/`:**
- Purpose: GSD planning and codebase intelligence artifacts.
- Generated: Yes.
- Committed: Depends on workflow; do not modify files outside the assigned mapper write set during mapping tasks.

**`qa-screenshots/`:**
- Purpose: Visual verification evidence.
- Generated: Yes, by QA/browser workflows.
- Committed: Project-dependent; update only when visual output changes intentionally.

**`next-env.d.ts`:**
- Purpose: Next.js TypeScript declarations.
- Generated: Yes.
- Committed: Commonly committed in Next.js projects; do not hand-edit.

**`tsconfig.tsbuildinfo`:**
- Purpose: TypeScript incremental build metadata.
- Generated: Yes.
- Committed: Project-dependent; do not hand-edit.

---

*Structure analysis: 2026-05-30*
