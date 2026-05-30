# Testing Patterns

**Analysis Date:** 2026-05-30

## Test Framework

**Runner:**
- Not detected.
- No `jest.config.*`, `vitest.config.*`, or `playwright.config.*` files are present in the repository.
- `package.json` has no `test` script and no test runner dependency.

**Assertion Library:**
- Not detected.
- No assertion library is configured in `package.json`.

**Run Commands:**
```bash
npm run lint        # Run ESLint with Next.js core-web-vitals and TypeScript rules
npm run typecheck   # Run TypeScript static checking with tsc --noEmit
npm run build       # Build the Next.js app
```

## Test File Organization

**Location:**
- Not detected.
- No `*.test.*` or `*.spec.*` files were found outside `node_modules/` and `.next/`.

**Naming:**
- Not detected.
- When tests are added, prefer colocated files beside the module under test because the codebase is compact and organized by route/component. Examples: `app/api/contact/route.test.ts`, `app/api/chat/route.test.ts`, `app/ui/contact-form.test.tsx`, and `app/ui/chat-board.test.tsx`.

**Structure:**
```text
app/
├── api/
│   ├── chat/
│   │   ├── route.ts
│   │   └── route.test.ts          # recommended location if route tests are added
│   └── contact/
│       ├── route.ts
│       └── route.test.ts          # recommended location if route tests are added
└── ui/
    ├── chat-board.tsx
    ├── chat-board.test.tsx        # recommended location if component tests are added
    ├── contact-form.tsx
    └── contact-form.test.tsx      # recommended location if component tests are added
```

## Test Structure

**Suite Organization:**
```typescript
// No existing automated test suites are present.
// Use behavior-first names when adding tests:
describe("POST /api/contact", () => {
  test("returns 400 for invalid email", async () => {
    // Arrange request
    // Act by calling POST(request)
    // Assert NextResponse status and JSON body
  });
});
```

**Patterns:**
- Use `npm run lint`, `npm run typecheck`, and `npm run build` as the current verification baseline, matching `README.md` and `OPERATIONS.md`.
- For route tests, call exported handlers directly from `app/api/chat/route.ts` and `app/api/contact/route.ts` with constructed `Request` instances.
- For client component tests, exercise visible form behavior in `app/ui/contact-form.tsx` and `app/ui/chat-board.tsx`: disabled states, error states, success states, submitted payloads, and rendered assistant/user messages.
- Keep tests focused on public behavior. Do not assert internal implementation details such as the exact `Map` bucket object shape in the rate limit helpers.

## Mocking

**Framework:** Not detected.

**Patterns:**
```typescript
// No existing mocking pattern is present.
// When a runner is added, mock network/provider boundaries only:
// - OpenAI responses client used by `app/api/chat/route.ts`
// - Resend email client used by `app/api/contact/route.ts`
// - browser `fetch` used by `app/ui/contact-form.tsx` and `app/ui/chat-board.tsx`
```

**What to Mock:**
- Mock `OpenAI` in `app/api/chat/route.ts` so tests cover success, provider failure, missing reply, and configured model behavior without calling the real API.
- Mock `Resend` in `app/api/contact/route.ts` so tests cover email send success and provider failure without sending real email.
- Mock `fetch` in `app/ui/contact-form.tsx` and `app/ui/chat-board.tsx` so component tests cover client behavior without starting a server.
- Mock environment variables for route tests: `OPENAI_API_KEY`, `OPENAI_MODEL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.

**What NOT to Mock:**
- Do not mock validation logic in `app/api/contact/route.ts`; assert invalid payloads directly against the handler.
- Do not mock `NextResponse`; assert status codes and JSON bodies returned by the real route handlers.
- Do not mock React state; interact with `ContactForm` and `ChatBoard` through rendered fields, buttons, and messages.

## Fixtures and Factories

**Test Data:**
```typescript
// No shared fixtures are present.
const validContactPayload = {
  name: "Test Lead",
  email: "test@example.com",
  projectType: "AI assistant",
  budget: "Exploring",
  message: "I want to build a product.",
};
```

**Location:**
- Not detected.
- Keep tiny fixtures inline in the relevant test file. Create a shared helper only after duplication appears across multiple tests.
- Use the request examples in `OPERATIONS.md` as the canonical manual payloads for `/api/chat` and `/api/contact`.

## Coverage

**Requirements:** None enforced.

**View Coverage:**
```bash
# Not available: no coverage script or coverage tool is configured in package.json.
```

## Test Types

**Unit Tests:**
- Not currently implemented.
- Highest-value unit coverage should start with validation and error behavior in `app/api/contact/route.ts`, request validation and response handling in `app/api/chat/route.ts`, and submit-state transitions in `app/ui/contact-form.tsx` / `app/ui/chat-board.tsx`.

**Integration Tests:**
- Not currently implemented.
- Manual API integration checks are documented in `OPERATIONS.md` with `curl` commands for `/api/chat` and `/api/contact`.
- Without real environment variables, expected manual responses are `503` from `/api/chat` for missing `OPENAI_API_KEY` and `503` from `/api/contact` for missing Resend/contact email configuration.

**E2E Tests:**
- No E2E framework is configured.
- `qa-screenshots/portfolio-desktop.png` and `qa-screenshots/portfolio-mobile.png` indicate manual or browser-based visual QA artifacts, but there is no committed Playwright test suite.

## Common Patterns

**Async Testing:**
```typescript
// Recommended for route handlers once a test runner exists.
const response = await POST(
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validContactPayload),
  }),
);

expect(response.status).toBe(200);
expect(await response.json()).toEqual({ ok: true });
```

**Error Testing:**
```typescript
// Recommended pattern for API validation once a test runner exists.
const response = await POST(
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...validContactPayload, email: "not-an-email" }),
  }),
);

expect(response.status).toBe(400);
expect(await response.json()).toEqual({
  error: "Please complete every field with a valid email address.",
});
```

---

*Testing analysis: 2026-05-30*
