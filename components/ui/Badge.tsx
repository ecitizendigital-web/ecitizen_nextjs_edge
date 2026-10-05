import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type Props = { tone?: "neutral" | "accent" | "solid"; children: ReactNode; className?: string };

export function Badge({ tone = "neutral", children, className = "" }: Props) {
  return <span className={[styles.badge, styles[tone], className].filter(Boolean).join(" ")}>{children}</span>;
}
