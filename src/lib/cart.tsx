import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartLine = Product & { qty: number };

type Ctx = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (p: Product) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "eshop-cart";

export function cartTotal(lines: { price: number; qty: number }[]) {
  return lines.reduce((s, l) => s + l.price * l.qty, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = (p: Product) =>
    setLines((ls) => {
      const f = ls.find((l) => l.id === p.id);
      return f ? ls.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { ...p, qty: 1 }];
    });
  const setQty = (id: string, qty: number) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
  const remove = (id: string) => setLines((ls) => ls.filter((l) => l.id !== id));
  const clear = () => setLines([]);

  return (
    <CartContext.Provider
      value={{ lines, count: lines.reduce((s, l) => s + l.qty, 0), total: cartTotal(lines), add, setQty, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
