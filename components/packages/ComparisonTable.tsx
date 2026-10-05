import { Check, ChevronsRight, Minus } from "lucide-react";
import { comparison, monthlyPackages, type ComparisonCell } from "@/data/packages";
import styles from "./ComparisonTable.module.css";

function Cell({ value }: { value: ComparisonCell }) {
  if (value === true) {
    return (
      <>
        <Check size={17} aria-hidden="true" className={styles.yes} />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus size={17} aria-hidden="true" className={styles.no} />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <>{value}</>;
}

/**
 * Scrolls sideways on small screens with the feature column pinned, so the visitor always
 * sees what each row means. A visible hint and a partly visible next column show that it scrolls.
 */
export function ComparisonTable() {
  const columns = monthlyPackages.length + 1;
  return (
    <div>
      <p className={styles.hint} aria-hidden="true">
        <ChevronsRight size={16} />
        Swipe sideways to compare all four packages
      </p>
      <div className={styles.scroll} role="region" aria-labelledby="compare-title" tabIndex={0}>
        <table className={styles.table}>
          <caption className="sr-only">Monthly package comparison: Grow, Professional, Advanced and Enterprise</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {monthlyPackages.map((pkg) => (
                <th key={pkg.id} scope="col" className={pkg.highlighted ? styles.highlight : undefined}>
                  {pkg.name}
                </th>
              ))}
            </tr>
          </thead>
          {comparison.map((group) => (
            <tbody key={group.title}>
              <tr>
                <th colSpan={columns} scope="colgroup" className={styles.group}>
                  {group.title}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {row.values.map((value, index) => (
                    <td key={monthlyPackages[index].id} className={monthlyPackages[index].highlighted ? styles.highlight : undefined}>
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
