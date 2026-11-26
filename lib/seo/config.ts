import type { Metadata } from 'next';
import type { BreadcrumbItem } from '@/types/seo';
import type { FaqItem } from '@/types/calculator';

export const SITE_CONFIG = {
  name: 'NHS Staff Calculator',
  domain: 'https://NHSStaffCalculator.co.uk',
  email: 'hello@nhsstaffcalculator.co.uk',
  taxYearLabel: '2026/2027',
  disclaimerText:
    'NHS Staff Calculator is an independent informational website and is not affiliated with or endorsed by the NHS. Calculator results are estimates and should not be treated as official payroll, pension, tax, or employment advice.',
} as const;

export function normalizeTrailingSlash(path: string): string {
  if (!path || path === '/') return '/';
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function canonicalUrl(path: string): string {
  const normalized = normalizeTrailingSlash(path);
  return `${SITE_CONFIG.domain}${normalized}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
}): Metadata {
  const url = canonicalUrl(path);
  const resolvedImageUrl = image
    ? image.url.startsWith('http')
      ? image.url
      : `${SITE_CONFIG.domain}${image.url.startsWith('/') ? image.url : `/${image.url}`}`
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: 'en_GB',
      type,
      ...(resolvedImageUrl && image
        ? {
            images: [
              {
                url: resolvedImageUrl,
                alt: image.alt,
                width: image.width ?? 1376,
                height: image.height ?? 768,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(resolvedImageUrl ? { images: [resolvedImageUrl] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.domain}/`,
    description:
      'Independent UK NHS salary, pension, shift enhancement, leave, and tax calculator platform.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE_CONFIG.email,
      areaServed: 'GB',
      availableLanguage: 'en-GB',
    },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.domain}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.domain}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: canonicalUrl(item.href),
    })),
  };
}

export function buildSoftwareAppSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: canonicalUrl(path),
    description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
    },
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  publishedDate,
  lastUpdated,
  image,
}: {
  title: string;
  description: string;
  path: string;
  publishedDate: string;
  lastUpdated: string;
  image?: {
    url: string;
    width: number;
    height: number;
    caption?: string;
  };
}) {
  const resolvedImageUrl = image
    ? image.url.startsWith('http')
      ? image.url
      : `${SITE_CONFIG.domain}${image.url.startsWith('/') ? image.url : `/${image.url}`}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: canonicalUrl(path),
    datePublished: publishedDate,
    dateModified: lastUpdated,
    ...(resolvedImageUrl && image
      ? {
          image: {
            '@type': 'ImageObject',
            url: resolvedImageUrl,
            width: image.width,
            height: image.height,
            ...(image.caption ? { caption: image.caption } : {}),
          },
        }
      : {}),
    author: {
      '@type': 'Organization',
      name: `${SITE_CONFIG.name} Editorial Team`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.domain}/`,
    },
    inLanguage: 'en-GB',
  };
}
