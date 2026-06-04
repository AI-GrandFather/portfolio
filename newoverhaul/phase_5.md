# PHASE 5 — Final Accessibility, Performance, and Conversion Pass

# Context

Execute Phase 5. This is the final polish and QA phase.

Do not redesign the site again.
Do not add new visual concepts.
Focus on quality, accessibility, performance, mobile polish, and customer conversion.

# Target Files

* app/page.tsx
* app/globals.css
* package.json only if checking scripts
* any component files used on the homepage

# Tasks

1. Accessibility QA
   Check and fix:

* Semantic HTML structure
* Heading order
* Link text clarity
* Button labels
* Keyboard navigation
* Focus states
* Color contrast
* prefers-reduced-motion
* Form label accessibility if contact form exists

2. Performance QA
   Check and fix:

* No unnecessary dependencies
* No heavy animation libraries
* No oversized CSS effects that hurt mobile performance
* No expensive blur/glow overuse
* No layout thrashing patterns
* No unused imports caused by earlier edits

3. Mobile QA
   Verify:

* 375x812
* 390x844
* 430x932
* tablet width
* desktop width

Check:

* Header visible and tappable
* No horizontal scrolling
* Hero readable
* CTA buttons accessible
* Project cards readable
* Contact section usable

4. Conversion QA
   Make sure the page clearly communicates:

* Who the portfolio owner is
* What services/products they build
* What proof exists
* How to contact/start a project
* Why the person is trustworthy

Improve CTA wording only if needed.
Do not rewrite the whole site.

5. Final Build and Report
   Run:

* npm run build

Then provide a final report:

* Files changed
* Main improvements
* Accessibility checks completed
* Performance risks avoided
* Any remaining recommendations

# Validation Gate

Before completion, verify and report:

* Production build passes
* Mobile layout is stable
* No horizontal scroll
* Header/nav works
* Project section is visually stronger
* No new dependencies were added unless absolutely necessary and explicitly justified
* Site remains customer-focused, not over-animated
