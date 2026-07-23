/**
 * Stacked Motion Flow wordmark, sized via the parent font-size (em-based).
 * Two faces, two lines of EQUAL height and width: MOTION in condensed heavy
 * caps (Anton), FLOW in geometric extrabold caps (Poppins) justified across
 * MOTION's exact width.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="Motion Flow"
      className={`inline-flex w-max select-none flex-col leading-none ${className}`}
    >
      <span className="font-logo text-[1em] leading-[0.92] tracking-[0.01em]">
        MOTION
      </span>
      <span className="mt-[0.1em] flex w-full justify-between font-flow text-[0.93em] font-extrabold leading-[0.85]">
        {["F", "L", "O", "W"].map((c) => (
          <span key={c}>{c}</span>
        ))}
      </span>
    </span>
  );
}
