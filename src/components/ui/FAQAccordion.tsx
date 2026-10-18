"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState, useId } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("divide-y divide-emerald-brand/10", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${id}-button-${index}`;
        const panelId = `${id}-panel-${index}`;

        return (
          <div key={index}>
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className={cn(
                "w-full flex items-center justify-between gap-4 py-5 text-left",
                "text-charcoal font-medium text-base",
                "hover:text-emerald-brand transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
                "cursor-pointer"
              )}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-gold transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "overflow-hidden transition-[max-height] duration-200 ease-in-out",
                isOpen ? "max-h-96" : "max-h-0"
              )}
            >
              <p className="pb-5 text-sm text-charcoal/70 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
