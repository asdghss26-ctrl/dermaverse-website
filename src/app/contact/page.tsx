import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Phone, MessageCircle, MapPin, Car, Clock } from "lucide-react";
import Link from "next/link";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${clinic.fullName} in Adyar, Chennai. Call, WhatsApp or visit us — ample parking available.`,
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />

      <Section background="ivory" className="pt-8 pb-10 md:pt-16 md:pb-14">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Contact Us
          </h1>
          <p className="text-charcoal/60 max-w-md mx-auto">
            We&apos;d love to hear from you. Reach out by phone, WhatsApp or
            visit us in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact details */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                Clinic Address
              </h2>
              <div className="space-y-3 text-sm text-charcoal/70">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                  <p>{clinic.address.full}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                  <p>{clinic.address.parking}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                  {/* TODO: confirm opening hours with client */}
                  <p className="italic text-charcoal/40">
                    Opening hours — to be confirmed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact methods */}
            <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <a
                  href={clinic.phone.href}
                  className="flex items-center gap-3 text-charcoal/70 hover:text-emerald-brand transition-colors duration-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 shrink-0">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/50">Call us</p>
                    <p className="font-semibold text-base">{clinic.phone.display}</p>
                  </div>
                </a>

                <a
                  href={clinic.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-charcoal/70 hover:text-emerald-brand transition-colors duration-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 shrink-0">
                    <MessageCircle className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    {/* TODO: confirm WhatsApp number with client */}
                    <p className="text-xs text-charcoal/50">WhatsApp</p>
                    <p className="font-semibold text-base">{clinic.whatsapp.display}</p>
                  </div>
                </a>
              </div>

              <div className="mt-6">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-brand hover:text-gold transition-colors duration-200"
                >
                  Or book a consultation online →
                </Link>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                Find Us
              </h2>
              {/* TODO: embed Google Maps iframe with clinic location */}
              <div className="rounded-xl bg-sage h-64 md:h-80 flex items-center justify-center text-sm text-charcoal/40">
                Map placeholder — TODO: embed Google Maps
              </div>
              <p className="mt-3 text-xs text-charcoal/50">
                {clinic.address.line1}, {clinic.address.line2},{" "}
                {clinic.address.city} {clinic.address.pincode}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Bottom spacer for mobile sticky bar */}
      <div className="h-[52px] lg:h-0" aria-hidden="true" />
    </>
  );
}
