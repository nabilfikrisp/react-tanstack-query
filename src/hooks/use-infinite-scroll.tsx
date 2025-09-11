import { useEffect } from "react";

type UseInfiniteScrollProps = {
  ref: React.RefObject<HTMLElement | null>;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  rootMargin?: string;
  threshold?: number;
};

export function useInfiniteScroll({
  ref,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  rootMargin = "100px",
  threshold = 0.1,
}: UseInfiniteScrollProps) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !hasNextPage || isFetchingNextPage || !fetchNextPage)
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [
    ref,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin,
    threshold,
  ]);
}
