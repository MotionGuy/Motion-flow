"use client";

import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  /** Interactive filter chip — renders a button with an active state */
  filter?: boolean;
  active?: boolean;
  onClick?: () => void;
};

const base =
  "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[11px] " +
  "font-medium uppercase tracking-[0.12em] leading-normal";

export default function Tag({ children, filter, active, onClick }: TagProps) {
  if (filter) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} cursor-pointer transition-colors duration-150 ${
          active
            ? "border border-violet/60 bg-violet/10 text-violet-bright"
            : "border border-line bg-white/[0.02] text-muted hover:border-line-bright hover:text-fg"
        }`}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={`${base} border border-line bg-white/[0.02] text-muted`}>
      {children}
    </span>
  );
}
