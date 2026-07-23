import type { Metadata } from "next";
import StyleGuide from "./style-guide";

export const metadata: Metadata = {
  title: "Design System, Motion Flow",
  description:
    "Tokens, type, components, and motion specs for the Motion Flow site.",
};

export default function DesignSystemPage() {
  return <StyleGuide />;
}
