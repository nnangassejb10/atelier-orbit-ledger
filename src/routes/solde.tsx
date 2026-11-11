import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { sale } from "@/lib/products";

export const Route = createFileRoute("/solde")({
  head: () => ({
    meta: [
      { title: "Soldes high-tech | E-shop" },
      { name: "description", content: "Jusqu'à 50 % de réduction sur nos produits high-tech : PC portables, claviers, écrans." },
      { property: "og:title", content: "Soldes high-tech | E-shop" },
      { property: "og:description", content: "Jusqu'à 50 % de réduction sur nos produits high-tech." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageTitle code="03 / Soldes — Stock limité" title="Jusqu'à −50 % sur le high-tech">
        Profitez de réductions exceptionnelles sur une sélection de produits, dans la limite des stocks disponibles.
      </PageTitle>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        {sale.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </section>
    </>
  ),
});
