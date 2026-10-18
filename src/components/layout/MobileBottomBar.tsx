"use client";

import { clinic } from "@/data/clinic";
import { Phone, MessageCircle } from "lucide-react";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-emerald-deep shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-2 divide-x divide-emerald-brand/30">
        {/* Call */}
        <a
          href={clinic.phone.href}
          className="flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm min-h-[52px] transition-colors duration-200 hover:bg-emerald-brand active:bg-emerald-brand"
          aria-label={`Call clinic at ${clinic.phone.display}`}
        >
          <Phone className="h-5 w-5" />
          <span>Call Clinic</span>
        </a>

        {/* WhatsApp */}
        <a
          href={clinic.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm min-h-[52px] transition-colors duration-200 hover:bg-emerald-brand active:bg-emerald-brand"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
