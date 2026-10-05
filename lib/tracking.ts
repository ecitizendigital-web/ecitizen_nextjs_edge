/** Public analytics IDs (these are not secrets). Leave a variable empty to switch that tool off. */
const safeId = (value: string | undefined): string => (value && /^[A-Za-z0-9_-]+$/.test(value) ? value : "");

// NEXT_PUBLIC_* values must be read as plain property accesses so Next.js can inline them.
export const trackingIds = {
  ga4: safeId(process.env.NEXT_PUBLIC_GA4_ID),
  gtm: safeId(process.env.NEXT_PUBLIC_GTM_ID),
  metaPixel: safeId(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  tiktok: safeId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID),
} as const;

export const trackingConfigured = Object.values(trackingIds).some(Boolean);

type Fn = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Fn;
    fbq?: Fn;
    ttq?: { page: () => void };
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

/** Sends a named event to whichever tools are loaded. Does nothing before consent. */
export function trackEvent(name: string, options: { metaStandard?: string } = {}): void {
  if (typeof window === "undefined") return;
  if (window.gtag && trackingIds.ga4 && !trackingIds.gtm) window.gtag("event", name);
  if (window.dataLayer && trackingIds.gtm) window.dataLayer.push({ event: name });
  if (window.fbq && trackingIds.metaPixel) {
    if (options.metaStandard) window.fbq("track", options.metaStandard);
    else window.fbq("trackCustom", name);
  }
}
