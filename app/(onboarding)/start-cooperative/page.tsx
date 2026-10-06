import type { Metadata } from "next";
import { StartCooperativeWizard } from "@/components/onboarding/StartCooperativeWizard";

export const metadata: Metadata = {
  title: "Start a Cooperative",
  description:
    "Register a new agricultural cooperative in seven simple steps — name, location, focus, goals, principles, review and create.",
};

export default function StartCooperativePage() {
  return <StartCooperativeWizard />;
}
