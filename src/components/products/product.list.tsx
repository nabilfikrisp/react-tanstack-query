import { cn } from "@/lib/utils";
import type { Product } from "@/schemas/product.schema";
import { ProductCard } from "./product.card";

type ProductListProps = {
  products: Product[];
  className?: string;
};

export function ProductList({ products, className }: ProductListProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-3", className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
