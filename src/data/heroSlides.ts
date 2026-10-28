import { clinic } from "@/data/clinic";

export interface HeroSlide {
  id: string;
  headlineItalic: string;
  headlineUpright: string;
  caption: string;
  image: {
    src: string | null;
    alt: string;
    objectPosition?: string;
    layout?: "full" | "split";
  };
  ctaHref: string;
}

// TODO: confirm slide copy, image licence, and patient consent with the clinic.
export const heroSlides: HeroSlide[] = [
  {
    id: "skin",
    headlineItalic: "Skin",
    headlineUpright: "Acne & Pigmentation",
    caption: "Precision care for acne, pigmentation and uneven tone.",
    image: {
      src: "/images/hero/skin.webp",
      alt: "Close-up portrait of a woman with clear, glowing skin in warm light",
      objectPosition: "50% 25%",
      layout: "split",
    },
    ctaHref: clinic.whatsapp.href,
  },
  {
    id: "hair",
    headlineItalic: "Hair",
    headlineUpright: "Loss",
    caption: "Assessment and personalised care for thinning hair.",
    image: {
      src: "/images/hero/microneedling-hairline.webp",
      alt: "Microneedling treatment for the hairline at Dermverse",
      objectPosition: "55% 50%",
    },
    ctaHref: clinic.whatsapp.href,
  },
  {
    id: "laser",
    headlineItalic: "Laser",
    headlineUpright: "Care",
    caption: "Energy-based laser treatments as part of your care.",
    image: {
      src: "/images/hero/carbon-laser-facial.webp",
      alt: "Carbon laser facial treatment at Dermverse",
      objectPosition: "43% 46%",
    },
    ctaHref: clinic.whatsapp.href,
  },
  {
    id: "confidence",
    headlineItalic: "Confidence",
    headlineUpright: "Natural Look",
    caption: "Healthy, natural-looking skin, tailored to you.",
    image: {
      src: "/images/hero/clinical-jawline.webp",
      alt: "Clinical jawline treatment at Dermverse",
      objectPosition: "47% 50%",
    },
    ctaHref: clinic.whatsapp.href,
  },
];
