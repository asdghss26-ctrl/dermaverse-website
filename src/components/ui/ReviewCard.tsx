import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

interface ReviewCardProps {
  text: string;
  source: string;
  rating: number;
  className?: string;
}

export function ReviewCard({ text, source, rating, className }: ReviewCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col bg-white rounded-xl p-6 shadow-[var(--shadow-card)]",
        "min-w-[280px] max-w-[340px] snap-center shrink-0",
        "md:min-w-0 md:max-w-none md:snap-align-none md:shrink",
        className
      )}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-gold text-gold"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <div className="relative flex-1">
        <Quote
          className="absolute -top-1 -left-1 h-6 w-6 text-gold/20"
          aria-hidden="true"
        />
        <blockquote className="pl-6 text-sm text-charcoal/80 leading-relaxed italic">
          &ldquo;{text}&rdquo;
        </blockquote>
      </div>

      {/* Source */}
      <p className="mt-4 text-xs font-semibold text-emerald-brand/60 uppercase tracking-wider">
        {source} review
      </p>
    </article>
  );
}
