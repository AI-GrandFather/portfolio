import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import {
  AI_ASSISTANT_DEFAULTS,
  AI_WORKFLOW_CLAIMS,
  BIO_FACTS,
  HOW_I_BUILD,
  PROCESS,
  PROJECTS,
  STACK_GROUPS,
} from "../../lib/content";

const MAX_MESSAGE_LENGTH = 900;
const MAX_REQUESTS_PER_WINDOW = 10;
const WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  bucket.count += 1;
  return true;
}

/**
 * Programmatically generate the assistant context from the unified source of truth.
 */
const portfolioContext = `
You are ${BIO_FACTS.name}. This is your personal portfolio, and you are speaking directly to potential clients.
Your goal is to answer questions about your work, capabilities, and process, and ultimately convert high-quality leads.

MISSION:
I turn rough ideas into planned, built, and verified products. I handle everything from strategy to shipping.

CORE RESPONSES (Speak as 'I'):
- Capabilities: ${AI_ASSISTANT_DEFAULTS.responses.capabilities}
- Platforms: ${AI_ASSISTANT_DEFAULTS.responses.multiplatform}

MY BACKGROUND:
${BIO_FACTS.education}
${BIO_FACTS.operator}

MY STACK:
${STACK_GROUPS.map(group => `- ${group.label}: ${group.items.join(", ")}`).join("\n")}

HOW I DELIVER:
${PROCESS.map(p => `${p.step} ${p.title}: ${p.text}`).join("\n")}

MY PROJECTS & PROOF:
${PROJECTS.map(p => `- ${p.name} (${p.statusLabel}, ${p.type}): ${p.detail}`).join("\n")}

MY WORKFLOW:
${HOW_I_BUILD.body.join("\n")}
- ${AI_WORKFLOW_CLAIMS.delivery}
- Tools: ${AI_WORKFLOW_CLAIMS.tools.join(", ")}

CONVERSATION GUIDELINES:
- SPEAK IN THE FIRST PERSON ("I", "my", "me"). Never refer to yourself as "Athar" or "the assistant".
- BE CONCISE. Avoid long preambles.
- BE DIRECT, HUMAN, AND SPECIFIC. Not salesy. Not corporate.
- STAY GROUNDED. Only answer based on facts provided.
- Do not claim public release for unverified products. AuraPOS is live. Block Crush Puzzle is published on the App Store. Handtracking is a completed experiment, not a commercial launch.
- If a user wants to start a project, tell them to use the "Contact" section below.

If asked "Who are you?", answer: "I'm ${BIO_FACTS.shortName}. I'm a product engineer and builder. I help people plan, build, and ship their ideas into real-world applications."
`;

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API key is not configured on the server." },
      { status: 500 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 },
    );
  }

  const { message, history } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Message is required and must be a string." },
      { status: 400 },
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }

  try {
    const client = new OpenAI({ apiKey });
    const safeHistory = Array.isArray(history)
      ? history
          .filter((item) => {
            if (!item || typeof item !== "object") return false;
            const record = item as Record<string, unknown>;
            return (
              (record.role === "user" || record.role === "assistant") &&
              typeof record.content === "string" &&
              record.content.length <= MAX_MESSAGE_LENGTH
            );
          })
          .slice(-10)
          .map((item) => {
            const record = item as { role: "user" | "assistant"; content: string };
            return { role: record.role, content: record.content };
          })
      : [];

    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        { role: "system", content: portfolioContext },
        ...safeHistory,
        { role: "user" as const, content: message },
      ],
      max_tokens: 700,
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "The assistant is currently unavailable." },
      { status: 500 },
    );
  }
}
