import { errorParser } from "@/lib/error-parser";
import { EmptyUI } from "./states/empty.ui";
import { ErrorUI } from "./states/error.ui";
import { LoadingUI } from "./states/loading.ui";

export type StateRendererProps<T> = {
  data?: T;
  isLoading: boolean;
  error: Error | null;
  customComponents?: {
    loadingComponent?: React.ReactNode;
    errorComponent?: React.ReactNode;
    emptyComponent?: React.ReactNode;
  };
  render: (data: T) => React.ReactNode;
};
export function StateRenderer<T>({
  data,
  error,
  isLoading,
  customComponents,
  render,
}: StateRendererProps<T>) {
  if (isLoading) {
    return <>{customComponents?.loadingComponent ?? <LoadingUI />}</>;
  }

  if (error) {
    const errMessage = errorParser(error, { log: true });
    return (
      <>
        {customComponents?.errorComponent ?? <ErrorUI message={errMessage} />}
      </>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <>{customComponents?.emptyComponent ?? <EmptyUI />}</>;
  }

  return <>{render(data)}</>;
}
