"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Vote,
  Tractor,
  Store,
  GraduationCap,
  MessagesSquare,
  Users,
  PlusCircle,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/MarketingHeader";
import { CoopAvatar } from "@/components/cooperatives/CoopAvatar";
import { currentUser } from "@/lib/data/members";
import { useAuthStore } from "@/lib/auth";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const dashboardNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/voting", label: "Voting", icon: Vote },
  { href: "/resources", label: "Resources", icon: Tractor },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/learning", label: "Learning", icon: GraduationCap },
  { href: "/community", label: "Community", icon: MessagesSquare },
];

/** Desktop sidebar navigation for the member dashboard. */
export function DashboardSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const displayName = user?.name ?? currentUser.name;

  return (
    <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-coop-sand-dark/70 bg-white lg:flex">
      <div className="px-6 py-6">
        <Logo href="/dashboard" />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {dashboardNav.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200",
                active
                  ? "bg-coop-blue/8 text-coop-blue"
                  : "text-sand-600 hover:bg-coop-sand hover:text-coop-earth"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-y-1 -left-3 w-1 rounded-full bg-coop-blue"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
              {item.href === "/voting" && (
                <span className="ml-auto rounded-full bg-coop-coral px-1.5 py-0.5 text-[10px] font-bold text-white">
                  8
                </span>
              )}
            </Link>
          );
        })}

        <div className="mt-6 space-y-1">
          <p className="px-3.5 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-sand-400">
            Quick create
          </p>
          <Link
            href="/start-cooperative"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-sand-600 transition-colors hover:bg-coop-sand hover:text-coop-earth"
          >
            <PlusCircle className="h-[18px] w-[18px]" /> Start a cooperative
          </Link>
          <Link
            href="/join-cooperative"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-sand-600 transition-colors hover:bg-coop-sand hover:text-coop-earth"
          >
            <Users className="h-[18px] w-[18px]" /> Join a cooperative
          </Link>
        </div>
      </nav>

      <div className="m-3 rounded-xl bg-coop-sky p-4">
        <Link
          href={`/cooperatives/${currentUser.cooperativeId}`}
          className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80"
        >
          <CoopAvatar
            name={displayName}
            image={currentUser.image}
            status="verified"
            role="founder"
            showRole
            size="md"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-coop-earth">{displayName}</p>
            <p className="truncate text-xs text-sand-500">{currentUser.cooperativeName}</p>
          </div>
          <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-coop-blue" />
        </Link>
      </div>
    </aside>
  );
}
