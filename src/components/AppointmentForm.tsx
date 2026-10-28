"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { createAppointment } from "@/lib/appointments";
import { Button } from "@/components/ui/Button";

export function AppointmentForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    concern?: string;
    timeSlot?: string;
  }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const allServiceTitles = [
    "Acne Treatment",
    "Pigmentation & Chemical Peels",
    "Cosmetic & Aesthetic Dermatology",
    "Paediatric Skin Care",
    "Dermatosurgery",
    "Anti-Ageing",
    "Hair Fall & Scalp Care",
    "Non-Surgical Hair Loss Care",
    "Laser Treatments",
    "General Consultation",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: {
      name?: string;
      phone?: string;
      concern?: string;
      timeSlot?: string;
    } = {};

    if (!name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else {
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        nextErrors.phone = "Enter a valid phone number.";
      }
    }

    if (!concern) {
      nextErrors.concern = "Please select a concern type.";
    }

    if (!timeSlot) {
      nextErrors.timeSlot = "Please select a preferred time slot.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createAppointment({
        patientName: name.trim(),
        phone: phone.trim(),
        concern: concern,
        timeSlot: timeSlot as "Morning" | "Evening" | "Night",
        status: "Pending",
      });

      setShowSuccess(true);
      setName("");
      setPhone("");
      setConcern("");
      setTimeSlot("");
    } catch (err) {
      console.error("Could not save appointment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-brown text-base placeholder:text-sand-strong focus:border-sand-strong focus:ring-0 transition-colors duration-200 min-h-[48px]";
  const labelClasses =
    "block text-[10px] font-medium uppercase tracking-[0.14em] text-sand-strong mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="appointment-name" className={labelClasses}>
          Your name <span className="text-sand-strong">*</span>
        </label>
        <input
          id="appointment-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "booking-name-error" : undefined}
          className={cn(inputClasses, errors.name ? "border-brown" : "border-sand")}
        />
        {errors.name && (
          <p
            id="booking-name-error"
            className="mt-2 text-xs font-medium text-brown"
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="appointment-phone" className={labelClasses}>
          Phone number <span className="text-sand-strong">*</span>
        </label>
        <input
          id="appointment-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "booking-phone-error" : undefined}
          className={cn(inputClasses, errors.phone ? "border-brown" : "border-sand")}
        />
        {errors.phone && (
          <p
            id="booking-phone-error"
            className="mt-2 text-xs font-medium text-brown"
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.phone}
          </p>
        )}
      </div>

      {/* Concern type */}
      <div>
        <label htmlFor="appointment-concern" className={labelClasses}>
          Concern type <span className="text-sand-strong">*</span>
        </label>
        <select
          id="appointment-concern"
          name="concern"
          required
          value={concern}
          onChange={(e) => {
            setConcern(e.target.value);
            if (errors.concern) setErrors((prev) => ({ ...prev, concern: undefined }));
          }}
          className="w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-brown text-base placeholder:text-sand-strong focus:border-sand-strong focus:ring-0 transition-colors duration-200 min-h-[48px]"
          aria-invalid={Boolean(errors.concern)}
        >
          <option value="">Select a concern</option>
          {allServiceTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
        {errors.concern && (
          <p
            className="mt-2 text-xs font-medium text-brown"
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.concern}
          </p>
        )}
      </div>

      {/* Preferred time slot */}
      <div>
        <label htmlFor="appointment-time" className={labelClasses}>
          Preferred time slot <span className="text-sand-strong">*</span>
        </label>
        <select
          id="appointment-time"
          name="timeSlot"
          required
          value={timeSlot}
          onChange={(e) => {
            setTimeSlot(e.target.value);
            if (errors.timeSlot) setErrors((prev) => ({ ...prev, timeSlot: undefined }));
          }}
          className="w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-brown text-base placeholder:text-sand-strong focus:border-sand-strong focus:ring-0 transition-colors duration-200 min-h-[48px]"
          aria-invalid={Boolean(errors.timeSlot)}
        >
          <option value="">Select a time slot</option>
          {"Morning Evening Night".split(" ").map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        {errors.timeSlot && (
          <p
            className="mt-2 text-xs font-medium text-brown"
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.timeSlot}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className={cn("w-full mt-2", isSubmitting && "opacity-70 cursor-not-allowed")}
      >
        {isSubmitting ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting Request…
          </>
        ) : (
          "Submit Appointment Request"
        )}
      </Button>

      {showSuccess && (
        <div className="mt-4 p-4 rounded-md border border-emerald-300 bg-emerald-50 text-emerald-900 text-sm">
          <p className="font-semibold mb-1">Appointment Request Sent!</p>
          <p>
            Your request has been received. You&apos;ll be notified on WhatsApp once your appointment is confirmed or rescheduled.
          </p>
        </div>
      )}
    </form>
  );
}