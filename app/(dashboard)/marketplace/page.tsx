"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  Bookmark,
  BookmarkCheck,
  BadgeCheck,
  CheckCircle2,
  Handshake,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";
import { PageHeader, Panel } from "@/components/layout/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { Modal, Field } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { buyers, collectiveSales, listings } from "@/lib/data/marketplace";
import { currentUser } from "@/lib/data/members";
import { getCooperative } from "@/lib/data/cooperatives";
import { useCoopStore } from "@/lib/store";
import { images } from "@/lib/images";
import { formatNaira, cn } from "@/lib/utils";
import type { Buyer, Listing } from "@/lib/types";

type ModalKind = "list" | "collective" | "propose" | "contact" | null;

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("All");
  const [onlyCollective, setOnlyCollective] = useState(false);
  const [modal, setModal] = useState<ModalKind>(null);
  const [activeBuyer, setActiveBuyer] = useState<Buyer | null>(null);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);

  const bookmarks = useCoopStore((s) => s.bookmarkedListings);
  const toggleBookmark = useCoopStore((s) => s.toggleBookmark);
  const myListings = useCoopStore((s) => s.myListings);
  const mySales = useCoopStore((s) => s.myCollectiveSales);
  const joinedSales = useCoopStore((s) => s.joinedSales);
  const toggleJoinSale = useCoopStore((s) => s.toggleJoinSale);

  const allListings = useMemo(() => [...myListings, ...listings], [myListings]);
  const allSales = useMemo(() => [...mySales, ...collectiveSales], [mySales]);

  const filtered = useMemo(
    () =>
      allListings.filter((l) => {
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          l.title.toLowerCase().includes(q) ||
          l.crop.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.seller.toLowerCase().includes(q);
        const matchGrade = grade === "All" || l.grade === grade;
        const matchCollective = !onlyCollective || l.collective;
        return matchQ && matchGrade && matchCollective;
      }),
    [allListings, query, grade, onlyCollective]
  );

  const totalValue = allListings.reduce((sum, l) => {
    const qty = parseFloat(l.quantity.replace(/,/g, ""));
    return sum + (isNaN(qty) ? 0 : qty) * l.pricePerUnit;
  }, 0);

  const openContact = (listing: Listing) => {
    setActiveListing(listing);
    setModal("contact");
  };

  const handleJoinSale = (listing: Listing) => {
    const joined = joinedSales.includes(listing.id);
    toggleJoinSale(listing.id);
    if (joined) {
      toast.info("Left the sale", `You withdrew from “${listing.title}”.`);
    } else {
      toast.success("Joined the collective sale", `Your tonnage was added to “${listing.title}”.`);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Collective marketplace"
        title="Sell Together, Earn More"
        description="List your harvest alongside your cooperative, match with verified bulk buyers and settle straight into member accounts."
        actions={
          <CoopButton variant="cta" icon={Handshake} onClick={() => setModal("collective")}>
            Sell Collectively
          </CoopButton>
        }
      />

      {/* Stats band */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Listed value", value: formatNaira(totalValue, true), icon: TrendingUp, tone: "bg-coop-blue/10 text-coop-blue" },
          { label: "Active listings", value: allListings.length, icon: Star, tone: "bg-coop-gold/10 text-coop-gold" },
          { label: "Verified buyers", value: buyers.filter((b) => b.verified).length, icon: BadgeCheck, tone: "bg-coop-green/10 text-coop-green" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft">
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", s.tone)}>
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 font-display text-2xl font-semibold text-coop-earth">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Sell collectively CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-6 overflow-hidden rounded-2xl bg-coop-gold p-6 sm:p-8"
      >
        <div className="absolute inset-0 bg-dots-sand bg-[length:24px_24px] opacity-20" aria-hidden />
        <div className="relative flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <Users className="h-3.5 w-3.5" /> {allSales.length} pools open now
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
              Sell Collectively
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              Combine your harvest with neighbouring farms to reach minimum volumes buyers demand —
              coops running collective sales average 9–18% above individual farm-gate prices.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CoopButton variant="earth" size="lg" onClick={() => setModal("collective")}>
              Start a collective sale
            </CoopButton>
            <CoopButton
              size="lg"
              className="border border-white/40 bg-white/15 text-white shadow-none hover:bg-white/25"
              onClick={() => setModal("list")}
            >
              List produce
            </CoopButton>
          </div>
        </div>

        <div className="relative mt-6 grid gap-3 lg:grid-cols-3">
          {allSales.map((sale) => (
            <div key={sale.id} className="rounded-xl bg-white/95 p-4 backdrop-blur">
              <p className="text-sm font-bold text-coop-earth">{sale.title}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-coop-coral">
                  <span className="h-1.5 w-1.5 animate-slow-pulse rounded-full bg-coop-coral" />
                  {sale.closing}
                </span>
                <span className="font-bold text-coop-green">{sale.premium}</span>
              </div>
              <p className="mt-1 text-[11px] text-sand-500">{sale.members} cooperatives involved</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <Panel className="mt-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search produce, seller or location…"
              className="h-11 w-full rounded-xl border border-coop-sand-dark bg-coop-sand/60 pl-11 pr-4 text-sm focus:border-coop-blue/50 focus:outline-none focus:ring-2 focus:ring-coop-blue/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Grade A", "Grade B", "Export"].map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all",
                  grade === g
                    ? "border-coop-blue bg-coop-blue text-white"
                    : "border-coop-sand-dark bg-white text-sand-600 hover:border-coop-blue/40"
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-coop-earth">
            <input
              type="checkbox"
              checked={onlyCollective}
              onChange={(e) => setOnlyCollective(e.target.checked)}
              className="h-4 w-4 accent-[#78716C]"
            />
            Collective sales only
          </label>
        </div>
      </Panel>

      <Tabs defaultValue="produce" className="mt-6">
        <TabsList>
          <TabsTrigger value="produce">Produce listings ({filtered.length})</TabsTrigger>
          <TabsTrigger value="buyers">Bulk buyers ({buyers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="produce">
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" staggerDelay={0.08}>
            {filtered.map((l) => {
              const saved = bookmarks.includes(l.id);
              const coop = getCooperative(l.cooperativeId);
              const isJoined = joinedSales.includes(l.id);
              return (
                <StaggerItem key={l.id}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-coop-sand-dark/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={l.image}
                        alt={l.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/65 to-transparent" />
                      <button
                        onClick={() => toggleBookmark(l.id)}
                        aria-label={saved ? "Remove bookmark" : "Bookmark listing"}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-coop-gold transition-transform hover:scale-110"
                      >
                        {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      </button>
                      <div className="absolute left-3 top-3 flex gap-2">
                        <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-coop-earth">
                          {l.grade}
                        </span>
                        {l.collective && (
                          <span className="rounded-full bg-coop-gold px-2.5 py-1 text-[11px] font-bold text-white">
                            Collective
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white">
                          <MapPin className="h-3 w-3 text-coop-gold" /> {l.location}
                        </span>
                        {l.verified && <BadgeCheck className="h-4 w-4 text-coop-green" />}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-coop-blue">
                        {l.crop}
                      </p>
                      <h3 className="mt-1 font-display text-base font-semibold text-coop-earth">
                        {l.title}
                      </h3>
                      <p className="mt-1 text-xs text-sand-500">{l.seller}</p>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                        <div className="rounded-lg bg-coop-sand p-2">
                          <p className="font-bold text-coop-earth">
                            {l.quantity} {l.unit}
                          </p>
                          <p className="text-[10px] text-sand-500">Available</p>
                        </div>
                        <div className="rounded-lg bg-coop-sand p-2">
                          <p className="font-bold text-coop-earth">{l.minOrder}</p>
                          <p className="text-[10px] text-sand-500">Min order</p>
                        </div>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-3 border-t border-coop-sand-dark/70 pt-4">
                        <div>
                          <p className="font-display text-lg font-semibold text-coop-earth">
                            {formatNaira(l.pricePerUnit)}
                          </p>
                          <p className="text-[11px] text-sand-500">per {l.unit.replace(/s$/, "")}</p>
                        </div>
                        <CoopButton
                          size="sm"
                          variant={l.collective ? (isJoined ? "success" : "cta") : "primary"}
                          icon={l.collective && isJoined ? CheckCircle2 : undefined}
                          onClick={() => (l.collective ? handleJoinSale(l) : openContact(l))}
                        >
                          {l.collective
                            ? isJoined
                              ? "Joined"
                              : "Join sale"
                            : "Contact seller"}
                        </CoopButton>
                      </div>
                      <p className="mt-2 text-[11px] text-sand-400">
                        Harvested {new Date(l.harvestDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })} ·{" "}
                        {coop?.state}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="buyers">
          <StaggerContainer className="grid gap-4 md:grid-cols-2" staggerDelay={0.08}>
            {buyers.map((b) => (
              <StaggerItem key={b.id}>
                <div className="rounded-xl border border-coop-sand-dark/70 bg-white p-5 shadow-soft transition-shadow hover:shadow-lift">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold text-coop-earth">{b.company}</p>
                      <p className="text-xs text-sand-500">
                        {b.type} · {b.location}
                      </p>
                    </div>
                    {b.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-coop-blue px-2.5 py-1 text-[10px] font-bold text-white">
                        <BadgeCheck className="h-3 w-3" /> Verified
                      </span>
                    ) : (
                      <span className="rounded-full bg-coop-sand px-2.5 py-1 text-[10px] font-bold text-sand-500">
                        Unverified
                      </span>
                    )}
                  </div>

                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-sand-500">Looking for</dt>
                      <dd className="font-semibold text-coop-earth">{b.lookingFor}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-sand-500">Volume</dt>
                      <dd className="font-semibold text-coop-earth">{b.volume}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-sand-500">Offer</dt>
                      <dd className="font-semibold text-coop-green">{b.price}</dd>
                    </div>
                  </dl>

                  <CoopButton
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => {
                      setActiveBuyer(b);
                      setModal("propose");
                    }}
                  >
                    Propose a collective supply
                  </CoopButton>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </TabsContent>
      </Tabs>

      {/* Mock creation flows */}
      <Modal
        open={modal === "list"}
        onClose={() => setModal(null)}
        title="List your produce"
        description="Publish to the cooperative marketplace — mock data, nothing leaves your browser."
      >
        <ListProduceForm onClose={() => setModal(null)} />
      </Modal>

      <Modal
        open={modal === "collective"}
        onClose={() => setModal(null)}
        title="Start a collective sale"
        description="Pool tonnage with neighbouring farms before you quote a price."
      >
        <CollectiveSaleForm onClose={() => setModal(null)} />
      </Modal>

      <Modal
        open={modal === "contact"}
        onClose={() => setModal(null)}
        title={activeListing ? `Contact ${activeListing.seller}` : "Contact seller"}
        description={activeListing?.title}
      >
        {activeListing && <ContactSellerForm listing={activeListing} onClose={() => setModal(null)} />}
      </Modal>

      <Modal
        open={modal === "propose"}
        onClose={() => setModal(null)}
        title="Propose a collective supply"
        description={activeBuyer ? `${activeBuyer.company} · wants ${activeBuyer.lookingFor}` : undefined}
        size="lg"
      >
        {activeBuyer && <ProposeSupplyForm buyer={activeBuyer} onClose={() => setModal(null)} />}
      </Modal>
    </>
  );
}

function FormActions({ onClose, label }: { onClose: () => void; label: string }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
      <CoopButton type="button" variant="ghost" onClick={onClose}>
        Cancel
      </CoopButton>
      <CoopButton type="submit" variant="cta" iconRight={ArrowRight}>
        {label}
      </CoopButton>
    </div>
  );
}

function ListProduceForm({ onClose }: { onClose: () => void }) {
  const addListing = useCoopStore((s) => s.addListing);
  const [form, setForm] = useState({
    title: "",
    crop: "",
    quantity: "",
    unit: "tonnes",
    price: "",
    grade: "Grade A",
    location: `${currentUser.location}, Oyo`,
    minOrder: "1 tonne",
    collective: true,
  });

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.crop.trim() || !form.quantity.trim() || !form.price.trim()) {
      toast.error("Missing details", "Title, crop, quantity and price are required.");
      return;
    }
    const listing: Listing = {
      id: `my-${Date.now()}`,
      title: form.title.trim(),
      crop: form.crop.trim(),
      cooperativeId: currentUser.cooperativeId,
      location: form.location.trim() || currentUser.location,
      quantity: form.quantity.trim(),
      unit: form.unit,
      pricePerUnit: Number(form.price) || 0,
      minOrder: form.minOrder.trim() || `1 ${form.unit.replace(/s$/, "")}`,
      grade: form.grade as Listing["grade"],
      seller: currentUser.cooperativeName,
      image: images.marketBaskets,
      collective: form.collective,
      verified: true,
      harvestDate: new Date().toISOString().slice(0, 10),
    };
    addListing(listing);
    toast.success("Listing published", `“${listing.title}” is live in the marketplace.`);
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Listing title">
        <Input
          value={form.title}
          onChange={update("title")}
          placeholder="e.g. Yellow Maize (Harvest 2026)"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Crop">
          <Input value={form.crop} onChange={update("crop")} placeholder="Maize" />
        </Field>
        <Field label="Quantity">
          <Input
            value={form.quantity}
            onChange={update("quantity")}
            placeholder="180"
            inputMode="numeric"
          />
        </Field>
        <Field label="Unit">
          <Select value={form.unit} onChange={update("unit")}>
            {["tonnes", "bags", "crates", "heads", "kg"].map((u) => (
              <option key={u}>{u}</option>
            ))}
          </Select>
        </Field>
        <Field label="Price per unit (₦)">
          <Input
            value={form.price}
            onChange={update("price")}
            placeholder="412000"
            inputMode="numeric"
          />
        </Field>
        <Field label="Grade">
          <Select value={form.grade} onChange={update("grade")}>
            {["Grade A", "Grade B", "Export"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </Select>
        </Field>
        <Field label="Min order">
          <Input value={form.minOrder} onChange={update("minOrder")} placeholder="10 tonnes" />
        </Field>
      </div>
      <Field label="Location">
        <Input value={form.location} onChange={update("location")} />
      </Field>
      <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-coop-sand-dark bg-coop-sand/60 p-3.5 text-sm font-semibold text-coop-earth">
        <input
          type="checkbox"
          checked={form.collective}
          onChange={(e) => setForm((f) => ({ ...f, collective: e.target.checked }))}
          className="h-4 w-4 accent-[#059669]"
        />
        Offer this as part of a collective sale
      </label>
      <FormActions onClose={onClose} label="Publish listing" />
    </form>
  );
}

function CollectiveSaleForm({ onClose }: { onClose: () => void }) {
  const addCollectiveSale = useCoopStore((s) => s.addCollectiveSale);
  const [title, setTitle] = useState("");
  const [tonnage, setTonnage] = useState("");
  const [days, setDays] = useState("7");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tonnage.trim()) {
      toast.error("Missing details", "Give the pool a name and a tonnage target.");
      return;
    }
    addCollectiveSale({
      id: `cs-${Date.now()}`,
      title: `${title.trim()} — ${tonnage.trim()} target`,
      closing: `Closes in ${days} days`,
      premium: "+12% vs farm-gate",
      members: 1,
    });
    toast.success("Collective sale opened", "Neighbouring coops can now add their tonnage.");
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Pool name" hint="Shown to every member browsing the marketplace.">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Maize cluster — Oyo & Osun"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tonnage target">
          <Input
            value={tonnage}
            onChange={(e) => setTonnage(e.target.value)}
            placeholder="540 tonnes"
          />
        </Field>
        <Field label="Closes in">
          <Select value={days} onChange={(e) => setDays(e.target.value)}>
            {["3", "5", "7", "10", "14"].map((d) => (
              <option key={d} value={d}>
                {d} days
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="rounded-xl border border-coop-gold/30 bg-coop-gold-light/70 p-4 text-xs leading-relaxed text-sand-600">
        Co-ops running collective sales average 9–18% above individual farm-gate prices. The
        committee is notified the moment the pool closes.
      </div>
      <FormActions onClose={onClose} label="Open the pool" />
    </form>
  );
}

function ContactSellerForm({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const [message, setMessage] = useState(
    `Hello ${listing.seller}, we would like to buy from your listing “${listing.title}”. `
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 10) {
      toast.error("Message too short", "Add a little more detail for the seller.");
      return;
    }
    toast.success("Message sent", `${listing.seller} usually replies within 12 hours.`);
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="rounded-xl bg-coop-sand/70 p-4 text-sm">
        <p className="font-bold text-coop-earth">{listing.title}</p>
        <p className="mt-1 text-xs text-sand-500">
          {listing.quantity} {listing.unit} · {listing.minOrder} minimum · {listing.location}
        </p>
      </div>
      <Field label="Your message">
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} />
      </Field>
      <FormActions onClose={onClose} label="Send message" />
    </form>
  );
}

function ProposeSupplyForm({ buyer, onClose }: { buyer: Buyer; onClose: () => void }) {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity.trim() || !price.trim()) {
      toast.error("Missing details", "Add the quantity you can supply and your asking price.");
      return;
    }
    toast.success("Proposal sent", `${buyer.company} will respond through your coop's committee.`);
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="rounded-xl bg-coop-blue/10 p-4 text-sm">
        <p className="font-bold text-coop-earth">{buyer.company}</p>
        <p className="mt-1 text-xs text-sand-500">
          {buyer.type} · {buyer.location} · wants {buyer.lookingFor} ({buyer.volume}) at {buyer.price}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Quantity you can supply">
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="600 tonnes / quarter"
          />
        </Field>
        <Field label="Your asking price">
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="₦412,000 / tonne"
          />
        </Field>
      </div>
      <Field label="Note to the buyer" hint="Optional — delivery window, grading, logistics.">
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} />
      </Field>
      <FormActions onClose={onClose} label="Send proposal" />
    </form>
  );
}

