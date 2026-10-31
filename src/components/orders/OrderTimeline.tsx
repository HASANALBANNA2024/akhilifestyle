import { Icon } from "@/components/ui/Icon";
import { COURIER_STATUS_LABEL, ORDER_STATUS_LABEL, ORDER_STEPS, ORDER_STEP_DESC } from "@/lib/constants";
import { cn } from "@/lib/format";
import type { Order } from "@/types";

// অর্ডার ট্র্যাকিং টাইমলাইন (স্ক্রিন 6 ও 14)। Backend এ প্রতি ধাপের সময় নেই, তাই শুধু অবস্থা দেখানো হয়।
export function OrderTimeline({ order }: { order: Pick<Order, "status" | "courier" | "tracking_code"> & { courier_status?: string | null } }) {
  if (order.status === "cancelled") {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700">
        <Icon name="info" className="h-6 w-6" /> <span className="font-semibold">{ORDER_STEP_DESC.cancelled}</span>
      </div>
    );
  }
  const reached = ORDER_STEPS.indexOf(order.status);
  return (
    <div>
      <ol className="space-y-0">
        {ORDER_STEPS.map((s, i) => {
          const done = i <= reached;
          const last = i === ORDER_STEPS.length - 1;
          return (
            <li key={s} className="relative flex gap-3 pb-5 last:pb-0">
              {!last && <span className={cn("absolute left-[11px] top-6 h-full w-0.5", i < reached ? "bg-emerald-500" : "bg-line")} />}
              <span className={cn("z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2",
                done ? "border-emerald-500 bg-emerald-500 text-white" : "border-line bg-white")}>
                {done && <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <div>
                <p className={cn("text-[15px] font-semibold leading-6", !done && "text-muted")}>{ORDER_STATUS_LABEL[s]}</p>
                <p className="text-xs text-muted">{ORDER_STEP_DESC[s]}</p>
              </div>
            </li>
          );
        })}
      </ol>
      {(order.courier || order.tracking_code) && (
        <div className="mt-4 rounded-xl bg-brand-50/60 p-3.5 text-sm">
          <p><span className="text-muted">কুরিয়ার:</span> <b>{order.courier || "Steadfast"}</b></p>
          {order.courier_status && (
            <p className="mt-0.5"><span className="text-muted">পার্সেলের অবস্থা:</span> <b>{COURIER_STATUS_LABEL[order.courier_status] ?? "আপডেট হচ্ছে"}</b></p>
          )}
          {order.tracking_code && (
            <p className="mt-0.5">
              <span className="text-muted">ট্র্যাকিং কোড:</span> <b>{order.tracking_code}</b>
              {(order.courier || "").toLowerCase().includes("steadfast") || !order.courier ? (
                <> · <a className="font-semibold text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer"
                  href={`https://steadfast.com.bd/t/${order.tracking_code}`}>কুরিয়ারে ট্র্যাক করুন</a></>
              ) : null}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
