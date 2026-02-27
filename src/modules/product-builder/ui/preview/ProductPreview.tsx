'use client';

import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { MapPin, ShoppingCart, Info } from 'lucide-react';
import { TProduct } from '@/modules/product-builder/types/builder';
import { PreviewImage } from './PreviewImage';

interface ProductPreviewProps {
  product: TProduct;
  activeKeys: Set<keyof TProduct>;
}

export const ProductPreview = memo(
  ({ product, activeKeys }: ProductPreviewProps) => {
    const isVisible = (key: keyof TProduct) => activeKeys.has(key);

    const price = Number(product.marketplace_price) || 0;
    const oldPrice = (price * 1.3).toFixed(0);

    return (
      <Card className="animate-in fade-in zoom-in w-full max-w-[300px] overflow-hidden rounded-[2.5rem] border-none bg-white pt-0 shadow-2xl duration-500">
        <PreviewImage
          photos={isVisible('photos') ? product.photos : []}
          hasCashback={isVisible('chatting_percent')}
          cashback={Number(product.chatting_percent) || 0}
        />

        <CardContent className="space-y-4 p-5">
          <div className="space-y-1">
            {isVisible('attributes') && product.attributes?.[0] && (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                <Info className="h-2.5 w-2.5" />
                <span>{product.attributes[0]}</span>
              </div>
            )}
            {isVisible('name') && (
              <h3 className="line-clamp-2 h-10 text-sm leading-tight font-extrabold text-slate-900">
                {product.name || 'Название товара'}
              </h3>
            )}
          </div>

          {isVisible('marketplace_price') && (
            <div className="flex items-baseline gap-2">
              <span
                suppressHydrationWarning
                className="text-2xl font-black text-slate-900"
              >
                {price.toLocaleString()} ₽
              </span>
              {price > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  {oldPrice} ₽
                </span>
              )}
            </div>
          )}

          <div className="space-y-3 border-t border-slate-50 pt-4">
            <div className="flex items-center justify-between gap-2">
              {isVisible('address') && (
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-[10px] font-bold text-slate-900">
                      {product.address || 'Склад...'}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-green-600">
                      <div className="h-1 w-1 animate-pulse rounded-full bg-green-500" />{' '}
                      Готов
                    </span>
                  </div>
                </div>
              )}
              {isVisible('code') && (
                <div className="flex shrink-0 flex-col items-end">
                  <span className="text-[8px] font-black text-slate-300 uppercase">
                    Code
                  </span>
                  <span className="rounded bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-500">
                    {product.code?.toString().slice(-6) || '---'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {isVisible('type') && (
                <Badge className="border-none bg-slate-100 text-[9px] text-slate-500">
                  {product.type || 'Товар'}
                </Badge>
              )}
              {isVisible('production_time_min_to') &&
                product.production_time_min_to && (
                  <Badge
                    variant="outline"
                    className="border-blue-100 text-[9px] text-blue-600"
                  >
                    {product.production_time_min_to} дн.
                  </Badge>
                )}
            </div>
          </div>

          <Button className="h-11 w-full gap-2 rounded-2xl bg-slate-900 text-slate-50 shadow-sm transition-all hover:bg-blue-600 active:scale-95 dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-blue-500">
            <ShoppingCart className="h-4 w-4" />
            Добавить
          </Button>
        </CardContent>
      </Card>
    );
  }
);

ProductPreview.displayName = 'ProductPreview';
