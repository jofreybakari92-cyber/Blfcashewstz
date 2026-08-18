import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { PRODUCTS, formatTSh, useCart } from "./CartContext";
import { waLink } from "../WhatsAppButton";

function buildMessage(items: Record<string, number>, total: number) {
  const lines = ["Hello BLF Cashews! 🍃", "I'd like to place the following order:", ""];
  for (const [id, qty] of Object.entries(items)) {
    const p = PRODUCTS.find((p) => p.id === id);
    if (!p) continue;
    lines.push(`• ${p.name} (${p.unit}) × ${qty} — ${formatTSh(p.price * qty)}`);
  }
  lines.push(
    "",
    `*Total: ${formatTSh(total)}*`,
    "",
    "Please confirm availability and delivery. Asante!",
  );
  return lines.join("\n");
}

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Open cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
    >
      <ShoppingBag className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-gold-foreground">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { items, setQty, remove, add, total, count, clear, open, setOpen } = useCart();
  const empty = count === 0;
  const message = empty ? "" : buildMessage(items, total);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="hidden" />
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-2xl">Your Order</SheetTitle>
          <p className="text-sm text-muted-foreground">
            {empty
              ? "Add some cashews to get started."
              : `${count} item${count > 1 ? "s" : ""} ready to send.`}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {empty ? (
            <div className="flex h-full flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {Object.entries(items).map(([id, qty]) => {
                const p = PRODUCTS.find((p) => p.id === id);
                if (!p) return null;
                return (
                  <li key={id} className="flex items-center gap-4 py-4">
                    <div className="flex-1">
                      <div className="font-display font-semibold">{p.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTSh(p.price)} / {p.unit}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full border border-border bg-card">
                      <button
                        onClick={() => remove(id)}
                        aria-label="Decrease"
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <input
                        type="number"
                        min={0}
                        max={99}
                        value={qty}
                        onChange={(e) => setQty(id, parseInt(e.target.value, 10) || 0)}
                        className="w-8 bg-transparent text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => add(id)}
                        aria-label="Increase"
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="w-20 text-right font-semibold text-primary">
                      {formatTSh(p.price * qty)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {!empty && (
          <div className="border-t border-border bg-card/50 px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-2xl font-bold text-primary">
                {formatTSh(total)}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Delivery calculated on WhatsApp based on your location.
            </p>
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Send Order on WhatsApp
            </a>
            <button
              onClick={clear}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full px-6 py-2 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Inline qty stepper for product cards
export function QtyStepper({ id }: { id: string }) {
  const { items, add, remove, setOpen } = useCart();
  const qty = items[id] ?? 0;

  if (qty === 0) {
    return (
      <button
        onClick={() => add(id)}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-accent"
      >
        <Plus className="h-4 w-4" /> Add to Order
      </button>
    );
  }

  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="flex flex-1 items-center justify-between rounded-full border border-primary/30 bg-primary/5 px-2 py-1.5">
        <button
          onClick={() => remove(id)}
          aria-label="Decrease"
          className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-primary/10"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="font-display text-base font-bold text-primary">{qty}</span>
        <button
          onClick={() => add(id)}
          aria-label="Increase"
          className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-accent"
      >
        View
      </button>
    </div>
  );
}
