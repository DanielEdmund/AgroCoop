"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, CheckCircle2, Wrench, CalendarClock } from "lucide-react";
import { PageHeader, Panel } from "@/components/layout/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { Modal, Field } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { resources, resourceCategories } from "@/lib/data/resources";
import { currentUser } from "@/lib/data/members";
import { getCooperative } from "@/lib/data/cooperatives";
import { useCoopStore } from "@/lib/store";
import { images } from "@/lib/images";
import { formatNaira, cn, timeAgo } from "@/lib/utils";
import type { Resource, ResourceCategory, ResourceRequest } from "@/lib/types";

const availabilityTone: Record<Resource["availability"], string> = {
  available: "bg-coop-green-light text-coop-green",
  "in-use": "bg-coop-gold-light text-coop-gold",
  maintenance: "bg-coop-coral-light text-coop-coral",
};

const availabilityLabel: Record<Resource["availability"], string> = {
  available: "Available now",
  "in-use": "In use",
  maintenance: "Maintenance",
};

export default function ResourcesPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [modal, setModal] = useState<"request" | "list" | null>(null);
  const booked = useCoopStore((s) => s.bookedResources);
  const bookResource = useCoopStore((s) => s.bookResource);
  const myResources = useCoopStore((s) => s.myResources);
  const myRequests = useCoopStore((s) => s.myResourceRequests);

  const allResources = useMemo(() => [...myResources, ...resources], [myResources]);

  const filtered = useMemo(
    () =>
      allResources.filter((r) => {
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q);
        const matchCat = category === "All" || r.category === category;
        const matchAvail = !onlyAvailable || r.availability === "available";
        return matchQ && matchCat && matchAvail;
      }),
    [allResources, category, query, onlyAvailable]
  );

  const summary = [
    { label: "Shared resources", value: allResources.length },
    { label: "Available now", value: allResources.filter((r) => r.availability === "available").length },
    { label: "Your bookings", value: booked.length },
    { label: "Categories", value: resourceCategories.length },
  ];

  const handleBook = (resource: Resource, isBooked: boolean) => {
    bookResource(resource.id);
    if (isBooked) {
      toast.info("Booking released", `${resource.name} is open for other members again.`);
      return;
    }
    toast.success(
      resource.availability === "available" ? "Resource booked" : "Added to the waitlist",
      `${resource.name} — the owner confirms within 12 hours.`
    );
  };

  return (
    <>
      <PageHeader
        eyebrow="Shared equipment, storage & irrigation"
        title="Resource Pool"
        description="Tractors, harvesters, warehouses and processing lines owned collectively — booked by the hour, the day or the season."
        actions={
          <CoopButton variant="cta" icon={Wrench} onClick={() => setModal("request")}>
            Request a resource
          </CoopButton>
        }
      />

      <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4" staggerDelay={0.08}>
        {summary.map((s) => (
          <StaggerItem key={s.label}>
            <div className="rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft">
              <p className="font-display text-2xl font-semibold text-coop-earth">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">{s.label}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Your requests */}
      {myRequests.length > 0 && (
        <Panel
          className="mt-6"
          title={`Your requests (${myRequests.length})`}
          action={
            <span className="text-xs font-bold text-coop-blue">Owner confirms within 12 hours</span>
          }
        >
          <ul className="space-y-3">
            {myRequests.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-coop-sand-dark/70 bg-coop-sand/60 p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-coop-earth">{r.title}</p>
                  <p className="mt-0.5 text-xs text-sand-500">{r.detail}</p>
                  <p className="mt-1 text-[11px] text-sand-400">
                    {r.category} · {r.location} · {r.date} · {timeAgo(r.createdAt)}
                  </p>
                </div>
                <span className="rounded-full bg-coop-gold-light px-2.5 py-1 text-[11px] font-bold uppercase text-coop-gold">
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {/* Filters */}
      <Panel className="mt-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search equipment, storage, location…"
              className="h-11 w-full rounded-xl border border-coop-sand-dark bg-coop-sand/60 pl-11 pr-4 text-sm focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", ...resourceCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
                  category === cat
                    ? "border-coop-blue bg-coop-blue text-white shadow-coop-blue"
                    : "border-coop-sand-dark bg-white text-sand-600 hover:border-coop-blue/40 hover:text-coop-blue"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-coop-earth">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="h-4 w-4 accent-[#059669]"
            />
            Available only
          </label>
        </div>
      </Panel>

      {/* Grid */}
      <StaggerContainer className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" staggerDelay={0.08}>
        {filtered.map((r) => {
          const coop = getCooperative(r.cooperativeId);
          const isBooked = booked.includes(r.id);
          return (
            <StaggerItem key={r.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-coop-sand-dark/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/70 to-transparent" />
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold",
                      availabilityTone[r.availability]
                    )}
                  >
                    {availabilityLabel[r.availability]}
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-coop-earth">
                    {r.category}
                  </span>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-coop-gold px-2.5 py-1 text-[11px] font-bold text-white">
                    <Star className="h-3 w-3 fill-current" /> {r.rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold text-coop-earth">{r.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-sand-500">
                    {r.description}
                  </p>

                  <p className="mt-3 flex items-center gap-1.5 text-xs text-sand-500">
                    <MapPin className="h-3.5 w-3.5 text-coop-coral" /> {r.location} ·{" "}
                    {coop?.name ?? r.owner}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-coop-sand-dark/70 pt-4">
                    <div>
                      <p className="font-display text-lg font-semibold text-coop-earth">
                        {formatNaira(r.rate)}
                        <span className="text-xs font-medium text-sand-500"> / {r.rateUnit}</span>
                      </p>
                      <p className="text-[11px] text-sand-500">{r.bookings} bookings to date</p>
                    </div>

                    <CoopButton
                      size="sm"
                      variant={isBooked ? "success" : r.availability === "available" ? "primary" : "outline"}
                      disabled={r.availability === "maintenance"}
                      onClick={() => handleBook(r, isBooked)}
                      icon={isBooked ? CheckCircle2 : CalendarClock}
                    >
                      {isBooked
                        ? "Booked"
                        : r.availability === "available"
                          ? "Book now"
                          : r.availability === "in-use"
                            ? "Join waitlist"
                            : "Unavailable"}
                    </CoopButton>
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-dashed border-coop-sand-dark bg-coop-sand/60 p-12 text-center"
        >
          <p className="font-display text-lg font-semibold text-coop-earth">No resources match</p>
          <p className="mt-1 text-sm text-sand-500">Try another category or clear your search.</p>
          <CoopButton
            className="mt-5"
            variant="outline"
            onClick={() => {
              setCategory("All");
              setQuery("");
              setOnlyAvailable(false);
            }}
          >
            Reset filters
          </CoopButton>
        </motion.div>
      )}

      <Tabs defaultValue="how" className="mt-8">
        <TabsList>
          <TabsTrigger value="how">How booking works</TabsTrigger>
          <TabsTrigger value="own">Add your coop's asset</TabsTrigger>
        </TabsList>
        <TabsContent value="how">
          <Panel>
            <ol className="grid gap-4 sm:grid-cols-4">
              {[
                "Find the resource you need",
                "Pick dates and send a request",
                "Owner confirms within 12 hours",
                "Collect, use, return — rate the service",
              ].map((s, i) => (
                <li key={s} className="rounded-xl bg-coop-sand p-4 text-sm">
                  <span className="font-display text-lg font-semibold text-coop-blue">0{i + 1}</span>
                  <p className="mt-1 font-semibold text-coop-earth">{s}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </TabsContent>
        <TabsContent value="own">
          <Panel>
            <p className="text-sm leading-relaxed text-sand-600">
              Cooperatives can list tractors, warehouses, mills and vehicles for members to book.
              Revenue from bookings flows into the coop's shared fund and is reported in the open
              accounts every quarter.
            </p>
            <CoopButton variant="cta" className="mt-4" onClick={() => setModal("list")}>
              List a resource for your cooperative
            </CoopButton>
          </Panel>
        </TabsContent>
      </Tabs>

      <Modal
        open={modal === "request"}
        onClose={() => setModal(null)}
        title="Request a resource"
        description="Tell the cooperative what you need — the owner is notified straight away."
      >
        <ResourceRequestForm onClose={() => setModal(null)} />
      </Modal>

      <Modal
        open={modal === "list"}
        onClose={() => setModal(null)}
        title="List a resource"
        description="Add your coop's asset so members can book it by the day or season."
      >
        <ListResourceForm onClose={() => setModal(null)} />
      </Modal>
    </>
  );
}

function ResourceRequestForm({ onClose }: { onClose: () => void }) {
  const addRequest = useCoopStore((s) => s.addResourceRequest);
  const [form, setForm] = useState({
    title: "",
    category: "Tractor" as ResourceCategory | "Other",
    date: "",
    location: currentUser.location,
    detail: "",
  });

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.detail.trim()) {
      toast.error("Missing details", "Say what you need and when you need it.");
      return;
    }
    const request: ResourceRequest = {
      id: `req-${Date.now()}`,
      title: form.title.trim(),
      category: form.category,
      detail: form.detail.trim(),
      date: form.date ? new Date(form.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "This week",
      location: form.location.trim() || currentUser.location,
      owner: currentUser.name,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    addRequest(request);
    toast.success("Request submitted", "The resource owner will confirm within 12 hours.");
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="What do you need?">
        <Input
          value={form.title}
          onChange={update("title")}
          placeholder="e.g. 50HP tractor with plough"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <Select value={form.category} onChange={update("category")}>
            {[...resourceCategories, "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Preferred date">
          <Input type="date" value={form.date} onChange={update("date")} />
        </Field>
      </div>
      <Field label="Location">
        <Input value={form.location} onChange={update("location")} />
      </Field>
      <Field label="Details" hint="Dates, duration, what it is for.">
        <Textarea
          value={form.detail}
          onChange={update("detail")}
          rows={4}
          placeholder="Needed for 3 days starting Tuesday to plough 12 hectares…"
        />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <CoopButton type="button" variant="ghost" onClick={onClose}>
          Cancel
        </CoopButton>
        <CoopButton type="submit" variant="cta" icon={Wrench}>
          Send request
        </CoopButton>
      </div>
    </form>
  );
}

function ListResourceForm({ onClose }: { onClose: () => void }) {
  const addResource = useCoopStore((s) => s.addResource);
  const [form, setForm] = useState({
    name: "",
    category: "Tractor" as ResourceCategory,
    rate: "",
    rateUnit: "day" as "day" | "week" | "season",
    location: currentUser.location,
    description: "",
  });

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.rate.trim() || !form.description.trim()) {
      toast.error("Missing details", "Name, daily rate and a short description are required.");
      return;
    }
    addResource({
      id: `res-${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      cooperativeId: currentUser.cooperativeId,
      location: form.location.trim() || currentUser.location,
      description: form.description.trim(),
      image: images.resourceTractor,
      rate: Number(form.rate) || 0,
      rateUnit: form.rateUnit,
      availability: "available",
      owner: currentUser.name,
      rating: 5,
      bookings: 0,
    });
    toast.success("Resource listed", `${form.name.trim()} is now bookable by every member.`);
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Resource name">
        <Input value={form.name} onChange={update("name")} placeholder="e.g. Maize sheller & cleaner" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <Select value={form.category} onChange={update("category")}>
            {resourceCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Rate (₦)">
          <Input value={form.rate} onChange={update("rate")} placeholder="25000" inputMode="numeric" />
        </Field>
        <Field label="Per">
          <Select value={form.rateUnit} onChange={update("rateUnit")}>
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="season">season</option>
          </Select>
        </Field>
        <Field label="Location">
          <Input value={form.location} onChange={update("location")} />
        </Field>
      </div>
      <Field label="Description">
        <Textarea
          value={form.description}
          onChange={update("description")}
          rows={4}
          placeholder="Condition, attachments, pickup point…"
        />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <CoopButton type="button" variant="ghost" onClick={onClose}>
          Cancel
        </CoopButton>
        <CoopButton type="submit" variant="cta" icon={Wrench}>
          List resource
        </CoopButton>
      </div>
    </form>
  );
}
