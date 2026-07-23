"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-3.5 " +
  "font-sans text-[15px] font-medium leading-none " +
  "transition-[transform,box-shadow,background-color,border-color] duration-200 " +
  "[transition-timing-function:var(--ease-micro)] motion-safe:hover:scale-[1.02] " +
  "motion-safe:active:scale-[0.99]";

const variants = {
  primary:
    "bg-violet text-white shadow-[0_0_24px_rgba(110,86,247,0.35)] " +
    "hover:bg-violet-bright hover:shadow-[0_2px_40px_rgba(110,86,247,0.55)]",
  secondary:
    "border border-line text-fg bg-transparent " +
    "hover:border-line-bright hover:bg-white/[0.04]",
};

function Arrow() {
  return (
    <svg
      className="size-4 shrink-0 transition-transform duration-200 [transition-timing-function:var(--ease-micro)] motion-safe:group-hover:translate-x-1"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Button({
  children,
  href,
  variant = "primary",
  arrow = false,
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow && <Arrow />}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
