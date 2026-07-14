import { AlertTriangle, Target, Workflow, Compass } from "lucide-react";
import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import styles from "./Transformation.module.css";

const STEPS = [
  {
    icon: AlertTriangle,
    title: "Founder-Dependent",
    line: "Every decision, sale, and fire runs through you.",
  },
  {
    icon: Target,
    title: "Diagnose the Bottleneck",
    line: "We map exactly what's capping your growth and time.",
  },
  {
    icon: Workflow,
    title: "Install the Systems",
    line: "Leadership, process, and delivery run without you.",
  },
  {
    icon: Compass,
    title: "Independent CEO",
    line: "You focus only on strategy, capital, and category.",
  },
];

export default function Transformation() {
  return (
    <section id="transformation" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>The Transformation</span>
        <h2>From Running the Business to Running the Empire</h2>
        <p>The shift from a business that depends on you to one that doesn&apos;t.</p>
      </Reveal>

      <Reveal stagger className={styles.timeline}>
        <div className={styles.line} aria-hidden="true" />
        {STEPS.map((step, idx) => (
          <RevealItem className={styles.step} key={step.title}>
            <div className={styles.node}>
              <step.icon size={20} aria-hidden="true" />
            </div>
            <div className={styles.stepText}>
              <span className={styles.num}>{String(idx + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.line}</p>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
