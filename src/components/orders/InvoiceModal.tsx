"use client";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { ordersApi } from "@/lib/api/orders";
import { errorMessage } from "@/lib/errors";
import { formatDate, taka } from "@/lib/format";
import { PAY_METHOD_LABEL } from "@/lib/constants";
import { SITE } from "@/lib/site";
import type { Invoice, PayMethod } from "@/types";

// ইনভয়েস দেখা ও প্রিন্ট করা (/orders/{no}/invoice)
export function InvoiceModal({ orderNo, open, onClose }: { orderNo: string; open: boolean; onClose: () => void }) {
  const [inv, setInv] = useState<Invoice | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || inv) return;
    ordersApi.invoice(orderNo).then(setInv).catch((e) => setError(errorMessage(e)));
  }, [open, inv, orderNo]);

  return (
    <Modal open={open} onClose={onClose} title={`ইনভয়েস #${orderNo}`}>
      {!inv && !error && <div className="grid place-items-center py-10"><Spinner className="h-7 w-7 text-brand-600" /></div>}
      {error && <p className="text-brand-600">{error}</p>}
      {inv && (
        <div id="invoice-print" className="space-y-4 text-sm">
          <div className="flex justify-between">
            <div><p className="font-script text-2xl font-bold text-brand-600">{SITE.name}</p><p className="text-muted">{SITE.phone}</p></div>
            <div className="text-right"><p className="font-bold">#{inv.invoice_no}</p><p className="text-muted">{formatDate(inv.date)}</p></div>
          </div>
          <div className="rounded-lg bg-brand-50/60 p-3">
            <p className="font-semibold">{inv.customer.name} · {inv.customer.phone}</p>
            <p>{inv.ship_to.address}{inv.ship_to.area ? `, ${inv.ship_to.area}` : ""}, {inv.ship_to.district}</p>
          </div>
          <table className="w-full">
            <thead><tr className="border-b border-line text-left text-muted"><th className="py-1.5">পণ্য</th><th>দাম</th><th>পরিমাণ</th><th className="text-right">মোট</th></tr></thead>
            <tbody>
              {inv.items.map((it, i) => (
                <tr key={i} className="border-b border-line/60"><td className="py-1.5 pr-2">{it.name}</td><td>{taka(it.unit_price)}</td><td>{it.quantity}</td><td className="text-right">{taka(it.line_total)}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="ml-auto w-full max-w-60 space-y-1">
            <div className="flex justify-between"><span>সাবটোটাল</span><span>{taka(inv.subtotal)}</span></div>
            {inv.discount > 0 && <div className="flex justify-between"><span>ডিসকাউন্ট</span><span>- {taka(inv.discount)}</span></div>}
            <div className="flex justify-between"><span>ডেলিভারি</span><span>{taka(inv.shipping_fee)}</span></div>
            <div className="flex justify-between border-t border-line pt-1 text-base font-bold"><span>মোট</span><span>{taka(inv.total)}</span></div>
          </div>
          <p className="text-muted">পেমেন্ট: {PAY_METHOD_LABEL[inv.payment_method as PayMethod] ?? inv.payment_method}</p>
          <Button onClick={() => window.print()} variant="outline" className="print:hidden">প্রিন্ট করুন</Button>
        </div>
      )}
    </Modal>
  );
}
