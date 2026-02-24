import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageNext: () => void;
  onPagePrev: () => void;
};

export const ProductsListPagination: FC<Props> = ({
  onPageNext,
  onPagePrev,
  currentPage,
  totalPages,
}) => {
  return (
    <div>
      {totalPages > 1 && (
        <div className="mt-auto shrink-0 border-t border-slate-100 bg-white pt-4">
          <div className="flex items-center justify-between px-2 pb-3">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={onPagePrev}
              className="h-9 w-9 rounded-xl border-slate-200 bg-white text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 disabled:opacity-20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex flex-col items-center">
              <span className="text-[10px] leading-none font-black tracking-[0.2em] text-slate-900 uppercase">
                {currentPage} / {totalPages}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={onPageNext}
              className="h-9 w-9 rounded-xl border-slate-200 bg-white text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 disabled:opacity-20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center gap-1.5 pb-2">
            {[...Array(totalPages)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all duration-500',
                  currentPage === i + 1
                    ? 'w-6 bg-[#2563EB]'
                    : 'w-1.5 bg-slate-100'
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
