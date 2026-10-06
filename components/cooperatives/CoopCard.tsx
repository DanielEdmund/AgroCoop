import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CoopCardProps {
  children: ReactNode;
  className?: string;
  /** Enables warm hover lift (scale 1.02) */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "article" | "section";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-7 sm:p-8",
};

/**
 * The signature AgroCoop card: warm sand surface, soft shadow, rounded-xl,
 * generous spacing, gentle hover lift.
 */
export function CoopCard({
  children,
  className,
  interactive = false,
  padding = "md",
  as = "div",
}: CoopCardProps) {
  const Comp = (motion[as] ?? motion.div) as typeof motion.div;

  return (
    <Comp
      className={cn(
        "rounded-xl border border-coop-sand-dark/70 bg-coop-sand/70 shadow-soft",
        paddingMap[padding],
        interactive &&
          "cursor-pointer transition-shadow duration-300 hover:shadow-lift",
        className
      )}
      whileHover={interactive ? { scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      {children}
    </Comp>
  );
}
