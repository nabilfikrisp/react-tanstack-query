import { Badge } from "@/components/ui/badge";
import type { Product } from "@/schemas/product.schema";

type ProductHeaderProps = {
  image: Product["image"];
  name: Product["name"];
  rating: Product["rating"];
  category: Product["category"];
  price: Product["price"];
  discountedPrice?: Product["discountedPrice"];
  onSale: Product["onSale"];
  description: Product["details"]["description"];
};

export function ProductHeader({
  image,
  name,
  rating,
  category,
  price,
  discountedPrice,
  onSale,
  description,
}: ProductHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
      {/* Product Image */}
      <div>
        <img
          src={image}
          alt={name}
          className="aspect-square w-full rounded-xl object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
            {name}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${i < Math.floor(rating) ? "text-foreground" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-muted-foreground text-sm">{rating}</span>
        </div>

        <Badge variant="outline">{category}</Badge>

        <div className="flex items-baseline gap-4">
          <span className="text-foreground text-4xl font-medium">
            ${discountedPrice ? discountedPrice : price}
          </span>
          {onSale && (
            <span className="text-muted-foreground text-lg line-through">
              ${price}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <h2 className="text-foreground text-xl font-semibold">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
