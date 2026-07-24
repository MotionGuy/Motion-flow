import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Contact, Motion Flow",
  description: "Book a call with Motion Flow, the motion studio for cybersecurity.",
};

const CALENDLY_URL =
  "https://calendly.com/systrenskyi/discussing-collaboration-opportunities?background_color=131620&text_color=f5f7fa&primary_color=a9c7ff&hide_gdpr_banner=1&hide_event_type_details=1";

export default function ContactPage() {
  return (
    <PageShell>
      <h1 className="display max-w-[16ch] text-[clamp(2.4rem,5vw,4rem)]">
        Launching something? <em>Let&apos;s talk.</em>
      </h1>
      <p className="mt-7 max-w-[48ch] text-lg leading-[1.7] text-muted">
        Pick a time below and tell us what you&apos;re launching. Limited
        projects per month.
      </p>
      <div className="mx-auto mt-14 max-w-[900px] overflow-hidden rounded-[14px] border border-line bg-panel p-2 md:p-3">
        <CalendlyEmbed url={CALENDLY_URL} className="h-[760px] md:h-[700px]" />
      </div>
      <p className="mt-10 text-muted">
        Prefer email?{" "}
        <a
          href="mailto:denys@motion-flow.com"
          className="text-fg underline decoration-blue/50 underline-offset-4 transition-colors hover:decoration-blue"
        >
          denys@motion-flow.com
        </a>
      </p>
    </PageShell>
  );
}
