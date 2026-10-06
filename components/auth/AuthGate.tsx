"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sprout } from "lucide-react";
import { isAuthHydrated, onAuthHydration, useAuthStore } from "@/lib/auth";

/**
 * Guards every dashboard route behind the mock sign-in flow.
 * Unauthenticated visitors are sent to /sign-in, then back to where they were.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthHydrated()) {
      setReady(true);
      return;
    }
    const unsubscribe = onAuthHydration(() => setReady(true));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!ready || user) return;
    const next = pathname && pathname !== "/dashboard" ? `?next=${encodeURIComponent(pathname)}` : "";
    router.replace(`/sign-in${next}`);
  }, [ready, user, pathname, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-coop-blue text-white shadow-coop-blue">
          <Sprout className="h-7 w-7 animate-slow-pulse" />
        </span>
        <p className="text-sm font-semibold text-sand-500">Checking your membership…</p>
      </div>
    );
  }

  return <>{children}</>;
}
