import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug, type ServiceCategory } from "@/data/services";
import { clinic } from "@/data/clinic";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Badge } from "@/components/ui/Badge";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

/** Pre-generate all service slugs at build time */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/** Dynamic metadata per service */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | ${clinic.fullName}`,
      description: service.shortDescription,
    },
  };
}

const categoryLabels: Record<ServiceCategory, string> = {
  skin: "Skin",
  hair: "Hair",
  laser: "Laser",
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Get 2-3 related services from the same category, excluding current
  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb + Header */}
      <Section background="ivory" className="pt-6 pb-10 md:pt-12 md:pb-14">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm text-emerald-brand hover:text-gold transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>

          {/* Category badge */}
          <Badge variant="sage" className="mb-3">
            {categoryLabels[service.category]}
          </Badge>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {service.title}
          </h1>
          <p className="text-charcoal/70 leading-relaxed text-lg">
            {service.shortDescription}
          </p>
        </div>
      </Section>

      {/* What it is */}
      <Section background="sage" ariaLabel="What it is" hasPlaceholderData>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal mb-4">
            What It Is
          </h2>
          <p className="text-charcoal/70 leading-relaxed">{service.whatItIs}</p>
        </div>
      </Section>

      {/* Who it suits */}
      <Section background="ivory" ariaLabel="Who it suits" hasPlaceholderData>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal mb-4">
            Who It May Suit
          </h2>
          <p className="text-charcoal/70 leading-relaxed">
            {service.whoItSuits}
          </p>
        </div>
      </Section>

      {/* What to expect */}
      <Section
        background="sage"
        ariaLabel="What to expect"
        hasPlaceholderData
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal mb-4">
            What to Expect at a Visit
          </h2>
          <p className="text-charcoal/70 leading-relaxed">
            {service.whatToExpect}
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section background="deep-emerald" ariaLabel="Book a consultation">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gold-light mb-3">
            Interested in {service.title}?
          </h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            Book a consultation with {clinic.doctor.shortName} to discuss
            whether this treatment may be right for you.
          </p>
          <Button
            href={clinic.whatsapp.href}
            variant="primary"
            size="lg"
            external
          >
            <MessageCircle className="h-5 w-5" />
            Book Consultation
          </Button>
        </div>
      </Section>

      {/* Related services */}
      {related.length > 0 && (
        <Section
          background="ivory"
          ariaLabel="Related services"
          hasPlaceholderData
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((s) => (
                <ServiceCard
                  key={s.slug}
                  title={s.title}
                  description={s.shortDescription}
                  icon={s.icon}
                  href={`/services/${s.slug}`}
                />
              ))}
            </div>
          </div>
        </Section>
      )}

    </>
  );
}
