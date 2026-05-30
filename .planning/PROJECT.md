# Mian Muhammad Athar Portfolio

## What This Is

This is a client-facing portfolio for Mian Muhammad Athar: an electronics engineer, ecommerce operator, and software product builder who can take rough client ideas into planned, implemented, verified software. The portfolio should onboard clients by showing credible proof across shipped apps, AI products, business systems, games, ecommerce operations, and engineering background.

The site is not just a static CV. It should act like a conversion system: visitors understand what Mian can build, ask an AI chatbot that behaves like a concise second self, and submit qualified project leads through a secure contact path.

## Core Value

Convert serious visitors into confident client conversations by proving Mian can understand business needs, plan the right product, build it with modern AI-assisted workflows, and secure the public touchpoints.

## Requirements

### Validated

- ✓ Single-page Next.js portfolio exists with hero, work, capabilities, process, chat, and contact sections — existing
- ✓ Portfolio content already highlights published and built software projects including Block Crush Game, FurrFind, Soleris Ledger, AuraPOS, Handtracking, Keyboard Lock, Jungle Rush, and Rally Crush — existing
- ✓ Server-side AI chat endpoint exists using OpenAI through `app/api/chat/route.ts` without exposing the API key to client code — existing
- ✓ Server-side contact endpoint exists using Resend through `app/api/contact/route.ts` without exposing the email API key to client code — existing
- ✓ Basic per-process rate limiting and input length validation exist for both public endpoints — existing
- ✓ Product inventory and copy-safety rules exist in `PRODUCT_INVENTORY.md`, including publication boundaries for launched versus unverified projects — existing
- ✓ Codebase map exists in `.planning/codebase/` and documents current stack, architecture, testing gaps, conventions, integrations, and security concerns — existing

### Active

- [ ] Reposition the homepage for client onboarding, leading with product-building capability while using electronics engineering, ecommerce operations, and service experience as credibility proof
- [ ] Add a proof-backed bio narrative from the CV and experience letters without exposing private identifiers beyond intentionally public contact details
- [ ] Explain Mian's AI-enabled delivery capability, including practical use of Codex, Claude Code, Gemini, Antigravity-style environments, MCPs, agents, skills, plugins, and structured AI workflows
- [ ] Upgrade the chatbot into a stronger "second self" that can answer portfolio, capability, process, project-fit, and AI-workflow questions while staying bounded and secure
- [ ] Improve the UI/UX structure using the `ui-ux-pro-max` design guidance: stronger conversion hierarchy, proof sections, case-study cards, accessible forms, and responsive polish
- [ ] Harden public endpoints so chat/contact are safer for production: stricter server-side validation, safer public error messages, bot friction where feasible without new dependencies, better rate-limit hygiene, and budget-abuse guardrails
- [ ] Add focused verification coverage for public API validation and client conversion flows before claiming security improvements are complete

### Out of Scope

- Full CRM or lead database — defer until privacy, retention, admin access, deletion, and abuse policies are defined
- Claims that every project is publicly launched — only Block Crush Game is safe to describe as published unless more evidence is verified
- Client-side secrets, private file paths, private repo details, or sensitive CV/letter contents in the public bundle — security and privacy boundary
- Paid bot-protection, hosted Redis/KV, analytics, crash reporting, or monitoring SDK changes without explicit dependency and privacy approval
- Broad redesign that discards the existing product-lab identity — improve conversion and trust while respecting the current editorial direction

## Context

Mian's background combines electronics engineering, ecommerce operations, account-service experience, and software development. The attached CV states a Bachelor of Science in Electronic Engineering from Ghulam Ishaq Khan Institute, a final-year wall-climbing robot project, five distinctions mentioned by the user, embedded systems experience, circuit/PCB exposure, Python programming, ecommerce operations, supplier negotiation, inventory management, customer service, and Amazon/Shopify selling.

Business proof includes OP Sellers LTD and US ecommerce entities, with the CV and letter text indicating online retail operations, distributor/brand sourcing, Shopify/Amazon sales, financial oversight, marketing, team leadership, and a reported $130K revenue period with 100% positive customer feedback. The user also described service-industry work around reviewing and resolving suspended Amazon accounts.

Engineering proof includes internships and experience letters from U-blox and Fauji Fresh n Freeze. PDF text extraction was partial for scanned letters, so those documents should be treated as source evidence to inspect manually before quoting exact claims. The portfolio can safely say the documents support internship/experience history, but exact duties should be copied only after reliable extraction or manual review.

Current software proof comes from the portfolio inventory:

- Block Crush Game: published iOS game using SwiftUI and SpriteKit.
- FurrFind: Flutter AI pet breed identification app with scan limits, local history, subscriptions, and premium AI care chat.
- Soleris Ledger: business dashboard for budgets, inventory, profit, ROAS, currency conversion, and AI-assisted operations.
- AuraPOS: Next.js and Supabase POS/SaaS system with inventory and operational workflows.
- Handtracking: MediaPipe/canvas real-time hand tracking with gesture interaction and physics.
- Keyboard Lock: unpublished utility prototype.
- Jungle Rush and Rally Crush: game pipeline projects.

The improved site should make AI capability explicit and concrete. Mian can present modern AI-assisted delivery as a practical workflow: using coding agents for implementation, research agents for planning, MCPs to connect tools and context, reusable skills/plugins for repeatable workflows, and multi-model reasoning across Codex, Claude Code, Gemini, and Antigravity-style development environments. The copy should avoid unsupported claims like guaranteed speed, guaranteed cost, or private access to client systems.

Security is part of the product story. The existing code keeps API keys server-side, but `.planning/codebase/CONCERNS.md` identifies production risks: per-process rate limits, spoofable proxy-header trust, no durable budget guardrails, limited bot friction, public configuration error messages, and missing endpoint tests. These must be planned before the chatbot is positioned as a serious lead assistant.

The `ui-ux-pro-max` skill recommends a portfolio-grid foundation, client conversion CTAs, social proof, accessibility basics, form validation quality, keyboard navigation, mobile overflow prevention, visible focus states, and motion that respects reduced-motion preferences. The design should adapt these recommendations to the existing editorial product-lab style rather than becoming a generic agency landing page.

## Constraints

- **Security**: Do not expose OpenAI, Resend, payment, signing, private project, or document secrets in client code or generated public copy — public portfolio is attacker-facing.
- **Privacy**: Use CV and letters for positioning, but avoid publishing addresses, phone numbers, private file paths, or sensitive document details unless the user explicitly approves exact public content.
- **Copy accuracy**: Follow `PRODUCT_INVENTORY.md`; do not claim public launch for projects whose publication status is not verified.
- **Dependency changes**: Do not add CAPTCHA, analytics, Redis/KV, monitoring, validation libraries, or UI packages without approval.
- **Current stack**: Existing app is Next.js App Router, React, TypeScript, global CSS, OpenAI server route, and Resend server route.
- **Verification**: Security and frontend claims require lint, typecheck, build, endpoint validation tests or manual route checks, and browser screenshots for desktop/mobile.
- **Design**: Preserve a professional client-facing product-lab feel; avoid generic stock/agency visuals, emoji icons, inaccessible motion, and mobile text overlap.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Client onboarding is the primary audience | User said the portfolio should onboard clients | — Pending |
| Lead with product-builder positioning | Best fit for clients while still supporting engineer-founder credibility | — Pending |
| Chatbot should act as a bounded second self | User wants the AI chatbot to answer questions on Mian's behalf | — Pending |
| Make AI-assisted delivery a visible capability | User explicitly wants Codex, Claude Code, Gemini, Antigravity, MCPs, agents, skills, and plugins represented | — Pending |
| Treat security as core scope, not polish | User explicitly asked to make sure the project is secure | — Pending |
| Use `ui-ux-pro-max` for UI/UX planning | User provided the project-local skill path | — Pending |
| Avoid new dependencies in the first hardening pass unless approved | Global rules require approval for dependency changes | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-30 after initialization*
