import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { galleryItems } from "@/data/gallery";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Take a look inside ${clinic.fullName} — a clean, comfortable dermatology clinic in Adyar, Chennai.`,
};

export default function GalleryPage() {
  return (
    <>
      <Section
        background="ivory"
        className="pt-8 pb-10 md:pt-16 md:pb-14"
        ariaLabel="Clinic gallery"
        hasPlaceholderData
      >
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Our Clinic
          </h1>
          <p className="text-charcoal/60 max-w-md mx-auto">
            A welcoming, comfortable space designed for your care — take a look
            inside.
          </p>
        </div>

        {/* TODO: replace ImagePlaceholder with real clinic photos using next/image */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <ImagePlaceholder
                  caption={item.caption}
                  aspectRatio="square"
                />
              )}
              <p className="mt-2 text-xs text-charcoal/50 text-center">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom spacer for mobile sticky bar */}
      <div className="h-[52px] lg:h-0" aria-hidden="true" />
    </>
  );
}
