"use client";

import Image from "next/image";
import { ArrowUpRight, Clock, Pause, Play, Phone } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Button } from "@/components/ui/Button";
import { clinic } from "@/data/clinic";
import type { HeroSlide } from "@/data/heroSlides";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;
const SWIPE_RESUME_MS = 8000;
const MOBILE_MEDIA = "(max-width: 767px)";
const FINE_POINTER_MEDIA = "(hover: hover) and (pointer: fine)";

const warnedPlaceholderIds = new Set<string>();

function useMediaQuery(queryText: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(queryText);
    const update = () => setMatches(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [queryText]);

  return matches;
}

function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

function useIsMobile() {
  return useMediaQuery(MOBILE_MEDIA);
}

function useFinePointer() {
  return useMediaQuery(FINE_POINTER_MEDIA);
}

const placeholderVariants = [
  {
    gradient: "hero-placeholder--skin",
    archPosition: "right-0 w-[52%]",
    archSize: "h-[70%] w-[78%]",
  },
  {
    gradient: "hero-placeholder--hair",
    archPosition: "left-0 w-[58%]",
    archSize: "h-[78%] w-[72%]",
  },
  {
    gradient: "hero-placeholder--laser",
    archPosition: "right-[6%] w-[46%]",
    archSize: "h-[62%] w-[84%]",
  },
  {
    gradient: "hero-placeholder--confidence",
    archPosition: "left-[8%] w-[54%]",
    archSize: "h-[84%] w-[68%]",
  },
] as const;

function HeroPlaceholder({ index }: { index: number }) {
  const variant = placeholderVariants[index % placeholderVariants.length];

  return (
    <div
      className={cn(
        "hero-placeholder absolute inset-0 overflow-hidden",
        variant.gradient
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-y-0 flex items-center justify-center",
          variant.archPosition
        )}
      >
        <div
          className={cn(
            "arch border border-sand-strong/35 bg-taupe/10",
            variant.archSize
          )}
        />
      </div>
    </div>
  );
}

function HeroSlideImage({
  slide,
  index,
}: {
  slide: HeroSlide;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const src = slide.image.src;
  const isSplit = slide.image.layout === "split";

  if (!src || failed) {
    return <HeroPlaceholder index={index} />;
  }

  const image = (
    <Image
      src={src}
      alt={slide.image.alt}
      fill
      sizes={isSplit ? "(min-width: 1024px) 55vw, 100vw" : "100vw"}
      quality={85}
      preload={index === 0}
      loading={index === 0 ? "eager" : "lazy"}
      className="object-cover"
      style={{ objectPosition: slide.image.objectPosition ?? "center" }}
      onError={() => setFailed(true)}
    />
  );

  if (isSplit) {
    return (
      <>
        <div
          className="hero-skin-ground absolute inset-0"
          aria-hidden="true"
        />
        <div className="hero-skin-media absolute inset-0 overflow-hidden md:left-auto md:w-[55%]">
          {image}
          <div
            className="hero-mobile-scrim pointer-events-none absolute inset-0 md:hidden"
            aria-hidden="true"
          />
        </div>
      </>
    );
  }

  return (
    <>
      {image}
      <div
        className="hero-media-scrim pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden="true"
      />
      <div
        className="hero-mobile-scrim pointer-events-none absolute inset-0 md:hidden"
        aria-hidden="true"
      />
    </>
  );
}

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [swipePaused, setSwipePaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const finePointer = useFinePointer();
  const regionRef = useRef<HTMLElement>(null);
  const elapsedRef = useRef(0);
  const swipeTimerRef = useRef<number | null>(null);
  const swipeRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    dx: number;
    dy: number;
    dragging: boolean;
  } | null>(null);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  // Dev-only warning for slides missing a real image source.
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const missing = slides.filter(
      (slide) => !slide.image.src && !warnedPlaceholderIds.has(slide.id)
    );

    if (missing.length === 0) return;

    missing.forEach((slide) => warnedPlaceholderIds.add(slide.id));

    console.warn(
      `[HeroSlider] Gradient placeholder slides:\n${missing
        .map((slide) => `${slide.id}: expected /public/images/hero/${slide.id}.jpg`)
        .join("\n")}`
    );
  }, [slides]);

  useEffect(() => {
    const node = regionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    // On mobile: account for the sticky header (~64 px) and bottom bar (~80 px).
    // threshold 0.25 means autoplay pauses when less than 25 % of the slider is visible.
    const threshold = isMobile ? 0.25 : 0.15;
    const rootMargin = isMobile ? "-64px 0px -80px 0px" : "0px";
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isMobile]);

  const setProgress = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    regionRef.current?.style.setProperty("--hero-progress", String(clamped));
  }, []);

  const resetProgress = useCallback(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [setProgress]);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      const next = ((index % slides.length) + slides.length) % slides.length;
      setActiveIndex(next);
      resetProgress();
    },
    [resetProgress, slides.length]
  );

  const advance = useCallback(
    (direction: 1 | -1) => {
      if (slides.length === 0) return;
      setActiveIndex(
        (current) =>
          ((current + direction) % slides.length + slides.length) % slides.length
      );
      resetProgress();
    },
    [resetProgress, slides.length]
  );

  const clearSwipeTimer = useCallback(() => {
    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearSwipeTimer(), [clearSwipeTimer]);

  const scheduleSwipeResume = useCallback(() => {
    clearSwipeTimer();
    swipeTimerRef.current = window.setTimeout(() => {
      swipeTimerRef.current = null;
      setSwipePaused(false);
    }, SWIPE_RESUME_MS);
  }, [clearSwipeTimer]);

  const autoplayEnabled =
    slides.length > 1 && !reduceMotion && !userPaused;
  const autoplayRunning =
    autoplayEnabled &&
    !hoverPaused &&
    !focusPaused &&
    !swipePaused &&
    isDocumentVisible &&
    isInView;
  const pauseReasonKey = [
    reduceMotion && "m",
    userPaused && "u",
    hoverPaused && "h",
    focusPaused && "f",
    swipePaused && "s",
    !isDocumentVisible && "v",
    !isInView && "i",
  ]
    .filter(Boolean)
    .join("|");

  useEffect(() => {
    if (!reduceMotion) return;
    resetProgress();
  }, [reduceMotion, resetProgress]);

  // Single RAF-based autoplay timer - safe against React Strict Mode double-invocation
  // because cancelAnimationFrame in the cleanup always cancels the previous frame.
  useEffect(() => {
    if (!autoplayRunning) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(now - last, 1000);
      last = now;
      elapsedRef.current = Math.min(elapsedRef.current + delta, AUTOPLAY_MS);

      if (elapsedRef.current >= AUTOPLAY_MS) {
        advance(1);
      } else {
        setProgress(elapsedRef.current / AUTOPLAY_MS);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [advance, autoplayRunning, pauseReasonKey, setProgress]);

  const handleToggleAutoplay = () => {
    if (reduceMotion) return;

    if (userPaused) {
      clearSwipeTimer();
      setUserPaused(false);
      setHoverPaused(false);
      setFocusPaused(false);
      setSwipePaused(false);
      return;
    }

    setUserPaused(true);
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
    if (!finePointer || event.pointerType !== "mouse") return;
    setHoverPaused(true);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    if (!finePointer || event.pointerType !== "mouse") return;
    setHoverPaused(false);
  };

  const handlePointerDownCapture = () => {
    setFocusPaused(false);
  };

  const handleFocusCapture = (event: FocusEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const isPlayControl = Boolean(target.closest("[data-hero-play]"));
    const fromKeyboard = target.matches(":focus-visible");
    const paused = !isPlayControl && fromKeyboard;
    setFocusPaused(paused);
  };

  const handleBlurCapture = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!next || !event.currentTarget.contains(next)) {
      setFocusPaused(false);
    }
  };

  // Swipe: guard on pointerType only, not isMobile, so the gesture works even
  // before the media-query hook hydrates (it starts false on the server).
  const handleSwipeStart = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;
    const target = event.target as HTMLElement;
    if (target.closest("a, button, [data-no-swipe]")) return;

    clearSwipeTimer();
    swipeRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      dx: 0,
      dy: 0,
      dragging: false,
    };
  };

  const handleSwipeMove = (event: ReactPointerEvent<HTMLElement>) => {
    const swipe = swipeRef.current;
    if (!swipe || swipe.pointerId !== event.pointerId) return;

    swipe.dx = event.clientX - swipe.startX;
    swipe.dy = event.clientY - swipe.startY;

    if (
      !swipe.dragging &&
      Math.abs(swipe.dx) > 10 &&
      Math.abs(swipe.dx) > Math.abs(swipe.dy)
    ) {
      swipe.dragging = true;
      clearSwipeTimer();
      setSwipePaused(true);
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
  };

  const finishSwipe = (event: ReactPointerEvent<HTMLElement>) => {
    const swipe = swipeRef.current;
    if (!swipe || swipe.pointerId !== event.pointerId) return;
    swipeRef.current = null;

    if (!swipe.dragging) return;

    const width = regionRef.current?.clientWidth ?? 0;
    const threshold = Math.max(50, width * 0.15);

    if (Math.abs(swipe.dx) >= threshold) {
      advance(swipe.dx < 0 ? 1 : -1);
    }

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    scheduleSwipeResume();
  };

  const handleSwipeCancel = (event: ReactPointerEvent<HTMLElement>) => {
    const swipe = swipeRef.current;
    if (!swipe || swipe.pointerId !== event.pointerId) return;
    swipeRef.current = null;
    if (swipe.dragging) {
      scheduleSwipeResume();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      advance(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      advance(1);
    }
  };

  const activeSlide = slides[activeIndex];

  if (!activeSlide) return null;

  return (
    <section
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Dermverse highlights"
      tabIndex={0}
      className="relative isolate h-[calc(100svh-var(--header-h))] min-h-[520px] max-h-[640px] w-full touch-pan-y overflow-hidden bg-brown md:h-[min(86vh,820px)] md:min-h-[560px] md:max-h-none"
      data-hero-slider
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDownCapture={handlePointerDownCapture}
      onPointerDown={handleSwipeStart}
      onPointerMove={handleSwipeMove}
      onPointerUp={finishSwipe}
      onPointerCancel={handleSwipeCancel}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity duration-[800ms] ease-out motion-reduce:transition-none",
                isActive ? "opacity-100" : "opacity-0"
              )}
            >
              <HeroSlideImage slide={slide} index={index} />
            </div>
          );
        })}
      </div>

      <div className="site-container relative z-20 h-full w-full">
        <div className="relative h-full w-full">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${slides.length}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className={cn(
                  "absolute inset-0 flex items-end pb-[calc(env(safe-area-inset-bottom)+84px)] transition-opacity duration-[800ms] ease-out motion-reduce:transition-none md:items-center md:pb-16",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <div className="w-full max-w-2xl md:w-auto">
                  <div className="mb-6 hidden w-fit max-w-full items-center gap-3 rounded-sm bg-brown/35 px-3 py-1.5 md:flex md:bg-transparent md:px-0 md:py-0">
                    <span
                      className="h-px w-10 shrink-0 bg-cream/70"
                      aria-hidden="true"
                    />
                    <p className="eyebrow text-cream">
                      Dermatology &amp; Aesthetic Medicine, Adyar
                    </p>
                  </div>

                  <h1 className="display-xl hero-headline text-cream max-w-[18ch]">
                    <em className="block font-normal italic">
                      {slide.headlineItalic}
                    </em>
                    <span className="block">{slide.headlineUpright}</span>
                  </h1>

                  <p className="mt-5 line-clamp-2 max-w-md text-base leading-relaxed text-cream md:mt-6 md:line-clamp-none md:text-lg">
                    {slide.caption}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row">
                    <Button
                      href={slide.ctaHref}
                      variant="primary-on-dark"
                      size="lg"
                      external
                      className="w-full md:w-auto"
                    >
                      Book Consultation
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <div className="hidden md:block">
                      <Button
                        href={clinic.phone.href}
                        variant="secondary-outline-cream"
                        size="lg"
                        className="w-full md:w-auto"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Call Clinic
                      </Button>
                    </div>
                  </div>

                  <p className="mt-4 hidden items-center gap-2 text-xs text-cream md:flex">
                    <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {clinic.hours}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-brown/95 via-brown/85 to-transparent md:h-24"
        aria-hidden="true"
      />

      {/* Desktop controls (hidden on mobile) */}
      <div className="absolute inset-x-0 bottom-0 z-30 hidden md:block">
        <div className="site-container flex items-center gap-4 pb-5">
          <div className="flex flex-1 gap-2">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show slide ${index + 1} of ${slides.length}: ${slide.headlineItalic} ${slide.headlineUpright}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex h-11 flex-1 items-center"
                >
                  <span className="relative h-0.5 w-full overflow-hidden bg-cream/45 transition-colors group-hover:bg-cream/65">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 w-full origin-left bg-cream",
                        !isActive && "opacity-0"
                      )}
                      style={
                        isActive && !reduceMotion
                          ? {
                              transform:
                                "scaleX(var(--hero-progress, 0))",
                            }
                          : undefined
                      }
                      aria-hidden="true"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            {reduceMotion ? (
              <span className="whitespace-nowrap text-[11px] leading-none text-cream/85">
                Autoplay is off
              </span>
            ) : null}
            <button
              type="button"
              data-hero-play
              onClick={handleToggleAutoplay}
              disabled={reduceMotion}
              aria-label={
                reduceMotion
                  ? "Autoplay is off because reduced motion is enabled"
                  : userPaused
                    ? "Play slideshow"
                    : "Pause slideshow"
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/70 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-brown disabled:cursor-not-allowed disabled:border-cream/50 disabled:text-cream/80"
            >
              {userPaused || reduceMotion ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile controls (hidden on desktop) */}
      <div className="absolute inset-x-0 bottom-0 z-30 md:hidden">
        <div className="site-container flex items-center gap-2 pb-[calc(env(safe-area-inset-bottom)+12px)]">
          <div className="flex flex-1 items-center">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show slide ${index + 1} of ${slides.length}: ${slide.headlineItalic} ${slide.headlineUpright}`}
                  aria-current={isActive ? "true" : undefined}
                  className="flex h-11 w-11 shrink-0 items-center justify-center"
                >
                  <span className="relative h-0.5 w-6 overflow-hidden bg-cream/45">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 w-full origin-left bg-cream",
                        !isActive && "opacity-0"
                      )}
                      style={
                        isActive && !reduceMotion
                          ? {
                              transform:
                                "scaleX(var(--hero-progress, 0))",
                            }
                          : undefined
                      }
                      aria-hidden="true"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            {reduceMotion ? (
              <span className="whitespace-nowrap text-[11px] leading-none text-cream/85">
                Autoplay is off
              </span>
            ) : null}
            <button
              type="button"
              data-hero-play
              onClick={handleToggleAutoplay}
              disabled={reduceMotion}
              aria-label={
                reduceMotion
                  ? "Autoplay is off because reduced motion is enabled"
                  : userPaused
                    ? "Play slideshow"
                    : "Pause slideshow"
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/70 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-brown disabled:cursor-not-allowed disabled:border-cream/50 disabled:text-cream/80"
            >
              {userPaused || reduceMotion ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {reduceMotion || userPaused
          ? `${activeSlide.headlineItalic} ${activeSlide.headlineUpright}`
          : ""}
      </div>
    </section>
  );
}
