import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/ui/BookingForm";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Consultation",
  description: `Book a dermatology consultation at ${clinic.fullName} in Adyar, Chennai. Call or WhatsApp to schedule your appointment.`,
  openGraph: {
    title: `Book Consultation | ${clinic.fullName}`,
    description: `Book a dermatology consultation at ${clinic.fullName} in Adyar, Chennai. Call or WhatsApp to schedule your appointment.`,
    url: "/book",
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
  },
};

export default function BookPage() {
  return (
    <>
      <Section background="cream" className="pt-8 pb-10 md:pt-16 md:pb-12">
        <div className="text-center mb-8">
          <p className="eyebrow mb-4 text-sand-strong">Appointments</p>
          <h1 className="display-lg text-brown mb-3">
            Book a Consultation
          </h1>
          <p className="text-brown max-w-md mx-auto">
            Fill in your details below and we&apos;ll open WhatsApp with a
            pre-filled message for you to send.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Form column */}
          <div className="lg:col-span-3">
            <div className="border border-sand bg-cream p-6 md:p-8">
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
            <div className="border border-sand bg-cream p-6">
              <h2 className="font-heading text-2xl text-brown mb-4">
                Or reach out directly
              </h2>

              <div className="space-y-4">
                <a
                  href={clinic.phone.href}
                  className="flex min-h-11 items-center gap-3 text-brown transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-taupe/60 shrink-0">
                    <Phone className="h-5 w-5 text-sand-strong" />
                  </div>
                  <div>
                    <p className="text-xs text-sand-strong">Call us</p>
                    <p className="font-medium text-sm">{clinic.phone.display}</p>
                  </div>
                </a>

                <a
                  href={clinic.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 text-brown transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-taupe/60 shrink-0">
                    <MessageCircle className="h-5 w-5 text-sand-strong" />
                  </div>
                  <div>
                    <p className="text-xs text-sand-strong">WhatsApp</p>
                    <p className="font-medium text-sm">{clinic.whatsapp.display}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Clinic info */}
            <div className="border border-sand bg-cream p-6">
              <h2 className="font-heading text-2xl text-brown mb-4">
                Clinic Details
              </h2>

              <div className="space-y-4 text-sm text-brown">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sand mt-0.5 shrink-0" />
                  <div>
                    <p>{clinic.address.full}</p>
                    <p className="text-xs text-sand-strong mt-1">
                      {clinic.address.parking}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-sand mt-0.5 shrink-0" />
                  <p className="text-sand-strong">{clinic.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
