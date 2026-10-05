import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/data/site";
import styles from "./FounderNote.module.css";

export function FounderNote() {
  const { founder } = site.assets;
  const note = site.founderNote;
  return (
    <GlassCard as="section" className={styles.note} aria-labelledby="founder-note-title">
      <Image src={founder.src} alt={founder.alt} width={founder.width} height={founder.height} sizes="140px" className={styles.photo} />
      <div className={styles.copy}>
        <p className={styles.label}>A note from the founder</p>
        <h2 id="founder-note-title" className={styles.title}>{note.heading}</h2>
        {note.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.text}>{paragraph}</p>
        ))}
        <p className={styles.sign}>{note.signature}</p>
      </div>
    </GlassCard>
  );
}
