"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type TextRevealProps = {
  /** One entry per visual line; each animates inside its own mask */
  lines: ReactNode[];
  /** Seconds to wait before the first line */
  delay?: number;
  /** Per-line stagger in seconds */
  stagger?: number;
  /** Animate immediately (hero, post-preloader) instead of on scroll */
  immediate?: boolean;
  className?: string;
  as?: "h1" | "h2" | "p" | "div";
};

/**
 * Signature text reveal: masked line-by-line rise + fade with a touch of
 * blur-in. 600ms per line, expo ease-out. Reduced motion: plain fade.
 */
export default function TextReveal({
  lines,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  className = "",
  as: Tag = "div",
}: TextRevealProps) {
  const reduce = useReducedMotion();

  const target = { opacity: 1, y: 0, filter: "blur(0px)" };
  const from = reduce
    ? { opacity: 0, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: "80%", filter: "blur(6px)" };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.06em]">
          <motion.span
            className="block will-change-transform"
            initial={from}
            {...(immediate
              ? { animate: target }
              : {
                  whileInView: target,
                  viewport: { once: true, margin: "-10% 0px" },
                })}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * (reduce ? 0 : stagger),
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
