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
  previewSrc?: string;
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
    challenge: "As the brand prepared to showcase its latest collection, it needed more than traditional product visuals. The goal was to communicate craftsmanship, elevate perceived value, and create an emotional connection that reflects the premium nature of the product.",
    approach: "We partnered with Kind Sigma to produce a cinematic 3D product film that highlights every detail through macro shots, refined lighting, and fluid camera movement.",
    result: "The result is a launch-ready visual asset designed for websites, social media, paid campaigns, and presentations, helping the brand stand out, strengthen its identity, and inspire purchase confidence.",
  },
  nettyworth: {
    challenge: "The goal of this animation was to demonstrate how users could leverage multiple on-chain assets, including Polymarket prediction positions, to borrow liquidity through on-chain lending.",
    approach: "By simplifying a complex DeFi workflow into a clear visual story",
    result: "The video helped communicate the platform's value proposition to potential users and investors.",
  },
};

const R2_VIDEO_BASE_URL = "https://pub-9ff429d0848548f5b38c2273dbfe2921.r2.dev";

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
    title: "Kind Sigma",
    line: "Kind Sigma creates premium eyewear that blends contemporary design, precision engineering, and everyday functionality.",
    kind: "3D",
    tags: ["Product"],
    slug: "kind-sigma-glasses",
    posterStyle: {
      background:
        "radial-gradient(80% 110% at 70% 100%, rgba(169,199,255,0.18), transparent 60%), linear-gradient(180deg, #131620, #0e1118)",
    },
  },
  {
    title: "NettyWorth",
    line: "A Web3 platform for decentralized lending and liquidity management.",
    kind: "3D",
    tags: ["Web3", "DeFi"],
    slug: "nettyworth",
    previewSrc: `${R2_VIDEO_BASE_URL}/NettyWorth.mp4`,
    posterStyle: {
      background:
        "radial-gradient(85% 100% at 75% 20%, rgba(108,133,235,0.24), transparent 58%), radial-gradient(100% 130% at 15% 110%, rgba(68,198,255,0.18), transparent 62%), #10131c",
    },
  },
  {
    title: "AI Transforming",
    line: "How AI helps creative teams produce high-quality video content faster.",
    kind: "3D",
    tags: ["AI", "Creative"],
    slug: "ai-transforming",
    previewSrc: `${R2_VIDEO_BASE_URL}/AItransforming.mp4`,
    posterStyle: { background: "radial-gradient(90% 110% at 80% 10%, rgba(108,133,235,0.25), transparent 60%), #10131c" },
  },
  {
    title: "Arch Public",
    line: "A digital investment platform for alternative assets.",
    kind: "3D",
    tags: ["Fintech", "Investment"],
    slug: "arch-public",
    previewSrc: `${R2_VIDEO_BASE_URL}/Arch_Public.mp4`,
    posterStyle: { background: "radial-gradient(100% 120% at 20% 100%, rgba(43,60,114,0.6), transparent 65%), #10131c" },
  },
  {
    title: "Game Rock",
    line: "Premium portable gaming devices, pairing retro-inspired aesthetics with modern high-performance hardware.",
    kind: "3D",
    tags: ["Product", "Gaming"],
    slug: "game-rock",
    previewSrc: `${R2_VIDEO_BASE_URL}/Game_Rock.mp4`,
    posterStyle: { background: "radial-gradient(90% 120% at 50% 10%, rgba(169,199,255,0.2), transparent 60%), #10131c" },
  },
  {
    title: "Gemini 2",
    line: "A next-generation AI search experience for intelligent discovery.",
    kind: "3D",
    tags: ["AI", "Search"],
    slug: "gemini-2",
    previewSrc: `${R2_VIDEO_BASE_URL}/Gemini2.mp4`,
    posterStyle: { background: "radial-gradient(90% 100% at 80% 20%, rgba(108,133,235,0.24), transparent 58%), #10131c" },
  },
  {
    title: "Hook",
    line: "A data-driven framework for testing marketing hooks before a full campaign.",
    kind: "3D",
    tags: ["Marketing", "Data"],
    slug: "hook",
    previewSrc: `${R2_VIDEO_BASE_URL}/Hook.mp4`,
    posterStyle: { background: "radial-gradient(100% 130% at 15% 110%, rgba(43,60,114,0.6), transparent 65%), #10131c" },
  },
  {
    title: "NearVille",
    line: "A peer-to-peer rental platform for trusted local communities.",
    kind: "3D",
    tags: ["Marketplace", "Product"],
    slug: "nearville",
    previewSrc: `${R2_VIDEO_BASE_URL}/NearVille.mp4`,
    posterStyle: { background: "radial-gradient(90% 120% at 65% 0%, rgba(169,199,255,0.18), transparent 60%), #10131c" },
  },
  {
    title: "SaaS Companies",
    line: "A motion graphics explainer for video strategy across the customer journey.",
    kind: "3D",
    tags: ["SaaS", "Marketing"],
    slug: "saas-companies",
    previewSrc: `${R2_VIDEO_BASE_URL}/SaaS_companies.mp4`,
    posterStyle: { background: "radial-gradient(90% 110% at 75% 20%, rgba(108,133,235,0.25), transparent 60%), #10131c" },
  },
  {
    title: "Concept Video",
    line: "Cinematic motion design and UI animation for complex digital products.",
    kind: "3D",
    tags: ["SaaS", "UI animation"],
    slug: "concept-video",
    previewSrc: `${R2_VIDEO_BASE_URL}/concept_video.mp4`,
    posterStyle: { background: "radial-gradient(100% 120% at 25% 110%, rgba(43,60,114,0.7), transparent 66%), #10131c" },
  },
  {
    title: "Gemini",
    line: "An AI assistant for creating, learning, writing, coding, and problem solving.",
    kind: "3D",
    tags: ["AI", "Product"],
    slug: "gemini",
    previewSrc: `${R2_VIDEO_BASE_URL}/gemini.mp4`,
    posterStyle: { background: "radial-gradient(90% 110% at 78% 15%, rgba(169,199,255,0.22), transparent 60%), #10131c" },
  },
  {
    title: "Pisteyo",
    line: "An AI-powered platform for turning product ideas into interactive prototypes.",
    kind: "3D",
    tags: ["AI", "Product"],
    slug: "pisteyo",
    previewSrc: `${R2_VIDEO_BASE_URL}/pisteyo.mp4`,
    posterStyle: { background: "radial-gradient(100% 125% at 20% 100%, rgba(108,133,235,0.24), transparent 64%), #10131c" },
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
              videoSrc={p.previewSrc ?? `/video/work/${p.slug}.mp4`}
              href={`/work/${p.slug}`}
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
