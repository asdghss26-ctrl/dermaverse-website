import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  caption: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
  className?: string;
  showMonogram?: boolean;
}

const aspectClasses: Record<string, string> = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
};

/**
 * Designed placeholder for missing images:
 * warm editorial gradient with a JD monogram.
 * Each carries a TODO comment in the markup.
 */
export function ImagePlaceholder({
  caption,
  aspectRatio = "landscape",
  className,
  showMonogram = true,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "editorial-media relative overflow-hidden rounded-sm",
        "flex flex-col items-center justify-center",
        aspectClasses[aspectRatio],
        className
      )}
      role="img"
      aria-label={`Placeholder: ${caption}`}
    >
      {/* TODO: replace this placeholder with an actual image */}

      {showMonogram && (
        <span
          className="relative z-[1] select-none font-heading text-6xl text-brown/20 md:text-7xl"
          aria-hidden="true"
        >
          JD
        </span>
      )}

      <span className="eyebrow relative z-[1] mt-3 max-w-[14rem] px-4 text-center leading-relaxed text-brown">
        {caption}
      </span>
    </div>
  );
}
