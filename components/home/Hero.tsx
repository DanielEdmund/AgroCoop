"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, ChevronDown } from "lucide-react";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { images } from "@/lib/images";

const stats = [
  { value: "12,500+", label: "Farmers" },
  { value: "240+", label: "Cooperatives" },
  { value: "₦185M+", label: "Traded together" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-width farming image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={images.heroFarmer}
          alt="A Nigerian farmer tending green crops at golden hour"
          className="h-full w-full object-cover"
        />
        <div className="coop-gradient-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-coop-earth/85 via-coop-earth/60 to-coop-earth/25" />
      </div>

      <div className="coop-container relative flex min-h-[86vh] flex-col justify-center py-24 sm:py-28">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-slow-pulse rounded-full bg-coop-gold" />
            Community-owned. Community-driven.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Stronger Farmers.
            <br />
            <span className="text-coop-gold">Stronger Communities.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            AgroCoop is where Nigerian farmers form cooperatives — pooling resources,
            deciding democratically and selling as one. We are stronger together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CoopButton href="/start-cooperative" variant="cta" size="lg" iconRight={ArrowRight}>
              Start a Cooperative
            </CoopButton>
            <CoopButton
              href="/cooperatives"
              size="lg"
              className="border border-white/30 bg-white/10 text-white shadow-none backdrop-blur-sm hover:bg-white/20"
              icon={Users}
            >
              Find a Cooperative
            </CoopButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-coop-gold/70 pl-4">
                <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{s.value}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-white/70">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#how-it-works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white/70 sm:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
