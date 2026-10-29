// রিভিউ (লেখা/এডিট/ডিলিট লগইন লাগে; শুধু ডেলিভারি পাওয়া পণ্যে)
import { api } from "./client";
import type { MyReview } from "@/types";

export const reviewsApi = {
  mine: () => api<MyReview[]>("/me/reviews", { auth: true }),
  add: (slug: string, rating: number, comment: string) =>
    api<{ ok: boolean }>(`/products/${slug}/reviews`, { method: "POST", body: { rating, comment }, auth: true }),
  edit: (slug: string, rating: number, comment: string) =>
    api<{ ok: boolean }>(`/products/${slug}/reviews`, { method: "PUT", body: { rating, comment }, auth: true }),
  remove: (slug: string) => api<void>(`/products/${slug}/reviews`, { method: "DELETE", auth: true }),
};
