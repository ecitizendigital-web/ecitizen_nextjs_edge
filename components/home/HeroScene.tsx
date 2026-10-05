import Image from "next/image";
import { FloatingOrb } from "@/components/motion/FloatingOrb";
import { hero } from "@/data/home";
import { site } from "@/data/site";
import { cssVars } from "@/lib/css";
import styles from "./HeroScene.module.css";

/** Where each capability chip floats. Position is left/top in %, depth in px. */
const chipLayout = [
  { left: "2%", top: "16%", z: 120, delay: 0 },
  { right: "0%", top: "26%", z: 150, delay: 1.2 },
  { left: "6%", bottom: "20%", z: 110, delay: 2.1 },
  { right: "8%", bottom: "10%", z: 140, delay: 0.7 },
  { left: "42%", top: "2%", z: 170, delay: 1.8 },
] as const;

/** The brand mark floating inside two orbits. Purely decorative, so it is hidden from assistive tech. */
export function HeroScene() {
  const { mark } = site.assets;
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.stage}>
        <div className={styles.floor} />
        <div className={styles.halo} />
        <div className={`${styles.ring} ${styles.ringOuter}`}>
          <FloatingOrb size={10} className={styles.nodeTop} />
        </div>
        <div className={`${styles.ring} ${styles.ringInner}`}>
          <FloatingOrb size={8} delay={1.5} className={styles.nodeBottom} />
        </div>
        <div className={styles.core}>
          <Image src={mark.src} alt="" width={mark.width} height={mark.height} priority sizes="(max-width: 960px) 44vw, 260px" className={styles.mark} />
        </div>
        {hero.nodes.map((label, index) => {
          const { z, delay, ...position } = chipLayout[index];
          return (
            <span key={label} className={styles.chip} style={{ ...position, ...cssVars({ "--z": `${z}px`, "--d": `${delay}s` }) }}>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
