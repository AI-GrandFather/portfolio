import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

const ALLOWED_PROJECT_TYPES = [
  "Mobile App (Flutter/iOS)",
  "Web App or SaaS",
  "AI Agent / MCP Server",
  "Business Dashboard",
  "Game Development",
  "Other",
];

const ALLOWED_BUDGETS = [
  "Exploring",
  "Under $2,500",
  "$2,500 - $10,000",
  "$10,000+",
];

type ContactPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  website?: string; // Honeypot field
};

function getString(body: Record<string, unknown>, key: keyof ContactPayload) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

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

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many contact attempts. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid contact payload." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const payload: ContactPayload = {
    name: getString(record, "name"),
    email: getString(record, "email"),
    projectType: getString(record, "projectType"),
    budget: getString(record, "budget"),
    message: getString(record, "message"),
    website: getString(record, "website"),
  };

  // Honeypot check
  if (payload.website) {
    console.warn(`Honeypot triggered from IP: ${ip}`);
    return NextResponse.json({ ok: true }); // Silently ignore bot
  }

  if (
    !payload.name ||
    !isEmail(payload.email) ||
    !payload.projectType ||
    !payload.budget ||
    !payload.message
  ) {
    return NextResponse.json(
      { error: "Please complete every field with a valid email address." },
      { status: 400 },
    );
  }

  // Allowlist validation
  if (!ALLOWED_PROJECT_TYPES.includes(payload.projectType)) {
    return NextResponse.json({ error: "Invalid project type." }, { status: 400 });
  }
  if (!ALLOWED_BUDGETS.includes(payload.budget)) {
    return NextResponse.json({ error: "Invalid budget range." }, { status: 400 });
  }

  if (
    payload.name.length > 80 ||
    payload.email.length > 120 ||
    payload.message.length > 1800
  ) {
    return NextResponse.json(
      { error: "One or more fields is longer than allowed." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Contact email is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `Portfolio lead: ${payload.projectType}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Project type: ${payload.projectType}`,
        `Budget: ${payload.budget}`,
        "",
        payload.message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: "Could not send the contact email right now. Please try again later." },
      { status: 502 },
    );
  }
}
