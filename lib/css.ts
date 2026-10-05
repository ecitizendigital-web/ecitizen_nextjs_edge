import type { CSSProperties } from "react";

/** Lets components pass CSS custom properties (--name) through React's typed style prop. */
export const cssVars = (vars: Record<`--${string}`, string | number>): CSSProperties => vars as CSSProperties;
