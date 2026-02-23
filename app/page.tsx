import { Suspense } from 'react';
import ProductConstructor from '@/components/builder/ProductConstructor';
import { ConstructorSkeleton } from '@/components/builder/BuilderSkeleton';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <main className="container mx-auto px-6 py-10">
        <header className="mb-10 max-w-2xl">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Создание новой позиции
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            Используйте шаблоны слева для быстрого старта или настройте
            структуру полей вручную. Ваше превью обновляется автоматически.
          </p>
        </header>

        <Suspense fallback={<ConstructorSkeleton />}>
          <ProductConstructor />
        </Suspense>
      </main>
    </div>
  );
}
