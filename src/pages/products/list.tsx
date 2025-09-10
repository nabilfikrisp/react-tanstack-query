import { productsQueryOptions } from "@/services/products/queries";
import { useQuery } from "@tanstack/react-query";

export function ProductListPage() {
  const { data } = useQuery(productsQueryOptions());

  return (
    <div>
      Product List Page
      <ul>
        {data?.products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price} - Brand: {product.brand ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
