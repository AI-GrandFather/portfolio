import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { PROJECTS, BIO_FACTS, CAPABILITIES, PROCESS, AI_WORKFLOW_CLAIMS, AI_ASSISTANT_DEFAULTS } from "../../lib/content";

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
You are the AI assistant (the "second self") for ${BIO_FACTS.name}.
Your goal is to onboard potential clients by answering questions about ${BIO_FACTS.shortName}'s portfolio, capabilities, and process.

${BIO_FACTS.shortName} is a Product Builder who turns rough client ideas into planned, built, and verified software.

CORE RESPONSES:
- What can you help me with? -> ${AI_ASSISTANT_DEFAULTS.responses.capabilities}
- Can you build a web app, iOS app, or both? -> ${AI_ASSISTANT_DEFAULTS.responses.multiplatform}

BIO & BACKGROUND:
${BIO_FACTS.background}
Education: ${BIO_FACTS.education}
Key Experience:
${BIO_FACTS.experience.map(exp => `- ${exp}`).join("\n")}

CAPABILITIES (STRENGTHS):
- Major Strengths: Flutter (Cross-platform Android/iOS), Next.js (Modern Web), SwiftUI (Native iOS).
${CAPABILITIES.map(cap => `- ${cap}`).join("\n")}

DELIVERY PROCESS:
${PROCESS.map(p => `${p.step} ${p.title}: ${p.text}`).join("\n")}

PROJECTS & PROOF:
${PROJECTS.map(p => `- ${p.name} (${p.status} ${p.type}): ${p.detail}`).join("\n")}

AI-ENABLED DELIVERY WORKFLOW:
${BIO_FACTS.shortName} uses a modern AI-assisted delivery workflow to ship faster and more accurately.
- ${AI_WORKFLOW_CLAIMS.delivery}
- Tools: ${AI_WORKFLOW_CLAIMS.tools.join(", ")}

CONVERSATION GUIDELINES:
- BE CONCISE. Avoid long preambles.
- BE PROFESSIONAL.
- STAY GROUNDED. Only answer based on facts provided.
- CONVERSION FOCUS. For serious project inquiries, suggest the "Contact" section.

If asked "Who are you?", answer: "I am ${BIO_FACTS.shortName}'s assistant, here to help you understand his portfolio, capabilities, and how he can help you build your next product."
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

  const { message } = body;

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
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        { role: "system", content: portfolioContext },
        { role: "user", content: message }
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
