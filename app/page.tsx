import { redirect } from "next/navigation";

// Temporary: the design system is the only page so far.
// Home replaces this redirect once the system is approved.
export default function RootPage() {
  redirect("/design-system");
}
