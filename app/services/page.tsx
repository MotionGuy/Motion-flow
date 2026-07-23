import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services & Pricing, Motion Flow",
  description: "Productized motion for cybersecurity launches: scope, price, and timeline up front.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <h1 className="display max-w-[18ch] text-[clamp(2.4rem,5vw,4rem)]">
        Motion built for cybersecurity launches.
      </h1>
      <p className="mt-7 max-w-[48ch] text-lg leading-[1.7] text-muted">
        Full service blocks and transparent pricing are being built next. 2D
        from $2,000, 3D from $4,000, subscriptions from $4,995/mo.
      </p>
      <div className="mt-11">
        <Button href="/contact" variant="secondary">Book a call</Button>
      </div>
    </PageShell>
  );
}
