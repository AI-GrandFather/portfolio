# Requirements: Mian Muhammad Athar Portfolio

**Defined:** 2026-05-30
**Core Value:** Convert serious visitors into confident client conversations by proving Mian can understand business needs, plan the right product, build it with modern AI-assisted workflows, and secure the public touchpoints.

## v1 Requirements

### Content Source Of Truth

- [ ] **CONT-01**: Public portfolio claims are stored in typed content structures so homepage sections and assistant context use the same approved facts.
- [ ] **CONT-02**: Every featured project has a visible status label such as Published, Built, Prototype, Internal, Experiment, Pipeline, or In Progress.
- [ ] **CONT-03**: Project copy follows `PRODUCT_INVENTORY.md` and does not claim public launch for unverified projects.
- [ ] **CONT-04**: Bio facts from the CV and experience letters are summarized at a public-safe level without exposing private addresses, private phone numbers, local file paths, or unverified scanned-letter details.
- [ ] **CONT-05**: AI-delivery claims are explicit, accurate, and concrete, covering Codex, Claude Code, Gemini, Antigravity-style environments, MCPs, agents, skills, plugins, and structured AI workflows without promising guaranteed outcomes.

### Client Onboarding Homepage

- [ ] **HOME-01**: The hero positions Mian as a client-facing product builder who turns rough ideas into planned, built, verified software.
- [ ] **HOME-02**: The first viewport offers clear client actions: start a project, view proof, and ask the assistant.
- [ ] **HOME-03**: The homepage includes a credibility section connecting electronics engineering, ecommerce operations, Amazon/Shopify selling, service/account experience, and software development.
- [ ] **HOME-04**: The project grid shows client-relevant proof for each project, including category, status, stack/proof, and outcome or capability demonstrated.
- [ ] **HOME-05**: The capabilities section maps client problems to deliverable product types: mobile apps, AI products, dashboards, SaaS/POS, games, automation, and internal tools.
- [ ] **HOME-06**: The process section includes planning, building, UI verification, endpoint/security hardening, and launch readiness as part of the delivery story.
- [ ] **HOME-07**: The contact section tells visitors what information to send so inquiries arrive as useful project briefs.

### UI/UX Quality

- [ ] **UIUX-01**: The design follows the `ui-ux-pro-max` portfolio guidance while preserving the current editorial product-lab identity.
- [ ] **UIUX-02**: Layouts are responsive with no horizontal scroll or text overlap at 375px, 768px, 1024px, and 1440px widths.
- [ ] **UIUX-03**: Interactive elements have visible hover and focus states that do not shift layout.
- [ ] **UIUX-04**: Navigation, chat, and contact form workflows are keyboard-accessible with logical tab order and no keyboard traps.
- [ ] **UIUX-05**: Form inputs use correct labels, input types, autocomplete values, status messages, and error associations.
- [ ] **UIUX-06**: Motion and transitions respect reduced-motion preferences.

### Assistant Second Self

- [ ] **ASST-01**: The chatbot answers as a concise second self for portfolio, capabilities, project-fit, process, AI-workflow, and contact-routing questions.
- [ ] **ASST-02**: The chatbot context is generated from approved public facts rather than duplicated freeform copy that can drift from the homepage.
- [ ] **ASST-03**: The chatbot refuses secrets, private files, private repo details, unrelated general advice, guaranteed pricing/timelines/outcomes, and unsupported project claims.
- [ ] **ASST-04**: The chatbot can explain how Mian uses AI tools, agents, MCPs, skills, and plugins to research, plan, code, verify, and ship software.
- [ ] **ASST-05**: The chat UI includes strong starter prompts for client questions, project planning, portfolio proof, AI capabilities, and next-step guidance.
- [ ] **ASST-06**: The chat UI caps retained local history or provides a reset path so long sessions do not degrade the browser experience.
- [ ] **ASST-07**: Chat loading, error, and assistant response states are accessible to screen readers.

### Contact And Lead Flow

- [ ] **LEAD-01**: The contact form collects only necessary lead information: name, email, project type, budget range, and project brief.
- [ ] **LEAD-02**: Project type and budget values are validated on the server against approved allowlists, not trusted from the browser.
- [ ] **LEAD-03**: The contact email subject and body normalize user-controlled values before sending through Resend.
- [ ] **LEAD-04**: The lead flow shows clear success and failure states without exposing server configuration details.
- [ ] **LEAD-05**: The contact route includes low-friction bot/spam resistance that does not require a new dependency by default.

### Security And Abuse Controls

- [ ] **SEC-01**: OpenAI and Resend keys remain server-only and are never exposed to client components, generated public copy, screenshots, or logs.
- [ ] **SEC-02**: Public chat and contact endpoints return generic public errors for missing configuration or provider failures.
- [ ] **SEC-03**: Public endpoints enforce server-side input length limits, required fields, JSON shape checks, and allowlists where applicable.
- [ ] **SEC-04**: Public endpoint rate-limit maps clean up expired entries or cap memory growth so many unique keys cannot grow memory unbounded.
- [ ] **SEC-05**: The chat endpoint includes an emergency disable flag and budget-abuse guardrails suitable for a public portfolio lead assistant.
- [ ] **SEC-06**: The code documents that per-process rate limiting is a fallback and that production shared limiting/bot protection requires deployment-specific approval.
- [ ] **SEC-07**: The assistant prompt and route behavior are tested against overclaiming, prompt-injection, secret-request, and unrelated-advice probes.
- [ ] **SEC-08**: No new paid, analytics, monitoring, CAPTCHA, Redis/KV, validation, or UI dependency is introduced without explicit approval.

### Verification

- [ ] **VER-01**: `npm run lint` passes after each implementation phase that changes source code.
- [ ] **VER-02**: `npm run typecheck` passes after each implementation phase that changes TypeScript.
- [ ] **VER-03**: `npm run build` passes before the improved portfolio is considered ready.
- [ ] **VER-04**: Chat and contact routes are manually or automatically checked for invalid JSON, missing fields, overlength fields, rate limits, missing provider config, and successful validation paths.
- [ ] **VER-05**: The improved homepage is inspected in a browser at desktop and mobile sizes with screenshots saved when UI changes are made.
- [ ] **VER-06**: Accessibility checks cover keyboard navigation, focus states, form labels, error/status semantics, reduced motion, and mobile overflow.

## v2 Requirements

### Case Study Depth

- **CASE-01**: Visitor can open fuller case-study pages for selected projects.
- **CASE-02**: Visitor can filter work by product type, stack, publication status, or business problem.
- **CASE-03**: Portfolio includes richer proof media such as screenshots, short demos, or approved store links.

### Trust And Social Proof

- **TRST-01**: Portfolio includes testimonials only after real testimonials are approved for public use.
- **TRST-02**: Portfolio includes company/client logos only after permission and source verification.
- **TRST-03**: Experience letters are represented with manually verified excerpts if the user approves exact public wording.

### Production Infrastructure

- **PROD-01**: Public endpoints use shared durable rate limiting after deployment platform and dependency choices are approved.
- **PROD-02**: Public endpoints use CAPTCHA or Turnstile after dependency, privacy, and UX tradeoffs are approved.
- **PROD-03**: Production observability records minimal non-sensitive metadata for route health, abuse patterns, and provider failures.
- **PROD-04**: Leads are persisted only after privacy, retention, deletion, access control, and abuse policy are defined.

### Assistant Expansion

- **AIV2-01**: Assistant can use retrieval from approved public portfolio content after prompt-injection and privacy controls are defined.
- **AIV2-02**: Assistant can draft a project brief from a visitor conversation only after explicit user consent and retention policy exist.
- **AIV2-03**: Assistant can route leads into a CRM only after integration security and consent flows are approved.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full CRM or lead database in v1 | Requires privacy, retention, deletion, admin access, and abuse policy decisions |
| Paid/shared bot protection in v1 | Requires dependency, infrastructure, and privacy approval |
| Analytics, monitoring, or crash-reporting SDKs in v1 | Could affect privacy and dependencies; approval required |
| Unverified publication claims | Would damage trust and conflict with `PRODUCT_INVENTORY.md` |
| Publishing private addresses, private phone numbers, local file paths, or sensitive document data | Public portfolio must protect personal and operational privacy |
| Guaranteed pricing, timelines, client outcomes, or platform approvals | Unsupported promises create business and trust risk |
| General-purpose chatbot behavior | Chatbot is a bounded portfolio and lead assistant |
| Client-side API keys or secrets | Violates security boundary |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONT-01 | TBD | Pending |
| CONT-02 | TBD | Pending |
| CONT-03 | TBD | Pending |
| CONT-04 | TBD | Pending |
| CONT-05 | TBD | Pending |
| HOME-01 | TBD | Pending |
| HOME-02 | TBD | Pending |
| HOME-03 | TBD | Pending |
| HOME-04 | TBD | Pending |
| HOME-05 | TBD | Pending |
| HOME-06 | TBD | Pending |
| HOME-07 | TBD | Pending |
| UIUX-01 | TBD | Pending |
| UIUX-02 | TBD | Pending |
| UIUX-03 | TBD | Pending |
| UIUX-04 | TBD | Pending |
| UIUX-05 | TBD | Pending |
| UIUX-06 | TBD | Pending |
| ASST-01 | TBD | Pending |
| ASST-02 | TBD | Pending |
| ASST-03 | TBD | Pending |
| ASST-04 | TBD | Pending |
| ASST-05 | TBD | Pending |
| ASST-06 | TBD | Pending |
| ASST-07 | TBD | Pending |
| LEAD-01 | TBD | Pending |
| LEAD-02 | TBD | Pending |
| LEAD-03 | TBD | Pending |
| LEAD-04 | TBD | Pending |
| LEAD-05 | TBD | Pending |
| SEC-01 | TBD | Pending |
| SEC-02 | TBD | Pending |
| SEC-03 | TBD | Pending |
| SEC-04 | TBD | Pending |
| SEC-05 | TBD | Pending |
| SEC-06 | TBD | Pending |
| SEC-07 | TBD | Pending |
| SEC-08 | TBD | Pending |
| VER-01 | TBD | Pending |
| VER-02 | TBD | Pending |
| VER-03 | TBD | Pending |
| VER-04 | TBD | Pending |
| VER-05 | TBD | Pending |
| VER-06 | TBD | Pending |

**Coverage:**
- v1 requirements: 44 total
- Mapped to phases: 0
- Unmapped: 44

---
*Requirements defined: 2026-05-30*
*Last updated: 2026-05-30 after initial definition*
