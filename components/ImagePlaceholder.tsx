type PlaceholderKind = "alita" | "maki" | "combo" | "drink" | "food" | "local";

type ImagePlaceholderProps = {
  name: string;
  kind?: PlaceholderKind;
  className?: string;
  aspect?: "square" | "video" | "hero" | "wide";
};

function AlitaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M18 42c8-14 20-22 34-26-4 10-8 20-18 28-6 5-12 6-16-2z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M14 46c6-4 12-4 18 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="48" cy="16" r="4" fill="currentColor" />
    </svg>
  );
}

function MakiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="32" cy="36" rx="22" ry="14" fill="currentColor" opacity="0.25" />
      <rect
        x="12"
        y="18"
        width="40"
        height="24"
        rx="12"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="32" cy="30" r="7" fill="#14213D" />
      <circle cx="32" cy="30" r="3.5" fill="currentColor" />
    </svg>
  );
}

const aspectClass: Record<NonNullable<ImagePlaceholderProps["aspect"]>, string> =
  {
    square: "aspect-square",
    video: "aspect-video",
    hero: "aspect-[4/5] md:aspect-[16/10]",
    wide: "aspect-[16/9]",
  };

export function ImagePlaceholder({
  name,
  kind = "food",
  className = "",
  aspect = "square",
}: ImagePlaceholderProps) {
  const Icon =
    kind === "maki" || kind === "combo"
      ? MakiIcon
      : kind === "alita"
        ? AlitaIcon
        : kind === "drink"
          ? MakiIcon
          : AlitaIcon;

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-navy text-orange ${aspectClass[aspect]} ${className}`}
      role="img"
      aria-label={name}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, #FF6A00 0%, transparent 45%), radial-gradient(circle at 80% 80%, #E8461E 0%, transparent 40%)",
        }}
      />
      <Icon className="relative z-[1] h-14 w-14 md:h-20 md:w-20" />
      <span className="relative z-[1] mt-3 max-w-[85%] text-center font-display text-lg leading-none text-cream md:text-2xl">
        {name}
      </span>
    </div>
  );
}
