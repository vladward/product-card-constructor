import { useState, useMemo, ChangeEvent } from 'react';
import {
  IProductActions,
  TProduct,
} from '@/modules/product-builder/types/builder';
import { MOCK_PRODUCTS } from '@/modules/product-builder/lib/mocks';
import { toast } from 'sonner';
import { FIELD_CATEGORIES } from '@/modules/product-builder/lib/constants';

const initialKeys: (keyof TProduct)[] = [
  'name',
  'type',
  'description_short',
  'marketplace_price',
];

export const useProductBuilder = () => {
  const allPossibleKeys = Object.values(FIELD_CATEGORIES).flat();

  const [products, setProducts] = useState<TProduct[]>(MOCK_PRODUCTS);
  const [currentId, setCurrentId] = useState<number | string>(
    MOCK_PRODUCTS[0]?.id || ''
  );
  const [activeKeys, setActiveKeys] = useState<Set<keyof TProduct>>(
    new Set(allPossibleKeys)
  );

  const draft = useMemo(
    () => products.find((p) => p.id === currentId) || products[0],
    [products, currentId]
  );

  const qualityScore = useMemo(() => {
    if (!draft) return 0;
    const fields = Array.from(activeKeys);
    if (fields.length === 0) return 0;
    const filled = fields.filter((k) => {
      const val = draft[k];
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'boolean') return true;
      return !!val && val !== '';
    }).length;
    return Math.round((filled / fields.length) * 100);
  }, [draft, activeKeys]);

  const actions: IProductActions = {
    updateField: (key: keyof TProduct, val: string | number | string[]) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === currentId ? { ...p, [key]: val } : p))
      );
    },

    updatePhotos: (urls) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === currentId) {
            p.photos?.forEach((url) => {
              if (url.startsWith('blob:') && !urls.includes(url))
                URL.revokeObjectURL(url);
            });
            return { ...p, photos: urls };
          }
          return p;
        })
      );
    },

    toggleField: (key: keyof TProduct) => {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        // Теперь мы просто переключаем любой ключ без ограничений
        next.has(key) ? next.delete(key) : next.add(key);
        return next;
      });
    },

    addProduct: (name: string, price: number) => {
      const newProduct: TProduct = {
        id: Date.now(),
        name,
        marketplace_price: price,
        type: 'product',
        description_short: '',
        description_long: '',
        photos: [],
        created_at: Math.floor(Date.now() / 1000),
      };
      setProducts((prev) => [newProduct, ...prev]);
      setCurrentId(newProduct.id);
    },

    selectProduct: (id: number | string) => {
      setCurrentId(id);
    },

    deleteProduct: (id: number | string) => {
      setProducts((prev) => {
        const next = prev.filter((p) => p.id !== id);
        if (id === currentId) {
          setCurrentId(next.length > 0 ? next[0].id : '');
        }
        return next;
      });
      toast.success('Товар удален из списка');
    },
    uploadPhotos: (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const urls = files.map((f) => URL.createObjectURL(f));
      const currentPhotos =
        products.find((p) => p.id === currentId)?.photos || [];
      actions.updatePhotos([...currentPhotos, ...urls]);
      toast.success(`Добавлено фото: ${files.length} шт.`);
    },

    clearAll: () => {
      setProducts([]);
      setCurrentId('');
      toast.success('Список полностью очищен', {
        description: 'Все черновики были удалены',
        duration: 3000,
      });
    },

    reset: () => {
      setProducts(MOCK_PRODUCTS);
      setCurrentId(MOCK_PRODUCTS[0].id);
      setActiveKeys(new Set(initialKeys));
    },

    generateAI: async () => {
      if (!draft?.name) return;
      await new Promise((r) => setTimeout(r, 1500));
      actions.updateField('seo_title', `Купить ${draft.name} выгодно`);
      actions.updateField(
        'seo_description',
        `Лучший выбор: ${draft.name}. Доставка по РФ.`
      );
      actions.updateField('seo_keywords', ['маркетплейс', 'топ', draft.name]);
    },
  };

  return {
    products,
    draft,
    activeKeys,
    currentId,
    qualityScore,
    actions,
  };
};
