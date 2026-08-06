"use client";

import { useEffect, type ReactNode } from "react";

const SECTION_SELECTOR = "[data-case-study-section]";
const HEADER_OFFSET = 104;

/** Advances a case study one complete section for each deliberate scroll. */
export default function CaseStudyScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let locked = false;
    let unlockTimer: number | undefined;

    const move = (direction: 1 | -1) => {
      if (locked) return;
      const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
      if (!sections.length) return;

      const readingLine = window.scrollY + HEADER_OFFSET + 12;
      let current = 0;
      sections.forEach((section, index) => {
        if (section.offsetTop <= readingLine) current = index;
      });

      const next = Math.max(0, Math.min(sections.length - 1, current + direction));
      if (next === current) return;

      locked = true;
      window.scrollTo({ top: sections[next].offsetTop - HEADER_OFFSET, behavior: "smooth" });
      unlockTimer = window.setTimeout(() => { locked = false; }, 760);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 8) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("video, input, textarea, select")) return;
      event.preventDefault();
      move(event.deltaY > 0 ? 1 : -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        move(1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      if (unlockTimer) window.clearTimeout(unlockTimer);
    };
  }, []);

  return <>{children}</>;
}
