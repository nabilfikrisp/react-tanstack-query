import { ProductListFilter } from "@/components/products/product-list-filter";
import { ProductListSearch } from "@/components/products/product-list-search";
import { ProductListState } from "@/components/products/product-list.state";

export default function ProductListPage() {
  return (
    <section className="app-container flex flex-1 gap-4 py-8">
      <aside className="hidden w-56 md:block">
        <ProductListFilter />
      </aside>
      <div className="flex flex-1 flex-col gap-4">
        <ProductListSearch />
        <ProductListState />
      </div>
    </section>
  );
}
