"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { useAuthStore } from "@/lib/auth";

export function Logo({ href = "/", light = false }: { href?: string; light?: boolean }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coop-blue text-white shadow-coop-blue transition-transform duration-300 group-hover:-rotate-6">
        <Sprout className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-semibold tracking-tight",
            light ? "text-white" : "text-coop-earth"
          )}
        >
          Agro<span className="text-coop-gold">Coop</span>
        </span>
        <span
          className={cn(
            "text-[9px] font-semibold uppercase tracking-[0.18em]",
            light ? "text-white/70" : "text-sand-500"
          )}
        >
          Stronger together
        </span>
      </span>
    </Link>
  );
}

export function MarketingHeader() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read the persisted session only after hydration so SSR markup matches.
  const signedIn = mounted && !!user;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-coop-sand-dark/70 bg-coop-sand/90 backdrop-blur-md shadow-soft"
          : "border-b border-transparent bg-coop-sand/60 backdrop-blur-sm"
      )}
    >
      <div className="coop-container flex h-16 items-center justify-between sm:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.marketing.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                  active ? "text-coop-blue" : "text-sand-600 hover:text-coop-earth"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-coop-blue"
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/learning"
            className="rounded-lg px-3.5 py-2 text-sm font-semibold text-sand-600 transition-colors hover:text-coop-earth"
          >
            Learning
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/join-cooperative"
            className="text-sm font-semibold text-coop-earth transition-colors hover:text-coop-blue"
          >
            Join a Coop
          </Link>
          {signedIn ? (
            <CoopButton href="/dashboard" size="sm" iconRight={ArrowRight}>
              Open Dashboard
            </CoopButton>
          ) : (
            <CoopButton href="/sign-in" variant="cta" size="sm" iconRight={ArrowRight}>
              Sign in
            </CoopButton>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-coop-sand-dark bg-white text-coop-earth lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-coop-sand-dark bg-coop-sand lg:hidden"
          >
            <div className="coop-container flex flex-col gap-1 py-4">
              {[...NAV_LINKS.marketing, { href: "/learning", label: "Learning" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-sm font-semibold text-coop-earth transition-colors hover:bg-white"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="mt-2 flex gap-3">
                <CoopButton href="/join-cooperative" variant="outline" size="md" className="flex-1">
                  Join a Coop
                </CoopButton>
                {signedIn ? (
                  <CoopButton href="/dashboard" size="md" className="flex-1">
                    Dashboard
                  </CoopButton>
                ) : (
                  <CoopButton href="/sign-in" variant="cta" size="md" className="flex-1">
                    Sign in
                  </CoopButton>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
