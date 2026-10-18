/** clinic.ts — All clinic-wide content. Replace values when client confirms. */

export const clinic = {
  name: "Dr. Jansi's Dermverse",
  tagline: "Skin, Hair & Laser Clinic",
  fullName: "Dr. Jansi's Dermverse - Skin, Hair & Laser Clinic",
  wordmark: "Dr. Jansi's Dermverse", // TODO: replace with logo.png when client supplies
  logoUrl: "/logo.png", // TODO: client to supply gold JD monogram

  doctor: {
    name: "Dr. Jansi Priyadharshini A",
    shortName: "Dr. Jansi",
    qualifications: ["MBBS", "MD - DVL", "PDF in Aesthetic Dermatology"],
    title: "Consultant Dermatologist",
    experience: "10+ years",
    memberships: ["IADVL", "ACSI"],
    bio: "Dr. Jansi Priyadharshini A is a Consultant Dermatologist with over 10 years of clinical experience specialising in evidence-based clinical dermatology, aesthetic procedures, dermatosurgery, paediatric skin care, energy-based laser treatments and non-surgical hair restoration.",
    approach:
      "Precision dermatology and personalised care for acne, pigmentation, hair loss and ageing concerns, aiming for healthy, natural-looking results.",
    portraitUrl: null as string | null, // TODO: client to supply portrait photo
    placeholder: true as const,
  },

  address: {
    line1: "11/10, Jayaram Ave",
    line2: "Shastri Nagar, Adyar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600090",
    full: "11/10, Jayaram Ave, Shastri Nagar, Adyar, Chennai, Tamil Nadu 600090",
    parking: "Ample car parking available",
    mapUrl: null as string | null, // TODO: embed Google Maps URL
  },

  phone: {
    display: "073580 72111",
    href: "tel:+917358072111",
  },

  whatsapp: {
    display: "073580 72111",
    href: "https://wa.me/917358072111", // TODO: confirm WhatsApp number with client
  },

  // TODO: confirm opening hours with client
  hours: null as string | null,

  google: {
    rating: 5.0,
    reviewCount: 13,
    url: null as string | null, // TODO: add Google Business Profile link
  },

  positioning: [
    "Evidence-based clinical dermatology",
    "Aesthetic procedures",
    "Dermatosurgery",
    "Paediatric skin care",
    "Energy-based laser treatments",
    "Non-surgical hair restoration",
  ],
} as const;
