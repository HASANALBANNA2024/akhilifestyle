"use client";
import Link from "next/link";
import { useState } from "react";
import { PageTitle } from "@/components/account/PageTitle";
import { ReviewEditModal } from "@/components/account/ReviewEditModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageLoader } from "@/components/ui/Spinner";
import { StarRating } from "@/components/ui/StarRating";
import { useToast } from "@/context/ToastContext";
import { useAsync } from "@/hooks/useAsync";
import { reviewsApi } from "@/lib/api/reviews";
import { errorMessage } from "@/lib/errors";
import { formatDate } from "@/lib/format";
import type { MyReview } from "@/types";

export default function MyReviewsPage() {
  const toast = useToast();
  const { data, loading, reload } = useAsync(() => reviewsApi.mine());
  const [edit, setEdit] = useState<MyReview | null>(null);

  const del = async (r: MyReview) => {
    if (!confirm("রিভিউটি মুছবেন?")) return;
    try { await reviewsApi.remove(r.slug); toast("রিভিউ মুছে গেছে"); reload(); }
    catch (e) { toast(errorMessage(e), "error"); }
  };

  return (
    <>
      <PageTitle title="আমার রিভিউ" sub="ডেলিভারি পাওয়া পণ্যের পেজ থেকে নতুন রিভিউ দিতে পারবেন।" />
      {loading ? <PageLoader /> : !data?.length ? (
        <EmptyState icon="star" title="কোনো রিভিউ নেই" text="পণ্য হাতে পেলে রিভিউ দিন।" />
      ) : (
        <ul className="grid gap-3">
          {data.map((r) => (
            <li key={r.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-center justify-between gap-2">
                <Link href={`/product/${r.slug}`} className="font-semibold hover:text-brand-600">{r.product}</Link>
                <span className="text-xs text-muted">{formatDate(r.created_at, false)}</span>
              </div>
              <div className="mt-1"><StarRating value={r.rating} /></div>
              {r.comment && <p className="mt-2 text-[15px]">{r.comment}</p>}
              {!r.is_visible && <p className="mt-2 text-xs text-amber-700">এই রিভিউ বর্তমানে লুকানো আছে</p>}
              <div className="mt-3 flex gap-4 text-sm font-semibold">
                <button className="text-brand-600" onClick={() => setEdit(r)}>এডিট</button>
                <button className="text-muted hover:text-red-600" onClick={() => del(r)}>মুছুন</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ReviewEditModal key={edit?.id ?? 0} review={edit} onClose={() => setEdit(null)} onDone={reload} />
    </>
  );
}
