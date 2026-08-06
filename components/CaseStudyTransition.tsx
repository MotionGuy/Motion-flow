"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";

type TransitionItem = {
  href: string;
  client: string;
  outcome: string;
  tags: string[];
  videoSrc?: string;
  posterSrc?: string;
  posterStyle?: CSSProperties;
  rect: DOMRect;
};

type TransitionContextValue = {
  openCaseStudy: (item: TransitionItem) => void;
  isOpening: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useCaseStudyTransition() {
  return useContext(TransitionContext);
}

function getDestination() {
  const width = window.innerWidth;
  const mobile = width < 768;
  const shellWidth = Math.min(width, 1280);
  const outerGutter = (width - shellWidth) / 2;
  const padding = mobile ? 24 : 40;
  const contentWidth = shellWidth - padding * 2;
  const columnGap = mobile ? 0 : 64;
  const videoWidth = mobile ? width - padding * 2 : (contentWidth - columnGap) * 0.625;
  const pageVideoTop = mobile ? 255 : 275;
  return {
    left: outerGutter + padding,
    top: pageVideoTop,
    width: videoWidth,
    height: videoWidth * 0.5625,
    copyLeft: mobile ? padding : outerGutter + padding + videoWidth + columnGap,
    copyTop: mobile ? pageVideoTop + videoWidth * 0.5625 + 58 : Math.max(390, pageVideoTop + (Math.min(window.innerHeight * 0.72, 720) - 350) / 2),
  };
}

export default function CaseStudyTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [item, setItem] = useState<TransitionItem | null>(null);
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const openCaseStudy = (nextItem: TransitionItem) => {
    if (item) return;
    setItem(nextItem);
    setLeaving(false);
    requestAnimationFrame(() => setActive(true));

    // The destination is mounted while the travelling preview is still above it.
    // This prevents a blank intermediate frame between the grid and the study.
    timers.current.push(window.setTimeout(() => router.push(nextItem.href), 360));
    timers.current.push(window.setTimeout(() => setLeaving(true), 900));
    timers.current.push(window.setTimeout(() => {
      setItem(null);
      setActive(false);
      setLeaving(false);
      clearTimers();
    }, 1190));
  };

  const destination = item && typeof window !== "undefined" ? getDestination() : null;
  const cardStyle = item && destination ? {
    "--start-left": `${item.rect.left}px`,
    "--start-top": `${item.rect.top}px`,
    "--start-width": `${item.rect.width}px`,
    "--start-height": `${item.rect.height}px`,
    "--end-left": `${destination.left}px`,
    "--end-top": `${destination.top}px`,
    "--end-width": `${destination.width}px`,
    "--end-height": `${destination.height}px`,
    "--end-copy-left": `${destination.copyLeft}px`,
    "--end-copy-top": `${destination.copyTop}px`,
  } as CSSProperties : undefined;

  return (
    <TransitionContext.Provider value={{ openCaseStudy, isOpening: Boolean(item) }}>
      {children}
      {item && (
        <div className={`case-study-transition ${active ? "is-active" : ""} ${leaving ? "is-leaving" : ""}`} style={cardStyle} aria-hidden>
          <div className="case-study-transition__dim" />
          <div className="case-study-transition__video">
            {item.videoSrc ? (
              <video src={item.videoSrc} autoPlay muted loop playsInline preload="auto" className="size-full object-cover" />
            ) : item.posterSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.posterSrc} alt="" className="size-full object-cover" />
            ) : (
              <div className="size-full" style={item.posterStyle} />
            )}
          </div>
          <div className="case-study-transition__copy">
            <p className="eyebrow">Case study</p>
            <p className="display mt-5 text-[clamp(3rem,5.5vw,6rem)] leading-[0.9]">{item.client}</p>
            <p className="mt-6 max-w-[28ch] text-lg leading-8 text-fg/80 md:text-xl">{item.outcome}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {item.tags.map((tag) => <span key={tag} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{tag}</span>)}
            </div>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
