import { Badge } from "@/components/ui/badge";
import type { Product } from "@/schemas/product.schema";

type ProductInfoProps = {
  name: Product["name"];
  category: Product["category"];
  rating: Product["rating"];
};

export function ProductInfo({ name, category, rating }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <span className="mr-1 text-yellow-500">★</span>
          <span className="text-sm">{rating.toFixed(1)}</span>
        </div>
        <Badge
          variant="outline"
          className=""
        >
          {category}
        </Badge>
      </div>
    </div>
  );
}
