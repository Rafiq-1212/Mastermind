"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./FAQ.module.css";

const FAQS = [
  {
    q: "Who is this for?",
    a: "Founders doing ₹3–4 Cr+ in annual revenue who are ready to build a business that runs without them — not another course, community, or generic playbook.",
  },
  {
    q: "What actually happens on the call?",
    a: "A 60-minute 1:1 diagnostic. We map exactly what's capping your growth, your time, and your exit value — and whether we're the right fit to fix it. No pitch deck.",
  },
  {
    q: "Is this a course or a community?",
    a: "No. This is a 1:1 execution partnership. We work alongside your leadership team to install the systems — until the business runs without you in the room.",
  },
  {
    q: "How is this different from other consultants?",
    a: "Most consultants hand you a framework and leave. We stay until it's installed — leadership, delivery, and decision-making rebuilt around systems, not your personal bandwidth.",
  },
  {
    q: "What if I'm not a fit?",
    a: "We only take a limited number of founders each month. If it's not a fit on the call, we'll tell you directly — no pressure, no obligation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="faq" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>FAQ</span>
        <h2>Questions, Answered</h2>
      </Reveal>

      <Reveal className={styles.list}>
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div className={styles.item} key={item.q}>
              <button
                type="button"
                className={styles.question}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.answerWrap}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
                  >
                    <p className={styles.answer}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
