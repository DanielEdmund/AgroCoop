import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, Sprout, Landmark, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { Principles } from "@/components/home/Principles";
import { ImpactStats } from "@/components/home/ImpactStats";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why cooperatives matter for Nigerian agriculture — AgroCoop's mission, vision and the principles we build on.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Nobody faces the market alone",
    body: "A single smallholder negotiates with buyers who hold all the information. A cooperative negotiates as an equal — with a price floor, a contract and a record.",
  },
  {
    icon: Landmark,
    title: "Ownership stays with farmers",
    body: "AgroCoop is community-owned infrastructure. Profits, decisions and data stay with the members who create them — not with outside shareholders.",
  },
  {
    icon: ShieldCheck,
    title: "Trust is built in the open",
    body: "Open accounts, public votes and visible project progress. Every naira and every decision is accountable to the membership.",
  },
  {
    icon: Sprout,
    title: "Growth that regenerates",
    body: "Cooperatives reinvest in their communities — in seed banks, schools, health funds and soils that will feed the next generation.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Mission hero */}
      <section className="relative isolate overflow-hidden bg-coop-earth">
        <div className="absolute inset-0 -z-10">
          <img src={images.seedingTogether} alt="Farmers planting seeds together" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-coop-earth via-coop-earth/90 to-coop-earth/60" />
        </div>
        <div className="coop-container py-20 sm:py-28">
          <ScrollReveal className="max-w-3xl">
            <span className="coop-eyebrow border-coop-gold/30 bg-coop-gold/10 text-coop-gold">
              About AgroCoop
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Community-owned.
              <br />
              <span className="text-coop-gold">Community-driven.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              We exist so that Nigerian farmers can organise themselves — pooling the resources,
              knowledge and bargaining power that individual farms can never reach alone.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-coop-sand coop-section">
        <div className="coop-container grid gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <div className="flex h-full flex-col rounded-xl border border-coop-sand-dark/70 bg-white p-8 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-coop-blue/10 text-coop-blue">
                <Target className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold text-coop-earth">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-sand-600">
                To make cooperative organisation simple, transparent and accessible for every
                Nigerian farmer — giving communities the digital infrastructure to pool resources,
                govern democratically and sell collectively.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Register and run a cooperative with clear, fair by-laws",
                  "Share equipment, storage and capital across member farms",
                  "Put every material decision to a member vote",
                  "Reach bulk buyers and export markets as one supplier",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-coop-earth">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coop-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-coop-sand-dark/70 bg-coop-blue text-white shadow-card">
              <div className="relative h-56">
                <img src={images.aboutCommunity} alt="Farming community gathering" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-coop-blue to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Eye className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold">Our Vision</h2>
                <p className="mt-4 leading-relaxed text-white/85">
                  A Nigerian countryside where prosperity is organised from within — where every
                  farming community can call on a cooperative that owns its warehouse, sets its
                  price, teaches its youth and speaks with one voice.
                </p>
                <p className="mt-auto pt-6 font-display text-lg italic text-coop-gold-light">
                  “If you want to go fast, go alone. If you want to go far, go together.”
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why cooperatives matter */}
      <section className="bg-white coop-section">
        <div className="coop-container">
          <SectionHeading
            eyebrow="Why cooperatives matter"
            title="Small farms are the backbone. Together they are the foundation."
            description="Nigeria's food is grown mostly on plots smaller than five hectares. Cooperatives are the proven mechanism that turns those plots into an economic force."
          />

          <StaggerContainer className="grid gap-5 sm:grid-cols-2" staggerDelay={0.08}>
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <div className="group h-full rounded-xl border border-coop-sand-dark/70 bg-coop-sand/60 p-7 transition-all duration-300 hover:shadow-lift">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-coop-green/10 text-coop-green transition-colors duration-300 group-hover:bg-coop-green group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="font-display text-xl font-semibold text-coop-earth">{v.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-sand-600">{v.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <ScrollReveal className="mt-12 rounded-2xl bg-coop-sky p-8 text-center sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-coop-earth">
              A cooperative is not a club. It is an asset the community owns.
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-sand-600 sm:text-base">
              Every cooperative on AgroCoop holds its own resources, runs its own accounts and
              answers only to its members. Start one with your neighbours — or find one already
              growing near you.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <CoopButton href="/start-cooperative" variant="cta" size="lg">
                Start a Cooperative
              </CoopButton>
              <CoopButton href="/cooperatives" variant="outline" size="lg">
                Browse Cooperatives
              </CoopButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ImpactStats />
      <Principles />
    </>
  );
}
