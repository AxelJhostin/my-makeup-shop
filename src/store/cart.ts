// src/store/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant } from '@/types/database';

// Definimos qué es un "Item del Carrito"
export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isSideMenuOpen: boolean; // Para saber si el sidebar está abierto o cerrado
  
  // Acciones
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isSideMenuOpen: false,

      addItem: (product, variant, quantity = 1) => {
        const { items } = get();
        // Verificamos si el producto con ESE color ya está en el carrito
        const productInCart = items.some(
          (item) => item.variant.id === variant.id
        );

        if (!productInCart) {
          // Si no está, lo agregamos
          set({ items: [...items, { product, variant, quantity }] });
          // Y abrimos el menú para que el usuario vea que se agregó
          set({ isSideMenuOpen: true });
          return;
        }

        // Si ya está, solo sumamos la cantidad
        const updatedItems = items.map((item) => {
          if (item.variant.id === variant.id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });

        set({ items: updatedItems });
        set({ isSideMenuOpen: true });
      },

      removeItem: (variantId) => {
        const { items } = get();
        const updatedItems = items.filter(
          (item) => item.variant.id !== variantId
        );
        set({ items: updatedItems });
      },

      updateQuantity: (variantId, quantity) => {
        const { items } = get();
        const updatedItems = items.map((item) => {
          if (item.variant.id === variantId) {
            // Evitamos cantidades negativas
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      openSideMenu: () => set({ isSideMenuOpen: true }),
      closeSideMenu: () => set({ isSideMenuOpen: false }),
    }),
    {
      name: 'shopping-cart', // Nombre para guardar en localStorage
    }
  )
);