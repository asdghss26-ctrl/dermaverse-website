import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug, type ServiceCategory } from "@/data/services";
import { clinic } from "@/data/clinic";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Badge } from "@/components/ui/Badge";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Render blocking so the dynamic route can read params without a Suspense shell. */
export const instant = false;

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
      <Section background="cream" className="pt-6 pb-10 md:pt-12 md:pb-14">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/services"
            className="mb-6 inline-flex min-h-11 items-center gap-1 text-sm text-brown transition-colors duration-200 hover:text-sand-strong"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>

          {/* Category badge */}
          <Badge variant="sand" className="mb-3">
            {categoryLabels[service.category]}
          </Badge>

          <h1 className="display-lg text-brown mb-4">
            {service.title}
          </h1>
          <p className="text-brown leading-relaxed text-lg">
            {service.shortDescription}
          </p>

          {service.imageUrl && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-sand shadow-xs mt-8">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Section>

      {/* What it is */}
      <Section background="taupe" ariaLabel="What it is" hasPlaceholderData>
        <div className="max-w-3xl mx-auto">
          <h2 className="display-md text-brown mb-4">
            What It Is
          </h2>
          <p className="text-brown leading-relaxed">
            {service.whatItIs}
          </p>
        </div>
      </Section>

      {/* Who it suits */}
      <Section background="cream" ariaLabel="Who it suits" hasPlaceholderData>
        <div className="max-w-3xl mx-auto">
          <h2 className="display-md text-brown mb-4">
            Who It May Suit
          </h2>
          <p className="text-brown leading-relaxed">
            {service.whoItSuits}
          </p>
        </div>
      </Section>

      {/* What to expect */}
      <Section
        background="taupe"
        ariaLabel="What to expect"
        hasPlaceholderData
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="display-md text-brown mb-4">
            What to Expect at a Visit
          </h2>
          <p className="text-brown leading-relaxed">
            {service.whatToExpect}
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section background="olive" ariaLabel="Book a consultation">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="display-md text-taupe mb-3">
            Interested in {service.title}?
          </h2>
          <p className="text-taupe/80 mb-6 leading-relaxed">
            Book a consultation with {clinic.doctor.shortName} to discuss
            whether this treatment may be right for you.
          </p>
          <Button
            href={clinic.whatsapp.href}
            variant="primary-on-dark"
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
          background="cream"
          ariaLabel="Related services"
          hasPlaceholderData
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="display-md text-brown mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((s) => (
                <ServiceCard
                  key={s.slug}
                  title={s.title}
                  description={s.shortDescription}
                  icon={s.icon}
                  imageUrl={s.imageUrl}
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
