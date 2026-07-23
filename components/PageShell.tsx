import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/** Shared frame for inner pages: nav, airy top spacing, footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh]">
      <Nav />
      <main className="mx-auto max-w-[1280px] px-6 pb-32 pt-44 md:px-10 md:pt-52">
        {children}
      </main>
      <Footer />
    </div>
  );
}
