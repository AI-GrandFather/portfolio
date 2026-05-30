# Mian Muhammad Athar Portfolio

Client-facing portfolio for mobile apps, games, AI tools, dashboards, and SaaS systems.

This folder is now self-contained for day-to-day work. The initial build was created while operating from `/Users/atharmushtaq/projects` only so the portfolio could reference nearby projects for accurate context.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Local app URL:

```bash
http://localhost:3000
```

Required for live chat:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5.5
```

Required for contact form email delivery:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
CONTACT_FROM_EMAIL=...
```

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Project Files

- `PRODUCT_INVENTORY.md` — product list, publication status, in-progress projects, and safe copy rules.
- `PROJECT_NOTES.md` — product context, portfolio positioning, and project evidence.
- `OPERATIONS.md` — local workflow, environment, verification, and known warnings.
- `app/page.tsx` — main portfolio content.
- `app/api/chat/route.ts` — server-only OpenAI chat endpoint.
- `app/api/contact/route.ts` — server-only contact email endpoint.
- `app/globals.css` — visual system and responsive layout.
