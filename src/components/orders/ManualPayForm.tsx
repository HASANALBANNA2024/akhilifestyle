"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { useToast } from "@/context/ToastContext";
import { paymentsApi } from "@/lib/api/payments";
import { errorMessage } from "@/lib/errors";
import { isValidBdPhone, taka } from "@/lib/format";
import type { Order, PaymentOptions } from "@/types";

// bKash / Nagad ম্যানুয়াল পেমেন্ট: নম্বরে Send Money করে sender নম্বর + TrxID জমা দেওয়া
export function ManualPayForm({ order, options, onDone }: { order: Order; options: PaymentOptions | null; onDone: () => void }) {
  const toast = useToast();
  const [sender, setSender] = useState("");
  const [trx, setTrx] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const key = order.payment_method === "manual_nagad" ? "manual_nagad" : "manual_bkash";
  const name = key === "manual_nagad" ? "Nagad" : "bKash";
  const number = options?.[key].number;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValidBdPhone(sender)) { setError("যে নম্বর থেকে টাকা পাঠিয়েছেন সেটি সঠিকভাবে দিন"); return; }
    if (trx.trim().length < 6) { setError("সঠিক ট্রানজেকশন আইডি (TrxID) দিন"); return; }
    setBusy(true);
    try {
      await paymentsApi.submitManual(order.order_no, sender.trim(), trx.trim());
      toast("পেমেন্ট তথ্য জমা হয়েছে, আমরা যাচাই করব");
      onDone();
    } catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-3.5 rounded-2xl border-2 border-brand-200 bg-brand-50/50 p-5">
      <h3 className="text-lg font-bold">{name} এ পেমেন্ট করুন</h3>
      <ol className="list-decimal space-y-1 pl-5 text-sm">
        <li>{number ? <><b>{number}</b> নম্বরে</> : "আমাদের নম্বরে"} <b>{taka(order.total)}</b> Send Money করুন</li>
        <li>নিচে আপনার নম্বর ও TrxID লিখে জমা দিন</li>
      </ol>
      <Input label={`যে ${name} নম্বর থেকে পাঠিয়েছেন`} type="tel" inputMode="tel" value={sender} onChange={(e) => setSender(e.target.value)} />
      <Input label="ট্রানজেকশন আইডি (TrxID)" value={trx} onChange={(e) => setTrx(e.target.value)} className="uppercase" maxLength={40} />
      {error && <p className="text-sm text-brand-600">{error}</p>}
      <Button type="submit" loading={busy}>পেমেন্ট তথ্য জমা দিন</Button>
    </form>
  );
}
