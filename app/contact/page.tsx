import { Suspense } from "react";
import { AuditAside } from "@/components/contact/AuditAside";
import { LeadForm } from "@/components/contact/LeadForm";
import { LeadFormWithPick } from "@/components/contact/LeadFormWithPick";
import { GlassCard } from "@/components/ui/GlassCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { auditIntro } from "@/data/audit";
import { contactPageLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import styles from "./contact.module.css";

export const metadata = buildMetadata({
  title: "Free Digital Audit",
  description:
    "Request a free digital audit. We review visibility, trust, conversion and foundation, then contact you with practical next steps.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageLd()} />
      <PageHero eyebrow={auditIntro.eyebrow} headline={auditIntro.headline} lead={auditIntro.lead} />

      <section className="section--tight" id="free-audit" aria-labelledby="form-title">
        <div className={`container ${styles.layout}`}>
          <GlassCard as="div" highlighted className={styles.formCard}>
            <h2 id="form-title" className={styles.formTitle}>Request your free audit</h2>
            {/* The form is rendered on the server as the fallback, then swapped for the version that reads ?pick= and ?goal=. */}
            <Suspense fallback={<LeadForm />}>
              <LeadFormWithPick />
            </Suspense>
          </GlassCard>
          <AuditAside />
        </div>
      </section>
    </>
  );
}
