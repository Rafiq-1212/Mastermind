"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { TrendingUp, Users, Sparkles } from "lucide-react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";
import { useIsDesktop } from "@/lib/useIsDesktop";
import styles from "./HeroVisual.module.css";

export default function HeroVisual() {
  const reduceMotion = useSafeReducedMotion();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const parallaxEnabled = isDesktop && !reduceMotion;

  // Desktop-only cursor parallax: the whole stage drifts a few px toward the
  // pointer, spring-smoothed. Disabled on touch devices and reduced-motion.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 20, mass: 0.5 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-9, 9]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!parallaxEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Mobile gets shorter travel distance and slower cadence — same floating
  // language, lighter GPU/battery cost on handhelds.
  const floatSlow = reduceMotion
    ? undefined
    : {
        y: isMobile ? [0, -7, 0] : [0, -14, 0],
        transition: { duration: isMobile ? 8.5 : 7, repeat: Infinity, ease: "easeInOut" as const },
      };
  const floatFast = reduceMotion
    ? undefined
    : {
        y: isMobile ? [0, 6, 0] : [0, 12, 0],
        transition: {
          duration: isMobile ? 7 : 5.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: 0.4,
        },
      };
  // The hero image itself: same float cadence plus a slight, slow rotation —
  // subtle enough to read as "alive," not spinning.
  const logoFloat = reduceMotion
    ? undefined
    : {
        y: isMobile ? [0, -7, 0] : [0, -14, 0],
        rotate: isMobile ? [-1, 1, -1] : [-2, 2, -2],
        transition: { duration: isMobile ? 8.5 : 7, repeat: Infinity, ease: "easeInOut" as const },
      };
  const spin = reduceMotion
    ? undefined
    : { rotate: 360, transition: { duration: 40, repeat: Infinity, ease: "linear" as const } };
  const pulse = reduceMotion
    ? undefined
    : { opacity: [0.7, 1, 0.7], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div
      className={styles.visual}
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={styles.stage}
        style={parallaxEnabled ? { x: parallaxX, y: parallaxY } : undefined}
      >
        <motion.div className={styles.glow} animate={pulse} />

        {/* <motion.div className={styles.ring} animate={spin} /> */}

        <motion.div className={styles.logoWrap} animate={logoFloat}>
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
      </motion.div>
    </div>
  );
}
