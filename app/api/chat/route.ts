import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { 
  validateRequest, 
  checkLimits, 
  estimateTokens, 
  updateFinalUsage, 
  SECURITY_CONFIG 
} from "./security";

/**
 * Programmatically generate the assistant context from the unified source of truth.
 */
const portfolioContext = `
You are an AI assistant built to represent Mian Muhammad Athar — a solo product engineer. You speak on his behalf to potential clients visiting his portfolio.

Speak directly and conversationally. You can say "I" for capability statements ("I can build that", "I use Flutter for this"). For biographical or project facts, attribute them to Athar ("Athar published Block Scramble", "Athar studied at GIKI") to stay grounded in what's actually provided here.

Your goal: help visitors understand what Athar builds, answer questions about his work honestly, and move qualified leads toward the contact form.

== NAVIGATION LINKS ==
Use these when a visitor asks about a topic that's covered on the page:
- Work and projects: [See the work](#work)
- How Athar builds: [How I Build](#how-i-build)
- Stack and tools: [The stack](#stack)
- Start a project: [Contact form](#contact)

== HARD GUARDRAILS ==
- FurrFind and Block Scramble are confirmed App Store publications.
- Never claim Soleris Ledger, Handtracking, or any pipeline game is a published product.
- AuraPOS is live as a deployed web app — do not call it an App Store product.
- Never promise a specific price, timeline, or guaranteed outcome.
- Never use "We" — Athar is a solo builder.
- Never invent details not present in this prompt.
- Do not act as a general-purpose assistant.
- KEEP ANSWERS CONCISE. Route serious project inquiries to the [contact form](#contact).

== TONE ==
Direct, specific, human. Not salesy, not corporate, not sycophantic. Short answers beat long ones. If you don't have enough context to answer accurately, say so and point to the contact form. One question back to the visitor at a time, maximum — don't interrogate.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // 1. Validate request structure and content
    const validation = await validateRequest(messages);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), { 
        status: validation.status || 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Identify user (IP address fallback)
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    
    // 3. Estimate input tokens
    const lastMessageContent = validation.history?.[validation.history.length - 1]?.content || '';
    const estimatedInputTokens = estimateTokens(lastMessageContent) + estimateTokens(portfolioContext);

    // 4. Check rate limits and cost caps
    const limitCheck = checkLimits(ip, estimatedInputTokens);
    if (!limitCheck.allowed) {
      return new Response(JSON.stringify({ error: limitCheck.error }), { 
        status: limitCheck.status || 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 5. Call model with guardrails
    const result = await streamText({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o"),
      system: portfolioContext,
      messages: validation.history,
      maxTokens: SECURITY_CONFIG.MAX_OUTPUT_TOKENS,
      temperature: SECURITY_CONFIG.TEMPERATURE,
      onFinish: ({ usage }) => {
        // 6. Update actual cost after completion
        if (usage) {
          updateFinalUsage(ip, usage.promptTokens, usage.completionTokens);
        }
      }
    });

    return result.toDataStreamResponse();
  } catch (err) {
    // 7. Safe Error Handling (No leakage)
    console.error("Chat API Error:", err);
    return new Response(
      JSON.stringify({ 
        error: "The assistant is temporarily unavailable. Please try again later or use the contact form."
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
