import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const coopButtonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-coop-blue text-white shadow-coop-blue hover:bg-coop-blue-dark focus-visible:ring-coop-blue",
        cta: "bg-coop-gold text-white shadow-coop-gold hover:brightness-105 focus-visible:ring-coop-gold",
        success:
          "bg-coop-green text-white shadow-[0_8px_24px_-8px_rgba(5,150,105,0.45)] hover:brightness-105 focus-visible:ring-coop-green",
        outline:
          "border-2 border-coop-blue/25 bg-white text-coop-blue hover:border-coop-blue hover:bg-coop-blue/5 focus-visible:ring-coop-blue",
        ghost: "bg-transparent text-coop-earth hover:bg-coop-sand-dark/60 focus-visible:ring-sand-400",
        earth:
          "bg-coop-earth text-white shadow-soft hover:bg-sand-800 focus-visible:ring-coop-earth",
      },
      size: {
        sm: "h-9 rounded-lg px-3.5 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 rounded-xl px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface CoopButtonProps
  extends VariantProps<typeof coopButtonVariants>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "variant" | "size"> {
  href?: string;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
}

export function CoopButton({
  variant = "primary",
  size = "md",
  href,
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  ...props
}: CoopButtonProps) {
  const classes = cn(coopButtonVariants({ variant, size }), className);

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />}
      <span>{children}</span>
      {IconRight && (
        <IconRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
