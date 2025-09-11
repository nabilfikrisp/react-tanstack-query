import type { Product } from "@/schemas/product.schema";

type ProductInfoProps = {
  name: Product["name"];
  category: Product["category"];
  rating: Product["rating"];
};

export function ProductInfo({ name, category, rating }: ProductInfoProps) {
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold">{name}</h2>
      <p className="text-muted-foreground mb-2 text-sm">{category}</p>
      <div className="mb-2 flex items-center">
        <span className="mr-1 text-yellow-500">★</span>
        <span className="text-sm">{rating.toFixed(1)}</span>
      </div>
    </>
  );
}
