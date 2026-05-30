# Phase 8 Fact Correction And Implementation Plan

## Summary

Implement the current portfolio overhaul in small phases, correcting the two known product facts first:

- AuraPOS is the current live product name, not NexPOS.
- Handtracking is a complete experimental project/proof piece.
- Keep production app content, assistant facts, source-of-truth docs, and GSD planning state aligned.
- Preserve the modern consultancy visual direction, while fixing project accuracy, missing Handtracking, mobile hero wrapping, and the `next/image` sizing warning.

## Key Changes

### Phase 1: Source Of Truth And GSD Alignment

- Update `PRODUCT_INVENTORY.md` so AuraPOS is listed as live, with `https://nexpos-ten.vercel.app/` recorded as verified by HTTP 200 on May 31, 2026.
- Change AuraPOS publication rules so it is no longer grouped with unverified projects.
- Mark Handtracking as a complete experimental project, without implying commercial launch.
- Update `PROJECT_NOTES.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, and Phase 8 plan text so future agents do not reintroduce "NexPOS" or "launch not confirmed" for AuraPOS.
- Keep the phase structure as Phase 8, but revise it into four execution waves: facts, content model, UI polish, verification.

### Phase 2: Content Model And Public Claims

- Update `app/lib/content.ts`:
  - Add `Live` to `ProjectStatus`.
  - Rename `NexPOS (AuraPOS)` to `AuraPOS`.
  - Set AuraPOS status to `Live`.
  - Keep the existing live link unless the user provides a replacement URL.
  - Add Handtracking as a project with status `Experiment`, positioned as a completed computer-vision interaction experiment.
- Keep claims concrete and proof-backed: no revenue, client, uptime, or commercial adoption claims unless explicitly verified.
- Ensure the chat assistant uses the corrected project list through the shared `PROJECTS` data.

### Phase 3: Homepage UI And Copy Polish

- Update project cards so status and project type are both visible again, preventing `Live` and `Experiment` from losing context.
- Add Handtracking to the project grid without overcrowding the layout.
- Fix mobile hero wrapping by tightening the mobile heading scale and/or shortening the headline to a cleaner consultancy line.
- Add the missing `sizes` prop to the hero `Image`.
- Keep the light consultancy aesthetic, but avoid generic language where easy:
  - Prefer "Client-ready product systems" over vague "Proven Impact."
  - Prefer "Build the next product" over broad "Ready to Scale?"

### Phase 4: Interactive Surface And Release Verification

- Confirm chat starter prompts and assistant system prompt reflect corrected AuraPOS and Handtracking facts.
- Verify contact form and chat UI still match the light visual system after project-card and hero changes.
- Run:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- Browser-check desktop and mobile:
  - Hero text does not wrap awkwardly.
  - AuraPOS appears as live.
  - Handtracking appears as a completed experiment.
  - Project cards remain readable and aligned.
  - Console has no `next/image` warning.
- If environment variables are present, manually probe `/api/chat` and `/api/contact`; otherwise report endpoint verification as partial and state which env vars were missing.

## Public Interfaces And Types

- `ProjectStatus` gains a new value: `Live`.
- `PROJECTS` becomes the single public app source for AuraPOS and Handtracking display and assistant prompt facts.
- No new dependencies.
- No API route contract changes.
- No secret, analytics, payment, database, or deployment changes.

## Test Plan

- Static checks:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- Content checks:
  - Search for stale `NexPOS` references.
  - Search for stale AuraPOS "launch not confirmed" language.
  - Confirm Handtracking appears in inventory, app content, and assistant facts.
- Runtime checks:
  - Load `/` on desktop and mobile.
  - Capture screenshots for visual QA.
  - Check browser console warnings.
  - Confirm AuraPOS link opens successfully.
- Manual acceptance:
  - AuraPOS reads as live/current.
  - Handtracking reads as complete experimental proof.
  - Mobile hero is polished.
  - Page still feels like a professional technical consultancy portfolio.

## Assumptions

- The current AuraPOS live URL remains `https://nexpos-ten.vercel.app/`.
- Handtracking should be visible as a main project card, but labeled `Experiment` to avoid implying a commercial product launch.
- GSD planning artifacts should be updated during implementation so future work follows the corrected facts.
- The implementation should not add dependencies or broaden scope into analytics, CAPTCHA, monitoring, or backend architecture changes.
