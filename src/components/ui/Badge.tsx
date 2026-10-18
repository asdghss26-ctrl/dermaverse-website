import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type BadgeVariant = "gold" | "emerald" | "sage" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: "bg-gold text-emerald-deep",
  emerald: "bg-emerald-brand text-white",
  sage: "bg-sage text-emerald-brand",
  outline: "bg-transparent text-emerald-brand border border-emerald-brand",
};

export function Badge({ variant = "gold", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
