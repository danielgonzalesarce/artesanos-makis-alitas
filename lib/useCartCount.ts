"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "@/store/cart";

function subscribe(onStoreChange: () => void) {
  return useCartStore.subscribe(onStoreChange);
}

function getSnapshot() {
  return useCartStore.getState().itemCount();
}

function getServerSnapshot() {
  return 0;
}

/** Contador del carrito seguro para hidratación (0 en servidor). */
export function useCartCount(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
