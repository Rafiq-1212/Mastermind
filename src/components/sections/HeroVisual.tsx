"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Users, Sparkles } from "lucide-react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./HeroVisual.module.css";

export default function HeroVisual() {
  const reduceMotion = useSafeReducedMotion();

  const floatSlow = reduceMotion
    ? undefined
    : { y: [0, -14, 0], transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const } };
  const floatFast = reduceMotion
    ? undefined
    : { y: [0, 12, 0], transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.4 } };
  const spin = reduceMotion
    ? undefined
    : { rotate: 360, transition: { duration: 40, repeat: Infinity, ease: "linear" as const } };
  const pulse = reduceMotion
    ? undefined
    : { opacity: [0.7, 1, 0.7], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.stage}>
        <motion.div className={styles.glow} animate={pulse} />

        {/* <motion.div className={styles.ring} animate={spin} /> */}

        <motion.div className={styles.logoWrap} animate={floatSlow}>
          <Image
            src="/goat-logo.png"
            alt=""
            width={420}
            height={420}
            className={styles.logo}
            priority
          />
        </motion.div>

        <motion.div className={styles.widget} animate={floatFast}>
          <div className={styles.widgetHeader}>
            <span className={styles.widgetLabel}>Revenue Growth</span>
            <TrendingUp size={16} className={styles.widgetIcon} />
          </div>
          <div className={styles.widgetBars}>
            <span style={{ height: "40%" }} />
            <span style={{ height: "65%" }} />
            <span style={{ height: "50%" }} />
            <span style={{ height: "85%" }} />
            <span style={{ height: "100%" }} />
          </div>
        </motion.div>

        <motion.div className={styles.chipTeam} animate={floatSlow}>
          <Users size={15} className={styles.chipIcon} />
          <span>High-Performing Team</span>
        </motion.div>

        <motion.div className={styles.chipBadge} animate={floatFast}>
          <Sparkles size={14} className={styles.chipIcon} />
          <span>CEO Freedom</span>
        </motion.div>
      </div>
    </div>
  );
}
