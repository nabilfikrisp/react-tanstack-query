import type { ProductsResponse } from "@/schemas/product.schema";
import { SORTABLE_PRODUCT_FIELDS } from "@/services/products/constants";
import { Filters } from "../filters";
import { Paginate } from "../paginate";
import { ProductList } from "./product.list";

type ProductListWithParamsProps = {
  data: ProductsResponse;
};
export function ProductListWithParams({ data }: ProductListWithParamsProps) {
  return (
    <div className="flex flex-1 gap-6">
      <aside className="w-56 flex-shrink-0">
        <Filters
          className="sticky top-4"
          sortable={SORTABLE_PRODUCT_FIELDS}
        />
      </aside>
      <main className="flex flex-1 flex-col gap-4">
        <ProductList
          products={data.products}
          className="flex-1"
        />
        <Paginate
          totalPages={data.totalPages}
          className="self-center"
        />
      </main>
    </div>
  );
}
