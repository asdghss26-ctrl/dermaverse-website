import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore dermatology services at ${clinic.fullName}: skin care, hair and scalp care, and laser treatments in Adyar, Chennai.`,
  openGraph: {
    title: `Services | ${clinic.fullName}`,
    description: `Explore dermatology services at ${clinic.fullName}: skin care, hair and scalp care, and laser treatments in Adyar, Chennai.`,
    url: "/services",
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
  },
};

const categoryCards = [
  {
    id: "skin",
    label: "SKIN",
    href: "/services/skin",
    description:
      "Acne, pigmentation, anti-ageing, paediatric care and dermatosurgery — tailored with clinical precision.",
    image: "/images/consultation-square.jpg",
    alt: "Dermatology consultation for skin care",
  },
  {
    id: "hair",
    label: "HAIR",
    href: "/services/hair",
    description:
      "Targeted care for hair loss, thinning and scalp conditions with personalised treatment plans.",
    image: "/images/treatment-room.jpg",
    alt: "Hair and scalp care treatment",
  },
  {
    id: "laser",
    label: "LASER",
    href: "/services/laser",
    description:
      "Energy-based laser therapies for pigmentation, hair reduction, rejuvenation and skin concerns.",
    image: "/images/laser-suite.jpg",
    alt: "Laser treatment suite",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Section background="cream" className="pt-6 pb-8 md:pt-14 md:pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-3 md:mb-4 text-sand-strong fade-in">Our practice</p>
          <h1 className="display-lg text-brown mb-2 md:mb-3 fade-in-delay">Our Services</h1>
          <p className="text-brown leading-relaxed text-base md:text-lg fade-in-delay">
            Personalised dermatological care across skin health, hair and scalp care, and laser treatments, each plan tailored to your needs.
          </p>
        </div>
      </Section>

      <Section background="cream" className="pt-0 pb-10 md:pb-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {categoryCards.map((card, index) => (
            <article
              key={card.id}
              className="group relative overflow-hidden rounded-md border border-sand bg-cream shadow-xs transition-all duration-300 hover:border-sand-strong hover:shadow-md fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <Link href={card.href} className="block">
                <div className="relative h-[200px] w-full overflow-hidden sm:h-[220px] md:h-[260px]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/25 to-transparent" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2 p-5 md:p-6">
                  <p className="eyebrow text-sand-strong">Category</p>
                  <h2 className="font-heading text-2xl uppercase tracking-wide text-brown md:text-3xl">{card.label}</h2>
                  <p className="text-sm leading-relaxed text-brown md:text-base">{card.description}</p>
                  <span className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors group-hover:text-brown">
                    Explore Treatments
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
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
            <Button href={clinic.whatsapp.href} variant="primary-on-dark" size="lg" external>
              <MessageCircle className="h-5 w-5" />
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
