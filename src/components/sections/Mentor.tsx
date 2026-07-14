import { User, Quote, PenLine } from "lucide-react";
import Reveal from "@/components/Reveal";
import styles from "./Mentor.module.css";

const ACHIEVEMENTS = ["[X]+ Founders Advised", "[X] Cr+ Revenue Scaled", "[X] Years Operating Experience"];

export default function Mentor() {
  return (
    <section id="mentor" className={styles.section}>
      <div className={styles.grid}>
        <Reveal className={styles.portraitCol}>
          <div className={styles.frame}>
            <div className={styles.frameGlow} />
            <div className={styles.portraitPlaceholder}>
              <User size={64} aria-hidden="true" />
            </div>
            <div className={styles.signatureBadge}>
              <PenLine size={14} aria-hidden="true" />
              <span>Founder &amp; Mentor</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className={styles.contentCol}>
          <span className={styles.sectionTag}>Your Mentor</span>
          <h2>[Mentor Name Goes Here]</h2>
          <p className={styles.bio}>
            [A short bio establishing credibility — background, what they&apos;ve built, and why they&apos;re
            qualified to guide 3–4 Cr founders through this transformation goes here.]
          </p>

          <div className={styles.chips}>
            {ACHIEVEMENTS.map((item) => (
              <span key={item} className={styles.chip}>
                {item}
              </span>
            ))}
          </div>

          <div className={styles.quoteBox}>
            <Quote size={22} className={styles.quoteIcon} aria-hidden="true" />
            <p>
              &ldquo;[A one or two line personal quote from the mentor about their philosophy on building
              founder-independent businesses goes here.]&rdquo;
            </p>
            <span className={styles.quoteSign}>— [Mentor Name]</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
