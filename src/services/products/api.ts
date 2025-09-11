import api from "@/configs/axios";
import {
  productSchema,
  productsResponseSchema,
  productWithBrandSchema,
} from "@/schemas/product.schema";
import { DEFAULT_LIMIT, DEFAULT_PAGE, extractPagination } from "../utils";
import type { SortableProductFields } from "./constants";

export type FetchProductsParams = {
  page?: number;
  limit?: number;
  sortBy?: SortableProductFields;
  orderBy?: "asc" | "desc";
  onSale?: boolean;
  brandId?: number;
};

function buildQueryParams(params: FetchProductsParams) {
  return {
    _page: params.page || DEFAULT_PAGE,
    _limit: params.limit || DEFAULT_LIMIT,
    ...(params.sortBy ? { _sort: params.sortBy } : {}),
    ...(params.orderBy ? { _order: params.orderBy } : {}),
    ...(params.onSale !== undefined ? { onSale: params.onSale } : {}),
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

export async function fetchProductById(id: number) {
  const response = await api.get(`/products/${id}`, {
    params: { _expand: "brand" },
  });
  return productWithBrandSchema.parse(response.data);
}
