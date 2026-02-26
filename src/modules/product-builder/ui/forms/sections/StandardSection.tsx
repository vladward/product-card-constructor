'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import {
  BuilderFilterType,
  TProduct,
} from '@/modules/product-builder/types/builder';
import {
  FIELD_CATEGORIES,
  FIELD_LABELS,
} from '@/modules/product-builder/lib/constants';
import { FormField } from '@/modules/product-builder/ui/forms/FormField';

export interface SectionProps {
  filter: BuilderFilterType;
  data: TProduct;
  activeKeys: Set<keyof TProduct>;
  onChange: (key: keyof TProduct, val: string | number | string[]) => void;
  onGenerateAI?: () => void;
}

export const StandardSection = memo(
  ({ filter, data, activeKeys, onChange, onGenerateAI }: SectionProps) => {
    const visibleKeys = (FIELD_CATEGORIES[filter] || []).filter((key) =>
      activeKeys.has(key)
    );

    if (visibleKeys.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-100 py-16 text-[10px] font-bold text-slate-300 uppercase italic">
          Нет активных полей
        </div>
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-2 space-y-5 duration-300">
        {filter === 'seo' && onGenerateAI && (
          <Button
            onClick={onGenerateAI}
            className="to-brand-blue h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Sparkles className="mr-2 h-4 w-4" /> Улучшить через AI
          </Button>
        )}

        {visibleKeys.map((key) => {
          const val = data[key];
          const isNumeric = typeof val === 'number';
          const isArray = Array.isArray(val);

          const displayValue = isArray
            ? (val as string[]).join(', ')
            : typeof val === 'boolean'
              ? val
                ? 'Да'
                : 'Нет'
              : (val ?? '');

          return (
            <FormField
              key={key}
              id={key}
              label={FIELD_LABELS[key] || (key as string).replace(/_/g, ' ')}
              type={isNumeric ? 'number' : 'text'}
              value={displayValue as string | number}
              onChange={(e) => {
                const raw = e.target.value;
                if (isArray) {
                  onChange(
                    key,
                    raw.split(',').map((s) => s.trim())
                  );
                } else {
                  onChange(
                    key,
                    isNumeric ? (raw === '' ? 0 : Number(raw)) : raw
                  );
                }
              }}
            />
          );
        })}
      </div>
    );
  }
);

StandardSection.displayName = 'StandardSection';
