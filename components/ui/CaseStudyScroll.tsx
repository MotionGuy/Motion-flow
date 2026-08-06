"use client";

import { useEffect, type ReactNode } from "react";

const SECTION_SELECTOR = "[data-case-study-section]";

/** Moves through the case study in one complete, uninterrupted action. */
export default function CaseStudyScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let activeIndex = 0;
    let moving = false;
    let unlockTimer: number | undefined;
    let wheelIntent: 1 | -1 | undefined;
    let wheelIntentTimer: number | undefined;

    const getSections = () => Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));

    const updatePromptVisibility = (sections: HTMLElement[], currentIndex: number) => {
      sections.forEach((section, index) => {
        section.querySelectorAll<HTMLElement>("[data-case-study-next]").forEach((prompt) => {
          const hidden = index !== currentIndex;
          prompt.toggleAttribute("data-case-study-hidden", hidden);
          prompt.setAttribute("aria-hidden", String(hidden));
        });
      });
    };

    const goTo = (nextIndex: number) => {
      const sections = getSections();
      const destination = sections[nextIndex];
      if (!destination || moving || nextIndex === activeIndex) return;

      moving = true;
      activeIndex = nextIndex;
      updatePromptVisibility(sections, activeIndex);
      destination.scrollIntoView({ behavior: "smooth", block: "start" });

      // This timer only unlocks the next gesture. It never adjusts the scroll
      // position, which prevents a second drag after the animation ends.
      if (unlockTimer) window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        moving = false;
        unlockTimer = undefined;
      }, 1100);
    };

    const move = (direction: 1 | -1) => {
      const sections = getSections();
      if (!sections.length || moving) return;

      const nextIndex = Math.max(0, Math.min(sections.length - 1, activeIndex + direction));
      goTo(nextIndex);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 8) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("video, input, textarea, select")) return;
      event.preventDefault();
      if (moving) return;

      // A physical trackpad gesture can contain dozens of tiny wheel events.
      // Wait for it to finish, then use the exact same movement as a button.
      wheelIntent = event.deltaY > 0 ? 1 : -1;
      if (wheelIntentTimer) window.clearTimeout(wheelIntentTimer);
      wheelIntentTimer = window.setTimeout(() => {
        if (wheelIntent && !moving) move(wheelIntent);
        wheelIntent = undefined;
        wheelIntentTimer = undefined;
      }, 140);
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

    const onNextClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-case-study-next]");
      if (!trigger || moving) return;
      const destination = trigger.dataset.nextSection ? document.getElementById(trigger.dataset.nextSection) : null;
      if (!destination) return;
      event.preventDefault();
      const destinationIndex = getSections().indexOf(destination);
      if (destinationIndex >= 0) goTo(destinationIndex);
    };

    const sections = getSections();
    // A case study always opens at the video/title section.
    updatePromptVisibility(sections, activeIndex);

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onNextClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onNextClick);
      if (unlockTimer) window.clearTimeout(unlockTimer);
      if (wheelIntentTimer) window.clearTimeout(wheelIntentTimer);
    };
  }, []);

  return <>{children}</>;
}
