"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { createAppointment } from "@/lib/appointments";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2 } from "lucide-react";
import { services, serviceCategories } from "@/data/services";

interface AppointmentFormProps {
  className?: string;
}

const TIME_SLOTS = [
  {
    id: "Morning" as const,
    slotNumber: "Slot 1",
    time: "10:00 AM – 1:00 PM",
    label: "Slot 1: 10:00 AM – 1:00 PM",
  },
  {
    id: "Evening" as const,
    slotNumber: "Slot 2",
    time: "2:00 PM – 5:00 PM",
    label: "Slot 2: 2:00 PM – 5:00 PM",
  },
  {
    id: "Night" as const,
    slotNumber: "Slot 3",
    time: "5:00 PM – 8:00 PM",
    label: "Slot 3: 5:00 PM – 8:00 PM",
  },
];

export function AppointmentForm({ className }: AppointmentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    concern: "",
    timeSlot: "" as "Morning" | "Evening" | "Night" | "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    concern?: string;
    timeSlot?: string;
  }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSlotSelect = (slotId: "Morning" | "Evening" | "Night") => {
    setFormData((prev) => ({ ...prev, timeSlot: slotId }));
    if (errors.timeSlot) {
      setErrors((prev) => ({ ...prev, timeSlot: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: {
      name?: string;
      phone?: string;
      concern?: string;
      timeSlot?: string;
    } = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (phoneDigits.length !== 10) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!formData.concern) {
      nextErrors.concern = "Please select a concern or service.";
    }

    if (!formData.timeSlot) {
      nextErrors.timeSlot = "Please select a preferred time slot.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => {
        if (nextErrors.name) {
          nameRef.current?.focus();
        } else if (nextErrors.phone) {
          phoneRef.current?.focus();
        } else {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await createAppointment({
        patientName: formData.name.trim(),
        phone: formData.phone.trim(),
        concern: formData.concern,
        timeSlot: formData.timeSlot as "Morning" | "Evening" | "Night",
        message: formData.message.trim() || undefined,
        status: "Pending",
      });

      setShowSuccess(true);
      setFormData({
        name: "",
        phone: "",
        concern: "",
        timeSlot: "",
        message: "",
      });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      console.error("Could not save appointment:", err);
      setErrors({
        phone:
          "Could not submit appointment. Please check your connection or contact the clinic directly.",
      });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = cn(
    "w-full rounded-none border-0 border-b bg-transparent px-0 py-3",
    "text-brown text-base placeholder:text-sand-strong",
    "focus:border-sand-strong focus:ring-0",
    "transition-colors duration-200 min-h-[48px]"
  );

  const labelClasses =
    "block text-[10px] font-medium uppercase tracking-[0.14em] text-sand-strong mb-2";

  if (showSuccess) {
    return (
      <div className="border border-sand bg-cream p-8 md:p-10 text-center animate-in fade-in duration-300">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-olive/10 text-olive">
          <CheckCircle2 className="h-9 w-9 text-olive" />
        </div>
        <p className="eyebrow mb-2 text-sand-strong">Confirmation</p>
        <h3 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-brown">
          Appointment Request Sent!
        </h3>
        <p className="mt-4 text-base text-brown/90 leading-relaxed max-w-md mx-auto">
          Thank you. Your consultation request has been received by Dr. Jansi’s DERMVERSE team. We will reach out to you via WhatsApp or phone call to confirm your appointment time.
        </p>
        <div className="mt-8 pt-6 border-t border-sand/40 flex justify-center">
          <button
            type="button"
            onClick={() => setShowSuccess(false)}
            className="inline-flex min-h-[48px] items-center justify-center rounded-none bg-brown px-8 text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-olive cursor-pointer"
          >
            Book Another Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      noValidate
    >
      {/* Name */}
      <div>
        <label htmlFor="appointment-name" className={labelClasses}>
          Your name <span className="text-sand-strong">*</span>
        </label>
        <input
          ref={nameRef}
          id="appointment-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "appointment-name-error" : undefined}
          className={cn(
            inputClasses,
            errors.name ? "border-brown" : "border-sand"
          )}
        />
        {errors.name && (
          <p
            id="appointment-name-error"
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
          ref={phoneRef}
          id="appointment-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          maxLength={10}
          placeholder="10-digit mobile number"
          value={formData.phone}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, phone: digits }));
            if (errors.phone) {
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }
          }}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "appointment-phone-error" : undefined}
          className={cn(
            inputClasses,
            errors.phone ? "border-brown" : "border-sand"
          )}
        />
        {errors.phone && (
          <p
            id="appointment-phone-error"
            className="mt-2 text-xs font-medium text-brown"
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.phone}
          </p>
        )}
      </div>

      {/* Concern / Service */}
      <div>
        <label htmlFor="appointment-concern" className={labelClasses}>
          Service / Concern <span className="text-sand-strong">*</span>
        </label>
        <select
          id="appointment-concern"
          name="concern"
          required
          value={formData.concern}
          onChange={handleChange}
          aria-invalid={Boolean(errors.concern)}
          aria-describedby={errors.concern ? "appointment-concern-error" : undefined}
          className={cn(
            inputClasses,
            "border-sand appearance-none cursor-pointer",
            errors.concern && "border-brown"
          )}
        >
          <option value="">Select a service or concern</option>
          {serviceCategories.map((category) => (
            <optgroup key={category.id} label={category.label}>
              {services
                .filter((s) => s.category === category.id)
                .map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
            </optgroup>
          ))}
          <option value="General Consultation">General Consultation</option>
        </select>
        {errors.concern && (
          <p
            id="appointment-concern-error"
            className="mt-2 text-xs font-medium text-brown"
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.concern}
          </p>
        )}
      </div>

      {/* Preferred Time Slot */}
      <div>
        <label className={labelClasses}>
          Preferred time slot <span className="text-sand-strong">*</span>
        </label>

        <div
          role="radiogroup"
          aria-label="Preferred time slot"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {TIME_SLOTS.map((slot) => {
            const isSelected = formData.timeSlot === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSlotSelect(slot.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-3.5 border transition-all duration-200 text-center cursor-pointer",
                  isSelected
                    ? "border-brown bg-brown text-cream shadow-sm"
                    : "border-sand bg-cream hover:border-sand-strong text-brown"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider",
                    isSelected ? "text-cream" : "text-brown"
                  )}
                >
                  {slot.slotNumber}
                </span>
                <span
                  className={cn(
                    "text-xs mt-1",
                    isSelected ? "text-cream/90" : "text-sand-strong"
                  )}
                >
                  {slot.time}
                </span>
              </button>
            );
          })}
        </div>

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

      {/* Message (Optional) */}
      <div>
        <label htmlFor="appointment-message" className={labelClasses}>
          Message (optional)
        </label>
        <textarea
          id="appointment-message"
          name="message"
          rows={3}
          placeholder="Tell us about your concern or preferred appointment date (optional)"
          value={formData.message}
          onChange={handleChange}
          className={cn(inputClasses, "border-sand min-h-[80px] resize-y")}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className={cn(
          "w-full min-h-[52px]",
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting Request…
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Send className="h-4 w-4" />
            Book Consultation
          </span>
        )}
      </Button>
    </form>
  );
}
