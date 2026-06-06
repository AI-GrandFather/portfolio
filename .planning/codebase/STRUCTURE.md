# Repository Structure

## Directory Overview

```text
.
├── app/                         # Deployable Next.js application source
│   ├── api/                     # Public server route handlers
│   │   ├── chat/                # AI chat route and security/cost controls
│   │   └── contact/             # Contact validation and Resend delivery route
│   ├── lib/                     # Typed public content source
│   ├── ui/                      # Reusable server and client UI components
│   ├── globals.css              # Complete visual system and responsive styling
│   ├── icon.svg                 # App Router site icon
│   ├── layout.tsx               # Root document shell
│   └── page.tsx                 # Root portfolio page
├── public/                      # Static assets exposed by the deployed site
├── .planning/                   # GSD project state, roadmap, research, and phase plans
├── design-system/               # Design guidance artifacts
├── qa-screenshots/              # Manual and automated visual QA evidence
├── .playwright-mcp/             # Browser automation snapshots and console logs
├── new-implemntation/           # Historical architecture/content proposal documents
├── newclaude/                   # Historical copy and phase proposal documents
├── newoverhaul/                 # Historical overhaul phase documents
├── icons/                       # Source copies of project icon assets
├── *.pdf / *.jpg / *.png        # Source evidence and review artifacts
└── root configuration/docs      # Package, framework, operations, and inventory files
```

## Deployable Application Tree

```text
app/
├── api/
│   ├── chat/
│   │   ├── route.ts
│   │   └── security.ts
│   └── contact/
│       └── route.ts
├── lib/
│   └── content.ts
├── ui/
│   ├── chat-board.tsx
│   ├── contact-form.tsx
│   ├── document-stack.tsx
│   ├── pre-deployment-safety.tsx
│   ├── project-tile.tsx
│   └── site-nav.tsx
├── globals.css
├── icon.svg
├── layout.tsx
└── page.tsx
```

## `app/` Organization

| Path | Role |
|---|---|
| `app/layout.tsx` | App Router root layout; imports `app/globals.css`, configures fonts and metadata, and bootstraps the selected theme. |
| `app/page.tsx` | Root `/` server component; imports content and UI modules and defines the complete homepage section order. |
| `app/icon.svg` | Site icon automatically discovered by the App Router. |
| `app/globals.css` | Single global stylesheet containing CSS variables, light/dark themes, page layouts, component styles, motion, and breakpoints. |
| `app/lib/content.ts` | Typed runtime source of public biography, project, process, safety, contact, and assistant starter content. |
| `app/ui/` | Page-specific reusable UI modules, split between server-rendered presentation and browser-interactive components. |
| `app/api/` | Same-origin public HTTP endpoints and server-only integration code. |

## `app/ui/` Organization

| File | Rendering Boundary | Responsibility |
|---|---|---|
| `app/ui/site-nav.tsx` | Client component | Primary navigation, mobile menu, theme toggle, outside-click handling, and theme persistence. |
| `app/ui/chat-board.tsx` | Client component | Floating chat popup, AI SDK chat lifecycle, streaming messages, starter prompts, Markdown output, and error display. |
| `app/ui/contact-form.tsx` | Client component | Lead form state, JSON submission, honeypot value, and result feedback. |
| `app/ui/pre-deployment-safety.tsx` | Client component | Interactive accessible safety accordion. |
| `app/ui/document-stack.tsx` | Server-compatible component | Maps document-stack content into a workflow section. |
| `app/ui/project-tile.tsx` | Server-compatible component | Renders project icon images or inline SVG motif artwork. |

## `app/api/` Organization

| File | HTTP Surface | Responsibility |
|---|---|---|
| `app/api/chat/route.ts` | `POST /api/chat` | Builds assistant grounding, validates chat through the security utility, checks limits, invokes the model, and streams responses. |
| `app/api/chat/security.ts` | Internal to chat route | Defines chat limits, validates/sanitizes message history, estimates token cost, and tracks process-local usage. |
| `app/api/contact/route.ts` | `POST /api/contact` | Validates lead fields, applies a honeypot and process-local rate limit, and sends lead email through Resend. |

## `public/` Organization

| Path | Runtime Use |
|---|---|
| `public/55D670AB-C554-4417-86F0-C65863EDE18E.PNG` | Hero portrait referenced by `BIO_FACTS.image` in `app/lib/content.ts`. |
| `public/icons/block-crush-icon.png` | Published game icon referenced by the Block Crush project tile. |
| `public/icons/furrfind-icon.png` | Published app icon referenced by the FurrFind project tile. |

Only files under `public/` are intentionally served as static root URLs.
The similar root-level `icons/` directory contains source copies and is not used by the current application imports.

## Planning And Governance Directories

| Path | Purpose |
|---|---|
| `.planning/PROJECT.md` | Defines project purpose, validated/active requirements, constraints, and decisions. |
| `.planning/ROADMAP.md` | Tracks the phased delivery roadmap and current phase status. |
| `.planning/STATE.md` | Stores current GSD execution position, decisions, pending work, and continuity details. |
| `.planning/REQUIREMENTS.md` | Holds requirement-level planning details. |
| `.planning/phases/` | Contains phase-specific implementation plans, including `07-surgical-ui/` and `08-modern-consultancy/`. |
| `.planning/research/` | Contains research documents for architecture, stack, features, pitfalls, and summary. |
| `.planning/codebase/` | Contains generated maps of the current repository, including this structure document. |
| `AGENTS.md` | Defines repository-wide agent constraints, workflow rules, security rules, and project context. |
| `COMMITS.md` | Maintains the project's human-readable change audit trail. |

## Design And QA Artifact Directories

| Path | Purpose |
|---|---|
| `design-system/mian-portfolio/MASTER.md` | Stores generated design-system guidance and visual tokens; it is not imported by the app. |
| `qa-screenshots/` | Stores desktop/mobile visual QA evidence and theme-specific Playwright captures. |
| `.playwright-mcp/` | Stores browser automation console logs and page snapshots generated during QA. |
| `phase8-fact-fix-*.png` | Root-level Phase 8 visual review evidence. |
| `review-*.png` | Root-level review screenshots. |
| `v2-overhaul-*.png` | Root-level earlier-overhaul screenshots. |

## Historical Proposal Directories

| Path | Purpose |
|---|---|
| `new-implemntation/` | Contains an earlier PRD, architecture proposal, and content strategy; not used by the runtime. |
| `newclaude/` | Contains earlier portfolio copy and phase planning; not used by the runtime. |
| `newoverhaul/` | Contains six historical overhaul phase documents; not used by the runtime. |

These directories are documentation archives rather than application modules.
Changes to them do not affect the deployed portfolio unless their content is manually implemented under `app/`.

## Root Configuration Files

| File | Responsibility |
|---|---|
| `package.json` | Declares npm scripts and runtime/development dependencies. |
| `package-lock.json` | Locks the npm dependency graph. |
| `next.config.ts` | Configures Next.js and the Turbopack root. |
| `tsconfig.json` | Configures strict TypeScript, bundler resolution, and App Router source inclusion. |
| `next-env.d.ts` | Next.js-generated TypeScript declarations. |
| `eslint.config.mjs` | Enables Next.js Core Web Vitals and TypeScript ESLint presets. |
| `.env.example` | Documents server environment variable names without secrets. |
| `.gitignore` | Excludes dependencies, builds, local environment files, logs, and TypeScript build metadata. |
| `skills-lock.json` | Records project skill installation state. |

## Root Operational And Content Documents

| File | Responsibility |
|---|---|
| `README.md` | Gives setup commands, environment requirements, commands, and key file references. |
| `OPERATIONS.md` | Defines local workflow, verification commands, environment handling, and security notes. |
| `PRODUCT_INVENTORY.md` | Defines product evidence, publication status, and safe public-claim rules. |
| `PROJECT_NOTES.md` | Summarizes positioning, product shape, design direction, and chat/contact scope. |
| `CV.pdf`, `Ublox Experience Letter.pdf`, `Fauji FreshnFreeze Experience Letter.pdf`, `OP SELLERS Letter.pdf` | Private/source evidence files used for accurate portfolio positioning; not served by the app. |
| `Saleiac.jpg` | Root-level source image artifact; not referenced by the current application. |

## Import And Dependency Direction

```text
app/layout.tsx
  -> app/globals.css

app/page.tsx
  -> app/lib/content.ts
  -> app/ui/site-nav.tsx
  -> app/ui/project-tile.tsx
  -> app/ui/document-stack.tsx
  -> app/ui/pre-deployment-safety.tsx
  -> app/ui/contact-form.tsx
  -> app/ui/chat-board.tsx

app/ui/*
  -> app/lib/content.ts where content is needed
  -> browser APIs or client libraries only in `"use client"` modules

app/api/chat/route.ts
  -> app/api/chat/security.ts
  -> `ai`
  -> `@ai-sdk/openai`

app/api/contact/route.ts
  -> `next/server`
  -> `resend`
```

Application dependencies point inward toward `app/lib/content.ts` and route-local helpers.
The runtime does not import files from `.planning/`, `design-system/`, QA directories, historical proposal directories, or root evidence documents.

## Naming And Placement Conventions

- App Router entry files use framework names: `layout.tsx`, `page.tsx`, and `route.ts`.
- UI module filenames under `app/ui/` use kebab-case and export PascalCase components.
- Shared public content belongs in `app/lib/content.ts`; route-specific security helpers remain beside their route.
- Public static assets belong in `public/` and are referenced with root-relative URLs such as `/icons/furrfind-icon.png`.
- Global visual rules belong in `app/globals.css`; the current repository has no CSS modules or component-local stylesheet files.
- Repository planning artifacts belong under `.planning/`, while review screenshots remain outside deployable application source.

## Change Boundaries

- Homepage structure or section ordering changes primarily affect `app/page.tsx`.
- Public portfolio facts and reusable copy changes primarily affect `app/lib/content.ts` and must remain aligned with `PRODUCT_INVENTORY.md`.
- Interactive widget behavior changes belong in the relevant module under `app/ui/`.
- Visual changes belong in `app/globals.css`, with component class-name changes coordinated with their TSX callers.
- Chat provider, prompt, validation, cost, or rate-limit changes belong in `app/api/chat/`.
- Contact validation or email-delivery changes belong in `app/api/contact/route.ts`.
- Static runtime images must be added under `public/`; root screenshots and evidence documents should remain non-runtime artifacts.
