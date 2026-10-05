"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./MotionReveal.module.css";
import { cssVars } from "@/lib/css";

type Props = { children: ReactNode; className?: string; delay?: number };

/**
 * Fades content in once, the first time it scrolls into view.
 * Content that is already on screen when the page loads is never hidden, and nothing is hidden
 * without JavaScript or with reduced motion, so the page is always readable.
 */
export function MotionReveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={[styles.reveal, className].filter(Boolean).join(" ")} style={cssVars({ "--reveal-delay": `${delay}ms` })}>
      {children}
    </div>
  );
}
