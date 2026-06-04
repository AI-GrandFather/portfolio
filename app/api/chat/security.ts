/**
 * AI Chat Security & Cost Guardrails
 * 
 * This utility provides input validation, rate limiting, cost estimation,
 * and usage tracking for the AI chat endpoint.
 */

export const SECURITY_CONFIG = {
  MAX_INPUT_CHARS: 3000,
  MAX_MESSAGES_SENT_TO_MODEL: 10,
  MAX_OUTPUT_TOKENS: 700,
  TEMPERATURE: 0.5,
  
  // Daily caps (USD)
  DAILY_USER_COST_CAP: 0.15, // Cap per IP/Session
  DAILY_GLOBAL_COST_CAP: 5.00, // Total app cap per day
  
  // Rate limits
  BURST_LIMIT: 3, // Messages per minute
  DAILY_LIMIT: 12, // Messages per day per IP
};

const MODEL_PRICING = {
  // Conservative pricing for high-end models (e.g., GPT-4o)
  inputPerMillion: 5.00,
  outputPerMillion: 15.00,
};

// In-memory usage store (Note: This will reset on server restart/deployment)
// Production should use Redis (Upstash/Vercel KV), Supabase, or another persistent store.
const usageStore = new Map<string, {
  count: number;
  cost: number;
  lastReset: string; // YYYY-MM-DD
  lastRequest: number; // timestamp
  minuteCount: number;
  minuteReset: number; // timestamp
}>();

// Global usage store
let globalUsage = {
  cost: 0,
  lastReset: new Date().toISOString().split('T')[0]
};

/**
 * Estimates tokens from character count (rough approximation)
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Calculates cost in USD
 */
export function calculateCost(inputTokens: number, outputTokens: number): number {
  const inputCost = (inputTokens / 1_000_000) * MODEL_PRICING.inputPerMillion;
  const outputCost = (outputTokens / 1_000_000) * MODEL_PRICING.outputPerMillion;
  return inputCost + outputCost;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Validates the incoming chat request
 */
export async function validateRequest(messages: unknown) {
  if (!messages || !Array.isArray(messages)) {
    return { valid: false, error: "Invalid messages format", status: 400 };
  }

  // Type assertion for initial loose check
  const rawMessages = messages as { role: string; content: string }[];

  if (rawMessages.length === 0) {
    return { valid: false, error: "Empty conversation", status: 400 };
  }

  // Validate last message
  const lastMessage = rawMessages[rawMessages.length - 1];
  if (!lastMessage || typeof lastMessage.content !== 'string') {
    return { valid: false, error: "Malformed last message", status: 400 };
  }

  const trimmedContent = lastMessage.content.trim();
  if (!trimmedContent) {
    return { valid: false, error: "Empty message", status: 400 };
  }

  if (trimmedContent.length > SECURITY_CONFIG.MAX_INPUT_CHARS) {
    return { valid: false, error: "Message too long. Please keep it under 3000 characters.", status: 400 };
  }

  // Sanitize messages: Only keep supported roles and content, properly typed
  const sanitizedMessages: ChatMessage[] = rawMessages.map(msg => ({
    role: (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system') 
          ? (msg.role as "user" | "assistant" | "system") 
          : "user",
    content: typeof msg.content === 'string' ? msg.content.substring(0, SECURITY_CONFIG.MAX_INPUT_CHARS) : ''
  })).filter(msg => msg.content.length > 0);

  // Truncate history
  const history = sanitizedMessages.slice(-SECURITY_CONFIG.MAX_MESSAGES_SENT_TO_MODEL);

  return { valid: true, history };
}



/**
 * Checks and updates rate limits and costs
 */
export function checkLimits(ip: string, inputTokens: number) {
  const today = new Date().toISOString().split('T')[0];
  const now = Date.now();
  
  // Reset global usage if day changed
  if (globalUsage.lastReset !== today) {
    globalUsage = { cost: 0, lastReset: today };
  }

  if (globalUsage.cost >= SECURITY_CONFIG.DAILY_GLOBAL_COST_CAP) {
    return { allowed: false, error: "The assistant is temporarily at capacity. Please try again tomorrow.", status: 429 };
  }

  let userUsage = usageStore.get(ip);

  // Initialize or reset user usage
  if (!userUsage || userUsage.lastReset !== today) {
    userUsage = {
      count: 0,
      cost: 0,
      lastReset: today,
      lastRequest: 0,
      minuteCount: 0,
      minuteReset: now
    };
  }

  // Burst limit check (per minute)
  if (now - userUsage.minuteReset > 60000) {
    userUsage.minuteCount = 0;
    userUsage.minuteReset = now;
  }
  
  if (userUsage.minuteCount >= SECURITY_CONFIG.BURST_LIMIT) {
    return { allowed: false, error: "Too many messages. Please wait a minute.", status: 429 };
  }

  // Daily message count limit
  if (userUsage.count >= SECURITY_CONFIG.DAILY_LIMIT) {
    return { allowed: false, error: "Daily limit reached. Please use the contact form for project inquiries.", status: 429 };
  }

  // Cost cap check
  if (userUsage.cost >= SECURITY_CONFIG.DAILY_USER_COST_CAP) {
    return { allowed: false, error: "Daily chat capacity reached. Please try again tomorrow.", status: 429 };
  }

  // Pre-calculate estimated cost (input + max output)
  const estimatedCost = calculateCost(inputTokens, SECURITY_CONFIG.MAX_OUTPUT_TOKENS);
  
  if (userUsage.cost + estimatedCost > SECURITY_CONFIG.DAILY_USER_COST_CAP) {
    // We allow it if they are close but technically we could block. 
    // For simplicity, we'll let it pass but cap the next one.
  }

  // Update counters (will be refined after response)
  userUsage.count += 1;
  userUsage.minuteCount += 1;
  userUsage.lastRequest = now;
  usageStore.set(ip, userUsage);

  return { allowed: true, userUsage };
}

/**
 * Updates the actual cost after a successful completion
 */
export function updateFinalUsage(ip: string, inputTokens: number, outputTokens: number) {
  const actualCost = calculateCost(inputTokens, outputTokens);
  const userUsage = usageStore.get(ip);
  const today = new Date().toISOString().split('T')[0];

  if (userUsage && userUsage.lastReset === today) {
    userUsage.cost += actualCost;
    usageStore.set(ip, userUsage);
  }

  if (globalUsage.lastReset === today) {
    globalUsage.cost += actualCost;
  }
}
