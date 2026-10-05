import { launchOffer } from "@/data/packages";
import styles from "./LaunchToggle.module.css";

type Props = { checked: boolean; onChange: (next: boolean) => void };

export function LaunchToggle({ checked, onChange }: Props) {
  return (
    <div className={styles.row}>
      <button type="button" role="switch" aria-checked={checked} className={styles.switch} onClick={() => onChange(!checked)}>
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        <span>{launchOffer.label}</span>
      </button>
      <p className={styles.hint} aria-live="polite">
        {checked ? "Showing launch prices." : "Showing regular prices."}
      </p>
    </div>
  );
}
