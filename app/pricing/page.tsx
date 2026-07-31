import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing, Motion Flow",
  description: "Clear pricing for 2D and 3D animation, plus an ongoing motion subscription.",
};

const PACKAGES = [
  {
    name: "2D animation",
    price: "from $2,000",
    note: "Clear product stories for launches, sales and paid social.",
    features: ["30 seconds for $2,000", "60 seconds from $3,000", "90 seconds from $4,000", "Short-form bundle: 10 videos for $7,000"],
  },
  {
    name: "Subscription",
    price: "$4,995/mo",
    note: "For teams with a steady stream of launches and content needs.",
    featured: true,
    features: ["One active project at a time", "Unlimited videos", "Unlimited revisions", "Cancel anytime"],
  },
  {
    name: "3D animation",
    price: "from $4,000",
    note: "High-impact hero films for technical products and launches.",
    features: ["30 seconds for $4,000", "60 seconds for $6,000", "90 seconds for $8,000", "Launch-grade 3D for hero moments"],
  },
];

export default function PricingPage() {
  return (
    <PageShell>
      <p className="eyebrow">Pricing</p>
      <h1 className="display mt-5 max-w-[18ch] text-[clamp(2.6rem,5.6vw,4.8rem)]">Simple, productized pricing.</h1>
      <p className="mt-7 max-w-[55ch] text-lg leading-[1.7] text-muted">Choose a focused film or a flexible monthly partnership. Every project is scoped clearly before work begins.</p>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {PACKAGES.map((item) => (
          <article key={item.name} className={`relative flex min-h-[430px] flex-col rounded-[16px] border p-8 transition-transform duration-300 hover:-translate-y-1 ${item.featured ? "border-blue/60 bg-panel shadow-[0_0_48px_rgba(169,199,255,0.12)]" : "border-line bg-panel/50"}`}>
            {item.featured && <span className="absolute right-6 top-6 rounded-full border border-blue/60 bg-blue/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ice">Best value</span>}
            <p className="text-sm text-muted">{item.name}</p>
            <p className="display mt-3 text-4xl">{item.price}</p>
            <p className="mt-4 min-h-14 text-sm leading-6 text-muted">{item.note}</p>
            <ul className="mt-8 flex-1 space-y-3.5 border-t border-line pt-7">
              {item.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[15px] text-fg/90"><Check size={16} weight="bold" className="mt-1 shrink-0 text-blue" />{feature}</li>
              ))}
            </ul>
            <Button href="/contact" variant={item.featured ? "primary" : "secondary"} className="mt-8 w-full">Book a call</Button>
          </article>
        ))}
      </div>

      <p className="mt-12 max-w-[62ch] text-sm leading-6 text-muted">Every package includes sound design, professional voiceover, three hook variations and storyboard development. Need a custom scope? We&apos;ll quote it clearly.</p>
    </PageShell>
  );
}
