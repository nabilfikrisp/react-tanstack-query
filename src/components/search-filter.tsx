import { X } from "lucide-react";
import { useQueryState } from "nuqs";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchFilter() {
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchQuery(value);
    },
    500,
  );

  const handleClearSearch = () => {
    setSearchQuery(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="Search product name..."
        onChange={handleSearchChange}
        defaultValue={searchQuery || ""}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 transform p-0"
          onClick={handleClearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
