import { LinkButton } from "@/components/ui/Button";

// "Exclusive Deals" প্রোমো ব্যানার। লেখা বদলাতে চাইলে এই ফাইলে বদলান।
export function PromoBanner() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-brand-100 via-brand-50 to-white px-6 py-10 md:px-14 md:py-14">
      <h2 className="text-2xl font-extrabold md:text-4xl">এক্সক্লুসিভ ডিল</h2>
      <p className="mt-1 text-lg font-bold text-brand-600 md:text-2xl">৫০% পর্যন্ত ছাড়!</p>
      <p className="mt-2 max-w-md text-muted">প্রিয় পণ্যগুলো এখন আরও কম দামে। সীমিত সময়ের অফার।</p>
      <LinkButton href="/shop?sort=price_asc" className="mt-5">এখনই কিনুন</LinkButton>
    </section>
  );
}
