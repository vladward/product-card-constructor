import type { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ProductForm } from '@/components/builder/ProductForm';
import { Button } from '@/components/ui/button';
import { Code, Upload, X } from 'lucide-react';
import { IProductActions, TProduct } from '@/types/builder';
import { toast } from 'sonner';
import Image from "next/image";

type FilterType = 'main' | 'logistics' | 'seo' | 'others';

type ProductConstructorTabsProps = {
  activeKeys: Set<keyof TProduct>;
  draft: TProduct;
  actions: IProductActions;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProductConstructorTabs: FC<ProductConstructorTabsProps> = ({
  activeKeys,
  draft,
  actions,
  handlePhotoUpload,
}) => {
  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(draft, null, 2));
    toast.success('JSON скопирован в буфер обмена');
  };
  return (
    <Tabs defaultValue="main" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-5 rounded-xl border border-slate-200 bg-[#F1F5F9] p-1">
        {['main', 'logistics', 'seo', 'media', 'others'].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              'text-[9px] font-black uppercase transition-all',
              'text-[#64748B] hover:text-[#1E293B]',
              'data-[state=active]:bg-[#FFFFFF] data-[state=active]:text-[#2563EB] data-[state=active]:shadow-md'
            )}
          >
            {tab === 'main'
              ? 'Инфо'
              : tab === 'media'
                ? 'Медиа'
                : tab === 'others'
                  ? 'Прочее'
                  : tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="custom-scrollbar max-h-[500px] min-h-[420px] overflow-y-auto pr-3">
        {['main', 'logistics', 'seo', 'others'].map((filter) => (
          <TabsContent
            key={filter}
            value={filter}
            className="mt-0 outline-none"
          >
            <ProductForm
              activeKeys={activeKeys}
              data={draft}
              onChange={actions.updateField}
              filter={filter as FilterType}
              onGenerateAI={actions.generateAI}
            />
            {filter === 'others' && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full gap-2 border-dashed border-[#E2E8F0] bg-white text-[10px] font-bold text-[#64748B] hover:bg-[#F8FAFC]"
                onClick={() => copyJson()}
              >
                <Code className="h-3 w-3" /> Копировать Raw JSON
              </Button>
            )}
          </TabsContent>
        ))}

        <TabsContent value="media" className="mt-0 space-y-6 outline-none">
          <label className="group flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] transition-all hover:border-[#3B82F6] hover:bg-[#EFF6FF]">
            <div className="mb-3 rounded-full border border-[#F1F5F9] bg-[#FFFFFF] p-4 shadow-sm transition-transform group-hover:scale-110">
              <Upload className="h-6 w-6 text-[#2563EB]" />
            </div>
            <p className="text-[11px] font-black tracking-wide text-[#64748B] uppercase">
              Загрузить фотографии
            </p>
            <p className="mt-1 text-[9px] text-[#94A3B8]">PNG, JPG до 10МБ</p>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
              accept="image/*"
            />
          </label>

          <div className="grid grid-cols-3 gap-4">
            {draft?.photos?.map((url, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[#F1F5F9] bg-white shadow-sm"
              >
                <Image src={url} width={300} height={300} alt="photo_draft"  />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() =>
                      actions.updatePhotos(
                        draft.photos!.filter((_, idx) => idx !== i)
                      )
                    }
                    className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-[#EF4444]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductConstructorTabs;
