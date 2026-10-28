import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type BadgeVariant = "sand" | "olive" | "outline" | "amber" | "green" | "red";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  sand: "bg-taupe-soft text-brown border border-sand-strong",
  olive: "bg-olive text-taupe",
  outline: "bg-transparent text-brown border border-sand",
  amber: "bg-yellow-50 text-amber-700 border border-amber-200",
  green: "bg-green-50 text-green-700 border border-green-200",
  red: "bg-red-50 text-red-700 border border-red-200",
};

export function Badge({ variant = "sand", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full",
        "text-[10px] font-medium uppercase tracking-[0.14em]",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
