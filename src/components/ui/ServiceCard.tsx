import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Baby,
  Clock,
  Droplets,
  Leaf,
  Microscope,
  ScanFace,
  Scissors,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  imageUrl?: string;
  index?: number;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Baby,
  Clock,
  Droplets,
  Leaf,
  Microscope,
  ScanFace,
  Scissors,
  Sun,
  Zap,
};

export function ServiceCard({
  title,
  description,
  icon,
  href,
  imageUrl,
  className,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon];
  return (
    <article
      className={cn(
        "group relative transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
    >
      <Link href={href} className="block">
        <div className="editorial-media relative aspect-[4/5] h-[170px] w-full overflow-hidden rounded-md border border-sand shadow-xs transition-all duration-300 group-hover:border-sand-strong group-hover:shadow-md sm:h-[190px] md:aspect-[4/5] md:h-auto">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/15 to-transparent"
                aria-hidden="true"
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-taupe-soft" aria-hidden="true" />
          )}

          {IconComponent && (
            <div
              className={cn(
                "absolute z-10 transition-transform duration-300",
                imageUrl
                  ? "right-3 top-3 rounded-full bg-cream/90 p-1.5 text-brown shadow-xs backdrop-blur-xs group-hover:scale-110 md:right-4 md:top-4 md:p-2"
                  : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brown/25 group-hover:scale-110"
              )}
            >
              <IconComponent
                className={imageUrl ? "h-3.5 w-3.5 text-sand-strong md:h-4 md:w-4" : "h-12 w-12 md:h-16 md:w-16"}
                strokeWidth={imageUrl ? 1.5 : 0.75}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <div className="pt-3 md:pt-4">
          <h3 className="font-heading text-lg uppercase leading-tight tracking-wide text-brown transition-colors duration-300 group-hover:text-sand-strong md:text-xl">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-brown line-clamp-2">
            {description}
          </p>
          <span className="mt-2 inline-flex min-h-[44px] items-center text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors group-hover:text-brown">
            Learn more
          </span>
        </div>
      </Link>
    </article>
  );
}
