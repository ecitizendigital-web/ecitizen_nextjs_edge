import { Check } from "lucide-react";
import { ComparisonTable } from "@/components/packages/ComparisonTable";
import { PackageRecommender } from "@/components/packages/PackageRecommender";
import { PricingSection } from "@/components/packages/PricingSection";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { GlassCard } from "@/components/ui/GlassCard";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packageNotes, packagesIntro } from "@/data/packages";
import { whatsappUrl } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import styles from "./packages.module.css";

export const metadata = buildMetadata({
  title: "Packages and Pricing",
  description:
    "A one-time Starter setup and monthly packages from Grow to Enterprise, with a visible 25% launch offer. Compare content, advertising, SEO and reporting.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <PageHero eyebrow={packagesIntro.eyebrow} headline={packagesIntro.headline} lead={packagesIntro.lead} />

      <section className="section--tight" aria-label="Packages">
        <div className="container">
          <h2 className="sr-only">Packages</h2>
          <PricingSection />
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <PackageRecommender />
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <SectionHeading id="compare-title" title="Compare the monthly packages" lead="Starter is a one-time setup, so this comparison covers Grow, Professional, Advanced and Enterprise." />
          <ComparisonTable />
        </div>
      </section>

      <section className="section--tight" aria-labelledby="notes-title">
        <div className="container">
          <GlassCard as="div" className={styles.notes}>
            <h2 id="notes-title" className={styles.notesTitle}>Before you choose</h2>
            <ul className={styles.notesList}>
              {packageNotes.map((note) => (
                <li key={note}>
                  <Check size={16} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      <CtaBand
        title="Not sure which package fits?"
        body="Start with the free audit. We will review your business and recommend a starting point."
        actions={
          <>
            <Button href="/contact#free-audit" variant="primary" size="lg" track="free_audit_click">
              Request a free audit
            </Button>
            <Button href={whatsappUrl()} size="lg" track="whatsapp_click">
              <WhatsAppIcon size={18} />
              Ask on WhatsApp
            </Button>
          </>
        }
      />
    </>
  );
}
