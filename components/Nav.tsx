"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Airy fixed bar: logo, "Book a call", and a menu button that opens a
 * right-side drawer with big serif links. The drawer is the primary nav.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

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

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/70 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 md:px-10">
          <Link href="/" aria-label="Motion Flow home" className="text-fg">
            <Logo className="text-[14px]" />
          </Link>
          <div className="flex items-center gap-3">
            <Button href="/contact" className="!px-6 !py-3 !text-sm">
              Book a call
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex size-[46px] items-center justify-center rounded-full border border-line text-fg transition-colors duration-200 hover:border-line-bright hover:bg-white/[0.04]"
            >
              <List size={20} weight="light" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(420px,92vw)] flex-col border-l border-line bg-panel px-10 py-8"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  autoFocus
                  onClick={() => setOpen(false)}
                  className="inline-flex size-[46px] items-center justify-center rounded-full border border-line text-fg transition-colors duration-200 hover:border-line-bright hover:bg-white/[0.04]"
                >
                  <X size={20} weight="light" />
                </button>
              </div>

              <nav className="mt-16 flex flex-col gap-7" aria-label="Main">
                {LINKS.map((l, i) => (
                  <motion.span
                    key={l.href}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display block text-4xl text-fg transition-colors duration-200 hover:text-blue hover:italic"
                    >
                      {l.label}
                    </Link>
                  </motion.span>
                ))}
              </nav>

              <div className="mt-auto space-y-2 border-t border-line pt-8">
                <a
                  href="mailto:denys@motion-flow.com"
                  className="block text-sm text-muted transition-colors duration-200 hover:text-fg"
                >
                  denys@motion-flow.com
                </a>
                <a
                  href="https://www.linkedin.com/in/systrenskyi"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-muted transition-colors duration-200 hover:text-fg"
                >
                  LinkedIn
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
