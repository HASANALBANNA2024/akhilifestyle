import Link from "next/link";
import { OrderStatusBadge, PaymentStatusBadge } from "./StatusBadge";
import { formatDate, taka } from "@/lib/format";
import type { Order } from "@/types";

export function OrderCard({ o }: { o: Order }) {
  const first = o.items[0]?.name ?? "";
  const more = o.items.length - 1;
  return (
    <Link href={`/order/${o.order_no}`} className="block rounded-xl border border-line bg-white p-4 transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-bold">#{o.order_no}</span>
        <div className="flex gap-1.5"><OrderStatusBadge status={o.status} /><PaymentStatusBadge status={o.payment_status} /></div>
      </div>
      <p className="mt-2 line-clamp-1 text-sm">{first}{more > 0 ? ` + আরও ${more}টি` : ""}</p>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-muted">{formatDate(o.created_at)}</span>
        <b className="text-base text-brand-600">{taka(o.total)}</b>
      </div>
    </Link>
  );
}
