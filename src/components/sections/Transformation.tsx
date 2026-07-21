"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Target, Link2, Compass } from "lucide-react";
import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import { useIsMobile } from "@/lib/useIsMobile";
import styles from "./Transformation.module.css";

const STEPS = [
  {
    icon: AlertTriangle,
    title: "The Founder Operating System",
    line: "Think clearly, decide boldly,lead with a plan instead of instinct alone.",
  },
  {
    icon: Target,
    title: "The Founder Identity",
    line: "Build the habits, confidence, and decision-making of founders who compound.",
  },
  {
    icon: Link2,
    title: "The Founder Engine ",
    line: "Design a business that attracts customers, talent, and opportunity on its own.",
  },
  {
    icon: Compass,
    title: "Financial Clarity",
    line: "Understand your real margins, cash flow, and the numbers that actually drive the business.",
  },
];

// The connector line "draws in" after the nodes have revealed — a short
// fixed delay rather than joining the parent stagger, since it needs to
// visually trail behind all four nodes regardless of how many there are.
const lineVariants = (isMobile: boolean) => ({
  hidden: isMobile ? { scaleY: 0, opacity: 0 } : { scaleX: 0, opacity: 0 },
  show: isMobile
    ? { scaleY: 1, opacity: 1, transition: { duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
    : { scaleX: 1, opacity: 1, transition: { duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
});

export default function Transformation() {
  const isMobile = useIsMobile();

  return (
    <section id="transformation" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>The Transformation</span>
        <h2>Why Just Run A Business, when you can Build One That Outlasts You ? </h2>
        <p>From working alone to leading with clarity.From reacting daily to executing a plan you actually wrote down.</p>
      </Reveal>

      <Reveal stagger className={styles.timeline}>
        <motion.div
          className={styles.line}
          aria-hidden="true"
          variants={lineVariants(isMobile)}
          style={{ transformOrigin: isMobile ? "top" : "left" }}
        />
        {STEPS.map((step, idx) => (
          <RevealItem className={styles.step} key={step.title}>
            <div className={styles.node}>
              <step.icon size={22} aria-hidden="true" />
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
