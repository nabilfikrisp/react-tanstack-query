import { Badge } from "@/components/ui/badge";

type ProductPriceProps = {
  price: number;
  discountedPrice?: number;
  onSale: boolean;
};

export function ProductPrice({
  price,
  discountedPrice,
  onSale,
}: ProductPriceProps) {
  return (
    <div className="flex items-center gap-2">
      {discountedPrice && discountedPrice < price ? (
        <>
          <span className="text-lg font-bold text-green-600">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="text-muted-foreground text-sm line-through">
            ${price.toFixed(2)}
          </span>
          {onSale && <Badge variant="secondary">On Sale</Badge>}
        </>
      ) : (
        <span className="text-lg font-bold">${price.toFixed(2)}</span>
      )}
    </div>
  );
}
