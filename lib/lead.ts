import { auditFocusOptions, goalOptions, NO_PACKAGE, packageOptions } from "@/data/audit";

/** Shared by the browser (instant feedback) and the API route (the check that actually counts). */
export type LeadInput = {
  name: string;
  phone: string;
  business: string;
  businessType: string;
  website: string;
  auditFocus: string;
  goal: string;
  /** Package the visitor picked on /packages, or NO_PACKAGE. */
  pick: string;
  message: string;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;
export type LeadResult = { ok: true; data: LeadInput } | { ok: false; errors: LeadErrors };

export const LEAD_LIMITS = { name: 80, business: 100, businessType: 80, website: 300, message: 1500 } as const;
export const MIN_FILL_MS = 1500;

const clean = (value: unknown, max: number): string =>
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max + 1) : "";

export function normalizeWebsite(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidWebsite(value: string): boolean {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

/** Bangladesh mobile numbers (01XXXXXXXXX, +8801XXXXXXXXX) or any international number with a country code. */
export function isValidPhone(value: string): boolean {
  const compact = value.replace(/[\s().-]/g, "");
  if (!/^\+?\d+$/.test(compact)) return false;
  const digits = compact.replace(/^\+/, "");
  if (/^(?:880|0)?1[3-9]\d{8}$/.test(digits)) return true;
  return compact.startsWith("+") && digits.length >= 8 && digits.length <= 15;
}

export function validateLead(raw: Record<string, unknown>): LeadResult {
  const errors: LeadErrors = {};
  const name = clean(raw.name, LEAD_LIMITS.name);
  const phone = clean(raw.phone, 30);
  const business = clean(raw.business, LEAD_LIMITS.business);
  const businessType = clean(raw.businessType, LEAD_LIMITS.businessType);
  const websiteRaw = clean(raw.website, LEAD_LIMITS.website);
  const auditFocus = clean(raw.auditFocus, 80);
  const goal = clean(raw.goal, 80);
  const pickRaw = clean(raw.pick, 40);
  const message = clean(raw.message, LEAD_LIMITS.message);

  if (!name) errors.name = "Enter your name.";
  else if (name.length < 2) errors.name = "Enter your full name.";
  else if (name.length > LEAD_LIMITS.name) errors.name = `Keep your name under ${LEAD_LIMITS.name} characters.`;

  if (!phone) errors.phone = "Enter a phone number we can call or message on WhatsApp.";
  else if (!isValidPhone(phone)) errors.phone = "Use a Bangladesh mobile number like 01XXXXXXXXX, or add your country code, like +44.";

  if (!business) errors.business = "Enter your business name.";
  else if (business.length > LEAD_LIMITS.business) errors.business = `Keep this under ${LEAD_LIMITS.business} characters.`;

  if (businessType.length > LEAD_LIMITS.businessType) errors.businessType = `Keep this under ${LEAD_LIMITS.businessType} characters.`;

  const website = normalizeWebsite(websiteRaw);
  if (website && (website.length > LEAD_LIMITS.website || !isValidWebsite(website))) {
    errors.website = "Enter a full link like https://facebook.com/yourpage, or leave this blank.";
  }

  if (!(auditFocusOptions as readonly string[]).includes(auditFocus)) errors.auditFocus = "Choose what we should review.";
  if (!(goalOptions as readonly string[]).includes(goal)) errors.goal = "Choose your main goal.";
  if (message.length > LEAD_LIMITS.message) errors.message = `Keep your message under ${LEAD_LIMITS.message.toLocaleString("en-US")} characters.`;

  if (Object.keys(errors).length) return { ok: false, errors };

  const pick = (packageOptions as readonly string[]).includes(pickRaw) ? pickRaw : NO_PACKAGE;
  return { ok: true, data: { name, phone, business, businessType, website, auditFocus, goal, pick, message } };
}

/** Same wording as the V6 site's WhatsApp fallback, so no lead is lost when the form cannot be sent. */
export function buildWhatsAppMessage(lead: Partial<LeadInput>): string {
  const lines = [
    `Hello eCitizen Digital, I'm ${lead.name || "a business owner"}${lead.business ? ` from ${lead.business}` : ""}.`,
    `Free audit request: ${lead.auditFocus || "overall digital presence"}. Goal: ${lead.goal || "not sure yet"}.`,
  ];
  if (lead.pick && lead.pick !== NO_PACKAGE) lines.push(`Interested in: ${lead.pick}`);
  if (lead.website) lines.push(`Website / page: ${lead.website}`);
  if (lead.message) lines.push(lead.message);
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  return lines.join("\n");
}
