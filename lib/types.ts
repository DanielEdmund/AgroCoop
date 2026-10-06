export type CooperativeRole =
  | "founder"
  | "chairperson"
  | "vice-chairperson"
  | "secretary"
  | "treasurer"
  | "organizer"
  | "member"
  | "contributor";

export type MemberStatus = "verified" | "growing" | "new";

export interface Member {
  id: string;
  name: string;
  role: CooperativeRole;
  status: MemberStatus;
  cooperativeId: string;
  location: string;
  crop: string;
  image?: string;
  joinedAt: string;
  bio?: string;
  contributions?: number;
}

export interface Cooperative {
  id: string;
  name: string;
  tagline: string;
  location: string;
  state: string;
  region: "North" | "South" | "East" | "West" | "Middle Belt";
  crops: string[];
  members: number;
  size: "small" | "medium" | "large";
  founded: number;
  rating: number;
  tradeVolume: number;
  resourcesShared: number;
  image: string;
  coverImage?: string;
  verified: boolean;
  featured?: boolean;
  description: string;
  projects: CooperativeProject[];
  highlights: string[];
}

export interface CooperativeProject {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  raised: number;
  status: "active" | "completed" | "planning";
}

export type VoteOption = "yes" | "no" | "abstain";

export interface Vote {
  id: string;
  cooperativeId: string;
  title: string;
  description: string;
  category: "budget" | "equipment" | "membership" | "market" | "project";
  createdBy: string;
  createdAt: string;
  deadline: string;
  status: "active" | "closed";
  yes: number;
  no: number;
  abstain: number;
  eligibleVoters: number;
  userVote?: VoteOption;
}

export type ResourceCategory =
  | "Tractor"
  | "Harvester"
  | "Storage"
  | "Irrigation"
  | "Processing"
  | "Transport"
  | "Tooling";

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  cooperativeId: string;
  location: string;
  description: string;
  image: string;
  rate: number;
  rateUnit: "day" | "week" | "season";
  availability: "available" | "in-use" | "maintenance";
  availableFrom?: string;
  owner: string;
  rating: number;
  bookings: number;
}

export interface ResourceRequest {
  id: string;
  title: string;
  category: ResourceCategory | "Other";
  detail: string;
  date: string;
  location: string;
  owner: string;
  createdAt: string;
  status: "pending" | "approved";
}

export interface CollectiveSale {
  id: string;
  title: string;
  closing: string;
  premium: string;
  members: number;
}

export interface Listing {
  id: string;
  title: string;
  crop: string;
  cooperativeId: string;
  location: string;
  quantity: string;
  unit: string;
  pricePerUnit: number;
  minOrder: string;
  grade: "Grade A" | "Grade B" | "Export";
  seller: string;
  image: string;
  collective?: boolean;
  verified?: boolean;
  harvestDate: string;
}

export interface Buyer {
  id: string;
  company: string;
  type: string;
  location: string;
  lookingFor: string;
  volume: string;
  price: string;
  verified: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: "Agronomy" | "Cooperative Management" | "Finance" | "Market Access" | "Post-Harvest";
  level: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  duration: string;
  instructor: string;
  image: string;
  progress: number;
  learners: number;
  format: "Course" | "Workshop" | "Event";
  date?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  body: string;
  author: Member;
  category: string;
  cooperativeId: string;
  createdAt: string;
  comments: number;
  likes: number;
  pinned?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: Member;
  cooperativeId: string;
  createdAt: string;
  priority: "normal" | "important" | "urgent";
}

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  cooperative: string;
  location: string;
  image: string;
  quote: string;
  achievement: string;
  metric: string;
  metricLabel: string;
}

export interface ActivityEvent {
  id: string;
  type: "vote" | "resource" | "market" | "member" | "learning" | "community";
  title: string;
  detail: string;
  actor: string;
  createdAt: string;
}
