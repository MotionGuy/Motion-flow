import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import LoopVideo from "@/components/ui/LoopVideo";

export const metadata: Metadata = {
  title: "Services, Motion Flow",
  description:
    "Launch explainers, product demos, ad creative, conference films, and research animation for cybersecurity companies.",
};

type Service = {
  title: string;
  line: string;
  included: string[];
  idealFor: string;
  clip: string;
};

const FEATURED: Service = {
  title: "Launch & category explainers",
  line: "The hero film for a product or category launch, usually 60 to 90 seconds.",
  included: [
    "Script and messaging",
    "Storyboard and style frames",
    "Master film in 2D or 3D",
    "Cutdowns for social and sales",
  ],
  idealFor: "New products, category launches, and funding announcements.",
  clip: "/video/work/wafersight.mp4",
};

const SERVICES: Service[] = [
  {
    title: "Product demos & walkthroughs",
    line: "Show the product doing the thing, clearly, without a screen recording.",
    included: [
      "Product UI recreated in motion",
      "A feature-by-feature story",
      "Versions for site, sales, and onboarding",
    ],
    idealFor: "Product pages, sales enablement, and onboarding.",
    clip: "/video/work/tooltip.mp4",
  },
  {
    title: "Paid social & ad creative",
    line: "Cutdown packs and variants built to test.",
    included: [
      "Short-form edits for each platform",
      "Multiple hooks to test against each other",
      "Square, vertical, and wide formats",
    ],
    idealFor: "Demand-gen teams running paid campaigns.",
    clip: "/video/work/platinum.mp4",
  },
  {
    title: "Conference & booth films",
    line: "Loops and sizzle for RSAC, Black Hat, and DEF CON.",
    included: [
      "Silent loops for booth screens",
      "A sizzle reel for stage and keynotes",
      "Formats for large and vertical displays",
    ],
    idealFor: "Event and field-marketing teams.",
    clip: "/video/work/hyper.mp4",
  },
  {
    title: "Threat-report & research animation",
    line: "Bring your published research to life.",
    included: [
      "Key findings turned into visual stories",
      "Data and attack-chain visualization",
      "Clips for launch posts and press",
    ],
    idealFor: "Threat-intel and research teams publishing reports.",
    clip: "/video/work/orally.mp4",
  },
];

const EVERY_PROJECT = [
  "Full audio and sound design",
  "Professional voiceover",
  "Three hook variations",
  "Storyboard development",
];

const PROCESS = [
  {
    n: "01",
    title: "Brief & script",
    line: "A short call to understand the product, the buyer, and the launch. We write the script around the one idea worth the runtime.",
  },
  {
    n: "02",
    title: "Storyboard & style frames",
    line: "You see the film before we animate it: every scene sketched, key frames designed, and your sign-off before production.",
  },
  {
    n: "03",
    title: "Animation",
    line: "2D or 3D animation with sound design and voiceover, with review rounds as the film comes together.",
  },
  {
    n: "04",
    title: "Delivery & cutdowns",
    line: "The master film plus the cutdowns, hooks, and formats your channels need.",
  },
];

const POSTER =
  "radial-gradient(110% 160% at 15% 0%, rgba(108,133,235,0.3), transparent 55%), linear-gradient(155deg, #10131c 30%, #121a30 100%)";

function Included({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] text-fg/90">
          <Check size={15} weight="bold" className="mt-1 shrink-0 text-blue" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  return (
    <PageShell>
      <p className="eyebrow">Services</p>
      <h1 className="display mt-5 max-w-[18ch] text-[clamp(2.6rem,5.6vw,4.8rem)]">
        Motion built for cybersecurity launches.
      </h1>
      <p className="mt-7 max-w-[52ch] text-lg leading-[1.7] text-muted">
        Every offer is productized, so you know the scope and the price before
        work begins.
      </p>

      <Reveal className="mt-20">
        <article className="grid gap-8 rounded-[14px] border border-line bg-panel/60 p-5 md:grid-cols-12 md:p-8">
          <div
            className="aspect-video overflow-hidden rounded-[10px] border border-line/60 md:col-span-7"
            style={{ background: POSTER }}
          >
            <LoopVideo src={FEATURED.clip} />
          </div>
          <div className="flex flex-col md:col-span-5">
            <h2 className="display text-[clamp(1.9rem,3vw,2.6rem)]">{FEATURED.title}</h2>
            <p className="mt-3 text-muted">{FEATURED.line}</p>
            <div className="mt-7 border-t border-line pt-6">
              <Included items={FEATURED.included} />
            </div>
            <p className="mt-auto pt-7 text-sm text-muted">
              Ideal for: <span className="text-fg/80">{FEATURED.idealFor}</span>
            </p>
          </div>
        </article>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.06}>
            <article className="flex h-full flex-col rounded-[14px] border border-line bg-panel/60 p-5 md:p-7">
              <div
                className="aspect-video overflow-hidden rounded-[10px] border border-line/60"
                style={{ background: POSTER }}
              >
                <LoopVideo src={s.clip} />
              </div>
              <h2 className="mt-6 text-xl font-medium">{s.title}</h2>
              <p className="mt-2 text-muted">{s.line}</p>
              <div className="mt-6 border-t border-line pt-5">
                <Included items={s.included} />
              </div>
              <p className="mt-auto pt-6 text-sm text-muted">
                Ideal for: <span className="text-fg/80">{s.idealFor}</span>
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="rounded-[14px] border border-line p-7 md:p-8">
          <h2 className="text-lg font-medium">Every project includes</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EVERY_PROJECT.map((item) => (
              <p key={item} className="flex items-start gap-3 text-[15px] text-fg/90">
                <Check size={15} weight="bold" className="mt-1 shrink-0 text-blue" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="mt-32 border-t border-line pt-20 md:mt-40">
        <Reveal>
          <h2 className="display italic pb-2 text-[clamp(2.1rem,9vw,5.25rem)]">How it works</h2>
        </Reveal>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <li key={p.n} className="border-t border-line pt-5">
              <Reveal delay={i * 0.07}>
                <span className="font-mono text-xs text-blue">{p.n}</span>
                <h3 className="mt-3 text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.line}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-32 border-t border-line pt-20 text-center md:mt-40">
        <Reveal>
          <h2 className="display mx-auto max-w-[20ch] text-[clamp(1.9rem,4.5vw,3.4rem)]">
            Know what you&apos;re launching? <em>Let&apos;s scope it.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="secondary">
              Book a call
            </Button>
            <Button href="/pricing" variant="secondary">
              See pricing
            </Button>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
