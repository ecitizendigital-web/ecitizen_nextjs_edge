import type { ElementType, ReactNode } from "react";
import styles from "./GlassCard.module.css";

type Props = {
  as?: ElementType;
  /** Gives the card a stronger border, for the one item that should stand out. */
  highlighted?: boolean;
  /** Border brightens on hover. Use on cards that are links or actions. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>;

/** Glass is reserved for important cards, pricing and selected content. Page backgrounds stay calm. */
export function GlassCard({ as: Tag = "div", highlighted, interactive, className = "", children, ...rest }: Props) {
  const classes = [styles.card, highlighted && styles.highlighted, interactive && styles.interactive, className]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
