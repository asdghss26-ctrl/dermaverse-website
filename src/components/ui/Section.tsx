"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type SectionBackground = "cream" | "taupe" | "olive";

interface SectionProps {
  id?: string;
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
  /** Accessible label for the section */
  ariaLabel?: string;
}

const bgStyles: Record<SectionBackground, string> = {
  cream: "bg-cream text-brown",
  taupe: "bg-taupe-soft text-brown",
  olive: "bg-olive text-taupe",
};

export function Section({
  id,
  background = "cream",
  className,
  children,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative py-10 md:py-[clamp(56px,8vh,96px)]",
        bgStyles[background],
        className
      )}
    >
      <div className="site-container">{children}</div>
    </section>
  );

}
