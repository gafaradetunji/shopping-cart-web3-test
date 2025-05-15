export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartRow {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}


export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductResponse {
  data: Product;
}