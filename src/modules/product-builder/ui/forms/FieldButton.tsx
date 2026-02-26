import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Plus } from 'lucide-react';

type FieldButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const FieldButton = memo(
  ({ label, isActive, onClick }: FieldButtonProps) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
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
  )
);

FieldButton.displayName = 'FieldButton';
