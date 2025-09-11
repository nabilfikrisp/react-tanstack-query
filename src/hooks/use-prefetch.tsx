import { productsInfiniteQueryOptions } from "@/services/products/queries";
import { useQueryClient } from "@tanstack/react-query";

export function usePrefetch() {
  const queryClient = useQueryClient();

  async function prefetchInfiniteProducts() {
    await queryClient.prefetchInfiniteQuery(
      productsInfiniteQueryOptions({
        options: {
          default: true,
        },
      }),
    );
  }

  return {
    prefetchInfiniteProducts,
  };
}
