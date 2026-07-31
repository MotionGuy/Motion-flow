"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tag from "./Tag";

type CaseStudyModalProps = {
  title: string;
  line: string;
  kind: string;
  tags: string[];
  slug: string;
  copy: { challenge: string; approach: string; result: string };
  onClose: () => void;
};

const R2_VIDEO_BASE_URL = "https://pub-9ff429d0848548f5b38c2273dbfe2921.r2.dev";

export default function CaseStudyModal({ title, line, kind, tags, slug, copy, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-md sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} role="dialog" aria-modal="true" aria-label={`${title} case study`} onClick={onClose}>
        <motion.div className="relative grid max-h-[min(760px,90vh)] w-full max-w-6xl overflow-hidden rounded-[20px] border border-white/10 bg-ink/70 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]" initial={{ opacity: 0, scale: 0.88, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, x: 40 }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()}>
          <motion.div className="relative z-10 flex min-h-[280px] items-center justify-center overflow-hidden bg-transparent p-3 sm:p-5 lg:min-h-0" initial={{ x: 150 }} animate={{ x: 0 }} transition={{ duration: 1.15, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}>
            <video className="h-auto max-h-[70vh] max-w-full object-contain" src={`${R2_VIDEO_BASE_URL}/${slug}.mp4`} autoPlay controls playsInline preload="auto" onLoadedData={(event) => {
              const video = event.currentTarget;
              video.volume = 0.5;
              video.muted = false;
              void video.play().catch(() => {
                video.muted = true;
                void video.play().catch(() => {});
              });
            }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-xs uppercase tracking-[0.18em] text-white/70">{kind} · {tags[0]}</div>
          </motion.div>
          <motion.aside className="relative z-0 min-w-0 overflow-x-hidden overflow-y-auto bg-transparent p-6 sm:p-9" initial={{ x: -180, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.15, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-start justify-between gap-4"><motion.div initial={{ opacity: 0, x: 14, y: 6 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}><p className="eyebrow">Case study</p><h2 className="display mt-4 break-words text-4xl sm:text-5xl">{title}</h2></motion.div><button type="button" className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-fg hover:text-fg" onClick={onClose}>Close</button></div>
            <p className="mt-5 text-base leading-7 text-muted">{line}</p>
            <div className="mt-6 flex flex-wrap gap-2">{tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
            <div className="mt-9 space-y-7 border-t border-line pt-7">{(["challenge", "approach", "result"] as const).map((section) => <div key={section}><p className="eyebrow">{section}</p><p className="mt-2 text-sm leading-6 text-fg/85">{copy[section]}</p></div>)}</div>
            <button type="button" className="mt-9 inline-flex rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-blue hover:text-blue" onClick={onClose}>Back to all work</button>
          </motion.aside>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
