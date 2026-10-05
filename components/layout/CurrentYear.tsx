"use client";

/** The year is read in the browser, so a page built last December still shows the right year in January. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
