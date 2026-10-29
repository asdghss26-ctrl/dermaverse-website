/** clinic.ts: All clinic-wide content. Replace values when client confirms. */

// TODO: confirm production domain with client
export const SITE_URL = "https://dermverse.in";

export const clinic = {
  name: "Dr. Jansi's Dermverse",
  tagline: "Skin, Hair & Laser Clinic",
  fullName: "Dr. Jansi's Dermverse - Skin, Hair & Laser Clinic",
  wordmark: "Dr. Jansi's Dermverse",

  doctor: {
    name: "Dr. Jansi Priyadharshini A",
    shortName: "Dr. Jansi",
    qualifications: ["MBBS", "MD - DVL"],
    title: "Consultant Dermatologist",
    // TODO: confirm with doctor. Unconfirmed claim: "10+ years".
    experience: null as string | null,
    // TODO: confirm with doctor. Unconfirmed claim: "PDF in Aesthetic Dermatology".
    fellowship: null as string | null,
    // TODO: confirm with doctor. Unconfirmed claim: "IADVL", "ACSI".
    memberships: null as readonly string[] | null,
    bio: "Dr. Jansi Priyadharshini A is a Consultant Dermatologist practising clinical dermatology, aesthetic procedures, dermatosurgery, paediatric skin care, energy-based laser treatments and non-surgical hair loss care.",
    approach:
      "Precision dermatology and personalised care for acne, pigmentation, hair loss and ageing concerns, aiming for healthy, natural-looking skin.",
    portraitUrl: "/images/dr-jansi-portrait.jpg",
    placeholder: false,
  },

  // TODO: confirm the full address and parking details with the clinic.
  address: {
    line1: "11/10, Jayaram Ave",
    line2: "Shastri Nagar, Adyar",
    area: "Adyar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600090",
    full: "11/10, Jayaram Ave, Shastri Nagar, Adyar, Chennai, Tamil Nadu 600090",
    parking: "Parking available",
  },

  phone: {
    display: "073580 72111",
    href: "tel:+917358072111",
  },

  whatsapp: {
    display: "073580 72111",
    href: "https://wa.me/917358072111", // TODO: confirm WhatsApp number with client
  },

  hours: "Mon to Sat, 10 AM to 7 PM",

  google: {
    rating: 5.0,
    reviewCount: 13,
    url: null as string | null, // TODO: add Google Business Profile link
  },

  positioning: [
    "Clinical dermatology",
    "Aesthetic procedures",
    "Dermatosurgery",
    "Paediatric skin care",
    "Energy-based laser treatments",
    "Non-surgical hair loss care",
  ],
} as const;

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  clinic.address.full
)}`;
