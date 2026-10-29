"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import { useToast } from "@/context/ToastContext";
import { ordersApi } from "@/lib/api/orders";
import { errorMessage } from "@/lib/errors";

// রিটার্ন অনুরোধ (শুধু ডেলিভারি হওয়া অর্ডারে)
export function ReturnModal({ orderNo, open, onClose, onDone }: { orderNo: string; open: boolean; onClose: () => void; onDone: () => void }) {
  const toast = useToast();
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim().length < 5) { setError("কারণ অন্তত ৫ অক্ষরে লিখুন"); return; }
    setBusy(true); setError("");
    try {
      await ordersApi.requestReturn(orderNo, reason.trim());
      toast("রিটার্ন অনুরোধ জমা হয়েছে");
      setReason("");
      onDone();
      onClose();
    } catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="রিটার্ন অনুরোধ">
      <form onSubmit={submit} className="space-y-3.5">
        <p className="text-sm text-muted">অর্ডার #{orderNo} রিটার্ন করার কারণ জানান।</p>
        <Textarea label="কারণ" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} error={error} placeholder="যেমন: পণ্যে ত্রুটি আছে / ভুল পণ্য এসেছে" />
        <Button type="submit" loading={busy} className="w-full">অনুরোধ পাঠান</Button>
      </form>
    </Modal>
  );
}
