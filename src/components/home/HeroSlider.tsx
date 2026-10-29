"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import type { Banner } from "@/types";

// Admin panel এর Banner গুলো slider হিসেবে। Banner না থাকলে সুন্দর ডিফল্ট হিরো দেখায়।
export function HeroSlider({ banners }: { banners: Banner[] }) {
  const [i, setI] = useState(0);
  const n = banners.length;

  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5500);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) {
    return (
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 via-brand-50 to-white">
        <div className="px-6 py-14 md:px-14 md:py-24">
          <p className="text-sm font-semibold text-brand-600">নতুন কালেকশন</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-6xl">স্টাইলিশ ব্যাগ<br />প্রতিটি অনুষ্ঠানের জন্য</h1>
          <p className="mt-3 max-w-md text-muted">সেরা দামে সেরা কালেকশন, সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।</p>
          <Link href="/shop" className={buttonClass("primary", "lg", "mt-6")}>এখনই কিনুন <Icon name="chevron-right" className="h-4 w-4" /></Link>
        </div>
      </section>
    );
  }

  const cur = banners[i];
  const inner = (
    <SmartImage src={cur.image_url} alt={cur.title || "ব্যানার"} priority className="h-full w-full object-cover" />
  );
  return (
    <section className="relative overflow-hidden rounded-2xl bg-brand-50" aria-roledescription="carousel">
      <div className="aspect-[16/9] sm:aspect-[21/8]">
        {cur.link_url ? (
          cur.link_url.startsWith("http")
            ? <a href={cur.link_url} className="block h-full">{inner}</a>
            : <Link href={cur.link_url} className="block h-full">{inner}</Link>
        ) : inner}
      </div>
      {n > 1 && (
        <>
          <button aria-label="আগের" onClick={() => setI((i - 1 + n) % n)} className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow sm:grid"><Icon name="chevron-left" /></button>
          <button aria-label="পরের" onClick={() => setI((i + 1) % n)} className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow sm:grid"><Icon name="chevron-right" /></button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {banners.map((b, k) => (
              <button key={b.id} aria-label={`স্লাইড ${k + 1}`} onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-brand-600" : "w-2 bg-white/80"}`} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
