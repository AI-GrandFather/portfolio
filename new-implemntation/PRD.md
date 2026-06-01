# Portfolio v2.0 — Product Requirements Document

**Owner:** Mian Muhammad Athar
**Version:** 2.0
**Status:** Ready for implementation
**Agent:** Claude Code

---

## 1. Vision

A world-class solo developer portfolio that converts qualified leads through demonstrated technical evidence, honest positioning, and an AI-powered experience that itself proves the builder's capability. One of the best personal portfolio pages in the world — not by being flashy, but by being specifically, verifiably, unforgettably *him*.

---

## 2. Honest Critique of v1 (Root Cause Analysis)

Before building v2, every agent must understand why v1 fails at a strategic level.

### 2.1 Positioning Failures

| Failure | Impact |
|---|---|
| "We" language throughout a solo developer's portfolio | Dishonest. Clients feel misled when they realize it's one person. |
| "AI Agency" framing | Saturated category. Every Fiverr seller claims this in 2026. Differentiates nothing. |
| "10x traditional development speed" | Cliché with zero proof. Sophisticated clients dismiss it immediately. |
| AuraPOS labeled as App Store published | False. AuraPOS is live on web, not an App Store product. Mislabeling platform status destroys credibility. |
| "Proven Impact" section has no metrics | Impact without numbers is just adjectives. |

### 2.2 Missing Story

The portfolio completely omits:
- GIKI Electronic Engineering degree (one of Pakistan's top engineering universities, CGPA 3.18)
- Three e-commerce LLCs across the US and UK with $130K in revenue and 100% positive feedback
- The actual agentic workflow story (Claude Code + Gemini as implementation agents, Athar as architect/quality gate)
- The full product arc: engineer → operator → builder

This arc is rare and credible. No other developer in this market has an engineering degree + real P&L experience + frontier AI workflow expertise. It should be the spine of the entire portfolio.

### 2.3 Content Problems

- Chat quick prompts are generic and don't demonstrate expertise
- Chat system prompt is thin — responses lack specificity
- Contact form doesn't qualify leads meaningfully
- Project descriptions are vague ("offline-first SaaS system" — prove it)
- Zero personality — reads as if written by AI with no input

### 2.4 Design Problems

- Generic blue/white SaaS template aesthetic
- 1440px max-width feels too spread on large monitors
- No dark mode despite engineering/dev audience
- Status badges not semantically differentiated
- No product screenshots or mockups in project cards
- Font pairing (Outfit + Work Sans) is unremarkable

---

## 3. The Right Positioning

### 3.1 Who Athar Actually Is

**Phase 1 — Engineer:** GIKI Electronic Engineering. Microcontrollers, firmware, PCB design, embedded systems. Final year project: wall-climbing robot. CGPA 3.18/4.00. U-BLOX internship. Disciplined systems thinker.

**Phase 2 — Operator:** Three LLCs (Saleiac LLC / Plano TX, OP Sellers Ltd / Yorkshire UK, Aceranked LLC / El Paso TX). $130K revenue. Shopify + Amazon. Full P&L — inventory, suppliers, margins, customer relationships. 100% positive feedback at scale.

**Phase 3 — Builder:** Now ships mobile apps, games, and SaaS systems solo. Uses Claude Code and Gemini as implementation agents. Acts as architect, spec writer, reviewer, and quality gate. This is not marketing — it is a genuinely different development model.

### 3.2 The Positioning Statement

> "Solo product engineer. I turn ideas into shipped apps, games, and SaaS systems — using engineering discipline, operator instincts, and frontier AI development workflows."

### 3.3 The Differentiator

Most freelance developers can write code. Most AI tools can generate code. Athar is the rare person who combines:
- Engineering rigor (GIKI systems thinking)
- Business operator judgment (knows what actually matters in a product)
- Agentic AI fluency (not just a user — an architect of AI-assisted development)

This combination is the core value proposition and should be stated explicitly, not hidden.

### 3.4 What To Stop Claiming

- "We" (one person)
- "AI Agency" (meaningless category)
- "10x speed" (no evidence given)
- Published App Store status for FurrFind, Soleris Ledger, AuraPOS, or any other non-App-Store project

### 3.5 What To Start Claiming (With Evidence)

- Published iOS game with 120Hz performance, five game modes, StoreKit monetization
- Cross-platform Flutter app with Vision AI, subscriptions, local-first storage
- Full SaaS POS with multi-location, offline-first architecture, COGS reporting
- Agentic AI development workflow as a genuine, described capability
- Engineering + business operator background that most developers lack

---

## 4. Target Audience

### Primary: Client seeking a solo technical builder

- Small to mid-size business owners who need a product built
- Entrepreneurs with a mobile app or web product idea
- Operators who need AI integrated into existing workflows
- Budget range: $5K–$50K+ projects
- Decision criteria: Can they ship it? Have they shipped similar things? Will they understand my business?

### Secondary: Technical evaluators / collaborators

- Tech companies evaluating candidates for senior roles
- Other builders wanting to collaborate on pipeline projects

### Not targeting

- Enterprise with 6-month procurement cycles
- Pure design-only projects
- Hardware, embedded, or firmware projects (despite background)

---

## 5. Information Architecture

### 5.1 Page Sections (Exact Order)

```
1. Topnav           — Name wordmark + 3 links (Work, How I Build, Contact)
2. Hero             — Identity, dark background, photo, CTAs
3. Origin Story     — 3-card horizontal: Engineer → Operator → Builder
4. Work             — 5 projects with accurate status badges + screenshots
5. How I Build      — Agentic workflow explanation (THE differentiator section)
6. Stack            — Grouped by layer, mono font, no bloat
7. Process          — 5-step delivery lifecycle (visual, compact)
8. Contact          — Better-qualified form + section copy
9. Footer           — Minimal: name, links, year
10. Floating Chat   — Bottom-right, available on scroll
```

### 5.2 Removed From v1

- "Our Philosophy" section (agency language, replaced by "How I Build")
- "Core Proficiencies" list (replaced by grouped Stack section)
- Generic manifesto cards
- ROI intro band (replaced by Origin Story which is more specific)

### 5.3 Navigation Labels

| v1 Label | v2 Label | Reason |
|---|---|---|
| Case Studies | Work | Simpler, less agency |
| Approach | How I Build | Specific, differentiating |
| Contact | Contact | Unchanged |

---

## 6. Feature Requirements

### 6.1 Hero Section

**Required elements:**
- Dark full-viewport background (near-black, subtle grain texture via CSS)
- Eyebrow: `Solo Product Engineer` (mono font)
- H1: `From Idea to App Store.` (large, white)
- Subheading: See CONTENT_STRATEGY.md
- Two CTAs: `See the Work` (primary/amber) + `Start a Project` (outline)
- Professional photo: kept from v1, restyled container
- No animated hero backgrounds, no gradient orbs, no particles

### 6.2 Origin Story Section

Three cards in a horizontal row. Dark background. Each card:
- Icon or small number label
- Title: Engineer / Operator / Builder
- 2-3 sentence description from CONTENT_STRATEGY.md
- No links, no CTAs — this is pure narrative

### 6.3 Work / Projects Section

Five projects minimum. Each card must have:

| Field | Requirement |
|---|---|
| Status badge | Semantic color: green=App Store, yellow=In Review, gray=Built, blue=Experiment |
| Project name | Large, bold |
| 2-sentence description | Specific, no adjectives without evidence |
| Stack pills | Mono font, 10-12px, muted |
| Optional link | Only if project has a real public URL |
| Screenshot/mockup | Required — at minimum a placeholder with project color; real screenshots preferred |

**Accurate status labels (per PRODUCT_INVENTORY.md):**
- Block Crush Puzzle: `LIVE — APP STORE` (green)
- FurrFind: `IN REVIEW` (yellow)
- AuraPOS: `LIVE — WEB` (green)
- Soleris Ledger: `BUILT` (gray)
- Handtracking: `EXPERIMENT` (blue)

**Do not label any project as App Store published unless it is Block Crush Puzzle. AuraPOS may be labeled live on web.**

### 6.4 How I Build Section

This section is the v2 differentiator. It must:
- Explain the agentic workflow clearly and honestly
- Not be vague marketing — specific enough that a technical client understands
- Be visually distinct from the rest of the page
- Include a simple workflow diagram (Claude Code → spec → review → ship)

Content from CONTENT_STRATEGY.md.

### 6.5 Stack Section

Grouped by layer, not an unordered list. Groups:

```
Mobile       — Flutter/Dart, SwiftUI/SpriteKit
Web          — Next.js, React, TypeScript
Backend      — Supabase, Node.js, SQLite, Express
AI & ML      — Claude, OpenAI, Google Gemini Flash 2.0
Tooling      — Claude Code, GitHub, Vercel, Gemini CLI
Monetization — RevenueCat, StoreKit, AdMob
```

Each item: mono font pill, no icons (adds clutter without value).

### 6.6 Process Section

5 steps, horizontal on desktop, vertical on mobile:
1. Discovery
2. Blueprint
3. Build
4. Harden
5. Launch

Each step: number (amber, large), title, 2-sentence description. See CONTENT_STRATEGY.md.

### 6.7 Contact Section

**Form fields (revised):**
- Name (text, required)
- Email (email, required)
- What are you building? (textarea, required) — replaces vague "Project Brief"
- Platform (select: Mobile App / Web App / Game / AI Integration / Other)
- Timeline (select: Under 1 month / 1–3 months / 3–6 months / Flexible)
- Budget (select: Under $5K / $5–15K / $15–50K / $50K+ / Let's talk)
- How did you find me? (text, optional)

**Form copy:**
- Eyebrow: `Contact`
- H2: `Got Something to Build?`
- Subhead: `Tell me what you're working on. I'll tell you if I can help and what it would look like.`

### 6.8 Chat System (v2)

**Backend changes:**
- Switch from OpenAI to OpenAI SDK (`gpt-4o or configured OPENAI_MODEL`)
- Stream response (faster perceived UX)
- Include conversation history in each request
- Rate limit: 20 requests per IP per hour (simple in-memory)
- Graceful error state (not a 503 dump)

**System prompt:** See CONTENT_STRATEGY.md Section 7.

**Quick prompts (rewritten):**
1. `What kinds of apps have you shipped?`
2. `How do you use AI in your development workflow?`
3. `I have a mobile app idea — where do I start?`
4. `What's the difference between Flutter and SwiftUI for my project?`

**UI changes:**
- Header: "Athar's AI" not "Chat Assistant"
- Sub-header: "Ask about the work or your next build"
- Typing indicator (3 animated dots) while loading
- Auto-scroll to latest message
- Quick prompts hidden after first message sent
- Smooth open/close animation (keep from v1)

**Tone:** Direct, specific, human. Not corporate. Not a sales pitch.

---

## 7. Design Direction

### 7.1 Theme: Dark Editorial

Not a SaaS landing page. Not an agency template. A serious craftsman's portfolio — dark, typographically precise, evidence-heavy.

**Primary reference aesthetic:** Linear.app, Rauno.me, Paco Coursey — minimal, dark, high contrast, personality through craft.

### 7.2 Color System

```css
:root {
  /* Backgrounds */
  --bg:          #080808;
  --surface:     #0F0F0F;
  --surface-2:   #151515;
  --surface-3:   #1A1A1A;

  /* Borders */
  --border:      #1E1E1E;
  --border-hover:#2E2E2E;

  /* Text */
  --text-primary:   #EDEDED;
  --text-secondary: #888888;
  --text-muted:     #444444;

  /* Accent — Amber (engineering precision, warmth, not SaaS blue) */
  --accent:         #F59E0B;
  --accent-dim:     #92600A;
  --accent-subtle:  rgba(245, 158, 11, 0.08);

  /* Status colors */
  --status-live:    #10B981;  /* green */
  --status-review:  #EAB308;  /* yellow */
  --status-built:   #888888;  /* gray */
  --status-exp:     #3B82F6;  /* blue */
}
```

### 7.3 Typography

```
Heading font:  Geist Mono (Google Fonts or local) — engineering, precision
Body font:     Inter (Google Fonts)
Stack pills:   Geist Mono
Eyebrow text:  Geist Mono, uppercase, letter-spaced
```

Rationale: Geist Mono signals craft and engineering background without being tryhard. Inter is clean and readable. Abandoning Outfit/Work Sans — they're fine fonts but generic.

### 7.4 Layout

- Max content width: 1200px (tighter than current 1440px)
- Section padding: `clamp(80px, 10vw, 140px)` vertical
- Side gutter: `clamp(20px, 5vw, 80px)`
- Card radius: 6px (subtle, not rounded-xl softness)
- Mobile breakpoints: 768px (nav), 640px (grids)

### 7.5 Topnav

- Position: fixed, top
- Background: `rgba(8, 8, 8, 0.85)` + `backdrop-filter: blur(12px)`
- Bottom border: 1px solid `var(--border)`
- Wordmark: `Geist Mono`, 18px, white
- Links: `Inter`, 14px, secondary text → accent on hover
- No CTA button in nav (too salesy for this audience)

### 7.6 Hero

- Background: `var(--bg)` + CSS grain texture (SVG noise filter, 2–3% opacity)
- H1: `clamp(52px, 7vw, 96px)`, white, Geist Mono, weight 700
- Subhead: `clamp(16px, 1.5vw, 20px)`, secondary text, Inter
- Photo container: 480×560px rectangle, 6px radius, slight amber border glow on hover
- No animated gradient, no orbs, no particles

### 7.7 Cards

- Background: `var(--surface)`, border: `1px solid var(--border)`
- Hover: border transitions to `var(--border-hover)`, subtle `box-shadow` amber glow
- Status badge: `dot + text`, semantic color, `Geist Mono` 11px

### 7.8 Accessibility

- All text contrast ratios WCAG AA compliant
- Focus rings visible (amber outline)
- `prefers-reduced-motion` respected
- Alt text on all images
- Form labels properly associated

---

## 8. Technical Requirements

See ARCHITECTURE.md for full technical spec.

**Summary:**
- Next.js App Router, TypeScript strict mode
- global CSS only (no inline styles, no CSS-in-JS)
- All content in `lib/content.ts` — no strings hardcoded in JSX
- Server-side only: `OPENAI_API_KEY`, `RESEND_API_KEY`
- manual browser QA: one-line addition (`<Analytics />` in layout)
- Vercel deployment
- `npm run lint && npm run typecheck && npm run build` must pass after every phase

---

## 9. What NOT to Build in v2

| Feature | Decision | Reason |
|---|---|---|
| Lead database | DEFER | Privacy/retention policy not defined |
| Authentication | SKIP | No protected content in v2 |
| Blog/writing section | DEFER | Adds complexity without conversion value |
| Multi-page routing | SKIP | Single-page is correct for this use case |
| Light/dark toggle | SKIP | Dark mode only in v2 |
| Testimonials | DEFER | Need real testimonials before adding |
| Pricing page | SKIP | Projects are custom-scoped |

---

## 10. Implementation Phases

### Phase 1 — Foundation (Session 1)
- Current project setup: Next.js, TypeScript strict, global CSS, Geist Mono + Inter
- New `globals.css` with dark design token system
- New `lib/content.ts` with all BIO, PROJECTS, STACK, PROCESS, QUICK_PROMPTS
- New `CLAUDE.md` root with @path imports
- `COMMITS.md` initialized

### Phase 2 — Layout & Hero (Session 1–2)
- Topnav (dark, fixed, blur)
- Hero section (dark bg, grain, H1, photo, CTAs)
- Origin Story section (3-card horizontal)
- Mobile responsive for both

### Phase 3 — Work & Stack (Session 2)
- Project cards with status badges, stack pills, screenshot placeholders
- How I Build section with workflow description
- Stack section (grouped pills)

### Phase 4 — Process & Contact (Session 2–3)
- Process section (5 steps)
- Contact section with revised form
- Form validation and submit handler
- `/api/contact` route (Resend)
- Footer

### Phase 5 — Chat System v2 (Session 3)
- Switch to OpenAI SDK
- New system prompt
- Streaming response
- New quick prompts
- Typing indicator
- Rate limiting
- Updated UI

### Phase 6 — Polish & Verify (Session 3–4)
- manual browser QA
- Open Graph metadata + og:image
- Lighthouse audit
- Mobile QA
- `npm run lint && npm run typecheck && npm run build` clean pass
- Deploy to Vercel

---

## 11. Success Criteria

| Metric | Target |
|---|---|
| Contact form submissions | Primary conversion |
| Chat engagement | >1 message per 3 visitors |
| Lighthouse Performance | >90 |
| Lighthouse Accessibility | >95 |
| Console errors | Zero |
| Broken links | Zero |
| Scroll depth >70% | Goal (measure via manual browser QA) |
| Time on page >90s | Goal |

---

## 12. Content

See `CONTENT_STRATEGY.md` for all copy, system prompt, and quick prompts.

---

*This PRD is authoritative. Any agent working on this project must read it fully before writing any code. Update `COMMITS.md` after every session with format: `commit-id | timestamp PKT | phase | summary`.*
