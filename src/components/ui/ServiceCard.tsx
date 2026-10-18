import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  href,
  className,
}: ServiceCardProps) {
  // Dynamically resolve lucide icon
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[icon] || LucideIcons.Sparkles;

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white rounded-xl overflow-hidden",
        "shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]",
        "transition-shadow duration-200 ease-in-out",
        "border-t-2 border-gold",
        className
      )}
    >
      <div className="flex flex-col flex-1 p-6">
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
          <IconComponent className="h-6 w-6 text-gold" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-charcoal/70 leading-relaxed flex-1">
          {description}
        </p>

        {/* Link */}
        <a
          href={href}
          className={cn(
            "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-brand",
            "hover:text-gold transition-colors duration-200"
          )}
        >
          Book consultation
          <LucideIcons.ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
