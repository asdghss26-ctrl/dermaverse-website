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
 * emerald-to-sage gradient with JD monogram or line-art leaf.
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
        "relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-brand/20 via-sage to-emerald-brand/10",
        "flex flex-col items-center justify-center",
        aspectClasses[aspectRatio],
        className
      )}
      role="img"
      aria-label={`Placeholder: ${caption}`}
    >
      {/* TODO: replace this placeholder with an actual image */}

      {/* Decorative line-art leaf */}
      <svg
        className="absolute opacity-10"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M60 10C60 10 20 40 20 70C20 90 38 110 60 110C82 110 100 90 100 70C100 40 60 10 60 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-emerald-brand"
        />
        <path
          d="M60 30V90"
          stroke="currentColor"
          strokeWidth="1"
          className="text-emerald-brand"
        />
        <path
          d="M60 50C45 55 35 65 35 75"
          stroke="currentColor"
          strokeWidth="1"
          className="text-emerald-brand"
        />
        <path
          d="M60 60C75 65 85 72 85 78"
          stroke="currentColor"
          strokeWidth="1"
          className="text-emerald-brand"
        />
      </svg>

      {showMonogram && (
        <span
          className="relative z-[1] font-heading text-4xl font-bold text-emerald-brand/25 tracking-wider select-none"
          aria-hidden="true"
        >
          JD
        </span>
      )}

      <span className="relative z-[1] mt-2 text-xs text-emerald-brand/50 text-center px-4 font-medium">
        {caption}
      </span>
    </div>
  );
}
