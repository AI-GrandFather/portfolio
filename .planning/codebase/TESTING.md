# Testing And Verification

## Current Testing Posture

- This document records testing and verification practices present in the repository as of 2026-06-06.
- The repository has static quality gates and manual QA evidence, but no committed automated test suite.
- No Jest, Vitest, Playwright, Cypress, Testing Library, or coverage dependency appears in `package.json` or `package-lock.json`.
- No `test` script exists in `package.json`.
- No test files, test configuration files, or CI workflow files were found in the repository.
- The `coverage/` directory is ignored in `.gitignore`, but no coverage producer is configured.

## Available Automated Gates

- `npm run lint` runs ESLint across the repository using `eslint.config.mjs`.
- ESLint combines `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- `npm run typecheck` runs `tsc --noEmit` using strict compiler settings from `tsconfig.json`.
- `npm run build` runs the Next.js production build and validates framework compilation and route generation.
- `npm run dev` and `npm run start` provide local development and production-style runtime entry points.
- `README.md` and `OPERATIONS.md` list lint, typecheck, and build as the standard verification commands.
- `AGENTS.md` requires lint, typecheck, build, endpoint checks, and browser screenshots for relevant changes.
- These commands are manually invoked; there is no GitHub Actions or other CI configuration enforcing them on pushes or pull requests.

## Manual Runtime Verification

- `OPERATIONS.md` identifies `http://localhost:3000` as the local manual-test target.
- `OPERATIONS.md` provides curl examples intended to exercise `/api/chat` and `/api/contact`.
- Current drift: the documented chat curl sends a single `message` field, but `app/api/chat/route.ts` expects a `messages` array.
- Current drift: the documented contact curl sends `projectType`, `budget`, and `message`, but `app/api/contact/route.ts` requires `building`, `platform`, `timeline`, and `budget`.
- Current drift: `OPERATIONS.md` expects an unconfigured chat route to return `503`, but `app/api/chat/route.ts` has no explicit environment check and catches provider failures as `500`.
- The contact route does explicitly return `503` when Resend configuration is missing.
- Because of this documentation drift, the current curl examples are not reliable regression checks without correction.

## Visual QA Evidence

- Committed desktop and mobile screenshots exist at `qa-screenshots/portfolio-desktop.png` and `qa-screenshots/portfolio-mobile.png`.
- Theme-specific Playwright-generated screenshots exist under `qa-screenshots/theme-qa/`.
- Theme QA artifacts cover light and dark hero views, work views, mobile hero views, and mobile menu views.
- Additional historical screenshots exist at the repository root, including `review-desktop.png`, `review-mobile.png`, `v2-overhaul-desktop.png`, and `v2-overhaul-mobile.png`.
- Browser automation artifacts exist under `.playwright-mcp/`, including console logs and page snapshots.
- These files prove manual or MCP-assisted visual inspection occurred, but they are not driven by a committed repeatable Playwright configuration or test command.
- There is no automated screenshot baseline comparison, visual-diff threshold, or artifact freshness check.

## Existing Testable Boundaries

- Pure functions in `app/api/chat/security.ts`, including `estimateTokens`, `calculateCost`, `validateRequest`, and `checkLimits`, are natural unit-test targets.
- Contact validation, honeypot behavior, allowed-value checks, field lengths, rate limiting, configuration errors, and provider failures are testable through `app/api/contact/route.ts`.
- Chat validation, history truncation, role normalization, burst limits, daily limits, cost caps, and streaming failures are testable through `app/api/chat/route.ts` and `app/api/chat/security.ts`.
- Client behavior in `app/ui/contact-form.tsx` includes sending, success, validation, and error states that currently lack component tests.
- Client behavior in `app/ui/chat-board.tsx` includes prompt submission, streaming/loading display, reset, auto-scroll, and error parsing that currently lacks component tests.
- Navigation and theme behavior in `app/ui/site-nav.tsx` includes persistence, outside-click closing, mobile menu state, and accessibility attributes that currently lack automated interaction tests.
- Accordion behavior in `app/ui/pre-deployment-safety.tsx` currently relies on manual inspection.

## Error And Edge-Case Coverage Present In Code

- `app/api/contact/route.ts` explicitly handles malformed JSON, non-object payloads, missing fields, invalid allowed values, invalid lengths, honeypot submissions, rate limits, missing configuration, and Resend failures.
- `app/api/chat/security.ts` explicitly handles invalid message collections, empty conversations, malformed last messages, empty messages, oversized input, history truncation, burst limits, daily limits, and cost limits.
- `app/api/chat/route.ts` has a catch-all failure response for unexpected exceptions.
- `app/ui/contact-form.tsx` displays a server-provided error or a fallback error.
- `app/ui/chat-board.tsx` handles both JSON-shaped and plain error messages.
- These branches are implemented but have no automated assertions proving their response status, body shape, or UI behavior.

## Missing Automated Coverage

- No unit tests protect the security and cost calculations in `app/api/chat/security.ts`.
- No route-level tests protect the request contracts or response statuses for `/api/chat` and `/api/contact`.
- No provider SDK mocks verify OpenAI streaming or Resend delivery behavior.
- No component tests verify form submissions, chat interactions, navigation, theme persistence, or accordion accessibility.
- No end-to-end tests verify the primary conversion path from project evidence to chat or contact submission.
- No accessibility test runner checks keyboard operation, focus visibility, semantic structure, or ARIA state changes.
- No automated responsive-layout checks protect against text overlap or mobile navigation regressions.
- No content-contract tests compare public claims in `app/lib/content.ts` with publication rules in `PRODUCT_INVENTORY.md`.
- No regression test protects the server/client mismatch between the chat input `maxLength={900}` and server `MAX_INPUT_CHARS: 3000`.
- No load or concurrency tests validate the in-memory rate-limit and cost-control behavior.
- No test isolates mutable module-level stores, so future tests will need explicit reset seams or process isolation.
- No coverage thresholds, mutation testing, or branch-coverage reports are configured.

## Quality Risks

- Manual-only endpoint checks can drift from implementation, as demonstrated by `OPERATIONS.md`.
- In-memory limit state resets on restart and is not shared across instances, so local checks cannot prove production-wide abuse protection.
- Raw `console.error` logging in `app/api/chat/route.ts` could expose provider or request-related details in server logs; no test or lint rule guards against this.
- A successful build does not validate live OpenAI or Resend behavior because those depend on environment variables and external services.
- Screenshot artifacts do not prove current behavior unless their generation date and tested commit are recorded.
- Historical phase documents describe intended gates, but they do not constitute executable verification.

## Recommended Verification Matrix For Current Changes

- For any code change, run `npm run lint`, `npm run typecheck`, and `npm run build`.
- For contact-route changes, manually verify valid, invalid, honeypot, rate-limited, unconfigured, and provider-failure paths.
- For chat-route changes, manually verify invalid payloads, oversized messages, rate limits, unconfigured/provider failures, streaming success, and client error rendering.
- For UI changes, inspect desktop and mobile layouts in both light and dark themes.
- For interactive UI changes, verify keyboard focus, ARIA state changes, outside-click behavior, and reduced-motion behavior.
- For public copy changes, cross-check project statuses against `PRODUCT_INVENTORY.md`.
- Record actual commands, outputs, viewport sizes, environment assumptions, and tested commit when claiming verification.

## Priority Additions When Automated Testing Is Approved

- Add focused unit tests first for `app/api/chat/security.ts` because it contains pure, high-risk cost and abuse-control logic.
- Add route contract tests for `app/api/contact/route.ts` and `app/api/chat/route.ts` with provider calls mocked.
- Add a small end-to-end suite for page load, theme toggle, mobile menu, chat failure handling, and contact validation.
- Convert the useful manual scenarios in `OPERATIONS.md` into executable checks so documentation and behavior cannot silently diverge.
- Add CI only after selecting the test runner and browser tooling through the repository's dependency-approval process.
