"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import Tag from "./Tag";
import { useCaseStudyTransition } from "@/components/CaseStudyTransition";

type WorkCardProps = {
  client: string;
  outcome: string;
  tags: string[];
  /** Omit while case-study pages don't exist yet; card renders unlinked */
  href?: string;
  onOpen?: () => void;
  /** Poster background while real video assets land: a bespoke gradient per client */
  posterStyle?: CSSProperties;
  /** When real assets exist: poster image + hover-autoplay video */
  posterSrc?: string;
  videoSrc?: string;
  /** Poster ratio override for composed grids (default 16:9) */
  aspectClass?: string;
  className?: string;
};

/**
 * Work card: previews autoplay silently so the grid feels alive. Hovering a
 * card enlarges it, while sound is available only in the opened video player.
 */
export default function WorkCard({
  client,
  outcome,
  tags,
  href,
  onOpen,
  posterStyle,
  posterSrc,
  videoSrc,
  aspectClass = "aspect-video",
  className = "",
}: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(false);
  const router = useRouter();
  const caseStudyTransition = useCaseStudyTransition();
  const wrapperClass = `group relative block w-full transform-gpu transition-[transform,filter,opacity] duration-[620ms] [transition-timing-function:var(--ease-out-expo)] motion-safe:hover:z-10 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.035] motion-safe:hover:drop-shadow-[0_28px_42px_rgba(0,0,0,0.45)] ${opening ? "z-[80] scale-[1.045] brightness-110 saturate-110" : ""} ${className}`;

  const keepPlayingMuted = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  };

  const card = (
      <article>
        <div ref={mediaRef} className={`relative ${aspectClass} overflow-hidden rounded-[14px] border border-line bg-panel transition-shadow duration-300 group-hover:shadow-[0_28px_56px_-20px_rgba(0,0,0,0.7),0_0_36px_rgba(169,199,255,0.08)]`}>
          {posterSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterSrc}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] motion-safe:group-hover:scale-[1.04]"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] motion-safe:group-hover:scale-[1.04]"
              style={posterStyle}
            />
          )}
          {videoSrc && (
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover opacity-100 transform-gpu transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] motion-safe:group-hover:scale-[1.06]"
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={keepPlayingMuted}
              onPointerLeave={keepPlayingMuted}
              onBlur={keepPlayingMuted}
            />
          )}
          {/* Scan line: quiet stand-in for the hover-playing state */}
          <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-white/5">
            <span className="absolute inset-0 origin-left bg-blue opacity-0 group-hover:opacity-80 motion-safe:group-hover:animate-[scan_2.4s_linear_infinite]" />
          </span>
        </div>

        <h3 className="display mt-5 text-2xl">{client}</h3>
        <p className="mt-1.5 max-w-[46ch] text-[15px] leading-relaxed text-muted">
          {outcome}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </article>
  );

  if (onOpen) {
    return (
      <button type="button" className={`${wrapperClass} text-left`} onClick={onOpen}>
        {card}
      </button>
    );
  }

  if (href) {
    return (
      <>
        <Link
          href={href}
          className={wrapperClass}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || opening) return;
            event.preventDefault();
            const rect = mediaRef.current?.getBoundingClientRect();
            if (caseStudyTransition && rect) {
              caseStudyTransition.openCaseStudy({ href, client, outcome, tags, videoSrc, posterSrc, posterStyle, rect });
              return;
            }
            setOpening(true);
            window.setTimeout(() => router.push(href), 520);
          }}
        >
          {card}
        </Link>
      </>
    );
  }
  return <div className={wrapperClass}>{card}</div>;
}
