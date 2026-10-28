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
    <article className={cn("group relative", className)}>
      <Link href={href} className="block">
        <div className="editorial-media relative aspect-[4/5] overflow-hidden rounded-md border border-sand shadow-xs transition-all duration-300 group-hover:border-sand-strong group-hover:shadow-md">
          {imageUrl && (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brown/75 via-brown/20 to-transparent"
                aria-hidden="true"
              />
            </>
          )}

          {/* Badge Icon */}
          {IconComponent && (
            <div
              className={cn(
                "absolute z-10 transition-transform duration-300",
                imageUrl
                  ? "right-4 top-4 rounded-full bg-cream/90 p-2 text-brown shadow-xs backdrop-blur-xs group-hover:scale-110"
                  : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brown/25 group-hover:scale-110"
              )}
            >
              <IconComponent
                className={imageUrl ? "h-4 w-4 text-sand-strong" : "h-16 w-16"}
                strokeWidth={imageUrl ? 1.5 : 0.75}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <h3 className="font-heading text-xl uppercase leading-tight tracking-wide text-brown transition-colors duration-300 group-hover:text-sand-strong">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-brown md:line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
}
