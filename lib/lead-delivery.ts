import type { LeadInput } from "@/lib/lead";

export type LeadRecord = LeadInput & { page: string; submittedAt: string };
export type DeliveryResult = { configured: boolean; delivered: boolean };

const TIMEOUT_MS = 8000;

async function sendWebhook(lead: LeadRecord): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(secret ? { "X-Lead-Secret": secret } : {}) },
    body: JSON.stringify({ source: "ecitizen-digital-website", intent: "free_audit", ...lead }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return response.ok;
}

async function sendEmail(lead: LeadRecord): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!apiKey || !to || !from) return false;
  const lines = [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Business: ${lead.business}${lead.businessType ? ` (${lead.businessType})` : ""}`,
    `Website / page: ${lead.website || "-"}`,
    `Review: ${lead.auditFocus}`,
    `Goal: ${lead.goal}`,
    `Package interest: ${lead.pick}`,
    `Message: ${lead.message || "-"}`,
    `Sent from: ${lead.page}`,
    `Sent at: ${lead.submittedAt}`,
  ];
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()).filter(Boolean),
      subject: `Free audit request: ${lead.business}`,
      text: lines.join("\n"),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return response.ok;
}

/** A lead counts as delivered when at least one configured channel accepted it. */
export async function deliverLead(lead: LeadRecord): Promise<DeliveryResult> {
  const configured = Boolean(process.env.LEAD_WEBHOOK_URL) || Boolean(process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO && process.env.LEAD_EMAIL_FROM);
  if (!configured) return { configured: false, delivered: false };

  const results = await Promise.allSettled([sendWebhook(lead), sendEmail(lead)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value);
  if (!delivered) {
    for (const r of results) if (r.status === "rejected") console.error("[lead] delivery channel failed:", r.reason instanceof Error ? r.reason.message : "unknown error");
  }
  return { configured: true, delivered };
}
