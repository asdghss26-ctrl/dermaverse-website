"use client";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, ctaNav } from "@/data/navigation";
import { clinic } from "@/data/clinic";
import { CurvedMobileMenu } from "./CurvedMobileMenu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  return (
    <>
      {/* Utility bar - scrolls away with page */}
      <div className="hidden bg-olive text-taupe md:block">
        <div className="site-container flex h-[32px] items-center justify-between">
          <p className="hidden text-[12px] uppercase tracking-[0.12em] text-taupe/80 md:block">
            Adyar, Chennai: Dermatology &amp; Aesthetic Medicine
          </p>
          <div className="flex w-full items-center justify-between gap-4 text-[12px] uppercase tracking-[0.12em] md:w-auto md:justify-end md:gap-6">
            <a
              href={clinic.phone.href}
              className="inline-flex items-center text-taupe transition-colors hover:text-cream"
            >
              {clinic.phone.display}
            </a>
            <a
              href={clinic.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-taupe transition-colors hover:text-cream"
            >
              <MessageCircle className="h-3.5 w-3.5 md:h-3 md:w-3" aria-hidden="true" />
              <span className="md:hidden">WhatsApp</span>
              <span className="hidden md:inline">Chat with us</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50">
        {/* Main bar */}
        <div
          className={cn(
            "border-b bg-cream transition-colors duration-300",
            scrolled ? "border-sand/70" : "border-transparent"
          )}
        >
          <div className="mx-auto flex h-[var(--header-h)] w-[min(calc(100%-64px),1440px)] items-center justify-between py-0">
            {/* Wordmark */}
            <Link
              href="/"
              className="flex min-h-11 shrink-0 items-center gap-2.5 leading-none"
              aria-label={`${clinic.fullName}, Home`}
            >
              <Image
                src="/images/clinic-logo.png"
                alt=""
                width={548}
                height={456}
                priority
                className="h-9 w-11 shrink-0 object-contain md:h-11 md:w-[3.25rem]"
              />
              <span className="flex flex-col justify-center">
                <span className="font-heading text-[11px] uppercase tracking-[0.22em] text-sand-strong">
                  Dr. Jansi’s
                </span>
                <span className="mt-1 font-heading text-xl uppercase tracking-[0.12em] text-brown md:text-2xl">
                  DERMVERSE
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-7 lg:flex"
              aria-label="Main navigation"
            >
              {mainNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-heading text-base uppercase tracking-[0.01em] transition-colors duration-200",
                    "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-sand-strong after:transition-transform after:duration-300 hover:after:scale-x-100",
                    pathname === link.href
                      ? "text-sand-strong after:scale-x-100"
                      : "text-brown hover:text-sand-strong"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-5 lg:flex">
              {ctaNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center border-b border-sand pb-0.5 font-heading text-sm uppercase tracking-[0.08em] text-brown transition-colors hover:border-sand-strong hover:text-sand-strong"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              ref={menuButtonRef}
              type="button"
              id="mobile-menu-button"
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center text-brown transition-colors duration-200 hover:text-sand-strong md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={mobileOpen ? "mobile-menu" : undefined}
              aria-haspopup="dialog"
            >
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    "h-px w-5 bg-current transition-all duration-300",
                    mobileOpen ? "translate-y-[3px] rotate-45" : ""
                  )}
                />
                <span
                  className={cn(
                    "h-px w-5 bg-current transition-all duration-300",
                    mobileOpen ? "opacity-0" : ""
                  )}
                />
                <span
                  className={cn(
                    "h-px w-5 bg-current transition-all duration-300",
                    mobileOpen ? "-translate-y-[3px] -rotate-45" : ""
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <CurvedMobileMenu
        isOpen={mobileOpen}
        onClose={closeMobileMenu}
        triggerRef={menuButtonRef}
      />
    </>
  );
}
