"use client";

import { Flame } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/home/Reveal";
import { Badge } from "@/components/ui/Badge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  makiFlavors,
  wingFlavors,
  type Heat,
} from "@/data/flavors";

type WingFilter = "todos" | "dulce" | "salado" | "picante";

const heatLabel: Partial<Record<Heat, string>> = {
  dulce: "Dulce",
  salado: "Salado",
  "dulce-salado": "Dulce-salado",
  picante: "Picante",
  "muy-picante": "Muy picante",
  ardiente: "Ardiente",
};

function matchesFilter(heat: Heat | undefined, filter: WingFilter): boolean {
  if (filter === "todos") return true;
  if (!heat) return false;
  if (filter === "dulce") return heat === "dulce" || heat === "dulce-salado";
  if (filter === "salado") return heat === "salado" || heat === "dulce-salado";
  return heat === "picante" || heat === "muy-picante" || heat === "ardiente";
}

export function FlavorExplorer() {
  const [tab, setTab] = useState<"alitas" | "makis">("alitas");
  const [filter, setFilter] = useState<WingFilter>("todos");

  const wings = useMemo(
    () => wingFlavors.filter((f) => matchesFilter(f.heat, filter)),
    [filter],
  );

  return (
    <section className="texture-dark bg-navy px-4 py-16 text-cream md:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle
            light
            title="Sabores"
            description="Arma tu combo con lo que más te late."
          />
        </Reveal>

        <div
          className="mt-6 inline-flex rounded-full bg-ink/40 p-1"
          role="tablist"
          aria-label="Tipo de sabor"
        >
          {(
            [
              ["alitas", "Alitas"],
              ["makis", "Makis"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold ${
                tab === id ? "bg-orange text-ink" : "text-cream hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "alitas" ? (
          <>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar alitas">
              {(
                [
                  ["todos", "Todos"],
                  ["dulce", "Dulce"],
                  ["salado", "Salado"],
                  ["picante", "Picante"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  className={`min-h-10 rounded-full px-4 text-sm font-semibold ${
                    filter === id
                      ? "bg-orange text-ink"
                      : "bg-white/10 text-cream hover:bg-white/15"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {wings.map((f) => (
                <li
                  key={f.id}
                  className="rounded-[var(--radius)] border border-white/10 bg-ink/30 p-4"
                >
                  <p className="font-display text-2xl text-orange">{f.name}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {f.heat ? (
                      <Badge tone="cream">
                        <Flame className="h-3 w-3" aria-hidden="true" />
                        {heatLabel[f.heat]}
                      </Badge>
                    ) : null}
                    {f.note ? <Badge tone="navy">{f.note}</Badge> : null}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {makiFlavors.map((f) => (
              <li
                key={f.id}
                className="rounded-[var(--radius)] border border-white/10 bg-ink/30 p-4"
              >
                <p className="font-display text-2xl text-orange">{f.name}</p>
                {f.description ? (
                  <p className="mt-2 text-sm text-cream/70">{f.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
