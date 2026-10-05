import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesPreviewIntro } from "@/data/home";
import { services } from "@/data/services";
import styles from "./ServicesPreview.module.css";

export function ServicesPreview() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          title={servicesPreviewIntro.heading}
          lead={servicesPreviewIntro.lead}
          action={
            <Button href="/services" variant="secondary" track="services_click">
              Explore services
            </Button>
          }
        />
        <ul className={styles.grid}>
          {services.map((service, index) => (
            <li key={service.id}>
              <MotionReveal delay={index * 70} className={styles.reveal}>
                <GlassCard as="article" interactive className={styles.card}>
                  <span className={styles.icon}>
                    <ServiceIcon id={service.id} />
                  </span>
                  <h3 className={styles.name}>{service.name}</h3>
                  <p className={styles.summary}>{service.summary}</p>
                  <ul className={styles.tags}>
                    {service.deliverables.slice(0, 4).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href={`/services#${service.id}`} className={styles.link} aria-label={`Explore services: ${service.name}`}>
                    Explore services
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </GlassCard>
              </MotionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
