import { Button } from '@/components/ui/button';
import { TProduct } from '@/types/builder';
import { Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AVAILABLE_FIELDS } from '@/lib/constants';

export const FieldSelector = ({
  activeKeys,
  onToggle,
}: {
  activeKeys: Set<keyof TProduct>;
  onToggle: (key: keyof TProduct) => void;
}) => (
  <div className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
    {AVAILABLE_FIELDS.map(({ key, label }) => {
      const isActive = activeKeys.has(key);

      return (
        <Button
          key={key}
          variant="ghost"
          size="sm"
          onClick={() => onToggle(key)}
          className={cn(
            'h-9 rounded-xl border-2 px-4 text-[11px] font-semibold transition-all duration-200',
            isActive
              ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100 hover:border-blue-700 hover:bg-blue-700 hover:text-white'
              : 'border-slate-100 bg-slate-50/50 text-slate-400 hover:border-blue-200 hover:bg-blue-50/80 hover:text-blue-600'
          )}
        >
          {isActive ? (
            <Check className="mr-1.5 h-3 w-3 stroke-[3px]" />
          ) : (
            <Plus className="mr-1.5 h-3 w-3" />
          )}
          {label}
        </Button>
      );
    })}
  </div>
);
