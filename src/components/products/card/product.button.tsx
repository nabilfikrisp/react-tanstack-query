import { Button } from "@/components/ui/button";
import type { Product } from "@/schemas/product.schema";
import { Link } from "react-router";

type ProductButtonProps = {
  id: Product["id"];
};

export function ProductButton({ id }: ProductButtonProps) {
  return (
    <Button
      className="w-full"
      asChild
    >
      <Link to={`/products/${id}`}>View Details</Link>
    </Button>
  );
}
