import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "outline";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

const variantClass: Record<Variant, string> = {
  primary:
    "bg-orange text-ink hover:bg-orange-deep shadow-[3px_3px_0_rgba(14,14,16,0.25)]",
  secondary: "bg-cream text-ink hover:bg-sand",
  ghost: "bg-transparent text-cream hover:bg-white/10",
  dark: "bg-navy text-cream hover:bg-ink",
  outline:
    "bg-transparent border-2 border-current text-inherit hover:bg-white/10",
};

const sizeClass: Record<Size, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
  } = props;
  const classes = `${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
