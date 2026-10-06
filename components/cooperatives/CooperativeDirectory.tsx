"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";
import { cooperatives, cooperativeCrops, cooperativeStates } from "@/lib/data/cooperatives";
import { CooperativeCard } from "@/components/cooperatives/CooperativeCard";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { StaggerContainer, StaggerItem } from "@/components/animations";

const sizes = [
  { value: "all", label: "Any size" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

export function CooperativeDirectory() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [crop, setCrop] = useState("all");
  const [size, setSize] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return cooperatives.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.crops.some((cr) => cr.toLowerCase().includes(q));
      const matchesState = state === "all" || c.state === state;
      const matchesCrop = crop === "all" || c.crops.includes(crop);
      const matchesSize = size === "all" || c.size === size;
      return matchesQuery && matchesState && matchesCrop && matchesSize;
    });
  }, [query, state, crop, size]);

  const activeFilters = [state !== "all", crop !== "all", size !== "all"].filter(Boolean).length;

  const reset = () => {
    setState("all");
    setCrop("all");
    setSize("all");
    setQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Search + filter bar */}
      <div className="rounded-2xl border border-coop-sand-dark/70 bg-white p-4 shadow-soft sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by cooperative, town, state or crop…"
              className="h-12 w-full rounded-xl border border-coop-sand-dark bg-coop-sand/60 pl-11 pr-4 text-sm text-coop-earth placeholder:text-sand-400 focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="h-12 flex-1 rounded-xl border border-coop-sand-dark bg-white px-4 text-sm font-semibold text-coop-earth focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30 lg:w-44 lg:flex-none"
            >
              <option value="all">All locations</option>
              {cooperativeStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className="relative flex h-12 items-center gap-2 rounded-xl border border-coop-sand-dark bg-white px-4 text-sm font-semibold text-coop-earth transition-colors hover:border-coop-blue/40 hover:text-coop-blue"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilters > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-coop-blue px-1 text-[10px] font-bold text-white">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-4 border-t border-coop-sand-dark/70 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-sand-500">
                    Crop focus
                  </span>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="h-11 w-full rounded-xl border border-coop-sand-dark bg-coop-sand/60 px-4 text-sm text-coop-earth focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30"
                  >
                    <option value="all">Any crop</option>
                    {cooperativeCrops.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-sand-500">
                    Cooperative size
                  </span>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="h-11 w-full rounded-xl border border-coop-sand-dark bg-coop-sand/60 px-4 text-sm text-coop-earth focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30"
                  >
                    {sizes.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex items-end">
                  <button
                    onClick={reset}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-coop-sand-dark bg-white text-sm font-semibold text-sand-600 transition-colors hover:border-coop-coral/40 hover:text-coop-coral"
                  >
                    <X className="h-4 w-4" /> Clear filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-sand-500">
            <strong className="text-coop-earth">{filtered.length}</strong> cooperative
            {filtered.length === 1 ? "" : "s"} found across Nigeria
          </p>
          <div className="flex flex-wrap gap-2">
            {state !== "all" && (
              <FilterChip label={`${state}`} onClear={() => setState("all")} icon={<MapPin className="h-3 w-3" />} />
            )}
            {crop !== "all" && <FilterChip label={crop} onClear={() => setCrop("all")} />}
            {size !== "all" && (
              <FilterChip label={`${sizes.find((s) => s.value === size)?.label} coops`} onClear={() => setSize("all")} />
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {filtered.map((c, i) => (
            <StaggerItem key={c.id}>
              <CooperativeCard cooperative={c} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-dashed border-coop-sand-dark bg-coop-sand/60 p-12 text-center"
        >
          <p className="font-display text-xl font-semibold text-coop-earth">
            No cooperatives match that search
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-sand-500">
            Try widening your filters — or start the first one in your area. Your neighbours may
            just be waiting for someone to begin.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CoopButton variant="outline" onClick={reset}>
              Clear filters
            </CoopButton>
            <CoopButton href="/start-cooperative" variant="cta">
              Start a Cooperative
            </CoopButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  onClear,
  icon,
}: {
  label: string;
  onClear: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 rounded-full bg-coop-blue/10 px-3 py-1 text-xs font-bold text-coop-blue"
    >
      {icon}
      {label}
      <button onClick={onClear} aria-label={`Remove ${label} filter`} className="hover:text-coop-blue-dark">
        <X className="h-3 w-3" />
      </button>
    </motion.span>
  );
}
