import { TProduct } from '@/types/builder';
import { Card } from '@/components/ui/card';
import { Box, MapPin, Hash } from 'lucide-react';

export const ProductListItem = ({ product }: { product: TProduct }) => (
  <Card className="group cursor-pointer border-slate-100 p-4 transition-shadow hover:shadow-md">
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-600">
          {product.name || 'Без названия'}
        </h4>
        <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400">
          <span className="flex items-center gap-1">
            <Hash className="h-3 w-3" /> {product.code || 'нет кода'}
          </span>
          <span className="flex items-center gap-1 uppercase">
            <Box className="h-3 w-3" /> {product.type}
          </span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm leading-none font-black text-slate-900">
          {product.marketplace_price ? `${product.marketplace_price} ₽` : '—'}
        </p>
      </div>
    </div>
    {product.address && (
      <div className="mt-3 line-clamp-1 flex items-center gap-1.5 border-t border-slate-50 pt-3 text-[10px] text-slate-500 italic">
        <MapPin className="h-3 w-3 text-slate-300" />
        {product.address}
      </div>
    )}
  </Card>
);
