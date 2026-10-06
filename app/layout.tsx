import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AgroCoop — Stronger Farmers. Stronger Communities.",
    template: "%s | AgroCoop",
  },
  description:
    "AgroCoop is a community-owned platform where Nigerian farmers form cooperatives, pool resources, vote together, and sell collectively. Community-owned. Community-driven.",
  keywords: [
    "Nigerian farmers",
    "agricultural cooperative",
    "cooperative platform",
    "collective farming",
    "AgroCoop",
  ],
  openGraph: {
    title: "AgroCoop — Stronger Farmers. Stronger Communities.",
    description:
      "Form cooperatives, pool resources, decide democratically and sell collectively — built for Nigerian farmers.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2E7D32",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-coop-sand font-body text-coop-earth">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
