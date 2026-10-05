import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { Tracking } from "@/components/analytics/Tracking";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/data/site";
import { isProductionSite } from "@/lib/env";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { bengali, bengaliTaka, jakarta, sora } from "./fonts";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/layout.css";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.positioning}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  // Previews and local builds stay out of search results; only the production site is indexable.
  robots: isProductionSite
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
  icons: {
    icon: [{ url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/assets/ecitizen-avatar-circle-512.png", sizes: "512x512", type: "image/png" }],
  },
  verification: googleVerification ? { google: googleVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable} ${bengaliTaka.variable} ${bengali.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <ConsentBanner />
        <Tracking />
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
