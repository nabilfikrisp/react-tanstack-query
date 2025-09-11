import { queryOptions } from "@tanstack/react-query";
import {
  fetchProductById,
  fetchProducts,
  type FetchProductsParams,
} from "./api";
import { productsKeys } from "./keys";

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

type ProductByIdQueryOptionsParams = {
  id: number;
};

export function productByIdQueryOptions({ id }: ProductByIdQueryOptionsParams) {
  return queryOptions({
    queryKey: [...productsKeys.details(id)],
    queryFn: () => fetchProductById(id),
  });
}
