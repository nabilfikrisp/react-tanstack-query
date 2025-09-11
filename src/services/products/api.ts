import api from "@/configs/axios";
import {
  productSchema,
  productsResponseSchema,
} from "@/schemas/product.schema";
import { DEFAULT_LIMIT, DEFAULT_PAGE, extractPagination } from "../utils";

export type FetchProductsParams = {
  page?: number;
  limit?: number;
  brandId?: number;
};

function buildQueryParams(params: FetchProductsParams) {
  return {
    _page: params.page || DEFAULT_PAGE,
    _limit: params.limit || DEFAULT_LIMIT,
    ...(params.brandId ? { brandId: params.brandId } : {}),
  };
}

export async function fetchProducts(params: FetchProductsParams = {}) {
  const queryParams = buildQueryParams(params);

  const response = await api.get(`/products`, {
    params: queryParams,
  });

  const products = productSchema.array().parse(response.data);

  const pagination = extractPagination({
    count: Number(response.headers["x-total-count"]),
    page: queryParams._page,
    limit: queryParams._limit,
  });

  const data = {
    products,
    ...pagination,
  };

  return productsResponseSchema.parse(data);
}
