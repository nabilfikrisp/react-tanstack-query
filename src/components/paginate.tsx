import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsInteger, useQueryStates } from "nuqs";
import { Button } from "./ui/button";

interface PaginateProps {
  totalPages: number;
  className?: string;
}

export function Paginate({ totalPages, className }: PaginateProps) {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
  });

  const currentPage = searchParams.page;

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  }

  function getPageNumbers() {
    const pages: number[] = [];

    if (currentPage === 1) {
      // If on page 1, show 1, 2 (if exists), and last (if different)
      pages.push(1);
      if (totalPages > 1) {
        pages.push(2);
      }
      if (totalPages > 2) {
        pages.push(totalPages);
      }
    } else if (currentPage === totalPages) {
      // If on last page, show 1 (if not already shown), second-to-last, and last
      if (totalPages > 2) {
        pages.push(1);
        pages.push(totalPages - 1);
      }
      pages.push(totalPages);
    } else {
      // Middle page: show 1, current, and last
      pages.push(1);
      pages.push(currentPage);
      pages.push(totalPages);
    }

    return pages;
  }

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={cn("flex items-center gap-1", className)}
      aria-label="Pagination"
      role="navigation"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
          className="h-8 w-8 p-0"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
