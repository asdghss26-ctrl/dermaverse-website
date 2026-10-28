import { clinic, SITE_URL } from "@/data/clinic";

/**
 * JSON-LD structured data for Physician and LocalBusiness.
 * Uses only real, verified data from the brief.
 */

export function PhysicianJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: clinic.doctor.name,
    jobTitle: clinic.doctor.title,
    description: clinic.doctor.approach,
    medicalSpecialty: "Dermatology",
    ...(clinic.doctor.memberships && clinic.doctor.memberships.length > 0
      ? {
          memberOf: clinic.doctor.memberships.map((name) => ({
            "@type": "MedicalOrganization",
            name,
          })),
        }
      : {}),
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
    url: SITE_URL,
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
    "@id": `${SITE_URL}/#clinic`,
    name: clinic.fullName,
    description: clinic.doctor.approach,
    telephone: clinic.phone.href.replace("tel:", ""),
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.pincode,
      addressCountry: "IN",
    },
    ...(clinic.google.url
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: clinic.google.rating,
            reviewCount: clinic.google.reviewCount,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
