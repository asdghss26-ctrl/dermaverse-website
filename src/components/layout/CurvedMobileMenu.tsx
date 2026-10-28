"use client";

import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";
import { clinic } from "@/data/clinic";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface CurvedMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function CurvedMobileMenu({ isOpen, onClose, triggerRef }: CurvedMobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const bottomBar = document.querySelector("[data-mobile-bottom-bar]");
    if (bottomBar) bottomBar.setAttribute("data-menu-open", "true");

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getClientRects().length > 0);

    const focusFrame = requestAnimationFrame(() => {
      getFocusable()[0]?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    // Make main and footer inert
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    if (main) main.setAttribute("inert", "");
    if (footer) footer.setAttribute("inert", "");

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      if (bottomBar) bottomBar.removeAttribute("data-menu-open");
      if (main) main.removeAttribute("inert");
      if (footer) footer.removeAttribute("inert");
      trigger?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  useEffect(() => {
    if (isOpen && window.innerWidth >= 768) {
      onClose();
    }
  }, [isOpen, onClose]);

  const navItems = mainNav;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-brown/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            className="fixed right-0 top-0 z-[70] h-[100dvh] w-full bg-cream md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { x: "100%", opacity: 1 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { x: 0, opacity: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { x: "100%", opacity: 1 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.6,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <svg
              className="absolute left-0 top-0 h-full w-6 -translate-x-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 100 0 C 40 50 40 50 100 100 L 100 0 Z"
                fill="var(--color-cream)"
              />
            </svg>

            <div className="flex h-full flex-col overflow-y-auto">
              <div className="flex items-center justify-end px-4 pt-[calc(env(safe-area-inset-top)+12px)] pb-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center text-brown"
                  aria-label="Close menu"
                >
                  <div className="flex flex-col gap-1">
                    <span className="h-px w-5 bg-current translate-y-[3px] rotate-45" />
                    <span className="h-px w-5 bg-current -translate-y-[3px] -rotate-45" />
                  </div>
                </button>
              </div>

              <nav
                className="flex-1 px-6 pt-4"
                aria-label="Mobile navigation"
              >
                {navItems.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      animate={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: shouldReduceMotion ? 0 : i * 0.05,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "relative flex min-h-[56px] items-center border-b border-sand py-3",
                          "font-heading text-[28px] uppercase leading-tight tracking-wide",
                          isActive ? "text-brown" : "text-brown"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute bottom-2 left-0 h-px w-full bg-sand" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : navItems.length * 0.05,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="mt-8"
                >
                  <Link
                    href="/book"
                    onClick={onClose}
                    className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-brown text-[11px] font-medium uppercase tracking-[0.14em] text-cream"
                  >
                    Book Consultation
                  </Link>
                </motion.div>
              </nav>

              <div className="mt-auto border-t border-sand px-6 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-6">
                <div className="space-y-3 text-brown">
                  {clinic.phone?.href && clinic.phone?.display && (
                    <a
                      href={clinic.phone.href}
                      className="flex min-h-[44px] items-center gap-3"
                    >
                      <Phone className="h-4 w-4 text-sand" strokeWidth={1.5} aria-hidden="true" />
                      <span className="text-sm">{clinic.phone.display}</span>
                    </a>
                  )}
                  {clinic.whatsapp?.href && (
                    <a
                      href={clinic.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center gap-3"
                    >
                      <MessageCircle className="h-4 w-4 text-sand" strokeWidth={1.5} aria-hidden="true" />
                      <span className="text-sm">WhatsApp</span>
                    </a>
                  )}
                  {clinic.address?.full && (
                    <div className="flex min-h-[44px] items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand" strokeWidth={1.5} aria-hidden="true" />
                      <p className="text-sm leading-relaxed">{clinic.address.full}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
