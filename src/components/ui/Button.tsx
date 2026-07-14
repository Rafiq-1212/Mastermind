"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  showArrow?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  onClick,
  showArrow = false,
}: ButtonProps) {
  const reduceMotion = useSafeReducedMotion();
  const whileHover = reduceMotion ? undefined : { y: -2, scale: 1.04 };
  const whileTap = reduceMotion ? undefined : { scale: 0.97 };
  const springTransition = { type: "spring" as const, stiffness: 420, damping: 20 };
  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && (
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight size={18} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={whileHover}
        whileTap={whileTap}
        transition={springTransition}
        onClick={onClick}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={cls}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={springTransition}
      onClick={onClick}
    >
      {content}
    </motion.button>
  );
}
