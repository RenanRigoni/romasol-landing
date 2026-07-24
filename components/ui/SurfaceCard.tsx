import type { ComponentPropsWithoutRef } from "react";

type SurfaceCardProps = {
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export function SurfaceCard({ className = "", children, ...rest }: SurfaceCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
