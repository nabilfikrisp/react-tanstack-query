import { BrandListFilter } from "@/components/brands/brand-list-filter";
import { BrandListState } from "@/components/brands/brand-list.state";
import { SearchFilter } from "@/components/search-filter";

export default function BrandListPage() {
  return (
    <section className="app-container flex flex-1 gap-4 py-8">
      <aside className="hidden w-56 md:block">
        <BrandListFilter />
      </aside>
      <div className="flex flex-1 flex-col gap-4">
        <SearchFilter />
        <BrandListState />
      </div>
    </section>
  );
}
