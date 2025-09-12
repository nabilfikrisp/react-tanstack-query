import { ProductListFilter } from "@/components/products/product-list-filter";
import { ProductListState } from "@/components/products/product-list.state";
import { SearchFilter } from "@/components/search-filter";

export default function ProductListPage() {
  return (
    <section className="app-container flex flex-1 gap-4 py-8">
      <aside className="hidden w-56 md:block">
        <ProductListFilter />
      </aside>
      <div className="flex flex-1 flex-col gap-4">
        <SearchFilter />
        <ProductListState />
      </div>
    </section>
  );
}
