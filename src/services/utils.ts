export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 6;

type ExtractPaginationParams = {
  count?: number;
  page: number;
  limit: number;
};
export function extractPagination({
  count,
  page,
  limit,
}: ExtractPaginationParams) {
  const total = Number(count || 0);
  const totalPages = Math.ceil(total / (limit || 1));

  return {
    total,
    page,
    limit,
    totalPages,
  };
}
