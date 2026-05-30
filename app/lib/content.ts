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
}

export const BIO_FACTS = {
  name: "Mian Muhammad Athar",
  shortName: "Athar",
  fullName: "Mian Muhammad Athar",
  location: "Islamabad, PK",
  title: "Solo Product Engineer",
  tagline: "Solo Product Engineer - Islamabad, PK",
  headline: "From Idea\nto App Store.",
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
  },
  {
    id: "furrfind",
    name: "FurrFind AI",
    status: "IN REVIEW",
    statusLabel: "IN REVIEW",
    statusColor: "yellow",
    type: "Vision-AI Mobile App",
    tagline: "Cross-platform AI pet breed identifier.",
    detail:
      "Flutter app for iOS and Android that identifies dog and cat breeds from photos using Vision AI. Includes RevenueCat subscriptions, local scan history, daily scan limits, and premium AI care chat.",
    stack: ["Flutter", "OpenAI Vision", "RevenueCat", "Hive", "AdMob"],
    visual: "Photo, breed, care",
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

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    text:
      "I map your business goal, user, and core constraint before touching a line of code. A product that solves the wrong problem is worse than no product.",
  },
  {
    step: "02",
    title: "Blueprint",
    text:
      "Full technical architecture: data schemas, API boundaries, AI orchestration, and phased delivery plan. No ambiguity before build begins.",
  },
  {
    step: "03",
    title: "Build",
    text:
      "Agentic development against precise task documents. Each module is functional before the next begins, with no half-built features sitting in branches.",
  },
  {
    step: "04",
    title: "Harden",
    text:
      "Edge case coverage, performance review, and a security pass before client review. What you see should already work.",
  },
  {
    step: "05",
    title: "Launch",
    text:
      "Deployment, documentation, and a clean handoff. You own what was built, and the next phase has a clear path.",
  },
];

export const CONTACT_COPY = {
  eyebrow: "Contact",
  title: "Got Something to Build?",
  text:
    "Tell me what you're working on. I'll tell you if I can help and what the first version would look like.",
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
