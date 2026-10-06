import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

/** Shared page header for dashboard routes. */
export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <ScrollReveal className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-coop-blue">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-1 font-display text-2xl font-semibold leading-tight text-coop-earth sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sand-500 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
    </ScrollReveal>
  );
}

export function Panel({
  children,
  className,
  title,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft sm:p-6",
        className
      )}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-coop-earth">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
