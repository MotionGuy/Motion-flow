"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
};

/*
 * The hover overlay is the signature:
 *  - primary: light gradient chip (ice to blue), dark text; on hover a diagonal
 *    white shimmer sweeps across, 300ms, slight lift.
 *  - secondary: white text with a light-blue hairline; on hover a light fill
 *    rises from the bottom and the text flips dark.
 * Shape system: interactive elements are pills; containers are 14px.
 */

const base =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full " +
  "px-8 py-4 font-sans text-[15px] font-medium leading-none " +
  "transition-[transform,box-shadow,border-color] duration-300 " +
  "[transition-timing-function:var(--ease-out-expo)] " +
  "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]";

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const classes =
    variant === "primary"
      ? `${base} bg-gradient-to-br from-ice to-blue text-ink shadow-[0_1px_24px_rgba(169,199,255,0.18)] hover:shadow-[0_6px_36px_rgba(169,199,255,0.3)] ${className}`
      : `${base} border border-blue/35 text-fg hover:border-blue/70 ${className}`;

  const inner = (
    <>
      {variant === "primary" ? (
        /* Diagonal shimmer: a soft white band that sweeps across on hover */
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[-60%] w-[45%] -skew-x-12 bg-white/60 blur-[6px] opacity-0 transition-all duration-300 [transition-timing-function:var(--ease-out-expo)] motion-safe:group-hover:left-[115%] group-hover:opacity-100"
        />
      ) : (
        /* Rising fill: light gradient scales up from the bottom edge */
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-blue to-ice transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] motion-safe:group-hover:scale-y-100"
        />
      )}
      <span
        className={
          variant === "secondary"
            ? "relative transition-colors duration-300 group-hover:text-ink"
            : "relative"
        }
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {inner}
    </button>
  );
}
