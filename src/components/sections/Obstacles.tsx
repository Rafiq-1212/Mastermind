"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Card from "@/components/ui/Card";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./Obstacles.module.css";

const OBSTACLES = [
  {
    title: "Lack of Clarity",
    quote: "I don't know exactly what to focus on.",
    desc: "Without strategic direction, you scatter your focus across trivial tasks instead of high-leverage execution. You lack a roadmap for what comes next.",
  },
  {
    title: "Lack of Predictable Growth Systems",
    quote: "I don't know how to generate consistent revenue.",
    desc: "Relying on referrals or random marketing campaigns keeps your revenue volatile. You need built-in customer acquisition engines.",
  },
  {
    title: "Lack of Operational Systems",
    quote: "My business depends on me.",
    desc: "If you take a week off, operations stall. You are stuck firefighting daily firestorms instead of building a self-sustaining asset.",
  },
  {
    title: "Lack of People & Leadership Systems",
    quote: "I don't know how to build and lead a great team.",
    desc: "Hiring is a struggle, and delegation feels impossible. You struggle to attract, train, and trust high-performing talent.",
  },
  {
    title: "Lack of CEO Identity",
    quote: "I haven't become the person capable of leading a million-dollar company.",
    desc: "You operate as a busy freelancer or operator, not a CEO. You haven't developed the discipline, habits, and mindset of an exceptional leader.",
  },
];

export default function Obstacles() {
  const [active, setActive] = useState(0);
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>THE ROADBLOCKS</span>
        <h2>The 5 Root Obstacles Holding You Back</h2>
        <p>
          We break down growth into simple frameworks. To scale, you must break through these five
          structural bottlenecks:
        </p>
      </Reveal>

      <Reveal className={styles.layout}>
        <div className={styles.list}>
          {OBSTACLES.map((obs, idx) => (
            <div
              key={obs.title}
              className={active === idx ? `${styles.item} ${styles.itemActive}` : styles.item}
              onClick={() => setActive(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActive(idx);
              }}
            >
              <div className={styles.number}>0{idx + 1}</div>
              <div className={styles.title}>{obs.title}</div>
            </div>
          ))}
        </div>

        <Card className={styles.detailCard} hoverable={false}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={styles.detailHeader}>
                <span className={styles.detailNum}>BOTTLE-NECK 0{active + 1}</span>
                <h3>{OBSTACLES[active].title}</h3>
              </div>
              <p className={styles.quote}>&ldquo;{OBSTACLES[active].quote}&rdquo;</p>
              <p className={styles.desc}>{OBSTACLES[active].desc}</p>
              <div className={styles.solution}>
                <span className={styles.solTag}>How the Residency solves it:</span>
                <p>
                  Over the three days, you will sit down, use our proprietary templates, and map out the
                  exact system to eliminate this bottleneck permanently.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </Reveal>
    </section>
  );
}
