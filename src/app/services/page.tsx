import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { services, serviceCategories } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore dermatology services at ${clinic.fullName} — skin care, hair restoration and laser treatments in Adyar, Chennai.`,
};

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <Section background="ivory" className="pt-8 pb-10 md:pt-16 md:pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Our Services
          </h1>
          <p className="text-charcoal/60 leading-relaxed">
            Personalised, evidence-based dermatological care across skin health,
            hair restoration and advanced laser treatments — each plan tailored
            to your unique needs.
          </p>
        </div>
      </Section>

      {/* Service groups */}
      {serviceCategories.map((cat, index) => {
        const catServices = services.filter((s) => s.category === cat.id);
        const backgrounds: ("sage" | "ivory")[] = ["sage", "ivory", "sage"];
        return (
          <Section
            key={cat.id}
            id={cat.id}
            background={backgrounds[index % backgrounds.length]}
            ariaLabel={`${cat.label} services`}
            hasPlaceholderData
          >
            <div className="mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-emerald-brand mb-2">
                {cat.label}
              </h2>
              <p className="text-charcoal/60 max-w-lg">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catServices.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  description={service.shortDescription}
                  icon={service.icon}
                  href={`/services/${service.slug}`}
                />
              ))}
            </div>
          </Section>
        );
      })}

      {/* Closing CTA */}
      <Section background="deep-emerald" ariaLabel="Book a consultation">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gold-light mb-3">
            Ready to Book?
          </h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            Schedule a consultation with {clinic.doctor.shortName} to discuss
            your concerns and explore a personalised treatment plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              href={clinic.whatsapp.href}
              variant="primary"
              size="lg"
              external
            >
              <MessageCircle className="h-5 w-5" />
              Book on WhatsApp
            </Button>
            <Button
              href={clinic.phone.href}
              variant="secondary"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Phone className="h-5 w-5" />
              Call Clinic
            </Button>
          </div>
        </div>
      </Section>

      {/* Bottom spacer for mobile sticky bar */}
      <div className="h-[52px] lg:h-0" aria-hidden="true" />
    </>
  );
}
