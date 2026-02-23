'use client';

import { useProductBuilder } from '@/hooks/useProductBuilder';
import { FieldSelector } from './FieldSelector';
import { ProductPreview } from './ProductPreview';
import { toast } from 'sonner';
import ProductsList from '@/components/builder/ProductsList';
import EmptyRedactor from '@/components/builder/EmptyRedactor';
import ProductConstructorTabs from '@/components/builder/ProductConstructorTabs';

export default function ProductConstructor() {
  const { products, draft, activeKeys, currentId, actions } =
    useProductBuilder();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const urls = files.map((f) => URL.createObjectURL(f));
    actions.updatePhotos([...(draft.photos || []), ...urls]);
    toast.success(`Добавлено фото: ${files.length} шт.`);
  };

  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-start gap-8">
      <ProductsList
        products={products}
        currentId={currentId}
        addProduct={actions.addProduct}
        deleteProduct={actions.deleteProduct}
        selectProduct={actions.selectProduct}
        clearAll={actions.clearAll}
      />

      {draft && currentId ? (
        <>
          <main className="col-span-5 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/30">
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
                handlePhotoUpload={handlePhotoUpload}
              />
            </div>
          </main>

          <section className="sticky top-24 col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[310px]">
              <ProductPreview product={draft} activeKeys={activeKeys} />
            </div>
          </section>
        </>
      ) : (
        <EmptyRedactor reset={() => actions.reset()} />
      )}
    </div>
  );
}
