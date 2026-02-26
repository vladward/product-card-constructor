import { TProduct } from '@/modules/product-builder/types/builder';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FC, memo } from 'react';

type ProductListItemType = {
  item: TProduct;
  onSelect: (id: number | string) => void;
  onRemove: (id: number | string) => void;
  isSelected: boolean;
};

export const ProductListItem = memo(
  ({ item, onSelect, onRemove, isSelected }: ProductListItemType) => (
    <div key={item.id} className="group relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(item.id)}
        className={cn(
          'relative w-full overflow-hidden rounded-[1.25rem] border-2 p-4 text-left transition-all',
          isSelected
            ? 'z-10 scale-[1.01] border-[#2563EB] bg-white shadow-lg ring-4 shadow-blue-50 ring-blue-500/5'
            : 'border-[#F1F5F9] bg-white hover:border-[#3B82F6]'
        )}
      >
        <div className="flex items-center justify-between gap-1">
          <p
            className={cn(
              'truncate text-xs font-black transition-colors',
              isSelected ? 'text-[#2563EB]' : 'text-[#1E293B]'
            )}
          >
            {item.name || 'Без названия'}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="h-8 w-8 cursor-pointer rounded-full text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
            title="Удалить все"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-1 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">
          ID: {String(item.id).slice(-6)}
        </p>
        {isSelected && (
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#2563EB]" />
        )}
      </div>
    </div>
  )
);

ProductListItem.displayName = 'ProductListItem';
