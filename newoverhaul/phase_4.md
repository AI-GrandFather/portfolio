# PHASE 4 — Native CSS Motion + Micro-Interactions

# Context

Execute Phase 4. Add subtle native CSS motion that feels modern and premium.

Motion should support usability.
Motion should not distract.
Motion should not slow the site.
Do not install Framer Motion, GSAP, Lottie, or any external animation library.

# Target Files

* app/globals.css
* app/page.tsx only if small class names/data attributes are needed

# Tasks

1. Transition System
   Create a consistent motion system using:
   cubic-bezier(0.25, 1, 0.5, 1)

Use short, consistent durations.
Replace generic ease transitions where appropriate.

2. Button Interactions
   For buttons and important links:

* Hover: slight visual brightening or elevation
* Active/tap: subtle scale down, around scale(0.98)
* Focus: visible accessible focus ring

Do not move surrounding layout.

3. Project Card Hover
   Desktop hover only:

* Slight lift using translateY(-4px)
* Slightly stronger ambient shadow
* No content shift
* No hidden content requirement

Disable hover lift on touch/mobile devices.

4. Section Reveal
   Add subtle section reveal animation as progressive enhancement:

* Fade in
* Small translateY
* Use @supports for animation-timeline/view timeline if used
* Provide fallback where all content remains visible

Do not make content invisible in unsupported browsers.

5. Reduced Motion
   Add strong prefers-reduced-motion handling:

* Disable non-essential animations
* Disable scroll reveal
* Disable hover lift transitions if needed

6. Build Check
   Run:

* npm run build

Fix any errors caused by your changes.

# Validation Gate

Before completion, verify and report:

* No external animation libraries installed
* Animations do not cause layout shift
* No horizontal scrollbars caused by hover/motion
* Motion is disabled or minimized under prefers-reduced-motion
* Content remains visible without animation support
* Production build passes

