import { FC, useState, useEffect } from 'react';
import { Box, ChevronLeft, ChevronRight, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { TProduct } from '@/types/builder';
import { AddProductDialog } from './AddProductDialog';

type ProductsListProps = {
  products: TProduct[];
  currentId: string | number;
  clearAll: () => void;
  selectProduct: (id: number | string) => void;
  deleteProduct: (id: number | string) => void;
  addProduct: (name: string, price: number) => void;
};

const ProductsList: FC<ProductsListProps> = ({
  products,
  currentId,
  addProduct,
  deleteProduct,
  selectProduct,
  clearAll,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { currentItems, currentPage, totalPages, setCurrentPage } =
    useProductsListPagination(products);

  const handleCreate = ({ name, value }: { name: string; value: string }) => {
    if (!name) return toast.error('Введите название');
    addProduct(name, Number(value));
    setIsDialogOpen(false);
    toast.success('Товар создан');
  };
  return (
    <aside className="sticky top-24 col-span-3 flex h-[650px] flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/50 p-5 shadow-sm transition-all">
      <div className="mb-6 flex shrink-0 flex-col gap-3 px-1">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-50 p-2">
              <Box className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="text-[10px] font-black tracking-[0.15em] text-slate-500 uppercase">
              Библиотека
            </h3>
          </div>
          {products.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearAll}
              className="h-8 w-8 cursor-pointer rounded-full text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
              title="Удалить все"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <AddProductDialog
          isOpen={isDialogOpen}
          onOpen={setIsDialogOpen}
          onCreate={handleCreate}
        />
      </div>

      <div className="custom-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {products.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-100 opacity-50">
            <Box className="mb-2 h-10 w-10 text-slate-200" />
            <p className="text-[9px] font-black text-slate-400 uppercase">
              Список пуст
            </p>
          </div>
        ) : (
          currentItems.map((item) => (
            <div key={item.id} className="group relative">
              <button
                onClick={() => selectProduct(item.id)}
                className={cn(
                  'relative w-full overflow-hidden rounded-[1.25rem] border-2 p-4 text-left transition-all',
                  currentId === item.id
                    ? 'z-10 scale-[1.01] border-[#2563EB] bg-white shadow-lg ring-4 shadow-blue-50 ring-blue-500/5'
                    : 'border-[#F1F5F9] bg-white hover:border-[#3B82F6]'
                )}
              >
                <p
                  className={cn(
                    'truncate text-xs font-black transition-colors',
                    currentId === item.id ? 'text-[#2563EB]' : 'text-[#1E293B]'
                  )}
                >
                  {item.name || 'Без названия'}
                </p>
                <p className="mt-1 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">
                  ID: {String(item.id).slice(-6)}
                </p>
                {currentId === item.id && (
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#2563EB]" />
                )}
              </button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProduct(item.id);
                }}
                className="absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full bg-[#F8FAFC] p-1 text-slate-400 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-[#EF4444] hover:text-white"
              >
                <X className="h-2 w-2" />
              </Button>
            </div>
          ))
        )}
      </div>

      <ProductsListPagination
        onPageNext={() => setCurrentPage((prev) => prev + 1)}
        onPagePrev={() => setCurrentPage((prev) => prev - 1)}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </aside>
  );
};

export default ProductsList;
