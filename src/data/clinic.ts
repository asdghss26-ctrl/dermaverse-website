/** clinic.ts: All clinic-wide content. Replace values when client confirms. */

// TODO: confirm production domain with client
export const SITE_URL = "https://dermverse.in";

export const clinic = {
  name: "Dr. Jansi’s DERMVERSE",
  tagline: "SKIN HAIR & LASER CLINIC",
  fullName: "Dr. Jansi’s DERMVERSE – Skin, Hair & Laser Clinic",
  wordmark: "Dr. Jansi’s DERMVERSE",

  doctor: {
    name: "Dr. Jansi Priyadharshini A",
    shortName: "Dr. Jansi",
    qualifications: ["MBBS", "MD DVL (Dermatology, Venereology and Leprosy)"],
    title: "Founder & Chief Dermatologist",
    designation: "Founder & Chief Dermatologist",
    experience: null as string | null,
    fellowship: "Postdoctoral Fellowship in Aesthetic Dermatology",
    memberships: null as readonly string[] | null,
    bio: "Dr. Jansi Priyadharshini A is a Consultant Dermatologist with a strong foundation in clinical dermatology and advanced aesthetic dermatology. As the Founder and Chief Dermatologist of Dr. Jansi’s Dermverse – Skin, Hair & Laser Clinic, Adyar, Chennai, she is committed to delivering evidence-based, ethical and personalised dermatological care, combining medical expertise with an aesthetic approach to skin and hair health.",
    shortBio:
      "Dr. Jansi Priyadharshini A is a Consultant Dermatologist and the Founder of Dr. Jansi’s Dermverse – Skin, Hair & Laser Clinic, Adyar, Chennai. With an MBBS from SRM Medical College, an MD (DVL) from Saveetha Medical College and a Postdoctoral Fellowship in Aesthetic Dermatology from RSV Skin and Laser Institute under the mentorship of Dr. Maya Vedamurthy, she brings together clinical expertise and advanced aesthetic dermatology.",
    approach:
      "Personalised care, evidence-based treatments and a commitment to helping every individual feel confident in their own skin.",
    portraitUrl: "/images/DR jansi's image .jpeg",
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
    display: "7358072111",
    href: "tel:+917358072111",
  },

  whatsapp: {
    display: "7358072111",
    href: "https://wa.me/917358072111",
  },

  email: "dermverseclinic@gmail.com",

  hours: "Mon to Sat, 10:00 AM – 8:00 PM | Sunday: Closed",
  openingHours: "10:00 AM – 8:00 PM",
  weeklyHoliday: "Sunday",
  timeSlots: [
    { id: "slot1", label: "Slot 1", time: "10:00 AM – 1:00 PM" },
    { id: "slot2", label: "Slot 2", time: "2:00 PM – 5:00 PM" },
    { id: "slot3", label: "Slot 3", time: "5:00 PM – 8:00 PM" },
  ],

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
