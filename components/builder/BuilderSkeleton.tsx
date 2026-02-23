import { Skeleton } from '@/components/ui/skeleton';

export const ConstructorSkeleton = () => (
  <div className="grid animate-pulse grid-cols-12 gap-8">
    <div className="col-span-3 space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
    <div className="col-span-5">
      <Skeleton className="h-[600px] w-full rounded-2xl" />
    </div>
    <div className="col-span-4 flex justify-center">
      <Skeleton className="h-[500px] w-[320px] rounded-[2.5rem]" />
    </div>
  </div>
);
