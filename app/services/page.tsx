import Link from "next/link";
import { ServiceSection } from "@/components/services/ServiceSection";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { services, servicesIntro } from "@/data/services";
import { whatsappUrl } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import styles from "./services.module.css";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Services built around business outcomes: get more customers, build a digital presence, look more professional, or turn an idea into a working product.",
  path: "/services",
});

export default function ServicesPage() {
  const [lead, ...others] = services;
  return (
    <>
      <PageHero eyebrow={servicesIntro.eyebrow} headline={servicesIntro.headline} lead={servicesIntro.lead} mark>
        <nav aria-label="Jump to a business outcome" className={styles.jump}>
          <p className={styles.jumpLabel}>{servicesIntro.note.title}</p>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`#${service.id}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="section--tight">
        <div className="container">
          <div className={styles.stack}>
            <ServiceSection service={lead} lead />
            <div className={styles.grid}>
              {others.map((service) => (
                <ServiceSection key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight" aria-labelledby="combine-title">
        <div className="container">
          <GlassCard as="div" className={styles.combine}>
            <p className={styles.combineLabel}>{servicesIntro.combine.eyebrow}</p>
            <h2 id="combine-title" className={styles.combineTitle}>{servicesIntro.combine.heading}</h2>
            <p className={styles.combineBody}>{servicesIntro.combine.body}</p>
            <p className={styles.path}>{servicesIntro.combine.path}</p>
            <div>
              <Button href="/process" track="process_click">See how we work</Button>
            </div>
          </GlassCard>
        </div>
      </section>

      <CtaBand
        title="Tell us what you need next."
        body="Start with the free audit. We will review your business and suggest which services matter first."
        actions={
          <>
            <Button href="/contact#free-audit" variant="primary" size="lg" track="free_audit_click">
              Request a free audit
            </Button>
            <Button href={whatsappUrl()} size="lg" track="whatsapp_click">
              <WhatsAppIcon size={18} />
              Discuss my growth
            </Button>
          </>
        }
      />
    </>
  );
}
