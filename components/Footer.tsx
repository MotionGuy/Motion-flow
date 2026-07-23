import Link from "next/link";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
        <p className="display whitespace-nowrap text-[clamp(1.25rem,2.9vw,2.25rem)]">
          Motion that makes security make sense.
        </p>
        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <a
              href="mailto:denys@motion-flow.com"
              className="block text-muted transition-colors duration-200 hover:text-fg"
            >
              denys@motion-flow.com
            </a>
            <a
              href="https://www.linkedin.com/in/denys-systrenskyi/"
              target="_blank"
              rel="noreferrer"
              className="block text-muted transition-colors duration-200 hover:text-fg"
            >
              LinkedIn
            </a>
          </div>
          <nav className="flex gap-8" aria-label="Footer">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
          © 2026 Motion Flow
        </p>
      </div>
      {/* Giant wordmark, barely there: the site signs off with the brand */}
      <div aria-hidden className="select-none overflow-hidden pb-2">
        <p className="whitespace-nowrap text-center font-logo text-[12.5vw] leading-[0.82] text-fg/[0.05]">
          MOTION FLOW
        </p>
      </div>
    </footer>
  );
}
