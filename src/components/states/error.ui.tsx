import { AlertTriangle } from "lucide-react";

export function ErrorUI({ message }: { message: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <AlertTriangle className="mb-4 h-16 w-16 text-pink-500" />
      <p className="font-semibold text-pink-500">Error</p>
      <p className="mt-2 text-pink-500">{message}</p>
    </div>
  );
}
