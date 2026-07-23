type GlowProps = {
  /** Opacity of the light-blue core, 0.08 to 0.16 */
  strength?: number;
  className?: string;
};

/**
 * Soft light-blue radial glow. Absolutely positioned, low opacity, behind
 * section anchors. Never in the reading path. Parent must be `relative`.
 */
export default function Glow({ strength = 0.12, className = "" }: GlowProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        background: `radial-gradient(closest-side, rgba(169,199,255,${strength}), transparent 70%)`,
      }}
    />
  );
}
