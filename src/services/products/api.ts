import api from "@/configs/axios";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  type OrderBy,
  type ProductSortBy,
} from "@/lib/constants";
import { extractPagination } from "@/lib/extract-pagination";
import {
  productSchema,
  productsResponseSchema,
  productWithBrandSchema,
} from "@/schemas/product.schema";

// GET /products
export type FetchProductsParams = {
  page?: number;
  limit?: number;
  sortBy?: ProductSortBy;
  orderBy?: OrderBy;
  onSale?: boolean | null;
  brandId?: number | null;
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

// GET /products/:id
export async function fetchProductById(id: number) {
  const response = await api.get(`/products/${id}`, {
    params: { _expand: "brand" },
  });
  return productWithBrandSchema.parse(response.data);
}
