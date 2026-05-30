# Roadmap: Mian Muhammad Athar Portfolio

## Overview

This roadmap upgrades the existing Next.js portfolio into a client-onboarding system: first by making public claims reusable and safe, then by rebuilding the homepage conversion path, applying focused UI/UX quality gates, strengthening the bounded second-self assistant, hardening public lead endpoints, and proving readiness with verification evidence.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Claim And Content Source Of Truth** - Approved portfolio facts become typed, reusable, public-safe content for the homepage and assistant.
- [ ] **Phase 2: Homepage Client Onboarding And Proof** - Visitors can understand Mian's product-building offer, proof, process, and next step from the page.
- [ ] **Phase 3: UI/UX Conversion Quality** - The portfolio interaction layer meets the ui-ux-pro-max responsive, accessible, conversion-focused standard.
- [ ] **Phase 4: Bounded Second-Self Assistant** - The chatbot answers client-fit and AI-workflow questions from approved facts while staying within safe boundaries.
- [ ] **Phase 5: Lead Flow And Endpoint Hardening** - Contact and public API routes collect useful leads while reducing spam, leakage, drift, and budget abuse.
- [ ] **Phase 6: Verification And Release Readiness** - The improved portfolio is checked through lint, typecheck, build, route probes, accessibility review, and screenshots.

## Phase Details

### Phase 1: Claim And Content Source Of Truth
**Goal**: Homepage sections and assistant context use the same approved public facts without overclaiming or leaking private document details.
**Depends on**: Nothing (first phase)
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. Visitor-facing project claims come from typed approved content rather than duplicated freeform copy.
  2. Every featured project visibly shows a safe status label such as Published, Built, Prototype, Internal, Experiment, Pipeline, or In Progress.
  3. Bio and experience claims are public-safe summaries that omit private identifiers, local paths, and unverified scanned-letter details.
  4. AI-delivery claims clearly describe tools and workflows without promising guaranteed outcomes, pricing, timelines, or platform approvals.
  5. Assistant-safe facts can be generated from the same content source used by the homepage.
**Plans**: TBD
**UI hint**: no

### Phase 2: Homepage Client Onboarding And Proof
**Goal**: Serious visitors can quickly understand what Mian builds, why he is credible, what proof exists, and what to send next.
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07
**Success Criteria** (what must be TRUE):
  1. First viewport positions Mian as a client-facing product builder who turns rough ideas into planned, built, verified software.
  2. Visitor can choose a clear path to start a project, view proof, or ask the assistant without hunting through the page.
  3. Visitor can scan project cards for category, status, stack or proof, and the client-relevant capability demonstrated.
  4. Visitor can connect Mian's electronics, ecommerce, service/account, and software background to practical product judgment.
  5. Visitor can see what information to include before submitting a useful project inquiry.
**Plans**: TBD
**UI hint**: yes

### Phase 3: UI/UX Conversion Quality
**Goal**: The portfolio feels polished, accessible, and responsive across the primary conversion flows while preserving the editorial product-lab identity.
**Depends on**: Phase 2
**Requirements**: UIUX-01, UIUX-02, UIUX-03, UIUX-04, UIUX-05, UIUX-06
**Success Criteria** (what must be TRUE):
  1. Visitor can use the redesigned portfolio at 375px, 768px, 1024px, and 1440px without horizontal scroll, text overlap, or broken section layout.
  2. Keyboard user can navigate page links, chat controls, and contact form fields in a logical order with visible focus states.
  3. Form fields expose correct labels, input types, autocomplete values, status messages, and error relationships.
  4. Hover, focus, loading, and transition states feel responsive without shifting layout or ignoring reduced-motion preferences.
  5. The ui-ux-pro-max conversion guidance is reflected in hierarchy, proof density, CTAs, and accessible interaction quality without becoming a generic agency template.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Bounded Second-Self Assistant
**Goal**: Visitors can ask a concise assistant about Mian's portfolio, fit, process, and AI workflows while the assistant refuses unsafe or unsupported requests.
**Depends on**: Phase 1
**Requirements**: ASST-01, ASST-02, ASST-03, ASST-04, ASST-05, ASST-06, ASST-07
**Success Criteria** (what must be TRUE):
  1. Visitor can ask portfolio, capability, project-fit, process, AI-workflow, and contact-routing questions and receive concise second-self answers.
  2. Assistant answers are grounded in approved public facts and do not drift from homepage/project status claims.
  3. Assistant refuses secrets, private files, repo details, unrelated advice, guaranteed outcomes, and unsupported project claims.
  4. Visitor can start from strong prompts, reset or bound long sessions, and understand chat loading, error, and response states with screen-reader-friendly semantics.
  5. Visitor can learn how Mian uses AI tools, agents, MCPs, skills, plugins, and structured workflows to research, plan, code, verify, and ship.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Lead Flow And Endpoint Hardening
**Goal**: Public contact and AI endpoints remain server-owned, validation-first, and safer against spam, leakage, memory growth, and budget abuse without new dependencies by default.
**Depends on**: Phase 4
**Requirements**: LEAD-01, LEAD-02, LEAD-03, LEAD-04, LEAD-05, SEC-01, SEC-02, SEC-03, SEC-04, SEC-05, SEC-06, SEC-08
**Success Criteria** (what must be TRUE):
  1. Visitor can submit only necessary lead information: name, email, project type, budget range, and project brief.
  2. Invalid contact values, overlength input, malformed JSON, unsupported project types, unsupported budgets, and obvious spam patterns are rejected server-side.
  3. Public chat/contact errors stay generic for users and do not expose provider configuration, secrets, internal paths, or full upstream responses.
  4. Chat and contact abuse controls clean up or cap in-memory limiter growth, document per-process limits as fallback-only, and include no unapproved paid/shared dependency.
  5. Chat can be disabled or constrained quickly enough to protect public portfolio budget if abuse or model/provider issues appear.
**Plans**: TBD
**UI hint**: yes

### Phase 6: Verification And Release Readiness
**Goal**: The portfolio is not considered improved or hardened until behavior is verified through automated checks, route probes, chatbot probes, accessibility review, and browser screenshots.
**Depends on**: Phase 5
**Requirements**: SEC-07, VER-01, VER-02, VER-03, VER-04, VER-05, VER-06
**Success Criteria** (what must be TRUE):
  1. Maintainer can run lint, typecheck, and production build successfully after source-changing phases.
  2. Chat and contact routes are checked for invalid JSON, missing fields, overlength fields, rate limits, missing provider config, and successful validation paths.
  3. Assistant behavior is probed for overclaiming, prompt injection, secret requests, unrelated advice, and unsafe commitments.
  4. Desktop and mobile screenshots show the improved homepage without conversion-flow layout regressions.
  5. Accessibility review covers keyboard navigation, focus states, form labels, error/status semantics, reduced motion, and mobile overflow before release readiness is claimed.
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Claim And Content Source Of Truth | 0/TBD | Not started | - |
| 2. Homepage Client Onboarding And Proof | 0/TBD | Not started | - |
| 3. UI/UX Conversion Quality | 0/TBD | Not started | - |
| 4. Bounded Second-Self Assistant | 0/TBD | Not started | - |
| 5. Lead Flow And Endpoint Hardening | 0/TBD | Not started | - |
| 6. Verification And Release Readiness | 0/TBD | Not started | - |
