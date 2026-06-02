/**
 * Portfolio Content Source of Truth
 *
 * Public-facing facts, project claims, page copy, and assistant grounding.
 */

export type ProjectStatus =
  | "LIVE"
  | "PUBLISHED"
  | "IN REVIEW"
  | "BUILT"
  | "EXPERIMENT";

export type StatusColor = "green" | "yellow" | "gray" | "blue";

export type ProjectTileMotif = "pos" | "blocks" | "paw" | "chart" | "hand";

export interface ProjectTileData {
  gradient: string;
  accentColor: string;
  motif: ProjectTileMotif;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  statusLabel: string;
  statusColor: StatusColor;
  type: string;
  tagline: string;
  detail: string;
  stack: string[];
  link?: string;
  visual: string;
  tile: ProjectTileData;
}

export interface OriginCard {
  phase: string;
  label: string;
  title: string;
  text: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  text: string;
  deliverable?: string;
}

export interface NumberedCard {
  step: string;
  title: string;
  text: string;
}

export interface SafetyItem {
  step: string;
  title: string;
  text: string;
}

export const BIO_FACTS = {
  name: "Mian Muhammad Athar",
  shortName: "Athar",
  fullName: "Mian Muhammad Athar",
  location: "Product Engineer",
  title: "Solo Product Engineer",
  tagline: "Solo Product Engineer",
  headline: "From Idea to App Store.",
  subheadline:
    "I plan, build, and ship mobile apps, games, and SaaS systems solo. Engineering discipline from GIKI, operator instincts from running e-commerce businesses, and frontier AI development workflows that compress months into weeks.",
  image: "/55D670AB-C554-4417-86F0-C65863EDE18E.PNG",
  email: "atharmushtaq9@gmail.com",
  linkedin: "https://linkedin.com/in/mian-muhammad-athar",
  github: "https://github.com/AI-GrandFather",
  education:
    "GIKI Electronic Engineering, with 5 distinctions. Microcontrollers, embedded systems, PCB design, and a wall-climbing robot final-year project.",
  operator:
    "Three e-commerce companies across Texas and Yorkshire with $130K in revenue, Shopify and Amazon operations, supplier coordination, margins, and customer relationships.",
};

export const ORIGIN_STORY: OriginCard[] = [
  {
    phase: "01",
    label: "Systems",
    title: "Engineer",
    text:
      "GIKI Electronic Engineering, with 5 distinctions. Microcontrollers, embedded systems, PCB design, and a wall-climbing robot final-year project. Systems thinking from day one.",
  },
  {
    phase: "02",
    label: "Business",
    title: "Operator",
    text:
      "Three e-commerce companies across Texas and Yorkshire. $130K in revenue across Shopify and Amazon, with full ownership of inventory, suppliers, margins, and customer relationships.",
  },
  {
    phase: "03",
    label: "Product",
    title: "Builder",
    text:
      "Now I build products: mobile apps, games, SaaS systems, and AI workflows. Claude Code and Gemini act as implementation agents; I stay the architect, reviewer, and quality gate.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "aurapos",
    name: "AuraPOS",
    status: "LIVE",
    statusLabel: "LIVE - WEB",
    statusColor: "green",
    type: "SaaS POS System",
    tagline: "Live multi-location point-of-sale system.",
    detail:
      "Next.js and Supabase POS platform for fast checkout, inventory workflows, reporting, and multi-location retail management. Built with offline-first foundations and SaaS-ready operational modules.",
    stack: ["Next.js", "Supabase", "TypeScript", "PWA", "Reports"],
    link: "https://nexpos-ten.vercel.app/",
    visual: "Register, stock, reports",
    tile: {
      gradient: "linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 100%)",
      accentColor: "#4ade80",
      motif: "pos",
    },
  },
  {
    id: "block-crush",
    name: "Block Crush Puzzle",
    status: "PUBLISHED",
    statusLabel: "LIVE - APP STORE",
    statusColor: "green",
    type: "iOS Game",
    tagline: "Published iOS block puzzle game.",
    detail:
      "SwiftUI and SpriteKit game with smooth 120Hz gameplay, tactical power-ups, Game Center leaderboards, and StoreKit monetization. A production proof point for mobile polish and game-feel.",
    stack: ["SwiftUI", "SpriteKit", "Combine", "StoreKit", "Game Center"],
    link: "https://apps.apple.com/us/app/block-crush-puzzle-games-new/id6755646573",
    visual: "Board, pieces, effects",
    tile: {
      gradient: "linear-gradient(135deg, #0f0f2e 0%, #1a1a4e 100%)",
      accentColor: "#818cf8",
      motif: "blocks",
    },
  },
  {
    id: "furrfind",
    name: "FurrFind AI",
    status: "PUBLISHED",
    statusLabel: "LIVE - APP STORE",
    statusColor: "green",
    type: "Vision-AI Mobile App",
    tagline: "Published iOS AI pet breed identifier.",
    detail:
      "Published Flutter app for iPhone that identifies dog and cat breeds from photos using Vision AI. Includes RevenueCat subscriptions, local scan history, daily scan limits, and premium AI care chat.",
    stack: ["Flutter", "OpenAI Vision", "RevenueCat", "Hive", "AdMob"],
    link: "https://apps.apple.com/us/app/furrfind-ai-breed-identifier/id6771251731",
    visual: "Photo, breed, care",
    tile: {
      gradient: "linear-gradient(135deg, #2e1a0d 0%, #1f0f05 100%)",
      accentColor: "#fb923c",
      motif: "paw",
    },
  },
  {
    id: "soleris-ledger",
    name: "Soleris Ledger",
    status: "BUILT",
    statusLabel: "BUILT",
    statusColor: "gray",
    type: "Business Dashboard",
    tagline: "Business intelligence dashboard for operators.",
    detail:
      "Dashboard for e-commerce P&L tracking, budget management, inventory workflows, ROAS analysis, profit percentage, and multi-currency conversion. Includes an AI assistant that can inspect and update business data.",
    stack: ["React", "Vite", "SQLite", "Express", "OpenAI"],
    visual: "Budget, ROAS, stock",
    tile: {
      gradient: "linear-gradient(135deg, #0d1e2e 0%, #071525 100%)",
      accentColor: "#38bdf8",
      motif: "chart",
    },
  },
  {
    id: "handtracking",
    name: "Handtracking",
    status: "EXPERIMENT",
    statusLabel: "EXPERIMENT",
    statusColor: "blue",
    type: "Computer Vision Interaction",
    tagline: "Real-time hand gesture experiment in the browser.",
    detail:
      "Complete MediaPipe and canvas experiment with real-time hand landmarks, gesture recognition, interactive strings, particles, and neon visual effects. Built with Verlet physics and One Euro Filter smoothing.",
    stack: ["MediaPipe", "Canvas", "Verlet Physics", "One Euro Filter"],
    visual: "Gesture, particles, physics",
    tile: {
      gradient: "linear-gradient(135deg, #050510 0%, #0a0a1a 100%)",
      accentColor: "#22d3ee",
      motif: "hand",
    },
  },
];

export const HOW_I_BUILD = {
  eyebrow: "How I Build",
  title: "Architect first. Agents second. Quality gate always.",
  body: [
    "I use frontier AI coding agents as implementation partners, not as unsupervised product owners.",
    "I define the system design, write precise task documents, review every output against the spec, and enforce engineering standards throughout.",
    "The result is delivery velocity a solo developer could not reach five years ago, without the coordination drag of an agency or the risk of unreviewed AI output going live.",
  ],
  steps: [
    {
      title: "Architect",
      text: "System design, scope, data model, and task files before build starts.",
    },
    {
      title: "Agent Build",
      text: "Claude Code, Codex, and Gemini execute tightly scoped implementation work.",
      detail:
        "Every agent task is scoped to a single module and executed against a written spec. Agents cannot modify architecture, authentication, payments, or production configuration without an explicit, session-level instruction. Every change is committed with a conventional commit message (feat / fix / refactor / chore) and logged to COMMITS.md with a timestamp. Typecheck and production build must pass clean before any commit is recorded. The review gate is not a rubber stamp — it is the only thing that ships.",
    },
    {
      title: "Review & Ship",
      text: "I test, harden, revise, and deploy only what survives review.",
    },
  ],
};

export const STACK_GROUPS: StackGroup[] = [
  {
    label: "Mobile",
    items: ["Flutter", "Dart", "SwiftUI", "SpriteKit"],
  },
  {
    label: "Web",
    items: ["Next.js", "React", "TypeScript", "CSS"],
  },
  {
    label: "Backend",
    items: ["Supabase", "Node.js", "Express", "SQLite", "PostgreSQL"],
  },
  {
    label: "AI & ML",
    items: ["OpenAI", "Claude", "Gemini", "MediaPipe"],
  },
  {
    label: "Tooling",
    items: ["Codex", "Claude Code", "Gemini CLI", "GitHub", "Vercel"],
  },
  {
    label: "Monetization",
    items: ["RevenueCat", "StoreKit", "AdMob", "Stripe"],
  },
];

export const DOCUMENT_STACK = {
  eyebrow: "Document Stack",
  title: "Every project starts on paper.",
  subtitle: "The build is just the execution.",
  intro:
    "Before an agent writes a single line of code, the full specification exists as structured documents. These are not formalities — they are the system. They prevent scope creep, make handoffs clean, and give AI agents something precise to execute against instead of vague instructions.",
  cards: [
    {
      step: "01",
      title: "PRD — Product Requirements Document",
      text:
        "Defines what is being built and why. User goals, feature scope, acceptance criteria, and an explicit list of what is out of scope. This is the contract that prevents requirements from expanding mid-build.",
    },
    {
      step: "02",
      title: "TRD — Technical Requirements Document",
      text:
        "Stack decisions, API boundaries, third-party integrations, data schemas, and every constraint that governs how the system is built. Written before build starts, referenced throughout.",
    },
    {
      step: "03",
      title: "Architecture Document",
      text:
        "System diagrams, module boundaries, state management model, and the rationale behind structural choices. Written and agreed before the first task is assigned — not reconstructed from memory after the fact.",
    },
    {
      step: "04",
      title: "Phase Plans",
      text:
        "Delivery split into reviewable units. Each phase has a defined scope, acceptance criteria, and a completion gate before the next phase begins. Nothing ships half-built, and nothing starts until the previous phase passes review.",
    },
    {
      step: "05",
      title: "CLAUDE.md — Agent Governance File",
      text:
        "Every AI coding agent in the project operates under a written rule file: what it can modify, what it must leave untouched, how it must commit, and what checks must pass before any change is logged. This is how agentic development stays disciplined instead of unpredictable.",
    },
  ] satisfies NumberedCard[],
};

export const PRE_DEPLOYMENT_SAFETY = {
  eyebrow: "Pre-Deployment Safety",
  title: "Nothing ships without a signed-off checklist.",
  subtitle: "No exceptions. No deadline pressure.",
  intro:
    "Shipping to production is the moment a small oversight becomes a public incident. Every product I build — mobile app, web app, or SaaS — goes through a structured safety review before launch. Below is what that review covers and why each item exists.",
  closing:
    "This checklist is completed and signed off before every production deployment. It is not compressed under deadline pressure. If a phase isn't safe to ship, it doesn't ship.",
  items: [
    {
      step: "01",
      title: "Authorization — Users locked to their own data",
      text:
        "Authentication proves who you are. Authorization decides what you're allowed to touch. Every protected endpoint is verified to check that the requesting user actually owns the resource they're asking for — not just that they're logged in. The most common and most damaging class of bug in production web products is IDOR (Insecure Direct Object Reference): an endpoint that returns data without checking ownership. This is explicitly closed on every route before deploy.",
    },
    {
      step: "02",
      title: "Password reset links expire",
      text:
        "Reset tokens are short-lived and single-use. They expire within minutes of issue and are invalidated immediately on use or when a new reset is requested. Reset links land in email inboxes that can be forwarded, cached on shared devices, or exposed in breaches. A non-expiring token is a permanent backdoor. A short TTL shrinks the attack window to minutes.",
    },
    {
      step: "03",
      title: "Input validation — SQL injection and XSS",
      text:
        "Every value arriving from the client is treated as hostile until proven otherwise. Parameterized queries ensure user input cannot alter the shape of a SQL statement. Output escaping ensures injected scripts cannot execute in another user's browser. Both attack classes have appeared in the OWASP Top 10 for over a decade because teams keep leaving one field unvalidated.",
    },
    {
      step: "04",
      title: "CORS — API locked to your own domain",
      text:
        "In production, the API only accepts requests from your own domains. Not *, not localhost, not a development configuration left in by accident. A misconfigured CORS policy allows malicious sites to make authenticated API calls from a victim's browser, leaking data or triggering account actions on their behalf.",
    },
    {
      step: "05",
      title: "Rate limiting on every sensitive endpoint",
      text:
        "Login, password reset, signup, search, and anything that hits the database hard or sends email or SMS have request caps per client. Without rate limiting, a single client can brute-force credentials, exhaust the database connection pool, or run up a cloud bill overnight. This is one of the cheapest controls to add and one of the most expensive to omit.",
    },
    {
      step: "06",
      title: "Error handling — no internals exposed to the browser",
      text:
        "Every failure state returns a clean, structured response. Internal exceptions, stack traces, framework debug pages, and database error messages never reach the client in production. Default debug screens leak file paths, library versions, and sometimes secrets — information an attacker uses to fingerprint the stack and craft targeted exploits.",
    },
    {
      step: "07",
      title: "Database performance — targeted indexes on hot queries",
      text:
        "Queries that run constantly are covered by indexes before launch. A query that runs in 5ms on development data can take 30 seconds on production volume without one. That single slow query can exhaust the connection pool and take the entire app down under real traffic. Indexes are added where data shows they're needed — not blindly on every column, which slows writes unnecessarily.",
    },
    {
      step: "08",
      title: "Logging and monitoring — alerts before users notice",
      text:
        "Structured logs capture requests, errors, and key business events. Automated alerts fire on error rate spikes, latency jumps, and uptime failures. The goal is simple: know about a problem before a user screenshots it. Without logs, production incidents are debugged blind. Without alerts, outages are discovered on social media.",
    },
    {
      step: "09",
      title: "Rollback strategy — every deploy has a tested exit",
      text:
        "Production deployments are structured so a bad release can be reversed without a rebuild. Staging validation happens before the production switch. If something breaks in ways testing didn't catch — config drift, an unmigrated table, a dependency behaving differently in prod — the rollback path is already confirmed, not improvised under pressure.",
    },
  ] satisfies SafetyItem[],
};

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    text:
      "I map your business goal, user, and core constraint before touching a line of code. A product that solves the wrong problem is worse than no product.",
    deliverable:
      "Deliverable: Problem Definition Document, user stories, and success criteria.",
  },
  {
    step: "02",
    title: "Blueprint",
    text:
      "Full technical architecture: data schemas, API boundaries, AI orchestration, and phased delivery plan. No ambiguity before build begins.",
    deliverable:
      "Deliverables: PRD (Product Requirements Document), TRD (Technical Requirements Document), Architecture Document, Data Schema, and a Phase Plan with acceptance criteria per phase.",
  },
  {
    step: "03",
    title: "Build",
    text:
      "Agentic development against precise task documents. Each module is functional before the next begins, with no half-built features sitting in branches.",
    deliverable:
      "Deliverables: CLAUDE.md agent governance file, per-phase task files, and COMMITS.md — a full timestamped audit trail of every change made.",
  },
  {
    step: "04",
    title: "Harden",
    text:
      "Edge case coverage, performance review, and a security pass before client review. What you see should already work.",
    deliverable:
      "Deliverables: Pre-deployment checklist sign-off, App Store compliance review (mobile), security audit notes, and performance profiling results.",
  },
  {
    step: "05",
    title: "Launch",
    text:
      "Deployment, documentation, and a clean handoff. You own what was built, and the next phase has a clear path.",
    deliverable:
      "Deliverables: Deployment guide, full source code with commit history, handoff documentation, and a next-phase roadmap.",
  },
];

export const CONTACT_COPY = {
  eyebrow: "Contact",
  title: "Got Something to Build?",
  text:
    "Tell me what you're working on. I'll tell you if I can help and what the first version would look like.",
  includedTitle: "Every engagement includes:",
  included: [
    "Problem Definition Document",
    "PRD + TRD + Architecture Document",
    "Phase-by-phase delivery with review gates at each phase",
    "CLAUDE.md agent governance for all AI-assisted work",
    "Full COMMITS.md audit trail — every change, timestamped",
    "Pre-deployment safety checklist sign-off",
    "Source code ownership — no platform lock-in",
    "Handoff documentation and next-phase roadmap",
  ],
};

export const AI_ASSISTANT_DEFAULTS = {
  questions: [
    "What apps and games have you shipped?",
    "How do you use AI in your development workflow?",
    "I have a mobile app idea - where do I start?",
    "What's the difference between Flutter and SwiftUI for my project?",
  ],
  greeting:
    "Hey - I'm here to help you understand my work, what I can build for you, or help you sketch a plan for your next idea. What are you working on?",
  responses: {
    capabilities:
      "I build mobile apps, games, SaaS systems, and AI-powered tools. I handle everything from the initial blueprint to the final launch, ensuring the product is verified and ready for users.",
    multiplatform:
      "Yes. I can build for any platform you need—iOS, Android, or Web. I choose the technology stack based on what will make your specific product most successful.",
  },
};

export const AI_WORKFLOW_CLAIMS = {
  delivery:
    "Architecture-first AI-assisted delivery: Athar writes the spec, scopes the tasks, directs coding agents, reviews output, verifies behavior, and ships only after quality gates.",
  tools: ["Codex", "Claude Code", "Gemini", "OpenAI", "MCPs", "Agents", "Skills"],
};
