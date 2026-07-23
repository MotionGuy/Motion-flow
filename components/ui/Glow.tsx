type GlowProps = {
  /** Opacity of the violet core, 0.12–0.18 per the system */
  strength?: number;
  className?: string;
};

/**
 * Soft violet radial glow — absolutely positioned, low opacity, behind
 * heroes and section anchors. Never in the reading path.
 * Parent must be `relative`; content above it needs `relative` or a z-index.
 */
export default function Glow({ strength = 0.15, className = "" }: GlowProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        background: `radial-gradient(closest-side, rgba(110,86,247,${strength}), transparent 70%)`,
      }}
    />
  );
}
