import { Icon } from "@/components/ui/Icon";

// হোমের "ফ্রি ডেলিভারি / সিকিউর পেমেন্ট / ..." স্ট্রিপ
const FEATURES = [
  { icon: "truck", title: "দ্রুত ডেলিভারি", text: "সারা বাংলাদেশে" },
  { icon: "card", title: "নিরাপদ পেমেন্ট", text: "COD, bKash, Nagad, কার্ড" },
  { icon: "shield", title: "অরিজিনাল পণ্য", text: "১০০% কোয়ালিটি গ্যারান্টি" },
  { icon: "refresh", title: "সহজ রিটার্ন", text: "সমস্যা হলে রিটার্ন করুন" },
];

export function FeatureStrip() {
  return (
    <section className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-white p-4 md:grid-cols-4 md:p-5">
      {FEATURES.map((f) => (
        <div key={f.title} className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon name={f.icon} /></span>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight">{f.title}</p>
            <p className="text-xs text-muted">{f.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
