# Portfolio v2.0 — Technical Architecture

**Owner:** Mian Muhammad Athar
**Stack:** Next.js App Router · TypeScript · global CSS · OpenAI SDK · Resend
**Deployment:** Vercel

---

## 1. Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js App Router | No Pages Router |
| Language | TypeScript (strict) | No `any`, no `ts-ignore` |
| Styling | global CSS + CSS variables | No inline styles, no CSS-in-JS |
| Fonts | Geist Mono + Inter | Via `next/font/google` |
| AI Chat | OpenAI SDK | Server-side only, `gpt-4o or configured OPENAI_MODEL` |
| Email | Resend SDK | Server-side only |
| Images | `next/image` | All images via `next/image` |
| Analytics | Not installed | Requires separate approval before adding tracking dependencies |
| Deployment | Vercel | Edge-optimized |
| Linting | ESLint + Prettier | Config from `next/eslint` |

---

## 2. File Structure

```
portfolio/
├── app/
│   ├── layout.tsx                  # Root layout: fonts, metadata, Analytics
│   ├── page.tsx                    # Main page (single-page portfolio)
│   ├── globals.css                 # Design tokens + global base styles
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts            # OpenAI chat endpoint (server-only)
│   │   └── contact/
│   │       └── route.ts            # Resend email endpoint (server-only)
│   └── ui/
│       ├── nav.tsx                 # Fixed topnav (client for scroll state)
│       ├── hero.tsx                # Hero section
│       ├── origin.tsx              # Origin Story 3-card section
│       ├── work.tsx                # Projects grid section
│       ├── how-i-build.tsx         # Agentic workflow section
│       ├── stack.tsx               # Grouped stack pills
│       ├── process.tsx             # 5-step process section
│       ├── contact-form.tsx        # Contact form (client component)
│       ├── footer.tsx              # Footer
│       └── chat-board.tsx          # Floating chat (client component)
├── lib/
│   ├── content.ts                  # All portfolio content as typed constants
│   ├── chat-config.ts              # Chat system prompt + quick prompts
│   └── rate-limit.ts               # Simple in-memory IP rate limiter
├── public/
│   ├── athar.jpg                   # Professional photo
│   └── og.jpg                      # Open Graph image (1200×630)
├── .env.local                      # Keys (never committed)
├── .env.example                    # Template with all required vars
├── CLAUDE.md                       # Root agent instructions (@path imports)
├── COMMITS.md                      # Session log
├── README.md                       # Setup and commands
├── docs/
│   ├── PRD.md                      # Product requirements
│   ├── ARCHITECTURE.md             # This document
│   ├── CONTENT_STRATEGY.md         # All copy and system prompts
│   └── PRODUCT_INVENTORY.md        # Source of truth for project status
└── eslint.config.mjs               # ESLint flat config
```

---

## 3. API Routes

### 3.1 POST /api/chat

**Purpose:** Proxy OpenAI API. No API key exposed to client.

**Request body:**
```typescript
{
  message: string;          // Current user message
  history: {
    role: "user" | "assistant";
    content: string;
  }[];                      // Previous messages (max 10 pairs)
}
```

**Implementation:**
```typescript
import OpenAI from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-config";

const client = new OpenAI();

export async function POST(req: NextRequest) {
  // 1. Rate limit check
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = rateLimit(ip, 20, 60 * 60 * 1000); // 20/hour
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
  }

  // 2. API key guard
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Chat is not available right now." }, { status: 503 });
  }

  // 3. Parse + validate body
  const { message, history = [] } = await req.json();
  if (!message || typeof message !== "string" || message.length > 2000) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  // 4. Build messages array (cap history at 10 pairs = 20 messages)
  const trimmedHistory = history.slice(-20);
  const messages = [
    ...trimmedHistory,
    { role: "user" as const, content: message },
  ];

  // 5. Call OpenAI (streaming)
  const stream = await client.messages.stream({
    model: "gpt-4o or configured OPENAI_MODEL",
    max_tokens: 1024,
    system: CHAT_SYSTEM_PROMPT,
    messages,
  });

  // 6. Return streaming response
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

**Error states (all must be handled in the UI):**
- `503` → API key not configured
- `429` → Rate limited
- `400` → Bad message
- `500` → OpenAI API error

### 3.2 POST /api/contact

**Purpose:** Send lead email via Resend. No client-side keys.

**Request body:**
```typescript
{
  name: string;
  email: string;
  building: string;     // "What are you building?"
  platform: string;     // "Mobile App" | "Web App" | "Game" | "AI Integration" | "Other"
  timeline: string;     // "Under 1 month" | "1-3 months" | etc.
  budget: string;       // "$5K-15K" | etc.
  source?: string;      // Optional: "How did you find me?"
}
```

**Validation rules (server-side):**
- `name`: string, 1–100 chars
- `email`: valid email format
- `building`: string, 10–2000 chars
- `platform`: must be one of the enum values
- `timeline`: must be one of the enum values
- `budget`: must be one of the enum values
- `source`: optional, max 200 chars

**Implementation:**
```typescript
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Contact is not configured." }, { status: 503 });
  }

  const body = await req.json();
  // ... validate fields ...

  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    subject: `New lead from ${body.name} — ${body.platform}`,
    text: formatEmailText(body),
  });

  return NextResponse.json({ success: true });
}
```

---

## 4. Content Layer

### 4.1 lib/content.ts — Type Definitions

```typescript
export type ProjectStatus =
  | "LIVE — APP STORE"
  | "IN REVIEW"
  | "BUILT"
  | "EXPERIMENT";

export type StatusColor = "green" | "yellow" | "gray" | "blue";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  statusColor: StatusColor;
  tagline: string;          // One sentence, punchy
  detail: string;           // Two sentences, specific
  stack: string[];
  link?: string;            // Only if real public URL exists
  screenshot?: string;      // Path under /public/screenshots/
}

export interface OriginCard {
  phase: string;            // "Engineer" | "Operator" | "Builder"
  icon: string;             // Emoji or single char
  description: string;      // 2–3 sentences
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface ProcessStep {
  step: string;             // "01" | "02" etc.
  title: string;
  text: string;             // 2 sentences
}

export interface BioFacts {
  fullName: string;
  shortName: string;
  location: string;
  title: string;
  headline: string;
  subheadline: string;
  image: string;
  email: string;
  linkedin: string;
  github: string;
}
```

### 4.2 No Content in JSX

All strings come from `lib/content.ts`. Page components must import from content layer. This allows a single file edit to update all copy without touching JSX.

**Enforcement:**
- ESLint custom rule or code review: flag any string literal >20 chars in JSX that isn't from an import

---

## 5. Chat Component Architecture

### 5.1 State (chat-board.tsx)

```typescript
type Message = {
  role: "user" | "assistant";
  content: string;
};

// State
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState<Message[]>([]);
const [input, setInput] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [showQuickPrompts, setShowQuickPrompts] = useState(true);
```

### 5.2 Send Flow

```
1. User submits message (button click or Enter key)
2. Append user message to messages[]
3. Hide quick prompts (showQuickPrompts = false)
4. Set isLoading = true, show typing indicator
5. POST to /api/chat with { message, history: messages }
6. Read streaming response via ReadableStream
7. Append assistant message (streaming updates in real time)
8. Set isLoading = false
9. Auto-scroll to bottom of chat log
```

### 5.3 Streaming Implementation (Client)

```typescript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: input, history: messages }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();
let assistantMessage = "";

// Append placeholder
setMessages(prev => [...prev, { role: "assistant", content: "" }]);

while (reader) {
  const { done, value } = await reader.read();
  if (done) break;
  assistantMessage += decoder.decode(value);
  // Update last message in real time
  setMessages(prev => [
    ...prev.slice(0, -1),
    { role: "assistant", content: assistantMessage },
  ]);
}
```

### 5.4 Error Handling

- Network error: show "Something went wrong. Try again." in assistant bubble
- Rate limit (429): show "You've sent a lot of messages. Try again in a bit."
- Service unavailable (503): show "Chat isn't available right now."
- Never show raw error objects or stack traces

---

## 6. Rate Limiting

Simple in-memory rate limiter (no Redis dependency for v2):

```typescript
// lib/rate-limit.ts
const ipMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  ip: string,
  limit: number,
  windowMs: number
): { success: boolean } {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now > record.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }

  if (record.count >= limit) return { success: false };

  record.count++;
  return { success: true };
}
```

**Note:** In-memory rate limiting resets on cold starts. Acceptable for v2. Upgrade to Vercel KV or Upstash Redis for v3 if needed.

---

## 7. Design Token Implementation

### 7.1 globals.css Structure

```css
/* 1. CSS custom properties (design tokens) */
:root { ... }

/* 2. Base reset */
*, *::before, *::after { box-sizing: border-box; }

/* 3. Base element styles */
html { scroll-behavior: smooth; }
body { ... }
h1, h2, h3, h4 { ... }
a { ... }

/* 4. Utility classes */
.eyebrow { ... }
.section { ... }

/* 5. Component styles */
.chat-popup { ... }
```

### 7.2 CSS Token Extension

```css
:root {
  --font-heading: var(--font-inter), sans-serif;
  --font-body: var(--font-inter), sans-serif;
  --font-mono: var(--font-geist-mono), monospace;
  --bg: #f3f0ea;
  --paper: #fffaf0;
  --ink: #11100e;
  --dark: #090908;
  --amber: #d9982f;
}
```

---

## 8. Environment Variables

```bash
# .env.example

# Chat (required for live chat)
OPENAI_API_KEY=sk-ant-...

# Contact form (required for email delivery)
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=atharmushtaq9@gmail.com
CONTACT_FROM_EMAIL=portfolio@yourdomain.com

# Optional
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Rules:**
- Never commit `.env.local`
- Never expose `OPENAI_API_KEY` or `RESEND_API_KEY` to client
- `NEXT_PUBLIC_*` prefix only for truly public values (site URL, analytics IDs)

---

## 9. CLAUDE.md (Root Agent Instructions)

This file lives at the project root and is loaded by Claude Code automatically.

```markdown
# Portfolio v2.0 — Agent Instructions

## Project
Client-facing portfolio for Mian Muhammad Athar — solo product engineer.

## Stack
Next.js App Router · TypeScript (strict) · global CSS · OpenAI SDK · Resend · Vercel

## Non-Negotiable Rules
- TypeScript strict mode. Zero `any`. Zero `ts-ignore`.
- global CSS only. No inline `style={{}}`. No separate CSS files except `globals.css`.
- All content in `lib/content.ts`. No strings >20 chars hardcoded in JSX.
- API keys are server-side ONLY. Never in client components. Never in `NEXT_PUBLIC_*`.
- Conventional commits: feat / fix / refactor / chore.
- `npm run lint && npm run typecheck && npm run build` must pass after EVERY phase.
- Revert-first on breakage. Never attempt to fix broken code without reverting first.
- Confirm before destructive file actions.
- Surgical scope: one task per session. No scope creep.

## Content Rules (Critical)
- Block Crush Puzzle is the ONLY product with confirmed App Store publication.
- FurrFind, AuraPOS, Soleris Ledger: do NOT claim App Store/Play Store publication.
- See docs/PRODUCT_INVENTORY.md for authoritative project status.
- Portfolio is for MIAN MUHAMMAD ATHAR as a solo developer. Never use "We".

## COMMITS.md Format
`commit-id | YYYY-MM-DD HH:MM PKT | Phase N | Brief summary`

## Reference Documents
@docs/PRD.md
@docs/ARCHITECTURE.md
@docs/CONTENT_STRATEGY.md
@docs/PRODUCT_INVENTORY.md
```

---

## 10. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | >90 |
| Lighthouse Accessibility | >95 |
| Lighthouse Best Practices | >95 |
| Lighthouse SEO | >90 |
| First Contentful Paint | <1.5s |
| Largest Contentful Paint | <2.5s |
| Cumulative Layout Shift | <0.1 |

**Implementation checklist:**
- [ ] `next/image` for all images with explicit `width`/`height` or `fill`
- [ ] `next/font` for all fonts with `display: swap`
- [ ] No unused CSS classes in production
- [ ] No client-side heavy libraries (no Three.js, no GSAP)
- [ ] Vercel Edge deployment (default)
- [ ] Open Graph metadata in `layout.tsx`

---

## 11. Metadata (layout.tsx)

```typescript
export const metadata: Metadata = {
  title: "Mian Muhammad Athar — Solo Product Engineer",
  description:
    "I turn ideas into shipped apps, games, and SaaS systems — using engineering discipline and frontier AI development workflows.",
  openGraph: {
    title: "Mian Muhammad Athar — Solo Product Engineer",
    description:
      "Mobile apps, iOS games, and SaaS systems built solo. Engineering precision meets agentic AI workflows.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mian Muhammad Athar — Solo Product Engineer",
    description: "From idea to App Store.",
    images: ["/og.jpg"],
  },
};
```

---

## 12. Verification Checklist (Before Claiming Phase Complete)

```bash
# Must all pass
npm run lint
npm run typecheck
npm run build

# Manual checks
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000          # 200
curl -s -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"Hello","history":[]}' | head -c 100                 # streaming text

curl -s -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@t.com","building":"Test app","platform":"Mobile App","timeline":"1-3 months","budget":"$5-15K"}'
# Without keys: 503. With keys: {"success":true}
```

---

*This document is authoritative for all technical decisions. Update when architectural decisions change.*
