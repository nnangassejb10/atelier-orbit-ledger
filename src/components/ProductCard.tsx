import { useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <div className="tilt-stage reveal" style={{ animationDelay: `${(index % 8) * 70}ms` }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="brackets group relative border bg-card transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      >
        <div className="relative overflow-hidden bg-studio">
          <div className="flex items-center justify-between px-4 pt-3 text-accent-foreground/60">
            <span className="spec">{product.id.toUpperCase()}</span>
            {discount > 0 && (
              <span className="spec rounded-sm bg-destructive px-1.5 py-0.5 text-destructive-foreground">-{discount}%</span>
            )}
          </div>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={600}
            height={600}
            className="aspect-square w-full object-contain p-6 transition-transform duration-500 [transform:translateZ(40px)] group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(400px circle at var(--mx) var(--my), color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)" }}
          />
        </div>
        <div className="space-y-3 p-4 [transform:translateZ(20px)]">
          <div>
            <p className="spec text-primary">{product.category}</p>
            <h3 className="mt-1 text-lg font-semibold leading-tight">{product.name}</h3>
            {product.description && <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>}
          </div>
          <div className="flex items-end justify-between gap-2">
            <div className="font-mono">
              {product.oldPrice && (
                <div className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</div>
              )}
              <div className="text-base font-semibold">{formatPrice(product.price)}</div>
            </div>
            <button
              onClick={() => {
                add(product);
                setAdded(true);
                setTimeout(() => setAdded(false), 1200);
              }}
              className="spec shrink-0 rounded-sm bg-primary px-3 py-2 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {added ? "Ajouté ✓" : "Acheter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
