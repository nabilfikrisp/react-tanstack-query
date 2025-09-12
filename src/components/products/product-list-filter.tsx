import { useProductSearchParams } from "@/hooks/use-product-search-params";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

export function ProductListFilter() {
  const { searchParams, setSearchParams, clear, SORTABLE, ORDERABLE } =
    useProductSearchParams();

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
              {SORTABLE.map((field) => (
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
              {ORDERABLE.map((field) => (
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
        <Label
          htmlFor="on-sale-switch"
          className="text-sm font-semibold"
        >
          On Sale Only
        </Label>
        <Switch
          id="on-sale-switch"
          checked={searchParams.onSale === true}
          onCheckedChange={(checked) =>
            setSearchParams({ onSale: checked ? true : null })
          }
        />
      </div>

      <Button onClick={handleClearFilters}>Clear Filters</Button>
    </div>
  );
}
