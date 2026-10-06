"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-coop-blue/10",
        className
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-xs font-bold text-coop-blue">
          {name ? initials(name) : "?"}
        </span>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";

const AvatarFallback = ({ name, className }: { name: string; className?: string }) => (
  <span className={cn("text-xs font-bold text-coop-blue", className)}>{initials(name)}</span>
);

export { Avatar, AvatarFallback };
