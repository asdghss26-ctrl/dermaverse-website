import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clinic, directionsUrl } from "@/data/clinic";
import { services } from "@/data/services";
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
import { TreatmentImageSlider } from "@/components/home/TreatmentImageSlider";
import { CalendarDays, ArrowRight } from "lucide-react";
import {
  Star,
  MapPin,
  Baby,
  Clock,
  Droplets,
  Leaf,
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
        <div className="mb-8 md:mb-12">
          <p className="eyebrow mb-4 text-sand-strong">What we do</p>
          <h2 className="display-lg text-brown max-w-[14ch]">
            Treatments
            <br />
            <em className="font-normal italic">at a glance</em>
          </h2>
        </div>

        <TreatmentImageSlider />

        <div className="mt-8 flex justify-center">
          <Button href="/services" variant="ghost" size="md" className="min-h-[44px] px-0">
            View all treatments
          </Button>
        </div>

        <div className="hidden gap-x-6 gap-y-6 md:grid md:grid-cols-3 items-stretch mt-12">
          {services.slice(0, 6).map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <article key={service.slug} className="group relative h-full">
                <Link href={`/services/${service.slug}`} className="flex h-full flex-col border border-sand p-7 transition-colors hover:border-sand-strong">
                  {Icon ? <Icon className="h-8 w-8 text-brown" strokeWidth={1.5} aria-hidden="true" /> : null}
                  <h3 className="mt-4 font-heading text-xl uppercase leading-tight tracking-wide text-brown min-h-[2.4em]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[16px] md:text-[17px] leading-[1.55] text-brown">
                    {service.shortDescription}
                  </p>
                  <span className="mt-auto pt-4 text-sm font-medium text-sand-strong underline underline-offset-4 transition-colors group-hover:text-brown min-h-[44px] inline-flex items-center">
                    Learn more
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="about"
        background="taupe"
        ariaLabel="About the doctor"
        hasPlaceholderData={clinic.doctor.placeholder}
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {clinic.doctor.portraitUrl ? (
              <div className="relative mx-auto w-full max-w-[420px] overflow-hidden border border-sand/60 shadow-sm">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={clinic.doctor.portraitUrl}
                    alt={`Portrait of ${clinic.doctor.name}`}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7 text-left">
            <p className="eyebrow mb-4 text-sand-strong">{clinic.doctor.title}</p>
            <h2 className="font-heading text-[clamp(32px,5vw,56px)] leading-tight tracking-tight text-brown" style={{ textWrap: 'balance', wordBreak: 'keep-all' }}>
              Dr. Jansi Priyadharshini
            </h2>
            <div className="mt-3 space-y-1 text-base text-brown md:text-lg">
              <p>{clinic.doctor.qualifications.join(" · ")}</p>
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brown md:text-lg">
              Dr. Jansi Priyadharshini is a Consultant Dermatologist specialising in clinical dermatology, skin care, hair care, and laser treatments. She focuses on personalised, evidence-based care to help patients achieve healthy, natural-looking skin.
            </p>
            <Button href="/about" variant="ghost" size="md" className="mt-6 min-h-[44px] self-start px-0">
              Read the Full Bio
            </Button>
          </div>
        </div>
      </Section>

      <Section
        background="cream"
        ariaLabel="How we work"
        hasPlaceholderData
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-4 text-sand-strong">How we work</p>
            <h2 className="font-heading text-[clamp(32px,5vw,56px)] leading-tight tracking-tight text-brown uppercase">
              A CLEAR PATH FROM FIRST VISIT.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-brown md:text-lg">
              A simple, transparent approach to your skin and hair care journey. Every step is explained clearly so you know what to expect.
            </p>

            <div className="mt-8 space-y-6">
              {[
                { num: "01", title: "Consultation & Analysis", desc: "Detailed assessment of your concerns and skin condition." },
                { num: "02", title: "Personalised Treatment Plan", desc: "Customised plan tailored to your goals and needs." },
                { num: "03", title: "Advanced Procedures", desc: "Safe, precise treatments using evidence-based techniques." },
                { num: "04", title: "Ongoing Care & Support", desc: "Follow-up guidance to maintain and extend results." },
              ].map((step) => (
                <div key={step.num} className="relative flex gap-4 border-b border-sand pb-6">
                  <span className="font-heading text-lg text-sand-strong">{step.num}</span>
                  <div>
                    <h3 className="font-heading text-xl uppercase tracking-wide text-brown">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brown">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden border border-sand">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/clinic-consultation.jpg"
                  alt="Clinic consultation"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14 pb-[calc(68px+env(safe-area-inset-bottom))] md:pb-0">
          <div className="border border-sand bg-cream px-6 py-8 text-center md:px-10 md:py-10">
            <p className="eyebrow mb-3 text-sand-strong">YOUR SKIN JOURNEY STARTS HERE</p>
            <h3 className="font-heading text-[clamp(28px,4vw,42px)] leading-tight tracking-tight text-brown">
              Ready for a more confident you?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-brown md:text-lg">
              Book a personalised consultation with Dr. Jansi to discuss your skin and hair concerns.
            </p>
            <Link
              href="/appointment"
              className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 bg-brown px-8 text-[11px] font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:bg-olive"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              BOOK A CONSULTATION
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-4 text-sm text-sand-strong">Personalised care · Professional guidance</p>
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
