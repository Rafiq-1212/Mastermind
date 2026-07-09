"use client";

import { motion } from "framer-motion";
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
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  onClick,
}: ButtonProps) {
  const reduceMotion = useSafeReducedMotion();
  const whileHover = reduceMotion ? undefined : { y: -3, scale: 1.02 };
  const whileTap = reduceMotion ? undefined : { scale: 0.97 };
  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} className={cls} whileHover={whileHover} whileTap={whileTap} onClick={onClick}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} className={cls} whileHover={whileHover} whileTap={whileTap} onClick={onClick}>
      {children}
    </motion.button>
  );
}
