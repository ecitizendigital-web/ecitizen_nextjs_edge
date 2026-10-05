export const formatBdt = (amount: number): string => `৳${Math.round(amount).toLocaleString("en-US")}`;

/** "02 October 2026" — fixed to UTC so the date never shifts with the server's time zone. */
export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
