import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/constants";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import {
  fetchProductById,
  fetchProducts,
  type FetchProductsParams,
} from "./api";
import { productsKeys } from "./keys";

// PRODUCT LIST
type ProductsQueryOptionsParams = {
  params?: FetchProductsParams;
};
export function productsQueryOptions({
  params,
}: ProductsQueryOptionsParams = {}) {
  return queryOptions({
    queryKey: [...productsKeys.list(params)],
    queryFn: () => fetchProducts(params),
  });
}

// PRODUCT DETAILS
type ProductByIdQueryOptionsParams = {
  id: number;
};
export function productByIdQueryOptions({ id }: ProductByIdQueryOptionsParams) {
  return queryOptions({
    queryKey: [...productsKeys.details(id)],
    queryFn: () => fetchProductById(id),
  });
}

// PRODUCT INFINITE QUERY
type ProductsInfiniteQueryOptionsParams = {
  default?: boolean;
};
type ProductsInfiniteQueryProps = {
  params?: FetchProductsParams;
  options?: ProductsInfiniteQueryOptionsParams;
};
export function productsInfiniteQueryOptions({
  params = {},
  options = { default: false },
}: ProductsInfiniteQueryProps) {
  const defaultParams: FetchProductsParams = {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    sortBy: "createdAt",
    orderBy: "desc",
    onSale: false,
  };
  const finalParams = options?.default ? defaultParams : params;

  return infiniteQueryOptions({
    queryKey: [...productsKeys.list(finalParams)],
    queryFn: ({ pageParam }) =>
      fetchProducts({ ...finalParams, page: pageParam }),
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
