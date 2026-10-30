"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreatmentSlide {
  number: string;
  title: string;
  description: string;
  image: string;
  link: string;
  alt: string;
}

const slides: TreatmentSlide[] = [
  {
    number: "01",
    title: "Acne Treatment",
    description: "Personalised treatment plans for clearer, healthier skin.",
    image: "/images/what-to-do-acne.png",
    link: "/services/acne-treatment",
    alt: "Acne treatment",
  },
  {
    number: "02",
    title: "Skin Brightening",
    description: "Advanced treatments for even tone and radiant skin.",
    image: "/images/what-to-do-skin-brightening.png",
    link: "/services/pigmentation-chemical-peels",
    alt: "Skin brightening treatment",
  },
  {
    number: "03",
    title: "Hair Restoration",
    description: "Targeted solutions to support healthier-looking hair.",
    image: "/images/treatment-room.jpg",
    link: "/services/hair-fall-scalp-care",
    alt: "Hair restoration treatment",
  },
  {
    number: "04",
    title: "Anti-Ageing Treatment",
    description: "Personalised care to improve the appearance of fine lines.",
    image: "/images/what-to-do-anti-ageing.png",
    link: "/services/anti-aging",
    alt: "Anti-ageing treatment",
  },
];

const AUTOPLAY_MS = 5000;

export function TreatmentImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  }, []);

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      goToNext();
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [goToNext, isPaused]);

  const activeSlide = slides[activeIndex];

  return (
    <div className="w-full">
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-10">
          <div className="relative h-[280px] w-full overflow-hidden border border-sand bg-taupe md:col-span-6 md:h-[420px]">
            {slides.map((slide, index) => (
              <div
                key={slide.number}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  index === activeIndex ? "opacity-100" : "opacity-0"
                )}
                aria-hidden={index !== activeIndex}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={goToPrev}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-brown transition-colors hover:bg-cream"
              aria-label="Previous treatment"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-brown transition-colors hover:bg-cream"
              aria-label="Next treatment"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="md:col-span-6">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-2xl text-sand-strong md:text-3xl">
                {activeSlide.number}
              </span>
              <span className="text-sm text-sand-strong">/ {String(slides.length).padStart(2, "0")}</span>
            </div>
            <h2 className="mt-4 font-heading text-3xl uppercase leading-tight text-brown md:text-4xl">
              {activeSlide.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brown md:text-lg">
              {activeSlide.description}
            </p>
            <Link
              href={activeSlide.link}
              className="mt-6 inline-flex min-h-[44px] items-center text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors hover:text-brown"
            >
              Learn More
            </Link>

            <div className="mt-8 flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.number}
                  type="button"
                  onClick={() => {
                    goToSlide(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 2000);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "w-8 bg-forest" : "w-2 bg-sand"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
