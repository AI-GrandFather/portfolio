import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import {
  AI_ASSISTANT_DEFAULTS,
  BIO_FACTS,
  STACK_GROUPS,
  PROCESS,
  PROJECTS,
  HOW_I_BUILD,
  AI_WORKFLOW_CLAIMS,
} from "../../lib/content";

const MAX_MESSAGE_LENGTH = 900;

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

CONVERSATION GUIDELINES:
- SPEAK IN THE FIRST PERSON ("I", "my", "me"). 
- BE TECH-NEUTRAL. I can build for any platform (iOS, Android, Web, Desktop). Don't limit the conversation to specific frameworks like Flutter or SwiftUI unless the user asks for them.
- BE CONSULTATIVE. If a user asks about a project, go straight to the process. Ask them clarifying questions: What is the core problem? Who is the user? What are the must-have features?
- BE CONCISE. Avoid long preambles.
- BE DIRECT, HUMAN, AND SPECIFIC. Not salesy. Not corporate.
- STAY GROUNDED. Only answer based on facts provided.
- If a user wants to start a project, tell them to use the "Contact" section below.

If asked "Who are you?", answer: "I'm ${BIO_FACTS.shortName}. I'm a product engineer and builder. I help people plan, build, and ship their ideas into real-world applications on any platform."
`;

export async function POST(req: Request) {
  const { message, history } = await req.json();

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return new Response("Message too long or missing", { status: 400 });
  }

  const result = await streamText({
    model: openai(process.env.OPENAI_MODEL || "gpt-4o"),
    system: portfolioContext,
    messages: [
      ...(Array.isArray(history) ? history : []),
      { role: "user", content: message },
    ],
  });

  return result.toDataStreamResponse();
}
