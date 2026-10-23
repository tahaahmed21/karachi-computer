import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { brands, categories, categoryById, products, type CategoryId } from "@/lib/products";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductGrid } from "@/components/site/ProductCard";
import { seo } from "@/lib/seo";

type Search = { category?: CategoryId; q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const r: Search = {};
    const c = s["category"], q = s["q"];
    if (typeof c === "string" && categoryById(c)) r.category = c as CategoryId;
    if (typeof q === "string" && q) r.q = q;
    return r;
  },
  head: () => seo("Shop", "Browse computers, laptops, components, monitors and accessories at Karachi Computers."),
  component: Shop,
});

const MAX = Math.max(...products.map((p) => p.price));

function Shop() {
  const search = Route.useSearch();
  const nav = useNavigate({ from: "/shop" });
  const [q, setQ] = useState(search.q ?? "");
  const [cats, setCats] = useState<CategoryId[]>(search.category ? [search.category] : []);
  const [brs, setBrs] = useState<string[]>([]);
  const [max, setMax] = useState(MAX);
  const [sort, setSort] = useState("featured");
  const [drawer, setDrawer] = useState(false);

  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const clear = () => { setQ(""); setCats([]); setBrs([]); setMax(MAX); nav({ search: {} }); };

  const items = useMemo(() => {
    const t = q.trim().toLowerCase();
    const r = products.filter((p) =>
      (!t || `${p.name} ${p.brand} ${p.spec} ${categoryById(p.category)?.name}`.toLowerCase().includes(t)) &&
      (!cats.length || cats.includes(p.category)) &&
      (!brs.length || brs.includes(p.brand)) &&
      p.price <= max,
    );
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    if (sort === "name") r.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") r.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return r;
  }, [q, cats, brs, max, sort]);

  const box = "h-4 w-4 accent-[var(--gold)]";
  const filters = (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-4">Category</p>
        <div className="space-y-3">
          {categories.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
              <input type="checkbox" className={box} checked={cats.includes(c.id)} onChange={() => setCats(toggle(cats, c.id))} /> {c.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-4">Brand (demo)</p>
        <div className="space-y-3">
          {brands.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
              <input type="checkbox" className={box} checked={brs.includes(b)} onChange={() => setBrs(toggle(brs, b))} /> {b}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-4">Max price</p>
        <input type="range" min={5000} max={MAX} step={5000} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-[var(--gold)]" />
        <p className="mt-2 text-sm text-gold">Up to Rs {max.toLocaleString("en-PK")}</p>
      </div>
      <button onClick={clear} className="btn-outline-gold w-full">Clear filters</button>
    </div>
  );

  return (
    <>
      <PageHeader eyebrow="The catalogue" title="Shop" intro="Every system, laptop and accessory in one place." crumb="Shop" />
      <section className="container-kc py-12">
        <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input className="field" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
          <select className="field sm:w-52" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Name A–Z</option>
          </select>
          <button onClick={() => setDrawer(true)} className="btn-outline-gold lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
        </div>
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">{filters}</aside>
          <div className="min-w-0">
            <p className="mb-6 text-sm text-muted-foreground">{items.length} {items.length === 1 ? "product" : "products"}</p>
            {items.length ? <ProductGrid items={items} /> : (
              <div className="rounded-md border border-dashed border-gold-line py-20 text-center">
                <p className="font-serif text-3xl">Nothing matches yet</p>
                <p className="mt-2 text-sm text-muted-foreground">Try a different search or clear your filters.</p>
                <button onClick={clear} className="btn-gold mt-6">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className={`fixed inset-0 z-[55] lg:hidden ${drawer ? "visible" : "invisible"}`}>
        <div onClick={() => setDrawer(false)} className={`absolute inset-0 bg-background/70 transition-opacity ${drawer ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto border-l border-gold-line bg-surface p-6 transition-transform duration-300 ${drawer ? "translate-x-0" : "translate-x-full"}`}>
          <div className="mb-8 flex items-center justify-between">
            <p className="font-serif text-2xl">Filters</p>
            <button onClick={() => setDrawer(false)} aria-label="Close filters" className="grid h-9 w-9 place-items-center rounded-full border border-border"><X className="h-4 w-4" /></button>
          </div>
          {filters}
          <button onClick={() => setDrawer(false)} className="btn-gold mt-4 w-full">Show {items.length} products</button>
        </div>
      </div>
    </>
  );
}
