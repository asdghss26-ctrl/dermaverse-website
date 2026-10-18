import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/ui/BookingForm";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Consultation",
  description: `Book a dermatology consultation at ${clinic.fullName} in Adyar, Chennai. Call or WhatsApp to schedule your appointment.`,
};

export default function BookPage() {
  return (
    <>
      <Section background="ivory" className="pt-8 pb-10 md:pt-16 md:pb-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Book a Consultation
          </h1>
          <p className="text-charcoal/60 max-w-md mx-auto">
            Fill in your details below and we&apos;ll open WhatsApp with a
            pre-filled message for you to send.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Form column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[var(--shadow-card)]">
              <BookingForm
                services={services.map((s) => ({
                  slug: s.slug,
                  title: s.title,
                }))}
                whatsappNumber="917358072111"
                clinicName={clinic.name}
              />
            </div>
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Direct contact */}
            <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                Or reach out directly
              </h2>

              <div className="space-y-4">
                <a
                  href={clinic.phone.href}
                  className="flex items-center gap-3 text-charcoal/70 hover:text-emerald-brand transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 shrink-0">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/50">Call us</p>
                    <p className="font-medium text-sm">{clinic.phone.display}</p>
                  </div>
                </a>

                <a
                  href={clinic.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-charcoal/70 hover:text-emerald-brand transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 shrink-0">
                    <MessageCircle className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/50">WhatsApp</p>
                    <p className="font-medium text-sm">{clinic.whatsapp.display}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Clinic info */}
            <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                Clinic Details
              </h2>

              <div className="space-y-4 text-sm text-charcoal/70">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p>{clinic.address.full}</p>
                    <p className="text-xs text-charcoal/50 mt-1">
                      {clinic.address.parking}
                    </p>
                  </div>
                </div>

                {/* TODO: add opening hours when confirmed with client */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                  <p className="text-charcoal/40 italic">
                    Opening hours — TODO: confirm with client
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
