import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  /** Places an action (such as a filter or toggle) beside the heading on wide screens. */
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ title, lead, as: Tag = "h2", id, action, className = "" }: Props) {
  return (
    <div className={[styles.root, action && styles.withAction, className].filter(Boolean).join(" ")}>
      <div className={styles.text}>
        <Tag id={id} className={Tag === "h1" ? styles.h1 : styles.h2}>
          {title}
        </Tag>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
