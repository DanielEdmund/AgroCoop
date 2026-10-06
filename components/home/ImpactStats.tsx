"use client";

import { Counter } from "@/components/animations/Counter";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import { impactStats } from "@/lib/data/community";

export function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-coop-blue coop-section">
      <div className="absolute inset-0 bg-dots-sand bg-[length:26px_26px] opacity-[0.12]" aria-hidden />
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-coop-gold/25 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-coop-green/25 blur-3xl" aria-hidden />

      <div className="coop-container relative">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Our shared impact
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Numbers we built together
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Every figure below belongs to the farmers who showed up, voted, pooled and sold as one.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          staggerDelay={0.08}
        >
          {impactStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="rounded-xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white/15">
                <p className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                  <Counter
                    value={stat.value}
                    prefix={"prefix" in stat ? (stat.prefix as string) : ""}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2 text-sm font-bold text-coop-gold-light">{stat.label}</p>
                <p className="mt-0.5 text-xs text-white/70">{stat.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
