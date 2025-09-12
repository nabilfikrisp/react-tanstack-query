import { BrandListFilter } from "@/components/brands/brand-list-filter";
import { BrandList } from "@/components/brands/brand.list";
import { EmptyUI } from "@/components/states/empty.ui";
import { ErrorUI } from "@/components/states/error.ui";
import { LoadingUI } from "@/components/states/loading.ui";
import { useBrandSearchParams } from "@/hooks/use-brand-search-params";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { errorParser } from "@/lib/error-parser";
import { brandsInfiniteQueryOptions } from "@/services/brands/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";

export default function BrandListPage() {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { searchParams } = useBrandSearchParams();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    brandsInfiniteQueryOptions({
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

  if (!data || data.pages[0].brands.length === 0) {
    return <EmptyUI />;
  }

  const brands = data.pages.flatMap((page) => page.brands);

  return (
    <section className="app-container flex flex-1 gap-4 py-8">
      <aside className="hidden w-56 md:block">
        <BrandListFilter />
      </aside>
      <div className="flex flex-1 flex-col gap-4">
        <BrandList
          brands={brands}
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
