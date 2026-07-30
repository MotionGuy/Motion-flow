"use client";

import Link from "next/link";
import { useRef } from "react";
import type { CSSProperties } from "react";
import Tag from "./Tag";

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
 * card enlarges it and attempts to enable its soundtrack; browsers may still
 * require an earlier user gesture before allowing audio.
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
  const wrapperClass = `group relative block transform-gpu transition-[transform,filter] duration-500 [transition-timing-function:var(--ease-out-expo)] motion-safe:hover:z-10 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.035] motion-safe:hover:drop-shadow-[0_28px_42px_rgba(0,0,0,0.45)] ${className}`;

  const playWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {
      // Autoplay policies can reject sound until the visitor clicks once.
      video.muted = true;
      video.play().catch(() => {});
    });
  };

  const keepPlayingMuted = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  };

  const card = (
      <article>
        <div className={`relative ${aspectClass} overflow-hidden rounded-[14px] border border-line bg-panel transition-shadow duration-300 group-hover:shadow-[0_28px_56px_-20px_rgba(0,0,0,0.7),0_0_36px_rgba(169,199,255,0.08)]`}>
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
              onPointerEnter={playWithSound}
              onPointerLeave={keepPlayingMuted}
              onFocus={playWithSound}
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
      <Link href={href} className={wrapperClass}>
        {card}
      </Link>
    );
  }
  return <div className={wrapperClass}>{card}</div>;
}
