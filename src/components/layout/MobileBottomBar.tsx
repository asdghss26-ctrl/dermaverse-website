"use client";

import { clinic } from "@/data/clinic";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, List, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export function MobileBottomBar() {
  const pathname = usePathname();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleResize = () => {
      const viewport = window.visualViewport!;
      if (viewport.height < window.innerHeight * 0.8) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);
    handleResize();
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
        setIsKeyboardOpen(true);
      }
    };
    const handleBlur = () => {
      if (typeof window !== "undefined" && window.visualViewport) {
        const viewport = window.visualViewport;
        if (viewport.height >= window.innerHeight * 0.8) {
          setIsKeyboardOpen(false);
        }
      } else {
        setIsKeyboardOpen(false);
      }
    };
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  const isHome = pathname === "/";
  const isServices = pathname.startsWith("/services");
  const isBook = pathname === "/book";
  const isContact = pathname === "/contact";

  if (isKeyboardOpen) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-40 bg-cream md:hidden data-[menu-open=true]:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-mobile-bottom-bar
    >
      <div className="relative border-t border-sand">
        <ul className="grid grid-cols-5 items-end">
          <li>
            <Link
              href="/"
              aria-current={isHome ? "page" : undefined}
              className="flex h-[68px] flex-col items-center justify-center gap-1"
            >
              <Home
                className="h-6 w-6"
                strokeWidth={1.5}
                aria-hidden="true"
                style={{ color: isHome ? "var(--color-brown)" : "var(--color-sand-strong)" }}
              />
              <span
                className="text-[12px] font-sans leading-none"
                style={{
                  color: isHome ? "var(--color-brown)" : "var(--color-sand-strong)",
                  fontWeight: isHome ? 500 : 400,
                }}
              >
                Home
              </span>
              {isHome && (
                <span
                  className="absolute top-0 h-[2px] w-6"
                  style={{ backgroundColor: "var(--color-sand)" }}
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              aria-current={isServices ? "page" : undefined}
              className="flex h-[68px] flex-col items-center justify-center gap-1"
            >
              <List
                className="h-6 w-6"
                strokeWidth={1.5}
                aria-hidden="true"
                style={{ color: isServices ? "var(--color-brown)" : "var(--color-sand-strong)" }}
              />
              <span
                className="text-[12px] font-sans leading-none"
                style={{
                  color: isServices ? "var(--color-brown)" : "var(--color-sand-strong)",
                  fontWeight: isServices ? 500 : 400,
                }}
              >
                Services
              </span>
              {isServices && (
                <span
                  className="absolute top-0 h-[2px] w-6"
                  style={{ backgroundColor: "var(--color-sand)" }}
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
          <li className="relative">
            <Link
              href="/book"
              aria-current={isBook ? "page" : undefined}
              aria-label="Book Consultation"
              className="flex h-[68px] flex-col items-center justify-center"
            >
              <span
                className="absolute -top-6 flex h-[54px] w-[54px] items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--color-brown)",
                  border: "4px solid var(--color-cream)",
                  boxShadow: "0 1px 0 rgb(45 36 27 / 0.05)",
                }}
              >
                <CalendarDays className="h-6 w-6" style={{ color: "var(--color-cream)" }} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span
                className="mt-8 text-[12px] font-sans leading-none"
                style={{
                  color: isBook ? "var(--color-brown)" : "var(--color-sand-strong)",
                  fontWeight: isBook ? 500 : 400,
                }}
              >
                Book
              </span>
              {isBook && (
                <span
                  className="absolute top-0 h-[2px] w-6"
                  style={{ backgroundColor: "var(--color-sand)" }}
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
          {clinic.phone?.href ? (
            <li>
              <a
                href={clinic.phone.href}
                className="flex h-[68px] flex-col items-center justify-center gap-1"
                aria-label="Call clinic"
              >
                <Phone className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" style={{ color: "var(--color-sand-strong)" }} />
                <span className="text-[12px] font-sans leading-none" style={{ color: "var(--color-sand-strong)" }}>
                  Call
                </span>
              </a>
            </li>
          ) : (
            <li>
              <Link
                href="/contact"
                aria-current={isContact ? "page" : undefined}
                className="flex h-[68px] flex-col items-center justify-center gap-1"
              >
                <MapPin
                  className="h-6 w-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  style={{ color: isContact ? "var(--color-brown)" : "var(--color-sand-strong)" }}
                />
                <span
                  className="text-[12px] font-sans leading-none"
                  style={{
                    color: isContact ? "var(--color-brown)" : "var(--color-sand-strong)",
                    fontWeight: isContact ? 500 : 400,
                  }}
                >
                  Contact
                </span>
                {isContact && (
                  <span
                    className="absolute top-0 h-[2px] w-6"
                    style={{ backgroundColor: "var(--color-sand)" }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/contact"
              aria-current={isContact ? "page" : undefined}
              className="flex h-[68px] flex-col items-center justify-center gap-1"
            >
              <MapPin
                className="h-6 w-6"
                strokeWidth={1.5}
                aria-hidden="true"
                style={{ color: isContact ? "var(--color-brown)" : "var(--color-sand-strong)" }}
              />
              <span
                className="text-[12px] font-sans leading-none"
                style={{
                  color: isContact ? "var(--color-brown)" : "var(--color-sand-strong)",
                  fontWeight: isContact ? 500 : 400,
                }}
              >
                Contact
              </span>
              {isContact && (
                <span
                  className="absolute top-0 h-[2px] w-6"
                  style={{ backgroundColor: "var(--color-sand)" }}
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
