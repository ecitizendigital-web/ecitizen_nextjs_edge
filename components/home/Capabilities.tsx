import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilitiesIntro } from "@/data/home";
import { disciplines, getService } from "@/data/services";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  return (
    <section className="section--tight" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeading id="capabilities-title" title={capabilitiesIntro.heading} lead={capabilitiesIntro.lead} />
        <GlassCard as="div" className={styles.panel}>
          <ul className={styles.cols}>
            {disciplines.map((discipline) => (
              <li key={discipline.id} className={styles.col}>
                <h3 className={styles.name}>{discipline.name}</h3>
                <p className={styles.text}>{discipline.description}</p>
                <ul className={styles.links}>
                  {discipline.serviceIds.map((id) => {
                    const service = getService(id);
                    return service ? (
                      <li key={id}>
                        <Link href={`/services#${id}`}>{service.name}</Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </section>
  );
}
