# Project Notes

## Purpose

This portfolio represents Mian Muhammad Athar as a client-facing product builder who can turn rough ideas into shipped apps, games, AI tools, dashboards, POS systems, and internal software.

Primary audience: clients who need someone to plan, build, verify, and launch a product.

Primary conversion path: visitor reviews work, asks the chat board what can be built, then submits the contact form.

## Current Product Shape

- Next.js app in the App Router.
- Editorial, high-contrast portfolio UI.
- Real server-side chat endpoint using the OpenAI Responses API.
- Server-side contact endpoint using Resend.
- No database in v1.
- No client-side API keys.

## Portfolio Evidence

The content was based on local project evidence from `/Users/atharmushtaq/projects`:

- Block Crush Game / BlockPuzzlePro: originally shipped as a native iOS block puzzle game using SwiftUI and SpriteKit, then fully rebuilt with Flutter, Dart, and Flame. It is now published on both iOS and Android with a shared codebase, multiple modes, monetization, platform game services, and high-refresh performance work.
- FurrFind: Flutter iOS and Android AI pet breed identification app with scan history, free scan limits, subscriptions, and premium AI care chat.
- Soleris Ledger: budget, inventory, profit, ROAS, currency conversion, and AI-assisted business dashboard.
- AuraPOS: live Next.js and Supabase POS system with entry management, inventory, SaaS-oriented architecture, and operational tooling.
- Handtracking: complete real-time MediaPipe hand-tracking experiment with gestures, physics, and canvas rendering.
- Keyboard Lock: unpublished desktop utility prototype.
- Jungle Rush and Rally Crush: broader game production pipeline projects.

Do not claim unpublished projects are launched. AuraPOS is verified live; Handtracking is complete experimental proof, not a commercial launch. Other unverified projects can be described as prototypes, internal tools, experiments, or pipeline projects.

For a fuller handoff inventory, see `PRODUCT_INVENTORY.md`.

## Design Direction

The visual direction is an editorial product-lab style:

- Large first-viewport identity for "Mian Muhammad Athar".
- Dense project evidence instead of a generic agency landing page.
- Sharp borders, print-like rhythm, cream paper grid, dark proof panels, rust and brass accents.
- No decorative gradient orbs, generic purple SaaS gradients, or stock-looking hero imagery.
- Mobile layout must keep text readable without overlap.

## Chat Assistant Scope

The chat board is a lead assistant, not a general chatbot.

It should:

- Explain what Mian can build.
- Turn rough product ideas into concise plans.
- Mention relevant portfolio evidence.
- Encourage concrete leads to use the contact form.

It should not:

- Ask for secrets.
- Claim guaranteed pricing, delivery dates, or outcomes.
- Expose local file paths, private repo details, or sensitive project information.
- Act as an unrestricted general-purpose chatbot.

## Contact Form Scope

The contact form sends email only in v1. It collects:

- Name
- Email
- Project type
- Budget range
- Project brief

There is no lead database yet. Add storage only after deciding privacy, retention, admin access, and abuse controls.
