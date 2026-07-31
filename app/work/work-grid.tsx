"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties } from "react";
import PageShell from "@/components/PageShell";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";
import WorkCard from "@/components/ui/WorkCard";

type Kind = "All" | "2D" | "3D";

type Piece = {
  title: string;
  line: string;
  kind: Exclude<Kind, "All">;
  tags: string[];
  /** Drop a compressed web preview at /video/work/<slug>.mp4 to enable hover play */
  slug: string;
  posterStyle: CSSProperties;
};

const CASE_STUDY_COPY: Record<string, { challenge: string; approach: string; result: string }> = {
  wafersight: {
    challenge: "Turn dense semiconductor data into a story a buyer can understand quickly.",
    approach: "A crisp 2D explainer that maps the product journey from signal to decision.",
    result: "A launch-ready film for the homepage, sales conversations and technical demos.",
  },
  orally: {
    challenge: "Make a complex blockchain protocol feel clear and approachable.",
    approach: "A concise visual narrative that translates infrastructure into human outcomes.",
    result: "A product story that can introduce the platform before a sales conversation starts.",
  },
  miggles: {
    challenge: "Create a high-energy 3D film for a coin launch and infrastructure update.",
    approach: "Glossy materials, rhythmic motion and a strong central object build momentum.",
    result: "A memorable launch asset for social, community and announcement moments.",
  },
  hyper: {
    challenge: "Give cloud development infrastructure a visual identity with technical depth.",
    approach: "A 3D brand film using scale, light and movement to make infrastructure feel tangible.",
    result: "A hero film that gives a technical product a distinctive launch presence.",
  },
  tooltip: {
    challenge: "Explain a SaaS product fast enough for paid social.",
    approach: "Tight 2D pacing and clear visual beats keep the message focused.",
    result: "A short-form-ready explainer built to earn attention quickly.",
  },
  figmatica: {
    challenge: "Show the value of design tooling through a fast, visual product story.",
    approach: "A showreel structure combines product moments with a confident visual rhythm.",
    result: "A versatile film for launch pages, demos and brand channels.",
  },
  platinum: {
    challenge: "Give a brand promo enough energy to work in a crowded feed.",
    approach: "Sharp cuts, bold movement and a focused visual motif drive the piece.",
    result: "A flexible promo cut that can be adapted into multiple ad variants.",
  },
  "woodland-eco": {
    challenge: "Tell an eco-brand story with warmth without losing visual clarity.",
    approach: "Layered motion and atmospheric transitions create a calm, memorable narrative.",
    result: "A brand story that works across a landing page, social and presentations.",
  },
  venom: {
    challenge: "Use material, light and form to make a 3D concept piece feel premium.",
    approach: "A vertical-first composition turns a single object into a visual event.",
    result: "A striking social-ready film designed to stop the scroll.",
  },
  "kind-sigma-glasses": {
    challenge: "Make a physical product feel desirable through motion and detail.",
    approach: "Controlled 3D lighting and product framing keep attention on the form.",
    result: "A clean product visual for launch, ecommerce and paid media.",
  },
};

const R2_VIDEO_BASE_URL = "https://pub-9ff429d084548f5b38c2273dbfe2921.r2.dev";

/* Sourced from the studio Drive (2d animations / 3d animations folders).
   Outcome lines are working copy; Denys refines per piece. */
const PIECES: Piece[] = [
  {
    title: "Wafersight",
    line: "A dense semiconductor data platform, made clear in 60 seconds.",
    kind: "2D",
    tags: ["Explainer", "Deep Tech"],
    slug: "wafersight",
    posterStyle: {
      background:
        "radial-gradient(120% 140% at 80% 0%, rgba(108,133,235,0.3), transparent 55%), repeating-radial-gradient(circle at 25% 130%, rgba(155,161,173,0.09) 0 1px, transparent 1px 26px), linear-gradient(160deg, #131620 0%, #0e1118 55%, #121a30 100%)",
    },
  },
  {
    title: "Orally",
    line: "A blockchain protocol explained simply enough to convert.",
    kind: "2D",
    tags: ["Explainer", "Blockchain"],
    slug: "orally",
    posterStyle: {
      background:
        "linear-gradient(115deg, #10131c 40%, rgba(169,199,255,0.12) 70%, #10131c 95%), radial-gradient(90% 120% at 15% 100%, rgba(108,133,235,0.22), transparent 60%), #131620",
    },
  },
  {
    title: "Miggles",
    line: "A 3D launch film for a coin launch and infrastructure update.",
    kind: "3D",
    tags: ["Launch", "Web3"],
    slug: "miggles",
    posterStyle: {
      background:
        "radial-gradient(60% 80% at 50% 45%, rgba(234,241,255,0.16), transparent 60%), radial-gradient(120% 120% at 80% 110%, rgba(43,60,114,0.7), transparent 70%), #10131c",
    },
  },
  {
    title: "Hyper",
    line: "A 3D brand film built for a technical audience.",
    kind: "3D",
    tags: ["Brand film"],
    slug: "hyper",
    posterStyle: {
      background:
        "radial-gradient(100% 140% at 20% 10%, rgba(169,199,255,0.2), transparent 55%), linear-gradient(200deg, #131620 20%, #0e1118 90%)",
    },
  },
  {
    title: "ToolTip",
    line: "A SaaS product explainer, tight enough for paid social.",
    kind: "2D",
    tags: ["Explainer", "SaaS"],
    slug: "tooltip",
    posterStyle: {
      background:
        "linear-gradient(140deg, rgba(234,241,255,0.09), transparent 40%), linear-gradient(320deg, #121a30 10%, #0e1118 70%)",
    },
  },
  {
    title: "Figmatica",
    line: "A product showreel for a design-tooling brand.",
    kind: "2D",
    tags: ["Showreel", "Product"],
    slug: "figmatica",
    posterStyle: {
      background:
        "radial-gradient(90% 120% at 85% 15%, rgba(108,133,235,0.26), transparent 55%), linear-gradient(160deg, #10131c, #131620)",
    },
  },
  {
    title: "Platinum",
    line: "A brand promo cut for speed and rhythm.",
    kind: "2D",
    tags: ["Promo"],
    slug: "platinum",
    posterStyle: {
      background:
        "linear-gradient(105deg, #0e1118 30%, rgba(169,199,255,0.14) 60%, #0e1118 90%), #10131c",
    },
  },
  {
    title: "WoodLand Eco",
    line: "An eco-brand story told in motion.",
    kind: "2D",
    tags: ["Brand story"],
    slug: "woodland-eco",
    posterStyle: {
      background:
        "radial-gradient(110% 150% at 30% 110%, rgba(43,60,114,0.6), transparent 65%), linear-gradient(150deg, #121622, #0e1118)",
    },
  },
  {
    title: "Venom",
    line: "A 3D concept piece pushing material and light.",
    kind: "3D",
    tags: ["Concept"],
    slug: "venom",
    posterStyle: {
      background:
        "radial-gradient(70% 90% at 50% 60%, rgba(234,241,255,0.12), transparent 60%), radial-gradient(130% 130% at 15% 0%, rgba(43,60,114,0.8), transparent 70%), #0e1118",
    },
  },
  {
    title: "Kind Sigma Glasses",
    line: "A 3D product visual for eyewear.",
    kind: "3D",
    tags: ["Product"],
    slug: "kind-sigma-glasses",
    posterStyle: {
      background:
        "radial-gradient(80% 110% at 70% 100%, rgba(169,199,255,0.18), transparent 60%), linear-gradient(180deg, #131620, #0e1118)",
    },
  },
];

const FILTERS: Kind[] = ["All", "2D", "3D"];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Kind>("All");
  const [selected, setSelected] = useState<Piece | null>(null);
  const visible = PIECES.filter((p) => filter === "All" || p.kind === filter);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <PageShell>
      <h1 className="display max-w-[26ch] text-[clamp(2.8rem,5.8vw,5rem)]">
        Work that makes complex products clear.
      </h1>
      <div className="mt-12 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Tag key={f} filter active={filter === f} onClick={() => setFilter(f)}>
            {f === "All" ? "All" : `${f} animation`}
          </Tag>
        ))}
      </div>
      <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <WorkCard
              client={p.title}
              outcome={p.line}
              tags={[p.kind, ...p.tags]}
              posterStyle={p.posterStyle}
              videoSrc={`/video/work/${p.slug}.mp4`}
              onOpen={() => setSelected(p)}
            />
          </Reveal>
        ))}
      </div>
      <p className="mt-20 inline-flex items-center gap-2.5 text-sm text-muted">
        <span className="size-1.5 rounded-full bg-blue" />
        Cybersecurity pieces in production. New work landing soon.
      </p>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} case study`}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative grid max-h-[min(760px,90vh)] w-full max-w-6xl overflow-hidden rounded-[20px] border border-white/10 bg-ink/70 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]"
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
                  src={`${R2_VIDEO_BASE_URL}/${selected.slug}.mp4`}
                  autoPlay
                  muted
                  defaultMuted
                  controls
                  playsInline
                  preload="auto"
                  onLoadedData={(event) => {
                    const video = event.currentTarget;
                    video.muted = true;
                    void video.play().catch(() => {});
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-xs uppercase tracking-[0.18em] text-white/70">
                  {selected.kind} · {selected.tags[0]}
                </div>
              </motion.div>

              <motion.aside
                className="relative z-0 min-w-0 overflow-x-hidden overflow-y-auto bg-transparent p-6 sm:p-9"
                initial={{ x: -180, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.15, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: 14, y: 6 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="eyebrow">Case study</p>
                    <h2 className="display mt-4 break-words text-4xl sm:text-5xl">{selected.title}</h2>
                  </motion.div>
                  <motion.button
                    type="button"
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-fg hover:text-fg"
                    onClick={() => setSelected(null)}
                    initial={{ opacity: 0, x: 10, y: 4 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Close
                  </motion.button>
                </div>
                <motion.p
                  className="mt-5 text-base leading-7 text-muted"
                  initial={{ opacity: 0, x: 14, y: 6 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {selected.line}
                </motion.p>
                <motion.div
                  className="mt-6 flex flex-wrap gap-2"
                  initial={{ opacity: 0, x: 14, y: 6 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {selected.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </motion.div>
                <div className="mt-9 space-y-7 border-t border-line pt-7">
                  {(["challenge", "approach", "result"] as const).map((section) => (
                    <motion.div
                      key={section}
                      initial={{ opacity: 0, x: 14, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="eyebrow">{section}</p>
                      <p className="mt-2 text-sm leading-6 text-fg/85">{CASE_STUDY_COPY[selected.slug][section]}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  type="button"
                  className="mt-9 inline-flex rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-blue hover:text-blue"
                  onClick={() => setSelected(null)}
                  initial={{ opacity: 0, x: 14, y: 6 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  Back to all work
                </motion.button>
              </motion.aside>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
