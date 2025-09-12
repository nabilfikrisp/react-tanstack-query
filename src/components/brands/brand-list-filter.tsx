import { useBrandSearchParams } from "@/hooks/use-brand-search-params";
import { BRAND_SORT, ORDER_BY } from "@/lib/constants";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function BrandListFilter() {
  const { searchParams, setSearchParams, clear } = useBrandSearchParams();

  function handleClearFilters() {
    clear();
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-2 shadow-lg">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Sort By</span>
        <Select
          onValueChange={(value) => setSearchParams({ sortBy: value })}
          value={searchParams.sortBy}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {BRAND_SORT.map((field) => (
                <SelectItem
                  key={field}
                  value={field}
                >
                  {field}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Order By</span>
        <Select
          onValueChange={(value) => setSearchParams({ orderBy: value })}
          value={searchParams.orderBy}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Order By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ORDER_BY.map((field) => (
                <SelectItem
                  key={field}
                  value={field}
                >
                  {field}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleClearFilters}>Clear Filters</Button>
    </div>
  );
}
