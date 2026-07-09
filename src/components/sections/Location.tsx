import { Diamond } from "lucide-react";
import Reveal from "@/components/Reveal";
import styles from "./Location.module.css";

export default function Location() {
  return (
    <section className={`${styles.section} ${styles.locationBg}`}>
      <div className={styles.container}>
        <Reveal className={styles.info}>
          <span className={styles.tag}>THE DESTINATION</span>
          <h2>Athirapalli, Kerala</h2>
          <p className={styles.lead}>
            Set in the spectacular landscape of Athirapalli (Kerala, India), known for its majestic
            waterfalls and lush rain forests.
          </p>
          <p>
            We believe environment dictates focus. We selected this premium, distraction-free location to
            take you away from your daily firefights, allowing you to reflect deeply, breathe clean air,
            and work intentionally in a world-class, premium residential setting.
          </p>
          <ul className={styles.detailsList}>
            <li>
              <Diamond size={11} aria-hidden="true" />
              <span>
                <strong>Premium Boarding:</strong> High-ticket, private suites with standard luxury
                amenities.
              </span>
            </li>
            <li>
              <Diamond size={11} aria-hidden="true" />
              <span>
                <strong>Execution Rooms:</strong> High-speed internet, dedicated brainstorm zones, and
                collaborative tables.
              </span>
            </li>
            <li>
              <Diamond size={11} aria-hidden="true" />
              <span>
                <strong>Pure Focus:</strong> No distractions. Just you, your templates, Alfred, and your
                peer founders.
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal className={styles.visual} delay={0.15}>
          <div className={styles.waterfall}>
            <div className={styles.overlay}>
              <span>3-Day Immersive Residency</span>
              <h4>Athirapalli, Kerala</h4>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
