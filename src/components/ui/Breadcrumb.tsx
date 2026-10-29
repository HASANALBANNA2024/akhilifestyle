import Link from "next/link";
import { Icon } from "./Icon";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <Icon name="chevron-right" className="h-3.5 w-3.5" />}
          {it.href ? <Link href={it.href} className="hover:text-brand-600">{it.label}</Link> : <span className="text-ink">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
