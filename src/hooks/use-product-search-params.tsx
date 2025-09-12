// lib/hooks/useProductSearchParams.ts
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  ORDER_BY,
  PRODUCT_SORT,
  type OrderBy,
  type ProductSortBy,
} from "@/lib/constants";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

export function useProductSearchParams() {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
    sortBy: parseAsStringEnum(PRODUCT_SORT).withDefault("createdAt"),
    orderBy: parseAsStringEnum(ORDER_BY).withDefault("desc"),
    onSale: parseAsBoolean,
    search: parseAsString,
  });

  const safeSearchParams = searchParams as Omit<
    typeof searchParams,
    "orderBy"
  > & {
    orderBy: OrderBy;
    sortBy: ProductSortBy;
  };

  function clear() {
    setSearchParams({
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT,
      sortBy: "createdAt",
      orderBy: "desc",
      onSale: null,
      search: null,
    });
  }

  return {
    searchParams: safeSearchParams,
    setSearchParams,
    clear,
  };
}
