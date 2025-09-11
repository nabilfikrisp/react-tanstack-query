import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/services/utils";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { Button } from "./ui/button";

const LIMIT_OPTIONS = [6, 10, 20, 50, 100];

interface FiltersProps {
  className?: string;
  sortable?: string[];
}

export function Filters({ className, sortable }: FiltersProps) {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
    sortBy: parseAsString.withDefault("none"),
    orderBy: parseAsString.withDefault("desc"),
  });

  const handleLimitChange = (newLimit: string) => {
    setSearchParams({
      limit: parseInt(newLimit),
      page: 1, // Reset to first page when changing page size
    });
  };

  const handleSortChange = (newSort: string) => {
    setSearchParams({
      sortBy: newSort,
      page: 1, // Reset to first page when changing sort
    });
  };

  const handleOrderChange = (newOrder: string) => {
    setSearchParams({
      orderBy: newOrder,
      page: 1, // Reset to first page when changing order
    });
  };

  const clearFilters = () => {
    setSearchParams({
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT,
      sortBy: "none",
      orderBy: "asc",
    });
  };

  return (
    <div
      className={cn("flex flex-col gap-6 rounded-lg p-2 shadow-lg", className)}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="page-size"
          className="text-sm font-medium"
        >
          Page Size
        </label>
        <Select
          value={searchParams.limit.toString()}
          onValueChange={handleLimitChange}
        >
          <SelectTrigger
            id="page-size"
            className="w-full"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LIMIT_OPTIONS.map((option) => (
              <SelectItem
                key={option}
                value={option.toString()}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {sortable && sortable.length > 0 && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="sort-by"
            className="text-sm font-medium"
          >
            Sort By
          </label>
          <Select
            value={searchParams.sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger
              id="sort-by"
              className="w-full"
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {sortable.map((field) => (
                <SelectItem
                  key={field}
                  value={field}
                >
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="sort-order"
          className="text-sm font-medium"
        >
          Order
        </label>
        <Select
          value={searchParams.orderBy}
          onValueChange={handleOrderChange}
        >
          <SelectTrigger
            id="sort-order"
            className="w-full"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={clearFilters}
        className="w-full"
      >
        Clear Filters
      </Button>
    </div>
  );
}
