import type { MetadataRoute } from "next";

// TODO: replace with actual domain when deployed
const BASE_URL = "https://dermverse.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
