/**
 * Stacked Motion Flow wordmark, sized via the parent font-size (em-based).
 * MOTION: condensed heavy caps (Anton, slightly stretched). FLOW: geometric
 * extrabold caps (Poppins) with its letters justified across MOTION's exact
 * width, matching the brand logo's round O and wide W.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="Motion Flow"
      className={`inline-flex w-max select-none flex-col leading-none ${className}`}
    >
      <span className="origin-bottom scale-y-[1.18] font-logo text-[1em] leading-[0.98] tracking-[0.01em]">
        MOTION
      </span>
      <span className="mt-[0.06em] flex w-full items-baseline justify-between font-flow text-[0.565em] font-extrabold leading-none">
        {["F", "L", "O", "W"].map((c) => (
          <span key={c}>{c}</span>
        ))}
      </span>
    </span>
  );
}
