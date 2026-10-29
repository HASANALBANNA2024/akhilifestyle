import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Category } from "@/types";

// গোল ক্যাটাগরি আইকন সারি (ছবি Admin থেকে আসে)
export function CategoryCircles({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;
  return (
    <section aria-label="ক্যাটাগরি">
      <ul className="no-scrollbar flex gap-5 overflow-x-auto pb-2 md:justify-center md:gap-8">
        {categories.slice(0, 10).map((c) => (
          <li key={c.id} className="shrink-0">
            <Link href={`/category/${c.slug}`} className="flex w-20 flex-col items-center gap-2 text-center md:w-24">
              <span className="h-16 w-16 overflow-hidden rounded-full border-2 border-brand-100 bg-brand-50 md:h-20 md:w-20">
                <SmartImage src={c.image_url} alt={c.name} className="h-full w-full object-cover" />
              </span>
              <span className="text-sm font-medium leading-tight">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
