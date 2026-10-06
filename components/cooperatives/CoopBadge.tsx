import type { ReactNode } from "react";
import {
  Award,
  BadgeCheck,
  Crown,
  Handshake,
  Leaf,
  Sprout,
  Star,
  Users,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CooperativeRole, MemberStatus } from "@/lib/types";

type BadgeKind = CooperativeRole | MemberStatus | "featured" | "new";

const config: Record<
  BadgeKind,
  { label: string; className: string; icon: ReactNode }
> = {
  founder: {
    label: "Founder",
    className: "bg-coop-gold-light text-coop-gold border-coop-gold/25",
    icon: <Crown className="h-3 w-3" />,
  },
  "chairperson": {
    label: "Chairperson",
    className: "bg-coop-blue/10 text-coop-blue border-coop-blue/25",
    icon: <Star className="h-3 w-3" />,
  },
  "vice-chairperson": {
    label: "Vice Chair",
    className: "bg-coop-blue/10 text-coop-blue border-coop-blue/25",
    icon: <Star className="h-3 w-3" />,
  },
  secretary: {
    label: "Secretary",
    className: "bg-coop-sky text-coop-blue-dark border-coop-blue/20",
    icon: <Handshake className="h-3 w-3" />,
  },
  treasurer: {
    label: "Treasurer",
    className: "bg-coop-green-light text-coop-green border-coop-green/25",
    icon: <BadgeCheck className="h-3 w-3" />,
  },
  organizer: {
    label: "Organizer",
    className: "bg-coop-coral-light text-coop-coral border-coop-coral/25",
    icon: <Users className="h-3 w-3" />,
  },
  member: {
    label: "Member",
    className: "bg-coop-sand text-sand-600 border-coop-sand-dark",
    icon: <Users className="h-3 w-3" />,
  },
  contributor: {
    label: "Contributor",
    className: "bg-coop-green-light text-coop-green border-coop-green/25",
    icon: <Leaf className="h-3 w-3" />,
  },
  verified: {
    label: "Verified",
    className: "bg-coop-blue text-white border-transparent",
    icon: <BadgeCheck className="h-3 w-3" />,
  },
  growing: {
    label: "Growing",
    className: "bg-coop-green-light text-coop-green border-coop-green/25",
    icon: <Sprout className="h-3 w-3" />,
  },
  featured: {
    label: "Featured",
    className: "bg-coop-gold text-white border-transparent",
    icon: <Award className="h-3 w-3" />,
  },
  new: {
    label: "New Member",
    className: "bg-coop-coral-light text-coop-coral border-coop-coral/25",
    icon: <Sprout className="h-3 w-3" />,
  },
};

interface CoopBadgeProps {
  kind: BadgeKind;
  className?: string;
  showIcon?: boolean;
  labelOverride?: string;
}

export function CoopBadge({ kind, className, showIcon = true, labelOverride }: CoopBadgeProps) {
  const c = config[kind] ?? config.member;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        c.className,
        className
      )}
    >
      {showIcon && c.icon}
      {labelOverride ?? c.label}
    </span>
  );
}
