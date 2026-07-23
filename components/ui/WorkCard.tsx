"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import Tag from "./Tag";

type WorkCardProps = {
  client: string;
  outcome: string;
  tags: string[];
  /** Omit while case-study pages don't exist yet; card renders unlinked */
  href?: string;
  /** Poster background while real video assets land: a bespoke gradient per client */
  posterStyle?: CSSProperties;
  /** When real assets exist: poster image + hover-autoplay video */
  posterSrc?: string;
  videoSrc?: string;
  className?: string;
};

/**
 * Work card: whole card clickable, lifts on hover with a blue-tinted shadow.
 * The thumbnail autoplays muted ON HOVER ONLY (performance rule); a subtle
 * scan line stands in for the playing state until real assets land.
 */
export default function WorkCard({
  client,
  outcome,
  tags,
  href,
  posterStyle,
  posterSrc,
  videoSrc,
  className = "",
}: WorkCardProps) {
  const wrapperClass = `group block transition-[transform] duration-300 [transition-timing-function:var(--ease-out-expo)] motion-safe:hover:-translate-y-1 ${className}`;

  const card = (
      <article>
        <div className="relative aspect-video overflow-hidden rounded-[14px] border border-line bg-panel transition-shadow duration-300 group-hover:shadow-[0_28px_56px_-20px_rgba(0,0,0,0.7),0_0_36px_rgba(169,199,255,0.08)]">
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
              className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              src={videoSrc}
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
              onMouseLeave={(e) => e.currentTarget.pause()}
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

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {card}
      </Link>
    );
  }
  return <div className={wrapperClass}>{card}</div>;
}
