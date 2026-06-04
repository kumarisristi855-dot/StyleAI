export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted/50 ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <LoadingSkeleton className="h-48 w-full" />
      <LoadingSkeleton className="h-4 w-3/4" />
      <LoadingSkeleton className="h-3 w-1/2" />
      <div className="flex gap-2">
        <LoadingSkeleton className="h-5 w-16" />
        <LoadingSkeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <LoadingSkeleton className="h-8 w-48" />
      <LoadingSkeleton className="h-4 w-72" />
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}
