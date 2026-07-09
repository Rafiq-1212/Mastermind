"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = "", hoverable = true }: CardProps) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <motion.div
      className={`${styles.card} ${className}`}
      whileHover={hoverable && !reduceMotion ? { y: -6, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
