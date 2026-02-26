import { TProduct } from '@/modules/product-builder/types/builder';
import { AVAILABLE_FIELDS } from '@/modules/product-builder/lib/constants';
import { FieldButton } from '@/modules/product-builder/ui/forms/FieldButton';

type FieldSelectorType = {
  activeKeys: Set<keyof TProduct>;
  onToggle: (key: keyof TProduct) => void;
};

export const FieldSelector = ({ activeKeys, onToggle }: FieldSelectorType) => (
  <div className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
    {AVAILABLE_FIELDS.map(({ key, label }) => (
      <FieldButton
        key={key}
        label={label}
        isActive={activeKeys.has(key)}
        onClick={() => onToggle(key)}
      />
    ))}
  </div>
);
