import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { getServicesByCategory } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skin Treatments",
  description: `Explore skin treatments at ${clinic.fullName} in Adyar, Chennai.`,
};

const serviceImages: Record<string, string> = {
  "acne-treatment": "/images/what-to-do-acne.png",
  "acne-scar-management": "/images/what-to-do-acne.png",
  "pigmentation-and-melasma-treatment": "/images/what-to-do-skin-brightening.png",
  "vitiligo-management": "/images/consultation-square.jpg",
  "psoriasis-management": "/images/consultation-square.jpg",
  "eczema-and-atopic-dermatitis": "/images/consultation-square.jpg",
  "rosacea-management": "/images/consultation-square.jpg",
  "urticaria-hives": "/images/consultation-square.jpg",
  "fungal-skin-infections": "/images/consultation-square.jpg",
  "herpes-zoster-management": "/images/consultation-square.jpg",
  "warts-and-skin-tags": "/images/treatment-room.jpg",
  "keloid-management": "/images/treatment-room.jpg",
  "dandruff-and-scalp-disorders": "/images/treatment-room.jpg",
  "nail-abnormalities": "/images/consultation-square.jpg",
  "sun-damaged-skin": "/images/what-to-do-skin-brightening.png",
  "excessive-sweating-hyperhidrosis": "/images/consultation-square.jpg",
  "hidradenitis-suppurativa": "/images/consultation-square.jpg",
  "rashes-and-inflammatory-skin-conditions": "/images/consultation-square.jpg",
  "non-healing-ulcers": "/images/consultation-square.jpg",
  "paediatric-dermatology": "/images/consultation-square.jpg",
  "chemical-peels": "/images/what-to-do-skin-brightening.png",
  "hydrafacial": "/images/what-to-do-skin-brightening.png",
  "microdermabrasion": "/images/what-to-do-skin-brightening.png",
  "dermaplaning": "/images/what-to-do-skin-brightening.png",
  "skin-analysis": "/images/clinic-consultation.jpg",
  "electroporation": "/images/treatment-room.jpg",
  "iontophoresis": "/images/treatment-room.jpg",
  "skin-rejuvenation-treatments": "/images/what-to-do-skin-brightening.png",
  "excimer-light-therapy": "/images/treatment-room.jpg",
  "microneedling-dermapen": "/images/treatment-room.jpg",
  "subcision-for-selected-acne-scars": "/images/treatment-room.jpg",
  "tca-cross-for-suitable-acne-scars": "/images/treatment-room.jpg",
  "scar-reduction-procedures": "/images/treatment-room.jpg",
  "prp-for-acne-scars": "/images/treatment-room.jpg",
  "skin-resurfacing-procedures": "/images/treatment-room.jpg",
  "botox": "/images/what-to-do-anti-ageing.png",
  "mesobotox": "/images/what-to-do-anti-ageing.png",
  "dermal-fillers": "/images/what-to-do-anti-ageing.png",
  "skin-boosters": "/images/what-to-do-anti-ageing.png",
  "lip-rejuvenation": "/images/what-to-do-anti-ageing.png",
  "under-eye-rejuvenation": "/images/what-to-do-anti-ageing.png",
  "non-surgical-lifting-and-skin-tightening": "/images/what-to-do-anti-ageing.png",
  "facial-mesotherapy": "/images/what-to-do-anti-ageing.png",
  "prp-for-skin-rejuvenation": "/images/what-to-do-anti-ageing.png",
  "exosome-based-treatments": "/images/treatment-room.jpg",
  "electrosurgery-and-electrocautery": "/images/treatment-room.jpg",
  "micropigmentation": "/images/consultation-square.jpg",
  "ear-piercing": "/images/consultation-square.jpg",
  "nose-piercing": "/images/consultation-square.jpg",
};

export default function SkinServicesPage() {
  const services = getServicesByCategory("skin");

  return (
    <>
      <Section background="cream" className="pt-6 pb-6 md:pt-14 md:pb-8">
        <div className="max-w-3xl">
          <Link
            href="/services"
            className="mb-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors hover:text-brown"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Services
          </Link>
          <p className="eyebrow mb-3 md:mb-4 text-sand-strong fade-in">Category</p>
          <h1 className="display-lg text-brown mb-2 md:mb-3 fade-in-delay">SKIN</h1>
          <p className="text-brown leading-relaxed text-base md:text-lg fade-in-delay">
            Comprehensive dermatological care for acne, pigmentation, ageing, paediatric concerns and minor surgical needs — delivered with clinical precision and natural results.
          </p>
        </div>
      </Section>

      <Section background="cream" className="pt-0 pb-10 md:pb-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={service.slug} className="fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <ServiceCard
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
                imageUrl={serviceImages[service.slug] ?? service.imageUrl}
                href={`/services/${service.slug}`}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section background="olive" ariaLabel="Book a consultation">
        <div className="text-center max-w-lg mx-auto pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0">
          <p className="eyebrow mb-3 text-taupe">Your skin journey starts here</p>
          <h2 className="display-md text-taupe mb-3">Ready to Book?</h2>
          <p className="text-taupe/80 mb-6 leading-relaxed">
            Schedule a consultation with {clinic.doctor.shortName} to discuss your concerns and explore a personalised treatment plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/appointment" variant="primary-on-dark" size="lg">
              Book Consultation
            </Button>
            <Button href={clinic.phone.href} variant="secondary-on-dark" size="lg">
              <Phone className="h-5 w-5" />
              Call Clinic
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
