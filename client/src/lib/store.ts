import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './data';

interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  option: string;
  sub?: string;
}

interface AppState {
  cart: CartItem[];
  comparisonList: Product[];

  // Cart Actions
  addToCart: (product: Product, color: string, option: string, sub?: string) => void;
  removeFromCart: (productId: string, color: string, option: string) => void;
  updateQuantity: (productId: string, color: string, option: string, delta: number) => void;
  clearCart: () => void;

  // Comparison Actions
  toggleComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      comparisonList: [],

      addToCart: (product, color, option, sub) => set((state) => {
        const existingIndex = state.cart.findIndex(
          (item) => item.product.id === product.id && item.color === color && item.option === option
        );

        if (existingIndex !== -1) {
          const newCart = [...state.cart];
          newCart[existingIndex].quantity += 1;
          return { cart: newCart };
        }

        return {
          cart: [...state.cart, { product, quantity: 1, color, option, sub }]
        };
      }),

      removeFromCart: (productId, color, option) => set((state) => ({
        cart: state.cart.filter(
          (item) => !(item.product.id === productId && item.color === color && item.option === option)
        )
      })),

      updateQuantity: (productId, color, option, delta) => set((state) => ({
        cart: state.cart.map((item) => {
          if (item.product.id === productId && item.color === color && item.option === option) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
      })),

      clearCart: () => set({ cart: [] }),

      toggleComparison: (product) => set((state) => {
        const isPresent = state.comparisonList.some((p) => p.id === product.id);
        if (isPresent) {
          return { comparisonList: state.comparisonList.filter((p) => p.id !== product.id) };
        }
        if (state.comparisonList.length >= 3) {
          return state; // Limit to 3 for UI parity
        }
        return { comparisonList: [...state.comparisonList, product] };
      }),

      removeFromComparison: (productId) => set((state) => ({
        comparisonList: state.comparisonList.filter((p) => p.id !== productId)
      })),
    }),
    {
      name: 'techstore-storage',
    }
  )
);
