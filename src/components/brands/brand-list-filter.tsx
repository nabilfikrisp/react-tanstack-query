import { parseAsStringEnum, useQueryStates } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SORTABLE = ["name", "country", "founded", "createdAt"];
const ORDERABLE = ["asc", "desc"];

export function BrandListFilter() {
  const [searchParams, setSearchParams] = useQueryStates({
    sortBy: parseAsStringEnum(SORTABLE).withDefault("createdAt"),
    orderBy: parseAsStringEnum(ORDERABLE).withDefault("desc"),
  });

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
    </div>
  );
}
