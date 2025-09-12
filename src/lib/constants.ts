export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 18;

export const PRODUCT_SORT = ["name", "price", "createdAt", "rating"] as const;
export const PRODUCT_ORDER = ["asc", "desc"] as const;

export type ProductSortBy = (typeof PRODUCT_SORT)[number]; // "name" | "price" | "createdAt" | "rating"
export type ProductOrderBy = (typeof PRODUCT_ORDER)[number]; // "asc" | "desc"
