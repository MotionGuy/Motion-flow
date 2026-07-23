import type { Metadata } from "next";
import WorkGrid from "./work-grid";

export const metadata: Metadata = {
  title: "Work, Motion Flow",
  description:
    "2D and 3D animation for complex technical products: explainers, launch films, and ad creative.",
};

export default function WorkPage() {
  return <WorkGrid />;
}
