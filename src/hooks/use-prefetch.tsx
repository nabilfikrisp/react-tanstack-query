import {
  brandByIdQueryOptions,
  brandsInfiniteQueryOptions,
} from "@/services/brands/queries";
import {
  productByIdQueryOptions,
  productsInfiniteQueryOptions,
} from "@/services/products/queries";
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

  async function prefetchInfiniteBrands() {
    await queryClient.prefetchInfiniteQuery(
      brandsInfiniteQueryOptions({
        options: {
          default: true,
        },
      }),
    );
  }

  async function prefetchProductById(id: number) {
    await queryClient.prefetchQuery(productByIdQueryOptions({ id }));
  }

  async function prefetchBrandById(id: number) {
    await queryClient.prefetchQuery(brandByIdQueryOptions({ id }));
  }

  return {
    prefetchInfiniteProducts,
    prefetchInfiniteBrands,
    prefetchProductById,
    prefetchBrandById,
  };
}
