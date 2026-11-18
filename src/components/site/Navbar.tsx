import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Search, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { SearchOverlay } from "./SearchOverlay";
import { useStore } from "@/lib/store-hook";
import { categoryLink } from "./links";

const main = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
] as const;
const rest = [
  { to: "/desktop-computers", label: "Computers" },
  { to: "/laptops", label: "Laptops" },
  { to: "/accessories", label: "Accessories" },
  { to: "/deals", label: "Deals" },
  { to: "/contact", label: "Contact" },
] as const;

function Count({ n }: { n: number }) {
  if (!n) return null;
  return (
    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-primary-foreground">
      {n}
    </span>
  );
}

export function Navbar() {
  const { cartCount, wishlist, categories } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [cats, setCats] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    setMenu(false);
    setCats(false);
  }, [path]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const icon =
    "relative grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:text-gold";

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-gold-line bg-background/90 backdrop-blur-md" : "border-transparent bg-background"}`}
      >
        <div className="container-kc flex h-20 items-center justify-between gap-4">
          <Logo className="h-14 md:h-16" />
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {main.map((l) => (
              <Link key={l.to} to={l.to} className="nav-link" activeOptions={{ exact: true }}>
                {l.label}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setCats(true)}
              onMouseLeave={() => setCats(false)}
            >
              <Link
                to="/categories"
                className="nav-link inline-flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={cats}
                onFocus={() => setCats(true)}
              >
                Categories{" "}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${cats ? "rotate-180" : ""}`}
                />
              </Link>
              <div
                className={`absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-5 transition-all duration-200 ${cats ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
              >
                <div className="grid grid-cols-2 gap-1 rounded-md border border-gold-line bg-popover p-3 shadow-[var(--shadow-card)]">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      {...categoryLink(c.id)}
                      className="flex items-center gap-3 rounded-sm p-2 transition-colors hover:bg-accent"
                    >
                      <img src={c.image} alt="" className="h-11 w-11 rounded-sm object-cover" />
                      <span>
                        <span className="block text-sm text-foreground">{c.name}</span>
                        <span className="block text-xs text-muted-foreground">{c.label}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {rest.map((l) => (
              <Link key={l.to} to={l.to} className="nav-link">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button className={icon} aria-label="Search" onClick={() => setSearch(true)}>
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to="/wishlist" className={icon} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart className="h-[18px] w-[18px]" />
              <Count n={wishlist.length} />
            </Link>
            <Link to="/cart" className={icon} aria-label={`Cart, ${cartCount} items`}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              <Count n={cartCount} />
            </Link>
            <button
              className={`${icon} lg:hidden`}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${menu ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity ${menu ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${menu ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-background transition-all duration-300 lg:hidden ${menu ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <div className="hex-bg container-kc min-h-full py-8">
          <nav aria-label="Mobile" className="flex flex-col">
            {[
              ...main,
              { to: "/categories", label: "Categories" } as const,
              ...rest,
              { to: "/about", label: "About" } as const,
              { to: "/faq", label: "FAQ" } as const,
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="border-b border-border py-4 font-serif text-2xl text-foreground transition-colors data-[status=active]:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="eyebrow mt-8">Shop by category</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <Link
                key={c.id}
                {...categoryLink(c.id)}
                className="rounded-sm border border-border p-3 text-sm text-muted-foreground hover:border-gold-line hover:text-foreground"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
