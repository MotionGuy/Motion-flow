import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";
import FounderVideo from "@/components/FounderVideo";

export const metadata: Metadata = {
  title: "About, Motion Flow",
  description: "A founder-led motion studio focused entirely on cybersecurity.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <h1 className="display max-w-[16ch] text-[clamp(2.4rem,5vw,4rem)]">
        We only do cybersecurity motion.
      </h1>
      <p className="mt-7 max-w-[52ch] text-lg leading-[1.7] text-muted">
        Security products are hard to see, and buyers don&apos;t fund what they
        can&apos;t picture. That gap is the whole reason this studio exists.
        Here&apos;s the story, on camera.
      </p>
      <div className="mt-14 max-w-[880px]">
        <FounderVideo />
      </div>
      <div className="mt-16 grid max-w-[880px] gap-10 sm:grid-cols-3">
        {[
          {
            title: "Clarity",
            line: "If a first-time viewer can't retell the idea, we cut deeper.",
          },
          {
            title: "Craft",
            line: "Launch-grade motion, sound, and voiceover on every piece.",
          },
          {
            title: "Security fluency",
            line: "Zero trust, XDR, identity: we already speak the language.",
          },
        ].map((v) => (
          <div key={v.title} className="border-t border-line pt-5">
            <h2 className="text-lg font-medium">{v.title}</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
              {v.line}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <Button href="/contact" variant="secondary">Book a call</Button>
      </div>
    </PageShell>
  );
}
