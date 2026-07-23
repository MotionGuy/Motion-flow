/**
 * Animated liquid gradient: large blurred blobs in the periwinkle and
 * light-blue family drifting slowly, plus a central breathing glow. Pure CSS
 * transforms, GPU-cheap, stilled automatically under prefers-reduced-motion.
 * Parent must be `relative overflow-hidden`.
 */
export default function LiquidBackground({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div
        className="absolute left-[-10%] top-[-20%] size-[55vw] min-h-[420px] min-w-[420px] rounded-full opacity-[0.38] blur-[110px] motion-safe:animate-[drift-a_26s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle at 40% 40%, #6c85eb, transparent 65%)" }}
      />
      <div
        className="absolute right-[-12%] top-[10%] size-[45vw] rounded-full opacity-[0.26] blur-[100px] motion-safe:animate-[drift-b_32s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle at 60% 40%, #a9c7ff, transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-30%] left-[20%] size-[50vw] rounded-full opacity-[0.2] blur-[120px] motion-safe:animate-[drift-c_38s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle at 50% 50%, #2b3c72, transparent 70%)" }}
      />
      {/* Central breathing glow: the hero's heartbeat */}
      <div
        className="absolute left-1/2 top-1/2 size-[52vw] min-h-[380px] min-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[90px] motion-safe:animate-[breathe_9s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #a9c7ff, rgba(108,133,235,0.5) 45%, transparent 70%)" }}
      />
      {/* Vignette keeps the reading path dark and the text high-contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,transparent_35%,rgba(11,13,19,0.82)_80%,#0b0d13_100%)]" />
    </div>
  );
}
