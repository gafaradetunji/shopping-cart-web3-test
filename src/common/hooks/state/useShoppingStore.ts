// store/useCartStore.ts
import { CartItem, CartRow, Product } from '@/common/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DISCOUNT_PERCENTAGE = 10;
const VALID_COUPON = 'WEB3BRIDGECOHORTx';

type CartState = {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponApplied: boolean;
  cartRows: CartRow[];
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  validateCoupon: (coupon: string) => { valid: boolean; message: string };
  applyCoupon: (valid: boolean) => void;
  
  // Helper methods
  calculateTotals: () => void;
  updateCartRows: () => void;
};

const calculateCartTotals = (items: CartItem[], couponApplied: boolean) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponApplied ? (subtotal * DISCOUNT_PERCENTAGE) / 100 : 0;
  const total = subtotal - discount;
  
  return { subtotal, discount, total };
};

// Convert cart items to rows for DataGrid
const createCartRows = (items: CartItem[]): CartRow[] => {
  return items.map((item) => ({
    id: item.id,
    productId: item.id,
    title: item.title || '',
    price: typeof item.price === 'number' ? item.price : 0,
    quantity: item.quantity || 0,
    total: typeof item.price === 'number' ? item.price * (item.quantity || 0) : 0,
    image: item.url || ''
  }));
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      couponApplied: false,
      cartRows: [],
      
     
      calculateTotals: () => {
        const { items, couponApplied } = get();
        const { subtotal, discount, total } = calculateCartTotals(items, couponApplied);
        set({ subtotal, discount, total });
      },
      
      // Update cart rows for DataGrid
      updateCartRows: () => {
        const { items } = get();
        const cartRows = createCartRows(items);
        set({ cartRows });
      },
      
      // Add item to cart
      addItem: (product) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(item => item.id === product.id);
        
        let updatedItems: CartItem[];
        
        if (existingItemIndex >= 0) {
          // Increment quantity if item exists
          updatedItems = items.map((item, index) => 
            index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // Add new item with quantity 1
          const newItem: CartItem = { ...product, quantity: 1 };
          updatedItems = [...items, newItem];
        }
        
        set({ items: updatedItems });
        get().calculateTotals();
        get().updateCartRows();
      },
      
      // Remove item from cart
      removeItem: (id) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== id);
        
        set({ items: updatedItems });
        get().calculateTotals();
        get().updateCartRows();
      },
      
      // Update item quantity
      updateQuantity: (id, quantity) => {
        // Only update if quantity is valid (> 0)
        if (quantity <= 0) return;
        
        const { items } = get();
        const updatedItems = items.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
        
        set({ items: updatedItems });
        get().calculateTotals();
        get().updateCartRows();
      },
      
      // Validate coupon code
      validateCoupon: (coupon) => {
        // Regex to validate coupon format (alphanumeric)
        const couponRegex = /^[A-Za-z0-9]+$/;
        
        if (!couponRegex.test(coupon)) {
          return { valid: false, message: 'Invalid coupon format' };
        }
        
        const isValid = coupon === VALID_COUPON;
        return { 
          valid: isValid, 
          message: isValid ? 'Coupon applied successfully!' : 'Invalid coupon code' 
        };
      },
      
      // Apply coupon discount
      applyCoupon: (valid) => {
        set({ couponApplied: valid });
        get().calculateTotals();
      }
    }),
    {
      name: 'shopping-cart', // unique name for localStorage
      partialize: (state) => ({ items: state.items, couponApplied: state.couponApplied }),
    }
  )
);