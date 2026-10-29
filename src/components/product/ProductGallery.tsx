"use client";
import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { WishlistButton } from "./WishlistButton";
import { cn } from "@/lib/format";
import type { ProductImage } from "@/types";

// বড় ছবি + নিচে/পাশে ছোট থাম্বনেইল
export function ProductGallery({ images, name, productId }: { images: ProductImage[]; name: string; productId: number }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [{ id: 0, url: "", sort_order: 0 }];
  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse">
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-brand-50/50">
        <SmartImage src={list[active]?.url} alt={name} priority className="aspect-square w-full object-cover" />
        <WishlistButton productId={productId} className="absolute right-3 top-3 h-10 w-10" />
      </div>
      {list.length > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto md:w-20 md:flex-col md:overflow-visible">
          {list.map((im, i) => (
            <button key={im.id} onClick={() => setActive(i)} aria-label={`ছবি ${i + 1}`}
              className={cn("h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 md:h-20 md:w-20", i === active ? "border-brand-600" : "border-line")}>
              <SmartImage src={im.url} alt={`${name} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
