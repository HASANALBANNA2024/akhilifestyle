import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { PriceTag } from "./PriceTag";
import { WishlistButton } from "./WishlistButton";
import { AddToCartButton } from "./AddToCartButton";
import { buttonClass } from "@/components/ui/Button";
import { discountPercent } from "@/lib/format";
import type { Product } from "@/types";

// পণ্যের কার্ড (হোম, ক্যাটাগরি, রিলেটেড সব জায়গায় একই)
export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const off = discountPercent(p.price, p.compare_at_price);
  return (
    <article className="group flex flex-col rounded-xl border border-line bg-white p-2.5 transition-shadow hover:shadow-md">
      <div className="relative overflow-hidden rounded-lg bg-brand-50/60">
        <Link href={`/product/${p.slug}`} aria-label={p.name}>
          <SmartImage src={p.images[0]?.url} alt={p.name} priority={priority}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </Link>
        <WishlistButton productId={p.id} className="absolute right-2 top-2" />
        {off > 0 && <span className="absolute left-2 top-2 rounded-md bg-brand-600 px-1.5 py-0.5 text-[11px] font-bold text-white">{off}%</span>}
        {p.stock < 1 && <span className="absolute inset-x-0 bottom-0 bg-navy/70 py-1 text-center text-xs text-white">স্টক শেষ</span>}
      </div>
      <Link href={`/product/${p.slug}`} className="mt-2.5 line-clamp-2 min-h-10 text-sm font-medium leading-5 hover:text-brand-600">
        {p.name}
      </Link>
      <div className="mt-1"><PriceTag price={p.price} compare={p.compare_at_price} /></div>
      {p.colors && p.colors.length > 0 && (
        <div className="mt-1.5 flex items-center gap-1" aria-label="রং">
          {p.colors.slice(0, 5).map((c) => (
            <i key={c.id} title={c.name} className="inline-block h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: c.hex || "#ddd" }} />
          ))}
          {p.colors.length > 5 && <span className="text-xs text-muted">+{p.colors.length - 5}</span>}
        </div>
      )}
      <div className="mt-3">
        {p.colors && p.colors.length > 0 && p.stock > 0
          ? <Link href={`/product/${p.slug}`} className={buttonClass("outline", "sm", "w-full")}>রং বাছুন</Link>
          : <AddToCartButton productId={p.id} stock={p.stock} />}
      </div>
    </article>
  );
}
