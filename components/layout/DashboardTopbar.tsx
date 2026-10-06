"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  LogOut,
  GraduationCap,
  MessagesSquare,
  Store,
  Tractor,
  Vote,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/layout/MarketingHeader";
import { CoopAvatar } from "@/components/cooperatives/CoopAvatar";
import { currentUser } from "@/lib/data/members";
import { notifications } from "@/lib/data/notifications";
import { courses } from "@/lib/data/learning";
import { listings } from "@/lib/data/marketplace";
import { resources } from "@/lib/data/resources";
import { forumPosts } from "@/lib/data/community";
import { cooperatives, getCooperative } from "@/lib/data/cooperatives";
import { votes } from "@/lib/data/votes";
import { useCoopStore } from "@/lib/store";
import { useAuthStore } from "@/lib/auth";
import { toast } from "@/components/ui/toast";
import { cn, timeAgo } from "@/lib/utils";

interface SearchResult {
  id: string;
  label: string;
  sub: string;
  href: string;
  icon: LucideIcon;
}

export function DashboardTopbar() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const allNotificationsRead = useCoopStore((s) => s.allNotificationsRead);
  const markAllNotificationsRead = useCoopStore((s) => s.markAllNotificationsRead);

  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = user?.name ?? currentUser.name;
  const unreadCount = allNotificationsRead
    ? 0
    : notifications.filter((n) => !n.read).length;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const all: SearchResult[] = [
      ...cooperatives.map((c) => ({
        id: `coop-${c.id}`,
        label: c.name,
        sub: `Cooperative · ${c.location}`,
        href: `/cooperatives/${c.id}`,
        icon: Users,
      })),
      ...listings.map((l) => ({
        id: `listing-${l.id}`,
        label: l.title,
        sub: `Marketplace · ${formatPrice(l.pricePerUnit)}/${l.unit.replace(/s$/, "")}`,
        href: "/marketplace",
        icon: Store,
      })),
      ...resources.map((r) => ({
        id: `res-${r.id}`,
        label: r.name,
        sub: `Resource · ${r.location}`,
        href: "/resources",
        icon: Tractor,
      })),
      ...courses.map((c) => ({
        id: `course-${c.id}`,
        label: c.title,
        sub: `Course · ${c.instructor}`,
        href: "/learning",
        icon: GraduationCap,
      })),
      ...forumPosts.map((p) => ({
        id: `post-${p.id}`,
        label: p.title,
        sub: `Discussion · ${p.category}`,
        href: "/community",
        icon: MessagesSquare,
      })),
      ...votes.map((v) => ({
        id: `vote-${v.id}`,
        label: v.title,
        sub: `Vote · ${v.status === "closed" ? "closed" : "open"}`,
        href: "/voting",
        icon: Vote,
      })),
    ];
    return all.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 7);
  }, [query]);

  const closePopovers = () => {
    setSearchFocused(false);
    setBellOpen(false);
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
    toast.info("Signed out", "Your mock session has ended.");
    router.replace("/sign-in");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-coop-sand-dark/70 bg-coop-sand/90 backdrop-blur-md">
      {searchFocused && query.trim() !== "" && (
        <button
          className="fixed inset-0 z-[-1] cursor-default"
          aria-label="Close search results"
          onClick={closePopovers}
        />
      )}

      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <Logo href="/dashboard" />
        </div>

        <div className="relative hidden max-w-md flex-1 lg:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) {
                router.push(results[0].href);
                setQuery("");
                setSearchFocused(false);
              }
              if (e.key === "Escape") {
                setQuery("");
                setSearchFocused(false);
              }
            }}
            placeholder="Search cooperatives, resources, discussions…"
            className="h-10 w-full rounded-xl border border-coop-sand-dark bg-white pl-10 pr-4 text-sm text-coop-earth shadow-soft placeholder:text-sand-400 focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30"
          />

          {searchFocused && query.trim() !== "" && (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-coop-sand-dark bg-white shadow-lift">
              {results.length === 0 ? (
                <p className="px-4 py-3.5 text-sm text-sand-500">
                  No matches for “{query}”. Try “maize”, “tractor” or “vote”.
                </p>
              ) : (
                <ul>
                  {results.map((r) => {
                    const Icon = r.icon;
                    return (
                      <li key={r.id}>
                        <Link
                          href={r.href}
                          onClick={() => {
                            setQuery("");
                            setSearchFocused(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-coop-sand/70"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-coop-blue/10 text-coop-blue">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-bold text-coop-earth">
                              {r.label}
                            </span>
                            <span className="block truncate text-[11px] text-sand-500">{r.sub}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/voting"
            className="hidden rounded-full bg-coop-green-light px-3 py-1 text-xs font-bold text-coop-green transition-colors hover:bg-coop-green hover:text-white sm:block"
          >
            {votes.filter((v) => v.status === "active").length} votes open
          </Link>

          <div className="relative">
            <button
              onClick={() => {
                setBellOpen((v) => !v);
                setMenuOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-coop-sand-dark bg-white text-sand-600 transition-colors hover:text-coop-earth"
              aria-label={`Notifications, ${unreadCount} unread`}
            >
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coop-coral px-1 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {bellOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-coop-sand-dark bg-white shadow-lift">
                <div className="flex items-center justify-between border-b border-coop-sand-dark/70 px-4 py-3">
                  <p className="text-sm font-bold text-coop-earth">Notifications</p>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => {
                        markAllNotificationsRead();
                        toast.success("All caught up", "Notifications marked as read.");
                      }}
                      className="text-xs font-bold text-coop-blue hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => {
                    const unread = !allNotificationsRead && !n.read;
                    return (
                      <li
                        key={n.id}
                        className={cn(
                          "flex gap-3 border-b border-coop-sand-dark/50 px-4 py-3 last:border-0",
                          unread && "bg-coop-coral/5"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                            unread ? "bg-coop-coral" : "bg-coop-sand-dark"
                          )}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-coop-earth">{n.title}</p>
                          <p className="text-xs text-sand-500">{n.detail}</p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-sand-400">
                            {timeAgo(n.createdAt)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen((v) => !v);
                setBellOpen(false);
              }}
              className="flex items-center gap-2.5"
            >
              <CoopAvatar name={displayName} image={currentUser.image} status="verified" size="sm" />
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold text-coop-earth">{displayName}</p>
                <p className="text-[10px] text-sand-500">
                  {user?.role ?? currentUser.role} · {getCooperative(currentUser.cooperativeId)?.state ?? "Nigeria"}
                </p>
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-xl border border-coop-sand-dark bg-white shadow-lift">
                <div className="border-b border-coop-sand-dark/70 px-4 py-3">
                  <p className="truncate text-sm font-bold text-coop-earth">{displayName}</p>
                  <p className="truncate text-xs text-sand-500">{user?.email}</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-coop-earth transition-colors hover:bg-coop-sand/70"
                >
                  My profile
                </Link>
                <Link
                  href={`/cooperatives/${currentUser.cooperativeId}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-coop-earth transition-colors hover:bg-coop-sand/70"
                >
                  My cooperative
                </Link>
                <Link
                  href="/join-cooperative"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-coop-earth transition-colors hover:bg-coop-sand/70"
                >
                  Join another coop
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 border-t border-coop-sand-dark/70 px-4 py-3 text-left text-sm font-semibold text-coop-coral transition-colors hover:bg-coop-coral/5"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {(bellOpen || menuOpen) && (
        <button
          className="fixed inset-0 z-[-1] cursor-default"
          aria-label="Close menu"
          onClick={closePopovers}
        />
      )}
    </header>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}
