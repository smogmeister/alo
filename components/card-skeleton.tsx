import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function CardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
      </div>
    </Card>
  );
}












