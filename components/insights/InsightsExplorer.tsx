"use client";

import { useState } from "react";
import type { InsightMeta } from "@/lib/insights";
import { FeaturedInsight } from "./FeaturedInsight";
import { InsightCard } from "./InsightCard";
import styles from "./InsightsExplorer.module.css";

type Props = {
  insights: InsightMeta[];
  categories: { name: string; count: number }[];
  featuredSlug: string;
};

const ALL = "all";

/** Category filter, featured article and the article grid. Filtering is local state, so the page stays statically generated. */
export function InsightsExplorer({ insights, categories, featuredSlug }: Props) {
  const [category, setCategory] = useState<string>(ALL);

  const visible = category === ALL ? insights : insights.filter((insight) => insight.category === category);
  const featured = category === ALL ? insights.find((insight) => insight.slug === featuredSlug) : undefined;
  const grid = featured ? visible.filter((insight) => insight.slug !== featured.slug) : visible;

  const options = [{ name: ALL, label: "All", count: insights.length }, ...categories.map((c) => ({ name: c.name, label: c.name, count: c.count }))];

  return (
    <div className={styles.root}>
      <div role="group" aria-label="Filter insights by category" className={styles.filters}>
        {options.map((option) => (
          <button key={option.name} type="button" className={styles.filter} aria-pressed={category === option.name} onClick={() => setCategory(option.name)}>
            {option.label}
            <span className={styles.count}>{option.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        Showing {visible.length} of {insights.length} insights
      </p>

      {featured ? <FeaturedInsight insight={featured} /> : null}

      <h2 className="sr-only">{category === ALL ? "All insights" : category}</h2>
      <ul className={styles.grid}>
        {grid.map((insight) => (
          <li key={insight.slug}>
            <InsightCard insight={insight} />
          </li>
        ))}
      </ul>
    </div>
  );
}
