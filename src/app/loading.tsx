import { LoadingState } from "@/components/ui/loading-state";

export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <LoadingState label="Loading application..." />
    </div>
  );
}
