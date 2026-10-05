import { SectionHeading } from "@/components/ui/SectionHeading";
import { why } from "@/data/home";
import styles from "./WhyUs.module.css";

/** Answers the question every visitor has: why not just hire someone to post on Facebook? */
export function WhyUs() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading id="why-title" title={why.heading} lead={why.body} />
        <div className={styles.table}>
          <div className={styles.head} aria-hidden="true">
            <span />
            <span>{why.columns.vendor}</span>
            <span className={styles.usHead}>{why.columns.system}</span>
          </div>
          <ul className={styles.rows}>
            {why.rows.map((row) => (
              <li key={row.topic} className={styles.row}>
                <h3 className={styles.topic}>{row.topic}</h3>
                <p className={styles.vendor}>
                  <span className={styles.label}>{why.columns.vendor}</span>
                  {row.vendor}
                </p>
                <p className={styles.system}>
                  <span className={styles.label}>{why.columns.system}</span>
                  {row.system}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
