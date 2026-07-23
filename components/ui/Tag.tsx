"use client";

import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  /** Interactive filter chip - renders a button with an active state */
  filter?: boolean;
  active?: boolean;
  onClick?: () => void;
};

const base =
  "inline-flex items-center rounded-full px-3 py-1 font-mono text-[10.5px] " +
  "font-medium uppercase tracking-[0.14em] leading-normal";

export default function Tag({ children, filter, active, onClick }: TagProps) {
  if (filter) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} cursor-pointer transition-colors duration-150 ${
          active
            ? "border border-blue/60 bg-blue/10 text-ice"
            : "border border-line text-muted hover:border-line-bright hover:text-fg"
        }`}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={`${base} border border-line text-muted`}>{children}</span>
  );
}
