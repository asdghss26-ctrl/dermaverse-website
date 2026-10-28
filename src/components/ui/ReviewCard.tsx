import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

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
        "flex flex-col border border-sand bg-cream p-7",
        "min-w-[280px] max-w-[340px] snap-center shrink-0",
        "md:min-w-0 md:max-w-none md:snap-align-none md:shrink",
        className
      )}
    >
      {/* Stars */}
      <div className="mb-5 flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-3 w-3 fill-sand text-sand"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 font-heading text-xl italic leading-snug text-brown">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Source */}
      <p className="eyebrow mt-6 text-sand-strong">
        {source} review
      </p>
    </article>
  );
}
