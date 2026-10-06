"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { myCourses } from "@/lib/data/learning";
import type {
  CollectiveSale,
  ForumPost,
  Listing,
  Resource,
  ResourceRequest,
  VoteOption,
} from "@/lib/types";

interface CoopState {
  joinedCooperativeId: string | null;
  applicationId: string | null;
  voteChoices: Record<string, VoteOption>;
  bookmarkedListings: string[];
  bookedResources: string[];

  // Learning (mock enrolment + progress)
  enrolledCourseIds: string[];
  courseProgress: Record<string, number>;

  // Content created through the mock flows
  myListings: Listing[];
  myCollectiveSales: CollectiveSale[];
  joinedSales: string[];
  myForumPosts: ForumPost[];
  myComments: Record<string, string[]>;
  myResources: Resource[];
  myResourceRequests: ResourceRequest[];

  // Notifications
  allNotificationsRead: boolean;

  joinCooperative: (id: string) => void;
  submitApplication: (id: string) => void;
  castVote: (voteId: string, option: VoteOption) => void;
  toggleBookmark: (listingId: string) => void;
  bookResource: (resourceId: string) => void;

  enrollCourse: (courseId: string) => void;
  setCourseProgress: (courseId: string, progress: number) => void;

  addListing: (listing: Listing) => void;
  addCollectiveSale: (sale: CollectiveSale) => void;
  toggleJoinSale: (saleId: string) => void;

  addForumPost: (post: ForumPost) => void;
  addComment: (postId: string, text: string) => void;

  addResource: (resource: Resource) => void;
  addResourceRequest: (request: ResourceRequest) => void;

  markAllNotificationsRead: () => void;
}

export const useCoopStore = create<CoopState>()(
  persist(
    (set) => ({
      joinedCooperativeId: "oyo-maize-collective",
      applicationId: null,
      voteChoices: {},
      bookmarkedListings: ["l3", "l4"],
      bookedResources: [],

      enrolledCourseIds: myCourses,
      courseProgress: {},

      myListings: [],
      myCollectiveSales: [],
      joinedSales: [],
      myForumPosts: [],
      myComments: {},
      myResources: [],
      myResourceRequests: [],

      allNotificationsRead: false,

      joinCooperative: (id) => set({ joinedCooperativeId: id, applicationId: id }),
      submitApplication: (id) => set({ applicationId: id }),
      castVote: (voteId, option) =>
        set((state) => ({ voteChoices: { ...state.voteChoices, [voteId]: option } })),
      toggleBookmark: (listingId) =>
        set((state) => ({
          bookmarkedListings: state.bookmarkedListings.includes(listingId)
            ? state.bookmarkedListings.filter((l) => l !== listingId)
            : [...state.bookmarkedListings, listingId],
        })),
      bookResource: (resourceId) =>
        set((state) => ({
          bookedResources: state.bookedResources.includes(resourceId)
            ? state.bookedResources.filter((r) => r !== resourceId)
            : [...state.bookedResources, resourceId],
        })),

      enrollCourse: (courseId) =>
        set((state) => ({
          enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
            ? state.enrolledCourseIds
            : [...state.enrolledCourseIds, courseId],
        })),
      setCourseProgress: (courseId, progress) =>
        set((state) => ({
          courseProgress: { ...state.courseProgress, [courseId]: Math.min(100, Math.max(0, progress)) },
        })),

      addListing: (listing) => set((state) => ({ myListings: [listing, ...state.myListings] })),
      addCollectiveSale: (sale) =>
        set((state) => ({ myCollectiveSales: [sale, ...state.myCollectiveSales] })),
      toggleJoinSale: (saleId) =>
        set((state) => ({
          joinedSales: state.joinedSales.includes(saleId)
            ? state.joinedSales.filter((s) => s !== saleId)
            : [...state.joinedSales, saleId],
        })),

      addForumPost: (post) => set((state) => ({ myForumPosts: [post, ...state.myForumPosts] })),
      addComment: (postId, text) =>
        set((state) => ({
          myComments: { ...state.myComments, [postId]: [...(state.myComments[postId] ?? []), text] },
        })),

      addResource: (resource) => set((state) => ({ myResources: [resource, ...state.myResources] })),
      addResourceRequest: (request) =>
        set((state) => ({ myResourceRequests: [request, ...state.myResourceRequests] })),

      markAllNotificationsRead: () => set(() => ({ allNotificationsRead: true })),
    }),
    { name: "agrocoop-store" }
  )
);
