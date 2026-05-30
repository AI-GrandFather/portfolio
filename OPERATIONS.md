# Operations

## Working Directory

Use this folder for future work:

```bash
cd /Users/atharmushtaq/projects/portfolio
```

The parent `/Users/atharmushtaq/projects` directory was only needed during initial creation to inspect existing project evidence.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Environment Variables

Chat:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5.5
```

Contact email:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
CONTACT_FROM_EMAIL=...
```

Keep these in `.env.local`. Do not commit real keys.

## Verification

Run these before claiming a change is complete:

```bash
npm run lint
npm run typecheck
npm run build
```

Useful manual checks:

```bash
curl -s -i -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"What can we build?"}'

curl -s -i -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Lead","email":"test@example.com","projectType":"AI assistant","budget":"Exploring","message":"I want to build a product."}'
```

Without real env vars, expected responses are:

- `/api/chat`: `503` with `Chat is not configured yet...`
- `/api/contact`: `503` with `Contact email is not configured yet.`

## Known Warning: Chrome `--no-sandbox`

If Chrome shows this message during automated QA:

```text
You are using an unsupported command-line flag: --no-sandbox. Stability and security will suffer.
```

Root cause: the Playwright/MCP automation browser is launched with `--no-sandbox`.

Evidence from process inspection showed the automated Chrome process included:

```text
--user-data-dir=/Users/atharmushtaq/Library/Caches/ms-playwright/mcp-chrome-75dfef4
--remote-debugging-pipe
--no-sandbox
```

This is not set by the portfolio app. Normal manual browsing should use regular Chrome/Safari at `http://localhost:3000`.

## Dependency Audit Note

`npm audit --omit=dev` currently reports a moderate transitive PostCSS advisory through `next@16.2.6`.

Do not run:

```bash
npm audit fix --force
```

The suggested forced fix downgrades Next to an old breaking version. Re-check with current Next release notes before changing framework versions.

## Security Notes

- OpenAI and Resend keys must stay server-side.
- Do not log full user messages, secrets, signed URLs, uploaded files, or private local paths.
- Keep rate limits on public endpoints.
- If adding database lead storage later, define retention, access control, and deletion policy first.
