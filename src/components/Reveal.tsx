"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export default function Reveal({ children, className = "", stagger = false, delay = 0 }: RevealProps) {
  const reduceMotion = useSafeReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? staggerContainer : fadeUp}
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </motion.div>
  );
}
