import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

const ALLOWED_PLATFORMS = [
  "Mobile App",
  "Web App / SaaS",
  "iOS / Apple Platform",
  "Game",
  "AI Integration",
  "Internal Tool",
  "Other",
];

const ALLOWED_TIMELINES = [
  "Under 1 month",
  "1-3 months",
  "3-6 months",
  "Flexible / Not yet decided",
];

const ALLOWED_BUDGETS = [
  "Under $5K",
  "$5K - $15K",
  "$15K - $50K",
  "$50K+",
  "Let's discuss",
];

type ContactPayload = {
  name: string;
  email: string;
  building: string;
  platform: string;
  timeline: string;
  budget: string;
  source?: string;
  website?: string;
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
    building: getString(record, "building"),
    platform: getString(record, "platform"),
    timeline: getString(record, "timeline"),
    budget: getString(record, "budget"),
    source: getString(record, "source"),
    website: getString(record, "website"),
  };

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (
    !payload.name ||
    !isEmail(payload.email) ||
    !payload.building ||
    !payload.platform ||
    !payload.timeline ||
    !payload.budget
  ) {
    return NextResponse.json(
      { error: "Please complete every required field with a valid email address." },
      { status: 400 },
    );
  }

  if (!ALLOWED_PLATFORMS.includes(payload.platform)) {
    return NextResponse.json({ error: "Invalid platform." }, { status: 400 });
  }

  if (!ALLOWED_TIMELINES.includes(payload.timeline)) {
    return NextResponse.json({ error: "Invalid timeline." }, { status: 400 });
  }

  if (!ALLOWED_BUDGETS.includes(payload.budget)) {
    return NextResponse.json({ error: "Invalid budget range." }, { status: 400 });
  }

  if (
    payload.name.length > 100 ||
    payload.email.length > 120 ||
    payload.building.length < 10 ||
    payload.building.length > 2000 ||
    (payload.source && payload.source.length > 200)
  ) {
    return NextResponse.json(
      { error: "One or more fields is outside the allowed length." },
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
      subject: `Portfolio lead: ${payload.platform}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Building: ${payload.building}`,
        `Platform: ${payload.platform}`,
        `Timeline: ${payload.timeline}`,
        `Budget: ${payload.budget}`,
        payload.source ? `Source: ${payload.source}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Email me directly: atharmushtaq9@gmail.com" },
      { status: 502 },
    );
  }
}
