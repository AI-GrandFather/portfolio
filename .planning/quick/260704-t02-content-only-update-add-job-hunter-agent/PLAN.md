# Quick Task Plan

Status: Complete
Last updated: 2026-07-04

## Task

Content-only update: add Job Hunter Agent as a shipped product, mark Lingua Loop as live, update Agentic AI cards, and refresh chatbot grounding.

## Scope

- Update portfolio source-of-truth content in `app/lib/content.ts`.
- Keep the shipped products card styling identical by using the existing `WorkProject` shape.
- Keep mobile navigation unchanged at six items.
- Update `app/api/chat/route.ts` grounding for Lingua Loop and Job Hunter Agent.
- Adjust grid CSS only where needed for four shipped cards.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Browser checks for desktop, mobile, links, page copy, and chatbot answers.
