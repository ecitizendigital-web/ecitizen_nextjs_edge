import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Field.module.css";

type Common = { id: string; label: string; error?: string; hint?: string; required?: boolean };

function Shell({ id, label, error, hint, required, children }: Common & { children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? null : <span className={styles.optional}> (optional)</span>}
      </label>
      {children}
      {hint && !error ? <p id={`${id}-hint`} className={styles.hint}>{hint}</p> : null}
      {error ? <p id={`${id}-error`} className={styles.error}>{error}</p> : null}
    </div>
  );
}

const describe = ({ id, error, hint }: Pick<Common, "id" | "error" | "hint">) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({ id, label, error, hint, required, ...input }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required}>
      <input
        id={id}
        name={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describe({ id, error, hint })}
        aria-required={required || undefined}
        {...input}
      />
    </Shell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  required,
  options,
  ...select
}: Common & { options: readonly string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required}>
      <select
        id={id}
        name={id}
        className={`${styles.control} ${styles.select}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describe({ id, error, hint })}
        {...select}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Shell>
  );
}

export function TextAreaField({ id, label, error, hint, required, ...area }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required}>
      <textarea
        id={id}
        name={id}
        className={`${styles.control} ${styles.area}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describe({ id, error, hint })}
        {...area}
      />
    </Shell>
  );
}
