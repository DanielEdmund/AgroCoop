import Link from "next/link";
import { Logo } from "@/components/layout/MarketingHeader";

/** Shared header for the start / join wizard flows. */
export function OnboardingHeader({ stepLabel }: { stepLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-coop-sand-dark/70 bg-coop-sand/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-4">
          {stepLabel && (
            <span className="hidden rounded-full bg-coop-blue/10 px-3 py-1 text-xs font-bold text-coop-blue sm:inline">
              {stepLabel}
            </span>
          )}
          <Link
            href="/"
            className="text-sm font-semibold text-sand-600 transition-colors hover:text-coop-earth"
          >
            Exit
          </Link>
        </div>
      </div>
    </header>
  );
}
