"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  /** Mock sign-in — any email/password combination is accepted. */
  signIn: (email: string) => void;
  signOut: () => void;
}

/** "adebayo.ogundele@agrocoop.ng" -> "Adebayo Ogundele" */
export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const words = local.split(/[._\-+0-9]+/).filter(Boolean);
  if (words.length === 0) return "Member";
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .trim();
}

export const DEMO_EMAIL = "adebayo.ogundele@agrocoop.ng";
export const DEMO_PASSWORD = "harvest2026";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (email) =>
        set({
          user: {
            name: nameFromEmail(email),
            email,
            role: "Founder",
          },
        }),
      signOut: () => set({ user: null }),
    }),
    { name: "agrocoop-auth" }
  )
);

/** True once the persisted auth state has been read from storage. */
export function isAuthHydrated() {
  return useAuthStore.persist.hasHydrated();
}

export function onAuthHydration(fn: () => void) {
  return useAuthStore.persist.onFinishHydration(fn);
}
