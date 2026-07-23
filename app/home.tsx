"use client";

import { useState } from "react";
import {
  Check,
  Crosshair,
  Diamond,
  Eye,
  FilmSlate,
  NotePencil,
  PaperPlaneTilt,
  Sparkle,
  UserCircle,
} from "@phosphor-icons/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Button from "@/components/ui/Button";
import GlassIcon from "@/components/ui/GlassIcon";
import Preloader from "@/components/ui/Preloader";
import LiquidBackground from "@/components/ui/LiquidBackground";
import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";
import WorkCard from "@/components/ui/WorkCard";

/* Featured work; poster gradients stand in until real video assets land. */
const WORK = [
  {
    client: "Wafersight",
    outcome: "A dense semiconductor data platform, made clear in 60 seconds.",
    tags: ["Explainer", "2D", "Deep Tech"],
    posterStyle: {
      background:
        "radial-gradient(120% 140% at 80% 0%, rgba(108,133,235,0.3), transparent 55%), repeating-radial-gradient(circle at 25% 130%, rgba(155,161,173,0.09) 0 1px, transparent 1px 26px), linear-gradient(160deg, #131620 0%, #0e1118 55%, #121a30 100%)",
    },
  },
  {
    client: "Orally",
    outcome: "A blockchain protocol explained simply enough to convert.",
    tags: ["Explainer", "Blockchain"],
    posterStyle: {
      background:
        "linear-gradient(115deg, #10131c 40%, rgba(169,199,255,0.12) 70%, #10131c 95%), radial-gradient(90% 120% at 15% 100%, rgba(108,133,235,0.22), transparent 60%), #131620",
    },
  },
  {
    client: "Miggles",
    outcome: "A 3D launch film for a coin launch and infrastructure update.",
    tags: ["Launch", "3D", "Web3"],
    posterStyle: {
      background:
        "radial-gradient(60% 80% at 50% 45%, rgba(234,241,255,0.16), transparent 60%), radial-gradient(120% 120% at 80% 110%, rgba(43,60,114,0.7), transparent 70%), #10131c",
    },
  },
];

const CLIENTS = ["Orally", "Wafersight", "Miggles", "Hyper"];

/* Media zones are gradient stand-ins; drop stills or muted loops in later. */
const SERVICES = [
  {
    title: "Launch & category explainers",
    line: "The hero film for a product or category launch.",
    span: "md:col-span-7",
    media:
      "radial-gradient(110% 160% at 15% 0%, rgba(108,133,235,0.32), transparent 55%), linear-gradient(155deg, #10131c 30%, #121a30 100%)",
  },
  {
    title: "Product demos",
    line: "Show the product doing the thing, clearly.",
    span: "md:col-span-5",
    media:
      "linear-gradient(120deg, rgba(234,241,255,0.1), transparent 45%), linear-gradient(200deg, #121622 10%, #0e1118 90%)",
  },
  {
    title: "Paid social & ad creative",
    line: "Cutdown packs and variants built to test.",
    span: "md:col-span-5",
    media:
      "radial-gradient(90% 130% at 85% 110%, rgba(169,199,255,0.18), transparent 60%), linear-gradient(160deg, #10131c, #131620)",
  },
  {
    title: "Conference & booth films",
    line: "Loops and sizzle for RSAC, Black Hat, DEF CON.",
    span: "md:col-span-7",
    media:
      "radial-gradient(120% 150% at 50% 120%, rgba(43,60,114,0.75), transparent 65%), linear-gradient(140deg, #0e1118, #121a30)",
  },
];

const WHY = [
  {
    icon: Crosshair,
    title: "Cyber-only focus",
    line: "We speak SOC, zero trust, XDR, and identity. No glossary needed.",
  },
  {
    icon: Eye,
    title: "Clarity over clichés",
    line: "No hooded hackers, no padlocks. We visualize your actual architecture.",
  },
  {
    icon: Diamond,
    title: "Launch-grade craft",
    line: "Built for RSAC moments, product launches, and paid social.",
  },
  {
    icon: UserCircle,
    title: "Founder-led",
    line: "You talk to the person who makes the work.",
  },
];

const PROCESS = [
  {
    icon: NotePencil,
    n: "01",
    title: "Brief & script",
    line: "We find the one idea worth sixty seconds.",
  },
  {
    icon: FilmSlate,
    n: "02",
    title: "Storyboard & style frames",
    line: "You see the film before we animate it.",
  },
  {
    icon: Sparkle,
    n: "03",
    title: "Animation",
    line: "Launch-grade motion, sound, and voiceover.",
  },
  {
    icon: PaperPlaneTilt,
    n: "04",
    title: "Delivery & cutdowns",
    line: "Master film plus the variants you need.",
  },
];

const PRICING = [
  {
    name: "2D animation",
    price: "from $2,000",
    features: [
      "30 seconds for $2,000",
      "60 seconds from $3,000",
      "90 seconds from $4,000",
      "Short-form bundle: 10 videos for $7,000",
    ],
    featured: false,
  },
  {
    name: "Subscription",
    price: "$4,995/mo",
    features: [
      "One active project at a time",
      "Unlimited videos",
      "Unlimited revisions",
      "Cancel anytime",
    ],
    featured: true,
  },
  {
    name: "3D animation",
    price: "from $4,000",
    features: [
      "30 seconds for $4,000",
      "60 seconds for $6,000",
      "90 seconds for $8,000",
      "Launch-grade 3D for hero moments",
    ],
    featured: false,
  },
];

/* MOCK quotes: layout placeholders only. Swap for real client words before
   launch; attribution stays role-level until names are approved. */
const TESTIMONIALS = [
  {
    quote:
      "They took a protocol we struggled to explain and made it land in under a minute.",
    who: "Founder, Orally",
  },
  {
    quote:
      "The film made a dense data product finally look simple. Our demos start themselves now.",
    who: "Product lead, Wafersight",
  },
];

const CALENDLY_URL =
  "https://calendly.com/systrenskyi/discussing-collaboration-opportunities?background_color=131620&text_color=f5f7fa&primary_color=a9c7ff&hide_gdpr_banner=1";

function ClientMarquee() {
  const row = [...CLIENTS, ...CLIENTS, ...CLIENTS];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
      <div className="flex w-max motion-safe:animate-[marquee_30s_linear_infinite]">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
            {row.map((name, i) => (
              <span
                key={`${half}-${i}`}
                className="mx-8 text-lg font-semibold tracking-[0.02em] text-muted/50"
              >
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <div className="min-h-[100dvh]">
      <Preloader onComplete={() => setHeroReady(true)} />
      <Nav />

      <main>
        {/* Hero: centered manifesto over the liquid glow */}
        <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
          <LiquidBackground />
          <div className="relative mx-auto w-full max-w-[1280px] px-6 pt-16 text-center md:px-10">
            {heroReady && (
              <>
                <TextReveal
                  immediate
                  lines={[
                    <span key="e" className="eyebrow">
                      Motion Studio · Cybersecurity
                    </span>,
                  ]}
                />
                <TextReveal
                  immediate
                  as="h1"
                  delay={0.12}
                  className="display mx-auto mt-7 max-w-[920px] text-[clamp(2.6rem,5.6vw,4.6rem)]"
                  lines={[
                    "Launch videos that make",
                    <span key="l2">
                      cybersecurity <em className="pr-1">make sense.</em>
                    </span>,
                  ]}
                />
                <TextReveal
                  immediate
                  as="p"
                  delay={0.34}
                  className="mx-auto mt-8 max-w-[46ch] text-lg leading-[1.7] text-muted"
                  lines={[
                    "We turn zero trust, threat detection, and complex",
                    "security products into short, clear videos that convert.",
                  ]}
                />
                <TextReveal
                  immediate
                  delay={0.5}
                  className="mt-11"
                  lines={[
                    <span key="cta" className="flex justify-center">
                      <Button href="/contact" variant="secondary">
                        Book a call
                      </Button>
                    </span>,
                  ]}
                />
              </>
            )}
          </div>
          {/* Client names float across the bottom edge, fading out at the sides */}
          {heroReady && (
            <div className="relative mt-16 w-full pb-6 md:absolute md:inset-x-0 md:bottom-8 md:mt-0 md:pb-0">
              <TextReveal
                immediate
                delay={0.75}
                lines={[
                  <span key="m" className="block">
                    <span className="mb-5 block text-center text-sm text-muted/70">
                      Trusted by teams building complex, technical products.
                    </span>
                    <ClientMarquee />
                  </span>,
                ]}
              />
            </div>
          )}
        </section>

        {/* Manifesto */}
        <section className="mx-auto max-w-[1280px] px-6 py-36 md:px-10 md:py-48">
          <TextReveal
            as="h2"
            className="display mx-auto max-w-[34ch] text-center text-[clamp(2.2rem,4.5vw,3.6rem)]"
            lines={["Security is invisible.", "We make it impossible to ignore."]}
          />
          <Reveal delay={0.25}>
            <p className="mx-auto mt-10 max-w-[52ch] text-center text-lg leading-[1.7] text-muted">
              Buyers don&apos;t fund what they can&apos;t picture. We visualize
              the real system, no hooded hackers, no padlocks, so your product
              lands in seconds.
            </p>
          </Reveal>
        </section>

        {/* Selected work: asymmetric grid */}
        <section className="mx-auto max-w-[1280px] px-6 pb-36 md:px-10 md:pb-48">
          <Reveal>
            <h2 className="display italic pb-2 text-[clamp(3rem,6.5vw,5.25rem)]">Selected work</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-12">
            <Reveal className="md:col-span-8">
              <WorkCard href="/work" {...WORK[0]} />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-4 md:mt-28">
              <WorkCard href="/work" {...WORK[1]} />
            </Reveal>
            <Reveal className="md:col-span-6 md:col-start-4">
              <WorkCard href="/work" {...WORK[2]} />
            </Reveal>
          </div>
          <Reveal className="mt-20 flex flex-wrap items-center justify-between gap-6">
            <span className="inline-flex items-center gap-2.5 text-sm text-muted">
              <span className="size-1.5 rounded-full bg-blue" />
              Cybersecurity pieces in production. New work landing soon.
            </span>
            <Button href="/work" variant="secondary">
              See more work
            </Button>
          </Reveal>
        </section>

        {/* What we make: bento tiles with media zones */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
            <Reveal>
              <h2 className="display italic pb-2 text-[clamp(3rem,6.5vw,5.25rem)]">
                What we make
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-6 md:grid-cols-12">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06} className={s.span}>
                  <div className="flex h-full flex-col rounded-[14px] border border-line bg-panel/60 p-7">
                    <h3 className="text-xl font-medium">{s.title}</h3>
                    <p className="mt-2 text-muted">{s.line}</p>
                    {/* TODO: swap gradients for stills / muted loops per service */}
                    <div
                      aria-hidden
                      className="mt-6 aspect-[16/7] w-full rounded-[10px] border border-line/60"
                      style={{ background: s.media }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-14">
              <Button href="/services" variant="secondary">
                See full pricing
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Why Motion Flow: four quiet cards */}
        <section className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
          <Reveal>
            <h2 className="display italic pb-2 text-[clamp(3rem,6.5vw,5.25rem)]">Why Motion Flow</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-5 rounded-[14px] border border-line bg-panel/60 p-7">
                  <GlassIcon className="size-11 rounded-xl">
                    <w.icon size={20} weight="light" />
                  </GlassIcon>
                  <div>
                    <h3 className="text-lg font-medium">{w.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                      {w.line}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process: glassy icons, numbered because it is a real sequence */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
            <Reveal>
              <h2 className="display italic pb-2 text-[clamp(3rem,6.5vw,5.25rem)]">How it works</h2>
            </Reveal>
            <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.07}>
                  <GlassIcon>
                    <p.icon size={22} weight="light" />
                  </GlassIcon>
                  <h3 className="mt-5 text-lg font-medium">
                    <span className="mr-2 font-mono text-xs text-blue">{p.n}</span>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-muted">{p.line}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing: subscription anchored as best value */}
        <section className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
          <TextReveal
            as="h2"
            className="display mx-auto max-w-[30ch] text-center text-[clamp(2rem,4vw,3.2rem)]"
            lines={["Simple, productized pricing."]}
          />
          <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
            {PRICING.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <div
                  className={`relative flex h-full flex-col rounded-[14px] border p-8 ${
                    p.featured
                      ? "border-blue/60 bg-panel shadow-[0_0_48px_rgba(169,199,255,0.12)]"
                      : "border-line bg-panel/50"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute right-6 top-6 rounded-full border border-blue/60 bg-blue/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ice">
                      Best value
                    </span>
                  )}
                  <p className="text-sm text-muted">{p.name}</p>
                  <p className="display mt-3 text-4xl">{p.price}</p>
                  <ul className="mt-8 flex-1 space-y-3.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px]">
                        <Check
                          size={16}
                          weight="bold"
                          className="mt-1 shrink-0 text-blue"
                        />
                        <span className={p.featured ? "text-fg" : "text-muted"}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {p.featured && (
                    <div className="mt-8">
                      <Button href="/contact" variant="secondary" className="w-full">
                        Book a call
                      </Button>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <p className="mx-auto max-w-[58ch] text-muted">
              Every package includes sound design, professional voiceover,
              three hook variations, and storyboard development. Custom scope?
              Book a call for an exact quote.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/services" variant="secondary">
                See full pricing
              </Button>
            </div>
          </Reveal>
        </section>

        {/* Testimonials */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
            <Reveal>
              <h2 className="display italic pb-2 text-[clamp(3rem,6.5vw,5.25rem)]">What clients say</h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.who} delay={i * 0.08}>
                  <figure className="flex h-full flex-col justify-between gap-8 rounded-[14px] border border-line bg-panel/60 p-8 md:p-10">
                    <blockquote className="display text-xl leading-[1.45] md:text-2xl">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="text-sm text-muted">{t.who}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA + Calendly */}
        <section className="relative overflow-hidden border-t border-line">
          <div className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
            <TextReveal
              as="h2"
              className="display max-w-[16ch] text-[clamp(2.2rem,4.5vw,3.6rem)]"
              lines={["Launching something?", <em key="i">Let&apos;s make it move.</em>]}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 text-muted">
                Pick a time below. Limited projects per month.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-12">
              <div className="overflow-hidden rounded-[14px] border border-line bg-panel p-2 md:p-4">
                <CalendlyEmbed url={CALENDLY_URL} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
