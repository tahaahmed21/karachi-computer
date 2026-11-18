import { createContext } from "react";
import type { Category, Product } from "./products";

export type StoreContextValue = {
  categories: Category[];
  products: Product[];
  cart: { id: string; qty: number }[];
  wishlist: string[];
  cartCount: number;
  subtotal: number;
  lines: { product: Product; qty: number }[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  inWish: (id: string) => boolean;
  moveToCart: (id: string) => void;
};

export const StoreContext = createContext<StoreContextValue | null>(null);
