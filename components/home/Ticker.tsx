const ITEMS = [
  "ALITAS",
  "MAKIS",
  "+15 SABORES",
  "DELIVERY",
  "PURO SABOR",
];

export function Ticker() {
  const sequence = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden border-y border-ink/10 bg-orange py-3 text-ink"
      aria-hidden="true"
    >
      <div className="ticker-track flex w-max gap-8 whitespace-nowrap">
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className="font-display text-2xl md:text-3xl">
            {item}
            <span className="mx-8 opacity-50">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
