import type { Metadata } from "next";
import Image from "next/image";
import { clinic } from "@/data/clinic";
import { Section } from "@/components/ui/Section";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { Button } from "@/components/ui/Button";
import { MapPin, Car, ShieldCheck, UserCheck, Leaf, ArrowUpRight } from "lucide-react";

const experiencePhrase = clinic.doctor.experience
  ? ` with ${clinic.doctor.experience} of experience`
  : "";

const aboutDescription = `Learn about ${clinic.doctor.name}, Consultant Dermatologist${experiencePhrase} offering clinical dermatology, aesthetic procedures and laser treatments in Adyar, Chennai.`;

export const metadata: Metadata = {
  title: "About Dr. Jansi Priyadharshini A",
  description: aboutDescription,
  openGraph: {
    title: `About Dr. Jansi Priyadharshini A | ${clinic.fullName}`,
    description: aboutDescription,
    url: "/about",
    siteName: clinic.fullName,
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Doctor profile */}
      <Section
        background="cream"
        className="pt-8 pb-10 md:pt-16 md:pb-14"
        ariaLabel="About the doctor"
        hasPlaceholderData={clinic.doctor.placeholder}
      >
        <div className="text-center mb-10">
          <p className="eyebrow mb-4 text-sand-strong">The dermatologist</p>
          <h1 className="display-lg text-brown mb-3">
            About Your Dermatologist
          </h1>
        </div>

        <DoctorCard
          name={clinic.doctor.name}
          title="Founder & Chief Dermatologist"
          qualifications={clinic.doctor.qualifications}
          fellowship={clinic.doctor.fellowship}
          memberships={clinic.doctor.memberships}
          experience={clinic.doctor.experience}
          portraitUrl={clinic.doctor.portraitUrl}
        />
      </Section>

      {/* Bio */}
      <Section background="taupe" ariaLabel="Doctor biography" hasPlaceholderData>
        <div className="max-w-3xl mx-auto">
          <h2 className="display-md text-brown mb-4">
            Background
          </h2>
          <div className="space-y-4 text-brown leading-relaxed">
            <div className="text-base leading-relaxed text-brown whitespace-pre-line">
              <p>Dr. Jansi Priyadharshini A is a Consultant Dermatologist with a strong foundation in clinical dermatology and advanced aesthetic dermatology. As the Founder and Chief Dermatologist of Dr. Jansi’s Dermverse – Skin, Hair & Laser Clinic, Adyar, Chennai, she is committed to delivering evidence-based, ethical and personalised dermatological care, combining medical expertise with an aesthetic approach to skin and hair health.</p>
              <p className="mt-4">She completed her MBBS at SRM Medical College and Hospital, Chennai, followed by an MD in Dermatology, Venereology and Leprosy (DVL) at Saveetha Medical College and Hospital, Chennai. To further her expertise in aesthetic medicine, she pursued a Postdoctoral Fellowship in Aesthetic Dermatology at RSV Skin and Laser Institute, Chennai, under the mentorship of Dr. Maya Vedamurthy, a pioneer in the field of aesthetic dermatology.</p>
              <p className="mt-4">Her areas of interest include clinical dermatology, paediatric dermatology, dermatosurgery, non-surgical hair restoration and energy-based devices in dermatology and aesthetics. She has experience managing a wide spectrum of skin and hair conditions and performing aesthetic procedures, with an emphasis on individualised treatment plans, patient safety and natural-looking results.</p>
              <p className="mt-4">Dr. Jansi has a particular passion for paediatric dermatology and caring for children with a wide range of skin conditions. She believes children deserve special attention, compassionate care and age-appropriate treatment tailored to their individual needs. Her approach focuses on helping parents understand their child’s skin concerns while providing thoughtful, evidence-based care in a reassuring and child-friendly environment.</p>
              <p className="mt-4">Beyond clinical practice, Dr. Jansi is actively involved in academic dermatology, scientific presentations, professional education and community outreach. She has presented research at national and international dermatology conferences and has publications in peer-reviewed medical journals. Her research presentation on Harlequin Syndrome received the Best Paper Award at the 46th National Conference of IADVL (DERMACON).</p>
              <p className="mt-4">She has also contributed to the dermatology community through professional leadership and association activities, including roles within the Tamil Nadu branch of the Indian Association of Dermatologists, Venereologists and Leprologists (IADVL), participation in national committee initiatives and academic conferences, and involvement in workshops, panel discussions and community dermatology programmes.</p>
              <p className="mt-4">At Dr. Jansi’s Dermverse, her vision is to create a trusted destination for comprehensive skin, hair and laser care, where scientific precision meets compassionate care. She believes every patient deserves to be heard, every treatment should be tailored to individual needs, and every aesthetic journey should prioritise healthy skin, confidence and well-being.</p>
              <p className="mt-4">Her philosophy is simple: personalised care, evidence-based treatments and a commitment to helping every individual feel confident in their own skin.</p>
            </div>
            {clinic.doctor.experience && (
              <p>She has {clinic.doctor.experience} of clinical experience.</p>
            )}
            <p>
              Her qualifications include{" "}
              {clinic.doctor.qualifications.join(", ")}
              {clinic.doctor.fellowship
                ? ` and ${clinic.doctor.fellowship}`
                : ""}
              .
            </p>
            {clinic.doctor.memberships &&
              clinic.doctor.memberships.length > 0 && (
                <p>
                  She is a member of{" "}
                  {clinic.doctor.memberships.join(" and ")}.
                </p>
              )}
          </div>
        </div>
      </Section>

      {/* Philosophy */}
      <Section background="cream" ariaLabel="Clinic philosophy">
        <div className="max-w-3xl mx-auto">
          <h2 className="display-md text-brown mb-6">
            Our Approach
          </h2>

          <div className="space-y-6">
            {[
              {
                icon: ShieldCheck,
                title: "Clinical Care",
                desc: "Every recommendation is based on your skin, medical history and current clinical guidance, so the care you receive is considered and appropriate.",
              },
              {
                icon: UserCheck,
                title: "Personalised Treatment Plans",
                desc: "No two patients are the same. Each treatment plan is carefully tailored to your skin type, concerns, medical history and personal goals.",
              },
              {
                icon: Leaf,
                title: "Natural-Looking Care",
                desc: "Our focus is on healthy skin and natural-looking outcomes, whether addressing acne, pigmentation, hair loss or ageing concerns.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-taupe/60 shrink-0">
                  <item.icon className="h-5 w-5 text-sand-strong" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brown leading-relaxed">
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
        background="taupe"
        ariaLabel="Clinic images"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="eyebrow mb-2 text-sand-strong">The clinic space</p>
              <h2 className="display-md text-brown">
                Designed for Calm &amp; Care
              </h2>
            </div>
            <Button href="/gallery" variant="ghost" size="sm">
              View all spaces
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group overflow-hidden rounded-md border border-sand bg-cream">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                <Image
                  src="/images/clinic-reception.jpg"
                  alt="Clinic reception area"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold text-sm text-brown">Welcoming Reception &amp; Lounge</p>
                <p className="text-xs text-sand-strong mt-0.5">Gentle, private check-in with ample natural light</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-md border border-sand bg-cream">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                <Image
                  src="/images/clinic-consultation.jpg"
                  alt="Private consultation room"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold text-sm text-brown">Private Consultation Suite</p>
                <p className="text-xs text-sand-strong mt-0.5">Dedicated space for unhurried clinical discussion</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Visit block */}
      <Section background="olive" ariaLabel="Visit the clinic">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="display-md text-taupe mb-4">
            Visit the Clinic
          </h2>

          <div className="flex items-start justify-center gap-2 text-taupe/80 mb-2">
            <MapPin className="h-5 w-5 text-sand mt-0.5 shrink-0" />
            <p>{clinic.address.full}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-taupe/70 text-sm mb-6">
            <Car className="h-4 w-4 text-sand shrink-0" />
            <p>{clinic.address.parking}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/appointment" variant="primary-on-dark" size="md">
              Book Consultation
            </Button>
            <Button href="/contact" variant="secondary-on-dark" size="md">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>

    </>
  );
}
