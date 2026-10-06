"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, Star, BadgeCheck, ArrowRight, Tractor, Wheat } from "lucide-react";
import type { Cooperative } from "@/lib/types";
import { CoopBadge } from "@/components/cooperatives/CoopBadge";
import { formatNaira } from "@/lib/utils";

interface CoopCardProps {
  cooperative: Cooperative;
  index?: number;
}

export function CooperativeCard({ cooperative: c, index = 0 }: CoopCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: Math.min(index, 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-coop-sand-dark/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <Link href={`/cooperatives/${c.id}`} className="flex flex-1 flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={c.image}
            alt={c.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/75 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {c.verified && <CoopBadge kind="verified" />}
            {c.featured && <CoopBadge kind="featured" />}
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-coop-earth backdrop-blur-sm">
              <MapPin className="h-3 w-3 text-coop-coral" /> {c.location}, {c.state}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-coop-gold px-2.5 py-1 text-[11px] font-bold text-white">
              <Star className="h-3 w-3 fill-current" /> {c.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold leading-snug text-coop-earth transition-colors group-hover:text-coop-blue">
              {c.name}
            </h3>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-sand-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-coop-blue" />
          </div>

          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-sand-500">{c.tagline}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {c.crops.map((crop) => (
              <span
                key={crop}
                className="inline-flex items-center gap-1 rounded-full bg-coop-green-light px-2 py-0.5 text-[11px] font-semibold text-coop-green"
              >
                <Wheat className="h-3 w-3" /> {crop}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-coop-sand-dark/70 pt-4 text-center">
            <div>
              <p className="flex items-center justify-center gap-1 font-display text-base font-semibold text-coop-earth">
                <Users className="h-3.5 w-3.5 text-coop-blue" /> {c.members}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-sand-500">Members</p>
            </div>
            <div>
              <p className="font-display text-base font-semibold text-coop-earth">
                {formatNaira(c.tradeVolume, true)}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-sand-500">Trade</p>
            </div>
            <div>
              <p className="flex items-center justify-center gap-1 font-display text-base font-semibold text-coop-earth">
                <Tractor className="h-3.5 w-3.5 text-coop-gold" /> {c.resourcesShared}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-sand-500">Shared</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-coop-sand px-3 py-2">
            <span className="text-xs font-semibold text-sand-600">
              Founded {c.founded} · {c.size} coop
            </span>
            <BadgeCheck className="h-4 w-4 text-coop-green" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
