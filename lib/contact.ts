const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export type Enquiry = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    return { ok: false as const, retryAfter };
  }
  recent.push(now);
  hits.set(ip, recent);
  return { ok: true as const };
}

export async function readFields(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("Expected a JSON object.");
    }
    return Object.fromEntries(
      Object.entries(body).map(([key, value]) => [key, typeof value === "string" ? value : ""]),
    );
  }

  const form = await request.formData();
  const fields: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") fields[key] = value;
  }
  return fields;
}

export function parseEnquiry(fields: Record<string, string>) {
  if ((fields.website ?? "").trim()) return { honeypot: true as const };

  const name = (fields.name ?? "").trim();
  const email = (fields.email ?? "").trim();
  const company = (fields.company ?? "").trim();
  const message = (fields.message ?? "").trim();

  if (!name || name.length > 120) return { error: "Name is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { error: "A valid email is required." };
  }
  if (company.length > 160) return { error: "Company is too long." };
  if (!message || message.length > 5000) return { error: "Message is required." };

  const enquiry: Enquiry = { name, email, message };
  if (company) enquiry.company = company;
  return { enquiry };
}
