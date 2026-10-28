import type { Metadata } from "next";
import { clinic, directionsUrl } from "@/data/clinic";
import { Section } from "@/components/ui/Section";
import { Phone, MessageCircle, MapPin, Car, Clock } from "lucide-react";
import Link from "next/link";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${clinic.fullName} in Adyar, Chennai. Call, WhatsApp or visit us. Parking available.`,
  openGraph: {
    title: `Contact | ${clinic.fullName}`,
    description: `Contact ${clinic.fullName} in Adyar, Chennai. Call, WhatsApp or visit us. Parking available.`,
    url: "/contact",
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />

      <Section background="cream" className="pt-8 pb-10 md:pt-16 md:pb-14">
        <div className="text-center mb-10">
          <p className="eyebrow mb-4 text-sand-strong">Get in touch</p>
          <h1 className="display-lg text-brown mb-3">
            Contact Us
          </h1>
          <p className="text-brown max-w-md mx-auto">
            We&apos;d love to hear from you. Reach out by phone, WhatsApp or
            visit us in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact details */}
          <div className="space-y-6">
            {/* Address */}
            <div className="border border-sand bg-cream p-6">
              <h2 className="font-heading text-2xl text-brown mb-4">
                Clinic Address
              </h2>
              <div className="space-y-3 text-sm text-brown">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sand mt-0.5 shrink-0" />
                  <p>{clinic.address.full}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-sand mt-0.5 shrink-0" />
                  <p>{clinic.address.parking}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-sand mt-0.5 shrink-0" />
                  <p className="text-sand-strong">{clinic.hours}</p>
                </div>
              </div>
            </div>

            {/* Contact methods */}
            <div className="border border-sand bg-cream p-6">
              <h2 className="font-heading text-2xl text-brown mb-4">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <a
                  href={clinic.phone.href}
                  className="flex items-center gap-3 text-brown hover:text-brown transition-colors duration-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-taupe/60 shrink-0">
                    <Phone className="h-5 w-5 text-sand-strong" />
                  </div>
                  <div>
                    <p className="text-xs text-sand-strong">Call us</p>
                    <p className="font-semibold text-base">{clinic.phone.display}</p>
                  </div>
                </a>

                <a
                  href={clinic.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brown hover:text-brown transition-colors duration-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-taupe/60 shrink-0">
                    <MessageCircle className="h-5 w-5 text-sand-strong" />
                  </div>
                  <div>
                    {/* TODO: confirm WhatsApp number with client */}
                    <p className="text-xs text-sand-strong">WhatsApp</p>
                    <p className="font-semibold text-base">{clinic.whatsapp.display}</p>
                  </div>
                </a>
              </div>

              <div className="mt-6">
                <Link
                  href="/book"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brown transition-colors duration-200 hover:text-sand-strong"
                >
                  Or book a consultation online
                </Link>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="border border-sand bg-cream p-6">
              <h2 className="font-heading text-2xl text-brown mb-4">
                Find Us
              </h2>
              {/* TODO: embed Google Maps iframe when client confirms location */}
              <p className="text-sm leading-relaxed text-brown">
                {clinic.address.full}
              </p>
              <p className="mt-2 text-xs text-sand-strong">
                {clinic.address.parking}
              </p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors duration-200 hover:text-brown"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Get directions
              </a>
            </div>
          </div>
        </div>
      </Section>

    </>
  );
}
