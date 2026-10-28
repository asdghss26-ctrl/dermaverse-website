"use client";

import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Send } from "lucide-react";
import { useRef, useState } from "react";
import type { Service } from "@/data/services";

interface BookingFormProps {
  services: Pick<Service, "slug" | "title">[];
  whatsappNumber: string;
  clinicName: string;
  className?: string;
}

export function BookingForm({
  services,
  whatsappNumber,
  clinicName,
  className,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});
  const [submitState, setSubmitState] = useState<{
    kind: "success" | "fallback";
    url: string;
  } | null>(null);
  const [liveMessage, setLiveMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (name === "name" || name === "phone") {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }

    setSubmitState(null);
    setLiveMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: { name?: string; phone?: string } = {};
    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitState(null);
      setLiveMessage("Please fix the highlighted fields.");
      requestAnimationFrame(() => {
        if (nextErrors.name) {
          nameRef.current?.focus();
        } else if (nextErrors.phone) {
          phoneRef.current?.focus();
        }
      });
      return;
    }

    setErrors({});

    // Build WhatsApp pre-filled message
    const lines = [
      `Hi ${clinicName},`,
      ``,
      `I'd like to book a consultation.`,
      ``,
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      formData.service ? `Service: ${formData.service}` : "",
      formData.date ? `Preferred date: ${formData.date}` : "",
      formData.time ? `Preferred time: ${formData.time}` : "",
      formData.message ? `Message: ${formData.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(lines);
    const cleanNumber = whatsappNumber.replace(/\D/g, "");
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    const newWindow = window.open(url, "_blank");

    if (newWindow) {
      newWindow.opener = null;
      setSubmitState({ kind: "success", url });
      setLiveMessage("WhatsApp opened in a new tab.");
    } else {
      setSubmitState({ kind: "fallback", url });
      setLiveMessage(
        "Your browser blocked the new tab. Use the link below to open WhatsApp."
      );
    }

    // TODO: add backend form submission
  };

  const inputClasses = cn(
    "w-full rounded-none border-0 border-b bg-transparent px-0 py-3",
    "text-brown text-base placeholder:text-sand-strong",
    "focus:border-sand-strong focus:ring-0",
    "transition-colors duration-200 min-h-[48px]"
  );

  const labelClasses =
    "block text-[10px] font-medium uppercase tracking-[0.14em] text-sand-strong mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-5", className)}
      noValidate
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>

      {/* Name */}
      <div>
        <label htmlFor="booking-name" className={labelClasses}>
          Your name <span className="text-sand-strong">*</span>
        </label>
        <input
          ref={nameRef}
          id="booking-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "booking-name-error" : undefined}
          className={cn(
            inputClasses,
            errors.name ? "border-brown" : "border-sand"
          )}
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
        <label htmlFor="booking-phone" className={labelClasses}>
          Phone number <span className="text-sand-strong">*</span>
        </label>
        <input
          ref={phoneRef}
          id="booking-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={handleChange}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "booking-phone-error" : undefined}
          className={cn(
            inputClasses,
            errors.phone ? "border-brown" : "border-sand"
          )}
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

      {/* Service */}
      <div>
        <label htmlFor="booking-service" className={labelClasses}>
          Service
        </label>
        <select
          id="booking-service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={cn(
            inputClasses,
            "border-sand appearance-none cursor-pointer"
          )}
        >
          <option value="">Select a service (optional)</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Date & Time row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-date" className={labelClasses}>
            Preferred date
          </label>
          <input
            id="booking-date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className={cn(inputClasses, "border-sand")}
          />
        </div>
        <div>
          <label htmlFor="booking-time" className={labelClasses}>
            Preferred time
          </label>
          <input
            id="booking-time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            className={cn(inputClasses, "border-sand")}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="booking-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="booking-message"
          name="message"
          rows={3}
          placeholder="Tell us about your concern (optional)"
          value={formData.message}
          onChange={handleChange}
          className={cn(inputClasses, "border-sand min-h-[80px] resize-y")}
        />
      </div>

      {/* Submit */}
      <Button type="submit" variant="primary" size="lg" className="w-full">
        <Send className="h-5 w-5" />
        Book Consultation
      </Button>

      {submitState && (
        <div className="border border-sand bg-taupe-soft p-4 text-sm text-brown">
          <p className="font-medium">
            {submitState.kind === "success"
              ? "WhatsApp is opening in a new tab."
              : "Your browser blocked the WhatsApp tab."}
          </p>
          <p className="mt-1 text-sand-strong">
            {submitState.kind === "success"
              ? "If it did not open, use the link below."
              : "Use the link below to continue."}
          </p>
          <a
            href={submitState.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex font-medium text-sand-strong underline decoration-sand underline-offset-4"
          >
            Tap here to open WhatsApp
          </a>
        </div>
      )}

      <p className="text-xs text-sand-strong text-center">
        This opens WhatsApp with a pre-filled message. No data is stored.
      </p>
    </form>
  );
}
