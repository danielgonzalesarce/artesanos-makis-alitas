"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { buildInfoMessage, whatsappUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const href = whatsappUrl(buildInfoMessage());

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("click_whatsapp", { source: "floating" })}
      className="fixed right-4 bottom-24 z-40 hidden min-h-14 min-w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 focus-visible:outline-offset-4 md:bottom-6 md:flex"
      aria-label="Escribir por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
