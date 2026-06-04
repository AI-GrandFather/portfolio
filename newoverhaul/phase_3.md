# PHASE 3 — Project Card Redesign + Customer Proof

# Context

Execute Phase 3. The project section should become the strongest proof section of the portfolio.

The goal is to make the work feel real, shipped, trustworthy, and easy for customers to understand within a few seconds.

Do not invent project claims.
Do not exaggerate metrics.
Do not hide important information behind hover.
Do not install new dependencies.

# Target Files

* app/page.tsx
* app/globals.css
* any project/card component if present

# Tasks

1. Redesign Project Cards
   Each project card should clearly show:

* Status pill, such as Live, Shipped, In Progress, Prototype, or Case Study
* Platform/type pill, such as iOS, Flutter, SaaS, AI Workflow, Web App
* Project title
* Short customer-focused outcome
* Short description
* Tech stack tags
* Primary link if available
* Secondary link if already present

2. Visual Depth
   Apply restrained tactile depth:

* Elevated dark surface
* Soft semi-transparent border
* Multi-layer shadow
* Slight inner highlight if appropriate
* Clean spacing

Avoid:

* Loud gradients
* Excessive glow
* Heavy glass effect everywhere
* Hover-only content

3. Project Card Content Layout
   Make cards scannable:

* Title and status near top
* Description readable
* Stack tags grouped neatly
* Links easy to find
* Consistent spacing across all cards

4. Customer Trust
   If there are sections like “Document Stack,” “Pre-Deployment Safety,” or “Delivery Lifecycle,” keep them useful but ensure they do not overpower the shipped-project section.

Preferred homepage order:

1. Hero
2. Work / shipped projects
3. How I build
4. Delivery lifecycle
5. Safety checklist
6. Stack
7. Contact

Only reorder sections if the current structure makes the proof section too weak.

5. Responsive Behavior
   Ensure cards look strong on:

* Mobile single-column
* Tablet
* Desktop grid

No horizontal scrolling.
No cramped tags.
No overflowing buttons.

6. Build Check
   Run:

* npm run build

Fix any errors caused by your changes.

# Validation Gate

Before completion, verify and report:

* Project cards clearly communicate proof and value
* All project information is visible without hover
* Cards look premium but restrained
* Mobile project cards are clean and readable
* No project claims were invented
* Production build passes

