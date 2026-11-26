import type { MetadataRoute } from 'next';
import { ALL_CALCULATORS } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import { BLOG_ARTICLES } from '@/data/articles';
import { canonicalUrl } from '@/lib/seo/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-04-10T00:00:00.000Z');

  const staticRoutes = [
    '/',
    '/blog/',
    '/about/',
    '/contact/',
    '/privacy-policy/',
    '/terms-and-conditions/',
    '/disclaimer/',
    '/editorial-policy/',
  ].map((path) => ({
    url: canonicalUrl(path),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1.0 : 0.6,
  }));

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: canonicalUrl(`/${cat.slug}/`),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const calculatorRoutes = ALL_CALCULATORS.map((calc) => ({
    url: canonicalUrl(`/${calc.slug}/`),
    lastModified: new Date(calc.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: calc.isPopular ? 0.95 : 0.85,
  }));

  const blogRoutes = BLOG_ARTICLES.map((article) => ({
    url: canonicalUrl(`/blog/${article.slug}/`),
    lastModified: new Date(article.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes, ...blogRoutes];
}
