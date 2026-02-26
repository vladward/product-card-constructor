'use client';

import { memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductForm } from '../forms/ProductForm';
import {
  IProductActions,
  TProduct,
} from '@/modules/product-builder/types/builder';
import { TAB_CONFIG } from '@/modules/product-builder/lib/constants';

interface ProductConstructorTabsProps {
  activeKeys: Set<keyof TProduct>;
  draft: TProduct;
  actions: IProductActions;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductConstructorTabs = memo(
  ({
    activeKeys,
    draft,
    actions,
    handlePhotoUpload,
  }: ProductConstructorTabsProps) => {
    return (
      <Tabs defaultValue={TAB_CONFIG[0].id} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-5 rounded-2xl border border-slate-200 bg-slate-100/50 p-1">
          {TAB_CONFIG.map(({ id, label }) => (
            <TabsTrigger
              key={id}
              value={id}
              className="data-[state=active]:text-brand-blue rounded-xl text-[9px] font-black uppercase transition-all data-[state=active]:shadow-sm"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="custom-scrollbar max-h-[520px] min-h-[420px] overflow-y-auto pr-2">
          {TAB_CONFIG.map(({ id }) => (
            <TabsContent key={id} value={id} className="mt-0 outline-none">
              <ProductForm
                filter={id}
                data={draft}
                activeKeys={activeKeys}
                actions={actions}
                onUpload={handlePhotoUpload}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    );
  }
);

ProductConstructorTabs.displayName = 'ProductConstructorTabs';
