"use client";

import { useEffect } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

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

function NextSection({ label }: { label: string }) {
  return (
    <div className="mt-auto flex snap-start snap-always items-center justify-between gap-5 border-t border-line pt-6">
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-fg/85">{label}</span>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-muted">
        <ArrowDown size={15} weight="light" />
      </span>
    </div>
  );
}

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
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-md sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} case study`}
        onClick={onClose}
      >
        <motion.div
          className="relative grid w-full max-w-6xl overflow-hidden rounded-[20px] border border-white/10 bg-ink/70 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl lg:h-[min(760px,90vh)] lg:grid-cols-[1.08fr_0.92fr]"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, x: 40 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <motion.div
            className="relative z-10 flex min-h-[280px] items-center justify-center overflow-hidden bg-transparent p-3 sm:p-5 lg:min-h-0"
            initial={{ x: 150 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.15, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              className="h-auto max-h-[70vh] max-w-full object-contain"
              src={`${R2_VIDEO_BASE_URL}/${slug}.mp4`}
              autoPlay
              controls
              playsInline
              preload="auto"
              onLoadedData={(event) => {
                const video = event.currentTarget;
                video.volume = 0.5;
                video.muted = false;
                void video.play().catch(() => {
                  video.muted = true;
                  void video.play().catch(() => {});
                });
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-xs uppercase tracking-[0.18em] text-white/70">
              {kind} · {tags[0]}
            </div>
          </motion.div>

          <motion.aside
            className="relative z-0 min-w-0 overflow-x-hidden overflow-y-auto scroll-smooth snap-y snap-mandatory bg-transparent lg:h-full"
            initial={{ x: -180, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="absolute right-6 top-6 z-10 rounded-full border border-line bg-ink/40 px-3 py-1.5 text-xs text-muted backdrop-blur transition-colors hover:border-fg hover:text-fg sm:right-9 sm:top-9"
              onClick={onClose}
            >
              Close
            </button>

            <section className="flex min-h-[520px] snap-start snap-always flex-col p-6 sm:p-9 lg:min-h-full">
              <motion.div initial={{ opacity: 0, x: 14, y: 6 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}>
                <p className="eyebrow">Case study</p>
                <h2 className="display mt-5 max-w-[10ch] break-words text-5xl leading-[0.96] sm:text-6xl">{title}</h2>
                <p className="mt-7 max-w-[32ch] text-lg leading-8 text-fg/80">{line}</p>
              </motion.div>
              <NextSection label="What was the challenge?" />
            </section>

            <section className="flex min-h-[520px] flex-col p-6 sm:p-9 lg:min-h-full">
              <p className="display max-w-[18ch] text-3xl leading-[1.22] text-fg sm:text-4xl">{copy.challenge}</p>
              <NextSection label="Our approach" />
            </section>

            <section className="flex min-h-[520px] flex-col p-6 sm:p-9 lg:min-h-full">
              <p className="display max-w-[18ch] text-3xl leading-[1.22] text-fg sm:text-4xl">{copy.approach}</p>
              <NextSection label="Result" />
            </section>

            <section className="flex min-h-[520px] flex-col p-6 sm:p-9 lg:min-h-full">
              <p className="display max-w-[18ch] text-3xl leading-[1.22] text-fg sm:text-4xl">{copy.result}</p>
              <button type="button" className="mt-auto inline-flex w-fit rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-blue hover:text-blue" onClick={onClose}>
                Back to all work
              </button>
            </section>
          </motion.aside>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
