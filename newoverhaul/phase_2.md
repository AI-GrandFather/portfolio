# PHASE 2 — Color System + Typography + Premium Foundation

# Context

Execute Phase 2. Now that the mobile structure is stable, apply the premium dark product-lab visual foundation.

The target style:
Deep Onyx + Ember Copper + Soft White + Muted Zinc.
Premium, technical, calm, modern, and customer-focused.

Do not add heavy decorative effects.
Do not install new dependencies.
Do not introduce animation yet except normal transitions already needed for states.

# Target Files

* app/globals.css
* app/page.tsx only if class names or section wrappers need small adjustments

# Tasks

1. Create/Refine Design Tokens
   Implement or refine CSS variables for:

* Background
* Surface
* Elevated surface
* Border
* Text
* Muted text
* Accent
* Accent hover
* Focus ring
* Success/live status if needed

Use this direction:
--bg: #09090B;
--surface: #111116;
--surface-soft: #17171D;
--border: rgba(255,255,255,0.08);
--text: #F4F4F5;
--muted: #A1A1AA;
--accent: #E67300;
--accent-hover: #FF8A1F;

2. Apply Premium Dark Foundation
   Replace any flat black or harsh gray with layered dark tones.
   Use the accent color selectively for:

* Primary CTA
* Active states
* Focus states
* Important badges
* Small visual highlights

Do not overuse orange/copper.

3. Typography Hierarchy
   Improve hierarchy for:

* Hero headline
* Hero paragraph
* Section labels
* Section headings
* Project card titles
* Body text
* Muted text

The page should feel cleaner, more editorial, and easier to scan.

4. Hero Visual Polish
   Add a restrained premium background treatment:

* subtle radial glow
* optional very subtle grid/noise feel
* no flashy particles
* no heavy moving backgrounds
* no cheap neon effect

5. Contrast and Accessibility
   Check important text/background pairs:

* Body text
* Muted text
* Buttons
* Links
* Tags/badges
* Form labels

Target strong contrast.
Do not sacrifice readability for aesthetics.

6. Build Check
   Run:

* npm run build

Fix any errors caused by your changes.

# Validation Gate

Before completion, verify and report:

* Color system is tokenized
* Site no longer feels flat black
* Accent color is used selectively
* Text hierarchy is clearer
* Mobile readability remains strong
* Production build passes
