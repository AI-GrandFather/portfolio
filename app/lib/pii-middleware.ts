export type RedactionType =
  | "address"
  | "credit-card"
  | "email"
  | "image"
  | "private-key"
  | "secret"
  | "token"
  | "phone";

export type RedactionSummary = Partial<Record<RedactionType, number>>;

export interface RedactionResult {
  text: string;
  redactions: RedactionSummary;
}

const BLOCKED_TYPES = new Set<RedactionType>([
  "credit-card",
  "private-key",
  "secret",
  "token",
]);

const REDACTION_PATTERNS: Array<{
  type: RedactionType;
  replacement: string;
  pattern: RegExp;
}> = [
  {
    type: "image",
    replacement: "[redacted image]",
    pattern: /data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/=]+/gi,
  },
  {
    type: "image",
    replacement: "[redacted image]",
    pattern: /!\[[^\]]*]\([^)]+\)/g,
  },
  {
    type: "image",
    replacement: "[redacted image]",
    pattern: /https?:\/\/[^\s)]+?\.(?:png|jpe?g|gif|webp|svg)(?:\?[^\s)]*)?/gi,
  },
  {
    type: "private-key",
    replacement: "[redacted private key]",
    pattern: /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g,
  },
  {
    type: "secret",
    replacement: "[redacted secret]",
    pattern: /\b(?:sk|rk|pk|whsec|xox[baprs]|gh[pousr]|glpat|AKIA|ASIA)[A-Za-z0-9_\-]{12,}\b/g,
  },
  {
    type: "token",
    replacement: "[redacted token]",
    pattern: /\beyJ[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\b/g,
  },
  {
    type: "credit-card",
    replacement: "[redacted card]",
    pattern: /\b(?:\d[ -]*?){13,19}\b/g,
  },
  {
    type: "email",
    replacement: "[redacted email]",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  },
  {
    type: "phone",
    replacement: "[redacted phone]",
    pattern: /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{4}\b/g,
  },
  {
    type: "address",
    replacement: "[redacted address]",
    pattern: /\b\d{1,6}\s+[A-Za-z0-9.'-]+(?:\s+[A-Za-z0-9.'-]+){0,5}\s+(?:street|st|road|rd|avenue|ave|lane|ln|drive|dr|boulevard|blvd|way|court|ct|block|sector|phase)\b/gi,
  },
];

function addRedaction(summary: RedactionSummary, type: RedactionType) {
  summary[type] = (summary[type] ?? 0) + 1;
}

export function redactSensitiveInput(input: string): RedactionResult {
  const redactions: RedactionSummary = {};
  let text = input;

  for (const { type, replacement, pattern } of REDACTION_PATTERNS) {
    text = text.replace(pattern, () => {
      addRedaction(redactions, type);
      return replacement;
    });
  }

  return { text, redactions };
}

export function hasRedactions(redactions: RedactionSummary): boolean {
  return Object.values(redactions).some((count) => Boolean(count));
}

export function hasBlockedSensitiveInput(redactions: RedactionSummary): boolean {
  return Object.entries(redactions).some(
    ([type, count]) => BLOCKED_TYPES.has(type as RedactionType) && Boolean(count),
  );
}
