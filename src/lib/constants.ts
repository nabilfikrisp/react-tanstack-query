export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 18;

export const PRODUCT_SORT = ["name", "price", "createdAt", "rating"];
export type ProductSortBy = (typeof PRODUCT_SORT)[number]; // "name" | "price" | "createdAt" | "rating"

export const BRAND_SORT = ["name", "country", "founded", "createdAt"];
export type BrandSortBy = (typeof BRAND_SORT)[number];

export const ORDER_BY = ["asc", "desc"];
export type OrderBy = (typeof ORDER_BY)[number]; // "asc" | "desc"
