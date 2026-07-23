"use client";

import { useEffect, useState } from "react";
import { Play } from "@phosphor-icons/react";
import GlassIcon from "@/components/ui/GlassIcon";

/**
 * Founder film block. Drop the real footage at /video/founder.mp4 (with an
 * optional poster at /video/founder-poster.jpg) and it plays in place; until
 * then an elegant placeholder holds the slot.
 */
export default function FounderVideo() {
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/video/founder.mp4", { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (!cancelled && r.ok && type.startsWith("video")) setHasVideo(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (hasVideo) {
    return (
      <video
        className="aspect-video w-full rounded-[14px] border border-line object-cover"
        src="/video/founder.mp4"
        poster="/video/founder-poster.jpg"
        controls
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[14px] border border-line"
      style={{
        background:
          "radial-gradient(110% 150% at 50% 120%, rgba(108,133,235,0.28), transparent 60%), linear-gradient(160deg, #131620 20%, #0e1118 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <GlassIcon className="size-16 rounded-full">
          <Play size={24} weight="fill" />
        </GlassIcon>
        <p className="max-w-[34ch] text-sm text-muted">
          The founder film is in production: why we niched into cybersecurity,
          straight to camera.
        </p>
      </div>
    </div>
  );
}
