# PHASE 1 — Mobile/Header/Layout Stability

# Context

Execute Phase 1 of the portfolio redesign. The priority is fixing mobile usability and layout stability before visual polish.

Do not redesign the whole site in this phase.
Do not add animation libraries.
Do not change project claims, personal details, or portfolio content unless needed for layout structure.

# Target Files

* app/globals.css
* app/page.tsx
* any header/nav component if the project uses one

# Tasks

1. Mobile Header Rescue
   Audit and fix the header at:

* 375x812
* 390x844
* 430x932
* tablet width
* desktop width

Ensure:

* Header is visible on mobile
* Header is above all background/decorative layers
* Header has correct z-index
* Header is tappable
* Top-left name/logo is vertically aligned
* Top-left name/logo works as a home link
* Mobile nav/hamburger is visible if the design needs one
* Mobile nav/hamburger is not blocked by overlays
* No duplicate navigation is created

If the hamburger exists but is hidden, fix its responsive visibility and pointer events.
If the hamburger is structurally missing, add the minimum semantic button/menu structure needed.

2. Remove Horizontal Overflow
   Find and fix any element causing mobile horizontal scrolling.

Use correct fixes:

* max-width
* min-width: 0
* overflow-wrap
* responsive padding
* safe grid/flex behavior

Do not hide overflow globally as a lazy fix unless the actual source of overflow is also fixed.

3. Mobile Spacing
   Improve mobile spacing for:

* Hero section
* Hero paragraph
* CTA buttons
* Project cards
* Contact section

Keep spacing premium and readable.
Do not make the page feel empty.

4. Header Accessibility
   Ensure:

* Navigation links are keyboard accessible
* Buttons have accessible labels where needed
* Focus states are visible
* Tap targets are comfortable on mobile

5. Build Check
   Run:

* npm run build

Fix any errors caused by your changes.

# Validation Gate

Before completion, verify and report:

* Mobile header visible and tappable at 375x812
* No horizontal scrolling on mobile
* Header/nav does not sit behind background elements
* Top-left name/logo is aligned and tappable
* Keyboard focus is visible
* Production build passes

