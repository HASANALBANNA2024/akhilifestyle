import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

export function ProductGrid({ products, cols = "lg:grid-cols-4" }: { products: Product[]; cols?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${cols}`}>
      {products.map((p, i) => <ProductCard key={p.id} p={p} priority={i < 4} />)}
    </div>
  );
}
