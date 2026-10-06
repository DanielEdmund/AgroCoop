import Link from "next/link";
import { Sprout, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/MarketingHeader";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/cooperatives", label: "Find a cooperative" },
      { href: "/start-cooperative", label: "Start a cooperative" },
      { href: "/join-cooperative", label: "Join a cooperative" },
      { href: "/marketplace", label: "Collective marketplace" },
    ],
  },
  {
    title: "For Members",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/voting", label: "Democratic voting" },
      { href: "/resources", label: "Shared resources" },
      { href: "/learning", label: "Learning centre" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/about", label: "About AgroCoop" },
      { href: "/community", label: "Forum & discussions" },
      { href: "/about#principles", label: "Cooperative principles" },
      { href: "/about#impact", label: "Our impact" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="relative overflow-hidden bg-coop-earth text-sand-300">
      <div className="absolute inset-0 bg-dots-sand bg-[length:28px_28px] opacity-[0.15]" aria-hidden />
      <div className="coop-container relative py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-5">
            <Logo light />
            <p className="max-w-xs text-sm leading-relaxed text-sand-400">
              AgroCoop is a community-owned platform helping Nigerian farmers organise,
              pool resources, decide together and sell as one.
            </p>
            <div className="space-y-2 text-sm text-sand-400">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-coop-gold" /> Ibadan · Abuja · Kano · Lagos
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-coop-gold" /> hello@agrocoop.ng
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-coop-gold" /> +234 800 AGROCOOP
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-coop-gold">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-sand-400 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-sand-500 sm:flex-row">
          <p>© {new Date().getFullYear()} AgroCoop. Community-owned. Community-driven.</p>
          <p className="flex items-center gap-2">
            <Sprout className="h-4 w-4 text-coop-green" />
            Built with Nigerian farmers, for Nigerian farmers.
          </p>
        </div>
      </div>
    </footer>
  );
}
