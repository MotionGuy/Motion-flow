"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type LoopVideoProps = {
  src: string;
  className?: string;
};

/**
 * Silent ambient loop for media zones. Plays only while on screen so a page
 * of clips never decodes more than the viewer can see, and stays on its
 * first frame under prefers-reduced-motion.
 */
export default function LoopVideo({ src, className = "" }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className={`size-full object-cover ${className}`}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
