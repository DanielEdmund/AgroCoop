import type { Metadata } from "next";
import { Suspense } from "react";
import { JoinCooperativeFlow } from "@/components/onboarding/JoinCooperativeFlow";

export const metadata: Metadata = {
  title: "Join a Cooperative",
  description:
    "Select a cooperative, submit your membership application and track its status — reviewed by members, decided by vote.",
};

export default function JoinCooperativePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-coop-sand" />}>
      <JoinCooperativeFlow />
    </Suspense>
  );
}
