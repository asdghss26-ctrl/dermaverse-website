"use client";

import { cn } from "@/lib/utils";
import { mainNav, ctaNav } from "@/data/navigation";
import { clinic } from "@/data/clinic";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sheet */}
      <div
        className={cn(
          "fixed inset-0 top-[60px] z-40 lg:hidden",
          "bg-ivory flex flex-col",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="flex flex-col flex-1 px-6 pt-6 pb-4 overflow-y-auto" aria-label="Mobile navigation">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "py-4 text-lg font-medium border-b border-emerald-brand/10",
                "transition-colors duration-200",
                pathname === link.href
                  ? "text-emerald-brand"
                  : "text-charcoal hover:text-emerald-brand"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA links */}
          <div className="mt-8 space-y-3">
            {ctaNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full min-h-[48px] rounded-full bg-gold text-emerald-deep font-semibold text-base transition-colors duration-200 hover:bg-gold-light"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact buttons */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={clinic.phone.href}
              className="flex items-center justify-center gap-2 min-h-[48px] rounded-full border-2 border-emerald-brand text-emerald-brand font-semibold text-sm transition-colors duration-200 hover:bg-emerald-brand hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={clinic.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 min-h-[48px] rounded-full border-2 border-emerald-brand text-emerald-brand font-semibold text-sm transition-colors duration-200 hover:bg-emerald-brand hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </nav>

        {/* Clinic info */}
        <div className="px-6 py-5 border-t border-emerald-brand/10">
          <p className="text-xs text-charcoal/50 leading-relaxed">
            {clinic.address.full}
          </p>
          <p className="text-xs text-charcoal/50 mt-1">
            {clinic.address.parking}
          </p>
        </div>
      </div>
    </>
  );
}
