import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { productById, type Product } from "./products";

type CartLine = { id: string; qty: number };
type Ctx = {
  cart: CartLine[];
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

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("kc-cart") || "[]"));
      setWish(JSON.parse(localStorage.getItem("kc-wish") || "[]"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("kc-cart", JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("kc-wish", JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const value = useMemo<Ctx>(() => {
    const lines = cart
      .map((l) => ({ product: productById(l.id)!, qty: l.qty }))
      .filter((l) => l.product);
    const add = (id: string, qty = 1) => {
      setCart((c) => {
        const ex = c.find((l) => l.id === id);
        return ex ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) : [...c, { id, qty }];
      });
      toast.success(`${productById(id)?.name ?? "Item"} added to cart`);
    };
    return {
      cart,
      wishlist,
      lines,
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
      add,
      setQty: (id, qty) => setCart((c) => (qty < 1 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l)))),
      remove: (id) => setCart((c) => c.filter((l) => l.id !== id)),
      clear: () => setCart([]),
      toggleWish: (id) =>
        setWish((w) => {
          const has = w.includes(id);
          toast(has ? "Removed from wishlist" : "Saved to wishlist");
          return has ? w.filter((x) => x !== id) : [...w, id];
        }),
      inWish: (id) => wishlist.includes(id),
      moveToCart: (id) => {
        setWish((w) => w.filter((x) => x !== id));
        add(id);
      },
    };
  }, [cart, wishlist]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside StoreProvider");
  return c;
}
