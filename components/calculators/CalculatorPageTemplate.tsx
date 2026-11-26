import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getCategoryBySlug } from '@/data/categories';
import { getRelatedCalculators } from '@/data/calculators';
import { getBlogArticleBySlug } from '@/data/articles';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { FaqAccordion } from '@/components/shared/FaqAccordion';
import { AdSlot } from '@/components/shared/AdSlot';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { DynamicIcon } from '@/components/shared/IconMap';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbNode,
  buildFaqNode,
  buildJsonLdGraph,
  buildWebApplicationNode,
  buildWebPageNode,
  canonicalUrl,
} from '@/lib/seo/config';
import type { CalculatorDefinition } from '@/types/calculator';
import { CalculatorWidgetDispatcher } from './CalculatorWidgetDispatcher';

export function CalculatorPageTemplate({ calc }: { calc: CalculatorDefinition }) {
  const category = getCategoryBySlug(calc.category);
  const relatedCalcs = getRelatedCalculators(calc.relatedCalculators);
  const relatedGuides = calc.relatedGuides
    .map((slug) => getBlogArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...(category ? [{ label: category.title, href: `/${category.slug}/` }] : []),
    { label: calc.shortTitle, href: `/${calc.slug}/` },
  ];

  const path = `/${calc.slug}/`;
  const pageUrl = canonicalUrl(path);

  const schemaGraph = buildJsonLdGraph(
    buildWebPageNode({
      path,
      title: calc.metaTitle,
      description: calc.metaDescription,
      pageType: 'WebPage',
      dateModified: calc.lastUpdated,
      breadcrumbId: `${pageUrl}#breadcrumb`,
      mainEntityId: `${pageUrl}#webapp`,
    }),
    buildBreadcrumbNode(breadcrumbs, path),
    buildWebApplicationNode({
      path,
      name: calc.title,
      description: calc.metaDescription,
      dateModified: calc.lastUpdated,
    }),
    buildFaqNode(calc.faqs, path)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <JsonLd data={schemaGraph} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-3xl">
        <h1 className="font-display text-2xl font-bold tracking-tight text-[#2F3432] sm:text-3xl lg:text-4xl">
          {calc.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
          {calc.intro}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {category && (
            <>
              <Link href={`/${category.slug}/`} className="font-medium text-[#0074BA] hover:underline">
                {category.title}
              </Link>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span>2026/2027 Tax Year</span>
          <span aria-hidden="true">·</span>
          <span>Last verified {calc.lastUpdated}</span>
        </div>
      </header>

      {/* Calculator interface prominently at top */}
      <section aria-label={calc.calculatorSectionHeading ?? 'Interactive calculator'} className="mt-6">
        {calc.calculatorSectionHeading && (
          <div className="mb-4 max-w-3xl">
            <h2 className="font-display text-xl font-bold tracking-tight text-[#2F3432] sm:text-2xl">
              {calc.calculatorSectionHeading}
            </h2>
            {calc.calculatorSectionDescription && (
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                {calc.calculatorSectionDescription}
              </p>
            )}
          </div>
        )}
        <CalculatorWidgetDispatcher slug={calc.slug} category={calc.category} />
      </section>

      <div className="mt-5">
        <DisclaimerBanner compact />
      </div>

      {/* Reserved non-intrusive AdSense placement below calculator & intro */}
      <AdSlot placement="below-intro" />

      {/* Educational content sections */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 space-y-10 lg:col-span-8">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold tracking-tight text-[#2F3432] sm:text-2xl">
              {calc.howToUseHeading ?? 'How to Use This Calculator'}
            </h2>
            <ol className="space-y-2.5 text-sm leading-relaxed text-slate-700 sm:text-base">
              {calc.howToUse.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 font-mono text-xs font-bold text-[#0074BA]">
                    0{i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {calc.referenceTableHeading && calc.referenceTable && (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#2F3432] sm:text-2xl">
                {calc.referenceTableHeading}
              </h2>
              {calc.referenceTableIntro?.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {p}
                </p>
              ))}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold text-slate-600 sm:px-4">
                  {calc.referenceTable.caption}
                </div>
                <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={calc.referenceTable.caption}>
                  <table className="w-full text-left text-xs sm:text-sm">
                    <caption className="sr-only">{calc.referenceTable.caption}</caption>
                    <thead className="border-b border-slate-200 bg-white text-slate-600">
                      <tr>
                        {calc.referenceTable.headers.map((h) => (
                          <th key={h} scope="col" className="px-3.5 py-2.5 font-semibold whitespace-nowrap sm:px-4 sm:py-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {calc.referenceTable.rows.map((row) => (
                        <tr key={row.join('-')}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={`${cell}-${cIdx}`}
                              className={`px-3.5 py-2.5 whitespace-nowrap sm:px-4 sm:py-3 ${
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
              {calc.referenceTableLink && (
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  <Link href={calc.referenceTableLink.href} className="inline-flex items-center gap-1.5 font-semibold text-[#0074BA] hover:underline">
                    <span>{calc.referenceTableLink.label}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </p>
              )}
            </section>
          )}

          {calc.takeHomeSectionHeading ? (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#2F3432] sm:text-2xl">
                {calc.takeHomeSectionHeading}
              </h2>
              {calc.takeHomeParagraphs?.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {p}
                </p>
              ))}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-[#2F3432]">
                  Example Calculation: {calc.example.scenarioTitle}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Inputs Used
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                      {calc.example.inputsSummary.map((inp) => (
                        <li key={inp}>• {inp}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Estimated Output
                    </h4>
                    <dl className="mt-2 space-y-2 text-sm">
                      {calc.example.outputsSummary.map((out) => (
                        <div key={out.label} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                          <dt className="text-slate-600">{out.label}</dt>
                          <dd className="text-right font-mono font-semibold tabular-nums text-[#2F3432]">
                            {out.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {calc.example.explanation}
                </p>
              </div>
            </section>
          ) : (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="font-display text-xl font-bold text-[#2F3432]">
                Example Calculation: {calc.example.scenarioTitle}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Inputs Used
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                    {calc.example.inputsSummary.map((inp) => (
                      <li key={inp}>• {inp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Estimated Output
                  </h3>
                  <dl className="mt-2 space-y-2 text-sm">
                    {calc.example.outputsSummary.map((out) => (
                      <div key={out.label} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <dt className="text-slate-600">{out.label}</dt>
                        <dd className="text-right font-mono font-semibold tabular-nums text-[#2F3432]">
                          {out.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {calc.example.explanation}
              </p>
            </section>
          )}

          {calc.payRiseSection && (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#2F3432] sm:text-2xl">
                {calc.payRiseSection.heading}
              </h2>
              {calc.payRiseSection.paragraphs.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {p}
                </p>
              ))}
            </section>
          )}

          <AdSlot placement="between-sections" />

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold tracking-tight text-[#2F3432] sm:text-2xl">
              {calc.howItWorksHeading ?? 'How the Calculation Works'}
            </h2>
            {calc.howItWorks.map((p) => (
              <p key={p} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                {p}
              </p>
            ))}
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              {calc.payrollContext}
            </p>
            {!calc.referenceTableHeading && calc.referenceTable && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold text-slate-600 sm:px-4">
                  {calc.referenceTable.caption}
                </div>
                <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={calc.referenceTable.caption}>
                  <table className="w-full text-left text-xs sm:text-sm">
                    <caption className="sr-only">{calc.referenceTable.caption}</caption>
                    <thead className="border-b border-slate-200 bg-white text-slate-600">
                      <tr>
                        {calc.referenceTable.headers.map((h) => (
                          <th key={h} scope="col" className="px-3.5 py-2.5 font-semibold whitespace-nowrap sm:px-4 sm:py-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {calc.referenceTable.rows.map((row) => (
                        <tr key={row.join('-')}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={`${cell}-${cIdx}`}
                              className={`px-3.5 py-2.5 whitespace-nowrap sm:px-4 sm:py-3 ${
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
          </section>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="font-display text-lg font-bold text-[#2F3432]">
                Key Assumptions
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                {calc.assumptions.map((a) => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="font-display text-lg font-bold text-[#2F3432]">
                Limitations
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                {calc.limitations.map((l) => (
                  <li key={l}>• {l}</li>
                ))}
              </ul>
            </div>
          </section>

          <FaqAccordion faqs={calc.faqs} heading={calc.faqHeading} />
        </div>

        {/* Sidebar: Related Calculators, Guides & Official Sources */}
        <aside className="min-w-0 space-y-6 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-base font-bold text-[#2F3432]">
              Related NHS Calculators
            </h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {relatedCalcs.map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={`/${rel.slug}/`}
                    className="flex items-center justify-between gap-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:text-[#0074BA]"
                  >
                    <span className="flex items-center gap-2.5">
                      <DynamicIcon name={rel.iconName} className="h-4 w-4 text-[#0074BA]" />
                      <span>{rel.shortTitle}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
                      className="group block rounded-lg border border-slate-100 p-2.5 transition-colors hover:border-slate-200 hover:bg-slate-50"
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
              Official Sources
            </h2>
            <ul className="mt-3 space-y-3">
              {calc.officialSources.map((src) => (
                <li key={src.url} className="text-xs leading-relaxed">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1.5 font-semibold text-[#0074BA] hover:underline"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                  </a>
                  <p className="text-slate-500">{src.publisher}</p>
                  <p className="mt-0.5 text-slate-600">{src.description}</p>
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
