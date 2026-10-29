"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { WishlistButton } from "./WishlistButton";
import { SITE } from "@/lib/site";
import type { Product } from "@/types";

// পরিমাণ বাছাই + কার্টে যোগ + এখনই কিনুন + শেয়ার
export function BuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const toast = useToast();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState<"cart" | "buy" | null>(null);
  const out = product.stock < 1;
  const max = Math.min(50, Math.max(1, product.stock));

  const addToCart = async (goCheckout: boolean) => {
    setBusy(goCheckout ? "buy" : "cart");
    const ok = await add(product.id, qty);
    setBusy(null);
    if (ok && goCheckout) router.push("/checkout");
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: product.name, text: `${product.name} - ${SITE.name}`, url });
      else { await navigator.clipboard.writeText(url); toast("লিংক কপি হয়েছে"); }
    } catch { /* বাতিল করলে কিছু না */ }
  };

  return (
    <div className="space-y-4">
      <div>
        <span className="mb-1.5 block text-sm font-medium">পরিমাণ</span>
        <div className="inline-flex items-center rounded-lg border border-line">
          <button aria-label="কমান" className="grid h-11 w-11 place-items-center disabled:opacity-40" disabled={qty <= 1 || out}
            onClick={() => setQty((q) => Math.max(1, q - 1))}><Icon name="minus" className="h-4 w-4" /></button>
          <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
          <button aria-label="বাড়ান" className="grid h-11 w-11 place-items-center disabled:opacity-40" disabled={qty >= max || out}
            onClick={() => setQty((q) => Math.min(max, q + 1))}><Icon name="plus" className="h-4 w-4" /></button>
        </div>
        <span className={`ml-3 text-sm ${out ? "text-brand-600" : product.stock <= 5 ? "text-amber-600" : "text-emerald-600"}`}>
          {out ? "স্টক শেষ" : product.stock <= 5 ? `মাত্র ${product.stock}টি বাকি` : "স্টকে আছে"}
        </span>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button size="lg" className="flex-1" disabled={out} loading={busy === "cart"} onClick={() => addToCart(false)}>
          <Icon name="bag" className="h-5 w-5" /> কার্টে যোগ করুন
        </Button>
        <Button size="lg" variant="dark" className="flex-1" disabled={out} loading={busy === "buy"} onClick={() => addToCart(true)}>
          এখনই কিনুন
        </Button>
      </div>

      <div className="flex gap-2.5">
        <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line py-2.5 text-sm font-medium">
          <WishlistButton productId={product.id} className="h-7 w-7 shadow-none" /> পছন্দের তালিকা
        </div>
        <button onClick={share} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line py-2.5 text-sm font-medium hover:bg-brand-50">
          <Icon name="share" className="h-[18px] w-[18px]" /> শেয়ার
        </button>
      </div>
    </div>
  );
}
