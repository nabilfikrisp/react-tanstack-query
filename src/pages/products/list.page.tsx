import { ProductListFilter } from "@/components/products/product-list-filter";
import { ProductList } from "@/components/products/product.list";
import { EmptyUI } from "@/components/states/empty.ui";
import { ErrorUI } from "@/components/states/error.ui";
import { LoadingUI } from "@/components/states/loading.ui";
import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/constants";
import { errorParser } from "@/lib/error-parser";
import { productsInfiniteQueryOptions } from "@/services/products/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";

export function ProductListPage() {
  const [searchParams, setSearchParams] = useQueryStates({
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

  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      productsInfiniteQueryOptions({
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

  if (!data || data.pages[0].products.length === 0) {
    return <EmptyUI />;
  }

  function handleLoadMore() {
    setSearchParams({ page: searchParams.page + 1 });
    fetchNextPage();
  }

  const products = data.pages.flatMap((page) => page.products);

  return (
    <section className="app-container flex flex-1 gap-4 py-8">
      <aside className="hidden w-56 md:block">
        <ProductListFilter />
      </aside>
      <div className="flex flex-1 flex-col gap-4">
        <ProductList
          products={products}
          className="flex-1"
        />

        {hasNextPage && <Button onClick={handleLoadMore}>Load more</Button>}
      </div>
    </section>
  );
}
