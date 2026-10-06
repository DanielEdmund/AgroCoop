"use client";

import { ICO_PRINCIPLES } from "@/lib/constants";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations";

export function Principles() {
  return (
    <section id="principles" className="relative overflow-hidden bg-white coop-section">
      <div className="absolute inset-0 bg-coop-pattern" aria-hidden />
      <div className="coop-container relative">
        <SectionHeading
          eyebrow="The 7 cooperative principles"
          title="Guided by the principles the world's coops share"
          description="AgroCoop is built on the seven principles of the International Co-operative Alliance — the same principles that have held farming communities together for 180 years."
        />

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {ICO_PRINCIPLES.map((p) => (
            <StaggerItem key={p.number} className={p.number === 7 ? "lg:col-span-2" : undefined}>
              <div className="group h-full rounded-xl border border-coop-sand-dark/70 bg-coop-sand/70 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-coop-blue/25 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coop-blue font-display text-base font-semibold text-white shadow-coop-blue transition-transform duration-300 group-hover:-rotate-6">
                    {p.number}
                  </span>
                  <h3 className="font-display text-base font-semibold leading-snug text-coop-earth">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-sand-500">{p.summary}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
