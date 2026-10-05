import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Shared = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  /** Event name sent to analytics when clicked (only after consent). */
  track?: string;
  children: ReactNode;
};

type AsLink = Shared & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;
type AsButton = Shared & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function buttonClass({
  variant = "secondary",
  size = "md",
  block = false,
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
}): string {
  return [styles.btn, styles[variant], size !== "md" && styles[size], block && styles.block, className]
    .filter(Boolean)
    .join(" ");
}

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href);

export function Button(props: AsLink | AsButton) {
  const { variant, size, block, track, children, className, ...rest } = props;
  const classes = buttonClass({ variant, size, block, className });

  if (props.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string };
    if (isExternal(href)) {
      const opensTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          data-track={track}
          {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} data-track={track} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} data-track={track} {...buttonProps}>
      {children}
    </button>
  );
}
