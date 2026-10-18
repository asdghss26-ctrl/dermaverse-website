import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { services, serviceCategories } from "@/data/services";
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
    // TODO: client to supply a share image (og-image.jpg)
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: clinic.fullName,
      },
    ],
  },
};
import { reviews } from "@/data/reviews";
import { faqs } from "@/data/faqs";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { TrustStrip } from "@/components/ui/TrustStrip";
import type { TrustItem } from "@/components/ui/TrustStrip";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import {
  Star,
  Phone,
  MessageCircle,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Car,
  MapPin,
  ArrowRight,
} from "lucide-react";

const trustItems: TrustItem[] = [
  { icon: "star", label: "Google rating", value: `${clinic.google.rating}` },
  { icon: "reviews", label: "Reviews", value: `${clinic.google.reviewCount}` },
  { icon: "clock", label: "Experience", value: clinic.doctor.experience },
  { icon: "car", label: "Parking", value: "Free" },
];

export default function HomePage() {
  return (
    <>
      <PhysicianJsonLd />
      <LocalBusinessJsonLd />

      {/* ─── Hero ───────────────────────────────────────────── */}
      <Section background="ivory" className="pt-8 pb-10 md:pt-16 md:pb-16 lg:pt-20">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Watercolor decorative blob */}
          <div
            className="watercolor-blob -top-20 -right-20 w-60 h-60 bg-gold/30"
            aria-hidden="true"
          />
          <div
            className="watercolor-blob -bottom-10 -left-16 w-48 h-48 bg-emerald-brand/20"
            aria-hidden="true"
          />

          {/* Google badge */}
          <div className="mb-5">
            <Badge variant="gold" className="gap-1.5 px-4 py-1.5 text-sm">
              <Star className="h-3.5 w-3.5 fill-emerald-deep text-emerald-deep" />
              {clinic.google.rating} on Google
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] mb-4">
            Skin. Hair. Laser.
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-charcoal/70 leading-relaxed mb-2 max-w-lg">
            Precision dermatology and personalised care for acne, pigmentation,
            hair loss and ageing concerns in Adyar, Chennai.
          </p>

          {/* Doctor name */}
          <p className="text-sm font-medium text-emerald-brand mb-6">
            {clinic.doctor.name} · {clinic.doctor.qualifications[0]},{" "}
            {clinic.doctor.qualifications[1]}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              href={clinic.whatsapp.href}
              variant="primary"
              size="lg"
              external
              className="w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Book on WhatsApp
            </Button>
            <Button
              href={clinic.phone.href}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              Call Clinic
            </Button>
          </div>
        </div>
      </Section>

      {/* ─── Trust Strip ────────────────────────────────────── */}
      <div className="border-y border-emerald-brand/10 bg-white">
        <div className="mx-auto max-w-6xl">
          <TrustStrip items={trustItems} />
        </div>
      </div>

      {/* ─── Services Overview ──────────────────────────────── */}
      <Section
        id="services"
        background="sage"
        ariaLabel="Our services"
        hasPlaceholderData
      >
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Our Services
          </h2>
          <p className="text-charcoal/60 max-w-lg mx-auto">
            Comprehensive dermatological care, grouped across skin health, hair
            restoration and advanced laser treatments.
          </p>
        </div>

        {serviceCategories.map((cat) => {
          const catServices = services.filter((s) => s.category === cat.id);
          return (
            <div key={cat.id} className="mb-10 last:mb-0">
              <h3 className="font-heading text-2xl font-semibold text-emerald-brand mb-1">
                {cat.label}
              </h3>
              <p className="text-sm text-charcoal/60 mb-5">{cat.description}</p>
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
            </div>
          );
        })}

        <div className="text-center mt-8">
          <Button href="/services" variant="secondary" size="md">
            View all services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* ─── About the Doctor (Teaser) ──────────────────────── */}
      <Section
        id="about"
        background="ivory"
        ariaLabel="About the doctor"
        hasPlaceholderData={clinic.doctor.placeholder}
      >
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Your Dermatologist
          </h2>
        </div>

        <DoctorCard
          name={clinic.doctor.name}
          title={clinic.doctor.title}
          qualifications={clinic.doctor.qualifications}
          memberships={clinic.doctor.memberships}
          experience={clinic.doctor.experience}
          portraitUrl={clinic.doctor.portraitUrl}
        />

        <p className="mt-6 text-charcoal/70 leading-relaxed text-center max-w-2xl mx-auto">
          {clinic.doctor.approach}
        </p>

        <div className="text-center mt-6">
          <Button href="/about" variant="ghost" size="md">
            Read full bio
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* ─── Why Choose Us ──────────────────────────────────── */}
      <Section
        id="why-us"
        background="deep-emerald"
        ariaLabel="Why choose us"
      >
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold-light mb-3">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            {
              icon: ShieldCheck,
              title: "Evidence-Based Care",
              desc: "Treatments grounded in the latest dermatological research and clinical evidence.",
            },
            {
              icon: UserCheck,
              title: "Personalised Plans",
              desc: "Every treatment plan is tailored to your unique skin type, concerns and goals.",
            },
            {
              icon: Sparkles,
              title: "Clean, Comfortable Clinic",
              desc: "A welcoming, hygienic space designed for your comfort throughout every visit.",
            },
            {
              icon: Car,
              title: "Ample Parking",
              desc: "Convenient car parking available at the clinic, so getting here is easy.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 shrink-0">
                <item.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Reviews ────────────────────────────────────────── */}
      <Section
        id="reviews"
        background="ivory"
        ariaLabel="Patient reviews"
      >
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            What Our Patients Say
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-charcoal/60">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span>
              {clinic.google.rating} rating from {clinic.google.reviewCount}{" "}
              Google reviews
            </span>
          </div>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
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

      {/* ─── FAQ Preview ────────────────────────────────────── */}
      <Section
        id="faq"
        background="sage"
        ariaLabel="Frequently asked questions"
        hasPlaceholderData
      >
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Common Questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <FAQAccordion items={faqs.slice(0, 4)} />
        </div>

        <div className="text-center mt-6">
          <Button href="/faq" variant="ghost" size="md">
            View all FAQs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* ─── Visit / Map ────────────────────────────────────── */}
      <Section
        id="visit"
        background="ivory"
        ariaLabel="Visit our clinic"
      >
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Visit Our Clinic
          </h2>
        </div>

        <div className="max-w-xl mx-auto text-center">
          <div className="flex items-start justify-center gap-2 text-charcoal/70 mb-2">
            <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
            <p>{clinic.address.full}</p>
          </div>
          <p className="text-sm text-charcoal/50 mb-6">
            {clinic.address.parking}
          </p>

          {/* TODO: embed Google Maps iframe here */}
          <div className="rounded-xl bg-sage h-48 md:h-64 flex items-center justify-center text-sm text-charcoal/40 mb-6">
            Map placeholder — TODO: embed Google Maps
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={clinic.phone.href} variant="primary" size="md">
              <Phone className="h-5 w-5" />
              Call Clinic
            </Button>
            <Button
              href={clinic.whatsapp.href}
              variant="secondary"
              size="md"
              external
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </Section>

    </>
  );
}
