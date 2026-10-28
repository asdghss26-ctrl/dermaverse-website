"use client";

import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic } from "@/data/clinic";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface ArchCardProps {
  name: string;
  title: string;
  className?: string;
}

export function ArchCard({ name, title, className }: ArchCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const portraitUrl = clinic.doctor.portraitUrl;
  const showPortrait =
    Boolean(portraitUrl) && !clinic.doctor.placeholder && !imageFailed;

  return (
    <div className={cn("relative mx-auto w-full max-w-md", className)}>
      <div
        className="arch-glow pointer-events-none absolute -inset-10 -z-10 rounded-full blur-2xl"
        aria-hidden="true"
      />

      <p className="eyebrow mb-3 text-center text-sand-strong">
        The Dermverse Clinic
      </p>

      <div className="arch editorial-media relative aspect-[4/5] w-full overflow-hidden">
        {showPortrait && portraitUrl ? (
          <Image
            src={portraitUrl}
            alt={`Portrait of ${name}`}
            fill
            priority
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover object-center"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ImagePlaceholder
            caption="Doctor portrait"
            aspectRatio="portrait"
            className="h-full w-full rounded-none"
          />
        )}

        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brown/90 via-brown/55 to-transparent"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-2 arch border border-sand/50"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-4 arch border border-sand"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-12 text-center md:pb-14">
          <p className="font-heading text-xl leading-tight text-cream md:text-2xl">
            {name}
          </p>
          <p className="eyebrow mt-2 text-taupe">{title}</p>
        </div>
      </div>

      {clinic.google.url && (
        <a
          href={clinic.google.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -bottom-6 -left-4 z-20 flex items-center gap-2.5 border border-sand bg-cream px-4 py-3.5 shadow-[var(--shadow-card-hover)] md:-left-8"
        >
          <Star className="h-4 w-4 shrink-0 fill-sand text-sand" aria-hidden="true" />
          <span className="whitespace-nowrap text-xs font-medium text-brown">
            {clinic.google.rating.toFixed(1)} · {clinic.google.reviewCount} Google reviews
          </span>
        </a>
      )}
    </div>
  );
}
