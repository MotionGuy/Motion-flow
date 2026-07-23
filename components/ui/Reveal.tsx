"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds */
  delay?: number;
  /** Rise distance in px */
  y?: number;
  className?: string;
};

/**
 * Section-level scroll reveal: fade + rise with a touch of blur-in.
 * 600ms, expo ease-out, once. Reduced motion: fade only.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, filter: "blur(8px)" }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
