import { Button } from "@/components/ui/button";
import { usePrefetch } from "@/hooks/use-prefetch";
import type { Product } from "@/schemas/product.schema";
import { Link } from "react-router";

type ProductButtonProps = {
  id: Product["id"];
};

export function ProductButton({ id }: ProductButtonProps) {
  const { prefetchProductById } = usePrefetch();
  return (
    <Button
      className="w-full"
      asChild
    >
      <Link
        to={`/products/${id}`}
        onMouseEnter={() => prefetchProductById(id)}
      >
        View Details
      </Link>
    </Button>
  );
}
