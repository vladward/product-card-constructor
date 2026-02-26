'use client';

import { useProductBuilder } from '@/modules/product-builder/hooks/useProductBuilder';
import { FieldSelector } from '../forms/FieldSelector';
import { ProductPreview } from '../preview/ProductPreview';
import { ProductsList } from '@/modules/product-builder/ui/list/ProductsList';
import { ProductConstructorTabs } from '@/modules/product-builder/ui/constructor/ProductConstructorTabs';
import { EmptyRedactor } from '@/modules/product-builder/ui/constructor/EmptyRedactor';

export const ProductConstructor = () => {
  const { products, draft, activeKeys, currentId, actions } =
    useProductBuilder();

  if (!draft || !currentId) {
    return <EmptyRedactor reset={actions.reset} />;
  }

  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-start gap-8">
      <ProductsList
        products={products}
        currentId={currentId}
        actions={actions}
      />

      <div className="col-span-5 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/30">
        <div className="space-y-8 p-8">
          <header className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Редактор
              </h2>
              <p className="text-xs font-medium text-slate-400">
                Конфигурация параметров маркетплейса
              </p>
            </div>
          </header>

          <FieldSelector
            activeKeys={activeKeys}
            onToggle={actions.toggleField}
          />

          <ProductConstructorTabs
            activeKeys={activeKeys}
            actions={actions}
            draft={draft}
            handlePhotoUpload={actions.uploadPhotos}
          />
        </div>
      </div>

      <section className="sticky top-24 col-span-4 flex flex-col items-center">
        <div className="relative w-full max-w-[310px]">
          <ProductPreview product={draft} activeKeys={activeKeys} />
        </div>
      </section>
    </div>
  );
};
