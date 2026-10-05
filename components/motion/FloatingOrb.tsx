import styles from "./FloatingOrb.module.css";
import { cssVars } from "@/lib/css";

type Props = { size?: number; delay?: number; className?: string };

/** A small glowing point that drifts gently. Decorative only. */
export function FloatingOrb({ size = 10, delay = 0, className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={[styles.orb, className].filter(Boolean).join(" ")}
      style={cssVars({ "--orb-size": `${size}px`, "--orb-delay": `${delay}s` })}
    />
  );
}
