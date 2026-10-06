import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNaira(amount: number, compact = false) {
  if (compact) {
    if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M`;
    if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(amount % 1_000 === 0 ? 0 : 1)}K`;
  }
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(date: string | Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [size, unit] of intervals) {
    const value = Math.floor(seconds / size);
    if (Math.abs(value) >= 1) return rtf.format(-value, unit);
  }
  return "just now";
}

export function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function daysUntil(date: string | Date) {
  const diff = new Date(date).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}
