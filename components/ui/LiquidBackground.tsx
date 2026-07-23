/**
 * Animated liquid gradient: three large blurred blobs in the deep-periwinkle
 * and light-blue family drifting slowly behind the hero. Pure CSS transforms,
 * GPU-cheap, stilled automatically under prefers-reduced-motion.
 * Parent must be `relative overflow-hidden`.
 */
export default function LiquidBackground({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div
        className="absolute left-[-10%] top-[-20%] size-[55vw] min-h-[420px] min-w-[420px] rounded-full opacity-[0.32] blur-[110px] motion-safe:animate-[drift-a_26s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle at 40% 40%, #6c85eb, transparent 65%)" }}
      />
      <div
        className="absolute right-[-12%] top-[10%] size-[45vw] rounded-full opacity-[0.2] blur-[100px] motion-safe:animate-[drift-b_32s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle at 60% 40%, #a9c7ff, transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-30%] left-[20%] size-[50vw] rounded-full opacity-[0.16] blur-[120px] motion-safe:animate-[drift-c_38s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle at 50% 50%, #2b3c72, transparent 70%)" }}
      />
      {/* Vignette keeps the reading path dark and the text AAA-contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_30%,rgba(11,13,19,0.85)_78%,#0b0d13_100%)]" />
    </div>
  );
}
