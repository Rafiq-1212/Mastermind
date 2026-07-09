"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion-variants";

interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

export default function RevealItem({ children, className = "" }: RevealItemProps) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
