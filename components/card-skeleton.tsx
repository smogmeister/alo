import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-2 mb-3">
      <Skeleton className="aspect-square w-full rounded-lg border border-border" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}














