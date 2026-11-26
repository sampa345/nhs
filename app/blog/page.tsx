import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { AdSlot } from '@/components/shared/AdSlot';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBlogNode,
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildPageMetadata,
  buildWebPageNode,
  canonicalUrl,
} from '@/lib/seo/config';

export const metadata = buildPageMetadata({
  title: 'NHS Pay, Pension & Shift Guides (2026/2027) | NHS Staff Calculator',
  description:
    'In-depth UK NHS pay guides explaining 2026/2027 Agenda for Change bands, NHSBSA & SPPA pension tiers, unsocial hours enhancements, and overtime rates.',
  path: '/blog/',
  image: {
    url: '/images/guides/nhs-pay-bands-explained-2026-2027.jpg',
    alt: 'UK NHS pay, pension, and shift guides overview image',
    width: 1376,
    height: 768,
  },
});

export default function BlogHubPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
  ];

  const path = '/blog/';
  const pageUrl = canonicalUrl(path);

  const schemaGraph = buildJsonLdGraph(
    buildWebPageNode({
      path,
      title: 'NHS Pay, Pension & Shift Guides (2026/2027) | NHS Staff Calculator',
      description:
        'In-depth UK NHS pay guides explaining 2026/2027 Agenda for Change bands, NHSBSA & SPPA pension tiers, unsocial hours enhancements, and overtime rates.',
      pageType: 'CollectionPage',
      breadcrumbId: `${pageUrl}#breadcrumb`,
      mainEntityId: `${pageUrl}#blog`,
    }),
    buildBlogNode({
      path,
      name: 'NHS Staff Calculator Blog',
      description:
        'Clear, factually checked explanations of NHS Agenda for Change pay bands, pension contribution brackets, unsocial hours, and overtime rules for 2026/2027.',
      posts: BLOG_ARTICLES.map((article) => ({
        title: article.title,
        path: `/blog/${article.slug}/`,
        publishedDate: article.publishedDate,
        lastUpdated: article.lastUpdated,
        image: {
          url: article.featuredImage.src,
          width: article.featuredImage.width,
          height: article.featuredImage.height,
        },
      })),
    }),
    buildBreadcrumbNode(breadcrumbs, path)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <JsonLd data={schemaGraph} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-3xl">
        <h1 className="font-display text-2xl font-bold tracking-tight text-[#2F3432] sm:text-3xl lg:text-4xl">
          NHS Pay, Pension &amp; Employment Guides
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
          Clear, factually checked explanations of NHS Agenda for Change pay bands, pension contribution brackets, unsocial hours, and overtime rules for 2026/2027.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {BLOG_ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}/`}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-[#0074BA]/40 hover:shadow-md"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  src={article.featuredImage.src}
                  alt={article.featuredImage.alt}
                  width={article.featuredImage.width}
                  height={article.featuredImage.height}
                  sizes="(max-width: 768px) 100vw, 560px"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6 pb-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{article.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>Updated {article.lastUpdated}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold text-[#2F3432] group-hover:text-[#0074BA]">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {article.excerpt}
                </p>
              </div>
            </div>
            <div className="mt-5 inline-flex items-center gap-1.5 px-6 pb-6 text-sm font-semibold text-[#0074BA]">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Read full guide</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>

      <AdSlot placement="between-sections" className="mt-10" />

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-display text-lg font-bold text-[#2F3432]">
          Explore Calculator Hubs
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}/`}
              className="flex min-h-[44px] items-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#2F3432] transition-colors hover:border-[#0074BA] hover:text-[#0074BA]"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-6">
        <DisclaimerBanner compact />
      </div>
    </div>
  );
}
