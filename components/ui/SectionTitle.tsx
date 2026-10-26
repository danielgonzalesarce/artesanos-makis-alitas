type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  light = false,
  className = "",
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-2 text-sm font-semibold tracking-wide uppercase ${light ? "text-orange" : "text-ink/60"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={`font-display text-4xl leading-none md:text-5xl lg:text-6xl ${light ? "text-cream" : "text-ink"}`}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={`mt-3 text-base md:text-lg ${light ? "text-cream/80" : "text-ink/70"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
