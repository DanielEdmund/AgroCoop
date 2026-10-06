import { cn, initials } from "@/lib/utils";
import type { CooperativeRole, MemberStatus } from "@/lib/types";

const ringByStatus: Record<MemberStatus, string> = {
  verified: "ring-2 ring-coop-green ring-offset-2 ring-offset-white",
  growing: "ring-2 ring-coop-gold ring-offset-2 ring-offset-white",
  new: "ring-2 ring-coop-coral ring-offset-2 ring-offset-white",
};

const dotByStatus: Record<MemberStatus, string> = {
  verified: "bg-coop-green",
  growing: "bg-coop-gold",
  new: "bg-coop-coral",
};

const roleColors: Partial<Record<CooperativeRole, string>> = {
  founder: "bg-coop-gold",
  chairperson: "bg-coop-blue",
  "vice-chairperson": "bg-coop-blue",
  secretary: "bg-coop-blue-dark",
  treasurer: "bg-coop-green",
  organizer: "bg-coop-coral",
};

interface CoopAvatarProps {
  name: string;
  image?: string;
  status?: MemberStatus;
  role?: CooperativeRole;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showRing?: boolean;
  showRole?: boolean;
  className?: string;
}

const sizes = {
  xs: "h-7 w-7 text-[10px]",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-2xl",
};

/** Farmer portrait with status ring and optional role indicator. */
export function CoopAvatar({
  name,
  image,
  status = "verified",
  role,
  size = "md",
  showRing = true,
  showRole = false,
  className,
}: CoopAvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-full bg-coop-blue/10",
          sizes[size],
          showRing && ringByStatus[status]
        )}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-bold text-coop-blue">
            {initials(name)}
          </span>
        )}
      </div>

      <span
        className={cn(
          "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
          dotByStatus[status]
        )}
        aria-hidden
      />

      {showRole && role && (
        <span
          className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-white",
            roleColors[role] ?? "bg-coop-earth"
          )}
        >
          {role.replace("-", " ")}
        </span>
      )}
    </div>
  );
}
