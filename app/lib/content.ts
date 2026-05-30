/**
 * Portfolio Content Source of Truth
 * 
 * This file centralizes all public-facing facts, project claims, and bio data.
 */

export type ProjectStatus = 
  | 'Published' 
  | 'Built' 
  | 'In Review'
  | 'Internal' 
  | 'Experiment' 
  | 'Pipeline';

export interface Project {
  name: string;
  status: ProjectStatus;
  type: string;
  detail: string;
  stack?: string[];
  link?: string;
  icon?: string;
}

export const PROJECTS: Project[] = [
  {
    name: "NexPOS (AuraPOS)",
    status: "Published",
    type: "Hybrid Commerce Engine",
    detail: "An offline-first SaaS POS system designed for 10-second checkouts and multi-location retail management. Built to eliminate downtime and per-register fees.",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "PWA"],
    link: "https://nexpos-ten.vercel.app/"
  },
  {
    name: "Block Crush Puzzle",
    status: "Published",
    type: "Performance-Tuned iOS Game",
    detail: "A strategic block puzzle game built with SwiftUI and SpriteKit. Features 120Hz smooth gameplay, tactical power-ups, and global leaderboards.",
    stack: ["SwiftUI", "SpriteKit", "Combine", "StoreKit"],
    link: "https://apps.apple.com/us/app/block-crush-puzzle-games-new/id6755646573"
  },
  {
    name: "FurrFind AI",
    status: "Built",
    type: "Vision-AI Mobile App",
    detail: "A cross-platform Flutter app that identifies dog and cat breeds from photos with real-time AI veterinary chat and premium care management.",
    stack: ["Flutter", "OpenAI", "Vision AI", "RevenueCat"]
  },
  {
    name: "Soleris Ledger",
    status: "Built",
    type: "Business Intelligence Dashboard",
    detail: "A specialized inventory and budget dashboard with SQLite persistence, currency conversion, and AI-driven profit/ROAS analysis.",
    stack: ["React", "Vite", "SQLite", "OpenAI"]
  },
  {
    name: "NextGen Dashboard",
    status: "In Review",
    type: "Enterprise Web App",
    detail: "A high-performance management interface for complex operations, currently undergoing final publishing review.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"]
  }
];

export const BIO_FACTS = {
  name: "Mian Muhammad Athar",
  shortName: "Athar",
  fullName: "Mian Muhammad Athar",
  title: "AI-First Product Architect",
  tagline: "I build the next generation of AI-Native software.",
  headline: "Architecting Products from 0 to 1.",
  subheadline: "Specializing in AI Agents, MCP Servers, and automated delivery workflows. I turn high-level business goals into verified, high-performance software systems.",
  image: "/55D670AB-C554-4417-86F0-C65863EDE18E.PNG",
  background: "I architect high-performance software where engineering discipline meets **AI-native intelligence**. From autonomous agents to offline-first commerce, I build the systems that work where others break.",
  education: "Bachelor of Science in Electronic Engineering from Ghulam Ishaq Khan Institute.",
  experience: [
    "AI-Native Development: Architecting systems with autonomous agents and custom MCP servers.",
    "Full-Stack Engineering: Scalable architectures using Next.js, Flutter, and high-performance backends.",
    "Automated Delivery: Leveraging coding agents and multi-model reasoning to ship at 10x velocity."
  ]
};

export const CAPABILITIES = [
  "AI Agents & MCP Architectures",
  "Cross-platform Apps (Flutter)",
  "Modern Web Systems (Next.js)",
  "Native iOS Games (SwiftUI)",
  "Vision-AI & LLM Integration",
  "Automated Backend Workflows"
];

export const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    text: "We deep-dive into your business goals, user personas, and core 'Why' to ensure the product solves a real market problem."
  },
  {
    step: "02",
    title: "Blueprint",
    text: "Designing the technical architecture, from data schemas to AI agent orchestration and secure API boundaries."
  },
  {
    step: "03",
    title: "Iteration",
    text: "Building with elite AI-assisted velocity. We ship functional modules rapidly, allowing for frequent feedback and refinement."
  },
  {
    step: "04",
    title: "Hardening",
    text: "Rigorous end-to-end testing, security audits, and stress tests to ensure the product holds up under production traffic."
  },
  {
    step: "05",
    title: "Launch",
    text: "Seamless cloud deployment, automated monitoring setup, and a clean handoff with documentation for your team."
  }
];

export const AI_ASSISTANT_DEFAULTS = {
  questions: [
    "What can you help me with?",
    "Can you build a web app, iOS app, or both?",
    "Tell me about your tech strengths.",
    "How do we start a project?"
  ],
  responses: {
    capabilities: "I build for Web (Next.js), Mobile (Flutter/iOS), and AI. I specialize in turning rough concepts into verified products.",
    multiplatform: "Yes, I build native iOS apps using SwiftUI/Swift and cross-platform apps (Android & iOS) using Flutter."
  }
};

export const AI_WORKFLOW_CLAIMS = {
  delivery: "Modern AI-assisted delivery using structured workflows, coding agents for implementation, research agents for planning, and multi-model reasoning.",
  tools: ["Codex", "Claude Code", "Gemini", "Antigravity Environments", "MCPs", "Agents", "Skills", "Plugins"]
};
