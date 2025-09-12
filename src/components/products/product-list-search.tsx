import { useProductSearchParams } from "@/hooks/use-product-search-params";

import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ProductListSearch() {
  const { searchParams, setSearchParams } = useProductSearchParams();

  return (
    <div className="flex gap-2">
      <Input placeholder="Search product name..." />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  );
}
