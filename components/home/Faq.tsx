"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { Reveal } from "@/components/home/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { flavorCount } from "@/data/flavors";
import { site } from "@/data/site";

function paymentsText(): string {
  if (site.payments.length === 0) return "Consulta los métodos de pago por WhatsApp.";
  if (site.payments.length === 1) return `Aceptamos ${site.payments[0]}.`;
  const last = site.payments[site.payments.length - 1];
  const rest = site.payments.slice(0, -1).join(", ");
  return `Aceptamos ${rest} y ${last}.`;
}

function whereText(): string {
  const parts: string[] = [];
  if (site.address) parts.push(site.address);
  if (site.district) parts.push(site.district);
  if (site.addressReference) parts.push(site.addressReference);
  if (parts.length === 0) return "Mira el mapa en la página de contacto.";
  return parts.join(", ") + ".";
}

const faqs = [
  {
    q: "¿Tienen delivery?",
    a: `Sí, pídelo por WhatsApp al ${site.whatsappDisplay}. La cobertura y el costo de envío se confirman por ese medio. También estamos en Rappi y DiDi Food.`,
  },
  {
    q: "¿Cómo puedo pagar?",
    a: paymentsText(),
  },
  {
    q: "¿Cuántos sabores tienen?",
    a: `${flavorCount} entre makis y alitas, y puedes combinarlos como quieras.`,
  },
  {
    q: "¿Cómo funcionan los combos?",
    a: "Cada sabor de maki es una tabla de 10 cortes. El Maki Alitas incluye 10 makis y 6 alitas; el Dúo Perfecto, 20 makis y 10 alitas.",
  },
  {
    q: "¿Dónde están?",
    a: whereText(),
  },
];

export function Faq() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="texture-dark bg-ink px-4 py-16 text-cream md:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionTitle light title="Preguntas frecuentes" />
        </Reveal>
        <div className="mt-8 space-y-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const btnId = `${baseId}-btn-${i}`;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-[var(--radius)] border border-white/10 bg-navy/50"
              >
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold"
                  >
                    {item.q}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-orange transition ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className="border-t border-white/10 px-4 py-3 text-cream/75"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
