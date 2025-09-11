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
}

export function Filters({ className }: FiltersProps) {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
    sort: parseAsString.withDefault("none"),
    order: parseAsString.withDefault("asc"),
  });

  const handleLimitChange = (newLimit: string) => {
    setSearchParams({
      limit: parseInt(newLimit),
      page: 1, // Reset to first page when changing page size
    });
  };

  const handleSortChange = (newSort: string) => {
    setSearchParams({
      sort: newSort,
      page: 1, // Reset to first page when changing sort
    });
  };

  const handleOrderChange = (newOrder: string) => {
    setSearchParams({
      order: newOrder,
      page: 1, // Reset to first page when changing order
    });
  };

  const clearFilters = () => {
    setSearchParams({
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT,
      sort: "none",
      order: "asc",
    });
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <div className="flex items-center gap-2">
        <label
          htmlFor="page-size"
          className="text-sm font-medium"
        >
          Page Size:
        </label>
        <Select
          value={searchParams.limit.toString()}
          onValueChange={handleLimitChange}
        >
          <SelectTrigger
            id="page-size"
            className="w-20"
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

      <div className="flex items-center gap-2">
        <label
          htmlFor="sort-by"
          className="text-sm font-medium"
        >
          Sort By:
        </label>
        <Select
          value={searchParams.sort}
          onValueChange={handleSortChange}
        >
          <SelectTrigger
            id="sort-by"
            className="w-32"
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="category">Category</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="sort-order"
          className="text-sm font-medium"
        >
          Order:
        </label>
        <Select
          value={searchParams.order}
          onValueChange={handleOrderChange}
        >
          <SelectTrigger
            id="sort-order"
            className="w-24"
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
        className="ml-auto"
      >
        Clear Filters
      </Button>
    </div>
  );
}
