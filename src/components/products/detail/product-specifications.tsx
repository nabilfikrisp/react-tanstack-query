import type { Product } from "@/schemas/product.schema";

type ProductSpecificationsProps = {
  stock: Product["details"]["stock"];
  weight: Product["details"]["weight"];
  dimensions: Product["details"]["dimensions"];
  warranty: Product["details"]["warranty"];
};

export function ProductSpecifications({
  stock,
  weight,
  dimensions,
  warranty,
}: ProductSpecificationsProps) {
  return (
    <div>
      <h2 className="text-foreground text-3xl font-semibold">Specifications</h2>
      <div className="">
        <div className="divide-y">
          <div className="flex justify-between py-2">
            <div className="text-muted-foreground">Stock</div>
            <div className="text-foreground">{stock}</div>
          </div>
          <div className="flex justify-between py-2">
            <div className="text-muted-foreground">Weight</div>
            <div className="text-foreground">{weight}</div>
          </div>
          <div className="flex justify-between py-2">
            <div className="text-muted-foreground">Dimensions</div>
            <div className="text-foreground">{dimensions}</div>
          </div>
          <div className="flex justify-between py-2">
            <div className="text-muted-foreground">Warranty</div>
            <div className="text-foreground">{warranty}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
