"use client";

import { cn, isDev } from "@/lib/utils";
import type { ReactNode } from "react";

export type SectionBackground = "ivory" | "sage" | "emerald" | "deep-emerald";

interface SectionProps {
  id?: string;
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
  /** Show SAMPLE badge in dev mode */
  hasPlaceholderData?: boolean;
  /** Accessible label for the section */
  ariaLabel?: string;
}

const bgStyles: Record<SectionBackground, string> = {
  ivory: "bg-ivory text-charcoal",
  sage: "bg-sage text-charcoal",
  emerald: "bg-emerald-brand text-white",
  "deep-emerald": "bg-emerald-deep text-white",
};

export function Section({
  id,
  background = "ivory",
  className,
  children,
  hasPlaceholderData = false,
  ariaLabel,
}: SectionProps) {
  const showBadge = hasPlaceholderData && isDev();

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative py-16 px-4 md:py-20 md:px-6 lg:py-24", bgStyles[background], className)}
    >
      {showBadge && <span className="sample-badge">SAMPLE</span>}
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
