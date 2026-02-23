'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TProduct } from '@/types/builder';
import { MapPin, ShoppingCart, Star, Box, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

interface ProductPreviewProps {
  product: TProduct;
  activeKeys: Set<keyof TProduct>;
}

export const ProductPreview = ({
  product,
  activeKeys,
}: ProductPreviewProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const isVisible = (key: keyof TProduct) => activeKeys.has(key);

  const price = Number(product.marketplace_price) || 0;

  const cashback = Number(product.chatting_percent) || 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Card className="group animate-in fade-in zoom-in w-full max-w-[300px] gap-0 overflow-hidden rounded-[2.5rem] border-none bg-white p-0 shadow-2xl duration-500">
      <div className="relative aspect-square overflow-hidden rounded-t-[2.5rem] bg-slate-100">
        {isVisible('photos') && product.photos && product.photos.length > 0 ? (
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            className="scrollbar-hide flex h-full cursor-grab snap-x snap-mandatory overflow-x-auto scroll-smooth select-none active:cursor-grabbing"
          >
            {product.photos.map((url, i) => (
              <div key={i} className="h-full min-w-full shrink-0 snap-center">
                <img
                  src={url}
                  alt={`Product slide ${i}`}
                  className="pointer-events-none h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <Box className="h-12 w-12 opacity-20" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/10 to-transparent" />

        {isVisible('photos') && product.photos && product.photos.length > 1 && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/20 px-2 py-1.5 backdrop-blur-md">
            {product.photos.map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-white/70" />
            ))}
          </div>
        )}

        {isVisible('chatting_percent') && cashback > 0 && (
          <div className="animate-in slide-in-from-left-full absolute top-4 left-0 z-10 flex items-center gap-1 rounded-r-xl bg-blue-600 px-3 py-1.5 text-[10px] font-black text-white shadow-lg duration-500">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>{cashback}% КЭШБЭК</span>
          </div>
        )}
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="space-yb-2 mb-0">
          {isVisible('attributes') &&
            product.attributes &&
            product.attributes.length > 0 && (
              <div className="mb-1 flex items-center gap-1.5 text-slate-500">
                <div className="rounded-md bg-slate-100 p-1">
                  <Info className="h-2.5 w-2.5 text-slate-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-600">
                  {product.attributes[0]}
                </span>
                {product.attributes.length > 1 && (
                  <span className="text-[9px] font-medium text-slate-400">
                    +{product.attributes.length - 1} еще
                  </span>
                )}
              </div>
            )}

          {isVisible('name') && (
            <h3 className="mb-0 line-clamp-2 h-10 text-sm leading-tight font-extrabold text-slate-900">
              {product.name || 'Название товара'}
            </h3>
          )}
        </div>

        {isVisible('marketplace_price') && (
          <div className="mb-0 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {isMounted ? (price > 0 ? price.toLocaleString() : '0') : '0'} ₽
              </span>
              {price > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  {(price * 1.3).toFixed(0)} ₽
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3 border-t border-slate-50 pt-4">
          <div className="flex items-center justify-between gap-3">
            {isVisible('address') && (
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[10px] font-bold text-slate-900">
                    {product.address || 'Склад не указан'}
                  </span>

                  {Array.isArray(product.balances) &&
                  product.balances.some((b) => b > 0) ? (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-green-600">
                      <div className="h-1 w-1 animate-pulse rounded-full bg-green-500" />
                      Готов к отгрузке
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-amber-600">
                      <div className="h-1 w-1 rounded-full bg-amber-500" />
                      Под заказ
                    </span>
                  )}
                </div>
              </div>
            )}

            {isVisible('code') && (
              <div className="flex shrink-0 flex-col items-end">
                <span className="text-[8px] font-black tracking-widest text-slate-300 uppercase">
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
              <Badge
                variant="secondary"
                className="border-none bg-slate-100 px-2 py-0 text-[9px] font-bold text-slate-500"
              >
                {product.type || 'Товар'}
              </Badge>
            )}
            {isVisible('production_time_min_to') &&
              product.production_time_min_to && (
                <Badge
                  variant="outline"
                  className="border-blue-100 px-2 py-0 text-[9px] font-bold text-blue-600"
                >
                  Доставка: {product.production_time_min_to} дн.
                </Badge>
              )}
          </div>
        </div>

        <Button className="h-11 w-full gap-2 rounded-2xl bg-slate-900 text-xs font-bold text-white transition-all hover:bg-blue-600 active:scale-95">
          <ShoppingCart className="h-4 w-4" />
          Добавить
        </Button>
      </CardContent>
    </Card>
  );
};
