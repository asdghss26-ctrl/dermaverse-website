import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { services, serviceCategories } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Phone } from "lucide-react";

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

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <Section background="cream" className="pt-8 pb-10 md:pt-16 md:pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4 text-sand-strong">Our practice</p>
          <h1 className="display-lg text-brown mb-3">
            Our Services
          </h1>
          <p className="text-brown leading-relaxed">
            Personalised dermatological care across skin health, hair and scalp
            care, and laser treatments, each plan tailored to your needs.
          </p>
        </div>
      </Section>

      {/* Service groups */}
      {serviceCategories.map((cat, index) => {
        const catServices = services.filter((s) => s.category === cat.id);
        const backgrounds: ("taupe" | "cream")[] = ["taupe", "cream", "taupe"];
        const sectionBackground = backgrounds[index % backgrounds.length];
        return (
          <Section
            key={cat.id}
            id={cat.id}
            background={sectionBackground}
            ariaLabel={`${cat.label} services`}
            hasPlaceholderData
          >
            <div className="mb-8">
              <h2 className="display-md text-brown mb-2">
                {cat.label}
              </h2>
              <p
                className={
                  sectionBackground === "taupe"
                    ? "text-brown max-w-lg"
                    : "text-brown max-w-lg"
                }
              >
                {cat.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catServices.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  description={service.shortDescription}
                  icon={service.icon}
                  imageUrl={service.imageUrl}
                  href={`/services/${service.slug}`}
                />
              ))}
            </div>
          </Section>
        );
      })}

      {/* Closing CTA */}
      <Section background="olive" ariaLabel="Book a consultation">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="display-md text-taupe mb-3">
            Ready to Book?
          </h2>
          <p className="text-taupe/80 mb-6 leading-relaxed">
            Schedule a consultation with {clinic.doctor.shortName} to discuss
            your concerns and explore a personalised treatment plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              href={clinic.whatsapp.href}
              variant="primary-on-dark"
              size="lg"
              external
            >
              <MessageCircle className="h-5 w-5" />
              Book Consultation
            </Button>
            <Button
              href={clinic.phone.href}
              variant="secondary-on-dark"
              size="lg"
            >
              <Phone className="h-5 w-5" />
              Call Clinic
            </Button>
          </div>
        </div>
      </Section>

    </>
  );
}
