import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/clinic";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${SITE_URL}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/book`, lastModified: new Date(), priority: 0.9 },
  ];

  const servicePages = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
