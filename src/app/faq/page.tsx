import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { faqs } from "@/data/faqs";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Common questions about visiting ${clinic.fullName} in Adyar, Chennai — appointments, parking, what to expect and more.`,
  openGraph: {
    title: `Frequently Asked Questions | ${clinic.fullName}`,
    description: `Common questions about visiting ${clinic.fullName} in Adyar, Chennai — appointments, parking, what to expect and more.`,
    url: "/faq",
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
    // TODO: client to supply a share image (og-image.jpg)
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${clinic.fullName} — Frequently Asked Questions`,
      },
    ],
  },
};

export default function FAQPage() {
  return (
    <>
      <Section
        background="ivory"
        className="pt-8 pb-10 md:pt-16 md:pb-14"
        ariaLabel="Frequently asked questions"
        hasPlaceholderData
      >
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-charcoal/60 max-w-md mx-auto">
            Find answers to common questions about visiting our clinic,
            appointments and what to expect.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <FAQAccordion items={faqs} />
        </div>
      </Section>

      {/* CTA */}
      <Section background="sage" ariaLabel="Still have questions">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal mb-3">
            Still Have Questions?
          </h2>
          <p className="text-charcoal/60 mb-6">
            We&apos;re happy to help. Reach out on WhatsApp or call us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={clinic.whatsapp.href} variant="primary" size="md" external>
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </Button>
            <Button href="/contact" variant="secondary" size="md">
              Contact Page
            </Button>
          </div>
        </div>
      </Section>

    </>
  );
}
