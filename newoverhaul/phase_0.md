# PHASE 0 — Visual Audit + Design System Proposal

# Context

You are auditing and improving a personal portfolio website for a solo product engineer who builds mobile apps, SaaS systems, AI-assisted workflows, and production-ready digital products.

The target style is:
Premium dark product-lab portfolio.
Dark, warm, technical, precise, cinematic but restrained.
The site must attract customers, not just look flashy.

Do not modify files in this phase unless a small non-invasive inspection script is needed. This phase is for audit and proposal only.

# Target Files to Inspect

* app/page.tsx
* app/globals.css
* package.json
* any component files used by the homepage
* current layout/header/project/contact-related files if present

# Tasks

1. Current Design Audit
   Inspect the current portfolio and identify:

* Mobile layout problems
* Header/navigation problems
* Weak color usage
* Spacing issues
* Typography hierarchy issues
* Sections that feel too text-heavy
* Sections that should be visually stronger
* Any horizontal overflow risk
* Any animation or transition that feels weak, inconsistent, or unnecessary

2. Customer Conversion Audit
   Evaluate whether the homepage quickly answers:

* Who is this person?
* What can they build?
* What proof do they show?
* How can a customer contact them?
* Why should a customer trust them?

3. Project Section Audit
   Check whether project cards clearly show:

* Project name
* Project status
* Platform/type
* Outcome or value
* Tech stack
* Live/demo/app link where available

4. Design System Proposal
   Propose a design system using this direction:

Colors:

* Deep Onyx background
* Ember/Copper accent
* Soft white text
* Muted zinc secondary text
* Subtle elevated surfaces
* Soft borders

Recommended token direction:
--bg: #09090B;
--surface: #111116;
--surface-soft: #17171D;
--border: rgba(255,255,255,0.08);
--text: #F4F4F5;
--muted: #A1A1AA;
--accent: #E67300;
--accent-hover: #FF8A1F;

5. Motion Proposal
   Recommend subtle native CSS motion only:

* Button press/hover feedback
* Project card hover lift on desktop only
* Section reveal animation as progressive enhancement only
* No animation library
* Respect prefers-reduced-motion

6. Output Required
   Before making any code changes, provide:

* Main problems found
* Root causes
* Recommended phase-by-phase implementation plan
* Files likely needing changes
* Risks to avoid
* Confirmation that no dependencies are required

# Validation Gate

Do not edit the site in this phase.
Only produce an audit and implementation plan.
