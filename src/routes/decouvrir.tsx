import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { accessories } from "@/lib/products";

export const Route = createFileRoute("/decouvrir")({
  head: () => ({
    meta: [
      { title: "Découvrir nos accessoires | E-shop" },
      { name: "description", content: "Claviers, casques, écrans et ordinateurs pour booster vos performances et votre confort." },
      { property: "og:title", content: "Découvrir nos accessoires | E-shop" },
      { property: "og:description", content: "Une sélection d'accessoires informatiques pour la performance et le confort." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageTitle code="02 / Découvrir" title="Accessoires informatiques">
        Une sélection des meilleurs accessoires pour booster vos performances et votre confort.
      </PageTitle>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        {accessories.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </section>
    </>
  ),
});
