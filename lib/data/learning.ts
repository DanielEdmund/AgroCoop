import type { Course } from "@/lib/types";
import { images } from "@/lib/images";

export const courses: Course[] = [
  { id: "c1", title: "Cooperative By-Laws That Actually Work", category: "Cooperative Management", level: "Beginner", lessons: 8, duration: "3h 20m", instructor: "Barr. Ifeoma Chukwu", image: images.learningMeeting, progress: 75, learners: 1240, format: "Course" },
  { id: "c2", title: "Democratic Decision-Making for Coop Leaders", category: "Cooperative Management", level: "Intermediate", lessons: 6, duration: "2h 45m", instructor: "Alhaji Musa Danjuma", image: images.learningBook, progress: 40, learners: 860, format: "Course" },
  { id: "c3", title: "Soil Health & Fertiliser Planning", category: "Agronomy", level: "Beginner", lessons: 10, duration: "4h 10m", instructor: "Dr. Amina Yusuf", image: images.learningField, progress: 100, learners: 3410, format: "Course" },
  { id: "c4", title: "Post-Harvest Loss Reduction for Grains", category: "Post-Harvest", level: "Intermediate", lessons: 7, duration: "3h 05m", instructor: "Engr. Tunde Ogunbiyi", image: images.learningGrain, progress: 15, learners: 1975, format: "Course" },
  { id: "c5", title: "Cooperative Bookkeeping in Plain Language", category: "Finance", level: "Beginner", lessons: 9, duration: "3h 40m", instructor: "Mrs. Ngozi Adeyemi", image: images.learningBook, progress: 0, learners: 2260, format: "Course" },
  { id: "c6", title: "Negotiating Better Prices as a Collective", category: "Market Access", level: "Advanced", lessons: 5, duration: "2h 15m", instructor: "Folasade Ojo", image: images.aboutMarket, progress: 60, learners: 1490, format: "Course" },
  { id: "c7", title: "Export-Grade Cocoa Fermentation Workshop", category: "Post-Harvest", level: "Advanced", lessons: 4, duration: "1 day", instructor: "Pastor Eko Otu", image: images.coopCocoa, progress: 0, learners: 320, format: "Workshop", date: "2026-10-14" },
  { id: "c8", title: "Agroecology Field Day — Zaria", category: "Agronomy", level: "Beginner", lessons: 3, duration: "1 day", instructor: "KADUNA IRRIGATED FARMS UNION", image: images.coopIrrigation, progress: 0, learners: 180, format: "Event", date: "2026-10-25" },
  { id: "c9", title: "Digital Tools for Coop Secretaries", category: "Cooperative Management", level: "Intermediate", lessons: 6, duration: "2h 30m", instructor: "Chidi Anyanwu", image: images.bannerInfo, progress: 0, learners: 640, format: "Course" },
  { id: "c10", title: "Value Addition: Making Ginger Powder & Oil", category: "Market Access", level: "Intermediate", lessons: 5, duration: "2h 50m", instructor: "Osagie Ehanire", image: images.marketSpices, progress: 25, learners: 505, format: "Course" },
  { id: "c11", title: "Cooperative Governance Symposium 2026", category: "Cooperative Management", level: "Advanced", lessons: 6, duration: "2 days", instructor: "ICA Nigeria Chapter", image: images.aboutCommunity, progress: 0, learners: 950, format: "Event", date: "2026-11-08" },
  { id: "c12", title: "Climate-Smart Sorghum & Millet", category: "Agronomy", level: "Intermediate", lessons: 7, duration: "3h 15m", instructor: "John Vintim", image: images.coopCowherd, progress: 0, learners: 720, format: "Course" },
];

export const myCourses = ["c1", "c2", "c3", "c4", "c6", "c10"];
