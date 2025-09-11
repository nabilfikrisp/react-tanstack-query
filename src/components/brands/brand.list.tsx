import { cn } from "@/lib/utils";
import type { Brand } from "@/schemas/brand.schema";
import { BrandCard } from "./brand.card";

type BrandListProps = {
  brands: Brand[];
  className?: string;
};

export function BrandList({ brands, className }: BrandListProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
        />
      ))}
    </div>
  );
}
