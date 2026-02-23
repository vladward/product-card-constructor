import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TProduct } from '@/types/builder';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export const FIELD_CATEGORIES: Record<string, (keyof TProduct)[]> = {
  main: [
    'name',
    'type',
    'description_short',
    'description_long',
    'unit',
    'category',
  ],
  logistics: [
    'marketplace_price',
    'code',
    'address',
    'latitude',
    'longitude',
    'global_category_id',
    'production_time_min_from',
    'production_time_min_to',
  ],
  seo: [
    'seo_title',
    'seo_description',
    'seo_keywords',
    'cashback_type',
    'chatting_percent',
  ],
  others: [
    'manufacturer',
    'cashback_value',
    'external_id',
    'tags',
    'unit_name',
    'barcodes',
    'group_name',
    'qr_url',
  ],
};

interface ProductFormProps {
  activeKeys: Set<keyof TProduct>;
  data: TProduct;
  onChange: (key: keyof TProduct, val: any) => void;
  onGenerateAI?: () => void;
  filter: 'main' | 'logistics' | 'seo' | 'media' | 'others';
}

export const ProductForm = ({
  activeKeys,
  data,
  onChange,
  onGenerateAI,
  filter,
}: ProductFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAI = async () => {
    if (!onGenerateAI) return;
    setIsGenerating(true);
    try {
      await onGenerateAI();
      toast.success('SEO данные сгенерированы');
    } finally {
      setIsGenerating(false);
    }
  };

  const categoryKeys = FIELD_CATEGORIES[filter] || [];

  const visibleKeys = Array.from(activeKeys).filter((key) =>
    categoryKeys.includes(key)
  );

  return (
    <div className="space-y-5 py-2">
      {filter === 'seo' && onGenerateAI && (
        <Button
          onClick={handleAI}
          disabled={isGenerating}
          type="button"
          className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-white shadow-lg"
        >
          {isGenerating && (
            <div className="absolute inset-0 animate-pulse bg-black/20" />
          )}

          <div className="relative flex items-center justify-center">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Нейросеть думает...</span>
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                <span>Сгенерировать через AI</span>
              </>
            )}
          </div>
        </Button>
      )}

      {visibleKeys.length > 0
        ? visibleKeys.map((key) => (
            <div
              key={key}
              className="animate-in fade-in slide-in-from-top-1 space-y-1.5 duration-300"
            >
              <Label className="ml-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                {key.replace(/_/g, ' ')}
              </Label>
              <Input
                className="h-10 border-slate-200 bg-white text-black shadow-sm transition-all focus-visible:border-blue-500 focus-visible:ring-blue-500"
                value={
                  Array.isArray((data as any)[key])
                    ? (data as any)[key].join(', ')
                    : (data as any)[key] || ''
                }
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (key === 'seo_keywords' || key === 'tags') {
                    onChange(
                      key,
                      rawValue.split(',').map((s) => s.trim())
                    );
                  } else {
                    const val =
                      e.target.type === 'number' ? Number(rawValue) : rawValue;
                    onChange(key, val);
                  }
                }}
                type={
                  typeof (data as any)[key] === 'number' ? 'number' : 'text'
                }
                placeholder={`Введите ${key}...`}
              />
            </div>
          ))
        : filter !== 'media' && (
            <div className="rounded-2xl border-2 border-dashed border-slate-100 py-10 text-center">
              <p className="text-xs font-medium text-slate-400 italic">
                В этой категории пока нет активных полей
              </p>
            </div>
          )}
    </div>
  );
};
