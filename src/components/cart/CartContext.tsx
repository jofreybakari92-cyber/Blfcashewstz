import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  price: number; // TSh per 500g
  unit: string;
};

export const PRODUCTS: Product[] = [
  { id: "raw", name: "Raw Cashews", price: 18000, unit: "500g" },
  { id: "roasted", name: "Roasted Cashews", price: 22000, unit: "500g" },
  { id: "salted", name: "Salted Cashews", price: 24000, unit: "500g" },
  { id: "honey", name: "Honey Cashews", price: 28000, unit: "500g" },
];

type CartCtx = {
  items: Record<string, number>;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  const value = useMemo<CartCtx>(() => {
    const setQty = (id: string, qty: number) =>
      setItems((prev) => {
        const next = { ...prev };
        const clamped = Math.max(0, Math.min(99, Math.floor(qty) || 0));
        if (clamped === 0) delete next[id];
        else next[id] = clamped;
        return next;
      });
    const add = (id: string) => setQty(id, (items[id] ?? 0) + 1);
    const remove = (id: string) => setQty(id, (items[id] ?? 0) - 1);
    const count = Object.values(items).reduce((a, b) => a + b, 0);
    const total = Object.entries(items).reduce((sum, [id, q]) => {
      const p = PRODUCTS.find((p) => p.id === id);
      return sum + (p ? p.price * q : 0);
    }, 0);
    return { items, add, remove, setQty, clear: () => setItems({}), count, total, open, setOpen };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export const formatTSh = (n: number) => "TSh " + n.toLocaleString("en-US");
