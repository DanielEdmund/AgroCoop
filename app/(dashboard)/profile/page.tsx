"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  CalendarCheck,
  GraduationCap,
  LogOut,
  MessagesSquare,
  Store,
  Sprout,
} from "lucide-react";
import { PageHeader, Panel } from "@/components/layout/PageHeader";
import { CoopAvatar } from "@/components/cooperatives/CoopAvatar";
import { CoopBadge } from "@/components/cooperatives/CoopBadge";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { ProgressBar } from "@/components/cooperatives/ProgressBar";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { currentUser } from "@/lib/data/members";
import { courses } from "@/lib/data/learning";
import { listings, collectiveSales } from "@/lib/data/marketplace";
import { resources } from "@/lib/data/resources";
import { getCooperative } from "@/lib/data/cooperatives";
import { useCoopStore } from "@/lib/store";
import { useAuthStore } from "@/lib/auth";
import { toast } from "@/components/ui/toast";
import { formatNaira, timeAgo } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  const bookmarks = useCoopStore((s) => s.bookmarkedListings);
  const booked = useCoopStore((s) => s.bookedResources);
  const myListings = useCoopStore((s) => s.myListings);
  const myPosts = useCoopStore((s) => s.myForumPosts);
  const enrolledCourseIds = useCoopStore((s) => s.enrolledCourseIds);
  const courseProgress = useCoopStore((s) => s.courseProgress);

  const coop = getCooperative(currentUser.cooperativeId)!;
  const name = user?.name ?? currentUser.name;
  const savedListings = listings.filter((l) => bookmarks.includes(l.id));
  const savedResources = resources.filter((r) => booked.includes(r.id));
  const myCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  const handleSignOut = () => {
    signOut();
    toast.info("Signed out", "Your mock session has ended.");
    router.replace("/sign-in");
  };

  return (
    <>
      <PageHeader
        eyebrow="Member profile"
        title={name}
        description={`${user?.role ?? currentUser.role} · ${currentUser.cooperativeName} · ${currentUser.location}`}
        actions={
          <CoopButton variant="outline" icon={LogOut} onClick={handleSignOut}>
            Sign out
          </CoopButton>
        }
      />

      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.07}>
        {[
          { label: "My listings", value: myListings.length, icon: Store },
          { label: "Saved listings", value: bookmarks.length, icon: Bookmark },
          { label: "Resource bookings", value: booked.length, icon: CalendarCheck },
          { label: "Courses enrolled", value: myCourses.length, icon: GraduationCap },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.label}>
              <div className="rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coop-blue/10 text-coop-blue">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 font-display text-2xl font-semibold text-coop-earth">{s.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="My cooperative">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl sm:w-48">
                <img src={coop.image} alt={coop.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/70 to-transparent" />
                <span className="absolute bottom-2 left-2">
                  <CoopBadge kind="verified" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-semibold text-coop-earth">{coop.name}</h3>
                <p className="mt-1 text-sm text-sand-500">{coop.tagline}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-sand-500">
                  <span>{coop.members} members</span>
                  <span>·</span>
                  <span>Joined {new Date(currentUser.joinedAt).getFullYear()}</span>
                  <span>·</span>
                  <span>{currentUser.farmSize}</span>
                </div>
                <div className="mt-4 flex gap-3">
                  <CoopButton href={`/cooperatives/${coop.id}`} size="sm" variant="primary">
                    View coop profile
                  </CoopButton>
                  <CoopButton href="/join-cooperative" size="sm" variant="outline">
                    Join another
                  </CoopButton>
                </div>
              </div>
            </div>
          </Panel>

          <Panel
            title="My listings"
            action={
              <Link href="/marketplace" className="text-sm font-semibold text-coop-blue hover:underline">
                Open marketplace →
              </Link>
            }
          >
            {myListings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-coop-sand-dark p-8 text-center">
                <Store className="mx-auto h-6 w-6 text-sand-400" />
                <p className="mt-2 text-sm font-semibold text-coop-earth">No listings yet</p>
                <p className="mt-1 text-xs text-sand-500">
                  List your harvest and sell alongside the cooperative.
                </p>
                <CoopButton href="/marketplace" size="sm" variant="cta" className="mt-4">
                  List produce
                </CoopButton>
              </div>
            ) : (
              <ul className="space-y-3">
                {myListings.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-coop-sand/60 p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-coop-earth">{l.title}</p>
                      <p className="text-xs text-sand-500">
                        {l.quantity} {l.unit} · {l.location}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-coop-green">
                      {formatNaira(l.pricePerUnit)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel
            title="Saved listings & bookings"
            action={
              <Link href="/resources" className="text-sm font-semibold text-coop-blue hover:underline">
                All resources →
              </Link>
            }
          >
            <div className="space-y-4">
              <ul className="space-y-2">
                {savedListings.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 rounded-xl bg-coop-sand/60 p-3">
                    <Bookmark className="h-4 w-4 shrink-0 text-coop-gold" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-coop-earth">{l.title}</p>
                      <p className="text-[11px] text-sand-500">{l.seller}</p>
                    </div>
                  </li>
                ))}
                {savedListings.length === 0 && (
                  <li className="rounded-xl bg-coop-sand/60 p-4 text-sm text-sand-500">
                    You have not bookmarked any listing yet.
                  </li>
                )}
              </ul>

              <ul className="space-y-2">
                {savedResources.map((r) => (
                  <li key={r.id} className="flex items-center gap-3 rounded-xl bg-coop-green-light p-3">
                    <CalendarCheck className="h-4 w-4 shrink-0 text-coop-green" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-coop-earth">{r.name}</p>
                      <p className="text-[11px] text-sand-500">
                        {r.location} · {formatNaira(r.rate)}/{r.rateUnit}
                      </p>
                    </div>
                  </li>
                ))}
                {savedResources.length === 0 && (
                  <li className="rounded-xl bg-coop-green-light/60 p-4 text-sm text-sand-500">
                    No shared equipment booked yet.
                  </li>
                )}
              </ul>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel
            title="My learning"
            action={
              <Link href="/learning" className="text-sm font-semibold text-coop-blue hover:underline">
                All courses →
              </Link>
            }
          >
            {myCourses.length === 0 ? (
              <p className="text-sm text-sand-500">You are not enrolled in any course yet.</p>
            ) : (
              <ul className="space-y-4">
                {myCourses.slice(0, 4).map((c) => {
                  const progress = courseProgress[c.id] ?? c.progress;
                  return (
                    <li key={c.id}>
                      <ProgressBar value={progress} tone="blue" label={c.title} detail={`${progress}% complete`} />
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>

          <Panel
            title="My discussions"
            action={
              <Link href="/community" className="text-sm font-semibold text-coop-blue hover:underline">
                Forum →
              </Link>
            }
          >
            {myPosts.length === 0 ? (
              <p className="text-sm text-sand-500">
                You have not started a thread yet — say hello in the common room.
              </p>
            ) : (
              <ul className="space-y-3">
                {myPosts.map((p) => (
                  <li key={p.id} className="rounded-xl bg-coop-sand/60 p-3.5">
                    <p className="text-sm font-bold text-coop-earth">{p.title}</p>
                    <p className="mt-1 text-[11px] text-sand-500">
                      {p.category} · {timeAgo(p.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Collective sale pools">
            <ul className="space-y-3 text-sm">
              {collectiveSales.slice(0, 3).map((s) => (
                <li key={s.id} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-coop-gold/10 text-coop-gold">
                    <Sprout className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-coop-earth">{s.title}</p>
                    <p className="text-[11px] text-sand-500">
                      {s.closing} · {s.premium}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <CoopButton href="/marketplace" variant="outline" size="sm" className="mt-4 w-full">
              Join a pool
            </CoopButton>
          </Panel>

          <CoopButton variant="cta" className="w-full" icon={LogOut} onClick={handleSignOut}>
            Sign out
          </CoopButton>
        </div>
      </div>
    </>
  );
}
