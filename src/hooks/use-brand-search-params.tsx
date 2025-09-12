import {
  BRAND_SORT,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  ORDER_BY,
  type BrandSortBy,
  type OrderBy,
} from "@/lib/constants";
import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";

export function useBrandSearchParams() {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
    sortBy: parseAsStringEnum(BRAND_SORT).withDefault("createdAt"),
    orderBy: parseAsStringEnum(ORDER_BY).withDefault("desc"),
  });

  const safeSearchParams = searchParams as Omit<
    typeof searchParams,
    "orderBy" | "sortBy"
  > & {
    orderBy: OrderBy;
    sortBy: BrandSortBy;
  };

  function clear() {
    setSearchParams({
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT,
      sortBy: "createdAt",
      orderBy: "desc",
    });
  }

  return {
    searchParams: safeSearchParams,
    setSearchParams,
    clear,
  };
}
