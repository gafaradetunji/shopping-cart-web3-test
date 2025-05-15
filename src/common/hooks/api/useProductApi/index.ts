
import { getProductById, getProducts } from '@/common/services';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};