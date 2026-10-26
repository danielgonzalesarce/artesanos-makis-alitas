type AnalyticsEvent =
  | "click_whatsapp"
  | "click_como_llegar"
  | "click_llamar"
  | "add_to_cart"
  | "send_order";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
