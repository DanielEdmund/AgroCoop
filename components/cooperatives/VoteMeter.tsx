"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteMeterProps {
  yes: number;
  no: number;
  abstain: number;
  eligibleVoters?: number;
  userVote?: "yes" | "no" | "abstain" | null;
  compact?: boolean;
  className?: string;
}

/**
 * Visual Yes / No / Abstain bars for cooperative decisions.
 * Percentages are computed against total votes cast.
 */
export function VoteMeter({
  yes,
  no,
  abstain,
  eligibleVoters,
  userVote,
  compact = false,
  className,
}: VoteMeterProps) {
  const total = Math.max(1, yes + no + abstain);
  const pct = (n: number) => Math.round((n / total) * 100);
  const participation = eligibleVoters
    ? Math.min(100, Math.round((total / eligibleVoters) * 100))
    : 100;

  const rows = [
    { key: "yes" as const, label: "Yes", value: yes, percent: pct(yes), color: "bg-coop-green", text: "text-coop-green", icon: Check },
    { key: "no" as const, label: "No", value: no, percent: pct(no), color: "bg-coop-coral", text: "text-coop-coral", icon: X },
    { key: "abstain" as const, label: "Abstain", value: abstain, percent: pct(abstain), color: "bg-sand-400", text: "text-sand-500", icon: Minus },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      {rows.map((row) => {
        const Icon = row.icon;
        const isChoice = userVote === row.key;
        return (
          <div key={row.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 font-semibold",
                  isChoice ? row.text : "text-coop-earth"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {row.label}
                {isChoice && (
                  <span className="rounded-full bg-coop-blue/10 px-1.5 py-px text-[10px] font-bold uppercase tracking-wide text-coop-blue">
                    Your vote
                  </span>
                )}
              </span>
              <span className="tabular-nums text-sand-500">
                <strong className={cn("text-coop-earth", !compact && "text-base")}>
                  {row.percent}%
                </strong>{" "}
                <span className="text-xs">({row.value})</span>
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-coop-sand-dark">
              <motion.div
                className={cn("h-full rounded-full", row.color)}
                initial={{ width: 0 }}
                whileInView={{ width: `${row.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        );
      })}

      {eligibleVoters && (
        <p className="pt-1 text-xs text-sand-500">
          {participation}% participation · {total} of {eligibleVoters} eligible members voted
        </p>
      )}
    </div>
  );
}
