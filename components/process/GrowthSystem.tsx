"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { growthStages } from "@/data/process";
import styles from "./GrowthSystem.module.css";
import { cssVars } from "@/lib/css";

type Props = {
  /** "full" also shows a one-line summary under each stage name. */
  variant?: "compact" | "full";
};

const total = growthStages.length;

/**
 * Wide screens: tabs on the left, one stage at a time (arrow keys, Home and End move between tabs).
 * Narrow screens: the tab list is hidden and every stage is shown as a stacked card, all from the same markup.
 */
export function GrowthSystem({ variant = "compact" }: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target: Record<string, number> = {
      ArrowDown: (active + 1) % total,
      ArrowRight: (active + 1) % total,
      ArrowUp: (active + total - 1) % total,
      ArrowLeft: (active + total - 1) % total,
      Home: 0,
      End: total - 1,
    };
    const next = target[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className={styles.root}>
      <div role="tablist" aria-label="Growth system stages" aria-orientation="vertical" className={styles.tabs} onKeyDown={onKeyDown}>
        {growthStages.map((stage, index) => (
          <button
            key={stage.id}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`stage-tab-${stage.id}`}
            aria-selected={index === active}
            aria-controls={`stage-panel-${stage.id}`}
            tabIndex={index === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(index)}
          >
            <span className={styles.tabNumber}>{index + 1}</span>
            <span className={styles.tabText}>
              <span className={styles.tabName}>{stage.name}</span>
              {variant === "full" ? <span className={styles.tabBrief}>{stage.brief}</span> : null}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.panels}>
        {growthStages.map((stage, index) => (
          <div
            key={stage.id}
            role="tabpanel"
            id={`stage-panel-${stage.id}`}
            aria-labelledby={`stage-tab-${stage.id}`}
            hidden={index !== active}
            className={styles.panel}
            style={cssVars({ "--p": ((index + 1) / total) * 100 })}
          >
            <div className={styles.dial} aria-hidden="true">
              <span>{index + 1}</span>
            </div>
            <div className={styles.body}>
              <p className={styles.step}>
                Stage {index + 1} of {total}
              </p>
              <h3 className={styles.name}>{stage.name}</h3>
              <p className={styles.question}>{stage.question}</p>
              <p className={styles.text}>{stage.description}</p>
              <dl className={styles.facts}>
                <div>
                  <dt>Produces</dt>
                  <dd>{stage.outcome}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>
                    <ul className={styles.focus}>
                      {stage.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
