"use client";

import {
  Boxes,
  ShoppingBasket,
  Handshake,
  Vote,
  Store,
  GraduationCap,
  MessagesSquare,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations";

const features: { icon: LucideIcon; title: string; description: string; tone: string }[] = [
  {
    icon: Boxes,
    title: "Resource Pooling",
    description: "Tractors, warehouses and capital that no single smallholder could carry alone.",
    tone: "bg-coop-blue/10 text-coop-blue group-hover:bg-coop-blue",
  },
  {
    icon: ShoppingBasket,
    title: "Collective Buying",
    description: "Seed, fertiliser and chemicals ordered in bulk at 19–26% below retail.",
    tone: "bg-coop-gold/10 text-coop-gold group-hover:bg-coop-gold",
  },
  {
    icon: Handshake,
    title: "Collective Bargaining",
    description: "One negotiation desk sets a price floor so buyers meet the coop, not individuals.",
    tone: "bg-coop-green/10 text-coop-green group-hover:bg-coop-green",
  },
  {
    icon: Vote,
    title: "Democratic Voting",
    description: "Every member, one vote — on budgets, projects, by-laws and leadership.",
    tone: "bg-coop-coral/10 text-coop-coral group-hover:bg-coop-coral",
  },
  {
    icon: Store,
    title: "Collective Marketplace",
    description: "List harvests together, match with bulk buyers and settle to member accounts.",
    tone: "bg-coop-blue/10 text-coop-blue group-hover:bg-coop-blue",
  },
  {
    icon: GraduationCap,
    title: "Learning Centre",
    description: "Courses, field days and workshops on agronomy, finance and governance.",
    tone: "bg-coop-gold/10 text-coop-gold group-hover:bg-coop-gold",
  },
  {
    icon: MessagesSquare,
    title: "Community",
    description: "Forums, announcements and member profiles where knowledge is shared freely.",
    tone: "bg-coop-green/10 text-coop-green group-hover:bg-coop-green",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Open accounts, public project progress and a permanent decision record.",
    tone: "bg-coop-coral/10 text-coop-coral group-hover:bg-coop-coral",
  },
];

export function FeaturesGrid() {
  return (
    <section className="bg-white coop-section">
      <div className="coop-container">
        <SectionHeading
          eyebrow="Everything a cooperative needs"
          title="One platform for the whole cooperative life"
          description="From the first meeting to the final settlement — tools built around how Nigerian farmers already work together."
        />

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <div className="group h-full rounded-xl border border-coop-sand-dark/70 bg-coop-sand/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-coop-blue/20 hover:shadow-lift">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white ${f.tone}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-coop-earth">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand-500">{f.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
