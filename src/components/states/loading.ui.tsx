export function LoadingUI() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="border-primary mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
      <p className="text-primary animate-pulse font-semibold">Loading...</p>
    </div>
  );
}
