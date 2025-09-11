// filepath: c:\Users\mnabi\dev\unnispick\react-tanstack-query\src\components\brands\brand.detail.tsx
import { ProductCard } from "@/components/products/product.card";
import type { Brand } from "@/schemas/brand.schema";
import { productsInfiniteQueryOptions } from "@/services/products/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BuildingIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { Button } from "../ui/button";

type BrandDetailProps = {
  brand: Brand;
};

export function BrandDetail({ brand }: BrandDetailProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      productsInfiniteQueryOptions({
        params: {
          brandId: brand.id,
          limit: 3,
        },
      }),
    );

  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8">
        <img
          src={brand.logo}
          alt={brand.name}
          className="aspect-square w-full rounded-xl object-contain shadow-lg"
        />

        <div className="flex flex-col gap-4 sm:col-span-2">
          <div>
            <h1 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
              {brand.name}
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span>{brand.country}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Founded in {brand.founded}</span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h2 className="text-foreground flex items-center gap-2 text-xl font-semibold">
              <BuildingIcon className="h-5 w-5" />
              About {brand.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {brand.description}
            </p>
          </div>

          {/* Created Date */}
          <div className="text-muted-foreground text-sm">
            Added on {new Date(brand.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-foreground text-xl font-semibold">
          Products by {brand.name}
        </h2>

        {allProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {hasNextPage && (
          <div className="flex justify-center py-4">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full"
            >
              {isFetchingNextPage ? "Loading..." : "Load More Products"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
