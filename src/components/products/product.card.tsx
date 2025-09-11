import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Product } from "@/schemas/product.schema";
import { ProductButton } from "./card/product.button";
import { ProductImage } from "./card/product.image";
import { ProductInfo } from "./card/product.info";
import { ProductPrice } from "./card/product.price";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <Card className="flex h-full flex-col rounded-lg py-0 shadow-sm">
        <CardHeader className="p-0">
          <ProductImage
            image={product.image}
            name={product.name}
          />
        </CardHeader>
        <CardContent className="flex-1 p-4">
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
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <ProductButton id={product.id} />
        </CardFooter>
      </Card>
    </article>
  );
}
