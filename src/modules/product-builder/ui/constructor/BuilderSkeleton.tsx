import { Skeleton } from '@/components/ui/skeleton';
import { SKELETON_PRODUCT_ITEMS_COUNT } from '@/modules/product-builder/lib/constants';

export const BuilderSkeleton = () => (
  <div className="grid animate-pulse grid-cols-1 gap-8 md:grid-cols-12">
    <div className="col-span-3 hidden space-y-4 md:col-span-3 md:block">
      {Array.from({ length: SKELETON_PRODUCT_ITEMS_COUNT }).map((_, i) => (
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
