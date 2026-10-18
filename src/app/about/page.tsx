import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { Section } from "@/components/ui/Section";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Car, ShieldCheck, UserCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Dr. Jansi Priyadharshini A",
  description: `Learn about ${clinic.doctor.name}, Consultant Dermatologist with ${clinic.doctor.experience} of experience in evidence-based clinical dermatology, aesthetic procedures and laser treatments in Adyar, Chennai.`,
  openGraph: {
    title: `About Dr. Jansi Priyadharshini A | ${clinic.fullName}`,
    description: `Learn about ${clinic.doctor.name}, Consultant Dermatologist with ${clinic.doctor.experience} of experience in evidence-based clinical dermatology, aesthetic procedures and laser treatments in Adyar, Chennai.`,
    url: "/about",
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
    // TODO: client to supply a share image (og-image.jpg)
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `About Dr. Jansi Priyadharshini A — ${clinic.fullName}`,
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Doctor profile */}
      <Section
        background="ivory"
        className="pt-8 pb-10 md:pt-16 md:pb-14"
        ariaLabel="About the doctor"
        hasPlaceholderData={clinic.doctor.placeholder}
      >
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            About Your Dermatologist
          </h1>
        </div>

        <DoctorCard
          name={clinic.doctor.name}
          title={clinic.doctor.title}
          qualifications={clinic.doctor.qualifications}
          memberships={clinic.doctor.memberships}
          experience={clinic.doctor.experience}
          portraitUrl={clinic.doctor.portraitUrl}
        />
      </Section>

      {/* Bio */}
      <Section background="sage" ariaLabel="Doctor biography" hasPlaceholderData>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal mb-4">
            Background
          </h2>
          <div className="space-y-4 text-charcoal/70 leading-relaxed">
            <p>
              {clinic.doctor.name} is a Consultant Dermatologist with over 10
              years of clinical experience. She holds an MBBS, MD in
              Dermatology, Venereology and Leprosy (DVL), and a Post-Doctoral
              Fellowship in Aesthetic Dermatology.
            </p>
            <p>
              She is an active member of the Indian Association of
              Dermatologists, Venereologists and Leprologists (IADVL) and the
              Association of Cutaneous Surgeons of India (ACSI).
            </p>
            <p>
              Her practice encompasses evidence-based clinical dermatology,
              aesthetic procedures, dermatosurgery, paediatric skin care,
              energy-based laser treatments and non-surgical hair restoration.
            </p>
          </div>
        </div>
      </Section>

      {/* Philosophy */}
      <Section background="ivory" ariaLabel="Clinic philosophy">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal mb-6">
            Our Approach
          </h2>

          <div className="space-y-6">
            {[
              {
                icon: ShieldCheck,
                title: "Evidence-Based Care",
                desc: "Every treatment recommendation is grounded in current dermatological research and clinical evidence, ensuring you receive care that is both safe and effective.",
              },
              {
                icon: UserCheck,
                title: "Personalised Treatment Plans",
                desc: "No two patients are the same. Each treatment plan is carefully tailored to your skin type, concerns, medical history and personal goals.",
              },
              {
                icon: Sparkles,
                title: "Natural-Looking Results",
                desc: "Our focus is on healthy skin and natural-looking outcomes, whether addressing acne, pigmentation, hair loss or ageing concerns.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 shrink-0">
                  <item.icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Clinic images */}
      <Section
        background="sage"
        ariaLabel="Clinic images"
        hasPlaceholderData
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal mb-6">
            Our Clinic
          </h2>
          {/* TODO: replace with actual clinic photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImagePlaceholder
              caption="Reception area"
              aspectRatio="landscape"
            />
            <ImagePlaceholder
              caption="Consultation room"
              aspectRatio="landscape"
            />
          </div>
        </div>
      </Section>

      {/* Visit block */}
      <Section background="deep-emerald" ariaLabel="Visit the clinic">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gold-light mb-4">
            Visit the Clinic
          </h2>

          <div className="flex items-start justify-center gap-2 text-white/80 mb-2">
            <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
            <p>{clinic.address.full}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6">
            <Car className="h-4 w-4 text-gold shrink-0" />
            <p>{clinic.address.parking}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/book" variant="primary" size="md">
              Book Consultation
            </Button>
            <Button href="/contact" variant="secondary" size="md" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>

    </>
  );
}
