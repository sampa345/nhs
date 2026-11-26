import type { BreadcrumbItem } from '@/types/seo';
import type { FaqItem } from '@/types/calculator';
import { canonicalUrl, SITE_CONFIG } from './constants';

export const SCHEMA_IDS = {
  organization: `${SITE_CONFIG.domain}/#organization`,
  website: `${SITE_CONFIG.domain}/#website`,
} as const;

export type SchemaNode = Record<string, unknown>;

export function buildJsonLdGraph(...nodes: SchemaNode[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

export function resolveAbsoluteAssetUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${SITE_CONFIG.domain}${url.startsWith('/') ? url : `/${url}`}`;
}

export function buildOrganizationNode(): SchemaNode {
  return {
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.domain}/`,
    description:
      'Independent UK NHS salary, pension, shift enhancement, leave, and tax calculator platform. Not affiliated with or endorsed by the NHS.',
    email: SITE_CONFIG.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE_CONFIG.email,
      areaServed: 'GB',
      availableLanguage: 'en-GB',
    },
  };
}

export function buildWebsiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.domain}/`,
    description:
      'Free UK NHS pay, take-home salary, pension, shift enhancement, leave, and tax calculators for the 2026/2027 tax year.',
    publisher: {
      '@id': SCHEMA_IDS.organization,
    },
    inLanguage: 'en-GB',
  };
}

export function buildWebPageNode({
  path,
  title,
  description,
  pageType = 'WebPage',
  dateModified,
  breadcrumbId,
  mainEntityId,
  aboutId,
}: {
  path: string;
  title: string;
  description: string;
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  dateModified?: string;
  breadcrumbId?: string;
  mainEntityId?: string;
  aboutId?: string;
}): SchemaNode {
  const url = canonicalUrl(path);
  return {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: {
      '@id': SCHEMA_IDS.website,
    },
    ...(aboutId ? { about: { '@id': aboutId } } : {}),
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: 'en-GB',
  };
}

export function buildBreadcrumbNode(items: BreadcrumbItem[], path: string): SchemaNode {
  const url = canonicalUrl(path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: canonicalUrl(item.href),
    })),
  };
}

export function buildItemListNode({
  path,
  name,
  items,
}: {
  path: string;
  name: string;
  items: { name: string; path: string; description?: string }[];
}): SchemaNode {
  const url = canonicalUrl(path);
  return {
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: canonicalUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function buildWebApplicationNode({
  path,
  name,
  description,
  dateModified,
}: {
  path: string;
  name: string;
  description: string;
  dateModified?: string;
}): SchemaNode {
  const url = canonicalUrl(path);
  return {
    '@type': 'WebApplication',
    '@id': `${url}#webapp`,
    name,
    url,
    description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
    },
    provider: {
      '@id': SCHEMA_IDS.organization,
    },
    ...(dateModified ? { dateModified } : {}),
    inLanguage: 'en-GB',
  };
}

export function buildBlogNode({
  path,
  name,
  description,
  posts,
}: {
  path: string;
  name: string;
  description: string;
  posts: {
    title: string;
    path: string;
    publishedDate: string;
    lastUpdated: string;
    image?: {
      url: string;
      width: number;
      height: number;
    };
  }[];
}): SchemaNode {
  const url = canonicalUrl(path);
  return {
    '@type': 'Blog',
    '@id': `${url}#blog`,
    url,
    name,
    description,
    publisher: {
      '@id': SCHEMA_IDS.organization,
    },
    isPartOf: {
      '@id': SCHEMA_IDS.website,
    },
    inLanguage: 'en-GB',
    blogPost: posts.map((post) => {
      const postUrl = canonicalUrl(post.path);
      return {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#blogposting`,
        url: postUrl,
        headline: post.title,
        datePublished: post.publishedDate,
        dateModified: post.lastUpdated,
        ...(post.image
          ? {
              image: {
                '@type': 'ImageObject',
                url: resolveAbsoluteAssetUrl(post.image.url),
                width: post.image.width,
                height: post.image.height,
              },
            }
          : {}),
        author: {
          '@type': 'Organization',
          name: `${SITE_CONFIG.name} Editorial Team`,
          url: canonicalUrl('/about/'),
        },
        publisher: {
          '@id': SCHEMA_IDS.organization,
        },
      };
    }),
  };
}

export function buildBlogPostingNode({
  path,
  title,
  description,
  publishedDate,
  lastUpdated,
  categoryLabel,
  image,
}: {
  path: string;
  title: string;
  description: string;
  publishedDate: string;
  lastUpdated: string;
  categoryLabel: string;
  image?: {
    url: string;
    width: number;
    height: number;
    caption?: string;
  };
}): SchemaNode {
  const url = canonicalUrl(path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    mainEntityOfPage: {
      '@id': `${url}#webpage`,
    },
    isPartOf: {
      '@id': `${canonicalUrl('/blog/')}#blog`,
    },
    headline: title,
    description,
    articleSection: categoryLabel,
    datePublished: publishedDate,
    dateModified: lastUpdated,
    ...(image
      ? {
          image: {
            '@type': 'ImageObject',
            url: resolveAbsoluteAssetUrl(image.url),
            width: image.width,
            height: image.height,
            ...(image.caption ? { caption: image.caption } : {}),
          },
        }
      : {}),
    author: {
      '@type': 'Organization',
      name: `${SITE_CONFIG.name} Editorial Team`,
      url: canonicalUrl('/about/'),
    },
    publisher: {
      '@id': SCHEMA_IDS.organization,
    },
    inLanguage: 'en-GB',
  };
}

export function buildFaqNode(faqs: FaqItem[], path: string): SchemaNode {
  const url = canonicalUrl(path);
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
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
