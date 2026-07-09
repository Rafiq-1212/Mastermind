import { Check, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import Card from "@/components/ui/Card";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section className={`${styles.section} ${styles.philosophyBg}`}>
      <div className={styles.grid}>
        <Reveal className={styles.quoteCol}>
          <span className={styles.badge}>THE PHILOSOPHY</span>
          <blockquote>
            &ldquo;People are not paying for information. People are paying to gain clarity, think
            bigger, build systems that scale, and execute meaningful work.&rdquo;
          </blockquote>
          <p className={styles.author}>&mdash; Program Core Belief</p>
          <div className={styles.promiseBanner}>
            <h3>THE PROMISE</h3>
            <p>&ldquo;You won&apos;t leave inspired. You&apos;ll leave with a plan, systems, and momentum.&rdquo;</p>
          </div>
        </Reveal>

        <Reveal stagger className={styles.buyingCol}>
          <RevealItem>
            <Card className={styles.buyingBox}>
              <h4>What you are NOT buying:</h4>
              <ul className={styles.notBuyingList}>
                <li>
                  <X size={15} aria-hidden="true" />
                  <span>Generic motivation or hype</span>
                </li>
                <li>
                  <X size={15} aria-hidden="true" />
                  <span>Surface-level networking events</span>
                </li>
                <li>
                  <X size={15} aria-hidden="true" />
                  <span>Another passive lecture/workshop</span>
                </li>
                <li>
                  <X size={15} aria-hidden="true" />
                  <span>Empty inspiration alone</span>
                </li>
              </ul>
            </Card>
          </RevealItem>
          <RevealItem>
            <Card className={styles.buyingBox}>
              <h4 className="gradientAccent">What you ARE buying:</h4>
              <ul className={styles.buyingList}>
                <li>
                  <Check size={15} aria-hidden="true" />
                  <span>
                    <strong>Clarity &amp; Direction:</strong> A defined roadmap
                  </span>
                </li>
                <li>
                  <Check size={15} aria-hidden="true" />
                  <span>
                    <strong>Mindset &amp; Habits:</strong> A transformed CEO identity
                  </span>
                </li>
                <li>
                  <Check size={15} aria-hidden="true" />
                  <span>
                    <strong>Systems &amp; Tools:</strong> Frameworks for predictable scale
                  </span>
                </li>
                <li>
                  <Check size={15} aria-hidden="true" />
                  <span>
                    <strong>Immediate Execution:</strong> Tangible assets completed <em>during</em> the
                    residency
                  </span>
                </li>
              </ul>
            </Card>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
