/** faqs.ts: Frequently asked questions. Generic, non-promissory wording. */

export interface FAQ {
  question: string;
  answer: string;
  placeholder: true;
}

export const faqs: FAQ[] = [
  {
    question: "Do I need a referral to see a dermatologist?",
    answer:
      "No referral is required. You can book a consultation directly by calling the clinic or messaging us on WhatsApp.",
    placeholder: true,
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring any previous medical reports, a list of current medications, and details of past treatments for your skin or hair concern.",
    placeholder: true,
  },
  {
    question: "How long does a consultation usually take?",
    answer:
      "A typical first consultation takes 20 to 30 minutes, allowing time for a thorough assessment and discussion of your treatment plan.",
    placeholder: true,
  },
  {
    question: "Is parking available at the clinic?",
    answer:
      "Yes, parking is available at the clinic premises for your convenience.",
    placeholder: true,
  },
  {
    question: "Are treatments suitable for all skin types?",
    answer:
      "Treatments are customised based on your skin type, concern and medical history. Dr. Jansi will assess and recommend what is appropriate for you.",
    placeholder: true,
  },
  {
    question: "Can I book an appointment online?",
    answer:
      "You can book an appointment by calling us or sending a WhatsApp message. Our team will confirm your appointment and preferred time slot.",
    placeholder: true,
  },
];
