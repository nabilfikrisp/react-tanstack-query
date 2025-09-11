import type { ProductsResponse } from "@/schemas/product.schema";
import { Paginate } from "../paginate";
import { ProductList } from "./product.list";

type ProductListWithParamsProps = {
  data: ProductsResponse;
};
export function ProductListWithParams({ data }: ProductListWithParamsProps) {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <ProductList products={data.products} />
      <Paginate
        totalPages={data.totalPages}
        className="self-center"
      />
    </div>
  );
}
