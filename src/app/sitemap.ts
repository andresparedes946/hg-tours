import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Sin dominio definitivo (NEXT_PUBLIC_SITE_URL) el sitemap queda vacío.
export default function sitemap(): MetadataRoute.Sitemap {
  return site.url ? [{ url: `${site.url}/`, changeFrequency: "monthly", priority: 1 }] : [];
}
