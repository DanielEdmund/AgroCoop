"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Users,
  Clock,
  FileCheck2,
} from "lucide-react";
import { OnboardingHeader } from "@/app/(onboarding)/OnboardingHeader";
import { Stepper } from "@/components/onboarding/Stepper";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { CoopCard } from "@/components/cooperatives/CoopCard";
import { CoopBadge } from "@/components/cooperatives/CoopBadge";
import { cooperativeCrops, cooperatives } from "@/lib/data/cooperatives";
import { Label, Input, Select, Textarea } from "@/components/ui/input";
import { useCoopStore } from "@/lib/store";
import { formatNaira } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(3, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  farmSize: z.string().min(1, "Tell us your farm size"),
  crop: z.string().min(1, "Choose your main crop"),
  motivation: z.string().min(20, "Tell the committee why you want to join (20+ characters)"),
  agree: z.literal(true, { message: "You must accept the coop's by-laws" }),
});

type FormValues = z.infer<typeof schema>;

const STEPS = ["Select Coop", "Application", "Review", "Status"];

const statusTimeline = [
  {
    title: "Application submitted",
    detail: "Your details were shared with the membership committee.",
    state: "done" as const,
    time: "Just now",
  },
  {
    title: "Committee review",
    detail: "Two committee members review applications every Monday and Thursday.",
    state: "current" as const,
    time: "Within 5 days",
  },
  {
    title: "Member vote",
    detail: "Existing members vote on new admissions — one member, one vote.",
    state: "pending" as const,
    time: "Next general meeting",
  },
  {
    title: "Induction & welcome",
    detail: "Attend your first meeting, receive your member number and start participating.",
    state: "pending" as const,
    time: "After approval",
  },
];

export function JoinCooperativeFlow() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("coop");
  const [step, setStep] = useState(preset ? 1 : 0);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    cooperatives.some((c) => c.id === preset) ? preset : null
  );
  const submitApplication = useCoopStore((s) => s.submitApplication);
  const applicationId = useCoopStore((s) => s.applicationId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cooperatives.slice(0, 6);
    return cooperatives.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.crops.some((cr) => cr.toLowerCase().includes(q))
    );
  }, [query]);

  const selected = cooperatives.find((c) => c.id === selectedId) ?? null;

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      farmSize: "",
      crop: "",
      motivation: "",
      agree: false as unknown as true,
    },
  });

  const values = watch();

  const goNext = async () => {
    if (step === 0) {
      if (!selectedId) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      const valid = await trigger();
      if (valid) setStep(2);
      return;
    }
    setStep((s) => s + 1);
  };

  const submit = (data: FormValues) => {
    if (selectedId) submitApplication(selectedId);
    setStep(3);
  };

  // Success / status view
  if (step === 3) {
    const coop = cooperatives.find((c) => c.id === (applicationId ?? selectedId));
    return (
      <div className="flex min-h-screen flex-col">
        <OnboardingHeader stepLabel="Application status" />
        <main className="flex-1 px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <CoopCard padding="lg">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coop-green-light text-coop-green">
                    <FileCheck2 className="h-7 w-7" />
                  </span>
                  <div>
                    <h1 className="font-display text-2xl font-semibold text-coop-earth">
                      Application submitted
                    </h1>
                    <p className="text-sm text-sand-500">
                      {coop?.name ?? "Your cooperative"} · Reference AGC-
                      {Math.floor(Math.random() * 9000 + 1000)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-0">
                  {statusTimeline.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      {i < statusTimeline.length - 1 && (
                        <span
                          className={`absolute left-[13px] top-7 h-full w-0.5 ${
                            item.state === "done" ? "bg-coop-green" : "bg-coop-sand-dark"
                          }`}
                        />
                      )}
                      <span
                        className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                          item.state === "done"
                            ? "border-coop-green bg-coop-green text-white"
                            : item.state === "current"
                              ? "border-coop-blue bg-white text-coop-blue"
                              : "border-coop-sand-dark bg-white text-sand-400"
                        }`}
                      >
                        {item.state === "done" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : item.state === "current" ? (
                          <span className="h-2 w-2 animate-slow-pulse rounded-full bg-coop-blue" />
                        ) : (
                          <Clock className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <div className="pt-0.5">
                        <p className="text-sm font-bold text-coop-earth">{item.title}</p>
                        <p className="text-xs leading-relaxed text-sand-500">{item.detail}</p>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-coop-blue">
                          {item.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-coop-sky p-4 text-sm text-coop-blue-dark">
                  Track this application any time from your dashboard — we will also notify you the
                  moment the committee decides.
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <CoopButton href="/dashboard" variant="primary" className="flex-1">
                    Go to Dashboard
                  </CoopButton>
                  <CoopButton href="/cooperatives" variant="outline" className="flex-1">
                    Browse more coops
                  </CoopButton>
                </div>
              </CoopCard>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <OnboardingHeader stepLabel={`Step ${step + 1} of ${STEPS.length}`} />

      <div className="border-b border-coop-sand-dark/70 bg-white/60">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <Stepper steps={STEPS} current={step} />
        </div>
      </div>

      <main className="flex-1 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <CoopCard padding="lg">
                <h1 className="font-display text-2xl font-semibold text-coop-earth">
                  {step === 0 && "Which cooperative would you like to join?"}
                  {step === 1 && "Tell the committee about your farm"}
                  {step === 2 && "Review & submit your application"}
                </h1>
                <p className="mt-2 text-sm text-sand-600">
                  {step === 0 &&
                    "Search by name, state or crop. Only verified cooperatives accept applications."}
                  {step === 1 &&
                    "Cooperatives admit members who fit their focus — be honest and specific."}
                  {step === 2 &&
                    "Your application goes straight to the membership committee. Nothing is charged."}
                </p>

                {/* STEP 0 — select */}
                {step === 0 && (
                  <div className="mt-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search cooperative, state or crop…"
                        className="h-12 w-full rounded-xl border border-coop-sand-dark bg-white pl-11 pr-4 text-sm focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30"
                      />
                    </div>

                    <div className="mt-4 grid gap-3">
                      {filtered.map((c) => {
                        const active = selectedId === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedId(c.id)}
                            className={`flex items-center gap-4 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                              active
                                ? "border-coop-blue bg-coop-blue/6 shadow-coop-blue"
                                : "border-coop-sand-dark bg-white hover:border-coop-blue/40"
                            }`}
                          >
                            <img
                              src={c.image}
                              alt={c.name}
                              className="h-14 w-14 shrink-0 rounded-lg object-cover"
                              loading="lazy"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate font-semibold text-coop-earth">{c.name}</p>
                                {c.verified && <CoopBadge kind="verified" />}
                              </div>
                              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sand-500">
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-coop-coral" /> {c.location},{" "}
                                  {c.state}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Users className="h-3 w-3 text-coop-blue" /> {c.members} members
                                </span>
                                <span>{c.crops.join(" · ")}</span>
                              </p>
                            </div>
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                                active
                                  ? "border-coop-blue bg-coop-blue text-white"
                                  : "border-coop-sand-dark"
                              }`}
                            >
                              {active && <CheckCircle2 className="h-4 w-4" />}
                            </span>
                          </button>
                        );
                      })}
                      {filtered.length === 0 && (
                        <p className="rounded-xl border border-dashed border-coop-sand-dark p-6 text-center text-sm text-sand-500">
                          No cooperative matches that search. Try a state name — or{" "}
                          <a href="/start-cooperative" className="font-semibold text-coop-blue">
                            start your own
                          </a>
                          .
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 1 — form */}
                {step === 1 && (
                  <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <Input id="fullName" placeholder="e.g. Grace Alabi" {...register("fullName")} />
                        {errors.fullName && (
                          <p className="text-xs font-semibold text-coop-coral">{errors.fullName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input id="phone" placeholder="0803 000 0000" {...register("phone")} />
                        {errors.phone && (
                          <p className="text-xs font-semibold text-coop-coral">{errors.phone.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmSize">Farm size</Label>
                        <Select id="farmSize" {...register("farmSize")}>
                          <option value="">Select farm size</option>
                          <option value="Under 1 hectare">Under 1 hectare</option>
                          <option value="1–3 hectares">1–3 hectares</option>
                          <option value="3–5 hectares">3–5 hectares</option>
                          <option value="5–10 hectares">5–10 hectares</option>
                          <option value="10+ hectares">10+ hectares</option>
                        </Select>
                        {errors.farmSize && (
                          <p className="text-xs font-semibold text-coop-coral">{errors.farmSize.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="crop">Main crop</Label>
                        <Select id="crop" {...register("crop")}>
                          <option value="">Select your crop</option>
                          {cooperativeCrops.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </Select>
                        {errors.crop && (
                          <p className="text-xs font-semibold text-coop-coral">{errors.crop.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">Why do you want to join?</Label>
                      <Textarea
                        id="motivation"
                        placeholder="Tell the committee what you hope to gain and what you will contribute…"
                        {...register("motivation")}
                      />
                      {errors.motivation && (
                        <p className="text-xs font-semibold text-coop-coral">{errors.motivation.message}</p>
                      )}
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-coop-blue/30 bg-coop-blue/5 p-4">
                      <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#2E7D32]" {...register("agree")} />
                      <span className="text-sm font-semibold text-coop-earth">
                        I accept the cooperative's by-laws and the seven cooperative principles.
                      </span>
                    </label>
                    {errors.agree && (
                      <p className="text-xs font-semibold text-coop-coral">{errors.agree.message as string}</p>
                    )}
                  </form>
                )}

                {/* STEP 2 — review */}
                {step === 2 && selected && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-4 rounded-xl border border-coop-sand-dark bg-white p-4">
                      <img
                        src={selected.image}
                        alt={selected.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-coop-earth">{selected.name}</p>
                        <p className="text-xs text-sand-500">
                          {selected.location}, {selected.state} · {selected.members} members
                        </p>
                        <p className="text-xs text-coop-green">
                          Average member payout last season:{" "}
                          {formatNaira(Math.round(selected.tradeVolume / selected.members), true)}
                        </p>
                      </div>
                    </div>

                    <dl className="divide-y divide-coop-sand-dark overflow-hidden rounded-xl border border-coop-sand-dark bg-white text-sm">
                      {[
                        ["Applicant", values.fullName || "—"],
                        ["Phone", values.phone || "—"],
                        ["Farm size", values.farmSize || "—"],
                        ["Main crop", values.crop || "—"],
                        ["Motivation", values.motivation || "—"],
                        ["By-laws", "Accepted"],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-3 gap-4 p-4">
                          <dt className="font-semibold text-sand-500">{k}</dt>
                          <dd className="col-span-2 text-coop-earth">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Nav */}
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-coop-sand-dark/70 pt-6">
                  <CoopButton variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                    Back
                  </CoopButton>

                  {step < 2 ? (
                    <CoopButton onClick={goNext} disabled={step === 0 && !selectedId} iconRight={ArrowRight}>
                      Continue
                    </CoopButton>
                  ) : (
                    <CoopButton onClick={handleSubmit(submit)} variant="cta">
                      Submit Application
                    </CoopButton>
                  )}
                </div>
              </CoopCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
