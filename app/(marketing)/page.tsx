import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HowCoopsWork } from "@/components/home/HowCoopsWork";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ImpactStats } from "@/components/home/ImpactStats";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Principles } from "@/components/home/Principles";
import { JoinCTA } from "@/components/home/JoinCTA";

export const metadata: Metadata = {
  title: "AgroCoop — Stronger Farmers. Stronger Communities.",
  description:
    "Form cooperatives, pool resources, decide democratically and sell collectively. Built for Nigerian farmers. Community-owned. Community-driven.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowCoopsWork />
      <FeaturesGrid />
      <ImpactStats />
      <SuccessStories />
      <Principles />
      <JoinCTA />
    </>
  );
}
