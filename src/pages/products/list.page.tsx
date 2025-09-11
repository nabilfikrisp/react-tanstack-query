import { ProductList } from "@/components/products/product.list";
import { StateRenderer } from "@/components/state-renderer";
import { productsQueryOptions } from "@/services/products/queries";
import { useQuery } from "@tanstack/react-query";

export function ProductListPage() {
  const { data, error, isLoading } = useQuery(productsQueryOptions());

  return (
    <section className="app-container flex flex-1 flex-col gap-4 py-8">
      <header>
        <h1 className="text-primary text-2xl font-bold">Product List</h1>
      </header>
      <StateRenderer
        data={data}
        isLoading={isLoading}
        error={error}
        render={(data) => <ProductList products={data.products} />}
      />
    </section>
  );
}
