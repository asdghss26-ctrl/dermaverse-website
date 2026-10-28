import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type BadgeVariant = "sand" | "olive" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  sand: "bg-taupe-soft text-brown border border-sand-strong",
  olive: "bg-olive text-taupe",
  outline: "bg-transparent text-brown border border-sand",
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
