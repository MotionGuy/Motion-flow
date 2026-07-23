"use client";

import { useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import Glow from "@/components/ui/Glow";
import WorkCard from "@/components/ui/WorkCard";
import TextReveal from "@/components/ui/TextReveal";
import Preloader from "@/components/ui/Preloader";
import LiquidBackground from "@/components/ui/LiquidBackground";

/* ————————————————————————————————————————————————
   Spec scaffolding (internal documentation page)
   ———————————————————————————————————————————————— */

function Section({
  name,
  note,
  children,
}: {
  name: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-12">
        <header>
          <h2 className="display text-3xl">{name}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{note}</p>
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function Spec({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-muted">
      {items.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

/* ————————————————————————————————————————————————
   Color
   ———————————————————————————————————————————————— */

const SWATCHES = [
  { name: "Ink", hex: "#0B0D13", varName: "--color-ink", use: "Page background. Near-black, slightly cool." },
  { name: "Panel", hex: "#131620", varName: "--color-panel", use: "Surfaces, embeds, posters." },
  { name: "Hairline", hex: "#232838", varName: "--color-line", use: "1px borders and dividers." },
  { name: "Hairline +", hex: "#39415A", varName: "--color-line-bright", use: "Border hover state. Brightens, never thickens." },
  { name: "Text", hex: "#F5F7FA", varName: "--color-fg", use: "Primary text. Never pure white." },
  { name: "Muted", hex: "#9BA1AD", varName: "--color-muted", use: "Secondary text and captions." },
  { name: "Blue", hex: "#A9C7FF", varName: "--color-blue", use: "The only color. Buttons, glows, focus." },
  { name: "Ice", hex: "#EAF1FF", varName: "--color-ice", use: "Near-white end of the button gradient." },
  { name: "Tide", hex: "#6C85EB", varName: "--color-tide", use: "Deep periwinkle. Liquid gradient only, never UI." },
];

function ColorSection() {
  return (
    <Section
      name="Color"
      note="Monochrome dark plus white. The single color is soft light blue; it appears only on buttons, glows, and focus. No purple, no neon."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SWATCHES.map((s) => (
          <div key={s.name} className="rounded-[14px] border border-line bg-panel p-3">
            <div className="h-16 rounded-[10px] border border-line" style={{ background: s.hex }} />
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">{s.name}</span>
              <span className="font-mono text-[10px] text-muted">{s.hex}</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.use}</p>
            <code className="mt-2 block font-mono text-[10px] text-muted/70">{s.varName}</code>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   Typography
   ———————————————————————————————————————————————— */

function TypeRow({
  spec,
  children,
  last,
}: {
  spec: string[];
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`grid gap-4 py-8 lg:grid-cols-[210px_1fr] lg:gap-8 ${last ? "" : "border-b border-line"}`}>
      <Spec items={spec} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function TypeSection() {
  return (
    <Section
      name="Typography"
      note="Fraunces at high optical size carries the cinema; Geist carries the reading; Geist Mono carries labels. Italic is the emphasis move, always same-family."
    >
      <div className="-mt-8">
        <TypeRow spec={["Fraunces · opsz 144", "clamp(2.6rem to 4.6rem)", "lh 1.08 · track -0.015em"]}>
          <p className="display text-[clamp(2.6rem,5vw,4.6rem)]">
            Launch videos that make cybersecurity <em className="pr-1">make sense.</em>
          </p>
        </TypeRow>
        <TypeRow spec={["Fraunces · opsz 144", "clamp(2.2rem to 3.6rem)"]}>
          <p className="display text-[clamp(2.2rem,4vw,3.6rem)]">
            Security is invisible. We make it impossible to ignore.
          </p>
        </TypeRow>
        <TypeRow spec={["Geist 500", "1.25rem · lh 1.4"]}>
          <p className="text-xl font-medium">Launch &amp; category explainers</p>
        </TypeRow>
        <TypeRow spec={["Geist 400", "1.125rem · lh 1.7", "max 48ch"]}>
          <p className="max-w-[48ch] text-lg leading-[1.7]">
            We turn zero trust, threat detection, and complex security products
            into short, clear videos that convert.
          </p>
        </TypeRow>
        <TypeRow spec={["Geist 400", "1rem · lh 1.6", "muted for secondary"]}>
          <p className="max-w-[52ch] text-muted">
            Buyers don&apos;t fund what they can&apos;t picture. We visualize
            the real system, no hooded hackers, no padlocks, so your product
            lands in seconds.
          </p>
        </TypeRow>
        <TypeRow spec={["Geist Mono 500", "0.72rem · track 0.22em", "uppercase · rationed"]} last>
          <span className="eyebrow">Motion Studio · Cybersecurity</span>
        </TypeRow>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   Buttons
   ———————————————————————————————————————————————— */

function ButtonSection() {
  return (
    <Section
      name="Buttons"
      note="The hover overlay is the signature. Primary: light gradient chip, diagonal shimmer sweeps across. Secondary: blue hairline, a light fill rises from the bottom and the text flips dark."
    >
      <div className="rounded-[14px] border border-line bg-panel/50 p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Book a call</Button>
          <Button variant="secondary">See the work</Button>
        </div>
        <div className="mt-8 border-t border-line pt-6">
          <Spec
            items={[
              "primary hover: shimmer sweep + lift -2px + glow up, 300ms expo-out",
              "secondary hover: fill rises from bottom, text flips to ink, 300ms",
              "active: scale 0.98",
              "focus: 2px blue ring, 3px offset, keyboard only",
              "reduced motion: color change only, no transform, no sweep",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   Tags & badges
   ———————————————————————————————————————————————— */

const FILTERS = ["All", "Explainer", "Launch", "Demo", "Ad"];

function TagSection() {
  const [active, setActive] = useState("All");
  return (
    <Section
      name="Tags & badges"
      note="Mono, uppercase, pill-shaped. Filters take the blue active state. One semantic status dot exists site-wide: the availability badge."
    >
      <div className="space-y-10">
        <div className="flex flex-wrap gap-2">
          {["Explainer", "Launch", "2D", "3D", "Deep Tech", "Web3"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Tag key={f} filter active={active === f} onClick={() => setActive(f)}>
              {f}
            </Tag>
          ))}
        </div>
        <span className="inline-flex items-center gap-2.5 text-sm text-muted">
          <span className="size-1.5 rounded-full bg-blue" />
          Cybersecurity pieces in production. New work landing soon.
        </span>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   Work card
   ———————————————————————————————————————————————— */

function WorkCardSection() {
  return (
    <Section
      name="Work card"
      note="Whole card clickable. Thumbnails autoplay muted on hover only, never on load. The scan line stands in until real video assets land."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[460px_1fr]">
        <WorkCard
          client="Wafersight"
          outcome="A dense semiconductor data platform, made clear in 60 seconds."
          tags={["Explainer", "2D", "Deep Tech"]}
          href="#"
          posterStyle={{
            background:
              "radial-gradient(120% 140% at 80% 0%, rgba(108,133,235,0.3), transparent 55%), repeating-radial-gradient(circle at 25% 130%, rgba(155,161,173,0.09) 0 1px, transparent 1px 26px), linear-gradient(160deg, #131620 0%, #0e1118 55%, #121a30 100%)",
          }}
        />
        <div className="rounded-[14px] border border-line bg-panel/50 p-6 lg:mt-1">
          <Spec
            items={[
              "hover: lift -4px, blue-tint shadow, poster zoom 1.04",
              "video: muted autoplay on hover only, preload none",
              "poster: lazy image first, 16:9, radius 14px",
              "anatomy: poster, serif client, one-line outcome, tags",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   Atmosphere
   ———————————————————————————————————————————————— */

function AtmosphereSection() {
  return (
    <Section
      name="Atmosphere"
      note="Three layers of depth: the liquid gradient behind the hero, one soft blue glow per section anchor, and a 4% film grain over everything."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative col-span-full h-72 overflow-hidden rounded-[14px] border border-line bg-ink">
          <LiquidBackground />
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Liquid gradient · hero only · stilled under reduced motion
          </span>
        </div>
        <div className="relative h-56 overflow-hidden rounded-[14px] border border-line bg-ink">
          <Glow className="left-1/2 top-1/2 h-[280px] w-[420px] -translate-x-1/2 -translate-y-1/2" />
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Radial glow · 8 to 16% · behind anchors only
          </span>
        </div>
        <div className="relative h-56 overflow-hidden rounded-[14px] border border-line bg-panel">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Grain · 4% site-wide (shown at 12%)
          </span>
        </div>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   Motion
   ———————————————————————————————————————————————— */

function TextRevealDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="rounded-[14px] border border-line bg-panel/50 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <Spec items={["masked line rise + fade + blur-in", "600ms · stagger 90ms · expo-out"]} />
        <Button variant="secondary" className="!px-5 !py-2.5 !text-[13px]" onClick={() => setRun((r) => r + 1)}>
          Replay
        </Button>
      </div>
      <div className="mt-6" key={run}>
        <TextReveal
          immediate
          as="p"
          className="display text-[clamp(1.8rem,3vw,2.6rem)]"
          lines={["Security is invisible.", <em key="i">We make it impossible to ignore.</em>]}
        />
      </div>
    </div>
  );
}

function PreloaderDemo() {
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rounded-[14px] border border-line bg-panel/50 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <Spec
          items={[
            "two light streaks meet, soft flash, wordmark forms",
            "~2.2s + 0.7s dissolve · skipped under reduced motion",
            "drop real footage at /video/hand-left.mp4 + hand-right.mp4",
          ]}
        />
        <Button
          variant="secondary"
          className="!px-5 !py-2.5 !text-[13px]"
          onClick={() => {
            setRun((r) => r + 1);
            setPlaying(true);
          }}
        >
          Replay
        </Button>
      </div>
      <div className="relative mt-6 aspect-video overflow-hidden rounded-[10px] border border-line bg-ink">
        {playing && <Preloader key={run} contained onComplete={() => setPlaying(false)} />}
        {!playing && (
          <span className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            Press replay to run the loading sequence
          </span>
        )}
      </div>
    </div>
  );
}

const DURATIONS = [
  { ms: "150", use: "micro: tag hovers, color shifts" },
  { ms: "300", use: "hover: buttons, cards, overlay sweeps" },
  { ms: "600", use: "reveal: text lines, section rises" },
  { ms: "2200", use: "one cinematic moment: the preloader" },
];

function MotionSection() {
  const reduce = useReducedMotion();
  return (
    <Section
      name="Motion"
      note="A few beautifully executed moments: the preloader, the text reveals, the button overlays. Everything else stays still. If it doesn't aid comprehension, cut it."
    >
      <div className="space-y-8">
        <div className="overflow-hidden rounded-[14px] border border-line">
          {DURATIONS.map((d, i) => (
            <div
              key={d.ms}
              className={`flex items-baseline gap-6 px-5 py-3.5 ${i % 2 ? "bg-panel/40" : "bg-panel/70"}`}
            >
              <span className="w-20 font-mono text-sm text-blue">{d.ms}ms</span>
              <span className="text-sm text-muted">{d.use}</span>
            </div>
          ))}
        </div>
        <TextRevealDemo />
        <PreloaderDemo />
        <Spec
          items={[
            "ease: cubic-bezier(0.16, 1, 0.3, 1) everywhere",
            "triggers: whileInView, once, -12% margin",
            `reduced motion: ${reduce ? "active in this browser" : "transforms drop, fades stay"}`,
          ]}
        />
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   Page
   ———————————————————————————————————————————————— */

export default function StyleGuide() {
  return (
    <div className="min-h-[100dvh]">
      <header className="border-b border-line">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
          <span className="text-[15px] font-semibold tracking-[-0.01em]">Motion Flow</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Design system · v2.0
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6">
        <div className="relative py-24 md:py-32">
          <Glow className="left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2" />
          <div className="relative">
            <h1 className="display max-w-[14ch] text-[clamp(2.6rem,5.5vw,4.4rem)]">
              Cinematic, editorial, <em className="pr-1">restrained.</em>
            </h1>
            <p className="mt-7 max-w-[50ch] text-lg leading-[1.7] text-muted">
              Monochrome dark with one soft light blue. Fraunces for the
              cinema, Geist for the reading. The luxury is in the space and
              the type; the boldness lives in the preloader.
            </p>
            <div className="mt-9 flex flex-wrap gap-2">
              {["Max 1280px", "Pill buttons", "14px containers", "1px hairlines"].map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
            </div>
          </div>
        </div>

        <ColorSection />
        <TypeSection />
        <ButtonSection />
        <TagSection />
        <WorkCardSection />
        <AtmosphereSection />
        <MotionSection />

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            © 2026 Motion Flow
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            v2.0 · cinematic editorial
          </span>
        </footer>
      </main>
    </div>
  );
}
