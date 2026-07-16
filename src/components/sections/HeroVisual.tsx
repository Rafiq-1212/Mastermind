"use client";

import Image from "next/image";
import { motion} from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./HeroVisual.module.css";

export default function HeroVisual() {
  const reduceMotion = useSafeReducedMotion();

  const pulse = reduceMotion
    ? undefined
    : { opacity: [1.7, 1, 0.7], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div
      className={styles.visual}
      aria-hidden="true"
    >

        <motion.div className={styles.glow} animate={pulse} />
          <Image
            src="/goat-logo.png"
            alt=""
            width={220}
            height={220}
            className={styles.logo}
            priority
          />
    </div>
  );
}
