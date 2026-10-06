"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Heart,
  Pin,
  Megaphone,
  Plus,
  Send,
  BadgeCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader, Panel } from "@/components/layout/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { CoopAvatar } from "@/components/cooperatives/CoopAvatar";
import { CoopBadge } from "@/components/cooperatives/CoopBadge";
import { Modal, Field } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { announcements, forumPosts, successStories } from "@/lib/data/community";
import { currentUser, members } from "@/lib/data/members";
import { getCooperative } from "@/lib/data/cooperatives";
import { useCoopStore } from "@/lib/store";
import { timeAgo, cn } from "@/lib/utils";
import type { ForumPost } from "@/lib/types";

const topics = ["All", "Governance", "Market Access", "Post-Harvest", "Collective Buying", "Equipment"];

const priorityTone: Record<string, string> = {
  urgent: "bg-coop-coral text-white",
  important: "bg-coop-gold text-white",
  normal: "bg-coop-sky text-coop-blue-dark",
};

export default function CommunityPage() {
  const [topic, setTopic] = useState("All");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [draftReplies, setDraftReplies] = useState<Record<string, string>>({});

  const myPosts = useCoopStore((s) => s.myForumPosts);
  const addForumPost = useCoopStore((s) => s.addForumPost);
  const myComments = useCoopStore((s) => s.myComments);
  const addComment = useCoopStore((s) => s.addComment);

  const allPosts = useMemo(() => [...myPosts, ...forumPosts], [myPosts]);

  const filtered = useMemo(
    () => (topic === "All" ? allPosts : allPosts.filter((p) => p.category === topic)),
    [allPosts, topic]
  );

  const toggleLike = (id: string) =>
    setLikedPosts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const sendReply = (post: ForumPost) => {
    const text = (draftReplies[post.id] ?? "").trim();
    if (text.length < 2) {
      toast.error("Write something first", "Your reply needs at least a couple of words.");
      return;
    }
    addComment(post.id, text);
    setDraftReplies((prev) => ({ ...prev, [post.id]: "" }));
    toast.success("Reply posted", "Your reply is now visible in the thread.");
  };

  const topMembers = members.slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Community forum"
        title="The Cooperative Common Room"
        description="Ask questions, share what worked, follow announcements and get to know the members you are building with."
        actions={
          <CoopButton variant="cta" icon={Plus} onClick={() => setStartOpen(true)}>
            Start a discussion
          </CoopButton>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Announcements */}
          <Panel title="Announcements" action={<Megaphone className="h-4 w-4 text-coop-coral" />}>
            <ul className="space-y-3">
              {announcements.map((a) => {
                const coop = getCooperative(a.cooperativeId);
                return (
                  <motion.li
                    key={a.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex gap-3 rounded-xl border border-coop-sand-dark/70 bg-coop-sand/60 p-4"
                  >
                    <span
                      className={cn(
                        "h-fit shrink-0 rounded-full px-2.5 py-1 text-center text-[10px] font-bold uppercase tracking-wide",
                        priorityTone[a.priority]
                      )}
                    >
                      {a.priority}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-coop-earth">{a.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-sand-500">{a.body}</p>
                      <p className="mt-1.5 text-[11px] text-sand-400">
                        {a.author.name} · {coop?.name ?? "AgroCoop"} · {timeAgo(a.createdAt)}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </Panel>

          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all",
                  topic === t
                    ? "border-coop-blue bg-coop-blue text-white shadow-coop-blue"
                    : "border-coop-sand-dark bg-white text-sand-600 hover:border-coop-blue/40"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Forum list */}
          <StaggerContainer className="space-y-4" staggerDelay={0.08}>
            {filtered.map((post) => {
              const liked = likedPosts.includes(post.id);
              const commentsOpen = openComments === post.id;
              const coop = getCooperative(post.cooperativeId);
              return (
                <StaggerItem key={post.id}>
                  <article className="rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft transition-shadow hover:shadow-lift">
                    <div className="flex items-start gap-3">
                      <CoopAvatar
                        name={post.author.name}
                        image={post.author.image}
                        status={post.author.status}
                        role={post.author.role}
                        showRole={post.author.role !== "member"}
                        size="md"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-bold text-coop-earth">{post.author.name}</p>
                          <CoopBadge kind={post.author.role} showIcon={false} />
                          <span className="text-[11px] text-sand-400">
                            {post.author.location} · {timeAgo(post.createdAt)}
                          </span>
                        </div>

                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          {post.pinned && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-coop-gold-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-coop-gold">
                              <Pin className="h-3 w-3" /> Pinned
                            </span>
                          )}
                          <span className="rounded-full bg-coop-blue/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-coop-blue">
                            {post.category}
                          </span>
                          <span className="text-[11px] text-sand-400">{coop?.name}</span>
                        </div>

                        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-coop-earth">
                          {post.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-sand-600">{post.body}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all",
                              liked
                                ? "border-coop-coral/40 bg-coop-coral-light text-coop-coral"
                                : "border-coop-sand-dark bg-white text-sand-600 hover:border-coop-coral/40 hover:text-coop-coral"
                            )}
                          >
                            <Heart className={cn("h-3.5 w-3.5", liked && "fill-current")} />
                            {post.likes + (liked ? 1 : 0)}
                          </button>
                          <button
                            onClick={() => setOpenComments(commentsOpen ? null : post.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-coop-sand-dark bg-white px-3 py-1.5 text-xs font-bold text-sand-600 transition-all hover:border-coop-blue/40 hover:text-coop-blue"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />{" "}
                            {post.comments + (myComments[post.id]?.length ?? 0)}{" "}
                            {post.comments + (myComments[post.id]?.length ?? 0) === 1 ? "comment" : "comments"}
                          </button>
                          <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-coop-green">
                            <BadgeCheck className="h-3.5 w-3.5" /> Verified member
                          </span>
                        </div>

                        <AnimatePresence initial={false}>
                          {commentsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 space-y-3 rounded-xl bg-coop-sand/70 p-4">
                                {(myComments[post.id] ?? []).map((text, i) => (
                                  <div key={`mine-${i}`} className="flex gap-2.5">
                                    <CoopAvatar
                                      name={currentUser.name}
                                      image={currentUser.image}
                                      size="sm"
                                      status="verified"
                                      showRing={false}
                                    />
                                    <div className="rounded-xl border border-coop-blue/20 bg-coop-blue/10 p-3">
                                      <p className="text-xs font-bold text-coop-earth">
                                        {currentUser.name}{" "}
                                        <span className="font-semibold text-coop-blue">· you</span>
                                      </p>
                                      <p className="mt-0.5 text-xs leading-relaxed text-sand-600">
                                        {text}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                {[
                                  {
                                    name: "Folasade Ojo",
                                    text: "This matches what we saw in Oyo — thanks for sharing the full numbers, not just the wins.",
                                    img: members[11]?.image,
                                  },
                                  {
                                    name: "Alhaji Musa Danjuma",
                                    text: "We will try the same sequence in Kebbi this dry season. Can you share the tracker template?",
                                    img: members[5]?.image,
                                  },
                                ].map((c) => (
                                  <div key={c.name} className="flex gap-2.5">
                                    <CoopAvatar name={c.name} image={c.img} size="sm" status="growing" showRing={false} />
                                    <div className="rounded-xl bg-white p-3">
                                      <p className="text-xs font-bold text-coop-earth">{c.name}</p>
                                      <p className="mt-0.5 text-xs leading-relaxed text-sand-600">{c.text}</p>
                                    </div>
                                  </div>
                                ))}

                                <div className="flex gap-2 pt-1">
                                  <input
                                    value={draftReplies[post.id] ?? ""}
                                    onChange={(e) =>
                                      setDraftReplies((prev) => ({
                                        ...prev,
                                        [post.id]: e.target.value,
                                      }))
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") sendReply(post);
                                    }}
                                    placeholder="Write a reply…"
                                    className="h-10 flex-1 rounded-xl border border-coop-sand-dark bg-white px-3.5 text-sm focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30"
                                  />
                                  <button
                                    onClick={() => sendReply(post)}
                                    aria-label="Send reply"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-coop-blue text-white transition-transform active:scale-95"
                                  >
                                    <Send className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <Panel title="Active members">
            <ul className="space-y-3">
              {topMembers.map((m) => (
                <li key={m.id} className="flex items-center gap-3">
                  <CoopAvatar name={m.name} image={m.image} status={m.status} role={m.role} size="sm" showRing={false} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-coop-earth">{m.name}</p>
                    <p className="truncate text-[11px] text-sand-500">
                      {m.location} · {m.crop}
                    </p>
                  </div>
                  <CoopBadge kind={m.role} showIcon={false} labelOverride={undefined} />
                </li>
              ))}
            </ul>
            <CoopButton href="/cooperatives" variant="outline" size="sm" className="mt-4 w-full" icon={Users}>
              Meet all members
            </CoopButton>
          </Panel>

          <Panel title="Trending this week">
            <ul className="space-y-3 text-sm">
              {[
                { label: "Bulk fertiliser order", detail: "61 replies", icon: TrendingUp },
                { label: "Post-harvest playbook", detail: "34 replies", icon: TrendingUp },
                { label: "Chairperson nominations", detail: "47 replies", icon: TrendingUp },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.label} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coop-coral/10 text-coop-coral">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-coop-earth">{t.label}</p>
                      <p className="text-[11px] text-sand-500">{t.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Member spotlight">
            {successStories.slice(0, 1).map((s) => (
              <div key={s.id}>
                <div className="relative h-36 overflow-hidden rounded-xl">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/85 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="font-display text-base font-semibold text-white">{s.name}</p>
                    <p className="text-[11px] text-white/80">{s.cooperative}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm italic leading-relaxed text-sand-600">“{s.quote}”</p>
                <p className="mt-2 text-xs font-bold text-coop-green">{s.achievement}</p>
              </div>
            ))}
          </Panel>

          <Tabs defaultValue="guidelines">
            <TabsList>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>
            <TabsContent value="guidelines">
              <Panel>
                <ol className="space-y-2.5 text-sm text-sand-600">
                  <li>1. Share numbers, not just opinions.</li>
                  <li>2. Disagree with respect — this is a community.</li>
                  <li>3. Keep prices and contracts inside the coop channels.</li>
                  <li>4. Celebrate other coops' wins loudly.</li>
                </ol>
              </Panel>
            </TabsContent>
            <TabsContent value="topics">
              <Panel>
                <div className="flex flex-wrap gap-2">
                  {topics.slice(1).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-coop-sand px-3 py-1 text-xs font-bold text-sand-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Panel>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Modal
        open={startOpen}
        onClose={() => setStartOpen(false)}
        title="Start a discussion"
        description="Your thread is posted to the co-op forum immediately — mock data."
      >
        <StartDiscussionForm
          onClose={() => setStartOpen(false)}
          onCreated={(category) => {
            setTopic(category);
            toast.success("Discussion published", "Your thread is at the top of the forum.");
          }}
        />
      </Modal>
    </>
  );
}

function StartDiscussionForm({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (category: string) => void;
}) {
  const addForumPost = useCoopStore((s) => s.addForumPost);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(topics[1]);
  const [body, setBody] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 8 || body.trim().length < 20) {
      toast.error("Add more detail", "Use at least 8 characters for the title and 20 for the body.");
      return;
    }
    const post: ForumPost = {
      id: `my-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      author: currentUser,
      category,
      cooperativeId: currentUser.cooperativeId,
      createdAt: new Date().toISOString(),
      comments: 0,
      likes: 0,
    };
    addForumPost(post);
    onCreated(category);
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Title">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Who is joining the December fertiliser order?"
        />
      </Field>
      <Field label="Topic">
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {topics.slice(1).map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Field>
      <Field label="What do you want to share or ask?" hint="Numbers help — costs, yields, dates.">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          placeholder="Share the details so members can respond with something useful…"
        />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <CoopButton type="button" variant="ghost" onClick={onClose}>
          Cancel
        </CoopButton>
        <CoopButton type="submit" variant="cta" icon={Plus}>
          Publish discussion
        </CoopButton>
      </div>
    </form>
  );
}
