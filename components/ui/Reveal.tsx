"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds */
  delay?: number;
  /** Rise distance in px (8–16 per the system) */
  y?: number;
  className?: string;
};

/**
 * Standard scroll reveal: fade + rise, 300ms, expo ease-out, once.
 * Reduced motion → fade only.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
