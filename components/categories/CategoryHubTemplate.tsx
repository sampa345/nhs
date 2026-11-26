import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCalculatorsByCategory } from '@/data/calculators';
import { getCategoryBySlug } from '@/data/categories';
import { getBlogArticleBySlug } from '@/data/articles';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { FaqAccordion } from '@/components/shared/FaqAccordion';
import { AdSlot } from '@/components/shared/AdSlot';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { DynamicIcon } from '@/components/shared/IconMap';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo/config';
import type { CategoryDefinition } from '@/types/calculator';

export function CategoryHubTemplate({ category }: { category: CategoryDefinition }) {
  const calculators = getCalculatorsByCategory(category.slug);
  const relatedCategories = category.relatedCategories
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is CategoryDefinition => Boolean(c));
  const relatedGuides = category.relatedGuides
    .map((slug) => getBlogArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: category.title, href: `/${category.slug}/` },
  ];

  const schemas = [
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(category.faqs),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <JsonLd data={schemas} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#2F3432] sm:text-4xl">
          {category.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
          {category.intro}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {calculators.length} calculators · Updated for 2026/2027 tax year · UK NHS jurisdictions
        </p>
      </header>

      {/* Calculator cards grid */}
      <section aria-labelledby="category-calculators-heading" className="mt-8">
        <h2 id="category-calculators-heading" className="sr-only">
          Available {category.title}
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.slug}/`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#149777]/50 hover:shadow-md"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#149777] transition-colors group-hover:bg-[#149777] group-hover:text-white">
                  <DynamicIcon name={calc.iconName} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[#2F3432] group-hover:text-[#149777]">
                  {calc.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {calc.shortDescription}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#0074BA]">
                <span>Open calculator</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot placement="below-intro" />

      {/* Deep category explanation */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#2F3432]">
          {category.explanationTitle}
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {category.explanationParagraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 md:grid-cols-3">
          {category.keyHighlights.map((item) => (
            <div key={item.label}>
              <h3 className="text-sm font-bold text-[#2F3432]">{item.label}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6">
        <DisclaimerBanner compact />
      </div>

      {/* Related guides & FAQs */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <FaqAccordion faqs={category.faqs} />
        </div>

        <aside className="space-y-6 lg:col-span-4">
          {relatedGuides.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-display text-base font-bold text-[#2F3432]">
                Related NHS Guides
              </h2>
              <ul className="mt-3 space-y-3">
                {relatedGuides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/blog/${guide.slug}/`}
                      className="group block rounded-lg border border-slate-100 p-2.5 hover:border-slate-200 hover:bg-slate-50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative aspect-video w-20 shrink-0 overflow-hidden rounded bg-slate-100">
                          <Image
                            src={guide.featuredImage.src}
                            alt={guide.featuredImage.alt}
                            width={guide.featuredImage.width}
                            height={guide.featuredImage.height}
                            sizes="80px"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#2F3432] group-hover:text-[#0074BA]">
                            {guide.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">{guide.readTime}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-base font-bold text-[#2F3432]">
              Related Categories
            </h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {relatedCategories.map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={`/${rel.slug}/`}
                    className="flex items-center justify-between py-3 text-sm font-medium text-slate-700 hover:text-[#0074BA]"
                  >
                    <span>{rel.title}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <AdSlot placement="end-of-content" className="mt-10" />
    </div>
  );
}
