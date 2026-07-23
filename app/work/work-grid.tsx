"use client";

import { useState } from "react";
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
  const visible = PIECES.filter((p) => filter === "All" || p.kind === filter);

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
            />
          </Reveal>
        ))}
      </div>
      <p className="mt-20 inline-flex items-center gap-2.5 text-sm text-muted">
        <span className="size-1.5 rounded-full bg-blue" />
        Cybersecurity pieces in production. New work landing soon.
      </p>
    </PageShell>
  );
}
