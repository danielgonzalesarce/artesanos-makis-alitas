import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC, site } from "@/data/site";

type LogoProps = {
  variant?: "light" | "dark";
  href?: string;
  className?: string;
};

export function Logo({
  variant = "light",
  href = "/",
  className = "",
}: LogoProps) {
  const textColor = variant === "light" ? "text-orange" : "text-ink";
  const subColor = variant === "light" ? "text-cream/90" : "text-ink/70";

  const content = LOGO_SRC ? (
    <Image
      src={LOGO_SRC}
      alt={site.name}
      width={160}
      height={48}
      className="h-10 w-auto md:h-12"
      priority
    />
  ) : (
    <span className={`inline-flex flex-col leading-none ${textColor}`}>
      <span
        className="font-display text-2xl tracking-wide md:text-3xl"
        style={{ transform: "skewX(-8deg)" }}
      >
        ARTESANOS!
      </span>
      <span className={`mt-0.5 text-[0.65rem] font-medium md:text-xs ${subColor}`}>
        Alitas y Makis{" "}
        <span aria-hidden="true" className="opacity-80">
          マキ
        </span>
      </span>
    </span>
  );

  return (
    <Link
      href={href}
      className={`inline-flex items-center focus-visible:outline-offset-4 ${className}`}
      aria-label={site.name}
    >
      {content}
    </Link>
  );
}
