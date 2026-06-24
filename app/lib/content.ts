/**
 * Portfolio Content Source of Truth
 *
 * Public-facing facts, project claims, page copy, and assistant grounding.
 */

export type StatusColor = "green" | "yellow" | "gray" | "blue";

export type ProjectTileMotif = "pos" | "blocks" | "paw" | "chart" | "hand";

export interface ProjectTileData {
  gradient: string;
  accentColor: string;
  motif: ProjectTileMotif;
  iconSrc?: string;
}

export interface WorkProject {
  id: string;
  name: string;
  statusLabel: string;
  statusColor: StatusColor;
  type: string;
  oneLiner: string;
  bullets: string[];
  stack: string[];
  link?: string;
  linkLabel?: string;
  caseStudyHref: string;
  caseStudyLabel: string;
  visual: string;
  tile: ProjectTileData;
  featured: boolean;
}

export interface CapabilityCard {
  title: string;
  description: string;
  chips: string[];
  statusLabel?: string;
  statusColor?: StatusColor;
  link?: string;
  linkLabel?: string;
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
  location: "Product Engineer",
  title: "Solo Product Engineer",
  tagline: "Solo Product Engineer — Agentic AI, Automation & iOS/SaaS Delivery",
  headline: "From idea to shipped product.",
  subheadline:
    "I build mobile apps, SaaS products, AI workflows, and games from first scope to launch. I combine engineering discipline, operator experience, and AI-assisted development systems to move faster without handing quality control to the AI.",
  proof:
    "2 published iOS apps · 1 live SaaS product · Full-stack builds · App Store + Vercel + Supabase + RevenueCat",
  image: "/55D670AB-C554-4417-86F0-C65863EDE18E.PNG",
  email: "atharmushtaq9@gmail.com",
  linkedin: "https://linkedin.com/in/mian-muhammad-athar",
  github: "https://github.com/AI-GrandFather",
  education:
    "GIKI Electronic Engineering, with 5 distinctions. Microcontrollers, embedded systems, PCB design, and a wall-climbing robot final-year project.",
  operator:
    "Three e-commerce companies across Texas and Yorkshire with $130K in revenue, Shopify and Amazon operations, supplier coordination, margins, and customer relationships.",
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "aurapos",
    name: "AuraPOS",
    statusLabel: "Early Access / Live Web SaaS",
    statusColor: "green",
    type: "SaaS POS System",
    oneLiner:
      "Multi-location POS platform for checkout, inventory, reports, and retail operations.",
    bullets: [
      "Built with Next.js, Supabase, TypeScript, and PWA foundations.",
      "Includes checkout flow, inventory workflows, reporting, and multi-location logic.",
      "Designed for SaaS deployment, operational handoff, and future scaling.",
    ],
    stack: ["Next.js", "Supabase", "TypeScript", "PWA"],
    link: "https://nexpos-ten.vercel.app/",
    linkLabel: "View Project",
    caseStudyHref: "/work/aurapos",
    caseStudyLabel: "Case Study",
    visual: "Register · stock · reports",
    featured: true,
    tile: {
      gradient: "linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 100%)",
      accentColor: "#4ade80",
      motif: "pos",
    },
  },
  {
    id: "block-crush",
    name: "Block Crush",
    statusLabel: "Live on App Store",
    statusColor: "green",
    type: "iOS Game",
    oneLiner:
      "Published iOS puzzle game with power-ups, Game Center, StoreKit monetization, and 120Hz gameplay support.",
    bullets: [
      "Built with SwiftUI/SpriteKit-style mobile game polish.",
      "Includes power-ups, daily rewards, leaderboards, achievements, and IAP.",
      "Proof of mobile UX, game-feel, monetization, and App Store shipping.",
    ],
    stack: ["SwiftUI", "SpriteKit", "StoreKit", "Game Center"],
    link: "https://apps.apple.com/us/app/block-crush-puzzle-games-new/id6755646573",
    linkLabel: "View App Store",
    caseStudyHref: "/work/block-crush",
    caseStudyLabel: "Case Study",
    visual: "Board · pieces · rewards",
    featured: true,
    tile: {
      gradient: "linear-gradient(135deg, #0f0f2e 0%, #1a1a4e 100%)",
      accentColor: "#818cf8",
      motif: "blocks",
      iconSrc: "/icons/block-crush-icon.png",
    },
  },
  {
    id: "furrfind",
    name: "FurrFind AI",
    statusLabel: "Live on App Store",
    statusColor: "green",
    type: "Vision-AI Mobile App",
    oneLiner:
      "Published AI breed identifier for dogs and cats using photo-based visual analysis.",
    bullets: [
      "Built with Flutter, OpenAI Vision, RevenueCat, Hive/local history, and premium gating.",
      "Identifies likely breeds and explains visible traits from photos.",
      "Includes scan history, subscriptions, and clear AI/veterinary disclaimers.",
    ],
    stack: ["Flutter", "OpenAI Vision", "RevenueCat", "Hive"],
    link: "https://apps.apple.com/us/app/furrfind-ai-breed-identifier/id6771251731",
    linkLabel: "View App Store",
    caseStudyHref: "/work/furrfind",
    caseStudyLabel: "Case Study",
    visual: "Photo · breed · care",
    featured: true,
    tile: {
      gradient: "linear-gradient(135deg, #0a1628 0%, #050d1f 100%)",
      accentColor: "#60a5fa",
      motif: "paw",
      iconSrc: "/icons/furrfind-icon.png",
    },
  },
  {
    id: "soleris-ledger",
    name: "Soleris Ledger",
    statusLabel: "Built",
    statusColor: "gray",
    type: "Business Dashboard",
    oneLiner:
      "Business dashboard for P&L, inventory, ROAS, budget tracking, and AI-assisted business data inspection.",
    bullets: [
      "Tracks operator metrics across profit, spend, stock, and budget movement.",
      "Includes AI-assisted inspection and update flows for business data.",
      "Positioned as a built internal tool, not a public commercial launch.",
    ],
    stack: ["React", "Vite", "SQLite", "Express", "OpenAI"],
    caseStudyHref: "/work/soleris-ledger",
    caseStudyLabel: "Case Study Available",
    visual: "Budget · ROAS · stock",
    featured: false,
    tile: {
      gradient: "linear-gradient(135deg, #0d1e2e 0%, #071525 100%)",
      accentColor: "#38bdf8",
      motif: "chart",
    },
  },
  {
    id: "handtracking",
    name: "Handtracking",
    statusLabel: "Experiment",
    statusColor: "blue",
    type: "Computer Vision Interaction",
    oneLiner:
      "Browser-based MediaPipe hand gesture experiment with canvas, particles, strings, and physics.",
    bullets: [
      "Uses MediaPipe landmarks, canvas rendering, and gesture-driven interaction.",
      "Includes particles, string physics, smoothing, and real-time browser feedback.",
      "Proof of computer vision prototyping and interaction design range.",
    ],
    stack: ["MediaPipe", "Canvas", "Verlet Physics", "One Euro Filter"],
    caseStudyHref: "/work/handtracking",
    caseStudyLabel: "Demo / Case Study",
    visual: "Gesture · particles · physics",
    featured: false,
    tile: {
      gradient: "linear-gradient(135deg, #050510 0%, #0a0a1a 100%)",
      accentColor: "#22d3ee",
      motif: "hand",
    },
  },
];

export const PROJECTS = WORK_PROJECTS;

export const CAPABILITIES: CapabilityCard[] = [
  {
    title: "Mobile Apps",
    description:
      "iOS and cross-platform apps with real onboarding, local state, payments, and App Store-ready polish.",
    chips: ["Flutter", "SwiftUI", "RevenueCat"],
  },
  {
    title: "SaaS Products",
    description:
      "Web products with auth-ready architecture, database models, admin flows, and deployment paths.",
    chips: ["Next.js", "Supabase", "PostgreSQL"],
  },
  {
    title: "AI Integrations",
    description:
      "AI features that sit inside useful workflows instead of being a chatbot pasted onto the side.",
    chips: ["OpenAI", "Vision", "Agents"],
  },
  {
    title: "Games",
    description:
      "Mobile and browser game systems focused on feel, loops, progression, and monetization foundations.",
    chips: ["SpriteKit", "Game Center", "StoreKit"],
  },
  {
    title: "Internal Tools",
    description:
      "Dashboards, business systems, inventory flows, reporting, and AI-assisted operations for owners.",
    chips: ["Dashboards", "Reports", "Automation"],
  },
  {
    title: "Cloud Deployment & Implementation",
    description:
      "I deploy, configure, troubleshoot, and stabilize production apps across AWS, Azure, Google Cloud, Vercel, Supabase, and Firebase — including hosting, storage, databases, environment variables, monitoring, CI/CD, app backends, and production handoff.",
    chips: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Vercel",
      "Supabase",
      "Firebase",
      "CI/CD",
      "Monitoring",
    ],
  },
];

export const AGENTIC_AI_CAPABILITIES: CapabilityCard[] = [
  {
    title: "Lingua Loop — Live on AWS",
    description:
      "Three-agent adaptive language-practice system. Tutor, Evaluator, and Coach agents run on a shared LangGraph state graph with checkpointing. The Coach agent generates and updates a curriculum roadmap in real time. Supports 12 languages, configurable AI model tiers, Vocabulary Bank, Grammar Notes, and a persistent Learner Profile. Deployed on AWS Amplify — originally architected on Lambda, S3, CloudFront, and API Gateway.",
    chips: ["LangGraph", "AWS Amplify", "Multi-Agent", "12 Languages"],
    statusLabel: "Live · AWS Amplify",
    statusColor: "green",
    link: "https://main.dxc1dhz704oyg.amplifyapp.com",
    linkLabel: "Open Lingua Loop",
  },
  {
    title: "Autonomous AI Agents",
    description:
      "Build multi-agent architectures using OpenAI Agents SDK, Claude API, and customized routing to automate complex business workflows and data synthesis.",
    chips: ["OpenAI Agents", "Claude API", "Structured Routing", "MCP"],
  },
  {
    title: "Workflow Automation & Tools",
    description:
      "Build internal dashboards, automated reporting scripts, and database-backed workflows that allow operators to inspect and update state using natural language.",
    chips: ["Automation", "Dashboards", "Natural Language UX", "SQLite / Express"],
  },
  {
    title: "Vision AI & Real-Time Interaction",
    description:
      "Deploy production vision systems (like photo-based breed/care classification) and browser-based hand landmark gesture controls using MediaPipe.",
    chips: ["OpenAI Vision", "MediaPipe Tasks", "Canvas", "Verlet Physics"],
  },
];

export const AI_ENGINEERING_FOUNDATIONS: CapabilityCard[] = [
  {
    title: "Context Engineering",
    description:
      "LLMs are stateless — every API call starts completely fresh. The application decides what enters the context window at each inference step: prior messages, retrieved chunks, tool results, system instructions. Getting this wrong is the most common production failure mode in AI systems. Context engineering is the discipline of structuring that input deliberately.",
    chips: ["Context Windows", "Retrieval", "Tool Results", "System Instructions"],
  },
  {
    title: "RAG Pipeline Design",
    description:
      "Retrieval-Augmented Generation grounds model responses in your actual data. The pipeline: document ingestion and parsing → semantic chunking (splitting on topic boundaries, not character counts) → embedding generation → HNSW vector indexing → hybrid retrieval combining dense semantic search with sparse BM25 keyword search → cross-encoder reranking for precision. Retrieval failure is where 73% of RAG systems break — not generation.",
    chips: ["Semantic Chunking", "HNSW", "BM25", "Reranking"],
  },
  {
    title: "Agent Architecture",
    description:
      "An agent is an LLM with access to defined tools, executing a loop until a stopping condition is met. Serious production agents use LangGraph: explicit state machines, separation of planning and execution nodes, checkpointing before expensive calls, and human-in-the-loop interrupt support. Supervisor/worker patterns handle multi-agent coordination.",
    chips: ["LangGraph", "State Machines", "Checkpointing", "Human-in-the-Loop"],
  },
  {
    title: "Streaming & Response Design",
    description:
      "Token-by-token streaming via server-sent events with real-time markdown rendering. The difference between a system that feels alive and one that makes users wonder if it crashed while waiting for a full response to arrive.",
    chips: ["Server-Sent Events", "Streaming", "Markdown", "UX"],
  },
];

export const SERVICE_CAPABILITIES: CapabilityCard[] = [
  {
    title: "Authentication & Accounts",
    description:
      "Email registration, Google OAuth, and Apple Sign-In. Designed and integrated for web and mobile products.",
    chips: ["NextAuth", "Supabase Auth", "OAuth 2.0", "Firebase Auth"],
  },
  {
    title: "Billing & Subscriptions",
    description:
      "Subscription models for SaaS and mobile apps. Protected features, plan-aware access control, and integration with RevenueCat or Stripe.",
    chips: ["Stripe", "RevenueCat", "Webhooks", "IAP"],
  },
  {
    title: "SaaS Entitlements & Access Control",
    description:
      "Role-based access control (RBAC), feature gating, and multi-tenant data isolation built into the database schema.",
    chips: ["RBAC", "Row-Level Security", "Feature Gating", "Tenant Isolation"],
  },
  {
    title: "Secure Client Handoff",
    description:
      "Full source code ownership, environment configuration documentation, deployment guide, and a pre-deployment safety checklist.",
    chips: ["Handoff Docs", "Environment Setup", "Checklists", "Source Handoff"],
  },
];

export const APP_SUPPORT: CapabilityCard[] = [
  {
    title: "App Audit",
    description:
      "Review the codebase, architecture, environment setup, database structure, auth flow, and deployment risks before more money is spent.",
    chips: ["Code Review", "Architecture", "Security", "Database"],
  },
  {
    title: "Deployment Fixes",
    description:
      "Fix broken builds, Vercel issues, Supabase/Firebase setup problems, app store blockers, environment variables, and production configuration.",
    chips: ["Vercel", "Supabase", "Firebase", "App Store"],
  },
  {
    title: "Performance & Stability",
    description:
      "Improve loading speed, reduce fragile flows, clean up API/database bottlenecks, and make the app more reliable before launch.",
    chips: ["Performance", "Reliability", "API", "Database"],
  },
  {
    title: "Cloud Fixes & Production Readiness",
    description:
      "For apps that work locally but fail in production, have broken environment variables, database connection issues, missing logs, storage/auth misconfiguration, scattered AWS resources, or unclear deployment ownership.",
    chips: ["Production Fixes", "AWS", "Azure", "GCP", "Databases", "Logs", "Storage"],
  },
];

export const DEPLOYMENT_CAPABILITIES: CapabilityCard[] = [
  {
    title: "Vercel",
    description:
      "Primary deployment platform for Next.js projects. Environment setup, preview deployments, domain configuration, and production monitoring.",
    chips: ["Next.js", "Vercel Edge", "Domains", "Analytics"],
  },
  {
    title: "AWS",
    description:
      "Hands-on AWS engineering across EC2, S3, CloudFront, RDS, Aurora, Amplify, App Runner, CloudFormation, CloudWatch, Lambda, API Gateway, and IAM. Production deployment of Lingua Loop: initially architected on Lambda, S3, CloudFront, and API Gateway — then migrated to AWS Amplify for full-stack hosting and CI/CD. AWS CLI is part of the daily workflow. Amazon Bedrock integration currently in progress. Terraform used for infrastructure-as-code.",
    chips: ["S3", "RDS", "EC2", "Lambda", "IAM"],
  },
  {
    title: "Azure & GCP",
    description:
      "Deployment support and cloud service selection across Azure and Google Cloud Platform for clients who need these platforms specifically.",
    chips: ["Azure App Services", "Google Cloud Run", "Cloud Storage"],
  },
  {
    title: "Scaling & Troubleshooting",
    description:
      "Fix performance, scaling, or billing issues on Vercel or AWS, database connection pools, memory leaks, and production logs.",
    chips: ["Connection Pools", "Debugging", "Logs", "Cost Control"],
  },
];

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Scope",
    text:
      "Problem definition, users, constraints, success criteria, and what stays out of scope.",
  },
  {
    step: "02",
    title: "Blueprint",
    text:
      "PRD, TRD, architecture, data model, integrations, and a phase plan before build work starts.",
  },
  {
    step: "03",
    title: "Build",
    text:
      "AI-assisted implementation through scoped task files, conventional commits, and passing typecheck/build gates.",
  },
  {
    step: "04",
    title: "Harden & Launch",
    text:
      "Security pass, performance review, deployment, rollback plan, documentation, and handoff.",
  },
];

export const PRODUCTION_SAFETY = [
  "Authorization checks",
  "Input validation",
  "Rate limiting",
  "Secure CORS",
  "Clean error handling",
  "Logging, monitoring, rollback",
  "Source-code handoff",
];

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
    label: "AI",
    items: ["OpenAI Agents SDK", "Claude API", "Gemini API", "MediaPipe Tasks"],
  },
  {
    label: "Cloud",
    items: ["AWS", "Azure", "Google Cloud", "Vercel", "Supabase", "Firebase"],
  },
  {
    label: "AWS",
    items: [
      "S3",
      "RDS",
      "Aurora",
      "Amplify",
      "App Runner",
      "CloudFormation",
      "CloudWatch",
      "IAM",
    ],
  },
  {
    label: "Deployment",
    items: [
      "CI/CD",
      "Environment Setup",
      "Production Troubleshooting",
      "Monitoring",
      "Rollback Planning",
      "Handoff Docs",
    ],
  },
  {
    label: "Tooling",
    items: ["Codex", "Claude Code", "Gemini CLI", "GitHub"],
  },
  {
    label: "Monetization",
    items: ["RevenueCat", "StoreKit", "AdMob", "Stripe"],
  },
];

export const CONTACT_COPY = {
  eyebrow: "Contact",
  title: "Send the idea.",
  text:
    "I’ll reply with whether I can help, what the first version should include, and what should stay out of scope.",
};

export const AI_ASSISTANT_DEFAULTS = {
  questions: [
    "What have you shipped?",
    "Can you build my mobile app?",
    "How do you use AI without losing quality control?",
    "Can you help with subscriptions or deployment?",
  ],
  greeting:
    "Hey - I can help you understand Athar's work, capabilities, and whether your idea is a fit. What are you building?",
  responses: {
    capabilities:
      "Athar builds mobile apps, SaaS products, AI workflows, games, internal tools, and deployment handoffs. The strongest proof is AuraPOS, Block Crush, and FurrFind AI.",
    multiplatform:
      "Yes. Athar can build for iOS, Android, and web. The right stack depends on the product, timeline, and what needs to ship first.",
  },
};

export const CV_READY_ADDITIONS = `Cloud, Authentication & Subscription Systems:
- Authentication flows (email registration, Google OAuth, Apple Sign-In) designed and integrated for web and mobile products.
- Billing and subscription models for SaaS and mobile apps - entitlement logic, protected features, subscription-aware access control.
- Deployment and production handoff across Vercel, AWS, Azure, and GCP, including environment configuration, deployment checks, rollback planning, and scaling.
- Hands-on AWS engineering across EC2, S3, CloudFront, RDS, Aurora, Amplify, App Runner, CloudFormation, CloudWatch, Lambda, API Gateway, IAM, and Terraform. Amazon Bedrock integration is in progress.`;

export const AI_WORKFLOW_CLAIMS = {
  delivery:
    "Architecture-first AI-assisted delivery: Athar writes the spec, scopes the tasks, directs coding agents, reviews output, verifies behavior, and ships only after quality gates.",
  tools: ["Codex", "Claude Code", "Gemini Developer API", "OpenAI Agents SDK", "MCPs", "Agents", "Skills"],
};

export const DOCUMENT_STACK = {
  eyebrow: "Document Stack",
  title: "Every project starts on paper.",
  subtitle: "The build is just the execution.",
  intro:
    "Project documents keep scope, architecture, acceptance criteria, and AI-agent tasks aligned before implementation starts.",
  cards: PROCESS.map((item) => ({
    step: item.step,
    title: item.title,
    text: item.text,
  })),
};

export const PRE_DEPLOYMENT_SAFETY = {
  eyebrow: "Pre-Deployment Safety",
  title: "Nothing ships without a checklist.",
  subtitle: "No exceptions. No deadline pressure.",
  intro:
    "Public products get a safety pass before launch: access control, validation, rate limits, deployment checks, rollback, and handoff documentation.",
  closing: "Full checklist shared during project onboarding.",
  items: PRODUCTION_SAFETY.map((item, index) => ({
    step: String(index + 1).padStart(2, "0"),
    title: item,
    text: "Verified during the production readiness pass before launch or handoff.",
  })),
};
