import { clientIp, parseEnquiry, rateLimit, readFields } from "@/lib/contact";

function json(body: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

export async function POST(request: Request) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const webhookAuth = process.env.CONTACT_WEBHOOK_AUTH;

  if (!webhookUrl || !webhookAuth) {
    return json({ ok: false, error: "Contact is not configured." }, 503);
  }

  const limit = rateLimit(clientIp(request));
  if (!limit.ok) {
    return json({ ok: false, error: "Too many messages. Try again later." }, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  let fields: Record<string, string>;
  try {
    fields = await readFields(request);
  } catch {
    return json({ ok: false, error: "Send JSON or a form with name, email, and message." }, 400);
  }

  const parsed = parseEnquiry(fields);
  if ("honeypot" in parsed) return json({ ok: true });
  if ("error" in parsed) return json({ ok: false, error: parsed.error }, 400);

  const { enquiry } = parsed;
  const submittedAt = new Date().toISOString();
  console.log(JSON.stringify({ event: "contact.enquiry", ...enquiry, submittedAt }));

  let webhook: Response;
  try {
    webhook = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: webhookAuth,
      },
      body: JSON.stringify({ ...enquiry, submittedAt }),
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "contact.webhook_failed",
        submittedAt,
        error: error instanceof Error ? error.message : "Webhook request failed.",
      }),
    );
    return json({ ok: false, error: "Could not deliver the enquiry." }, 502);
  }

  if (!webhook.ok) {
    console.error(JSON.stringify({ event: "contact.webhook_failed", submittedAt, status: webhook.status }));
    return json({ ok: false, error: "Could not deliver the enquiry." }, 502);
  }

  return json({ ok: true });
}
