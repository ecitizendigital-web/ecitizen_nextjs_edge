import type { ReactNode } from "react";
import { GlassCard } from "./GlassCard";
import styles from "./CtaBand.module.css";

type Props = { title: string; body: ReactNode; actions: ReactNode; note?: ReactNode };

/** The closing call to action used at the end of most pages. */
export function CtaBand({ title, body, actions, note }: Props) {
  return (
    <section className="section--tight">
      <div className="container">
        <GlassCard as="div" className={styles.band}>
          <div className={styles.copy}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.body}>{body}</p>
          </div>
          <div className={styles.actions}>{actions}</div>
          {note ? <p className={styles.note}>{note}</p> : null}
        </GlassCard>
      </div>
    </section>
  );
}
