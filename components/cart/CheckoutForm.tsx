"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import {
  buildOrderMessage,
  whatsappUrl,
  type CheckoutInfo,
} from "@/lib/whatsapp";
import { useCartStore } from "@/store/cart";

type CheckoutFormProps = {
  onContinue: () => void;
};

export function CheckoutForm({ onContinue }: CheckoutFormProps) {
  const lines = useCartStore((s) => s.lines);
  const hasAlcohol = useCartStore((s) => s.hasAlcohol);
  const [name, setName] = useState("");
  const [modality, setModality] = useState<"recojo" | "delivery">("recojo");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [payment, setPayment] = useState(site.payments[0] ?? "Yape");
  const [notes, setNotes] = useState("");
  const [adult, setAdult] = useState(false);
  const [error, setError] = useState("");

  function validate(): string | null {
    if (!name.trim()) return "Escribe tu nombre.";
    if (modality === "delivery" && !address.trim()) {
      return "Escribe la dirección de delivery.";
    }
    if (!payment) return "Elige un método de pago.";
    if (hasAlcohol() && !adult) {
      return "Confirma que eres mayor de 18 años.";
    }
    if (lines.length === 0) return "Tu pedido está vacío.";
    return null;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");

    const checkout: CheckoutInfo = {
      name,
      modality,
      address: modality === "delivery" ? address : undefined,
      reference: modality === "delivery" ? reference : undefined,
      payment,
      notes: notes || undefined,
    };

    const message = buildOrderMessage(lines, checkout);
    trackEvent("send_order", {
      items: lines.length,
      modality,
    });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full min-h-12 rounded-[var(--radius)] border border-ink/15 bg-cream px-3 text-ink placeholder:text-ink/40";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="checkout-name" className="mb-1 block text-sm font-semibold">
          Nombre *
        </label>
        <input
          id="checkout-name"
          className={field}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          autoComplete="name"
          required
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Modalidad</legend>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["recojo", "Recojo en local"],
              ["delivery", "Delivery"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex min-h-12 cursor-pointer items-center justify-center rounded-[var(--radius)] border px-3 text-sm font-semibold ${
                modality === value
                  ? "border-orange bg-orange text-ink"
                  : "border-ink/15 bg-cream"
              }`}
            >
              <input
                type="radio"
                name="modality"
                value={value}
                checked={modality === value}
                onChange={() => setModality(value)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {modality === "delivery" ? (
        <>
          <div>
            <label
              htmlFor="checkout-address"
              className="mb-1 block text-sm font-semibold"
            >
              Dirección *
            </label>
            <input
              id="checkout-address"
              className={field}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              maxLength={120}
              autoComplete="street-address"
              required
            />
          </div>
          <div>
            <label
              htmlFor="checkout-ref"
              className="mb-1 block text-sm font-semibold"
            >
              Referencia
            </label>
            <input
              id="checkout-ref"
              className={field}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              maxLength={120}
            />
          </div>
        </>
      ) : null}

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Pago</legend>
        <div className="flex flex-wrap gap-2">
          {site.payments.map((p) => (
            <label
              key={p}
              className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold ${
                payment === p
                  ? "border-orange bg-orange text-ink"
                  : "border-ink/15 bg-cream"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={p}
                checked={payment === p}
                onChange={() => setPayment(p)}
                className="sr-only"
              />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="checkout-notes" className="mb-1 block text-sm font-semibold">
          Notas generales
        </label>
        <textarea
          id="checkout-notes"
          className={`${field} min-h-24 py-3`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={300}
        />
      </div>

      {hasAlcohol() ? (
        <label className="flex min-h-11 items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={adult}
            onChange={(e) => setAdult(e.target.checked)}
            className="mt-1 h-5 w-5 accent-orange"
          />
          <span>Soy mayor de 18 años</span>
        </label>
      ) : null}

      <p className="text-xs text-ink/55">
        El costo de envío se confirma por WhatsApp.
      </p>

      {error ? (
        <p className="text-sm font-medium text-orange-deep" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="flex min-h-12 w-full items-center justify-center rounded-[var(--radius)] bg-orange font-semibold text-ink hover:bg-orange-deep"
        >
          Enviar pedido por WhatsApp
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="flex min-h-12 w-full items-center justify-center rounded-[var(--radius)] border border-ink/15 bg-cream font-semibold text-ink"
        >
          Seguir pidiendo
        </button>
      </div>
    </form>
  );
}
