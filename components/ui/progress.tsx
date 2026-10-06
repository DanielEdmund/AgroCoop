"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorClassName, ...props }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-coop-sand-dark",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full bg-coop-green transition-[width] duration-700 ease-out",
          indicatorClassName
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
);
Progress.displayName = "Progress";

const Separator = ({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) => (
  <div
    role="separator"
    aria-orientation={orientation}
    className={cn(
      "shrink-0 bg-coop-sand-dark",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
  />
);

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-xl bg-coop-sand-dark", className)} />
);

export { Progress, Separator, Skeleton };
