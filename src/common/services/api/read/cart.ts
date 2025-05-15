import { getApiClient } from '@/common/lib';
import { Product, ProductResponse, ProductsResponse } from '@/common/types';
import { adaptJSONPlaceholderProduct } from '@/common/utils';


export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await getApiClient().get(`/photos?_limit=12`);
    
    const adaptedProducts: Product[] = response.data.map(adaptJSONPlaceholderProduct);
    
    return {
      data: adaptedProducts,
      total: adaptedProducts.length,
      page: 1,
      limit: 12
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<ProductResponse> => {
  try {
    const response = await getApiClient().get(`/photos/${id}`);
    
    const adaptedProduct = adaptJSONPlaceholderProduct(response.data);
    
    return {
      data: adaptedProduct
    };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};