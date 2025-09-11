export const SORTABLE_PRODUCT_FIELDS = ["name", "price", "createdAt", "rating"];
export const DEFAULT_SORT_PRODUCT_FIELD = "createdAt";

export type SortableProductFields = (typeof SORTABLE_PRODUCT_FIELDS)[number];
