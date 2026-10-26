"use client";

import { Flame } from "lucide-react";
import type { Heat, MakiFlavor, WingFlavor } from "@/data/flavors";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/format";

const heatLabel: Record<Heat, string> = {
  dulce: "Dulce",
  salado: "Salado",
  "dulce-salado": "Dulce-salado",
  picante: "Picante",
  "muy-picante": "Muy picante",
  ardiente: "Ardiente",
};

type MakiPickerProps = {
  type: "maki";
  flavors: MakiFlavor[];
  selected: string[];
  max: number;
  onChange: (ids: string[]) => void;
  label?: string;
};

type WingPickerProps = {
  type: "wing";
  flavors: WingFlavor[];
  selected: string[];
  max: number;
  onChange: (ids: string[]) => void;
  label?: string;
};

type FlavorPickerProps = MakiPickerProps | WingPickerProps;

export function FlavorPicker(props: FlavorPickerProps) {
  const { selected, max, onChange, label } = props;
  const atLimit = selected.length >= max;
  const title =
    label ??
    (props.type === "maki"
      ? `Elige ${max} sabor${max > 1 ? "es" : ""} de makis`
      : `Elige ${max} sabor${max > 1 ? "es" : ""} de alitas`);

  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id));
      return;
    }
    if (atLimit) return;
    onChange([...selected, id]);
  }

  return (
    <fieldset className="space-y-3">
      <legend className="font-semibold text-ink">{title}</legend>
      <p className="text-sm text-ink/60" aria-live="polite">
        Elegiste {selected.length} de {max}
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {props.type === "maki"
          ? props.flavors.map((f) => {
              const isOn = selected.includes(f.id);
              const disabled = atLimit && !isOn;
              return (
                <button
                  key={f.id}
                  type="button"
                  disabled={disabled}
                  aria-pressed={isOn}
                  onClick={() => toggle(f.id)}
                  className={`min-h-14 rounded-[var(--radius)] border p-3 text-left transition ${
                    isOn
                      ? "border-orange bg-orange/15"
                      : "border-ink/10 bg-cream hover:border-ink/25"
                  } ${disabled ? "opacity-40" : ""}`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-lg leading-none">
                      {f.name}
                    </span>
                    {f.surcharge ? (
                      <Badge tone="orange">+ {formatPrice(f.surcharge)}</Badge>
                    ) : null}
                  </span>
                  {f.description ? (
                    <span className="mt-1 block text-xs text-ink/60">
                      {f.description}
                    </span>
                  ) : null}
                </button>
              );
            })
          : props.flavors.map((f) => {
              const isOn = selected.includes(f.id);
              const disabled = atLimit && !isOn;
              return (
                <button
                  key={f.id}
                  type="button"
                  disabled={disabled}
                  aria-pressed={isOn}
                  onClick={() => toggle(f.id)}
                  className={`min-h-14 rounded-[var(--radius)] border p-3 text-left transition ${
                    isOn
                      ? "border-orange bg-orange/15"
                      : "border-ink/10 bg-cream hover:border-ink/25"
                  } ${disabled ? "opacity-40" : ""}`}
                >
                  <span className="font-display text-lg leading-none">
                    {f.name}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-1">
                    {f.heat ? (
                      <Badge tone="heat">
                        <Flame className="h-3 w-3" aria-hidden="true" />
                        {heatLabel[f.heat]}
                      </Badge>
                    ) : null}
                    {f.note ? (
                      <Badge tone="cream">{f.note}</Badge>
                    ) : null}
                  </span>
                </button>
              );
            })}
      </div>
    </fieldset>
  );
}
