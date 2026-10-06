"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Vote,
  Tractor,
  Store,
  MessagesSquare,
  ArrowRight,
  Sprout,
  Calendar,
  Bell,
  GraduationCap,
  TrendingUp,
  Handshake,
} from "lucide-react";
import { currentUser, membersOfCoop } from "@/lib/data/members";
import { useAuthStore } from "@/lib/auth";
import { votes } from "@/lib/data/votes";
import { resources } from "@/lib/data/resources";
import { listings } from "@/lib/data/marketplace";
import { courses } from "@/lib/data/learning";
import { activity, forumPosts } from "@/lib/data/community";
import { notifications } from "@/lib/data/notifications";
import { getCooperative } from "@/lib/data/cooperatives";
import { PageHeader, Panel } from "@/components/layout/PageHeader";
import { CoopCard } from "@/components/cooperatives/CoopCard";
import { CoopAvatar } from "@/components/cooperatives/CoopAvatar";
import { CoopBadge } from "@/components/cooperatives/CoopBadge";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { ProgressBar } from "@/components/cooperatives/ProgressBar";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { Counter } from "@/components/animations/Counter";
import { formatNaira, timeAgo } from "@/lib/utils";

const quickActions = [
  { href: "/voting", label: "Vote", detail: `${votes.length} open`, icon: Vote, tone: "bg-coop-blue/10 text-coop-blue group-hover:bg-coop-blue" },
  { href: "/resources", label: "Request Resource", detail: `${resources.length} shared`, icon: Tractor, tone: "bg-coop-green/10 text-coop-green group-hover:bg-coop-green" },
  { href: "/marketplace", label: "Marketplace", detail: `${listings.length} listings`, icon: Store, tone: "bg-coop-gold/10 text-coop-gold group-hover:bg-coop-gold" },
  { href: "/community", label: "Discussion", detail: `${forumPosts.length} threads`, icon: MessagesSquare, tone: "bg-coop-coral/10 text-coop-coral group-hover:bg-coop-coral" },
];

const activityIcons = {
  vote: Vote,
  resource: Tractor,
  market: Store,
  member: Handshake,
  learning: GraduationCap,
  community: MessagesSquare,
};

export default function DashboardPage() {
  const memberName = useAuthStore((s) => s.user?.name) ?? currentUser.name;
  const coop = getCooperative(currentUser.cooperativeId)!;
  const coopMembers = membersOfCoop(coop.id);
  const myVote = votes.find((v) => v.cooperativeId === coop.id);
  const enrolled = courses.filter((c) => c.progress > 0 && c.progress < 100);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <PageHeader
        eyebrow={`${greeting} · ${new Date().toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long" })}`}
        title={`Welcome back, ${memberName.split(" ")[0]}`}
        description={`You are a founding member of ${coop.name}. Here is what your community is doing right now.`}
        actions={
          <>
            <CoopButton href="/start-cooperative" variant="outline">
              Start a Coop
            </CoopButton>
            <CoopButton href="/join-cooperative" variant="cta">
              Join another Coop
            </CoopButton>
          </>
        }
      />

      {/* Quick actions */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <StaggerItem key={a.label}>
              <Link href={a.href} className="group block h-full">
                <div className="flex h-full flex-col rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white ${a.tone}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-sand-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-coop-blue" />
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold text-coop-earth">{a.label}</p>
                  <p className="text-xs text-sand-500">{a.detail}</p>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* My cooperative */}
        <div className="space-y-6 lg:col-span-2">
          <Panel
            title="My Cooperative"
            action={
              <Link
                href={`/cooperatives/${coop.id}`}
                className="text-sm font-semibold text-coop-blue hover:underline"
              >
                View profile →
              </Link>
            }
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-48">
                <img src={coop.image} alt={coop.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/70 to-transparent" />
                <span className="absolute bottom-2 left-2">
                  <CoopBadge kind="verified" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-semibold text-coop-earth">{coop.name}</h3>
                <p className="mt-1 text-sm text-sand-500">{coop.tagline}</p>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Members", value: <Counter value={coop.members} /> },
                    { label: "Trade volume", value: formatNaira(coop.tradeVolume, true) },
                    { label: "Resources", value: <Counter value={coop.resourcesShared} /> },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-coop-sand p-3">
                      <p className="font-display text-lg font-semibold text-coop-earth">{s.value}</p>
                      <p className="text-[10px] uppercase tracking-wide text-sand-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                <ProgressBar
                  className="mt-4"
                  label="Season harvest target"
                  value={72}
                  detail="1,296 of 1,800 tonnes of collective maize pledged"
                />

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {coopMembers.slice(0, 5).map((m) => (
                      <span key={m.id} className="rounded-full ring-2 ring-white">
                        <CoopAvatar name={m.name} image={m.image} size="xs" showRing={false} />
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-sand-500">
                    +{Math.max(0, coop.members - 5)} more members
                  </span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Activity feed */}
          <Panel
            title="Community activity"
            action={
              <Link href="/community" className="text-sm font-semibold text-coop-blue hover:underline">
                See all →
              </Link>
            }
          >
            <ul className="space-y-1">
              {activity.slice(0, 7).map((event, i) => {
                const Icon = activityIcons[event.type];
                return (
                  <motion.li
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-coop-sand/70"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coop-sand text-coop-blue">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-coop-earth">{event.title}</p>
                      <p className="truncate text-xs text-sand-500">{event.detail}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[11px] font-semibold text-sand-400">{timeAgo(event.createdAt)}</p>
                      <p className="text-[11px] text-sand-400">{event.actor}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </Panel>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          {/* Next vote */}
          {myVote && (
            <Panel
              title="Next vote closes soon"
              action={
                <span className="rounded-full bg-coop-coral/10 px-2 py-0.5 text-[11px] font-bold text-coop-coral">
                  {new Date(myVote.deadline).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                </span>
              }
            >
              <p className="font-semibold text-coop-earth">{myVote.title}</p>
              <p className="mt-1.5 line-clamp-2 text-xs text-sand-500">{myVote.description}</p>
              <div className="mt-4 flex gap-3">
                <CoopButton href="/voting" variant="primary" size="sm" className="flex-1">
                  Read & Vote
                </CoopButton>
                <CoopButton href="/voting" variant="outline" size="sm">
                  All votes
                </CoopButton>
              </div>
            </Panel>
          )}

          {/* Notifications */}
          <Panel
            title="Notifications"
            action={<Bell className="h-4 w-4 text-coop-coral" />}
          >
            <ul className="space-y-3">
              {notifications.slice(0, 4).map((n) => (
                <li key={n.id} className="flex gap-3">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      n.read ? "bg-coop-sand-dark" : "bg-coop-coral"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-coop-earth">{n.title}</p>
                    <p className="text-xs text-sand-500">{n.detail}</p>
                    <p className="text-[10px] uppercase tracking-wide text-sand-400">
                      {timeAgo(n.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          {/* Learning progress */}
          <Panel
            title="Continue learning"
            action={
              <Link href="/learning" className="text-sm font-semibold text-coop-blue hover:underline">
                All courses →
              </Link>
            }
          >
            <ul className="space-y-4">
              {enrolled.slice(0, 2).map((c) => (
                <li key={c.id}>
                  <div className="flex items-center gap-3">
                    <img src={c.image} alt="" className="h-11 w-11 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-coop-earth">{c.title}</p>
                      <p className="text-[11px] text-sand-500">
                        {c.lessons} lessons · {c.duration}
                      </p>
                    </div>
                  </div>
                  <ProgressBar className="mt-2" value={c.progress} tone="blue" label="" detail="" />
                </li>
              ))}
            </ul>
          </Panel>

          {/* Upcoming */}
          <Panel title="Upcoming">
            <ul className="space-y-3 text-sm">
              {[
                { icon: Vote, title: "General meeting & open votes", when: "Sat · 10:00am" },
                { icon: Calendar, title: "Bulk fertiliser order closes", when: "Fri · 5:00pm" },
                { icon: TrendingUp, title: "Collective maize sale settles", when: "In 6 days" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coop-sky text-coop-blue">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-coop-earth">{item.title}</p>
                      <p className="text-xs text-sand-500">{item.when}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <CoopCard padding="md" className="bg-coop-green-light/70 text-center">
            <Sprout className="mx-auto h-7 w-7 text-coop-green" />
            <p className="mt-3 font-display text-base font-semibold text-coop-earth">
              We are stronger together
            </p>
            <p className="mt-1 text-xs text-sand-600">
              Invite a neighbour this week — every member strengthens the price floor.
            </p>
          </CoopCard>
        </div>
      </div>
    </>
  );
}
