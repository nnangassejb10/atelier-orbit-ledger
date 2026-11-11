import { Link } from "@tanstack/react-router";
import { ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/decouvrir", label: "Découvrir" },
  { to: "/solde", label: "Solde" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [bump, setBump] = useState(0);
  useEffect(() => { if (count) setBump((b) => b + 1); }, [count]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-sm border border-primary font-mono text-xs text-primary">ES</span>
          <span className="font-display text-lg font-bold tracking-tight">E-shop<span className="text-primary">.</span>ga</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="spec rounded-sm px-3 py-2 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/connexion" aria-label="Mon compte" className="rounded-sm p-2 text-muted-foreground hover:text-foreground data-[status=active]:text-primary">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/panier" aria-label="Panier" className="relative rounded-sm p-2 text-muted-foreground hover:text-foreground data-[status=active]:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span key={bump} className="bump absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 font-mono text-[10px] text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      <nav className="flex justify-center gap-1 border-t md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="spec px-3 py-2.5 text-muted-foreground data-[status=active]:text-primary">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">E-shop<span className="text-primary">.</span>ga</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">Matériel informatique sélectionné, testé et livré à Libreville.</p>
        </div>
        <div className="spec space-y-2 text-muted-foreground">
          <p className="text-foreground">Boutique</p>
          <p>Nzeng-Ayong, Libreville</p>
          <p>+241 06 00 00 00</p>
          <p>contact@eshop-gabon.com</p>
        </div>
        <div className="spec space-y-2 text-muted-foreground md:text-right">
          <p className="text-foreground">Horaires</p>
          <p>Lun – Ven · 08h – 18h</p>
          <p>Sam · 09h – 13h</p>
        </div>
      </div>
      <div className="spec border-t px-5 py-4 text-center text-muted-foreground">
        Réalisé par Gloire JB NNANG — © 2025 E-shop
      </div>
    </footer>
  );
}

export function PageTitle({ code, title, children }: { code: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="blueprint border-b">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <p className="spec reveal text-primary">{code}</p>
        <h1 className="reveal mt-3 max-w-3xl text-4xl font-bold md:text-6xl" style={{ animationDelay: "80ms" }}>{title}</h1>
        {children && <div className="reveal mt-4 max-w-xl text-muted-foreground" style={{ animationDelay: "160ms" }}>{children}</div>}
      </div>
    </section>
  );
}
