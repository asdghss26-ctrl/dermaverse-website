"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { processSteps } from "@/data/process";
import { processScenes } from "./process/Scenes";

const STEP_MS = 3500;
const MANUAL_PAUSE_MS = 8000;
const SCENE_FADE_S = 0.4;

export function ProcessArch() {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const archRef = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<number | null>(null);

  const step = processSteps[index];
  const Scene = processScenes[step.id];

  useEffect(() => {
    const node = archRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setDocumentVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || manualPaused || !inView || !documentVisible) return;

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % processSteps.length);
    }, STEP_MS);

    return () => window.clearTimeout(timer);
  }, [index, reduceMotion, manualPaused, inView, documentVisible]);

  useEffect(() => {
    return () => {
      if (pauseTimer.current !== null) window.clearTimeout(pauseTimer.current);
    };
  }, []);

  const selectStep = (nextIndex: number) => {
    setIndex(nextIndex);
    setManualPaused(true);

    if (pauseTimer.current !== null) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => {
      setManualPaused(false);
      pauseTimer.current = null;
    }, MANUAL_PAUSE_MS);
  };

  return (
    <div ref={archRef} className="relative w-full max-w-md lg:ml-auto">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-taupe/20 blur-3xl md:-inset-8"
        aria-hidden="true"
      />

      <div className="arch relative aspect-[3/4] h-[280px] max-h-[62vh] w-full overflow-hidden border border-sand/50 bg-taupe-soft md:min-h-[420px] md:h-auto">
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <AnimatePresence initial={false}>
              <motion.div
                key={step.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : SCENE_FADE_S,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center [&>svg]:max-h-full [&>svg]:w-full [&>svg]:object-contain"
              >
                <Scene reduced={reduceMotion} />
              </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-sand bg-cream px-5 pb-4 pt-4 text-center">
          <div aria-live="polite" aria-atomic="true">
            <h3 className="font-heading text-xl leading-tight text-brown md:text-2xl">
              {step.title}
            </h3>
            <p className="mx-auto mt-1.5 max-w-[17rem] text-sm leading-relaxed text-brown">
              {step.description}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            {processSteps.map((item, itemIndex) => {
              const active = itemIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectStep(itemIndex)}
                  aria-label={`Show step ${itemIndex + 1}: ${item.title}`}
                  aria-current={active ? "step" : undefined}
                  className="group flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors duration-200 md:border",
                      active
                        ? "text-brown md:border-forest md:bg-forest md:text-cream"
                        : "text-sand-strong md:border-sand-strong md:group-hover:bg-taupe-soft"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full bg-current md:hidden",
                        active ? "opacity-100" : "opacity-40"
                      )}
                      aria-hidden="true"
                    />
                    <span className="hidden md:inline">{itemIndex + 1}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
