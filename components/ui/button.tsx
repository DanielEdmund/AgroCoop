import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-coop-blue text-white shadow-coop-blue hover:bg-coop-blue-dark",
        secondary: "bg-coop-sand text-coop-earth hover:bg-coop-sand-dark",
        gold: "bg-coop-gold text-white shadow-coop-gold hover:brightness-105",
        green: "bg-coop-green text-white hover:brightness-105",
        outline:
          "border border-coop-blue/30 bg-white text-coop-blue hover:border-coop-blue hover:bg-coop-blue/5",
        ghost: "text-coop-earth hover:bg-coop-sand-dark/60",
        link: "text-coop-blue underline-offset-4 hover:underline",
        destructive: "bg-destructive text-white hover:brightness-95",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
