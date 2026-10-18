/** reviews.ts — ONLY real Google reviews. Do NOT invent reviewer names. */

export interface Review {
  text: string;
  source: "Google";
  rating: 5;
  placeholder: false; // These are real reviews
}

export const reviews: Review[] = [
  {
    text: "The staff are polite, and the overall atmosphere is clean and comfortable.",
    source: "Google",
    rating: 5,
    placeholder: false,
  },
  {
    text: "She gave me proper guidance and answered all my doubts patiently.",
    source: "Google",
    rating: 5,
    placeholder: false,
  },
  {
    text: "Very good doctor and treatment",
    source: "Google",
    rating: 5,
    placeholder: false,
  },
];
