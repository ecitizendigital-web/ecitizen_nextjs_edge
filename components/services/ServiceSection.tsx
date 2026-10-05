import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { getService, type Service } from "@/data/services";
import { ServiceIcon } from "./ServiceIcon";
import styles from "./ServiceSection.module.css";

type Props = { service: Service; lead?: boolean };

/** One business outcome with everything a buyer needs: what we do, who it is for, what they get. */
export function ServiceSection({ service, lead = false }: Props) {
  const related = service.related.map(getService).filter((item): item is Service => Boolean(item));
  return (
    <GlassCard as="section" id={service.id} highlighted={lead} className={`${styles.card} ${lead ? styles.lead : ""}`} aria-labelledby={`service-${service.id}`}>
      <div className={styles.head}>
        <span className={styles.icon}>
          <ServiceIcon id={service.id} size={26} />
        </span>
        <div>
          <p className={styles.kicker}>{service.headline}</p>
          <h2 id={`service-${service.id}`} className={styles.name}>{service.name}</h2>
        </div>
      </div>

      <div className={styles.copy}>
        <p className={styles.description}>{service.description}</p>
        <p className={styles.detail}>{service.detail}</p>
      </div>

      <dl className={styles.facts}>
        <div>
          <dt>Who it is for</dt>
          <dd>{service.idealFor}</dd>
        </div>
        <div>
          <dt>The business outcome</dt>
          <dd>{service.outcome}</dd>
        </div>
      </dl>

      <div className={styles.deliver}>
        <h3 className={styles.sub}>What we deliver</h3>
        <ul className={styles.list}>
          {service.deliverables.map((item) => (
            <li key={item}>
              <Check size={16} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.foot}>
        <Button
          href={`/contact?goal=${encodeURIComponent(service.auditGoal)}#free-audit`}
          variant={lead ? "primary" : "secondary"}
          track={service.track}
        >
          {service.cta}
        </Button>
        {related.length ? (
          <p className={styles.related}>
            Often combined with{" "}
            {related.map((item, index) => (
              <span key={item.id}>
                {index > 0 ? " and " : null}
                <Link href={`#${item.id}`}>{item.name}</Link>
              </span>
            ))}
            .
          </p>
        ) : null}
      </div>
    </GlassCard>
  );
}
