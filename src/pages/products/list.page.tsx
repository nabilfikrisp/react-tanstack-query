import { ProductListFilter } from "@/components/products/product-list-filter";
import { ProductList } from "@/components/products/product.list";
import { EmptyUI } from "@/components/states/empty.ui";
import { ErrorUI } from "@/components/states/error.ui";
import { LoadingUI } from "@/components/states/loading.ui";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/constants";
import { errorParser } from "@/lib/error-parser";
import { productsInfiniteQueryOptions } from "@/services/products/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";
import { useRef } from "react";

export default function ProductListPage() {
  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    productsInfiniteQueryOptions({
      params: {
        page: searchParams.page,
        limit: searchParams.limit,
        orderBy: searchParams.orderBy,
        sortBy: searchParams.sortBy,
      },
    }),
  );

  useInfiniteScroll({
    ref: loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin: "200px",
  });

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

        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="flex justify-center py-4"
          >
            {isFetchingNextPage && <LoadingUI />}
          </div>
        )}
      </div>
    </section>
  );
}
