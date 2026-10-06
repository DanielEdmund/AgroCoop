import type { Announcement, ActivityEvent, ForumPost, SuccessStory } from "@/lib/types";
import { images, memberPortraits } from "@/lib/images";
import { members } from "@/lib/data/members";

const M = (id: string) => members.find((m) => m.id === id)!;

const iso = (daysAgo: number) =>
  new Date(Date.now() - daysAgo * 86400000).toISOString();

export const forumPosts: ForumPost[] = [
  {
    id: "f1",
    title: "How we cut post-harvest losses from 35% to 9% (full playbook)",
    body: "Three seasons ago we were losing a third of every tomato harvest before it reached market. Here is the exact sequence that changed it: shared reefer truck, twice-daily harvest windows, and a grading station at the farm gate. Happy to answer questions.",
    author: M("m20"),
    category: "Post-Harvest",
    cooperativeId: "benue-vegetable-growers",
    createdAt: iso(2),
    comments: 34,
    likes: 128,
    pinned: true,
  },
  {
    id: "f2",
    title: "Bulk fertiliser purchase — who is joining the December order?",
    body: "We can lock in NPK 20-10-10 at ₦8,400/bag if we commit 1,800 bags by 5 December. Last time the bulk order saved members 26%. Indicate your quantity below and the treasurer will consolidate.",
    author: M("m12"),
    category: "Collective Buying",
    cooperativeId: "oyo-maize-collective",
    createdAt: iso(3),
    comments: 61,
    likes: 214,
  },
  {
    id: "f3",
    title: "Chairperson election: nominations open until Friday",
    body: "Per our by-laws, nominations for chairperson and treasurer close Friday 5pm. Any full member in good standing may stand. Manifestos will be posted in this thread and debated at Saturday's general meeting.",
    author: M("m16"),
    category: "Governance",
    cooperativeId: "cross-river-cocoa-unity",
    createdAt: iso(4),
    comments: 47,
    likes: 96,
    pinned: true,
  },
  {
    id: "f4",
    title: "Deal alert: buyer wants 400t of red sorghum — we have 150t",
    body: "A brewery buyer approached the coop directly. We can cover 150t but the neighbouring Adamawa coops could fill the rest collectively. Proposing a joint contract with revenue split by delivered tonnage.",
    author: M("m48"),
    category: "Market Access",
    cooperativeId: "adamawa-sorghum-growers",
    createdAt: iso(5),
    comments: 22,
    likes: 87,
  },
  {
    id: "f5",
    title: "Solar pump aftercare — 6 months of running numbers",
    body: "Six months in: fuel spend down 78%, pump uptime 96%. Full cost breakdown and the maintenance schedule we follow every Monday morning attached. This was the best vote this coop has taken.",
    author: M("m24"),
    category: "Equipment",
    cooperativeId: "kaduna-irrigated-union",
    createdAt: iso(7),
    comments: 29,
    likes: 143,
  },
  {
    id: "f6",
    title: "Women's wing marketing desk — first quarter results",
    body: "The women's wing ran the cowpea marketing desk alone this quarter and achieved 14% above the price the men's committee got last year. Sharing our price-tracking sheet so every member can see it.",
    author: M("m33"),
    category: "Market Access",
    cooperativeId: "plateau-cowpea-producers",
    createdAt: iso(9),
    comments: 38,
    likes: 176,
  },
  {
    id: "f7",
    title: "Sharing our oxen ploughing roster template",
    body: "Everyone asks how we schedule two oxen teams across 231 members without arguments. The secret is a public roster with fixed time slots and a two-person dispute panel. Template in the reply.",
    author: M("m28"),
    category: "Equipment",
    cooperativeId: "nsukka-yam-farmers",
    createdAt: iso(11),
    comments: 18,
    likes: 91,
  },
  {
    id: "f8",
    title: "Anyone tried hermetic bags on cowpea over 8 months?",
    body: "Considering switching from chemical treatment to hermetic storage for the whole warehouse. Would love to hear from coops who have run a full 8-month cycle — what were the real losses?",
    author: M("m35"),
    category: "Post-Harvest",
    cooperativeId: "plateau-cowpea-producers",
    createdAt: iso(13),
    comments: 26,
    likes: 64,
  },
  {
    id: "f9",
    title: "New member induction: how do you run yours?",
    body: "We onboarded 12 members last month and want to improve. What does your 90-day induction cover? Especially interested in how you teach democratic participation early.",
    author: M("m47"),
    category: "Governance",
    cooperativeId: "lagos-urban-farmers",
    createdAt: iso(15),
    comments: 41,
    likes: 73,
  },
];

export const announcements: Announcement[] = [
  { id: "a1", title: "General meeting — Saturday 10am at the coop hall", body: "Agenda: tractor vote, by-law review and harvest plan. Attendance counts toward your participation credit.", author: M("m12"), cooperativeId: "oyo-maize-collective", createdAt: iso(0), priority: "urgent" },
  { id: "a2", title: "Fertiliser bulk order closes 5 December", body: "Register quantities with the treasurer before Friday to lock in the group price.", author: M("m6"), cooperativeId: "kebbi-rice-alliance", createdAt: iso(1), priority: "important" },
  { id: "a3", title: "New member applicants: 45 from Ughelli now open for vote", body: "Review their profiles in the membership portal before voting closes in 6 days.", author: M("m4"), cooperativeId: "niger-delta-cassava", createdAt: iso(2), priority: "normal" },
  { id: "a4", title: "Warehouse fumigation schedule published", body: "Slots for next month are open — book your pallet space in the resources section.", author: M("m33"), cooperativeId: "plateau-cowpea-producers", createdAt: iso(4), priority: "normal" },
];

export const activity: ActivityEvent[] = [
  { id: "ac1", type: "vote", title: "New vote opened", detail: "Purchase a shared 50HP tractor for the dry season", actor: "Folasade Ojo", createdAt: iso(0) },
  { id: "ac2", type: "market", title: "Collective sale listed", detail: "180 tonnes of yellow maize listed at ₦412,000/tonne", actor: "Oyo State Maize Collective", createdAt: iso(0) },
  { id: "ac3", type: "member", title: "3 new members approved", detail: "Induction scheduled for next Saturday's general meeting", actor: "Ifeoma Nwachukwu", createdAt: iso(1) },
  { id: "ac4", type: "resource", title: "Tractor booked", detail: "50HP tractor + plough booked for 3 days starting Tuesday", actor: "Sadiq Usman", createdAt: iso(1) },
  { id: "ac5", type: "learning", title: "Course completed", detail: "Soil Health & Fertiliser Planning — certificate issued", actor: "You", createdAt: iso(2) },
  { id: "ac6", type: "community", title: "Discussion trending", detail: "“Bulk fertiliser purchase — who is joining?” 61 replies", actor: "Folasade Ojo", createdAt: iso(3) },
  { id: "ac7", type: "vote", title: "Vote concluded", detail: "Adopt by-law requiring quarterly open accounts — passed 88%", actor: "Returning Officer", createdAt: iso(4) },
  { id: "ac8", type: "market", title: "Payment received", detail: "₦18.5M from Bodija Feed Mills settled to 46 member accounts", actor: "Coop Treasury", createdAt: iso(5) },
  { id: "ac9", type: "resource", title: "New resource added", detail: "Maize sheller & cleaner now bookable by all members", actor: "Tunde Balogun", createdAt: iso(6) },
  { id: "ac10", type: "member", title: "Milestone reached", detail: "Coop crossed 274 active members this season", actor: "Adebayo Ogundele", createdAt: iso(8) },
];

export const successStories: SuccessStory[] = [
  {
    id: "s1",
    name: "Mrs. Ngozi Adeyemi",
    role: "Treasurer",
    cooperative: "Niger Delta Cassava Farmers Coop",
    location: "Patani, Delta State",
    image: images.farmerWoman,
    quote:
      "Before the coop I sold at whatever price the buyer named at my gate. Now we set the price together — and we do not accept less than the committee's floor.",
    achievement: "Collective bargaining lifted her farm income by 64% in three seasons",
    metric: "+64%",
    metricLabel: "Farm income",
  },
  {
    id: "s2",
    name: "Alhaji Musa Danjuma",
    role: "Chairperson",
    cooperative: "Kebbi Rice Growers Alliance",
    location: "Bunza, Kebbi State",
    image: images.farmerHat,
    quote:
      "One voice, one price. When 586 rice farmers walk into a negotiation together, the miller listens. That is the whole story of this cooperative.",
    achievement: "Secured a ₦45,000 per tonne price premium for members",
    metric: "₦45K",
    metricLabel: "Premium / tonne",
  },
  {
    id: "s3",
    name: "Doosuur Tyav",
    role: "Logistics Organizer",
    cooperative: "Benue Vegetable Growers Coop",
    location: "Makurdi, Benue State",
    image: images.farmerCorn,
    quote:
      "We used to watch our tomatoes rot because nobody could afford the truck alone. Together we hire the reefer, and the greens reach Lagos in 36 hours.",
    achievement: "Post-harvest losses cut from 35% to 9%",
    metric: "9%",
    metricLabel: "Post-harvest loss",
  },
  {
    id: "s4",
    name: "Amina Balarabe",
    role: "Chairperson",
    cooperative: "Kaduna Irrigated Farms Union",
    location: "Zaria, Kaduna State",
    image: images.farmerHeadscarf,
    quote:
      "The water roster is written on the wall and everyone can see it. Fair water means fair harvest — and women chair half of the committees now.",
    achievement: "Dry-season harvest up 72% since the solar pump vote",
    metric: "+72%",
    metricLabel: "Dry-season yield",
  },
  {
    id: "s5",
    name: "Chief Emeka Obiora",
    role: "Chairperson",
    cooperative: "Niger Delta Cassava Farmers Coop",
    location: "Patani, Delta State",
    image: images.farmerRadio,
    quote:
      "When I was young, a farmer stood alone against the market. Today our children inherit a cooperative with a mill, a warehouse and a vote.",
    achievement: "Grew the coop from 40 to 412 members in a decade",
    metric: "412",
    metricLabel: "Members",
  },
  {
    id: "s6",
    name: "Philomena Osagie",
    role: "Chairperson",
    cooperative: "Edo Fruits & Spices Collective",
    location: "Benin City, Edo State",
    image: images.farmerStraw,
    quote:
      "We are only 121 farmers, but we graded, packed and exported as one company. The buyer did not care how small we were individually.",
    achievement: "Completed the collective's first export order",
    metric: "2.1x",
    metricLabel: "Farm-gate price",
  },
];

export const impactStats = [
  { value: 12500, suffix: "+", label: "Farmers united", detail: "across 36 states" },
  { value: 240, suffix: "+", label: "Cooperatives", detail: "community-owned" },
  { value: 185, prefix: "₦", suffix: "M+", label: "Trade volume", detail: "settled member-to-member" },
  { value: 36000, suffix: "+", label: "Resources shared", detail: "equipment, storage & knowledge" },
];
