"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, fadeUpMobile } from "@/lib/motion-variants";
import { useIsMobile } from "@/lib/useIsMobile";

interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

export default function RevealItem({ children, className = "" }: RevealItemProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div className={className} variants={isMobile ? fadeUpMobile : fadeUp}>
      {children}
    </motion.div>
  );
}
