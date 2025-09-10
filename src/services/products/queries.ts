import { queryOptions } from "@tanstack/react-query";
import { fetchProducts } from "./api";
import { productsKeys } from "./keys";

export function productsQueryOptions() {
  return queryOptions({
    queryKey: [productsKeys.list],
    queryFn: () => fetchProducts(),
  });
}
