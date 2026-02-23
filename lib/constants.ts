import { TProduct } from '@/types/builder';

export const AVAILABLE_FIELDS: { key: keyof TProduct; label: string }[] = [
  { key: 'address', label: 'Адрес' },
  { key: 'marketplace_price', label: 'Цена' },
  { key: 'code', label: 'Артикул' },
  { key: 'chatting_percent', label: 'Кэшбэк (%)' },
  { key: 'seo_keywords', label: 'SEO Ключи' },
  { key: 'photos', label: 'Фотографии' },
];
