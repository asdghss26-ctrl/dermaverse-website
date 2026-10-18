"use client";

import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Send } from "lucide-react";
import { useState } from "react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, "_blank");

    // TODO: add backend form submission
  };

  const inputClasses = cn(
    "w-full rounded-xl border border-emerald-brand/20 bg-white px-4 py-3",
    "text-charcoal text-base placeholder:text-charcoal/40",
    "focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none",
    "transition-colors duration-200 min-h-[48px]"
  );

  const labelClasses = "block text-sm font-medium text-charcoal mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-5", className)}
      noValidate
    >
      {/* Name */}
      <div>
        <label htmlFor="booking-name" className={labelClasses}>
          Your name <span className="text-gold">*</span>
        </label>
        <input
          id="booking-name"
          name="name"
          type="text"
          required
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="booking-phone" className={labelClasses}>
          Phone number <span className="text-gold">*</span>
        </label>
        <input
          id="booking-phone"
          name="phone"
          type="tel"
          required
          placeholder="Your phone number"
          value={formData.phone}
          onChange={handleChange}
          className={inputClasses}
        />
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
          className={cn(inputClasses, "appearance-none cursor-pointer")}
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
            className={inputClasses}
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
            className={inputClasses}
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
          className={cn(inputClasses, "min-h-[80px] resize-y")}
        />
      </div>

      {/* Submit */}
      <Button type="submit" variant="primary" size="lg" className="w-full">
        <Send className="h-5 w-5" />
        Book on WhatsApp
      </Button>

      <p className="text-xs text-charcoal/50 text-center">
        This opens WhatsApp with a pre-filled message. No data is stored.
      </p>
    </form>
  );
}
