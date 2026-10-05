"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/data/faq";
import styles from "./FaqAccordion.module.css";

/**
 * Accessible accordion: each question is a real button with aria-expanded and aria-controls.
 * Answers animate by grid row height; closed answers are inert, so they are skipped by keyboard and screen readers.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string[]>(items.length ? [items[0].id] : []);
  const toggle = (id: string) => setOpen((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <li key={item.id} className={styles.item} data-open={isOpen}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={`faq-q-${item.id}`}
                className={styles.button}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                <span>{item.question}</span>
                <Plus size={20} aria-hidden="true" className={styles.icon} />
              </button>
            </h3>
            <div id={`faq-a-${item.id}`} className={styles.panel} inert={!isOpen} data-open={isOpen}>
              <div className={styles.inner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
