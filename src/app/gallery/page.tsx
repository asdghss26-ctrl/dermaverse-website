import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { galleryItems } from "@/data/gallery";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Take a look inside ${clinic.fullName}. A clean, comfortable dermatology clinic in Adyar, Chennai.`,
  openGraph: {
    title: `Gallery | ${clinic.fullName}`,
    description: `Take a look inside ${clinic.fullName}. A clean, comfortable dermatology clinic in Adyar, Chennai.`,
    url: "/gallery",
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function GalleryPage() {
  return (
    <>
      <Section
        background="cream"
        className="pt-8 pb-10 md:pt-16 md:pb-14"
        ariaLabel="Clinic gallery"
      >
        <div className="text-center mb-12">
          <p className="eyebrow mb-4 text-sand-strong">Inside the clinic</p>
          <h1 className="display-lg text-brown mb-3">
            Our Clinic
          </h1>
          <p className="text-brown max-w-md mx-auto">
            A welcoming, comfortable space designed for privacy, clinical precision, and patient comfort.
          </p>
        </div>

        <GalleryGrid items={galleryItems} />

        <ScrollReveal className="mt-16 border-t border-sand pt-12 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-brown mb-3">
            Experience personalised care in Adyar
          </h2>
          <p className="text-sm text-brown max-w-md mx-auto mb-6">
            Consult Dr. Jansi Priyadharshini A for comprehensive skin, hair, and aesthetic dermatology care.
          </p>
          <Button
            href="/appointment"
            variant="primary"
            size="md"
          >
            Book Consultation
          </Button>
        </ScrollReveal>
      </Section>
    </>
  );
}
