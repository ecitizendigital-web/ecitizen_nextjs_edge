import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps, ReactNode } from "react";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { slugify } from "@/lib/format";
import styles from "./MdxContent.module.css";

const textOf = (node: ReactNode): string =>
  typeof node === "string" ? node : Array.isArray(node) ? node.map(textOf).join("") : "";

function SmartLink({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...rest} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

/** Renders trusted MDX from /content with the site's typography. `lang` marks Bangla paragraphs for screen readers. */
export function MdxContent({ source, lang }: { source: string; lang?: string }) {
  const components = {
    a: SmartLink,
    h2: ({ children }: ComponentProps<"h2">) => <h2 id={slugify(textOf(children))}>{children}</h2>,
    p: (props: ComponentProps<"p">) => <p lang={lang} {...props} />,
    li: (props: ComponentProps<"li">) => <li lang={lang} {...props} />,
    Sources: ({ children }: { children: ReactNode }) => <section className={styles.sources}>{children}</section>,
    CookieSettingsButton,
  };
  return (
    <div className={styles.prose}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
