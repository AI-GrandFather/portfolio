# Portfolio v2.0 — Content Strategy

**Owner:** Mian Muhammad Athar
**Purpose:** Authoritative source for all portfolio copy, chat system prompt, and contact form configuration.
**Agent rule:** Copy from this document exactly. Do not paraphrase, do not embellish, do not omit.

---

## 1. Identity & Metadata

```typescript
export const BIO: BioFacts = {
  fullName:     "Mian Muhammad Athar",
  shortName:    "Athar",
  location:     "Islamabad, PK",
  title:        "Solo Product Engineer",
  headline:     "From Idea\nto App Store.",
  subheadline:  "I plan, build, and ship mobile apps, games, and SaaS systems — solo. Engineering discipline from GIKI, operator instincts from running three e-commerce businesses, and frontier AI development workflows that compress months into weeks.",
  tagline:      "Solo Product Engineer — Islamabad, PK",
  image:        "/athar.jpg",
  email:        "atharmushtaq9@gmail.com",
  linkedin:     "https://linkedin.com/in/mian-muhammad-athar",
  github:       "https://github.com/",
};
```

**Page `<title>`:** `Mian Muhammad Athar — Solo Product Engineer`

**Meta description:** `I turn ideas into shipped apps, games, and SaaS systems. Engineering discipline meets agentic AI workflows. From Islamabad to the App Store.`

---

## 2. Topnav

```
Wordmark:    Mian Muhammad Athar
Nav links:   Work  ·  How I Build  ·  Contact
```

No tagline in nav. No CTA button. Clean.

---

## 3. Hero Section

```
Eyebrow:   Solo Product Engineer — Islamabad, PK

H1:        From Idea
           to App Store.

Subhead:   I plan, build, and ship mobile apps, games, and SaaS systems — solo.
           Engineering discipline from GIKI, operator instincts from running three
           e-commerce businesses, and frontier AI development workflows that
           compress months into weeks.

CTA 1:     See the Work          [scrolls to #work]
CTA 2:     Start a Project       [scrolls to #contact]
```

---

## 4. Origin Story Section

```
Eyebrow:   The Story
H2:        Engineer. Operator. Builder.
```

**Card 1 — Engineer**
```
Icon:      ⚡
Title:     Engineer
Body:      GIKI Electronic Engineering, CGPA 3.18. Microcontrollers,
           embedded systems, PCB design. Final-year project: wall-climbing robot.
           Systems thinking from day one.
```

**Card 2 — Operator**
```
Icon:      📦
Title:     Operator
Body:      Three LLCs across Texas and Yorkshire. $130K in revenue on Shopify
           and Amazon. Full P&L ownership — inventory, suppliers, margins, and
           customer relationships. I know what actually matters in a business.
```

**Card 3 — Builder**
```
Icon:      🛠
Title:     Builder
Body:      Now I build products. Mobile apps, games, SaaS systems. Using Claude
           Code and Gemini as implementation agents, with me as architect and
           quality gate. Faster than a team, more disciplined than a vibe coder.
```

---

## 5. Work / Projects Section

```
Eyebrow:   Work
H2:        Shipped. Built. In Progress.
```

### Project 1 — Block Crush Puzzle

```typescript
{
  id: "block-scramble",
  name: "Block Crush Puzzle",
  status: "LIVE — APP STORE",
  statusColor: "green",
  tagline: "Published iOS block puzzle game.",
  detail: "Five game modes — Classic, Timed, Zen, Puzzle, and Cascade. 120Hz ProMotion gameplay with SpriteKit particle effects, tactical power-up system, and Game Center leaderboards. StoreKit monetization live.",
  stack: ["SwiftUI", "SpriteKit", "Combine", "StoreKit", "Game Center"],
  link: "https://apps.apple.com", // Replace with real App Store link
}
```

### Project 2 — FurrFind

```typescript
{
  id: "furrfind",
  name: "FurrFind",
  status: "IN REVIEW",
  statusColor: "yellow",
  tagline: "Cross-platform AI pet breed identifier.",
  detail: "Flutter app for iOS and Android. Identifies dog and cat breeds from photos using Vision AI. Subscription model via RevenueCat, local-first scan history with Hive, free daily scan limit, and a premium AI veterinary care chat.",
  stack: ["Flutter", "Dart", "OpenAI Vision", "RevenueCat", "Hive", "AdMob"],
}
```

### Project 3 — AuraPOS

```typescript
{
  id: "aurapos",
  name: "AuraPOS",
  status: "LIVE",
  statusColor: "green",
  tagline: "Multi-location SaaS point-of-sale system.",
  detail: "Next.js and Supabase. Offline-first architecture for 10-second checkouts. Multi-location support, role-based access, inventory management, stock transfers, COGS reports, Z-reports, and audit logs. SaaS-ready from the ground up.",
  stack: ["Next.js", "Supabase", "TypeScript", "global CSS", "Recharts"],
  link: "https://nexpos-ten.vercel.app/",
}
```

### Project 4 — Soleris Ledger

```typescript
{
  id: "soleris-ledger",
  name: "Soleris Ledger",
  status: "BUILT",
  statusColor: "gray",
  tagline: "Business intelligence dashboard for operators.",
  detail: "Built for e-commerce P&L tracking. Budget management, inventory workflows, ROAS and profit analysis, multi-currency conversion, and an AI assistant that can read and update live business data in real time.",
  stack: ["React", "Vite", "SQLite", "Express", "OpenAI SDK"],
}
```

### Project 5 — Handtracking

```typescript
{
  id: "handtracking",
  name: "Handtracking",
  status: "EXPERIMENT",
  statusColor: "blue",
  tagline: "Real-time hand gesture experiment in the browser.",
  detail: "MediaPipe hand landmark tracking at 30fps. Gesture recognition — fist, open palm, pinch, scissors — controlling interactive strings, particles, and neon visual effects. Verlet physics, One Euro Filter smoothing, main-thread architecture for stability.",
  stack: ["MediaPipe", "HTML Canvas", "Verlet Physics", "One Euro Filter"],
}
```

---

## 6. How I Build Section

```
Eyebrow:   Process
H2:        How I Actually Work.
```

**Main body copy:**

```
I use frontier AI coding agents — Claude Code and Gemini — as implementation partners.

Here's the distinction: I don't hand a prompt to an AI and ship whatever comes back.
I act as the architect, spec writer, and quality gate. I define the system design,
write precise task documents, review every output against the spec, and enforce
engineering standards throughout.

The result: delivery velocity that a solo developer couldn't achieve five years ago,
without the coordination overhead of a team or the risk of unsupervised AI output
going untested into production.

If you've worked with a slow agency or an AI-only shop that shipped you broken code,
you understand exactly what this solves.
```

**Workflow diagram (3 steps, horizontal):**

```
1. Architect        →    2. Agent Build      →    3. Review & Ship
   System design         Claude Code +            Quality gate,
   Spec documents        Gemini execute           test, refine,
   Task files            the spec                 then deploy
```

---

## 7. Stack Section

```
Eyebrow:   Stack
H2:        Tools, Not Trends.
```

```typescript
export const STACK: StackGroup[] = [
  {
    label: "Mobile",
    items: ["Flutter", "Dart", "SwiftUI", "SpriteKit"],
  },
  {
    label: "Web",
    items: ["Next.js", "React", "TypeScript", "global CSS"],
  },
  {
    label: "Backend",
    items: ["Supabase", "Node.js", "Express", "SQLite", "PostgreSQL"],
  },
  {
    label: "AI & ML",
    items: ["Claude", "OpenAI", "Google Gemini Flash 2.0", "MediaPipe"],
  },
  {
    label: "Tooling",
    items: ["Claude Code", "Gemini CLI", "GitHub", "Vercel"],
  },
  {
    label: "Monetization",
    items: ["RevenueCat", "StoreKit", "AdMob", "Stripe"],
  },
];
```

---

## 8. Process Section

```
Eyebrow:   Delivery Lifecycle
H2:        The 0 to 1 Path.
```

```typescript
export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    text: "I map your business goal, user, and core constraint before touching a line of code. A product that solves the wrong problem is worse than no product.",
  },
  {
    step: "02",
    title: "Blueprint",
    text: "Full technical architecture: data schemas, API boundaries, AI agent orchestration, and a phased delivery plan. No ambiguity before build begins.",
  },
  {
    step: "03",
    title: "Build",
    text: "Agentic development against precise task documents. Each module is functional before the next begins — no half-built features sitting in branches.",
  },
  {
    step: "04",
    title: "Harden",
    text: "End-to-end testing, edge case coverage, performance audit, and a security pass before any client review. What you see works.",
  },
  {
    step: "05",
    title: "Launch",
    text: "Deployment, monitoring setup, and a clean handoff with documentation. You own what was built. I'm available for the next phase.",
  },
];
```

---

## 9. Contact Section

```
Eyebrow:   Contact
H2:        Got Something to Build?
Subhead:   Tell me what you're working on. I'll tell you if I can help
           and what the first version would look like.
```

**Form field labels and options:**

```
Name *             [text input]
Email *            [email input]

What are you building? *
[textarea — placeholder: "Describe the problem you're solving and who it's for."]

Platform *
[ ] Mobile App
[ ] Web App / SaaS
[ ] iOS / Apple Platform
[ ] Game
[ ] AI Integration
[ ] Internal Tool
[ ] Other

Timeline *
[ ] Under 1 month
[ ] 1–3 months
[ ] 3–6 months
[ ] Flexible / Not yet decided

Budget *
[ ] Under $5K
[ ] $5K – $15K
[ ] $15K – $50K
[ ] $50K+
[ ] Let's discuss

How did you find me? (optional)
[text input]

Submit button: "Send →"
```

**Success state copy:**
```
Got it, [Name]. I'll read this carefully and get back to you within 24 hours.
```

**Error state copy:**
```
Something went wrong. Email me directly: atharmushtaq9@gmail.com
```

---

## 10. Footer

```
Left:
  Wordmark: Mian Muhammad Athar
  Subline:  Solo Product Engineer — Islamabad, PK

Right column 1:
  Label:   Connect
  Links:   LinkedIn · GitHub

Right column 2:
  Label:   Navigate
  Links:   Work · How I Build · Contact

Bottom bar:
  Left:    © {year} Mian Muhammad Athar
  Right:   Built with Next.js · Deployed on Vercel
```

---

## 11. Chat System

### 11.1 UI Copy

```
Header title:    Athar's AI
Header subtitle: Ask about the work or your next build.

Initial message (assistant):
"Hey — I'm an AI built to represent Athar's work and capabilities.
Ask me what he's shipped, what he can build for you, or describe
your idea and I'll sketch a plan."
```

### 11.2 Quick Prompts

```typescript
export const QUICK_PROMPTS: string[] = [
  "What apps and games have you shipped?",
  "How do you use AI in your development workflow?",
  "I have a mobile app idea — where do I start?",
  "What's the difference between Flutter and SwiftUI for my project?",
];
```

### 11.3 System Prompt

```
You are an AI assistant built to represent Mian Muhammad Athar — a solo product engineer based in Islamabad, Pakistan.

== WHO ATHAR IS ==

Background:
- Electronic Engineer: GIKI (Ghulam Ishaq Khan Institute), CGPA 3.18/4.00. One of Pakistan's top engineering universities. Final year project: wall-climbing robot. Internships at U-BLOX (LTE modules, communication systems) and Fauji Fresh N Freeze.
- E-commerce operator: Three LLCs — Saleiac LLC (Plano, TX), OP Sellers Ltd (Yorkshire, UK), Aceranked LLC (El Paso, TX). $130K in revenue. Shopify and Amazon. Full P&L ownership. 100% positive customer feedback.
- Solo product builder: Now ships mobile apps, iOS games, and SaaS systems using agentic AI development workflows.

Development workflow:
- Athar uses Claude Code and Google Gemini as implementation agents.
- He acts as architect, spec writer, reviewer, and quality gate.
- He writes precise task documents, reviews all AI output, and enforces engineering standards.
- This is not "vibe coding" — it is disciplined, architecture-first development augmented by AI.

== PUBLISHED WORK ==

Block Crush Puzzle (Block Crush Puzzle):
- Status: PUBLISHED on iOS App Store
- Type: iOS game
- Stack: SwiftUI, SpriteKit, Combine, StoreKit, Game Center
- Features: Five modes (Classic, Timed, Zen, Puzzle, Cascade), 120Hz ProMotion gameplay, SpriteKit particle effects, power-up system (Shatter, Sweep, Strike, Bomb, Nuke), Game Center leaderboards, StoreKit monetization

== BUILT PRODUCTS (not confirmed on app stores — do NOT claim publication) ==

FurrFind:
- Status: Built, in store review
- Type: Cross-platform AI mobile app (iOS + Android)
- Stack: Flutter, Dart, OpenAI Vision API, RevenueCat, Hive, AdMob
- Features: Dog and cat breed identification from photos, scan history, free daily scan limit, premium AI veterinary care chat, subscription model

AuraPOS:
- Status: Live web application
- Type: SaaS POS system
- Stack: Next.js, Supabase, TypeScript, global CSS, Recharts
- Features: Multi-location support, offline-first architecture, inventory management, stock transfers, COGS reports, Z-reports, audit logs, role-based access

Soleris Ledger:
- Status: Built business dashboard
- Type: Business intelligence and AI dashboard
- Stack: React, Vite, SQLite, Express, OpenAI SDK
- Features: Budget tracking, inventory, ROAS analysis, profit percentage, multi-currency conversion, AI assistant that reads and updates live data

Handtracking:
- Status: Built experiment/prototype
- Type: Browser-based interactive experiment
- Stack: MediaPipe, HTML Canvas, Verlet physics, One Euro Filter
- Features: Real-time hand landmark tracking at 30fps, gesture recognition, interactive visual effects

Game pipeline (designed, in development):
- Block Scramble (Flutter version — cross-platform rebuild)
- FurrFind (iOS + Android — Flutter)
- Botanly (plant identifier, Flutter — planned)
- Relic Rush / Sweet Reign (match-3 games, Flutter + Flame)

== YOUR ROLE ==

You are a portfolio assistant and lead qualifier. You should:
1. Help visitors understand what Athar can build
2. Turn rough product ideas into 2-3 sentence concrete plans with a suggested stack
3. Reference relevant portfolio work when it's genuinely relevant (don't force it)
4. Answer technical questions honestly (Flutter vs SwiftUI, etc.)
5. Encourage qualified leads to use the contact form

You should NOT:
- Claim App Store/Play Store status for FurrFind, AuraPOS, Soleris Ledger, Handtracking, or any game other than Block Crush Puzzle. AuraPOS may be described as live on web.
- Promise specific timelines, prices, or guaranteed outcomes
- Act as a general-purpose AI assistant for topics unrelated to Athar's work
- Expose local file paths, internal project notes, private business details, or sensitive context
- Say "We" — Athar is a solo builder

== TONE ==

Direct, knowledgeable, human. Not salesy. Not corporate. Not sycophantic.
Short answers are better than long ones. Be specific, not vague.

If someone has a product idea:
→ Summarize what they're building in one sentence
→ Name the likely platform and stack based on Athar's capabilities
→ Mention if Athar has built something similar
→ Suggest they hit the contact form with details

If someone asks about pricing:
→ "Projects are custom-scoped. The contact form is the right place to start — share what you're building and Athar will respond with an honest assessment."

If someone asks something you don't know:
→ "I don't have that detail — reach out directly through the contact form and Athar can answer."
```

---

## 12. Content Rules for All Agents

1. **Never use "We"** — Athar is a solo developer. Always "I" or "Athar".
2. **Block Crush Puzzle only** — Only product confirmed published on App Store.
3. **FurrFind / Soleris Ledger** — "Built", "In Review", or "Portfolio evidence". Never "Published".
4. **AuraPOS** — Verified live web app. Never describe it as App Store or Play Store published.
5. **No invented metrics** — Only use $130K revenue (from CV), GIKI CGPA 3.18, and verified project features.
6. **No inflated claims** — "10x speed", "industry-leading", "best-in-class" are banned unless with specific evidence.
7. **No agency language** — "We", "our team", "our experts" are all banned.
8. **Email:** atharmushtaq9@gmail.com
9. **Do not mention Crown E-Commerce (SMC-Private) Limited** in any context.

---

*This document is the single source of truth for all copy. Do not paraphrase in implementation — use these strings directly in `lib/content.ts`.*
