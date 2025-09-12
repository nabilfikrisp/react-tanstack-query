import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/constants";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchBrandById, fetchBrands, type FetchBrandsParams } from "./api";
import { brandsKeys } from "./keys";

// BRAND LIST
type BrandsQueryOptionsParams = {
  params?: FetchBrandsParams;
};
export function brandsQueryOptions({ params }: BrandsQueryOptionsParams = {}) {
  return queryOptions({
    queryKey: [...brandsKeys.list(params)],
    queryFn: () => fetchBrands(params),
  });
}

// BRAND DETAILS
type BrandByIdQueryOptionsParams = {
  id: number;
};
export function brandByIdQueryOptions({ id }: BrandByIdQueryOptionsParams) {
  return queryOptions({
    queryKey: [...brandsKeys.details(id)],
    queryFn: () => fetchBrandById(id),
  });
}

// BRAND INFINITE QUERY
type BrandsInfiniteQueryOptionsParams = {
  default?: boolean;
};
type BrandsInfiniteQueryProps = {
  params?: FetchBrandsParams;
  options?: BrandsInfiniteQueryOptionsParams;
};
export function brandsInfiniteQueryOptions({
  params = {},
  options = { default: false },
}: BrandsInfiniteQueryProps) {
  const defaultParams: FetchBrandsParams = {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    sortBy: "createdAt",
    orderBy: "desc",
    search: null,
  };
  const finalParams = options?.default ? defaultParams : params;

  return infiniteQueryOptions({
    queryKey: [...brandsKeys.list(finalParams)],
    queryFn: ({ pageParam }) =>
      fetchBrands({ ...finalParams, page: pageParam }),
    initialPageParam: finalParams.page || 1,
    getNextPageParam: (lastPage) => {
      const hasMore = lastPage.page < lastPage.totalPages;
      return hasMore ? lastPage.page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const hasPrev = firstPage.page > 1;
      return hasPrev ? firstPage.page - 1 : undefined;
    },
  });
}
