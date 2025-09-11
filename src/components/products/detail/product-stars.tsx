import { cn } from "@/lib/utils";
import type { Product } from "@/schemas/product.schema";
import { StarIcon } from "lucide-react";

type ProductStarsProps = {
  rating: Product["rating"];
};
export default function ProductStars({ rating }: ProductStarsProps) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={cn(
            "h-4 w-4 text-sm",
            i < Math.floor(rating)
              ? "fill-yellow-500 text-yellow-500"
              : "text-muted",
          )}
        />
      ))}
    </div>
  );
}
