"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  current: number; // zero-based
}

/** Warm animated 7-step progress indicator used by both wizards. */
export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={step} className="relative flex flex-1 items-center">
              <div className="flex flex-1 flex-col items-center gap-2">
                <motion.span
                  animate={{ scale: active ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-300",
                    done
                      ? "border-coop-green bg-coop-green text-white"
                      : active
                        ? "border-coop-blue bg-coop-blue text-white shadow-coop-blue"
                        : "border-coop-sand-dark bg-white text-sand-400"
                  )}
                >
                  {i + 1}
                </motion.span>
                <span
                  className={cn(
                    "hidden max-w-[92px] text-center text-[10px] font-semibold leading-tight sm:block",
                    active ? "text-coop-blue" : done ? "text-coop-green" : "text-sand-400"
                  )}
                >
                  {step}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div className="relative mx-1 -mt-6 h-0.5 flex-1 overflow-hidden rounded-full bg-coop-sand-dark">
                  <motion.div
                    className={cn("h-full", done ? "bg-coop-green" : "bg-coop-blue")}
                    initial={{ width: 0 }}
                    animate={{ width: done ? "100%" : active ? "50%" : "0%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
