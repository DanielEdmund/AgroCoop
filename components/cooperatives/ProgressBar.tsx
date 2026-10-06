"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tone = "growth" | "fundraising" | "harvest" | "blue";

const toneClasses: Record<Tone, string> = {
  growth: "bg-coop-green",
  fundraising: "bg-coop-gold",
  harvest: "bg-coop-gold",
  blue: "bg-coop-blue",
};

interface ProgressBarProps {
  value: number;
  label?: string;
  detail?: string;
  tone?: Tone;
  showPercentage?: boolean;
  className?: string;
}

/** Growth / fundraising / harvest target progress bar. */
export function ProgressBar({
  value,
  label,
  detail,
  tone = "growth",
  showPercentage = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-semibold text-coop-earth">{label}</span>}
          {showPercentage && (
            <span className="font-bold tabular-nums text-coop-earth">{Math.round(clamped)}%</span>
          )}
        </div>
      )}
      <div className="h-3 w-full overflow-hidden rounded-full bg-coop-sand-dark">
        <motion.div
          className={cn("h-full rounded-full", toneClasses[tone])}
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {detail && <p className="text-xs text-sand-500">{detail}</p>}
    </div>
  );
}
