import type { ReactNode } from "react";

/**
 * Glassy icon chip: frosted-glass approximation (backdrop blur, inner
 * highlight, hairline edge). Solid panel fallback under reduced transparency.
 */
export default function GlassIcon({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] text-ice shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md ${className}`}
    >
      {children}
    </span>
  );
}
