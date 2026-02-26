import { Suspense } from 'react';
import { BuilderSkeleton, ProductConstructor } from '@/modules/product-builder';

export default function App() {
  return (
    <div className="bg-bg-slate-50 min-h-screen">
      <section className="container mx-auto px-6 py-10">
        <header className="mb-10 max-w-2xl">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Создание новой позиции
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            Используйте шаблоны слева для быстрого старта или настройте
            структуру полей вручную. Ваше превью обновляется автоматически.
          </p>
        </header>

        <Suspense fallback={<BuilderSkeleton />}>
          <ProductConstructor />
        </Suspense>
      </section>
    </div>
  );
}
