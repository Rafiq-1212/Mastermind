"use client";

import { Workflow, LineChart, Users, Compass } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { slideInLeft, slideInRight, slideInMobile } from "@/lib/motion-variants";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";
import { NodesIllustration, ChartIllustration, TeamIllustration, RoadmapIllustration } from "./FeatureIllustrations";
import styles from "./Features.module.css";

const FEATURES = [
  {
    icon: Workflow,
    title: "Systems Over Hustle",
    lines: [
      "Every decision, sale, and fire currently runs through you.",
      "We install the operational systems so the business runs without you in the room.",
    ],
    Illustration: NodesIllustration,
  },
  {
    icon: LineChart,
    title: "A Predictable Revenue Engine",
    lines: [
      "Growth that doesn't depend on your personal bandwidth.",
      "A repeatable system for consistent, compounding revenue.",
    ],
    Illustration: ChartIllustration,
  },
  {
    icon: Users,
    title: "Leadership That Owns Outcomes",
    lines: [
      "A team that makes decisions without waiting on you.",
      "Leaders who own results — not just tasks on a list.",
    ],
    Illustration: TeamIllustration,
  },
  {
    icon: Compass,
    title: "A Clear 90-Day Roadmap",
    lines: [
      "No vague frameworks or generic advice.",
      "A precise plan to remove yourself from delivery, decisions, and firefighting.",
    ],
    Illustration: RoadmapIllustration,
  },
];

export default function Features() {
  const reduceMotion = useSafeReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="features" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>What Changes</span>
        <h2>Built For Founders Ready To Step Back</h2>
        <p>This isn&apos;t another framework to read. It&apos;s the business you actually set out to build.</p>
      </Reveal>

      <div className={styles.rows}>
        {FEATURES.map((item, idx) => {
          const variants = isMobile ? slideInMobile : idx % 2 === 1 ? slideInRight : slideInLeft;

          if (reduceMotion) {
            return (
              <div
                key={item.title}
                className={`${styles.row} ${idx % 2 === 1 ? styles.reversed : ""}`}
              >
                <div className={styles.text}>
                  <div className={styles.iconWrap}>
                    <item.icon size={22} aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <span className={styles.accentLine} />
                </div>

                <div className={styles.visual}>
                  <div className={styles.visualPanel}>
                    <item.Illustration />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <motion.div
              key={item.title}
              className={`${styles.row} ${idx % 2 === 1 ? styles.reversed : ""}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={variants}
            >
              <div className={styles.text}>
                <div className={styles.iconWrap}>
                  <item.icon size={22} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <span className={styles.accentLine} />
              </div>

              <div className={styles.visual}>
                <div className={styles.visualPanel}>
                  <item.Illustration />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
