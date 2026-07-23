"use client";

import { useState } from "react";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
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

const SERVICES = [
  {
    title: "Launch & category explainers",
    line: "The hero film for a product or category launch.",
  },
  {
    title: "Product demos",
    line: "Show the product doing the thing, clearly.",
  },
  {
    title: "Paid social & ad creative",
    line: "Cutdown packs and variants built to test.",
  },
  {
    title: "Conference & booth films",
    line: "Loops and sizzle for RSAC, Black Hat, DEF CON.",
  },
];

const WHY = [
  {
    title: "Cyber-only focus",
    line: "We speak SOC, zero trust, XDR, and identity. No glossary needed.",
  },
  {
    title: "Clarity over clichés",
    line: "No hooded hackers, no padlocks. We visualize your actual architecture.",
  },
  {
    title: "Launch-grade craft",
    line: "Built for RSAC moments, product launches, and paid social.",
  },
  {
    title: "Founder-led",
    line: "You talk to the person who makes the work.",
  },
];

const PROCESS = [
  { n: "01", title: "Brief & script", line: "We find the one idea worth sixty seconds." },
  { n: "02", title: "Storyboard & style frames", line: "You see the film before we animate it." },
  { n: "03", title: "Animation", line: "Launch-grade motion, sound, and voiceover." },
  { n: "04", title: "Delivery & cutdowns", line: "Master film plus the variants you need." },
];

const CALENDLY_URL =
  "https://calendly.com/systrenskyi/discussing-collaboration-opportunities?background_color=131620&text_color=f5f7fa&primary_color=a9c7ff&hide_gdpr_banner=1";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <div className="min-h-[100dvh]">
      <Preloader onComplete={() => setHeroReady(true)} />
      <Nav />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
          <LiquidBackground />
          <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-24 pt-24 md:px-10 md:pb-32">
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
                  className="display mt-7 max-w-[900px] text-[clamp(2.6rem,5.6vw,4.6rem)]"
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
                  className="mt-8 max-w-[46ch] text-lg leading-[1.7] text-muted"
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
                    <span key="cta" className="flex flex-wrap gap-4">
                      <Button href="/contact">Book a call</Button>
                      <Button href="/work" variant="secondary">
                        See the work
                      </Button>
                    </span>,
                  ]}
                />
              </>
            )}
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
            <Reveal>
              <p className="text-sm text-muted">
                Trusted by teams building complex, technical products.
              </p>
              {/* TODO: swap for real client SVG logos when files land */}
              <div className="mt-8 flex flex-wrap items-center gap-x-14 gap-y-5">
                {["Orally", "Wafersight", "Miggles", "Hyper"].map((c) => (
                  <span
                    key={c}
                    className="font-sans text-lg font-semibold tracking-[0.02em] text-muted/60"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
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
            <h2 className="display text-3xl md:text-4xl">Selected work</h2>
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
              See the work
            </Button>
          </Reveal>
        </section>

        {/* What we make: quiet 2x2 */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
            <Reveal>
              <h2 className="display max-w-[16ch] text-3xl md:text-4xl">
                What we make
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="border-t border-line pt-6">
                    <h3 className="text-xl font-medium">{s.title}</h3>
                    <p className="mt-2 text-muted">{s.line}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-16">
              <Button href="/services" variant="secondary">
                See full pricing
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Why Motion Flow: indented editorial column */}
        <section className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
          <div className="md:pl-[28%]">
            <Reveal>
              <h2 className="display text-3xl md:text-4xl">Why Motion Flow</h2>
            </Reveal>
            <div className="mt-14 max-w-[520px] space-y-12">
              {WHY.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.05}>
                  <h3 className="text-lg font-medium">{w.title}</h3>
                  <p className="mt-1.5 text-muted">{w.line}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
            <Reveal>
              <h2 className="display text-3xl md:text-4xl">How it works</h2>
            </Reveal>
            <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.07}>
                  <span className="font-mono text-xs text-blue">{p.n}</span>
                  <h3 className="mt-3 text-lg font-medium">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-muted">{p.line}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing preview */}
        <section className="mx-auto max-w-[1280px] px-6 py-32 md:px-10 md:py-40">
          <Reveal>
            <h2 className="display text-3xl md:text-4xl">
              Simple, productized pricing
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 sm:grid-cols-3">
            {[
              { label: "2D animation", price: "from $2,000" },
              { label: "3D animation", price: "from $4,000" },
              { label: "Subscription", price: "$4,995/mo" },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i * 0.07}>
                <p className="text-sm text-muted">{p.label}</p>
                <p className="display mt-3 text-3xl md:text-4xl">{p.price}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <p className="max-w-[54ch] text-muted">
              Every package includes sound design, professional voiceover,
              three hook variations, and storyboard development.
            </p>
            <div className="mt-8">
              <Button href="/services" variant="secondary">
                See full pricing
              </Button>
            </div>
          </Reveal>
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
                <div
                  className="calendly-inline-widget"
                  data-url={CALENDLY_URL}
                  style={{ minWidth: "320px", height: "680px" }}
                />
              </div>
            </Reveal>
          </div>
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
