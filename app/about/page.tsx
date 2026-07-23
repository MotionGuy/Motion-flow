import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";

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
      <p className="mt-7 max-w-[48ch] text-lg leading-[1.7] text-muted">
        The founder story and studio values are being written next. The short
        version: clarity, craft, and security fluency.
      </p>
      <div className="mt-11">
        <Button href="/contact">Book a call</Button>
      </div>
    </PageShell>
  );
}
