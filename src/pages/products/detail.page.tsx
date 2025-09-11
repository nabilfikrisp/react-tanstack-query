import { ProductDetail } from "@/components/products/product.detail";
import { StateRenderer } from "@/components/state-renderer";
import { productByIdQueryOptions } from "@/services/products/queries";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router";

export function ProductDetailPage() {
  const id = useParams().id;
  const { data, error, isLoading } = useQuery(
    productByIdQueryOptions({
      id: Number(id),
    }),
  );
  return (
    <section className="app-container flex flex-1 flex-col gap-4 py-8">
      <Link
        to="/products"
        className="group flex items-center gap-2"
      >
        <ArrowLeftIcon className="transition-all group-hover:-translate-x-1" />{" "}
        <span className="transition-all group-hover:underline">
          Back to Products
        </span>
      </Link>
      <StateRenderer
        data={data}
        isLoading={isLoading}
        error={error}
        render={(data) => <ProductDetail product={data} />}
      />
    </section>
  );
}
