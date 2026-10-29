import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { galleryItems } from "@/data/gallery";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ArrowUpRight } from "lucide-react";

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item, idx) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-md border border-sand-strong bg-taupe-soft transition-all duration-300 hover:border-brown hover:shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-taupe">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    priority={idx === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <ImagePlaceholder
                    caption={item.caption}
                    aspectRatio="landscape"
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold tracking-wide text-brown">
                    {item.caption}
                  </h2>
                  <p className="text-xs text-sand-strong mt-0.5">{item.alt}</p>
                </div>
                <span className="eyebrow text-sand-strong">{String(idx + 1).padStart(2, "0")}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-sand pt-12">
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
        </div>
      </Section>
    </>
  );
}
