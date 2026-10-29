"use client";
import { PAY_METHOD_LABEL } from "@/lib/constants";
import { cn } from "@/lib/format";
import type { PayMethod, PaymentOptions } from "@/types";

const ORDER: PayMethod[] = ["cod", "sslcommerz", "manual_bkash", "manual_nagad"];

export function enabledMethods(o: PaymentOptions | null): PayMethod[] {
  if (!o) return [];
  return ORDER.filter((m) => o[m].enabled);
}

// Admin যেগুলো চালু রেখেছে শুধু সেগুলোই দেখায়
export function PaymentMethodPicker({
  options, value, onChange,
}: { options: PaymentOptions | null; value: PayMethod | null; onChange: (m: PayMethod) => void }) {
  const methods = enabledMethods(options);
  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="mb-3 text-lg font-bold">পেমেন্ট মেথড</h2>
      {!options && <p className="text-sm text-muted">লোড হচ্ছে...</p>}
      {options && methods.length === 0 && <p className="text-sm text-red-600">এখন কোনো পেমেন্ট মেথড চালু নেই। পরে চেষ্টা করুন।</p>}
      <ul className="space-y-2.5">
        {methods.map((m) => (
          <li key={m}>
            <label className={cn("flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3.5",
              value === m ? "border-brand-600 bg-brand-50/60" : "border-line hover:border-brand-200")}>
              <input type="radio" name="pay" className="mt-1 accent-brand-600" checked={value === m} onChange={() => onChange(m)} />
              <span>
                <span className="block font-semibold">{PAY_METHOD_LABEL[m]}</span>
                {m === "cod" && <span className="text-sm text-muted">পণ্য হাতে পেয়ে টাকা দিন</span>}
                {m === "sslcommerz" && <span className="text-sm text-muted">কার্ড, bKash, Nagad, Rocket সহ অনলাইনে পেমেন্ট</span>}
                {(m === "manual_bkash" || m === "manual_nagad") && options && (
                  <span className="text-sm text-muted">অর্ডারের পর {options[m].number ? <b>{options[m].number}</b> : "আমাদের নম্বরে"} এ Send Money করে TrxID জমা দিন</span>
                )}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
