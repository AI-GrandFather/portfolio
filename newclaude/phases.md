# PORTFOLIO_PHASES.md
# Claude Code Execution Phases — Portfolio Enhancement
# Execute phases in order. Do NOT begin a phase until the previous one
# has passed typecheck, build, and been committed.
# Reference document: PORTFOLIO_COPY.md (keep open alongside this file)

---

## PHASE 1 — Delivery Lifecycle: Add Deliverable Lines

### Scope
Expand the existing Delivery Lifecycle section (5 cards) by adding a
deliverable line below each card's body text. No new components. No layout
changes. Surgical text additions only.

### Pre-conditions
- [ ] PORTFOLIO_COPY.md is present in the project root or accessible
- [ ] `npm run typecheck` passes clean on current main
- [ ] `npm run build` passes clean on current main

### Prompt (paste into Claude Code)

```
Read PORTFOLIO_COPY.md fully before touching any file.

Explore the project structure and identify the component or file that renders
the Delivery Lifecycle section — the five numbered cards (Discovery, Blueprint,
Build, Harden, Launch).

For each of the five cards, add a deliverable line below the existing body
text. The exact text for each card is in PORTFOLIO_COPY.md under
"SECTION A — UPDATED: Delivery Lifecycle".

Rules:
- Do not change any existing text, heading, number, or layout
- Render the deliverable line in italic (use <em> or italic styled span
  matching the existing type system — do not introduce new CSS classes)
- Add a small top margin so it sits visually separated from the body above
  (use the existing spacing scale, do not add inline styles)
- If the card component takes body text as a string prop, you may need to
  accept a separate `deliverable` prop — confirm the component shape before
  editing and handle both cases cleanly

After all five additions:
- Run `npm run typecheck` — must pass with zero errors
- Run `npm run build` — must pass clean
- Commit: `feat: add deliverable lines to delivery lifecycle cards`
- Add entry to COMMITS.md: [commit hash] [date PKT] Phase 1 — Delivery
  lifecycle deliverable lines added to all five cards
```

### Acceptance criteria
- [ ] All 5 cards have an italic deliverable line below body text
- [ ] No existing text was altered
- [ ] No new CSS classes introduced (uses existing spacing/type scale)
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] COMMITS.md entry added

---

## PHASE 2 — New Section: The Document Stack

### Scope
Create a new "Document Stack" section component and insert it into the page
between the "How I Build" section and the "Delivery Lifecycle" section.
Five numbered cards. Follows the existing numbered-card visual pattern.

### Pre-conditions
- [ ] Phase 1 committed and verified

### Prompt (paste into Claude Code)

```
Read PORTFOLIO_COPY.md fully before touching any file.

Explore the project structure. Identify:
1. Where the "How I Build" section ends in the page layout
2. Where the "Delivery Lifecycle" section begins
3. The pattern used for numbered card components (props, styling, structure)
   — look at HowIBuild or DeliveryLifecycle components as reference

Create a new component: DocumentStack (file name to match project conventions).

The section must contain:
- An eyebrow label: "Document Stack"
- An h2 heading: "Every project starts on paper."
- A subheading: "The build is just the execution."
- An intro paragraph
- Five numbered cards (01–05): PRD, TRD, Architecture Document, Phase Plans,
  CLAUDE.md

All copy is in PORTFOLIO_COPY.md under "SECTION B — NEW: The Document Stack".

Rules:
- Match the visual pattern of the "How I Build" section exactly (same card
  structure, same number treatment, same section heading hierarchy)
- Do not introduce new fonts, color tokens, or CSS utility patterns not
  already in the project
- Add section id="document-stack" to the section wrapper
- Insert the component into the page layout between HowIBuild and
  DeliveryLifecycle — confirm the exact insertion point by reading page.tsx
  or the main layout file before editing

After insertion:
- Run `npm run typecheck` — must pass with zero errors
- Run `npm run build` — must pass clean
- Commit: `feat: add document stack section`
- Add entry to COMMITS.md: [commit hash] [date PKT] Phase 2 — Document Stack
  section created and inserted between How I Build and Delivery Lifecycle
```

### Acceptance criteria
- [ ] New component file created following project naming conventions
- [ ] Section appears between "How I Build" and "Delivery Lifecycle" on page
- [ ] All 5 cards render with correct copy from PORTFOLIO_COPY.md
- [ ] Section has id="document-stack"
- [ ] No new design tokens or fonts introduced
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] COMMITS.md entry added

---

## PHASE 3 — New Section: Pre-Deployment Safety

### Scope
Create a new "Pre-Deployment Safety" section with 9 accordion/expandable
checklist cards. Insert after Document Stack, before the Stack/Tools section.
This is the most complex phase — take it carefully.

### Pre-conditions
- [ ] Phase 2 committed and verified

### Prompt (paste into Claude Code)

```
Read PORTFOLIO_COPY.md fully before touching any file.

Explore the project structure. Identify:
1. Where the Document Stack section ends and where the Stack/Tools section begins
2. Whether the project already uses an accordion or disclosure component
   (check the component library, shadcn if present, or any existing ui/
   directory)
3. The existing animation and interaction patterns — match them

Create a new component: PreDeploymentSafety.

The section must contain:
- An eyebrow label: "Pre-Deployment Safety"
- An h2 heading: "Nothing ships without a signed-off checklist."
- A subheading: "No exceptions. No deadline pressure."
- An intro paragraph
- 9 accordion items — titles always visible, body text revealed on click
- A closing statement below all accordion items

All copy (titles, bodies, closing line) is in PORTFOLIO_COPY.md under
"SECTION C — NEW: Pre-Deployment Safety". There are 9 items (01–09).
Use the exact copy — do not reword or summarise.

Accordion implementation rules:
- If shadcn/ui is in the project, use the Accordion component from
  @/components/ui/accordion — do not build a custom one
- If no accordion component exists, build a lightweight one using React
  useState — one boolean per item, or a single activeIndex pattern
- First item should render expanded by default so the pattern is immediately
  clear to the visitor
- Smooth expand/collapse animation (CSS max-height transition or framer-motion
  if already used in the project — do not add framer-motion if not present)
- Chevron icon rotates on expand (use an existing icon library if present,
  otherwise a simple CSS-rotated SVG)

Section rules:
- Add section id="safety"
- Insert into page between DocumentStack and the Stack/Tools section
- Match the section heading hierarchy and spacing of other sections

After insertion:
- Run `npm run typecheck` — must pass with zero errors
- Run `npm run build` — must pass clean
- Commit: `feat: add pre-deployment safety section with accordion`
- Add entry to COMMITS.md: [commit hash] [date PKT] Phase 3 — Pre-Deployment
  Safety section created, 9 accordion items, inserted after Document Stack
```

### Acceptance criteria
- [ ] New component file created following project naming conventions
- [ ] Section appears between Document Stack and Stack/Tools on page
- [ ] All 9 accordion items render with correct copy from PORTFOLIO_COPY.md
- [ ] First item is expanded by default
- [ ] Expand/collapse is animated
- [ ] Chevron icon rotates on expand
- [ ] Section has id="safety"
- [ ] No accordion library added if not already in project (use existing or
      build lightweight)
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] COMMITS.md entry added

---

## PHASE 4 — How I Build: Agent Governance Paragraph

### Scope
Add one paragraph to the existing "Agent Build" card (Step 02) in the
"How I Build" section. Surgical addition only — no layout or component changes.

### Pre-conditions
- [ ] Phase 3 committed and verified

### Prompt (paste into Claude Code)

```
Read PORTFOLIO_COPY.md fully before touching any file.

Find the component or JSX that renders the "How I Build" section. Locate
Step 02 — the "Agent Build" card.

Below the existing body text of Step 02, add the governance paragraph from
PORTFOLIO_COPY.md under "SECTION D — UPDATED: How I Build — Step 02".

Rules:
- Do not change any existing text in Step 02
- Render the new paragraph using the same paragraph/body text style as the
  existing card body — check the className already applied to body text in
  adjacent cards and use the same one
- Add a small top margin to separate it from the existing body (use the
  spacing scale, no inline styles)
- Do not touch Step 01 or Step 03

After the addition:
- Run `npm run typecheck` — must pass with zero errors
- Run `npm run build` — must pass clean
- Commit: `feat: add agent governance detail to how i build step 02`
- Add entry to COMMITS.md: [commit hash] [date PKT] Phase 4 — Agent governance
  paragraph added to How I Build Step 02
```

### Acceptance criteria
- [ ] Governance paragraph appears below existing body of Step 02 only
- [ ] No other cards were modified
- [ ] Styling matches existing card body text
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] COMMITS.md entry added

---

## PHASE 5 — Contact Section: What's Included Block

### Scope
Add a "Every engagement includes:" list block inside the Contact section,
positioned above the existing form fields. Clean, scannable list. No form
changes.

### Pre-conditions
- [ ] Phase 4 committed and verified

### Prompt (paste into Claude Code)

```
Read PORTFOLIO_COPY.md fully before touching any file.

Find the component or JSX that renders the Contact section. Locate the
wrapper that contains the form fields (Name, Email, What are you building,
Platform, Timeline, Budget, etc.).

Above the first form field, add a new block:

- A small header: "Every engagement includes:"
- A list of 8 items (from PORTFOLIO_COPY.md under
  "SECTION E — NEW: Contact What's Included")

Layout rules:
- Render as a clean list — either a styled <ul> with custom markers, or a
  two-column grid of short items, depending on what reads better at the
  contact section width. Use your judgment based on the existing layout.
- Style the header at body-small or label scale — it should not compete
  with the main contact heading above it
- Style list items at body-small scale with a subtle marker (a dash, a
  small dot, or a checkmark icon if icons are already in the project)
- Add bottom margin below the list so it sits comfortably above the first
  form field
- Do not alter any form fields, labels, or the submit button

After the addition:
- Run `npm run typecheck` — must pass with zero errors
- Run `npm run build` — must pass clean
- Commit: `feat: add what is included list to contact section`
- Add entry to COMMITS.md: [commit hash] [date PKT] Phase 5 — What's included
  list added to Contact section above form fields
```

### Acceptance criteria
- [ ] 8-item list with header appears above the form fields
- [ ] No form fields were modified
- [ ] Styling is consistent with the contact section's existing type scale
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] COMMITS.md entry added

---

## PHASE 6 — Navigation: Add Document Stack and Safety Links

### Scope
Add two new links to the top navigation bar. This is the final phase.
Touch only the nav component — nothing else.

### Pre-conditions
- [ ] All Phases 1–5 committed and verified
- [ ] Sections `#document-stack` and `#safety` confirmed rendering correctly
  in a local preview before running this phase

### Prompt (paste into Claude Code)

```
Read PORTFOLIO_COPY.md fully before touching any file. Check the Navigation
Update section at the bottom of the file.

Find the navigation component (likely a Header or Navbar component). The
current links are: Work | How I Build | Contact.

Add two new links in this order:
  Work | How I Build | Document Stack | Safety | Contact

Link targets:
- Document Stack → #document-stack
- Safety → #safety

Rules:
- Match the exact styling (font size, weight, color, hover state) of the
  existing nav links — inspect the className applied to the current links
  and reuse it exactly
- Do not alter the mobile menu if one exists — add the same two links there
  in the same position
- Do not change the logo, layout, background, or any other nav element

After the addition:
- Run `npm run typecheck` — must pass with zero errors
- Run `npm run build` — must pass clean
- Commit: `feat: add document-stack and safety links to navigation`
- Add entry to COMMITS.md: [commit hash] [date PKT] Phase 6 — Document Stack
  and Safety nav links added. All portfolio enhancement phases complete.
```

### Acceptance criteria
- [ ] Nav shows: Work | How I Build | Document Stack | Safety | Contact
- [ ] Both new links scroll correctly to their target sections
- [ ] Mobile nav (if present) also has both links
- [ ] Styling matches existing nav links exactly
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] COMMITS.md entry added with "All portfolio enhancement phases complete"
  notation

---

## POST-EXECUTION VERIFICATION

After all 6 phases are committed, do a full site review:

1. Load the site in a browser
2. Click every new nav link — confirm smooth scroll to correct section
3. Open all 9 accordion items — confirm correct copy, confirm animation
4. Check mobile viewport (375px) — all sections must be readable with no
   overflow or layout breaks
5. Check that no existing section (Work, Stack, HowIBuild) was
   accidentally altered
6. Run Lighthouse or PageSpeed — confirm no performance regression from
   the new sections
7. Deploy to Vercel preview — confirm the build matches local

---
_End of PORTFOLIO_PHASES.md_