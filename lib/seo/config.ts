import type { Metadata } from 'next';

import { canonicalUrl, normalizeTrailingSlash, SITE_CONFIG } from './constants';

export { canonicalUrl, normalizeTrailingSlash, SITE_CONFIG };

export const DEFAULT_OG_IMAGE = {
  url: '/images/guides/nhs-pay-bands-explained-2026-2027.jpg',
  alt: 'NHS Staff Calculator — 2026/2027 UK NHS Pay, Pension, Shift & Tax Calculators',
  width: 1376,
  height: 768,
} as const;

export function buildPageMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
  absoluteTitle = false,
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
  absoluteTitle?: boolean;
}): Metadata {
  const url = canonicalUrl(path);
  const selectedImage = image ?? {
    url: DEFAULT_OG_IMAGE.url,
    alt: title,
    width: DEFAULT_OG_IMAGE.width,
    height: DEFAULT_OG_IMAGE.height,
  };
  const resolvedImageUrl = selectedImage.url.startsWith('http')
    ? selectedImage.url
    : `${SITE_CONFIG.domain}${selectedImage.url.startsWith('/') ? selectedImage.url : `/${selectedImage.url}`}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
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
      images: [
        {
          url: resolvedImageUrl,
          alt: selectedImage.alt,
          width: selectedImage.width ?? DEFAULT_OG_IMAGE.width,
          height: selectedImage.height ?? DEFAULT_OG_IMAGE.height,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedImageUrl],
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

