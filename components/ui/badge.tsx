import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-coop-blue text-white",
        secondary: "border-transparent bg-coop-sand text-coop-earth",
        gold: "border-transparent bg-coop-gold-light text-coop-gold",
        green: "border-transparent bg-coop-green-light text-coop-green",
        coral: "border-transparent bg-coop-coral-light text-coop-coral",
        sky: "border-transparent bg-coop-sky text-coop-blue-dark",
        outline: "border-coop-sand-dark bg-white text-sand-600",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
