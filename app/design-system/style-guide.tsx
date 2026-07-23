"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import Glow from "@/components/ui/Glow";
import WorkCard from "@/components/ui/WorkCard";

/* ————————————————————————————————————————————————
   Spec-sheet scaffolding
   ———————————————————————————————————————————————— */

function Section({
  index,
  name,
  note,
  children,
}: {
  index: string;
  name: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-12">
        <header>
          <div className="font-mono text-[11px] tracking-[0.16em] text-violet-bright">
            {index}
          </div>
          <h2 className="mt-2 font-display text-2xl font-medium tracking-[-0.01em]">
            {name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{note}</p>
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
        <li key={line} className="flex gap-2">
          <span className="text-violet/70 select-none">·</span>
          {line}
        </li>
      ))}
    </ul>
  );
}

/* ————————————————————————————————————————————————
   01 — Color
   ———————————————————————————————————————————————— */

const SWATCHES = [
  { name: "Ink", hex: "#0A0B0F", varName: "--color-ink", use: "Base background — near-black, slightly cool." },
  { name: "Panel", hex: "#14161D", varName: "--color-panel", use: "Cards and elevated surfaces." },
  { name: "Hairline", hex: "#242833", varName: "--color-line", use: "1px borders, dividers." },
  { name: "Hairline +", hex: "#3A4051", varName: "--color-line-bright", use: "Border hover state — brightens, never thickens." },
  { name: "Text", hex: "#F4F5F7", varName: "--color-fg", use: "Primary text. Never pure white." },
  { name: "Muted", hex: "#9BA1AD", varName: "--color-muted", use: "Secondary text, specs, captions." },
  { name: "Violet", hex: "#6E56F7", varName: "--color-violet", use: "The accent. CTAs, focus, glow, key states." },
  { name: "Violet +", hex: "#8B77FF", varName: "--color-violet-bright", use: "Accent hover, active filter text." },
  { name: "Mint", hex: "#5EEAD4", varName: "--color-mint", use: "Status only — one live dot. Never decoration." },
];

function ColorSection() {
  return (
    <Section
      index="01 / TOKENS"
      name="Color"
      note="Dark, gallery-like, one violet accent. The UI stays quiet — the work is the color."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SWATCHES.map((s) => (
          <div key={s.name} className="rounded-xl border border-line bg-panel p-3">
            <div
              className="h-16 rounded-lg border border-line"
              style={{ background: s.hex }}
            />
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <span className="font-display text-sm font-medium">{s.name}</span>
              <span className="font-mono text-[10px] text-muted">{s.hex}</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.use}</p>
            <code className="mt-2 block font-mono text-[10px] text-muted/70">
              {s.varName}
            </code>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   02 — Typography
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
    <div
      className={`grid gap-4 py-8 lg:grid-cols-[200px_1fr] lg:gap-8 ${
        last ? "" : "border-b border-line"
      }`}
    >
      <Spec items={spec} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function TypeSection() {
  return (
    <Section
      index="02 / TOKENS"
      name="Typography"
      note="Clash Display carries the voice, Satoshi carries the reading, JetBrains Mono carries the spec. No Inter, no Roboto, no Arial."
    >
      <div className="-mt-8">
        <TypeRow spec={["Clash Display 600", "clamp(3rem → 4.75rem)", "lh 1.04 · track −0.02em"]}>
          <p className="font-display text-[clamp(3rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
            Launch videos that make cybersecurity make sense.
          </p>
        </TypeRow>
        <TypeRow spec={["Clash Display 600", "clamp(2rem → 3rem)", "lh 1.1 · track −0.015em"]}>
          <p className="font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em]">
            Security is invisible. We make it impossible to ignore.
          </p>
        </TypeRow>
        <TypeRow spec={["Clash Display 500", "1.5rem · lh 1.25"]}>
          <p className="font-display text-2xl font-medium leading-[1.25]">
            Launch &amp; category explainers
          </p>
        </TypeRow>
        <TypeRow spec={["Satoshi 400", "1.125rem · lh 1.7", "max 60ch"]}>
          <p className="max-w-[60ch] text-lg leading-[1.7] text-fg">
            We turn zero trust, threat detection, and complex security products
            into short, clear videos that convert — for launches, campaigns,
            and the moments that matter.
          </p>
        </TypeRow>
        <TypeRow spec={["Satoshi 400", "1rem · lh 1.6", "muted for secondary"]}>
          <p className="max-w-[60ch] text-muted">
            Buyers don&apos;t fund what they can&apos;t picture. We visualize
            the real system — no hooded hackers, no padlocks — so the product
            lands in seconds.
          </p>
        </TypeRow>
        <TypeRow
          spec={["JetBrains Mono 500", "0.75rem · track 0.16em", "uppercase"]}
          last
        >
          <span className="eyebrow">Motion Studio · Cybersecurity</span>
        </TypeRow>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   03 — Buttons
   ———————————————————————————————————————————————— */

function ButtonSection() {
  return (
    <Section
      index="03 / COMPONENTS"
      name="Buttons"
      note="Primary is solid violet with a soft glow; secondary is a ghost with a hairline that brightens. Hover is a small lift, not a bounce."
    >
      <div className="rounded-xl border border-line bg-panel/50 p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-4">
          <Button arrow>Book a call</Button>
          <Button variant="secondary" arrow>
            See the work
          </Button>
          <Button variant="secondary">View all work</Button>
        </div>
        <div className="mt-8 border-t border-line pt-6">
          <Spec
            items={[
              "hover — scale 1.02 · glow 0.35 → 0.55 · arrow +4px",
              "timing — 200ms · ease-micro",
              "active — scale 0.99",
              "focus — 2px violet ring, 3px offset (keyboard only)",
              "reduced motion — color/glow change only, no transform",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   04 — Tags & badges
   ———————————————————————————————————————————————— */

const FILTERS = ["All", "Explainer", "Launch", "Demo", "Ad"];

function TagSection() {
  const [active, setActive] = useState("All");
  return (
    <Section
      index="04 / COMPONENTS"
      name="Tags & badges"
      note="Mono, uppercase, tracked out — the tech signal. Filters get the violet active state; the mint dot is the only place the second color exists."
    >
      <div className="space-y-8">
        <div>
          <div className="eyebrow mb-3 text-[10px]">Static tags — work cards, case studies</div>
          <div className="flex flex-wrap gap-2">
            {["Explainer", "Launch", "2D", "3D", "Deep Tech", "Web3"].map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow mb-3 text-[10px]">Filter chips — work grid (try them)</div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Tag
                key={f}
                filter
                active={active === f}
                onClick={() => setActive(f)}
              >
                {f}
              </Tag>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow mb-3 text-[10px]">Status badge — honest availability signal</div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-2 text-[13px] text-muted">
            <span className="size-1.5 rounded-full bg-mint motion-safe:animate-[pulse-dot_2s_ease-in-out_infinite]" />
            Cybersecurity pieces in production — new work landing soon.
          </span>
        </div>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   05 — Work card
   ———————————————————————————————————————————————— */

function WorkCardSection() {
  return (
    <Section
      index="05 / COMPONENTS"
      name="Work card"
      note="The whole card is clickable. Thumbnails autoplay muted on hover only — never on load. The scan bar stands in until real video assets land."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[440px_1fr]">
        <WorkCard
          client="Wafersight"
          outcome="A dense semiconductor data platform, made clear in 60 seconds."
          tags={["Explainer", "2D", "Deep Tech"]}
          href="#"
          runtime="00:60"
          posterStyle={{
            background:
              "radial-gradient(120% 140% at 80% 0%, rgba(110,86,247,0.28), transparent 55%), repeating-radial-gradient(circle at 25% 130%, rgba(155,161,173,0.09) 0 1px, transparent 1px 26px), linear-gradient(160deg, #14161D 0%, #0E1016 55%, #16112B 100%)",
          }}
        />
        <div className="rounded-xl border border-line bg-panel/50 p-6 lg:mt-1">
          <Spec
            items={[
              "hover — lift −4px · violet-tint shadow · poster zoom 1.03",
              "video — muted autoplay on hover only, preload none",
              "poster — lazy-loaded image first, 16:9",
              "anatomy — timecode · client · one-line outcome · tags · case-study link",
              "grid — 3 col → 2 → 1 · gap 32px",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   06 — Glow & texture
   ———————————————————————————————————————————————— */

function GlowSection() {
  return (
    <Section
      index="06 / ATMOSPHERE"
      name="Glow & texture"
      note="Depth without decoration: one low-opacity violet radial behind heroes and section anchors, and a film grain at 4.5% over everything."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative h-56 overflow-hidden rounded-xl border border-line bg-ink">
          <Glow className="left-1/2 top-1/2 h-[280px] w-[420px] -translate-x-1/2 -translate-y-1/2" />
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Radial glow · 12–18% · behind anchors only
          </span>
        </div>
        <div className="relative h-56 overflow-hidden rounded-xl border border-line bg-panel">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Grain · 4.5% site-wide (shown at 12%)
          </span>
        </div>
      </div>
      <div className="mt-6">
        <Spec
          items={[
            "one glow per viewport, max — never behind body text",
            "implementation — absolutely-positioned radial-gradient div, no images",
            "grain — fixed SVG turbulence layer, pointer-events none",
          ]}
        />
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   07 — Motion
   ———————————————————————————————————————————————— */

function EasingCurve({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const d = `M0,100 C${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`;
  return (
    <svg viewBox="-6 -6 112 112" className="h-20 w-24 shrink-0" aria-hidden>
      <path d="M0,100 L100,100 M0,100 L0,0" stroke="var(--line)" strokeWidth="2" fill="none" />
      <path d={d} stroke="var(--violet)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const DURATIONS = [
  { ms: "150", use: "micro — tag hovers, color shifts" },
  { ms: "200", use: "hover — buttons, cards, arrows" },
  { ms: "300", use: "reveal — scroll fades + rises" },
  { ms: "500", use: "slow — poster zoom, hero moments" },
];

function RevealDemo() {
  const [run, setRun] = useState(0);
  const reduce = useReducedMotion();
  return (
    <div className="rounded-xl border border-line bg-panel/50 p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow text-[10px]">
          Scroll reveal — fade + rise 12px · 300ms · stagger 80ms
        </span>
        <Button variant="secondary" className="!px-4 !py-2 !text-[13px]" onClick={() => setRun((r) => r + 1)}>
          Replay
        </Button>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4" key={run}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="rounded-lg border border-line bg-panel p-4"
          >
            <div className="h-2 w-2/3 rounded bg-white/10" />
            <div className="mt-2.5 h-2 w-full rounded bg-white/[0.06]" />
            <div className="mt-2 h-2 w-4/5 rounded bg-white/[0.06]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MotionSection() {
  return (
    <Section
      index="07 / MOTION"
      name="Motion"
      note="Motion serves comprehension, never fights it. One hero moment per page; everything else is a quiet reveal. If it doesn't aid hierarchy, cut it."
    >
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-5 rounded-xl border border-line bg-panel/50 p-5">
            <EasingCurve x1={0.16} y1={1} x2={0.3} y2={1} />
            <div>
              <div className="font-display text-sm font-medium">ease-out-expo</div>
              <code className="mt-1 block font-mono text-[10px] text-muted">
                cubic-bezier(0.16, 1, 0.3, 1)
              </code>
              <p className="mt-1.5 text-xs text-muted">Reveals, zooms — fast in, soft landing.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-xl border border-line bg-panel/50 p-5">
            <EasingCurve x1={0.25} y1={0.46} x2={0.45} y2={0.94} />
            <div>
              <div className="font-display text-sm font-medium">ease-micro</div>
              <code className="mt-1 block font-mono text-[10px] text-muted">
                cubic-bezier(0.25, 0.46, 0.45, 0.94)
              </code>
              <p className="mt-1.5 text-xs text-muted">Hovers, presses — even, unfussy.</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          {DURATIONS.map((d, i) => (
            <div
              key={d.ms}
              className={`flex items-baseline gap-6 px-5 py-3.5 ${
                i % 2 ? "bg-panel/40" : "bg-panel/70"
              }`}
            >
              <span className="w-16 font-mono text-sm text-violet-bright">{d.ms}ms</span>
              <span className="text-sm text-muted">{d.use}</span>
            </div>
          ))}
        </div>

        <RevealDemo />

        <Spec
          items={[
            "triggers — whileInView, once, −10% margin · passive listeners",
            "video — posters first, lazy-load, cap concurrent autoplay",
            "prefers-reduced-motion — transforms drop, fades stay",
            "budget — 60fps or the effect gets cut",
          ]}
        />
      </div>
    </Section>
  );
}

/* ————————————————————————————————————————————————
   Page
   ———————————————————————————————————————————————— */

function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 [transition-timing-function:var(--ease-out-expo)] ${
        scrolled
          ? "border-b border-line bg-ink/75 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <span className="font-display text-lg font-medium tracking-[-0.01em]">
          Motion Flow<span className="text-violet">.</span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Design system · v1.0
        </span>
      </div>
    </header>
  );
}

export default function StyleGuide() {
  return (
    <div className="min-h-screen">
      <StickyHeader />

      <main className="mx-auto max-w-[1200px] px-6">
        {/* Hero */}
        <div className="relative py-20 md:py-28">
          <Glow className="left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2" />
          <div className="relative">
            <span className="eyebrow">Motion Flow · Design system · v1.0</span>
            <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.75rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Quiet UI. Loud work.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-[1.7] text-muted">
              Every token, component, and easing curve the site is built from.
              The interface stays restrained and dark; the videos are the
              color. Approve this page and every page inherits it.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["8px grid", "Max 1200px", "Radius 10px", "1px hairlines"].map((c) => (
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
        <GlowSection />
        <MotionSection />

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            © 2026 Motion Flow
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            On approval → <span className="text-violet-bright">Home</span>
          </span>
        </footer>
      </main>
    </div>
  );
}
