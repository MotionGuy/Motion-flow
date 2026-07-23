import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Work, Motion Flow",
  description: "Explainers, launch videos, and ad creative for complex technical products.",
};

export default function WorkPage() {
  return (
    <PageShell>
      <h1 className="display max-w-[18ch] text-[clamp(2.4rem,5vw,4rem)]">
        Work that makes complex products clear.
      </h1>
      <p className="mt-7 max-w-[48ch] text-lg leading-[1.7] text-muted">
        The full filterable grid is being built next. Meanwhile, the featured
        pieces live on the home page.
      </p>
      <div className="mt-11">
        <Button href="/contact">Book a call</Button>
      </div>
    </PageShell>
  );
}
