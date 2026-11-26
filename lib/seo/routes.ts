import { ALL_CALCULATORS, getCalculatorsByCategory } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import { BLOG_ARTICLES, getBlogArticleBySlug } from '@/data/articles';
import { canonicalUrl, normalizeTrailingSlash, SITE_CONFIG } from './constants';

export type CanonicalRouteKind =
  | 'home'
  | 'blog-index'
  | 'governance'
  | 'category'
  | 'calculator'
  | 'blog-article';

export interface CanonicalRouteEntry {
  path: string;
  url: string;
  kind: CanonicalRouteKind;
  indexable: boolean;
  lastModified?: string;
}

/**
 * Genuine content modification dates for governance pages that publish
 * explicit revision metadata ("Last updated / Last reviewed").
 * Pages without tracked content revision dates omit <lastmod> rather than
 * emitting unverified or build-time timestamps.
 */
export const GOVERNANCE_CONTENT_DATES = {
  '/privacy-policy/': '2026-04-10',
  '/terms-and-conditions/': '2026-04-10',
  '/disclaimer/': '2026-04-10',
  '/editorial-policy/': '2026-04-10',
} as const;

const W3C_DATE_PATTERN =
  /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/;

export function isValidW3cDate(value: string | undefined): value is string {
  if (!value || !W3C_DATE_PATTERN.test(value)) return false;

  const datePart = value.slice(0, 10);
  const [yearStr, monthStr, dayStr] = datePart.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  const utcCheck = new Date(Date.UTC(year, month - 1, day));
  if (
    utcCheck.getUTCFullYear() !== year ||
    utcCheck.getUTCMonth() !== month - 1 ||
    utcCheck.getUTCDate() !== day
  ) {
    return false;
  }

  return Number.isFinite(Date.parse(value));
}

export function resolveLatestW3cDate(dates: Array<string | undefined>): string | undefined {
  let latestValue: string | undefined;
  let latestMs = -Infinity;

  for (const candidate of dates) {
    if (!isValidW3cDate(candidate)) continue;
    const ms = Date.parse(candidate);
    if (ms > latestMs) {
      latestMs = ms;
      latestValue = candidate;
    }
  }

  return latestValue;
}

function buildStaticAndGovernanceRoutes(): CanonicalRouteEntry[] {
  const allCalculatorDates = ALL_CALCULATORS.map((calc) => calc.lastUpdated);
  const allArticleDates = BLOG_ARTICLES.map((article) => article.lastUpdated);

  const homepageLastMod = resolveLatestW3cDate([
    ...allCalculatorDates,
    ...allArticleDates,
  ]);
  const blogIndexLastMod = resolveLatestW3cDate(allArticleDates);

  const rawRoutes: Array<{
    path: string;
    kind: CanonicalRouteKind;
    indexable: boolean;
    lastModified?: string;
  }> = [
    {
      path: '/',
      kind: 'home',
      indexable: true,
      lastModified: homepageLastMod,
    },
    {
      path: '/blog/',
      kind: 'blog-index',
      indexable: true,
      lastModified: blogIndexLastMod,
    },
    {
      path: '/about/',
      kind: 'governance',
      indexable: true,
    },
    {
      path: '/contact/',
      kind: 'governance',
      indexable: true,
    },
    {
      path: '/privacy-policy/',
      kind: 'governance',
      indexable: true,
      lastModified: GOVERNANCE_CONTENT_DATES['/privacy-policy/'],
    },
    {
      path: '/terms-and-conditions/',
      kind: 'governance',
      indexable: true,
      lastModified: GOVERNANCE_CONTENT_DATES['/terms-and-conditions/'],
    },
    {
      path: '/disclaimer/',
      kind: 'governance',
      indexable: true,
      lastModified: GOVERNANCE_CONTENT_DATES['/disclaimer/'],
    },
    {
      path: '/editorial-policy/',
      kind: 'governance',
      indexable: true,
      lastModified: GOVERNANCE_CONTENT_DATES['/editorial-policy/'],
    },
  ];

  return rawRoutes.map((route) => {
    const normalizedPath = normalizeTrailingSlash(route.path);
    return {
      ...route,
      path: normalizedPath,
      url: canonicalUrl(normalizedPath),
      lastModified: isValidW3cDate(route.lastModified) ? route.lastModified : undefined,
    };
  });
}

function buildCategoryRoutes(): CanonicalRouteEntry[] {
  return CATEGORIES.map((cat) => {
    const normalizedPath = normalizeTrailingSlash(`/${cat.slug}/`);
    const categoryCalculators = getCalculatorsByCategory(cat.slug);
    const relatedGuideDates = cat.relatedGuides
      .map((guideSlug) => getBlogArticleBySlug(guideSlug)?.lastUpdated);

    const lastModified = resolveLatestW3cDate([
      ...categoryCalculators.map((calc) => calc.lastUpdated),
      ...relatedGuideDates,
    ]);

    return {
      path: normalizedPath,
      url: canonicalUrl(normalizedPath),
      kind: 'category' as const,
      indexable: true,
      ...(lastModified ? { lastModified } : {}),
    };
  });
}

function buildCalculatorRoutes(): CanonicalRouteEntry[] {
  return ALL_CALCULATORS.map((calc) => {
    const normalizedPath = normalizeTrailingSlash(`/${calc.slug}/`);
    const lastModified = isValidW3cDate(calc.lastUpdated) ? calc.lastUpdated : undefined;

    return {
      path: normalizedPath,
      url: canonicalUrl(normalizedPath),
      kind: 'calculator' as const,
      indexable: true,
      ...(lastModified ? { lastModified } : {}),
    };
  });
}

function buildBlogArticleRoutes(): CanonicalRouteEntry[] {
  return BLOG_ARTICLES.map((article) => {
    const normalizedPath = normalizeTrailingSlash(`/blog/${article.slug}/`);
    const lastModified = isValidW3cDate(article.lastUpdated) ? article.lastUpdated : undefined;

    return {
      path: normalizedPath,
      url: canonicalUrl(normalizedPath),
      kind: 'blog-article' as const,
      indexable: true,
      ...(lastModified ? { lastModified } : {}),
    };
  });
}

/**
 * Centralized, deduplicated list of all canonical, indexable website routes.
 * Excludes redirects, non-canonical URLs, error pages, and non-indexable paths.
 */
export function getSitemapRouteEntries(): CanonicalRouteEntry[] {
  const candidates: CanonicalRouteEntry[] = [
    ...buildStaticAndGovernanceRoutes(),
    ...buildCategoryRoutes(),
    ...buildCalculatorRoutes(),
    ...buildBlogArticleRoutes(),
  ];

  const deduplicated = new Map<string, CanonicalRouteEntry>();

  for (const entry of candidates) {
    if (!entry.indexable) continue;
    if (!entry.url.startsWith(`${SITE_CONFIG.domain}/`)) continue;

    if (!deduplicated.has(entry.url)) {
      deduplicated.set(entry.url, entry);
    }
  }

  return Array.from(deduplicated.values());
}

export const CANONICAL_ROUTE_PATHS = new Set<string>(
  getSitemapRouteEntries().map((entry) => entry.path)
);
