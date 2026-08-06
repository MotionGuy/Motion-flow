"use client";

import { useEffect, useRef } from "react";
import { useCaseStudyTransition } from "@/components/CaseStudyTransition";

type CaseStudyVideoProps = {
  src: string;
  title: string;
};

export default function CaseStudyVideo({ src, title }: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const caseStudyTransition = useCaseStudyTransition();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const start = () => {
      video.volume = 0.5;
      video.muted = false;
      void video.play().catch(() => {
        video.muted = true;
        void video.play().catch(() => {});
      });
    };

    video.addEventListener("loadeddata", start, { once: true });
    return () => video.removeEventListener("loadeddata", start);
  }, []);

  const revealCaseStudy = () => {
    caseStudyTransition?.completeCaseStudyTransition();
  };

  return (
    <video
      ref={videoRef}
      className="aspect-video w-full rounded-[18px] border border-line bg-black object-contain shadow-[0_32px_100px_rgba(0,0,0,0.45)]"
      src={src}
      aria-label={`${title} full film`}
      autoPlay
      controls
      playsInline
      preload="auto"
      onCanPlay={revealCaseStudy}
    />
  );
}
