import { FC, useState } from 'react';
import { Box, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  IProductActions,
  TProduct,
} from '@/modules/product-builder/types/builder';
import { AddProductDialog } from './AddProductDialog';
import { ProductListItem } from '@/modules/product-builder/ui/list/ProductListItem';
import { useProductsListPagination } from '@/modules/product-builder/hooks/useProductsListPagination';
import { ProductsListPagination } from '@/modules/product-builder/ui/list/ProductsListPagination';

type ProductsListProps = {
  products: TProduct[];
  currentId: string | number;
  actions: IProductActions;
};

export const ProductsList = ({
  products,
  currentId,
  actions,
}: ProductsListProps) => {
  const { addProduct, selectProduct, clearAll, deleteProduct } = actions;

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
    <aside className="sticky top-24 col-span-3 flex h-[750px] flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/50 p-5 shadow-sm transition-all">
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
            <ProductListItem
              key={item.id}
              item={item}
              isSelected={item.id === currentId}
              onSelect={selectProduct}
              onRemove={deleteProduct}
            />
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
