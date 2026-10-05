import localFont from "next/font/local";

/** Self-hosted variable fonts: no request to Google at build or run time. */
export const sora = localFont({
  src: "./fonts/sora-latin.woff2",
  weight: "100 800",
  variable: "--font-sora",
  display: "swap",
});

export const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});

/** Only the taka sign (৳). About 1 KB, so price pages never download the full Bangla font. */
export const bengaliTaka = localFont({
  src: "./fonts/noto-sans-bengali-taka.woff2",
  weight: "100 900",
  variable: "--font-bn-taka",
  display: "swap",
  preload: false,
});

/** Full Bangla glyphs. The browser fetches it only when Bangla text is on the page (the Kishoreganj insights). */
export const bengali = localFont({
  src: "./fonts/noto-sans-bengali.woff2",
  weight: "100 900",
  variable: "--font-bn",
  display: "swap",
  preload: false,
});
