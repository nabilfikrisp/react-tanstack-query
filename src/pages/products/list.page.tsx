import { Paginate } from "@/components/paginate";
import { ProductListFilter } from "@/components/products/product-list-filter";
import { ProductList } from "@/components/products/product.list";
import { EmptyUI } from "@/components/states/empty.ui";
import { ErrorUI } from "@/components/states/error.ui";
import { LoadingUI } from "@/components/states/loading.ui";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/constants";
import { errorParser } from "@/lib/error-parser";
import { productsQueryOptions } from "@/services/products/queries";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";

export function ProductListPage() {
  const [searchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
    sortBy: parseAsStringEnum([
      "name",
      "price",
      "createdAt",
      "rating",
    ]).withDefault("createdAt"),
    orderBy: parseAsStringEnum(["asc", "desc"]).withDefault("desc"),
  });

  const { data, error, isLoading } = useQuery(
    productsQueryOptions({
      params: {
        page: searchParams.page,
        limit: searchParams.limit,
        orderBy: searchParams.orderBy,
        sortBy: searchParams.sortBy,
      },
    }),
  );

  if (isLoading) {
    return <LoadingUI />;
  }

  if (error) {
    const errMessage = errorParser(error);
    return <ErrorUI message={errMessage} />;
  }

  if (!data || data.products.length === 0) {
    return <EmptyUI />;
  }

  return (
    <section className="app-container flex flex-1 gap-4 py-8">
      <aside className="w-56">
        <ProductListFilter />
      </aside>
      <div className="flex flex-1 flex-col gap-4">
        <ProductList
          products={data.products}
          className="flex-1"
        />
        <Paginate
          totalPages={data.totalPages}
          className="self-center"
        />
      </div>
    </section>
  );
}
