"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import Tag from "./Tag";

type WorkCardProps = {
  client: string;
  outcome: string;
  tags: string[];
  href: string;
  /** Runtime shown in the corner timecode chip, e.g. "00:42" */
  runtime?: string;
  /** Poster background while real video assets land — a bespoke gradient per client */
  posterStyle?: CSSProperties;
  /** When real assets exist: poster image + hover-autoplay video */
  posterSrc?: string;
  videoSrc?: string;
};

/**
 * Work card: whole card clickable, lifts -4px on hover with a violet-tinted
 * shadow. The thumbnail autoplays muted ON HOVER ONLY (performance rule) —
 * until real assets land, a scan bar simulates the playing state.
 */
export default function WorkCard({
  client,
  outcome,
  tags,
  href,
  runtime = "00:60",
  posterStyle,
  posterSrc,
  videoSrc,
}: WorkCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl transition-[transform,box-shadow] duration-200 [transition-timing-function:var(--ease-micro)] motion-safe:hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6),0_0_32px_rgba(110,86,247,0.12)]"
    >
      <article>
        <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-panel">
          {/* Poster layer */}
          {posterSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterSrc}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] motion-safe:group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] motion-safe:group-hover:scale-[1.03]"
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
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          )}

          {/* Timecode chip */}
          <span className="absolute left-3 top-3 rounded bg-ink/70 px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-muted backdrop-blur-sm">
            {runtime}
          </span>

          {/* Hover state: label swap + scan bar simulating muted autoplay */}
          <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="text-muted transition-opacity duration-200 group-hover:opacity-0">
              Hover to preview
            </span>
            <span className="absolute right-0 top-0 whitespace-nowrap text-violet-bright opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              ▶ Playing · muted
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-white/5">
            <span className="absolute inset-0 origin-left bg-violet opacity-0 group-hover:opacity-100 motion-safe:group-hover:animate-[scan_2.4s_linear_infinite]" />
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-fg">
            {client}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-200 group-hover:text-violet-bright">
            Case study →
          </span>
        </div>
        <p className="mt-1 text-[15px] leading-relaxed text-muted">{outcome}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </article>
    </Link>
  );
}
