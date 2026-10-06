"use client";

import { create } from "zustand";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastTone = "success" | "info" | "error";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastState {
  items: ToastItem[];
  push: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: number) => void;
}

let toastSeq = 0;

const useToastStore = create<ToastState>()((set) => ({
  items: [],
  push: (item) => {
    const id = ++toastSeq;
    set((state) => ({ items: [...state.items, { ...item, id }] }));
    setTimeout(() => useToastStore.getState().dismiss(id), 4500);
  },
  dismiss: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
}));

/** Fire a toast from anywhere — no hook needed. */
export const toast = {
  success: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, tone: "success" }),
  info: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, tone: "info" }),
  error: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, tone: "error" }),
};

const toneStyles: Record<ToastTone, { wrapper: string; icon: string; Icon: typeof Info }> = {
  success: {
    wrapper: "border-coop-green/30",
    icon: "bg-coop-green text-white",
    Icon: CheckCircle2,
  },
  info: {
    wrapper: "border-coop-blue/30",
    icon: "bg-coop-blue text-white",
    Icon: Info,
  },
  error: {
    wrapper: "border-coop-coral/40",
    icon: "bg-coop-coral text-white",
    Icon: AlertTriangle,
  },
};

/** Mounted once in the root provider. */
export function Toaster() {
  const items = useToastStore((s) => s.items);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] flex flex-col items-center gap-2.5 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end sm:px-0">
      <AnimatePresence initial={false}>
        {items.map((item) => {
          const { Icon } = toneStyles[item.tone];
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => dismiss(item.id)}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 shadow-lift",
                toneStyles[item.tone].wrapper
              )}
              role="status"
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  toneStyles[item.tone].icon
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-coop-earth">{item.title}</p>
                {item.description && (
                  <p className="mt-0.5 text-xs leading-relaxed text-sand-500">{item.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
