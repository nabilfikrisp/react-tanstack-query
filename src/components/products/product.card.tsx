import type { Product } from "@/schemas/product.schema";
import { ProductButton } from "./card/product-button";
import { ProductImage } from "./card/product-image";
import { ProductInfo } from "./card/product-info";
import { ProductPrice } from "./card/product-price";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <div className="bg-background ring-muted flex h-full flex-col rounded-2xl shadow-sm ring-1 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
        {/* Product Image Section */}
        <div className="overflow-hidden rounded-t-2xl">
          <ProductImage
            image={product.image}
            name={product.name}
          />
        </div>

        {/* Product Content Section */}
        <div className="flex-1 space-y-4 p-4">
          <ProductInfo
            name={product.name}
            category={product.category}
            rating={product.rating}
          />
          <ProductPrice
            price={product.price}
            discountedPrice={product.discountedPrice}
            onSale={product.onSale}
          />
        </div>

        {/* Product Action Section */}
        <div className="p-4 pt-0">
          <ProductButton id={product.id} />
        </div>
      </div>
    </article>
  );
}
