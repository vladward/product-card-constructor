import { useState, useMemo } from 'react';
import { TProduct } from '@/modules/product-builder/types/builder';
import { PAGINATION_ITEMS_PER_PAGE } from '@/modules/product-builder/lib/constants';

export const useProductsListPagination = (products: TProduct[]) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(products.length / PAGINATION_ITEMS_PER_PAGE)
  );

  const currentPage = page > totalPages ? totalPages : page;

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGINATION_ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + PAGINATION_ITEMS_PER_PAGE);
  }, [products, currentPage]);

  return {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage: setPage,
  };
};
