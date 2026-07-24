import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";

/* Case-study pages: Denys is writing the copy for each piece. Until then,
   every slug renders an elegant holding page so no link dead-ends. */

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${titleFromSlug(slug)} case study, Motion Flow`,
    description: "Case study from Motion Flow, the motion studio for cybersecurity.",
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PageShell>
      <p className="eyebrow">Case study</p>
      <h1 className="display mt-5 max-w-[18ch] text-[clamp(2.4rem,5vw,4rem)]">
        {titleFromSlug(slug)}
      </h1>
      <p className="mt-7 max-w-[48ch] text-lg leading-[1.7] text-muted">
        The full case study is being written. Meanwhile, the film lives in the
        work grid, and we&apos;re happy to walk you through it on a call.
      </p>
      <div className="mt-11 flex flex-wrap gap-4">
        <Button href="/contact" variant="secondary">
          Book a call
        </Button>
        <Button href="/work" variant="secondary">
          See all of our videos
        </Button>
      </div>
    </PageShell>
  );
}
