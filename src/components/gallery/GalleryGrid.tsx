"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/data/gallery";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (direction: number) => {
      setActiveIndex((current) =>
        current === null ? current : (current + direction + items.length) % items.length
      );
    },
    [items.length]
  );

  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "Tab") {
        const focusable = Array.from(
          document.querySelectorAll<HTMLButtonElement>(
            '[role="dialog"] button:not([disabled])'
          )
        );
        const current = focusable.indexOf(document.activeElement as HTMLButtonElement);
        const next = event.shiftKey
          ? (current - 1 + focusable.length) % focusable.length
          : (current + 1) % focusable.length;
        event.preventDefault();
        focusable[next]?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      openerRef.current?.focus();
    };
  }, [isOpen, close, step]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            className="group overflow-hidden rounded-md border border-sand-strong bg-taupe-soft transition-colors duration-300 hover:border-brown"
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
              className="block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-green"
              aria-label={`Open image: ${item.caption}`}
            >
              <span className="relative block aspect-[4/3] w-full overflow-hidden bg-taupe">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                ) : (
                  <ImagePlaceholder caption={item.caption} aspectRatio="landscape" />
                )}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              </span>
              <span className="flex items-center justify-between gap-4 p-4">
                <span>
                  <span className="block text-sm font-semibold tracking-wide text-brown">{item.caption}</span>
                  <span className="mt-0.5 block text-xs text-sand-strong">{item.alt}</span>
                </span>
                <span className="eyebrow shrink-0 text-sand-strong">{String(index + 1).padStart(2, "0")}</span>
              </span>
            </button>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-forest/95 p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeItem.caption} gallery image`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <button ref={closeButtonRef} type="button" onClick={close} aria-label="Close gallery" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-cream md:right-8 md:top-8">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-cream md:left-8">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <figure className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4">
              <div className="relative min-h-0 w-full flex-1">
                {activeItem.imageUrl ? (
                  <Image src={activeItem.imageUrl} alt={activeItem.alt} fill sizes="95vw" className="object-contain" priority />
                ) : (
                  <ImagePlaceholder caption={activeItem.caption} aspectRatio="landscape" />
                )}
              </div>
              <figcaption className="pb-2 text-center text-sm text-cream/90">{activeItem.caption}</figcaption>
            </figure>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-cream md:right-8">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
