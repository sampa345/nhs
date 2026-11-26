import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getCalculatorBySlug } from '@/data/calculators';
import { getCategoryBySlug } from '@/data/categories';
import { getBlogArticleBySlug } from '@/data/articles';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { AdSlot } from '@/components/shared/AdSlot';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { DynamicIcon } from '@/components/shared/IconMap';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBlogPostingNode,
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildWebPageNode,
  canonicalUrl,
} from '@/lib/seo/config';
import type { BlogArticle } from '@/types/seo';
import { ReadingProgressBar } from './ReadingProgressBar';

export function BlogArticleTemplate({ article }: { article: BlogArticle }) {
  const category = getCategoryBySlug(article.relatedCategory);
  const relatedCalcs = article.relatedCalculators
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const relatedPosts = article.relatedArticles
    .map((slug) => getBlogArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: article.title, href: `/blog/${article.slug}/` },
  ];

  const path = `/blog/${article.slug}/`;
  const pageUrl = canonicalUrl(path);

  const schemaGraph = buildJsonLdGraph(
    buildWebPageNode({
      path,
      title: article.metaTitle,
      description: article.metaDescription,
      pageType: 'WebPage',
      dateModified: article.lastUpdated,
      breadcrumbId: `${pageUrl}#breadcrumb`,
      mainEntityId: `${pageUrl}#blogposting`,
    }),
    buildBlogPostingNode({
      path,
      title: article.title,
      description: article.metaDescription,
      publishedDate: article.publishedDate,
      lastUpdated: article.lastUpdated,
      categoryLabel: article.categoryLabel,
      image: {
        url: article.featuredImage.src,
        width: article.featuredImage.width,
        height: article.featuredImage.height,
        caption: article.featuredImage.caption,
      },
    }),
    buildBreadcrumbNode(breadcrumbs, path)
  );

  return (
    <>
      <ReadingProgressBar targetId="blog-article-body" />
      <article id="blog-article-body" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <JsonLd data={schemaGraph} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>{article.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Updated {article.lastUpdated}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#2F3432] sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {article.intro}
        </p>
        <p className="mt-3 text-xs text-slate-500">{article.authorNote}</p>
      </header>

      <figure className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="relative aspect-video w-full bg-slate-100">
          <Image
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            width={article.featuredImage.width}
            height={article.featuredImage.height}
            priority
            sizes="(max-width: 1024px) 100vw, 1152px"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>
        <figcaption className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500">
          {article.featuredImage.caption}
        </figcaption>
      </figure>

      <AdSlot placement="below-intro" />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          {/* Table of contents */}
          <nav
            aria-label="Table of contents"
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              In This Guide
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {article.sections.map((sec, idx) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="font-medium text-[#0074BA] hover:underline"
                  >
                    0{idx + 1}. {sec.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {article.sections.map((sec, idx) => (
            <section key={sec.id} id={sec.id} className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#2F3432]">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {p}
                </p>
              ))}

              {sec.table && (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">
                    {sec.table.caption}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-slate-200 bg-white text-slate-600">
                        <tr>
                          {sec.table.headers.map((h) => (
                            <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sec.table.rows.map((row) => (
                          <tr key={row.join('-')}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={`${cell}-${cIdx}`}
                                className={`px-4 py-3 whitespace-nowrap ${
                                  cIdx === 0
                                    ? 'font-semibold text-[#2F3432]'
                                    : 'font-mono tabular-nums text-slate-700'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {idx === 0 && <AdSlot placement="in-article" />}
            </section>
          ))}

          {/* Example Box */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-[#2F3432]">
              {article.exampleBox.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{article.exampleBox.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {article.exampleBox.steps.map((step) => (
                <li key={step} className="font-mono text-xs sm:text-sm tabular-nums">
                  • {step}
                </li>
              ))}
            </ul>
          </section>

          <DisclaimerBanner />

          {/* Official sources */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-base font-bold text-[#2F3432]">
              Official References
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {article.officialSources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#0074BA] hover:underline"
                  >
                    <span>{src.title} ({src.publisher})</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-base font-bold text-[#2F3432]">
              Relevant Calculators
            </h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {relatedCalcs.map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={`/${calc.slug}/`}
                    className="flex items-center justify-between gap-2 py-3 text-sm font-medium text-slate-700 hover:text-[#0074BA]"
                  >
                    <span className="flex items-center gap-2">
                      <DynamicIcon name={calc.iconName} className="h-4 w-4 text-[#0074BA]" />
                      <span>{calc.shortTitle}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            {category && (
              <Link
                href={`/${category.slug}/`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0074BA] hover:underline"
              >
                <span>Explore all {category.title}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-base font-bold text-[#2F3432]">
              More NHS Guides
            </h2>
            <ul className="mt-3 space-y-3">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="group flex items-start gap-3 rounded-lg border border-slate-100 p-2.5 transition-colors hover:border-slate-200 hover:bg-slate-50"
                  >
                    <div className="relative aspect-video w-20 shrink-0 overflow-hidden rounded bg-slate-100">
                      <Image
                        src={post.featuredImage.src}
                        alt={post.featuredImage.alt}
                        width={post.featuredImage.width}
                        height={post.featuredImage.height}
                        sizes="80px"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#2F3432] group-hover:text-[#0074BA]">
                        {post.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{post.readTime}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <AdSlot placement="end-of-content" className="mt-10" />
      </article>
    </>
  );
}
