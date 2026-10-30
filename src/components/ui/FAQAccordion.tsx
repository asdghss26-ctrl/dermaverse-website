"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
  const reduceMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("border-t border-sand/80", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${id}-button-${index}`;
        const panelId = `${id}-panel-${index}`;

        return (
          <div key={index} className="border-b border-sand/80">
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className={cn(
                "flex min-h-[52px] w-full items-center justify-between gap-2 py-3 text-left md:gap-6 md:py-6",
                "font-heading text-sm leading-6 text-brown md:text-xl md:leading-7",
                "transition-colors duration-200 md:hover:text-sand-strong",
                "cursor-pointer"
              )}
            >
              <span>{item.question}</span>
              <Plus
                className={cn(
                  "h-4 w-4 shrink-0 text-sand-strong transition-transform duration-300 motion-reduce:transition-none md:h-5 md:w-5",
                  isOpen && "rotate-45"
                )}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="max-w-xl pb-6 text-sm leading-relaxed text-brown">
                {item.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
