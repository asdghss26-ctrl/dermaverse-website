import { clinic } from "@/data/clinic";

/**
 * JSON-LD structured data for Physician and LocalBusiness.
 * Uses only real, verified data from the brief.
 */

// TODO: replace @id URLs with actual domain when deployed
const BASE_URL = "https://dermverse.in";

export function PhysicianJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${BASE_URL}/#physician`,
    name: clinic.doctor.name,
    jobTitle: clinic.doctor.title,
    description: clinic.doctor.approach,
    medicalSpecialty: "Dermatology",
    memberOf: [
      {
        "@type": "MedicalOrganization",
        name: "Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)",
      },
      {
        "@type": "MedicalOrganization",
        name: "Association of Cutaneous Surgeons of India (ACSI)",
      },
    ],
    worksFor: {
      "@type": "MedicalBusiness",
      name: clinic.fullName,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.pincode,
      addressCountry: "IN",
    },
    telephone: clinic.phone.href.replace("tel:", ""),
    url: BASE_URL,
    // TODO: add image URL when portrait is available
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${BASE_URL}/#clinic`,
    name: clinic.fullName,
    description: clinic.doctor.approach,
    telephone: clinic.phone.href.replace("tel:", ""),
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.pincode,
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.google.rating,
      reviewCount: clinic.google.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
