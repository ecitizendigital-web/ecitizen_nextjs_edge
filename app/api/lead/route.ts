import { NextResponse } from "next/server";
import { MIN_FILL_MS, validateLead } from "@/lib/lead";
import { deliverLead } from "@/lib/lead-delivery";
import { allowRequest } from "@/lib/rate-limit";

const MAX_BODY_CHARS = 8 * 1024;

const reply = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * POST /api/lead — receives the free-audit form.
 * Checks, in order: same origin, JSON body, rate limit, size, honeypot, fill time, field validation.
 * The browser validates too, but only this check counts.
 */
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) return reply({ ok: false, code: "forbidden" }, 403);
    } catch {
      return reply({ ok: false, code: "forbidden" }, 403);
    }
  }

  if (!request.headers.get("content-type")?.includes("application/json")) return reply({ ok: false, code: "bad_request" }, 415);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowRequest(`lead:${ip}`)) return reply({ ok: false, code: "rate_limited" }, 429);

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) return reply({ ok: false, code: "too_large" }, 413);

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    payload = parsed as Record<string, unknown>;
  } catch {
    return reply({ ok: false, code: "bad_request" }, 400);
  }

  // Real visitors never see the hidden field. A filled one means a bot, so it gets a quiet "success".
  if (typeof payload.ec_hp === "string" && payload.ec_hp.trim()) return reply({ ok: true });

  if (typeof payload.elapsedMs === "number" && payload.elapsedMs < MIN_FILL_MS) return reply({ ok: false, code: "too_fast" }, 400);

  const result = validateLead(payload);
  if (!result.ok) return reply({ ok: false, code: "invalid", errors: result.errors }, 422);

  const page = typeof payload.page === "string" ? payload.page.slice(0, 200) : "/contact";
  const delivery = await deliverLead({ ...result.data, page, submittedAt: new Date().toISOString() });

  // Never report success for a lead that was not delivered. The form keeps the visitor's details and offers WhatsApp.
  if (!delivery.configured) return reply({ ok: false, code: "not_configured" }, 503);
  if (!delivery.delivered) return reply({ ok: false, code: "delivery_failed" }, 502);
  return reply({ ok: true });
}
