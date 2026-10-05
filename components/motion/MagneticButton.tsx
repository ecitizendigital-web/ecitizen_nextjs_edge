"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  track?: string;
  children: ReactNode;
};

/** A button that leans a few pixels toward the pointer. Used on the two main calls to action only. */
export function MagneticButton({ variant = "primary", size = "lg", track, children, ...linkProps }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const lean = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
    el.style.transform = `translate(${(dx * 8).toFixed(1)}px, ${(dy * 6).toFixed(1)}px)`;
  };
  const settle = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      className={buttonClass({ variant, size })}
      data-track={track}
      onPointerMove={lean}
      onPointerLeave={settle}
      style={{ transition: "transform 180ms var(--ease-out), box-shadow 260ms var(--ease-out), background 260ms var(--ease-out)" }}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
