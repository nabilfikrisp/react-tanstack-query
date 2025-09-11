import { queryOptions } from "@tanstack/react-query";
import { fetchProducts, type FetchProductsParams } from "./api";
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
