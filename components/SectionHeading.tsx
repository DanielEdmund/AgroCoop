import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-10 sm:mb-14 flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <span className="coop-eyebrow">{eyebrow}</span>}
      <h2 className="coop-heading max-w-3xl text-balance">{title}</h2>
      {description && <p className="coop-subheading max-w-2xl text-balance">{description}</p>}
      {children}
    </ScrollReveal>
  );
}
