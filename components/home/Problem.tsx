import { problem } from "@/data/home";
import styles from "./Problem.module.css";

export function Problem() {
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2 id="problem-title" className={styles.title}>{problem.heading}</h2>
          <p className={styles.body}>{problem.body}</p>
        </div>
        <ul className={styles.points}>
          {problem.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
