"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductById, getVariant } from "@/data/menu";
import { makiFlavors, wingFlavors } from "@/data/flavors";
import { lineTotal, unitPrice } from "@/lib/pricing";

export type CartLine = {
  id: string;
  productId: string;
  variantId: string;
  choice?: string;
  makiFlavorIds: string[];
  wingFlavorIds: string[];
  quantity: number;
  note?: string;
};

export type AddLineInput = Omit<CartLine, "id" | "quantity"> & {
  quantity?: number;
};

function sortedIds(ids: string[]): string[] {
  return [...ids].sort();
}

function sameSelection(a: CartLine, b: AddLineInput): boolean {
  return (
    a.productId === b.productId &&
    a.variantId === b.variantId &&
    (a.choice ?? "") === (b.choice ?? "") &&
    (a.note ?? "") === (b.note ?? "") &&
    sortedIds(a.makiFlavorIds).join(",") ===
      sortedIds(b.makiFlavorIds).join(",") &&
    sortedIds(a.wingFlavorIds).join(",") ===
      sortedIds(b.wingFlavorIds).join(",")
  );
}

function makeId(): string {
  return `line_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function isValidLine(line: CartLine): boolean {
  const product = getProductById(line.productId);
  if (!product) return false;
  const variant = getVariant(product, line.variantId);
  if (!variant) return false;
  if (line.quantity < 1) return false;

  const needMaki = variant.makiFlavors ?? 0;
  const needWing = variant.wingFlavors ?? 0;
  if (line.makiFlavorIds.length !== needMaki) return false;
  if (line.wingFlavorIds.length !== needWing) return false;

  for (const id of line.makiFlavorIds) {
    if (!makiFlavors.some((f) => f.id === id)) return false;
  }
  for (const id of line.wingFlavorIds) {
    if (!wingFlavors.some((f) => f.id === id)) return false;
  }

  if (product.choice && !line.choice) return false;
  if (line.choice && product.choice) {
    if (!product.choice.options.includes(line.choice)) return false;
  }

  return true;
}

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addLine: (input: AddLineInput) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
  itemCount: () => number;
  subtotal: () => number;
  hasAlcohol: () => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      addLine: (input) => {
        const qty = input.quantity ?? 1;
        set((state) => {
          const existing = state.lines.find((l) => sameSelection(l, input));
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === existing.id
                  ? { ...l, quantity: l.quantity + qty }
                  : l,
              ),
              isOpen: true,
            };
          }
          const line: CartLine = {
            id: makeId(),
            productId: input.productId,
            variantId: input.variantId,
            choice: input.choice,
            makiFlavorIds: [...input.makiFlavorIds],
            wingFlavorIds: [...input.wingFlavorIds],
            quantity: qty,
            note: input.note,
          };
          return { lines: [...state.lines, line], isOpen: true };
        });
      },

      setQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeLine(id);
          return;
        }
        set((state) => ({
          lines: state.lines.map((l) =>
            l.id === id ? { ...l, quantity } : l,
          ),
        }));
      },

      removeLine: (id) =>
        set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),

      clear: () => set({ lines: [] }),

      itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),

      subtotal: () =>
        get().lines.reduce(
          (sum, l) =>
            sum +
            lineTotal({
              productId: l.productId,
              variantId: l.variantId,
              makiFlavorIds: l.makiFlavorIds,
              wingFlavorIds: l.wingFlavorIds,
              quantity: l.quantity,
            }),
          0,
        ),

      hasAlcohol: () =>
        get().lines.some((l) => getProductById(l.productId)?.alcohol),
    }),
    {
      name: "artesanos-cart",
      version: 1,
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.lines = state.lines.filter(isValidLine);
      },
    },
  ),
);

export function getLineUnitPrice(line: CartLine): number {
  return unitPrice({
    productId: line.productId,
    variantId: line.variantId,
    makiFlavorIds: line.makiFlavorIds,
    wingFlavorIds: line.wingFlavorIds,
  });
}
