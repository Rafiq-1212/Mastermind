"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeUp,
  fadeUpMobile,
  staggerContainer,
  staggerContainerMobile,
} from "@/lib/motion-variants";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";

interface RevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export default function Reveal({ children, className = "", stagger = false, delay = 0 }: RevealProps) {
  const reduceMotion = useSafeReducedMotion();
  const isMobile = useIsMobile();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = stagger
    ? isMobile
      ? staggerContainerMobile
      : staggerContainer
    : isMobile
      ? fadeUpMobile
      : fadeUp;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={stagger ? undefined : { delay: isMobile ? delay * 0.6 : delay }}
    >
      {children}
    </motion.div>
  );
}
