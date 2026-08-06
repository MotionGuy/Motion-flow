import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import Button from "@/components/ui/Button";
import CaseStudyVideo from "@/components/ui/CaseStudyVideo";
import CaseStudyScroll from "@/components/ui/CaseStudyScroll";

type Study = {
  title: string;
  line: string;
  kind: string;
  tags: string[];
  challenge: string;
  approach: string;
  result: string;
  videoFile?: string;
};

const R2_VIDEO_BASE_URL = "https://pub-9ff429d0848548f5b38c2273dbfe2921.r2.dev";

function sectionCopyClass(text: string) {
  if (text.length > 300) return "case-study-copy--extra-long";
  if (text.length > 210) return "case-study-copy--long";
  if (text.length > 120) return "case-study-copy--medium";
  return "";
}

function introCopyClass(text: string) {
  if (text.length > 300) return "case-study-intro-copy--extra-long";
  if (text.length > 180) return "case-study-intro-copy--long";
  if (text.length > 110) return "case-study-intro-copy--medium";
  return "";
}

function pendingStudy(title: string, videoFile: string): Study {
  return {
    title,
    line: "A new Motion Flow project. Case-study details coming soon.",
    kind: "Motion design",
    tags: ["New project"],
    challenge: "Project details coming soon.",
    approach: "Project details coming soon.",
    result: "Project details coming soon.",
    videoFile,
  };
}

const STUDIES: Record<string, Study> = {
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
    title: "Kind Sigma", line: "Kind Sigma creates premium eyewear that blends contemporary design, precision engineering, and everyday functionality. Every frame is crafted with a focus on materials, comfort, and timeless aesthetics, turning a practical accessory into a statement piece.", kind: "3D product film", tags: ["Product"],
    challenge: "As the brand prepared to showcase its latest collection, it needed more than traditional product visuals. The goal was to communicate craftsmanship, elevate perceived value, and create an emotional connection that reflects the premium nature of the product.",
    approach: "We partnered with Kind Sigma to produce a cinematic 3D product film that highlights every detail through macro shots, refined lighting, and fluid camera movement.",
    result: "The result is a launch-ready visual asset designed for websites, social media, paid campaigns, and presentations, helping the brand stand out, strengthen its identity, and inspire purchase confidence.",
  },
  nettyworth: {
    title: "NettyWorth", line: "NettyWorth is a Web3 platform focused on decentralized lending and liquidity management.", kind: "3D Web3 animation", tags: ["Web3", "DeFi"],
    challenge: "The goal of this animation was to demonstrate how users could leverage multiple on-chain assets, including Polymarket prediction positions, to borrow liquidity through on-chain lending.",
    approach: "By simplifying a complex DeFi workflow into a clear visual story",
    result: "The video helped communicate the platform's value proposition to potential users and investors.",
    videoFile: "NettyWorth.mp4",
  },
  "ai-transforming": {
    title: "AI Transforming", line: "This video explores how artificial intelligence is transforming the way creative teams produce video content. Instead of replacing creativity, AI streamlines repetitive production tasks, allowing teams to move from concept to final delivery faster while maintaining high creative quality.", kind: "Motion graphics explainer", tags: ["AI", "Creative"],
    challenge: "The goal of this project was to explain a modern AI-powered production workflow through clean visual storytelling. By comparing traditional creative processes with AI-assisted workflows, the video demonstrates how teams can accelerate ideation, asset creation, editing, and iteration without compromising the final result.",
    approach: "We created a modern motion graphics explainer that combines dynamic typography, UI-inspired visuals, and cinematic transitions to communicate complex ideas in a simple and engaging way.",
    result: "The final video was designed for websites, social media, presentations, and educational content, helping brands showcase their expertise in AI-driven creative production and communicate the value of faster, more efficient workflows.",
    videoFile: "AItransforming.mp4",
  },
  "arch-public": {
    title: "Arch Public", line: "Arch Public is a digital investment platform that simplifies access to alternative assets through a modern, intuitive experience. By combining institutional-grade infrastructure with a user-friendly interface, the platform enables investors to discover, manage, and diversify their portfolios with confidence.", kind: "Product explainer", tags: ["Fintech", "Investment"],
    challenge: "As the platform expanded, the goal was to communicate its ecosystem and value proposition in a way that felt clear, premium, and easy to understand. Instead of relying on static screens or technical explanations, the video visualizes how the platform connects different investment opportunities into one seamless experience.",
    approach: "We partnered with Arch Public to create a cinematic product explainer combining motion graphics, UI animation, and polished visual storytelling.",
    result: "The final video was designed for the website, social media, presentations, and product launches, helping the brand communicate trust, innovation, and the simplicity of its investment platform.",
    videoFile: "Arch_Public.mp4",
  },
  "game-rock": {
    title: "Game Rock", line: "Game Rock creates premium portable gaming devices, pairing retro-inspired aesthetics with modern technology and high-performance hardware.", kind: "3D CGI product film", tags: ["Product", "Gaming"],
    challenge: "Present the device as more than another gaming console by revealing its engineering, internal components, materials and precision manufacturing.",
    approach: "We created a cinematic CGI product film with detailed 3D animation, exploded views, macro close-ups and dynamic camera movement.",
    result: "A premium asset for launches, websites, social media, presentations and advertising—built to communicate innovation, elevate perceived value and create excitement around the product.",
    videoFile: "Game_Rock.mp4",
  },
  "gemini-2": {
    title: "Gemini 2", line: "This concept video showcases a next-generation AI search experience designed to help users explore complex topics through natural conversations and intelligent discovery. Rather than returning a list of links, the platform delivers contextual answers, visual guidance, and interactive research, making information easier to understand and act on.", kind: "Product showcase", tags: ["AI", "Search"],
    challenge: "The goal of this project was to present AI search as an intuitive, premium digital experience. Through cinematic UI animation, fluid transitions, and minimal motion design, the video highlights how users can move seamlessly from a simple question to meaningful insights in just a few interactions.",
    approach: "We created a modern product showcase combining UI animation, motion design, and clean visual storytelling.",
    result: "The final video was designed for websites, social media, product launches, keynote presentations, and marketing campaigns, helping the brand communicate innovation, build trust, and demonstrate the future of AI-powered search.",
    videoFile: "Gemini2.mp4",
  },
  hook: {
    title: "Hook", line: "This video showcases a data-driven creative framework for testing multiple marketing hooks before investing in a full campaign. Instead of relying on assumptions, the process compares different messaging concepts, measures audience engagement, and identifies the highest-performing direction through rapid experimentation.", kind: "Motion graphics explainer", tags: ["Marketing", "Data"],
    challenge: "The goal was to explain a complex optimization workflow in a simple and visually engaging way.",
    approach: "Using clean motion graphics, UI-inspired visuals, and step-by-step storytelling, the video demonstrates how creative decisions can be backed by real performance data rather than guesswork.",
    result: "We created a modern motion graphics explainer designed for websites, social media, sales presentations, and educational content. The final result helps companies communicate their creative strategy, demonstrate their methodology, and build trust through a clear, data-first approach.",
    videoFile: "Hook.mp4",
  },
  nearville: {
    title: "Nearville", line: "Nearville is a peer-to-peer rental platform that enables neighbors to rent, lend, and share everyday items within trusted local communities. From tools and outdoor gear to electronics and household equipment, the platform helps people access what they need without buying it, while allowing owners to earn from items that would otherwise sit unused.", kind: "Product explainer", tags: ["Marketplace", "Product"],
    challenge: "As Nearville prepared to launch the platform, the goal was to introduce the product through a clear and engaging visual story. Rather than simply showcasing the app interface, the video guides viewers through the entire rental journey from listing an item and discovering nearby rentals to booking, chatting, and completing a transaction making the experience intuitive and easy to understand.",
    approach: "We partnered with Nearville to create a modern product explainer combining UI animation, motion design, and clean visual storytelling.",
    result: "The final video was designed for the website, social media, app stores, investor presentations, and launch campaigns.",
    videoFile: "NearVille.mp4",
  },
  "saas-companies": {
    title: "SaaS Companies", line: "This video was created to help SaaS companies understand how different video formats support different stages of the customer journey. Rather than treating every piece of content the same, it demonstrates when to use short-form videos to capture attention and when longer videos are more effective for education and product adoption.", kind: "Motion graphics explainer", tags: ["SaaS", "Marketing"],
    challenge: "The goal was to simplify a common marketing challenge through clean motion design, UI-inspired visuals, and clear storytelling. By comparing content formats side by side, the video makes it easy for product and marketing teams to build a more effective video strategy.",
    approach: "We created a modern motion graphics explainer designed for websites, social media, sales presentations, and internal marketing resources.",
    result: "The final result helps brands communicate complex ideas in a simple, engaging way while positioning them as experts in their industry.",
    videoFile: "SaaS_companies.mp4",
  },
  "concept-video": {
    title: "Concept Video", line: "This concept video explores how cinematic motion design and UI animation can transform a complex digital product into a clear and engaging story. Rather than overwhelming viewers with features, the film focuses on simplicity, guiding the audience through the experience with clean transitions, premium visuals, and purposeful pacing.", kind: "Product motion design", tags: ["SaaS", "UI animation"],
    challenge: "The goal was to demonstrate how modern SaaS and mobile products can be presented in a way that captures attention within seconds while building trust and curiosity.",
    approach: "Every scene is designed to highlight the product's value without relying on unnecessary technical details.",
    result: "The result is a launch-ready promotional video suitable for websites, social media, paid advertising, investor presentations, and product announcements, helping brands communicate their message with clarity and create a memorable first impression.",
    videoFile: "concept_video.mp4",
  },
  gemini: {
    title: "Gemini", line: "Gemini is an AI assistant designed to help users create, learn, write, code, and solve problems faster through natural conversations. Whether generating ideas, answering questions, or assisting with everyday tasks, the platform brings advanced AI capabilities into a simple and intuitive experience.", kind: "Product showcase", tags: ["AI", "Product"],
    challenge: "The goal of this project was to demonstrate the breadth of Gemini's capabilities through a fast-paced, visually engaging product film. Rather than listing features, the video showcases real-world use cases—from content creation and design to coding, research, and productivity—highlighting how AI can support users across different workflows.",
    approach: "We created a dynamic product showcase combining UI animation, motion design, and cinematic transitions to communicate complex capabilities in a simple, engaging way.",
    result: "The final video was designed for social media, product launches, websites, keynote presentations, and digital marketing campaigns, helping the brand increase awareness, educate users, and drive product adoption.",
    videoFile: "gemini.mp4",
  },
  pisteyo: {
    title: "Pisteyo", line: "This video showcases an AI-powered platform that transforms product ideas into interactive application prototypes in minutes. By combining artificial intelligence with rapid interface generation, the platform helps founders, startups, and product teams validate concepts, explore user flows, and accelerate development without lengthy design cycles.", kind: "Product explainer", tags: ["AI", "Product"],
    challenge: "The goal of this project was to communicate the platform's value through a simple and engaging visual story. Rather than focusing on technical details, the video demonstrates the user journey—from describing an idea to generating a working prototype—making the product easy to understand for both technical and non-technical audiences.",
    approach: "We created a modern product explainer combining UI animation, motion design, and clean visual storytelling.",
    result: "The final video was designed for websites, product launches, social media, investor presentations, and marketing campaigns, helping the brand communicate innovation, simplify a complex workflow, and drive product adoption.",
    videoFile: "pisteyo.mp4",
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
    { id: "result", heading: "Result", text: study.result, next: "Next steps", nextId: "case-actions" },
  ];

  return (
    <PageShell>
      <CaseStudyScroll>
        <section id="case-intro" data-case-study-section className="case-study-panel case-study-intro -mt-12 md:-mt-20">
          <Link href="/work" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg">
            <ArrowLeft size={16} weight="light" className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all work
          </Link>

          <div className="mt-12 grid min-w-0 flex-1 gap-12 lg:-translate-y-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-16">
            <div className="lg:self-start">
              <CaseStudyVideo src={`${R2_VIDEO_BASE_URL}/${study.videoFile ?? `${slug}.mp4`}`} title={study.title} />
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted">{study.kind}</p>
            </div>

            <div className="flex min-w-0 flex-col justify-start pt-8 lg:pt-14">
              <p className="eyebrow">Case study</p>
              <h1 className="display mt-6 max-w-[10ch] break-words text-[clamp(3rem,3.6vw,4.5rem)] leading-[0.92]">{study.title}</h1>
              <p className={`case-study-intro-copy mt-8 text-fg/80 ${introCopyClass(study.line)}`}>{study.line}</p>
              <div className="mt-9 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{tag}</span>
                ))}
              </div>
              <button type="button" data-case-study-next data-next-section="challenge" className="case-study-next mt-auto pt-7">
                <span>What was the challenge?</span>
                <span aria-hidden>↓</span>
              </button>
            </div>
          </div>
        </section>

        {sections.map((section, index) => (
          <article id={section.id} data-case-study-section key={section.id} className="case-study-panel border-b border-line">
            <p className="eyebrow">0{index + 1} · {section.heading}</p>
            <p className={`display case-study-copy ${sectionCopyClass(section.text)} mt-10 md:mt-12`}>{section.text}</p>
            <button type="button" data-case-study-next data-next-section={section.nextId} className="case-study-next mt-auto">
              <span>{section.next}</span>
              <span aria-hidden>↓</span>
            </button>
          </article>
        ))}

        <section id="case-actions" data-case-study-section className="case-study-panel border-b border-line">
          <p className="eyebrow">Next step</p>
          <p className="display mt-10 max-w-[13ch] text-[clamp(2.8rem,5.4vw,5.5rem)] leading-[0.98] md:mt-12">Ready to make your product clear?</p>
          <div className="case-study-actions mt-auto">
            <Button href="/work" variant="secondary">See all work</Button>
            <Button href="/contact" variant="secondary">Book a call</Button>
          </div>
        </section>
      </CaseStudyScroll>
    </PageShell>
  );
}
