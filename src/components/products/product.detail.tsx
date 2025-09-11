import type { ProductWithBrand } from "@/schemas/product.schema";
import { ProductBrand } from "./detail/product-brand";
import { ProductHeader } from "./detail/product-header";
import { ProductSpecifications } from "./detail/product-specifications";

type ProductDetailProps = {
  product: ProductWithBrand;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="flex flex-col gap-4">
      <ProductHeader
        image={product.image}
        name={product.name}
        rating={product.rating}
        category={product.category}
        price={product.price}
        discountedPrice={product.discountedPrice}
        onSale={product.onSale}
        description={product.details.description}
      />

      <ProductSpecifications
        stock={product.details.stock}
        weight={product.details.weight}
        dimensions={product.details.dimensions}
        warranty={product.details.warranty}
      />

      <ProductBrand
        logo={product.brand.logo}
        name={product.brand.name}
        country={product.brand.country}
        founded={product.brand.founded}
        description={product.brand.description}
      />
    </div>
  );
}
