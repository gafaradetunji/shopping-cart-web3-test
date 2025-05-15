/**
 * This function type can be used to set a zustand state from an external function to the store.
 */
export type SetState<State> = (
  partial: Partial<State> | ((state: State) => Partial<State>),
) => void;

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