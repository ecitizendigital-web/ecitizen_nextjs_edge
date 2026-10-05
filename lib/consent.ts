/** Tiny external store for the visitor's measurement choice, read with useSyncExternalStore. */
export type ConsentStatus = "granted" | "declined" | "unset";

// Same key as the V6 site, so existing visitors keep their saved choice.
const STORAGE_KEY = "ec_tracking_consent";
const listeners = new Set<() => void>();
let settingsOpen = false;

const emit = () => listeners.forEach((listener) => listener());

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getConsent(): ConsentStatus {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "declined" ? value : "unset";
  } catch {
    return "unset";
  }
}

export function setConsent(value: "granted" | "declined"): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* Storage can be blocked. The choice then applies to this page view only. */
  }
  settingsOpen = false;
  emit();
}

export const getSettingsOpen = (): boolean => settingsOpen;

export function openCookieSettings(): void {
  settingsOpen = true;
  emit();
}

export function closeCookieSettings(): void {
  settingsOpen = false;
  emit();
}
