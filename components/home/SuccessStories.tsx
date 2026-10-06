"use client";

import { Quote, MapPin, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { CoopAvatar } from "@/components/cooperatives/CoopAvatar";
import { CoopBadge } from "@/components/cooperatives/CoopBadge";
import { successStories } from "@/lib/data/community";

export function SuccessStories() {
  return (
    <section className="bg-coop-sand coop-section">
      <div className="coop-container">
        <SectionHeading
          eyebrow="Success stories"
          title="Farmers who chose to stand together"
          description="Real members, real cooperatives, real results — from the farm gate to the negotiation table."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {successStories.map((story) => (
            <StaggerItem key={story.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-coop-sand-dark/70 bg-white shadow-soft transition-all duration-300 hover:shadow-lift">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={story.image}
                    alt={`${story.name}, ${story.role}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/80 via-coop-earth/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold text-white">{story.name}</p>
                      <p className="text-xs font-medium text-white/80">
                        {story.role} · {story.cooperative}
                      </p>
                    </div>
                    <CoopBadge kind="verified" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-sand-500">
                    <MapPin className="h-3.5 w-3.5 text-coop-coral" /> {story.location}
                  </p>

                  <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-coop-earth">
                    <Quote className="absolute -left-1 -top-1 h-6 w-6 text-coop-blue/15" />
                    <span className="pl-6 italic">“{story.quote}”</span>
                  </blockquote>

                  <div className="mt-5 flex items-center gap-4 rounded-xl bg-coop-gold-light/70 p-3.5">
                    <p className="font-display text-2xl font-semibold text-coop-gold">
                      {story.metric}
                    </p>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-coop-gold/80">
                        {story.metricLabel}
                      </p>
                      <p className="text-xs leading-snug text-coop-earth">{story.achievement}</p>
                    </div>
                    <Sparkles className="ml-auto h-4 w-4 shrink-0 text-coop-gold" />
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <CoopAvatar name={story.name} image={story.image} size="sm" status="verified" />
                    <span className="text-xs text-sand-500">Member since founding season</span>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
