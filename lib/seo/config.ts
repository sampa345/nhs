import type { Metadata } from 'next';

import { canonicalUrl, normalizeTrailingSlash, SITE_CONFIG } from './constants';

export { canonicalUrl, normalizeTrailingSlash, SITE_CONFIG };

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

export {
  SCHEMA_IDS,
  buildJsonLdGraph,
  buildOrganizationNode,
  buildWebsiteNode,
  buildWebPageNode,
  buildBreadcrumbNode,
  buildItemListNode,
  buildWebApplicationNode,
  buildBlogNode,
  buildBlogPostingNode,
  buildFaqNode,
} from './schema';

