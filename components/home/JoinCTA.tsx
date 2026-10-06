"use client";

import { ArrowRight, Users, Sprout } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { images } from "@/lib/images";

export function JoinCTA() {
  return (
    <section className="relative isolate overflow-hidden coop-section">
      <div className="absolute inset-0 -z-10">
        <img
          src={images.ctaFields}
          alt="Aerial view of green farmland"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-coop-earth/90" />
        <div className="absolute inset-0 bg-dots-sand bg-[length:24px_24px] opacity-20" />
        <div className="absolute inset-0 bg-coop-pattern opacity-60" />
      </div>

      <div className="coop-container">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-coop-gold/40 bg-coop-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-coop-gold-light">
            <Sprout className="h-3.5 w-3.5" /> We are stronger together
          </span>

          <h2 className="mt-6 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Your farm is yours.
            <br />
            <span className="text-coop-gold">Your community is ours to build.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Whether you want to join an existing cooperative or start one with your neighbours —
            it takes about ten minutes to take the first step.
          </p>

          <StaggerContainer
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            staggerDelay={0.1}
          >
            <StaggerItem>
              <CoopButton href="/start-cooperative" variant="cta" size="lg" iconRight={ArrowRight}>
                Start a Cooperative
              </CoopButton>
            </StaggerItem>
            <StaggerItem>
              <CoopButton
                href="/join-cooperative"
                size="lg"
                className="border border-white/30 bg-white/10 text-white shadow-none hover:bg-white/20"
                icon={Users}
              >
                Join a Cooperative
              </CoopButton>
            </StaggerItem>
          </StaggerContainer>

          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">
            Free for farmers · Community-owned · No middlemen
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
