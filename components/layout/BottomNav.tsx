"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Tractor,
  MessagesSquare,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const bottomNavItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/cooperatives", label: "Coops", icon: Users },
  { href: "/resources", label: "Resources", icon: Tractor },
  { href: "/community", label: "Community", icon: MessagesSquare },
  { href: "/profile", label: "Profile", icon: User },
];

/** Mobile bottom navigation — Home, Coops, Resources, Community, Profile. */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-coop-sand-dark bg-white/95 backdrop-blur-md lg:hidden">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {bottomNavItems.map((item, i) => {
          const Icon = item.icon;
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard" && i === 0
              : pathname.startsWith(item.href);
          return (
            <li key={`${item.href}-${i}`} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors",
                  active ? "text-coop-blue" : "text-sand-500"
                )}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" />
                  {active && (
                    <motion.span
                      layoutId="bottomnav-dot"
                      className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-coop-blue"
                    />
                  )}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
