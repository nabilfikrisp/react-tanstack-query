import type { FetchProductsParams } from "./api";

export const productsKeys = {
  all: ["products"],
  list: (params?: FetchProductsParams) =>
    params ? ["products", "list", params] : ["products", "list"],
  details: (id?: number) =>
    id ? ["products", "detail", id] : ["products", "detail"],
} as const;
