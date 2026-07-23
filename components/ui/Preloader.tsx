"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";

type PreloaderProps = {
  /** Called once the overlay has fully dissolved (or was skipped) */
  onComplete?: () => void;
  /** Render inside a relative parent instead of fixed full-screen (for demos) */
  contained?: boolean;
};

/*
 * Cinematic preloader. Two hands reach toward each other and meet in the
 * center; drop real footage at /video/hand-left.mp4 and /video/hand-right.mp4
 * to enable the film version. Until those files exist, the abstract fallback
 * runs: two thin light streaks slide in from the edges and stop where the
 * logo's edges begin. At contact, a soft glow blooms and stays, emphasizing
 * the logo as it forms. ~2.3s, then the overlay dissolves. Skipped entirely
 * under prefers-reduced-motion.
 */

const MEET = 1.0; // seconds until the streaks reach the logo edges
const HOLD = 2.3; // total time before the overlay dissolves
const EDGE = 104; // px from center where the streaks stop (logo half-width + air)

export default function Preloader({ onComplete, contained }: PreloaderProps) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      onComplete?.();
      return;
    }
    let cancelled = false;
    fetch("/video/hand-left.mp4", { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (!cancelled && r.ok && type.startsWith("video")) setHasVideo(true);
      })
      .catch(() => {});
    const t = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(() => onComplete?.(), 350);
    }, HOLD * 1000);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [reduce, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${
            contained ? "absolute" : "fixed"
          } inset-0 z-[80] flex items-center justify-center overflow-hidden bg-ink`}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          aria-hidden
        >
          {hasVideo ? (
            <>
              <video
                className="absolute left-0 top-1/2 h-[70%] w-1/2 -translate-y-1/2 object-contain object-right"
                src="/video/hand-left.mp4"
                autoPlay
                muted
                playsInline
              />
              <video
                className="absolute right-0 top-1/2 h-[70%] w-1/2 -translate-y-1/2 object-contain object-left"
                src="/video/hand-right.mp4"
                autoPlay
                muted
                playsInline
              />
            </>
          ) : (
            <>
              {/* Streak from the left: inner end stops at the logo's left edge */}
              <motion.span
                className="absolute top-1/2 h-px w-[34vw] bg-gradient-to-r from-transparent via-ice/70 to-ice shadow-[0_0_18px_rgba(169,199,255,0.8)]"
                style={{ right: `calc(50% + ${EDGE}px)` }}
                initial={{ x: "-70vw", opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: MEET, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Streak from the right: inner end stops at the logo's right edge */}
              <motion.span
                className="absolute top-1/2 h-px w-[34vw] bg-gradient-to-l from-transparent via-ice/70 to-ice shadow-[0_0_18px_rgba(169,199,255,0.8)]"
                style={{ left: `calc(50% + ${EDGE}px)` }}
                initial={{ x: "70vw", opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: MEET, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Glow blooms at contact and stays, holding the logo in light */}
              <motion.span
                className="absolute size-[420px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(234,241,255,0.4), rgba(169,199,255,0.16) 42%, transparent 70%)",
                }}
                initial={{ opacity: 0, scale: 0.35 }}
                animate={{ opacity: [0, 1, 0.55], scale: [0.35, 1.15, 1] }}
                transition={{ duration: 1.0, delay: MEET - 0.08, ease: "easeOut" }}
              />
              {/* The logo forms in the gap between the streaks */}
              <motion.span
                className="relative"
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.96 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 0.55, delay: MEET, ease: [0.16, 1, 0.3, 1] }}
              >
                <Logo className="text-[48px] text-fg" />
              </motion.span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
