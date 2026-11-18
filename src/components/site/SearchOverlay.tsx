import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { formatPKR } from "@/lib/products";
import { useStore } from "@/lib/store-hook";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { categories, products } = useStore();
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!open) return;
    setTimeout(() => ref.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return products.filter((p) =>
      [
        p.name,
        p.brand,
        categories.find((category) => category.id === p.category)?.name ?? "",
        p.spec,
      ]
        .join(" ")
        .toLowerCase()
        .includes(t),
    );
  }, [categories, products, q]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Search products"
      className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="container-kc pt-6 md:pt-16">
        <div className="flex items-center gap-4 border-b border-gold-line pb-4">
          <Search className="h-5 w-5 text-gold" />
          <input
            ref={ref}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search laptops, graphics cards, monitors…"
            className="w-full bg-transparent font-serif text-2xl text-foreground outline-none placeholder:text-muted-foreground md:text-4xl"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-gold"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 max-h-[70vh] overflow-y-auto pb-10">
          {!q && (
            <p className="text-sm text-muted-foreground">
              Search by product name, brand or category.
            </p>
          )}
          {q && results.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-serif text-2xl">No matches for “{q}”</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a category such as “laptop” or “monitor”.
              </p>
            </div>
          )}
          <ul className="grid gap-3 md:grid-cols-2">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to="/product/$id"
                  params={{ id: p.id }}
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-md border border-border bg-elevated p-3 transition-colors hover:border-gold-line"
                >
                  <img src={p.images[0]} alt="" className="h-16 w-16 rounded-sm object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {categories.find((category) => category.id === p.category)?.name}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gold">{formatPKR(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
