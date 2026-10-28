import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clinic, directionsUrl } from "@/data/clinic";
import { services } from "@/data/services";
import { galleryItems } from "@/data/gallery";
import { PhysicianJsonLd, LocalBusinessJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: `${clinic.fullName} | Adyar, Chennai`,
  description: clinic.doctor.approach,
  openGraph: {
    title: `${clinic.fullName} | Adyar, Chennai`,
    description: clinic.doctor.approach,
    url: "/",
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: clinic.fullName }],
  },
};
import { reviews } from "@/data/reviews";
import { faqs } from "@/data/faqs";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { TrustStrip } from "@/components/ui/TrustStrip";
import type { TrustItem } from "@/components/ui/TrustStrip";
import { Hero } from "@/components/home/Hero";
import { TreatmentsStrip } from "@/components/home/TreatmentsStrip";
import { ProcessArch } from "@/components/home/ProcessArch";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import {
  Star,
  ShieldCheck,
  UserCheck,
  Leaf,
  Car,
  MapPin,
  ArrowUpRight,
  Baby,
  Clock,
  Droplets,
  Microscope,
  ScanFace,
  Scissors,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

const serviceIconMap: Record<string, LucideIcon> = {
  Baby,
  Clock,
  Droplets,
  Leaf,
  Microscope,
  ScanFace,
  Scissors,
  Sun,
  Zap,
};

const googleUrl = clinic.google.url;

const parkingValue = clinic.address.parking
  .replace(/^Parking\s+/i, "")
  .replace(/^./, (char) => char.toUpperCase());

const trustItems: TrustItem[] = [
  ...(clinic.address.area && clinic.address.city
    ? [
        {
          icon: "pin" as const,
          label: "Location",
          value: `${clinic.address.area}, ${clinic.address.city}`,
        },
      ]
    : []),
  ...(clinic.hours
    ? [
        {
          icon: "clock" as const,
          label: "Hours",
          value: clinic.hours,
        },
      ]
    : []),
  ...(parkingValue
    ? [
        {
          icon: "car" as const,
          label: "Parking",
          value: parkingValue,
          mobileValue: clinic.address.parking,
        },
      ]
    : []),
  ...(clinic.phone.display && clinic.phone.href
    ? [
        {
          icon: "phone" as const,
          label: "Call",
          value: clinic.phone.display,
          href: clinic.phone.href,
        },
      ]
    : []),
];

const mobileServiceSlugs = new Set([
  "acne-treatment",
  "pigmentation-chemical-peels",
  "hair-fall-scalp-care",
  "laser-treatments",
]);

const mobileServices = services.filter((service) =>
  mobileServiceSlugs.has(service.slug)
);

const mobileGalleryIds = new Set([
  "reception",
  "consultation",
  "exterior",
]);

const mobileGallery = galleryItems.filter((item) =>
  mobileGalleryIds.has(item.id)
);

export default function HomePage() {
  return (
    <>
      <PhysicianJsonLd />
      <LocalBusinessJsonLd />

      <Hero />
      <TreatmentsStrip />

      <div className="border-b border-sand bg-taupe-soft md:border-y">
        <div className="site-container py-5 md:py-10">
          <TrustStrip items={trustItems} />
        </div>
      </div>

      <Section
        id="services"
        background="cream"
        ariaLabel="Our treatments"
        hasPlaceholderData
        className="scroll-mt-[var(--header-h)] pt-[clamp(56px,8vh,96px)]"
      >
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end md:gap-8">
          <div>
            <p className="eyebrow mb-4 text-sand-strong">What we do</p>
            <h2 className="display-lg text-brown max-w-[14ch]">
              Treatments
              <br />
              <em className="font-normal italic">at a glance</em>
            </h2>
          </div>
          <div className="max-w-sm md:text-right flex flex-col items-start md:items-end">
            <p className="text-sm leading-relaxed text-brown">
              Comprehensive dermatological care across skin health, hair and
              scalp care, and laser treatments.
            </p>
            <Button
              href="/services"
              variant="ghost"
              size="md"
              className="mt-3 md:mt-4 min-h-[44px] px-0 md:ml-auto"
            >
              View all treatments
            </Button>
          </div>
        </div>

        <ul className="divide-y divide-sand border-y border-sand md:hidden">
          {mobileServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="flex min-h-[88px] items-center justify-between gap-4 py-4 text-brown"
              >
                <span className="font-heading text-xl uppercase leading-tight tracking-wide">
                  {service.title}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-sand-strong"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden gap-x-6 gap-y-6 md:grid md:grid-cols-3">
          {services.slice(0, 6).map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <article key={service.slug} className="group relative">
                <Link href={`/services/${service.slug}`} className="block h-[200px] border border-sand p-6 transition-colors hover:border-sand-strong">
                  <div className="flex h-full flex-col">
                    {Icon ? <Icon className="h-8 w-8 text-brown" strokeWidth={1.5} aria-hidden="true" /> : null}
                    <h3 className="mt-4 font-heading text-xl uppercase leading-tight tracking-wide text-brown">
                      {service.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brown">
                      {service.shortDescription}
                    </p>
                    <span className="mt-auto text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors group-hover:text-brown min-h-[44px] inline-flex items-center">
                      Learn more
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-8 hidden justify-center md:flex">
            <Button href="/services" variant="ghost" size="md" className="min-h-[44px] px-0 self-start">
              See all treatments
            </Button>
        </div>
      </Section>

      <Section
        id="about"
        background="taupe"
        ariaLabel="About the doctor"
        hasPlaceholderData={clinic.doctor.placeholder}
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {!(clinic.doctor.placeholder) && clinic.doctor.portraitUrl ? (
              <div className="arch relative mx-auto max-h-[56vh] w-full max-w-[420px] overflow-hidden border border-sand/60 shadow-sm aspect-[4/5]">
                <Image
                  src={clinic.doctor.portraitUrl}
                  alt={`Portrait of ${clinic.doctor.name}`}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7 text-left">
            <p className="eyebrow mb-4 text-sand-strong">{clinic.doctor.title}</p>
            <h2 className="display-lg text-brown text-[clamp(26px,8vw,30px)] md:text-[clamp(34px,4.2vw,60px)] leading-tight" style={{ textWrap: 'balance' }}>
              {clinic.doctor.name.replace("PRIYADHARSHINI A", "PRIYADHARSHINI\u00A0A")}
            </h2>
            <div className="mt-4 space-y-1 text-sm text-brown">
              <p>{clinic.doctor.qualifications.join(" · ")}{clinic.doctor.fellowship ? ` · ${clinic.doctor.fellowship}` : ""}</p>
              {clinic.doctor.memberships && clinic.doctor.memberships.length > 0 && (
                <p className="text-sand-strong">{clinic.doctor.memberships.join(" · ")}</p>
              )}
            </div>
            <Button href="/about" variant="ghost" size="md" className="mt-6 min-h-[44px] self-start px-0">
              Read the full bio
            </Button>
          </div>
        </div>
      </Section>

      <Section
        background="cream"
        ariaLabel="How we work"
        hasPlaceholderData
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4 text-sand-strong">How we work</p>
            <h2 className="display-lg text-brown max-w-[16ch]">
              A clear path
              <br />
              <em className="font-normal italic">from first visit.</em>
            </h2>
            <p className="mt-5 hidden max-w-sm text-sm leading-relaxed text-brown md:block">
              Consultation, assessment, a personal plan and a follow-up. Each
              step is explained before it happens, so you always know what comes
              next.
            </p>
          </div>

          <div className="lg:col-span-7 lg:justify-self-end">
            <ProcessArch />
          </div>
        </div>
      </Section>

      <Section background="olive" ariaLabel="Why choose us">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-taupe">The Dermverse standard</p>
            <h2 className="display-lg text-taupe max-w-[14ch]">
              Clinical rigour.
              <br />
              <em className="font-normal italic">Human warmth.</em>
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm leading-relaxed text-taupe/80 md:block md:text-right">
            A modern dermatology practice built around careful assessment,
            comfort and care that still looks like you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            {
              icon: ShieldCheck,
              title: "Clinical care",
              desc: "Recommendations based on your skin, history and assessment.",
            },
            {
              icon: UserCheck,
              title: "Personalised plans",
              desc: "Every treatment plan is tailored to your skin type, concerns and goals.",
            },
            {
              icon: Leaf,
              title: "Natural finish",
              desc: "A focus on healthy skin and outcomes that enhance rather than alter.",
            },
            {
              icon: Car,
              title: "Easy, comfortable visits",
              desc: "A calm, hygienic clinic with parking available in the heart of Adyar.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`flex gap-4 border-t border-taupe/20 pt-5 md:gap-5 md:pt-6 ${i === 3 ? 'border-b border-taupe/20 pb-5 md:border-b-0 md:pb-0' : ''}`}
            >
              <div>
                <div className="flex items-center gap-3 md:mb-2">
                  <item.icon
                    className="h-5 w-5 shrink-0 text-sand"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-lg uppercase tracking-wide text-taupe md:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 hidden max-w-sm text-sm leading-relaxed text-taupe/80 md:block">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="clinic-spaces" background="cream" ariaLabel="Inside the clinic">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-sand-strong">The Clinic Environment</p>
            <h2 className="display-lg text-brown max-w-[14ch]">
              Inside
              <br />
              <em className="font-normal italic">Dermverse</em>
            </h2>
          </div>
          <div className="max-w-sm md:text-right flex flex-col items-start md:items-end">
            <p className="hidden text-sm leading-relaxed text-brown md:block">
              A tranquil, contemporary dermatology practice in Adyar designed for privacy, clinical rigor, and patient comfort.
            </p>
            <Button href="/gallery" variant="ghost" size="md" className="mt-3 md:mt-4 min-h-[44px] px-0">
              Explore the full gallery
            </Button>
          </div>
        </div>

        <div className="md:hidden">
          <p className="eyebrow mb-3 text-sand-strong">Sample images</p>
          <div className="grid grid-cols-2 gap-3">
            {mobileGallery.map((item) => (
              <div key={item.id}>
                <div className="relative aspect-square overflow-hidden rounded-sm border border-sand bg-taupe">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-2 font-heading text-base uppercase tracking-wide text-brown">
                  {item.caption}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-3">
          <div className="group overflow-hidden rounded-md border border-sand-strong bg-taupe-soft shadow-xs transition-all duration-300 hover:border-brown hover:shadow-md">
            <div className="relative w-full overflow-hidden bg-taupe" style={{ height: 'clamp(180px, 26vh, 260px)' }}>
              <Image
                src="/images/clinic-reception.jpg"
                alt="Reception lounge at Dr. Jansi's Dermverse"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="sample-badge">Sample content</span>
            </div>
            <div className="p-4">
              <h3 className="font-heading text-lg uppercase tracking-wide text-brown">Reception &amp; Lounge</h3>
              <p className="text-xs text-brown mt-1">Clinic space</p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-md border border-sand-strong bg-taupe-soft shadow-xs transition-all duration-300 hover:border-brown hover:shadow-md">
            <div className="relative w-full overflow-hidden bg-taupe" style={{ height: 'clamp(180px, 26vh, 260px)' }}>
              <Image
                src="/images/clinic-consultation.jpg"
                alt="Private consultation suite"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="sample-badge">Sample content</span>
            </div>
            <div className="p-4">
              <h3 className="font-heading text-lg uppercase tracking-wide text-brown">Consultation Suite</h3>
              <p className="text-xs text-brown mt-1">Clinic space</p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-md border border-sand-strong bg-taupe-soft shadow-xs transition-all duration-300 hover:border-brown hover:shadow-md">
            <div className="relative w-full overflow-hidden bg-taupe" style={{ height: 'clamp(180px, 26vh, 260px)' }}>
              <Image
                src="/images/treatment-suite.jpg"
                alt="Laser and procedure suite"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="sample-badge">Sample content</span>
            </div>
            <div className="p-4">
              <h3 className="font-heading text-lg uppercase tracking-wide text-brown">Treatment Suite</h3>
              <p className="text-xs text-brown mt-1">Clinic space</p>
            </div>
          </div>
        </div>
      </Section>

      {googleUrl && (
        <Section id="reviews" background="cream" ariaLabel="Patient reviews">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4 text-sand-strong">Patient stories</p>
              <h2 className="display-lg text-brown max-w-[14ch]">
                What they
                <br />
                <em className="font-normal italic">said</em>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end md:pb-2">
              <div className="flex items-center gap-3">
                <div className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sand text-sand" />
                  ))}
                </div>
                <p className="eyebrow text-sand-strong">
                  {clinic.google.rating} from {clinic.google.reviewCount} Google
                  reviews
                </p>
              </div>
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors duration-200 hover:text-brown"
              >
                Read reviews on Google
              </a>
            </div>
          </div>

          <div className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            {reviews.map((review, i) => (
              <ReviewCard
                key={i}
                text={review.text}
                source={review.source}
                rating={review.rating}
              />
            ))}
          </div>
        </Section>
      )}

      <Section
        id="faq"
        background="taupe"
        ariaLabel="Frequently asked questions"
        hasPlaceholderData
      >
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4 text-sand-strong">Questions</p>
            <h2 className="display-md text-brown max-w-[14ch]">
              Good to
              <br />
              <em className="font-normal italic">know.</em>
            </h2>
            <p className="mt-5 hidden max-w-xs text-sm leading-relaxed text-brown md:block">
              Everything you might want to ask before your first visit.
            </p>
            <Button href="/faq" variant="ghost" size="md" className="mt-3 md:mt-5 min-h-[44px] px-0 self-start">
              View all FAQs
            </Button>
          </div>

          <div className="lg:col-span-8">
            <FAQAccordion items={faqs.slice(0, 4)} />
          </div>
        </div>
      </Section>

      <Section id="visit" background="cream" ariaLabel="Visit our clinic">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4 text-sand-strong">Visit</p>
            <h2 className="display-lg text-brown max-w-[14ch]">
              Find us in
              <br />
              <em className="font-normal italic">Adyar.</em>
            </h2>

            <p className="mt-5 text-base text-brown">{clinic.hours}</p>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-sand bg-cream p-6 md:p-8">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-1 h-5 w-5 shrink-0 text-sand"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <p className="eyebrow text-sand-strong">Clinic address</p>
                  <p className="mt-2 text-lg leading-relaxed text-brown">
                    {clinic.address.full}
                  </p>
                  <p className="mt-3 text-sm text-brown">
                    {clinic.address.parking}
                  </p>
                </div>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors duration-200 hover:text-brown self-start px-0"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Get directions
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
