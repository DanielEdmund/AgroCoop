"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Minus,
  Clock,
  Users,
  Trophy,
  Info,
  CalendarCheck,
} from "lucide-react";
import { PageHeader, Panel } from "@/components/layout/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { VoteMeter } from "@/components/cooperatives/VoteMeter";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { CoopBadge } from "@/components/cooperatives/CoopBadge";
import { toast } from "@/components/ui/toast";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { votes, closedVotes } from "@/lib/data/votes";
import { getCooperative } from "@/lib/data/cooperatives";
import { useCoopStore } from "@/lib/store";
import { daysUntil, cn } from "@/lib/utils";
import type { Vote, VoteOption } from "@/lib/types";

export default function VotingPage() {
  const [tab, setTab] = useState("active");

  const showClosed = () => {
    setTab("closed");
    document.getElementById("votes-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    toast.info("Past decisions", `Showing ${closedVotes.length} closed motions with final results.`);
  };

  const stats = useMemo(() => {
    const all = [...votes, ...closedVotes];
    const cast = all.filter((v) => v.userVote || v.status === "closed").length;
    const eligible = all.reduce((sum, v) => sum + v.eligibleVoters, 0);
    const castVotes = all.reduce(
      (sum, v) => sum + (v.userVote ? 1 : 0) + (v.status === "closed" ? Math.round(v.eligibleVoters * 0.72) : 0),
      0
    );
    return [
      { label: "Open votes", value: votes.length, icon: CalendarCheck },
      { label: "Your participation", value: "94%", icon: Trophy },
      { label: "Coop turnout", value: `${Math.round((castVotes / eligible) * 100)}%`, icon: Users },
      { label: "Next closing", value: `${daysUntil(votes[0].deadline)}d`, icon: Clock },
    ];
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Democratic member control"
        title="Votes & Decisions"
        description="Every member, one vote. Read the motion, see how the community is leaning, and cast your choice before the deadline."
        actions={
          <CoopButton variant="outline" icon={Info} onClick={showClosed}>
            View past decisions
          </CoopButton>
        }
      />

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4" staggerDelay={0.08}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.label}>
              <div className="rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coop-blue/10 text-coop-blue">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 font-display text-2xl font-semibold text-coop-earth">{s.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">{s.label}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs id="votes-tabs" defaultValue="active" value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="active">Active votes ({votes.length})</TabsTrigger>
              <TabsTrigger value="closed">Closed ({closedVotes.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="space-y-5">
                {votes.map((v, i) => (
                  <VoteCard key={v.id} vote={v} index={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="closed">
              <div className="space-y-5">
                {closedVotes.map((v, i) => (
                  <VoteCard key={v.id} vote={v} index={i} closed />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <Panel title="Participation matters">
            <p className="text-sm leading-relaxed text-sand-600">
              Cooperative decisions are only as legitimate as the turnout behind them. AgroCoop
              shows live participation so no decision passes in silence.
            </p>
            <div className="mt-4 space-y-3">
              <ProgressBarish label="This quarter" value={94} tone="bg-coop-green" />
              <ProgressBarish label="Coop average" value={81} tone="bg-coop-blue" />
              <ProgressBarish label="National average" value={58} tone="bg-coop-gold" />
            </div>
          </Panel>

          <Panel title="How voting works">
            <ol className="space-y-3 text-sm">
              {[
                "Any member in good standing can propose a motion.",
                "The committee publishes it with full costings.",
                "Voting stays open for 7 days — yes, no or abstain.",
                "Results are published the moment voting closes.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-coop-blue text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sand-600">{step}</span>
                </li>
              ))}
            </ol>
          </Panel>

          <div className="rounded-xl border border-coop-gold/30 bg-coop-gold-light/70 p-5">
            <p className="flex items-center gap-2 font-display text-base font-semibold text-coop-earth">
              <Trophy className="h-4 w-4 text-coop-gold" /> You voted in 16 of 17 decisions
            </p>
            <p className="mt-1.5 text-xs text-sand-600">
              That puts you in the top 8% of participating members — your voice is shaping the coop.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function ProgressBarish({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="font-semibold text-coop-earth">{label}</span>
        <span className="tabular-nums text-sand-500">{value}%</span>
      </div>
      <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-coop-sand-dark">
        <motion.div
          className={cn("h-full rounded-full", tone)}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function VoteCard({ vote, index, closed = false }: { vote: Vote; index: number; closed?: boolean }) {
  const coop = getCooperative(vote.cooperativeId);
  const choices = useCoopStore((s) => s.voteChoices);
  const castVote = useCoopStore((s) => s.castVote);
  const choice = choices[vote.id] ?? vote.userVote;
  const deadline = daysUntil(vote.deadline);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: Math.min(index, 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CoopBadge
            kind="member"
            showIcon={false}
            labelOverride={vote.category}
            className="border-coop-blue/20 bg-coop-blue/10 text-coop-blue"
          />
          <span className="text-xs font-semibold text-sand-500">{coop?.name}</span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
            closed
              ? "bg-coop-sand text-sand-500"
              : deadline <= 1
                ? "bg-coop-coral/10 text-coop-coral"
                : "bg-coop-blue/10 text-coop-blue"
          )}
        >
          <Clock className="h-3 w-3" />
          {closed
            ? `Closed ${new Date(vote.deadline).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}`
            : deadline === 0
              ? "Closes today"
              : `${deadline} day${deadline === 1 ? "" : "s"} left`}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-coop-earth">
        {vote.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-sand-600">{vote.description}</p>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-sand-500">
            Live results
          </p>
          <VoteMeter
            yes={vote.yes + (choice === "yes" && !vote.userVote ? 1 : 0)}
            no={vote.no + (choice === "no" && !vote.userVote ? 1 : 0)}
            abstain={vote.abstain + (choice === "abstain" && !vote.userVote ? 1 : 0)}
            eligibleVoters={vote.eligibleVoters}
            userVote={choice ?? null}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-sand-500">
            {closed ? "Result" : "Cast your vote"}
          </p>

          {closed ? (
            <div className="rounded-xl bg-coop-sand p-4">
              <p className="font-display text-lg font-semibold text-coop-earth">
                {vote.yes > vote.no ? "Motion passed" : "Motion rejected"}
              </p>
              <p className="mt-1 text-xs text-sand-500">
                {Math.round((vote.yes / (vote.yes + vote.no + vote.abstain)) * 100)}% voted in
                favour · your vote:{" "}
                <strong className="capitalize text-coop-green">{choice ?? "not cast"}</strong>
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {choice ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-coop-green/30 bg-coop-green-light p-4 text-center"
                >
                  <Check className="mx-auto h-6 w-6 text-coop-green" />
                  <p className="mt-2 font-display text-base font-semibold text-coop-earth">
                    You voted <span className="capitalize">{choice}</span>
                  </p>
                  <p className="mt-1 text-xs text-sand-600">
                    You can change your vote until voting closes.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="choices"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-3"
                >
                  <VoteButton
                    label="Yes"
                    icon={Check}
                    tone="bg-coop-green hover:brightness-105"
                    onClick={() => {
                      castVote(vote.id, "yes");
                      toast.success("Vote recorded", `You voted Yes on “${vote.title}”.`);
                    }}
                  />
                  <VoteButton
                    label="No"
                    icon={X}
                    tone="bg-coop-coral hover:brightness-105"
                    onClick={() => {
                      castVote(vote.id, "no");
                      toast.success("Vote recorded", `You voted No on “${vote.title}”.`);
                    }}
                  />
                  <VoteButton
                    label="Abstain"
                    icon={Minus}
                    tone="bg-sand-400 hover:brightness-95"
                    onClick={() => {
                      castVote(vote.id, "abstain");
                      toast.info("Vote recorded", `You abstained on “${vote.title}”.`);
                    }}
                  />
                  <p className="flex items-center gap-1.5 text-[11px] text-sand-500">
                    <Info className="h-3 w-3" /> Proposed by {vote.createdBy} ·{" "}
                    {new Date(vote.createdAt).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function VoteButton({
  label,
  icon: Icon,
  tone,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-[0.98]",
        tone
      )}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}
