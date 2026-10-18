"use client";

import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { clinic } from "@/data/clinic";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState("2026");
  useEffect(() => { setYear(String(new Date().getFullYear())); }, []);

  return (
    <footer className="bg-emerald-deep text-white" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand & tagline */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-gold-light mb-2">
              {clinic.wordmark}
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {clinic.tagline}
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              {clinic.doctor.approach}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {mainNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/book"
                    className="text-sm text-white/70 hover:text-gold transition-colors duration-200"
                  >
                    Book Consultation
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Visit Us
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <p>{clinic.address.full}</p>
              </div>
              <p className="pl-6 text-xs text-white/50">
                {clinic.address.parking}
              </p>
              <a
                href={clinic.phone.href}
                className="flex items-center gap-2 hover:text-gold transition-colors duration-200"
              >
                <Phone className="h-4 w-4 text-gold" />
                {clinic.phone.display}
              </a>
              <a
                href={clinic.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors duration-200"
              >
                <MessageCircle className="h-4 w-4 text-gold" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {year} {clinic.fullName}. All rights reserved.</p>
          <p>Adyar, Chennai</p>
        </div>
      </div>

      {/* Extra padding at bottom on mobile for sticky bar */}
      <div className="h-[52px] lg:h-0" />
    </footer>
  );
}
