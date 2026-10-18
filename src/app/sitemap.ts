import type { MetadataRoute } from "next";
import { services } from "@/data/services";

// TODO: replace with actual domain when deployed
const BASE_URL = "https://dermverse.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/book`, lastModified: new Date(), priority: 0.9 },
  ];

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
