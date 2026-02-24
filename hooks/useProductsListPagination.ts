import { useState } from 'react';
import { TProduct } from '@/types/builder';

export const useProductsListPagination = (products: TProduct[]) => {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  return { currentItems, currentPage, totalPages, setCurrentPage };
};
