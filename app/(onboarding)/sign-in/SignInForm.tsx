"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, Mail, Sprout } from "lucide-react";
import { Logo } from "@/components/layout/MarketingHeader";
import { Input, Label } from "@/components/ui/input";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { toast } from "@/components/ui/toast";
import { DEMO_EMAIL, DEMO_PASSWORD, nameFromEmail, useAuthStore } from "@/lib/auth";
import { images } from "@/lib/images";

const perks = [
  "Cast your vote on cooperative motions",
  "List produce and sell collectively",
  "Book shared tractors, storage and irrigation",
  "Learn with 12,500 farmers across 36 states",
];

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signIn = useAuthStore((s) => s.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      toast.error("Invalid email", "Try something like adebayo.ogundele@agrocoop.ng");
      return;
    }
    if (password.trim().length < 4) {
      setError("Password must be at least 4 characters.");
      toast.error("Password too short", "This is a mock sign-in — any 4+ characters work.");
      return;
    }

    setError(null);
    signIn(email.trim());

    const next = searchParams.get("next");
    const destination = next && next.startsWith("/") ? next : "/dashboard";

    toast.success(
      `Welcome back, ${nameFromEmail(email.trim()).split(" ")[0]}`,
      "Signed in to the Oyo State Maize Collective demo."
    );
    router.replace(destination);
    router.refresh();
  };

  const useDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError(null);
    toast.info("Demo credentials filled", "Press Sign in to open the dashboard.");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative isolate hidden overflow-hidden lg:block">
        <img src={images.heroFarmer} alt="Farmer tending crops" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-coop-earth/95 via-coop-earth/85 to-coop-blue/70" />
        <div className="absolute inset-0 bg-dots-sand bg-[length:26px_26px] opacity-20" aria-hidden />

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="inline-flex items-center gap-2.5 text-sm font-semibold text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
              <Sprout className="h-3.5 w-3.5" /> Member access
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight">
              Stronger Farmers.
              <br />
              <span className="text-coop-gold">Stronger Communities.</span>
            </h1>
            <ul className="mt-8 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-white/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-coop-gold" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-white/50">
            Demo build · mock data only · no real accounts
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center bg-coop-sand px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>

          <h2 className="font-display text-2xl font-semibold text-coop-earth sm:text-3xl">
            Sign in to your dashboard
          </h2>
          <p className="mt-2 text-sm text-sand-500">
            This is a mock sign-in — any email and password (4+ characters) will open the demo
            dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@coop.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="At least 4 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
              {error && <p className="mt-1.5 text-xs font-semibold text-coop-coral">{error}</p>}
            </div>

            <CoopButton type="submit" variant="cta" size="lg" className="w-full" iconRight={ArrowRight}>
              Sign in
            </CoopButton>

            <CoopButton
              type="button"
              variant="outline"
              size="md"
              className="w-full"
              onClick={useDemo}
            >
              Use demo credentials
            </CoopButton>
          </form>

          <div className="mt-6 rounded-xl border border-coop-sand-dark bg-white p-4 text-xs text-sand-500">
            <p className="font-bold text-coop-earth">Mock data only</p>
            <p className="mt-1">
              Email: <span className="font-semibold text-coop-earth">{DEMO_EMAIL}</span>
              <br />
              Password: <span className="font-semibold text-coop-earth">{DEMO_PASSWORD}</span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link
              href="/"
              className="font-semibold text-sand-600 transition-colors hover:text-coop-blue"
            >
              ← Back to home
            </Link>
            <div className="flex gap-4">
              <Link
                href="/join-cooperative"
                className="font-semibold text-coop-blue transition-colors hover:underline"
              >
                Join a coop
              </Link>
              <Link
                href="/start-cooperative"
                className="font-semibold text-coop-blue transition-colors hover:underline"
              >
                Start a coop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
