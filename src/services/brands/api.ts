import api from "@/configs/axios";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/constants";
import { extractPagination } from "@/lib/extract-pagination";
import { brandSchema, brandsResponseSchema } from "@/schemas/brand.schema";

// GET /brands
export type FetchBrandsParams = {
  page?: number;
  limit?: number;
  sortBy?: "name" | "country" | "founded" | "createdAt";
  orderBy?: "asc" | "desc";
};
function buildQueryParams(params: FetchBrandsParams) {
  return {
    _page: params.page || DEFAULT_PAGE,
    _limit: params.limit || DEFAULT_LIMIT,
    ...(params.sortBy ? { _sort: params.sortBy } : {}),
    ...(params.orderBy ? { _order: params.orderBy } : {}),
  };
}
export async function fetchBrands(params: FetchBrandsParams = {}) {
  const queryParams = buildQueryParams(params);

  const response = await api.get(`/brands`, {
    params: queryParams,
  });

  const brands = brandSchema.array().parse(response.data);

  const pagination = extractPagination({
    count: Number(response.headers["x-total-count"]),
    page: queryParams._page,
    limit: queryParams._limit,
  });

  const data = {
    brands,
    ...pagination,
  };

  return brandsResponseSchema.parse(data);
}

// GET /brands/:id
export async function fetchBrandById(id: number) {
  const response = await api.get(`/brands/${id}`);
  return brandSchema.parse(response.data);
}
