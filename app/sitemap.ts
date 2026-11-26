import type { MetadataRoute } from 'next';
import { getSitemapRouteEntries } from '@/lib/seo/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapRouteEntries().map((entry) => ({
    url: entry.url,
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
