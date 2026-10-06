"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sprout,
  Target,
  ScrollText,
  ClipboardCheck,
  PartyPopper,
  Flag,
} from "lucide-react";
import { OnboardingHeader } from "@/app/(onboarding)/OnboardingHeader";
import { Stepper } from "@/components/onboarding/Stepper";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { CoopCard } from "@/components/cooperatives/CoopCard";
import { ICO_PRINCIPLES, NIGERIAN_STATES, CROP_FOCUS, COOP_GOALS } from "@/lib/constants";
import { Label, Input, Select, Textarea } from "@/components/ui/input";
import { useCoopStore } from "@/lib/store";

const schema = z.object({
  name: z.string().min(6, "Give your cooperative a name of at least 6 characters"),
  tagline: z.string().min(6, "Add a short line describing what you do"),
  state: z.string().min(1, "Choose the state your coop is based in"),
  town: z.string().min(2, "Enter your town or LGA"),
  crops: z.array(z.string()).min(1, "Pick at least one crop or focus area"),
  goals: z.array(z.string()).min(1, "Pick at least one shared goal"),
  agree: z.literal(true, { message: "You must accept the cooperative principles" }),
});

type FormValues = z.infer<typeof schema>;

const STEPS = [
  "Name",
  "Location",
  "Focus",
  "Goals",
  "Principles",
  "Review",
  "Create",
];

const stepFields: (keyof FormValues)[][] = [
  ["name", "tagline"],
  ["state", "town"],
  ["crops"],
  ["goals"],
  ["agree"],
  [],
  [],
];

const stepIcons = [Flag, MapPin, Sprout, Target, ScrollText, ClipboardCheck, PartyPopper];

export function StartCooperativeWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [created, setCreated] = useState<string | null>(null);
  const joinCooperative = useCoopStore((s) => s.joinCooperative);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "", tagline: "", state: "", town: "", crops: [], goals: [], agree: false as unknown as true },
  });

  const values = watch();
  const toggle = (field: "crops" | "goals", value: string) => {
    const list = (watch(field) as string[]) ?? [];
    setValue(field, list.includes(value) ? list.filter((v) => v !== value) : [...list, value], {
      shouldValidate: true,
    });
  };

  const next = async () => {
    const valid = await trigger(stepFields[step] as FieldPath<FormValues>[]);
    if (!valid) return;
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = (data: FormValues) => {
    const slug =
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "new-cooperative";
    setCreated(slug);
    joinCooperative(slug);
  };

  const slugPreview = useMemo(
    () =>
      (values.name || "your-cooperative")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    [values.name]
  );

  if (created) {
    return (
      <div className="flex min-h-screen flex-col">
        <OnboardingHeader stepLabel="Complete" />
        <div className="flex flex-1 items-center justify-center px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg text-center"
          >
            <CoopCard padding="lg" className="text-left">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coop-green-light text-coop-green">
                <PartyPopper className="h-8 w-8" />
              </span>
              <h1 className="mt-6 text-center font-display text-3xl font-semibold text-coop-earth">
                Your cooperative is live!
              </h1>
              <p className="mt-3 text-center leading-relaxed text-sand-600">
                <strong>{values.name}</strong> now has a home on AgroCoop. Invite your neighbours,
                publish your first vote and start pooling resources.
              </p>

              <dl className="mt-6 space-y-3 rounded-xl bg-coop-sand p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-sand-500">Slug</dt>
                  <dd className="font-semibold text-coop-earth">/cooperatives/{created}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-sand-500">Location</dt>
                  <dd className="font-semibold text-coop-earth">
                    {values.town}, {values.state}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-sand-500">Focus</dt>
                  <dd className="text-right font-semibold text-coop-earth">
                    {values.crops.join(", ")}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-sand-500">Principles</dt>
                  <dd className="font-semibold text-coop-green">All 7 accepted</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CoopButton href="/dashboard" variant="cta" className="flex-1">
                  Open Dashboard
                </CoopButton>
                <CoopButton variant="outline" className="flex-1" onClick={() => router.push("/cooperatives")}>
                  View Directory
                </CoopButton>
              </div>
            </CoopCard>
          </motion.div>
        </div>
      </div>
    );
  }

  const Icon = stepIcons[step];

  return (
    <div className="flex min-h-screen flex-col">
      <OnboardingHeader stepLabel={`Step ${step + 1} of ${STEPS.length}`} />

      <div className="border-b border-coop-sand-dark/70 bg-white/60">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <Stepper steps={STEPS} current={step} />
        </div>
      </div>

      <main className="flex-1 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <CoopCard padding="lg">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coop-blue/10 text-coop-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-coop-blue">
                      Step {step + 1} of {STEPS.length}
                    </p>
                    <h1 className="font-display text-2xl font-semibold text-coop-earth">
                      {titles[step].title}
                    </h1>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-sand-600">{titles[step].subtitle}</p>

                {/* STEP FIELDS */}
                <div className="mt-7">
                  {step === 0 && (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Cooperative name</Label>
                        <Input
                          id="name"
                          placeholder="e.g. Oyo Maize Farmers Collective"
                          {...register("name")}
                        />
                        {errors.name && <p className="text-xs font-semibold text-coop-coral">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tagline">One-line description</Label>
                        <Input
                          id="tagline"
                          placeholder="e.g. Bulk buying, shared tractors, fair prices"
                          {...register("tagline")}
                        />
                        {errors.tagline && (
                          <p className="text-xs font-semibold text-coop-coral">{errors.tagline.message}</p>
                        )}
                      </div>
                      <p className="rounded-xl bg-coop-sky p-3 text-xs text-coop-blue-dark">
                        Preview link: <strong>agrocoop.ng/cooperatives/{slugPreview}</strong>
                      </p>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select id="state" {...register("state")}>
                          <option value="">Select a state</option>
                          {NIGERIAN_STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </Select>
                        {errors.state && <p className="text-xs font-semibold text-coop-coral">{errors.state.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="town">Town / LGA</Label>
                        <Input id="town" placeholder="e.g. Awe" {...register("town")} />
                        {errors.town && <p className="text-xs font-semibold text-coop-coral">{errors.town.message}</p>}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <Label>Crop or livestock focus — pick all that apply</Label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {CROP_FOCUS.map((crop) => {
                          const selected = values.crops?.includes(crop);
                          return (
                            <button
                              key={crop}
                              type="button"
                              onClick={() => toggle("crops", crop)}
                              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                                selected
                                  ? "border-coop-green bg-coop-green text-white shadow-[0_6px_16px_-8px_rgba(5,150,105,0.6)]"
                                  : "border-coop-sand-dark bg-white text-sand-600 hover:border-coop-green/50 hover:text-coop-green"
                              }`}
                            >
                              {selected && <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />}
                              {crop}
                            </button>
                          );
                        })}
                      </div>
                      {errors.crops && (
                        <p className="mt-3 text-xs font-semibold text-coop-coral">{errors.crops.message as string}</p>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <Label>Shared goals — what should the coop achieve?</Label>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {COOP_GOALS.map((goal) => {
                          const selected = values.goals?.includes(goal);
                          return (
                            <button
                              key={goal}
                              type="button"
                              onClick={() => toggle("goals", goal)}
                              className={`flex items-center gap-2.5 rounded-xl border p-3.5 text-left text-sm font-semibold transition-all duration-200 ${
                                selected
                                  ? "border-coop-blue bg-coop-blue/8 text-coop-blue"
                                  : "border-coop-sand-dark bg-white text-sand-600 hover:border-coop-blue/40"
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                                  selected ? "border-coop-blue bg-coop-blue" : "border-coop-sand-dark"
                                }`}
                              >
                                {selected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                              </span>
                              {goal}
                            </button>
                          );
                        })}
                      </div>
                      {errors.goals && (
                        <p className="mt-3 text-xs font-semibold text-coop-coral">{errors.goals.message as string}</p>
                      )}
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <p className="mb-4 text-sm text-sand-600">
                        These are the seven principles of the international cooperative movement.
                        Every member of your coop will be asked to accept them too.
                      </p>
                      <ol className="space-y-3">
                        {ICO_PRINCIPLES.map((p) => (
                          <li
                            key={p.number}
                            className="flex gap-3 rounded-xl border border-coop-sand-dark bg-coop-sand/60 p-3.5"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-coop-gold text-xs font-bold text-white">
                              {p.number}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-coop-earth">{p.title}</p>
                              <p className="mt-0.5 line-clamp-2 text-xs text-sand-500">{p.summary}</p>
                            </div>
                          </li>
                        ))}
                      </ol>

                      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-coop-blue/30 bg-coop-blue/5 p-4">
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 accent-[#2E7D32]"
                          {...register("agree")}
                        />
                        <span className="text-sm font-semibold text-coop-earth">
                          I accept all seven cooperative principles on behalf of this cooperative.
                        </span>
                      </label>
                      {errors.agree && (
                        <p className="mt-2 text-xs font-semibold text-coop-coral">
                          {errors.agree.message as string}
                        </p>
                      )}
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-4">
                      <p className="text-sm text-sand-600">
                        Review everything before creating your cooperative. You can go back to fix
                        anything.
                      </p>
                      <dl className="divide-y divide-coop-sand-dark overflow-hidden rounded-xl border border-coop-sand-dark bg-white">
                        {[
                          ["Name", values.name || "—"],
                          ["Description", values.tagline || "—"],
                          ["Location", `${values.town || "—"}, ${values.state || "—"}`],
                          ["Focus", values.crops?.length ? values.crops.join(", ") : "—"],
                          ["Goals", values.goals?.length ? values.goals.join(", ") : "—"],
                          ["Principles", "All 7 accepted"],
                        ].map(([k, v]) => (
                          <div key={k} className="grid grid-cols-3 gap-4 p-4 text-sm">
                            <dt className="font-semibold text-sand-500">{k}</dt>
                            <dd className="col-span-2 text-coop-earth">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="rounded-xl bg-coop-green-light p-3 text-xs text-coop-green">
                        No fees. The cooperative is owned by its members from day one.
                      </p>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="text-center">
                      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-coop-gold-light text-coop-gold">
                        <Sprout className="h-10 w-10" />
                      </span>
                      <h2 className="mt-5 font-display text-xl font-semibold text-coop-earth">
                        Ready to bring your community together
                      </h2>
                      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-sand-600">
                        One click creates the cooperative, its by-laws workspace, a shared resource
                        pool and its first vote — free forever for founding members.
                      </p>
                      <CoopCard padding="sm" className="mt-5 bg-coop-sky/60 text-left">
                        <p className="text-sm font-semibold text-coop-earth">{values.name}</p>
                        <p className="text-xs text-sand-500">
                          {values.town}, {values.state} · {values.crops?.length} focus areas ·{" "}
                          {values.goals?.length} goals
                        </p>
                      </CoopCard>
                    </div>
                  )}
                </div>

                {/* Nav */}
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-coop-sand-dark/70 pt-6">
                  <CoopButton
                    variant="ghost"
                    onClick={back}
                    disabled={step === 0}
                    icon={ArrowLeft}
                  >
                    Back
                  </CoopButton>

                  {step < STEPS.length - 1 ? (
                    <CoopButton onClick={next} variant="primary" iconRight={ArrowRight}>
                      Continue
                    </CoopButton>
                  ) : (
                    <CoopButton onClick={handleSubmit(onSubmit)} variant="cta" iconRight={CheckCircle2}>
                      Create Cooperative
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

const titles: { title: string; subtitle: string }[] = [
  {
    title: "Name your cooperative",
    subtitle: "Choose a name your community will be proud to put on a warehouse, a signpost and a contract.",
  },
  {
    title: "Where is it based?",
    subtitle: "Location helps nearby farmers find you and determines which markets and buyers we introduce you to.",
  },
  {
    title: "What will you farm?",
    subtitle: "Select every crop, livestock or value-addition focus your members share.",
  },
  {
    title: "What are you achieving together?",
    subtitle: "Shared goals shape which tools AgroCoop puts front and centre for your members.",
  },
  {
    title: "Accept the cooperative principles",
    subtitle: "Seven principles, agreed by cooperatives worldwide for over 180 years.",
  },
  {
    title: "Review your cooperative",
    subtitle: "A final look before your cooperative goes live on the directory.",
  },
  {
    title: "Create your cooperative",
    subtitle: "Everything is ready. Let's bring your community together.",
  },
];
