import { formatBdt } from "@/lib/format";
import type { Package } from "@/data/packages";
import styles from "./PriceBlock.module.css";

/** Regular price struck through beside the launch price. The rows keep their height so cards do not jump when toggled. */
export function PriceBlock({ pkg, launch }: { pkg: Package; launch: boolean }) {
  const unit = pkg.billing === "monthly" ? "per month" : "one-time";
  return (
    <div className={styles.price}>
      <p className={styles.was} data-visible={launch}>
        <span className="sr-only">Regular price </span>
        <s>{formatBdt(pkg.price)}</s>
      </p>
      <p className={styles.now}>
        <span className="sr-only">{launch ? "Launch price " : "Price "}</span>
        <span className={styles.amount}>{formatBdt(launch ? pkg.launchPrice : pkg.price)}</span>
        <span className={styles.unit}>{unit}</span>
      </p>
      <p className={styles.save} data-visible={launch}>
        Save {formatBdt(pkg.price - pkg.launchPrice)}
      </p>
    </div>
  );
}
