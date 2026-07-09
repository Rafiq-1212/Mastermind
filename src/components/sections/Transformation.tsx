"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./Transformation.module.css";

export default function Transformation() {
  const [activeShift, setActiveShift] = useState<"before" | "after">("before");
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="transformation" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>THE TRANSFORMATION</span>
        <h2>Your Status Shift</h2>
        <p>
          From an overwhelmed operator constantly fighting fires to a respected CEO leading a scalable,
          high-growth company.
        </p>
      </Reveal>

      <Reveal className={styles.box}>
        <div className={styles.tabToggle}>
          <button
            className={
              activeShift === "before" ? `${styles.tabBtn} ${styles.tabBtnBefore}` : styles.tabBtn
            }
            onClick={() => setActiveShift("before")}
          >
            The Current Operator State (Before)
          </button>
          <button
            className={activeShift === "after" ? `${styles.tabBtn} ${styles.tabBtnAfter}` : styles.tabBtn}
            onClick={() => setActiveShift("after")}
          >
            The 10X Strategic CEO (After)
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeShift === "before" ? (
            <motion.div
              key="before"
              className={`${styles.shiftCard} ${styles.shiftBefore}`}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className={styles.cardIndicator}>Current Reality</div>
              <h3>The Overwhelmed Operator</h3>
              <p className={styles.shiftIntro}>
                You know you have potential, but you are stuck in the day-to-day trap.
              </p>
              <ul className={styles.shiftList}>
                <li>
                  <X size={16} className={styles.iconBad} aria-hidden="true" />
                  <span>
                    <strong>Confused &amp; Overwhelmed:</strong> Waking up without a clear agenda,
                    reacting to client requests, and letting fires dictate your schedule.
                  </span>
                </li>
                <li>
                  <X size={16} className={styles.iconBad} aria-hidden="true" />
                  <span>
                    <strong>Scattered Focus:</strong> Trying to handle marketing, sales, hiring,
                    delivery, and accounting all by yourself.
                  </span>
                </li>
                <li>
                  <X size={16} className={styles.iconBad} aria-hidden="true" />
                  <span>
                    <strong>Revenue Uncertainty:</strong> Stalled between &#8377;6L&ndash;&#8377;15L/month,
                    never knowing if next month will plunge or scale.
                  </span>
                </li>
                <li>
                  <X size={16} className={styles.iconBad} aria-hidden="true" />
                  <span>
                    <strong>Extreme Dependency:</strong> The entire business breaks down if you stop
                    working for even a single day.
                  </span>
                </li>
                <li>
                  <X size={16} className={styles.iconBad} aria-hidden="true" />
                  <span>
                    <strong>Feeling Stuck &amp; Isolated:</strong> Working 12+ hour days but feeling
                    like you are wasting your twenties moving in the wrong direction.
                  </span>
                </li>
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              className={`${styles.shiftCard} ${styles.shiftAfter}`}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className={styles.cardIndicatorGold}>The Promise</div>
              <h3>The Respected Strategic CEO</h3>
              <p className={styles.shiftIntro}>
                You exit the day-to-day operations and focus exclusively on high-leverage growth.
              </p>
              <ul className={styles.shiftList}>
                <li>
                  <Check size={16} className={styles.iconGood} aria-hidden="true" />
                  <span>
                    <strong>Absolute Clarity &amp; Focus:</strong> Operating with a concrete 12-month
                    strategic roadmap and a strict 90-day execution plan.
                  </span>
                </li>
                <li>
                  <Check size={16} className={styles.iconGood} aria-hidden="true" />
                  <span>
                    <strong>Scalable Systems:</strong> Built-in playbooks and AI frameworks that run
                    operations and drive predictable growth.
                  </span>
                </li>
                <li>
                  <Check size={16} className={styles.iconGood} aria-hidden="true" />
                  <span>
                    <strong>High-Performing Team:</strong> Exceptional talent handles customer
                    acquisition and service delivery without needing your approval.
                  </span>
                </li>
                <li>
                  <Check size={16} className={styles.iconGood} aria-hidden="true" />
                  <span>
                    <strong>Time &amp; Financial Freedom:</strong> Growing profits predictably while
                    gaining the space to reflect, think bigger, and lead.
                  </span>
                </li>
                <li>
                  <Check size={16} className={styles.iconGood} aria-hidden="true" />
                  <span>
                    <strong>CEO Habits &amp; Authority:</strong> Developing the mindset, discipline,
                    and executive presence that commands respect.
                  </span>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
