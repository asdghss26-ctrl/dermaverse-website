"use client";

import { clinic } from "@/data/clinic";
import { Phone, MessageCircle } from "lucide-react";

export function MobileBottomBar() {
  return (
  <div
    className="fixed bottom-0 left-0 right-0 z-40 bg-brown shadow-[var(--shadow-bar)] md:hidden data-[menu-open=true]:hidden"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    data-mobile-bottom-bar
  >
      <div className="grid grid-cols-2 divide-x divide-cream/20">
        <a
          href={clinic.phone.href}
          className="flex min-h-12 items-center justify-center gap-2 bg-brown py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-200 hover:bg-olive active:bg-olive"
          aria-label={`Call clinic at ${clinic.phone.display}`}
        >
          <Phone className="h-4 w-4 text-cream" aria-hidden="true" />
          <span>Call</span>
        </a>

        <a
          href={clinic.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 bg-brown py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-200 hover:bg-olive active:bg-olive"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 text-cream" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
