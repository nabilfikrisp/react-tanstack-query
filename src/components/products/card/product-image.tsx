import type { Product } from "@/schemas/product.schema";

type ProductImageProps = {
  image: Product["image"];
  name: Product["name"];
};

export function ProductImage({ image, name }: ProductImageProps) {
  return (
    <img
      src={image}
      alt={`Image of ${name}`}
      className="h-48 w-full rounded-t-lg object-cover"
    />
  );
}
