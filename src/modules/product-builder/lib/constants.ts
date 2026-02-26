import {
  TProduct,
  BuilderFilterType,
} from '@/modules/product-builder/types/builder';

export const AVAILABLE_FIELDS = [
  { key: 'address', label: 'Адрес' },
  { key: 'marketplace_price', label: 'Цена' },
  { key: 'code', label: 'Артикул' },
  { key: 'chatting_percent', label: 'Кэшбэк (%)' },
  { key: 'seo_keywords', label: 'SEO Ключи' },
  { key: 'photos', label: 'Фотографии' },
] as const;

export const SKELETON_PRODUCT_ITEMS_COUNT = 3;

export const PAGINATION_ITEMS_PER_PAGE = 5;

export const TAB_CONFIG = [
  { id: 'main', label: 'Инфо' },
  { id: 'logistics', label: 'Логистика' },
  { id: 'seo', label: 'SEO' },
  { id: 'media', label: 'Медиа' },
  { id: 'others', label: 'Прочее' },
] as const;

export const FIELD_CATEGORIES: Record<BuilderFilterType, (keyof TProduct)[]> = {
  main: [
    'name',
    'type',
    'description_short',
    'description_long',
    'unit',
    'category',
  ],
  logistics: [
    'marketplace_price',
    'code',
    'address',
    'latitude',
    'longitude',
    'global_category_id',
    'production_time_min_from',
    'production_time_min_to',
  ],
  seo: [
    'seo_title',
    'seo_description',
    'seo_keywords',
    'cashback_type',
    'chatting_percent',
  ],
  media: [],
  others: [
    'manufacturer',
    'cashback_value',
    'external_id',
    'tags',
    'unit_name',
    'barcodes',
    'group_name',
    'qr_url',
  ],
};

export const FIELD_LABELS: Partial<Record<keyof TProduct, string>> = {
  name: 'Название товара',
  type: 'Тип позиции',
  description_short: 'Краткое описание',
  description_long: 'Полное описание',
  unit: 'Единица измерения',
  category: 'Категория',
  marketplace_price: 'Цена на маркетплейсе',
  code: 'Артикул (SKU)',
  address: 'Адрес склада',
  seo_title: 'SEO Заголовок',
  seo_description: 'SEO Описание',
  seo_keywords: 'Ключевые слова',
  chatting_percent: 'Процент кэшбэка',
  manufacturer: 'Производитель',
  tags: 'Теги (через запятую)',
  barcodes: 'Штрихкоды',
};
