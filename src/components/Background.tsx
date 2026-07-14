"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./Background.module.css";

export default function Background() {
  const reduceMotion = useSafeReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 2400], [0, reduceMotion ? 0 : -140]);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.halfMoon} />
      <motion.div className={styles.glowLayer} style={{ y: parallaxY }}>
        <div className={`${styles.glow} ${styles.glowOne}`} />
        <div className={`${styles.glow} ${styles.glowTwo}`} />
      </motion.div>
      <div className={styles.bottomGlow} />
      <div className={styles.particles} />
      <div className={styles.noise} />
    </div>
  );
}
