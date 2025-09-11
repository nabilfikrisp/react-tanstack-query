import { Inbox } from "lucide-react";

export function EmptyUI() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <Inbox className="text-primary mb-4 h-16 w-16" />
      <p className="text-primary font-semibold">No items found</p>
      <p className="text-primary mt-2">
        It looks like there's nothing here yet.
      </p>
    </div>
  );
}
