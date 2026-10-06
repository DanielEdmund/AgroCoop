import type { Metadata } from "next";
import { Users } from "lucide-react";
import { CooperativeDirectory } from "@/components/cooperatives/CooperativeDirectory";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { ScrollReveal } from "@/components/animations";
import { cooperatives } from "@/lib/data/cooperatives";
import { members } from "@/lib/data/members";

export const metadata: Metadata = {
  title: "Cooperatives Directory",
  description:
    "Search 240+ Nigerian agricultural cooperatives by location, crop and size — and find the community that fits your farm.",
};

export default function CooperativesPage() {
  const totalMembers = members.length;
  const totalStates = new Set(cooperatives.map((c) => c.state)).size;

  return (
    <>
      {/* Page hero */}
      <section className="relative isolate overflow-hidden bg-coop-blue">
        <div className="absolute inset-0 bg-coop-pattern opacity-70" aria-hidden />
        <div className="coop-container relative py-14 sm:py-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              <Users className="h-3.5 w-3.5" /> Cooperative directory
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Find a community already growing near you
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              Every listing is a member-governed cooperative with open books, published votes and
              shared resources. Search by location, crop or size — then request to join.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { value: `${cooperatives.length}+`, label: "Featured coops" },
                { value: `${totalStates}`, label: "States covered" },
                { value: `${totalMembers}+`, label: "Featured members" },
                { value: "240+", label: "On the platform" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-coop-gold/70 pl-4">
                  <p className="font-display text-2xl font-semibold text-white">{s.value}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="coop-section bg-coop-sand">
        <div className="coop-container">
          <CooperativeDirectory />
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-white coop-section">
        <div className="coop-container">
          <ScrollReveal className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-coop-sky p-8 sm:p-10 lg:flex-row">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold text-coop-earth sm:text-3xl">
                Cannot find a cooperative in your area?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-sand-600 sm:text-base">
                Start one. Our seven-step wizard walks you through name, location, focus, goals and
                by-laws — and your neighbours can join within minutes of going live.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <CoopButton href="/start-cooperative" variant="cta" size="lg">
                Start a Cooperative
              </CoopButton>
              <CoopButton href="/join-cooperative" variant="outline" size="lg">
                Join Existing
              </CoopButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
