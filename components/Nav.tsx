"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Airy fixed nav; gains a hairline and blur once the page scrolls. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" }
    );
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:24px;height:1px;width:1px;";
    document.body.prepend(sentinel);
    obs.observe(sentinel);
    return () => {
      obs.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-fg"
        >
          Motion Flow
        </Link>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
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
        <Button href="/contact" className="!px-6 !py-3 !text-sm">
          Book a call
        </Button>
      </div>
    </header>
  );
}
