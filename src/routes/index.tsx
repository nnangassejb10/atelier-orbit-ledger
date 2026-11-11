import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ClientHero } from "@/components/ClientHero";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "E-shop — PC gaming et informatique à Libreville" },
      { name: "description", content: "Nouveau catalogue : PC gaming, portables, écrans et accessoires. Livraison à Libreville." },
      { property: "og:title", content: "E-shop — PC gaming et informatique à Libreville" },
      { property: "og:description", content: "Nouveau catalogue : PC gaming, portables, écrans et accessoires." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  ["14+", "Modèles en stock"],
  ["48 h", "Livraison Libreville"],
  ["12 mois", "Garantie matériel"],
];

function Index() {
  return (
    <>
      <section className="blueprint relative overflow-hidden border-b">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 px-5 py-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative z-10">
            <p className="spec reveal text-primary">// Nouveauté — Catalogue 2025</p>
            <h1 className="reveal mt-5 text-5xl font-bold leading-[0.95] md:text-7xl" style={{ animationDelay: "80ms" }}>
              La puissance,
              <br />
              <span className="text-muted-foreground">assemblée</span> à
              <br />
              Libreville.
            </h1>
            <p className="reveal mt-6 max-w-md text-lg text-muted-foreground" style={{ animationDelay: "160ms" }}>
              Notre nouveau catalogue réunit les technologies les plus avancées — PC gaming, portables et périphériques testés avant livraison.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link to="/decouvrir" className="spec group inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3.5 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/solde" className="spec inline-flex items-center rounded-sm border px-5 py-3.5 transition-colors hover:border-primary hover:text-primary">
                Voir les soldes
              </Link>
            </div>
            <dl className="reveal mt-12 grid max-w-md grid-cols-3 border-t pt-6" style={{ animationDelay: "320ms" }}>
              {stats.map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold">{v}</dt>
                  <dd className="spec mt-1 text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative h-[420px] md:h-[560px]">
            <ClientHero />
            <div className="spec pointer-events-none absolute bottom-4 left-4 text-muted-foreground">Fig. 01 — Processeur ES-1</div>
            <div className="spec pointer-events-none absolute right-4 top-4 text-right text-muted-foreground">Bougez la souris ↻</div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b bg-secondary py-3">
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Ryzen", "Intel Core", "GeForce", "Thermaltake", "HP", "Lenovo", "Asus", "Optoma"].map((b) => (
              <span key={b + k} className="spec text-muted-foreground">◆ {b}</span>
            )),
          )}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 pt-20">
        <div className="mb-10 flex items-end justify-between gap-4 border-b pb-6">
          <div>
            <p className="spec text-primary">01 / Sélection</p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">Nos meilleures ventes</h2>
          </div>
          <p className="spec hidden text-muted-foreground md:block">{products.length} références</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
