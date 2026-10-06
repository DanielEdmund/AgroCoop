import Link from "next/link";
import { Sprout } from "lucide-react";
import { CoopButton } from "@/components/cooperatives/CoopButton";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-coop-sand px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coop-blue text-white shadow-coop-blue">
        <Sprout className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold text-coop-earth">
        This path hasn't been planted yet
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-sand-500">
        The page you are looking for does not exist — but the cooperative community is right where
        you left it.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <CoopButton href="/" variant="cta" size="lg">
          Back home
        </CoopButton>
        <CoopButton href="/cooperatives" variant="outline" size="lg">
          Browse cooperatives
        </CoopButton>
      </div>
      <Link href="/dashboard" className="mt-6 text-sm font-semibold text-coop-blue hover:underline">
        Go to dashboard →
      </Link>
    </div>
  );
}
