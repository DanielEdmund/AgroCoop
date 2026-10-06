import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MapPin,
  Users,
  Star,
  Calendar,
  Tractor,
  TrendingUp,
  BadgeCheck,
  ArrowLeft,
  Landmark,
  Vote as VoteIcon,
} from "lucide-react";
import { cooperatives, getCooperative } from "@/lib/data/cooperatives";
import { membersOfCoop } from "@/lib/data/members";
import { resources } from "@/lib/data/resources";
import { votesOfCoop } from "@/lib/data/votes";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { CoopAvatar } from "@/components/cooperatives/CoopAvatar";
import { CoopBadge } from "@/components/cooperatives/CoopBadge";
import { ProgressBar } from "@/components/cooperatives/ProgressBar";
import { VoteMeter } from "@/components/cooperatives/VoteMeter";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import { formatNaira } from "@/lib/utils";
import { images } from "@/lib/images";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return cooperatives.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const coop = getCooperative(params.id);
  return {
    title: coop ? coop.name : "Cooperative",
    description: coop?.tagline,
  };
}

export default function CooperativeDetailPage({ params }: PageProps) {
  const coop = getCooperative(params.id);
  if (!coop) notFound();

  const memberList = membersOfCoop(coop.id).slice(0, 8);
  const coopResources = resources.filter((r) => r.cooperativeId === coop.id);
  const activeVotes = votesOfCoop(coop.id);
  const leadVote = activeVotes[0];

  const stats = [
    { icon: Users, label: "Members", value: coop.members.toString() },
    { icon: Star, label: "Member rating", value: coop.rating.toFixed(1) },
    { icon: Landmark, label: "Trade volume", value: formatNaira(coop.tradeVolume, true) },
    { icon: Tractor, label: "Resources shared", value: coop.resourcesShared.toString() },
  ];

  return (
    <>
      {/* Cover */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={coop.coverImage ?? coop.image} alt={coop.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-coop-earth via-coop-earth/75 to-coop-earth/35" />
        </div>

        <div className="coop-container pb-14 pt-8 sm:pb-16">
          <Link
            href="/cooperatives"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All cooperatives
          </Link>

          <ScrollReveal className="mt-8 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {coop.verified && <CoopBadge kind="verified" />}
              {coop.featured && <CoopBadge kind="featured" labelOverride="Featured Coop" />}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-coop-earth">
                <MapPin className="h-3 w-3 text-coop-coral" /> {coop.location}, {coop.state}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {coop.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">{coop.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CoopButton href={`/join-cooperative?coop=${coop.id}`} variant="cta" size="lg">
                Join this Cooperative
              </CoopButton>
              <CoopButton
                href="/marketplace"
                size="lg"
                className="border border-white/30 bg-white/10 text-white shadow-none hover:bg-white/20"
              >
                View Marketplace Listings
              </CoopButton>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats bar */}
        <div className="coop-container relative -mb-10">
          <StaggerContainer className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" staggerDelay={0.08}>
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.label}>
                  <div className="rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-card">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coop-blue/10 text-coop-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 font-display text-2xl font-semibold text-coop-earth">
                      {s.value}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
                      {s.label}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Body */}
      <section className="coop-section bg-coop-sand pt-24">
        <div className="coop-container grid gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-6 lg:col-span-2">
            <ScrollReveal className="rounded-xl border border-coop-sand-dark/70 bg-white p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-xl font-semibold text-coop-earth">About this cooperative</h2>
              <p className="mt-4 leading-relaxed text-sand-600">{coop.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {coop.crops.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-coop-green-light px-3 py-1 text-xs font-bold text-coop-green"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3">
                {coop.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-coop-earth">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coop-gold/15 text-coop-gold">
                      <TrendingUp className="h-3 w-3" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-coop-sand-dark/70 pt-6 text-center text-sm">
                <div>
                  <p className="flex items-center justify-center gap-1.5 font-semibold text-coop-earth">
                    <Calendar className="h-4 w-4 text-coop-blue" /> {coop.founded}
                  </p>
                  <p className="text-xs text-sand-500">Founded</p>
                </div>
                <div>
                  <p className="font-semibold text-coop-earth">{coop.region} Nigeria</p>
                  <p className="text-xs text-sand-500">Region</p>
                </div>
                <div>
                  <p className="font-semibold text-coop-earth capitalize">{coop.size} coop</p>
                  <p className="text-xs text-sand-500">Size</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Projects */}
            <ScrollReveal className="rounded-xl border border-coop-sand-dark/70 bg-white p-6 shadow-soft sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-coop-earth">
                  Community projects
                </h2>
                <CoopBadge kind={coop.verified ? "verified" : "member"} labelOverride={`${coop.projects.length} projects`} />
              </div>

              <div className="mt-6 space-y-6">
                {coop.projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-xl border border-coop-sand-dark/70 bg-coop-sand/60 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-base font-semibold text-coop-earth">
                          {project.title}
                        </p>
                        <p className="mt-1 text-sm text-sand-500">{project.description}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                          project.status === "completed"
                            ? "bg-coop-green-light text-coop-green"
                            : project.status === "active"
                              ? "bg-coop-blue/10 text-coop-blue"
                              : "bg-coop-gold-light text-coop-gold"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <ProgressBar
                      className="mt-4"
                      value={project.progress}
                      label="Funding progress"
                      tone={project.status === "completed" ? "growth" : "fundraising"}
                      detail={`${formatNaira(project.raised, true)} raised of ${formatNaira(
                        project.target,
                        true
                      )} target`}
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Members */}
            <ScrollReveal className="rounded-xl border border-coop-sand-dark/70 bg-white p-6 shadow-soft sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-coop-earth">
                  Members & leadership
                </h2>
                <span className="text-sm text-sand-500">
                  Showing {memberList.length} of {coop.members}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {memberList.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 rounded-xl border border-coop-sand-dark/70 bg-coop-sand/50 p-3.5"
                  >
                    <CoopAvatar
                      name={m.name}
                      image={m.image}
                      status={m.status}
                      role={m.role}
                      showRole
                      size="md"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-coop-earth">{m.name}</p>
                      <p className="truncate text-xs text-sand-500">
                        {m.location} · {m.crop}
                      </p>
                    </div>
                    <div className="ml-auto flex shrink-0 gap-1.5">
                      <CoopBadge
                        kind={m.role}
                        showIcon={false}
                        labelOverride={
                          m.role === "member" || m.role === "contributor"
                            ? undefined
                            : m.role.replace("-", " ")
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Live vote */}
            {leadVote && (
              <ScrollReveal className="rounded-xl border border-coop-sand-dark/70 bg-white p-6 shadow-soft sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coop-coral/10 text-coop-coral">
                    <VoteIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-coop-earth">
                      Open vote in this cooperative
                    </h2>
                    <p className="text-sm text-sand-500">{leadVote.title}</p>
                  </div>
                </div>

                <VoteMeter
                  className="mt-6"
                  yes={leadVote.yes}
                  no={leadVote.no}
                  abstain={leadVote.abstain}
                  eligibleVoters={leadVote.eligibleVoters}
                />

                <CoopButton href="/voting" variant="primary" className="mt-6">
                  Read the full motion & vote
                </CoopButton>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal className="overflow-hidden rounded-xl border border-coop-sand-dark/70 bg-white shadow-soft">
              <div className="relative h-40">
                <img src={images.aboutGrain} alt="Harvest" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-coop-earth/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                  <BadgeCheck className="h-8 w-8 text-coop-gold" />
                  <p className="mt-2 font-display text-lg font-semibold text-white">
                    We are stronger together
                  </p>
                  <p className="mt-1 text-xs text-white/80">
                    Join {coop.members} farmers in {coop.location}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <CoopButton href={`/join-cooperative?coop=${coop.id}`} variant="cta" size="lg" className="w-full">
                  Request to Join
                </CoopButton>
                <p className="mt-3 text-center text-xs text-sand-500">
                  Applications are reviewed by the coop's membership committee within 5 days.
                </p>
              </div>
            </ScrollReveal>

            {/* Resources */}
            <ScrollReveal className="rounded-xl border border-coop-sand-dark/70 bg-white p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold text-coop-earth">
                Shared resources
              </h2>
              {coopResources.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {coopResources.slice(0, 5).map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center gap-3 rounded-xl bg-coop-sand/70 p-3"
                    >
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                          r.availability === "available"
                            ? "bg-coop-green"
                            : r.availability === "in-use"
                              ? "bg-coop-gold"
                              : "bg-sand-400"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-coop-earth">{r.name}</p>
                        <p className="text-xs text-sand-500">
                          {formatNaira(r.rate)} / {r.rateUnit}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-sand-500">
                  Resources for this coop will be listed here.
                </p>
              )}
              <CoopButton href="/resources" variant="outline" size="sm" className="mt-4 w-full">
                Browse all resources
              </CoopButton>
            </ScrollReveal>

            {/* Quick facts */}
            <ScrollReveal className="rounded-xl border border-coop-sand-dark/70 bg-coop-sky p-6">
              <h2 className="font-display text-lg font-semibold text-coop-earth">Quick facts</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Location", `${coop.location}, ${coop.state}`],
                  ["Region", `${coop.region} Nigeria`],
                  ["Founded", `${coop.founded}`],
                  ["Members", `${coop.members}`],
                  ["Size", `${coop.size}`],
                  ["Trade volume", formatNaira(coop.tradeVolume, true)],
                  ["Resources shared", `${coop.resourcesShared}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <dt className="text-sand-600">{k}</dt>
                    <dd className="font-semibold capitalize text-coop-earth">{v}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
