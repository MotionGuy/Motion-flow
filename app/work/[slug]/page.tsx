import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";
import CaseStudyVideo from "@/components/ui/CaseStudyVideo";

type Study = {
  title: string;
  line: string;
  kind: string;
  tags: string[];
  challenge: string;
  approach: string;
  result: string;
};

const R2_VIDEO_BASE_URL = "https://pub-9ff429d0848548f5b38c2273dbfe2921.r2.dev";

const STUDIES: Record<string, Study> = {
  oogubi: {
    title: "Oogubi", line: "A cinematic 3D brand film built around a distinctive visual system.", kind: "3D brand film", tags: ["Brand film", "Technology"],
    challenge: "Create a distinctive visual world for a technology brand with a complex story.", approach: "Particle-led 3D motion and a cinematic pace turn the brand system into a memorable film.", result: "A high-impact brand piece built to introduce Oogubi across launch and digital touchpoints.",
  },
  wafersight: {
    title: "Wafersight", line: "A dense semiconductor data platform, made clear in 60 seconds.", kind: "2D explainer", tags: ["Explainer", "Deep Tech"],
    challenge: "Turn dense semiconductor data into a story a buyer can understand quickly.", approach: "A crisp 2D explainer that maps the product journey from signal to decision.", result: "A launch-ready film for the homepage, sales conversations and technical demos.",
  },
  orally: {
    title: "Orally", line: "A blockchain protocol explained simply enough to convert.", kind: "2D explainer", tags: ["Explainer", "Blockchain"],
    challenge: "Make a complex blockchain protocol feel clear and approachable.", approach: "A concise visual narrative that translates infrastructure into human outcomes.", result: "A product story that can introduce the platform before a sales conversation starts.",
  },
  miggles: {
    title: "Miggles", line: "A 3D launch film for a coin launch and infrastructure update.", kind: "3D launch film", tags: ["Launch", "Web3"],
    challenge: "Create a high-energy 3D film for a coin launch and infrastructure update.", approach: "Glossy materials, rhythmic motion and a strong central object build momentum.", result: "A memorable launch asset for social, community and announcement moments.",
  },
  hyper: {
    title: "Hyper", line: "A 3D brand film built for a technical audience.", kind: "3D brand film", tags: ["Brand film"],
    challenge: "Give cloud development infrastructure a visual identity with technical depth.", approach: "A 3D brand film using scale, light and movement to make infrastructure feel tangible.", result: "A hero film that gives a technical product a distinctive launch presence.",
  },
  tooltip: {
    title: "ToolTip", line: "A SaaS product explainer, tight enough for paid social.", kind: "2D explainer", tags: ["Explainer", "SaaS"],
    challenge: "Explain a SaaS product fast enough for paid social.", approach: "Tight 2D pacing and clear visual beats keep the message focused.", result: "A short-form-ready explainer built to earn attention quickly.",
  },
  figmatica: {
    title: "Figmatica", line: "A product showreel for a design-tooling brand.", kind: "2D showreel", tags: ["Showreel", "Product"],
    challenge: "Show the value of design tooling through a fast, visual product story.", approach: "A showreel structure combines product moments with a confident visual rhythm.", result: "A versatile film for launch pages, demos and brand channels.",
  },
  platinum: {
    title: "Platinum", line: "A brand promo cut for speed and rhythm.", kind: "2D promo", tags: ["Promo"],
    challenge: "Give a brand promo enough energy to work in a crowded feed.", approach: "Sharp cuts, bold movement and a focused visual motif drive the piece.", result: "A flexible promo cut that can be adapted into multiple ad variants.",
  },
  "woodland-eco": {
    title: "WoodLand Eco", line: "An eco-brand story told in motion.", kind: "2D brand story", tags: ["Brand story"],
    challenge: "Tell an eco-brand story with warmth without losing visual clarity.", approach: "Layered motion and atmospheric transitions create a calm, memorable narrative.", result: "A brand story that works across a landing page, social and presentations.",
  },
  venom: {
    title: "Venom", line: "A 3D concept piece pushing material and light.", kind: "3D concept", tags: ["Concept"],
    challenge: "Use material, light and form to make a 3D concept piece feel premium.", approach: "A vertical-first composition turns a single object into a visual event.", result: "A striking social-ready film designed to stop the scroll.",
  },
  "kind-sigma-glasses": {
    title: "Kind Sigma Glasses", line: "A 3D product visual for eyewear.", kind: "3D product film", tags: ["Product"],
    challenge: "Make a physical product feel desirable through motion and detail.", approach: "Controlled 3D lighting and product framing keep attention on the form.", result: "A clean product visual for launch, ecommerce and paid media.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = STUDIES[slug];
  return {
    title: study ? `${study.title} case study, Motion Flow` : "Case study, Motion Flow",
    description: study?.line ?? "Case study from Motion Flow.",
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = STUDIES[slug];
  if (!study) notFound();

  const sections = [
    { id: "challenge", heading: "What was the challenge?", text: study.challenge, next: "Our approach", nextId: "approach" },
    { id: "approach", heading: "Our approach", text: study.approach, next: "Result", nextId: "result" },
    { id: "result", heading: "Result", text: study.result },
  ];

  return (
    <PageShell>
      <div className="-mt-8 md:-mt-20">
        <Link href="/work" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg">
          <ArrowLeft size={16} weight="light" className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all work
        </Link>

        <section className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <CaseStudyVideo src={`${R2_VIDEO_BASE_URL}/${slug}.mp4`} title={study.title} />
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted">{study.kind}</p>
          </div>

          <div className="flex min-h-[min(56vh,540px)] flex-col justify-center lg:min-h-[min(60vh,600px)]">
            <p className="eyebrow">Case study</p>
            <h1 className="display mt-6 max-w-[10ch] text-[clamp(4rem,8vw,7.5rem)] leading-[0.88]">{study.title}</h1>
            <p className="mt-8 max-w-[28ch] text-xl leading-9 text-fg/80 md:text-2xl md:leading-10">{study.line}</p>
            <div className="mt-9 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{tag}</span>
              ))}
            </div>
            <a href="#challenge" className="case-study-next mt-12 pt-7 md:mt-14">
              <span>What was the challenge?</span>
              <span aria-hidden>↓</span>
            </a>
          </div>
        </section>

        <section className="mt-16 border-t border-line md:mt-24">
          {sections.map((section, index) => (
            <article id={section.id} key={section.id} className="case-study-story scroll-mt-28 border-b border-line">
              <p className="eyebrow">0{index + 1} · {section.heading}</p>
              <p className="display mt-16 max-w-[18ch] text-[clamp(2.8rem,5.4vw,5.5rem)] leading-[0.98] md:mt-24">{section.text}</p>
              {section.next && (
                <a href={`#${section.nextId}`} className="case-study-next mt-auto">
                  <span>{section.next}</span>
                  <span aria-hidden>↓</span>
                </a>
              )}
            </article>
          ))}
        </section>

        <div className="mt-16 flex flex-wrap gap-4">
          <Button href="/work" variant="secondary">See all work</Button>
          <Button href="/contact" variant="secondary">Book a call</Button>
        </div>
      </div>
    </PageShell>
  );
}
