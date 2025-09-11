import type { FetchBrandsParams } from "./api";

export const brandsKeys = {
  all: ["brands"],
  list: (params?: FetchBrandsParams) =>
    params ? ["brands", "list", params] : ["brands", "list"],
  details: (id?: number) =>
    id ? ["brands", "detail", id] : ["brands", "detail"],
  withProducts: () => ["brands", "with-products"],
} as const;
