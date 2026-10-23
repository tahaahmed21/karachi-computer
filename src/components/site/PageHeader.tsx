import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, intro, crumb, image }: { eyebrow: string; title: ReactNode; intro?: string; crumb?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="absolute inset-0 hex-bg opacity-70" />
      {image && (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-60 md:block" />
          <div className="absolute inset-0 hidden md:block" style={{ background: "var(--gradient-fade)" }} />
        </>
      )}
      <div className="container-kc relative py-16 md:py-24">
        {crumb && (
          <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link> <span className="mx-2 text-gold">/</span> <span className="text-foreground">{crumb}</span>
          </nav>
        )}
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal mt-4 max-w-2xl font-serif text-5xl font-semibold leading-[1.02] md:text-7xl">{title}</h1>
        {intro && <p className="reveal mt-5 max-w-xl text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}
