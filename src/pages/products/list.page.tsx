import { ProductListWithParams } from "@/components/products/products-list-with-params";
import { StateRenderer } from "@/components/state-renderer";
import {
  DEFAULT_SORT_PRODUCT_FIELD,
  SORTABLE_PRODUCT_FIELDS,
} from "@/services/products/constants";
import { productsQueryOptions } from "@/services/products/queries";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/services/utils";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";

export function ProductListPage() {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
    sortBy: parseAsStringEnum(SORTABLE_PRODUCT_FIELDS).withDefault(
      DEFAULT_SORT_PRODUCT_FIELD,
    ),
    orderBy: parseAsStringEnum(["asc", "desc"]).withDefault("desc"),
  });

  const { data, error, isLoading } = useQuery(
    productsQueryOptions({
      params: {
        page: searchParams.page,
        limit: searchParams.limit,
        orderBy: searchParams.orderBy,
        sortBy: searchParams.sortBy,
      },
    }),
  );

  return (
    <section className="app-container flex flex-1 flex-col gap-4 py-4">
      <StateRenderer
        data={data}
        isLoading={isLoading}
        error={error}
        render={(data) => <ProductListWithParams data={data} />}
      />
    </section>
  );
}
