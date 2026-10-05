import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { Badge } from "./Badge";
import styles from "./PageHero.module.css";

type Props = {
  eyebrow: string;
  /** Each entry is shown on its own line on wide screens. */
  headline: readonly string[];
  lead: ReactNode;
  /** Large, faint brand mark behind the heading. Used once, on the services page. */
  mark?: boolean;
  children?: ReactNode;
};

export function PageHero({ eyebrow, headline, lead, mark, children }: Props) {
  return (
    <section className={styles.hero}>
      {mark ? (
        <Image
          className={styles.mark}
          src={site.assets.mark.src}
          alt=""
          width={site.assets.mark.width}
          height={site.assets.mark.height}
          sizes="320px"
        />
      ) : null}
      <div className={`container ${styles.inner}`}>
        <Badge tone="accent">{eyebrow}</Badge>
        <h1 className={styles.title}>
          {headline.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h1>
        <p className={styles.lead}>{lead}</p>
        {children ? <div className={styles.extra}>{children}</div> : null}
      </div>
    </section>
  );
}
