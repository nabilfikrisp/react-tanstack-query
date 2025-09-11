import { ProductListWithParams } from "@/components/products/products-list-with-params";
import { StateRenderer } from "@/components/state-renderer";
import { productsQueryOptions } from "@/services/products/queries";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/services/utils";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryStates } from "nuqs";

export function ProductListPage() {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
  });

  const { data, error, isLoading } = useQuery(
    productsQueryOptions({
      params: { page: searchParams.page, limit: searchParams.limit },
    }),
  );

  return (
    <section className="app-container flex flex-1 flex-col gap-4 py-8">
      <StateRenderer
        data={data}
        isLoading={isLoading}
        error={error}
        render={(data) => <ProductListWithParams data={data} />}
      />
    </section>
  );
}
