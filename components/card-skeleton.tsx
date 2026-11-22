import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-card p-1.5 ring-1 ring-border md:p-2">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-2 px-1.5 pb-1.5 pt-3 md:px-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
