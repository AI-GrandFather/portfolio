# PORTFOLIO_COPY.md
# Complete Copy Reference — Mian Muhammad Athar Portfolio
# All new and updated section content. This file is the source of truth for
# every Phase prompt. Do not edit section text mid-execution — update here
# first, then re-run the relevant phase.

---

## SECTION A — UPDATED: Delivery Lifecycle

> Section header stays: "The 0 to 1 Path."
> Subheading stays: existing text.
> Change: add a Deliverable line (italic) under the body copy of each card.

### 01 — Discovery
**Existing body (do not change):**
I map your business goal, user, and core constraint before touching a line of code. A product that solves the wrong problem is worse than no product.

**Add below body:**
_Deliverable: Problem Definition Document, user stories, and success criteria._

---

### 02 — Blueprint
**Existing body (do not change):**
Full technical architecture: data schemas, API boundaries, AI orchestration, and phased delivery plan. No ambiguity before build begins.

**Add below body:**
_Deliverables: PRD (Product Requirements Document), TRD (Technical Requirements Document), Architecture Document, Data Schema, and a Phase Plan with acceptance criteria per phase._

---

### 03 — Build
**Existing body (do not change):**
Agentic development against precise task documents. Each module is functional before the next begins, with no half-built features sitting in branches.

**Add below body:**
_Deliverables: CLAUDE.md agent governance file, per-phase task files, and COMMITS.md — a full timestamped audit trail of every change made._

---

### 04 — Harden
**Existing body (do not change):**
Edge case coverage, performance review, and a security pass before client review. What you see should already work.

**Add below body:**
_Deliverables: Pre-deployment checklist sign-off, App Store compliance review (mobile), security audit notes, and performance profiling results._

---

### 05 — Launch
**Existing body (do not change):**
Deployment, documentation, and a clean handoff. You own what was built, and the next phase has a clear path.

**Add below body:**
_Deliverables: Deployment guide, full source code with commit history, handoff documentation, and a next-phase roadmap._

---

## SECTION B — NEW: The Document Stack

> New section. Insert between the "How I Build" section and the "Delivery Lifecycle" section.
> Section ID: `#document-stack`
> Follow the same visual structure as "How I Build" (numbered cards).

**Section label (small caps / eyebrow):** Document Stack

**Section header (h2):** Every project starts on paper.

**Section subheading:** The build is just the execution.

**Section intro paragraph:**
Before an agent writes a single line of code, the full specification exists as structured documents. These are not formalities — they are the system. They prevent scope creep, make handoffs clean, and give AI agents something precise to execute against instead of vague instructions.

---

### Card 01 — PRD
**Title:** PRD — Product Requirements Document

**Body:**
Defines what is being built and why. User goals, feature scope, acceptance criteria, and an explicit list of what is out of scope. This is the contract that prevents requirements from expanding mid-build.

---

### Card 02 — TRD
**Title:** TRD — Technical Requirements Document

**Body:**
Stack decisions, API boundaries, third-party integrations, data schemas, and every constraint that governs how the system is built. Written before build starts, referenced throughout.

---

### Card 03 — Architecture Document
**Title:** Architecture Document

**Body:**
System diagrams, module boundaries, state management model, and the rationale behind structural choices. Written and agreed before the first task is assigned — not reconstructed from memory after the fact.

---

### Card 04 — Phase Plans
**Title:** Phase Plans

**Body:**
Delivery split into reviewable units. Each phase has a defined scope, acceptance criteria, and a completion gate before the next phase begins. Nothing ships half-built, and nothing starts until the previous phase passes review.

---

### Card 05 — CLAUDE.md
**Title:** CLAUDE.md — Agent Governance File

**Body:**
Every AI coding agent in the project operates under a written rule file: what it can modify, what it must leave untouched, how it must commit, and what checks must pass before any change is logged. This is how agentic development stays disciplined instead of unpredictable.

---

## SECTION C — NEW: Pre-Deployment Safety

> New section. Insert after "Document Stack", before the "Stack / Tools" section.
> Section ID: `#safety`
> Render the 9 checklist items as expandable accordion cards (title always visible, body on expand).
> Add this section to the top navigation alongside Work, How I Build, and Contact.

**Section label (eyebrow):** Pre-Deployment Safety

**Section header (h2):** Nothing ships without a signed-off checklist.

**Section subheading:** No exceptions. No deadline pressure.

**Section intro paragraph:**
Shipping to production is the moment a small oversight becomes a public incident. Every product I build — mobile app, web app, or SaaS — goes through a structured safety review before launch. Below is what that review covers and why each item exists.

---

### Item 01 — Authorization
**Title:** Authorization — Users locked to their own data

**Body:**
Authentication proves who you are. Authorization decides what you're allowed to touch. Every protected endpoint is verified to check that the requesting user actually owns the resource they're asking for — not just that they're logged in. The most common and most damaging class of bug in production web products is IDOR (Insecure Direct Object Reference): an endpoint that returns data without checking ownership. This is explicitly closed on every route before deploy.

---

### Item 02 — Password Reset
**Title:** Password reset links expire

**Body:**
Reset tokens are short-lived and single-use. They expire within minutes of issue and are invalidated immediately on use or when a new reset is requested. Reset links land in email inboxes that can be forwarded, cached on shared devices, or exposed in breaches. A non-expiring token is a permanent backdoor. A short TTL shrinks the attack window to minutes.

---

### Item 03 — Input Validation
**Title:** Input validation — SQL injection and XSS

**Body:**
Every value arriving from the client is treated as hostile until proven otherwise. Parameterized queries ensure user input cannot alter the shape of a SQL statement. Output escaping ensures injected scripts cannot execute in another user's browser. Both attack classes have appeared in the OWASP Top 10 for over a decade because teams keep leaving one field unvalidated.

---

### Item 04 — CORS
**Title:** CORS — API locked to your own domain

**Body:**
In production, the API only accepts requests from your own domains. Not *, not localhost, not a development configuration left in by accident. A misconfigured CORS policy allows malicious sites to make authenticated API calls from a victim's browser, leaking data or triggering account actions on their behalf.

---

### Item 05 — Rate Limiting
**Title:** Rate limiting on every sensitive endpoint

**Body:**
Login, password reset, signup, search, and anything that hits the database hard or sends email or SMS have request caps per client. Without rate limiting, a single client can brute-force credentials, exhaust the database connection pool, or run up a cloud bill overnight. This is one of the cheapest controls to add and one of the most expensive to omit.

---

### Item 06 — Error Handling
**Title:** Error handling — no internals exposed to the browser

**Body:**
Every failure state returns a clean, structured response. Internal exceptions, stack traces, framework debug pages, and database error messages never reach the client in production. Default debug screens leak file paths, library versions, and sometimes secrets — information an attacker uses to fingerprint the stack and craft targeted exploits.

---

### Item 07 — Database Performance
**Title:** Database performance — targeted indexes on hot queries

**Body:**
Queries that run constantly are covered by indexes before launch. A query that runs in 5ms on development data can take 30 seconds on production volume without one. That single slow query can exhaust the connection pool and take the entire app down under real traffic. Indexes are added where data shows they're needed — not blindly on every column, which slows writes unnecessarily.

---

### Item 08 — Logging and Monitoring
**Title:** Logging and monitoring — alerts before users notice

**Body:**
Structured logs capture requests, errors, and key business events. Automated alerts fire on error rate spikes, latency jumps, and uptime failures. The goal is simple: know about a problem before a user screenshots it. Without logs, production incidents are debugged blind. Without alerts, outages are discovered on social media.

---

### Item 09 — Rollback Strategy
**Title:** Rollback strategy — every deploy has a tested exit

**Body:**
Production deployments are structured so a bad release can be reversed without a rebuild. Staging validation happens before the production switch. If something breaks in ways testing didn't catch — config drift, an unmigrated table, a dependency behaving differently in prod — the rollback path is already confirmed, not improvised under pressure.

---

**Section closing line (below all cards):**
This checklist is completed and signed off before every production deployment. It is not compressed under deadline pressure. If a phase isn't safe to ship, it doesn't ship.

---

## SECTION D — UPDATED: How I Build — Step 02

> Find the existing "Agent Build" card (Step 02) in the "How I Build" section.
> Keep all existing content. Add the following paragraph below the existing body text.

**Add below existing body of Step 02:**

Every agent task is scoped to a single module and executed against a written spec. Agents cannot modify architecture, authentication, payments, or production configuration without an explicit, session-level instruction. Every change is committed with a conventional commit message (feat / fix / refactor / chore) and logged to COMMITS.md with a timestamp. Typecheck and production build must pass clean before any commit is recorded. The review gate is not a rubber stamp — it is the only thing that ships.

---

## SECTION E — NEW: Contact "What's Included"

> Add a new block inside the Contact section, positioned above the existing form fields.
> Render as a clean two-column or single-column list, depending on layout.

**Block header:** Every engagement includes:

**List items (8 items):**
1. Problem Definition Document
2. PRD + TRD + Architecture Document
3. Phase-by-phase delivery with review gates at each phase
4. CLAUDE.md agent governance for all AI-assisted work
5. Full COMMITS.md audit trail — every change, timestamped
6. Pre-deployment safety checklist sign-off
7. Source code ownership — no platform lock-in
8. Handoff documentation and next-phase roadmap

---

## NAVIGATION UPDATE

> The current nav links are: Work | How I Build | Contact
> Add two new links:

- **Document Stack** → `#document-stack`
- **Safety** → `#safety`

> Final nav order: Work | How I Build | Document Stack | Safety | Contact

---
_End of PORTFOLIO_COPY.md_