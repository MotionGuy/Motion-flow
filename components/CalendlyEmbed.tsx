"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Calendly inline embed that survives client-side navigation. The widget
 * script only auto-scans the page on its first load, so embeds mounted after
 * a route change must be initialized explicitly via Calendly.initInlineWidget.
 */
export default function CalendlyEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const init = () => {
      const Calendly = (window as unknown as { Calendly?: { initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void } }).Calendly;
      if (!Calendly || !el.isConnected || el.childElementCount > 0) return;
      Calendly.initInlineWidget({ url, parentElement: el });
    };

    if ((window as unknown as { Calendly?: unknown }).Calendly) {
      init();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, [url]);

  return <div ref={ref} style={{ minWidth: "320px", height: "680px" }} />;
}
