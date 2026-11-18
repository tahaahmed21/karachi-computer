import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  categories as fallbackCategories,
  productById,
  products as fallbackProducts,
} from "./products";
import { fetchCatalog, type Catalog } from "./catalog-api";
import { StoreContext, type StoreContextValue } from "./store-context";

type CartLine = { id: string; qty: number };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  const [catalog, setCatalog] = useState<Catalog>({
    categories: fallbackCategories,
    products: fallbackProducts,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    void fetchCatalog()
      .then((nextCatalog) => {
        if (active && nextCatalog) setCatalog(nextCatalog);
      })
      .catch((error: unknown) => {
        console.error("Could not load the Supabase catalog; keeping the local catalog.", error);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("kc-cart") || "[]"));
      setWish(JSON.parse(localStorage.getItem("kc-wish") || "[]"));
    } catch (error) {
      console.error("Failed to load saved cart and wishlist data", error);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("kc-cart", JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("kc-wish", JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const value = useMemo<StoreContextValue>(() => {
    const findProduct = (id: string) =>
      catalog.products.find((product) => product.id === id) ?? productById(id);
    const lines = cart.flatMap((line) => {
      const product = findProduct(line.id);
      return product ? [{ product, qty: line.qty }] : [];
    });
    const add = (id: string, qty = 1) => {
      setCart((c) => {
        const ex = c.find((l) => l.id === id);
        return ex
          ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
          : [...c, { id, qty }];
      });
      toast.success(`${findProduct(id)?.name ?? "Item"} added to cart`);
    };
    return {
      categories: catalog.categories,
      products: catalog.products,
      cart,
      wishlist,
      lines,
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
      add,
      setQty: (id, qty) =>
        setCart((c) =>
          qty < 1 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
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
  }, [cart, wishlist, catalog]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
