import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { getServicesByCategory } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hair & Scalp Treatments",
  description: `Explore hair and scalp treatments at ${clinic.fullName} in Adyar, Chennai.`,
};

const serviceImages: Record<string, string> = {
  "hair-fall-scalp-care": "/images/treatment-room.jpg",
  "non-surgical-hair-loss-care": "/images/consultation-square.jpg",
};

export default function HairServicesPage() {
  const services = getServicesByCategory("hair");

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
          <h1 className="display-lg text-brown mb-2 md:mb-3 fade-in-delay">HAIR</h1>
          <p className="text-brown leading-relaxed text-base md:text-lg fade-in-delay">
            Evaluation and treatment of hair loss, thinning and scalp conditions — with personalised, evidence-based care.
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
