"use client";

import { cn } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { mainNav, ctaNav } from "@/data/navigation";
import { clinic } from "@/data/clinic";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-ivory/95 backdrop-blur-sm shadow-[var(--shadow-nav)]"
            : "bg-ivory"
        )}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Wordmark / Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label={`${clinic.fullName} — Home`}
          >
            {/* TODO: replace with <Image src={clinic.logoUrl} /> when client supplies logo */}
            <span className="font-heading text-xl md:text-2xl font-bold text-emerald-brand leading-tight">
              {clinic.wordmark}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  pathname === link.href
                    ? "text-emerald-brand bg-sage"
                    : "text-charcoal/70 hover:text-emerald-brand hover:bg-sage/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href={clinic.phone.href}
              variant="secondary"
              size="sm"
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
            {ctaNav.map((link) => (
              <Button key={link.href} href={link.href} variant="primary" size="sm">
                {link.label}
              </Button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center h-11 w-11 rounded-xl text-charcoal hover:bg-sage transition-colors duration-200 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Spacer for fixed header */}
      <div className="h-[60px] md:h-[68px]" />
    </>
  );
}
