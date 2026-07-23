/**
 * Stacked Motion Flow wordmark, sized via the parent font-size (em-based).
 * Approximates the brand logo (condensed caps, MOTION over FLOW) in Anton;
 * swap for the real SVG once the vector file lands.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="Motion Flow"
      className={`inline-flex select-none flex-col items-center leading-none ${className}`}
    >
      <span className="font-logo text-[1em] leading-[0.94] tracking-[0.015em]">
        MOTION
      </span>
      <span className="-mr-[0.3em] font-logo text-[0.93em] leading-[0.98] tracking-[0.3em]">
        FLOW
      </span>
    </span>
  );
}
