import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
} & ComponentPropsWithoutRef<"a">;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-solar-500 text-navy-950 hover:bg-solar-400 shadow-[0_8px_30px_-8px_rgba(245,179,1,0.6)]",
  secondary:
    "bg-white/5 text-offwhite-50 border border-white/15 hover:bg-white/10 hover:border-white/30",
  ghost: "text-offwhite-50 hover:text-solar-400",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-solar-500 focus-visible:outline-offset-2 active:scale-[0.98] ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
