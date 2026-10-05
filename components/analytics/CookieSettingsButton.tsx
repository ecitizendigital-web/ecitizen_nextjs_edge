"use client";

import { openCookieSettings } from "@/lib/consent";

/** Reopens the measurement choice. Used in the footer and on the cookie page. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings} style={className ? undefined : { color: "var(--accent-bright)", textDecoration: "underline", background: "none", border: 0, padding: 0, font: "inherit" }}>
      Cookie settings
    </button>
  );
}
