import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Book Appointment | ${clinic.fullName}`,
  description: `Book a dermatology appointment at ${clinic.fullName} in Adyar, Chennai.`,
};

export default function AppointmentPage() {
  return (
    <Section
      background="cream"
      className="pt-8 pb-10 md:pt-16 md:pb-12"
      ariaLabel="Book appointment"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="display-lg text-brown mb-4">
          Book an Appointment
        </h1>

        <p className="text-brown max-w-md mb-8">
          Please fill in your details. We'll confirm your appointment during
          clinic hours: Mon to Sat, 10 AM to 7 PM.
        </p>

        <AppointmentForm />

        {/* WhatsApp alternative */}
        <div className="mt-8 pt-8 border-t border-sand/20">
          <p className="text-sm text-sand-strong">
            Alternative: Contact us directly on WhatsApp
          </p>
          <a
            href={clinic.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex gap-2 text-brown hover:text-sand-strong transition-colors duration-200"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
          <p className="mt-2 text-xs text-sand-strong">
            This opens WhatsApp with a pre-filled message. No data is stored.
          </p>
        </div>
      </div>
    </Section>
  );
}