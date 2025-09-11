import type { ProductsResponse } from "@/schemas/product.schema";
import { Filters } from "../filters";
import { Paginate } from "../paginate";
import { ProductList } from "./product.list";

type ProductListWithParamsProps = {
  data: ProductsResponse;
};
export function ProductListWithParams({ data }: ProductListWithParamsProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Filters />
      <ProductList products={data.products} />
      <Paginate
        totalPages={data.totalPages}
        className="self-center"
      />
    </div>
  );
}
