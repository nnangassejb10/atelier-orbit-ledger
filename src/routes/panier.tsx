import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { PageTitle } from "@/components/SiteChrome";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon panier | E-shop" },
      { name: "description", content: "Vérifiez vos articles et finalisez votre commande E-shop." },
      { property: "og:title", content: "Mon panier | E-shop" },
      { property: "og:description", content: "Vérifiez vos articles et finalisez votre commande." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Panier,
});

function Panier() {
  const { lines, total, setQty, remove } = useCart();
  return (
    <>
      <PageTitle code="05 / Panier" title="Mon panier" />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pt-12 lg:grid-cols-[1fr_340px]">
        <div className="divide-y border">
          {lines.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-muted-foreground">Votre panier est vide.</p>
              <Link to="/" className="spec mt-4 inline-block text-primary hover:underline">Parcourir le catalogue →</Link>
            </div>
          )}
          {lines.map((l) => (
            <div key={l.id} className="flex items-center gap-4 p-4">
              <img src={l.image} alt={l.name} className="h-20 w-20 bg-studio object-contain p-2" />
              <div className="min-w-0 flex-1">
                <p className="spec text-primary">{l.category}</p>
                <p className="truncate font-display font-semibold">{l.name}</p>
                <p className="font-mono text-sm text-muted-foreground">{formatPrice(l.price)}</p>
              </div>
              <div className="flex items-center border">
                <button aria-label="Moins" onClick={() => setQty(l.id, l.qty - 1)} className="p-2 hover:text-primary"><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-8 text-center font-mono text-sm">{l.qty}</span>
                <button aria-label="Plus" onClick={() => setQty(l.id, l.qty + 1)} className="p-2 hover:text-primary"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <p className="hidden w-32 text-right font-mono text-sm sm:block">{formatPrice(l.price * l.qty)}</p>
              <button aria-label="Retirer" onClick={() => remove(l.id)} className="p-2 text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        <aside className="brackets h-fit border bg-card p-6">
          <p className="spec text-muted-foreground">Récapitulatif</p>
          <div className="mt-4 flex justify-between text-sm"><span>Livraison Libreville</span><span className="font-mono">Offerte</span></div>
          <div className="mt-4 flex items-end justify-between border-t pt-4">
            <span className="spec">Total</span>
            <span className="font-display text-2xl font-bold">{formatPrice(total)}</span>
          </div>
          <button disabled={!lines.length} className="spec mt-6 w-full rounded-sm bg-primary py-3.5 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40">
            Passer au paiement
          </button>
        </aside>
      </section>
    </>
  );
}
