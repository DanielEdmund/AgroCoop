"use client";

import { Handshake, Boxes, Vote, TrendingUp, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations";

const steps: { icon: LucideIcon; title: string; description: string; step: string }[] = [
  {
    step: "01",
    icon: Handshake,
    title: "Come Together",
    description:
      "Neighbouring farmers meet, agree on a shared goal and register a cooperative with clear, democratic by-laws.",
  },
  {
    step: "02",
    icon: Boxes,
    title: "Pool Resources",
    description:
      "Members combine capital, equipment, storage and labour — buying inputs in bulk and sharing what no farm can afford alone.",
  },
  {
    step: "03",
    icon: Vote,
    title: "Make Decisions",
    description:
      "Every member has one vote. Budgets, contracts and leadership are decided openly, together and on record.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Grow Together",
    description:
      "The coop negotiates prices, sells collectively and reinvests profits — so prosperity is shared, not extracted.",
  },
];

export function HowCoopsWork() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-coop-sand coop-section">
      <div className="absolute inset-0 bg-coop-pattern" aria-hidden />
      <div className="coop-container relative">
        <SectionHeading
          eyebrow="How cooperatives work"
          title="Four steps from many farms to one strong community"
          description="No single farmer should face the market alone. Here is how a cooperative turns individual effort into collective strength."
        />

        <StaggerContainer className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title} className="relative">
                <div className="group relative h-full overflow-hidden rounded-xl border border-coop-sand-dark/70 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-lift">
                  <span className="absolute right-4 top-4 font-display text-5xl font-semibold text-coop-sand-dark/70 transition-colors duration-300 group-hover:text-coop-blue/20">
                    {s.step}
                  </span>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-coop-blue/10 text-coop-blue transition-colors duration-300 group-hover:bg-coop-blue group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative mt-5 font-display text-xl font-semibold text-coop-earth">
                    {s.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-sand-500">
                    {s.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
