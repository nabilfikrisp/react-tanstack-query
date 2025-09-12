// lib/hooks/useProductSearchParams.ts
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  type ProductOrderBy,
  type ProductSortBy,
} from "@/lib/constants";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

export function useProductSearchParams() {
  const SORTABLE = ["name", "price", "createdAt", "rating"];
  const ORDERABLE = ["asc", "desc"];

  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
    sortBy: parseAsStringEnum(SORTABLE).withDefault("createdAt"),
    orderBy: parseAsStringEnum(ORDERABLE).withDefault("desc"),
    onSale: parseAsBoolean,
  });

  const safeSearchParams = searchParams as Omit<
    typeof searchParams,
    "orderBy"
  > & {
    orderBy: ProductOrderBy;
    sortBy: ProductSortBy;
  };

  function clear() {
    setSearchParams({
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT,
      sortBy: "createdAt",
      orderBy: "desc",
      onSale: undefined,
    });
  }

  return {
    searchParams: safeSearchParams,
    setSearchParams,
    clear,
    SORTABLE,
    ORDERABLE,
  };
}
