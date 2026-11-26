import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildPageMetadata,
  buildWebPageNode,
  canonicalUrl,
} from '@/lib/seo/config';
import { GOVERNANCE_CONTENT_DATES } from '@/lib/seo/routes';

export const metadata = buildPageMetadata({
  title: 'Editorial Policy & Data Verification | NHS Staff Calculator',
  description:
    'How NHSStaffCalculator.co.uk verifies 2026/2027 NHS pay scales, UK tax thresholds, NHSBSA/SPPA pension tiers, and educational articles.',
  path: '/editorial-policy/',
});

export default function EditorialPolicyPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Editorial Policy', href: '/editorial-policy/' },
  ];

  const path = '/editorial-policy/';
  const pageUrl = canonicalUrl(path);
  const schemaGraph = buildJsonLdGraph(
    buildWebPageNode({
      path,
      title: 'Editorial Policy & Data Verification | NHS Staff Calculator',
      description:
        'How NHSStaffCalculator.co.uk verifies 2026/2027 NHS pay scales, UK tax thresholds, NHSBSA/SPPA pension tiers, and educational articles.',
      pageType: 'WebPage',
      dateModified: GOVERNANCE_CONTENT_DATES[path],
      breadcrumbId: `${pageUrl}#breadcrumb`,
    }),
    buildBreadcrumbNode(breadcrumbs, path)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <JsonLd data={schemaGraph} />
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-display text-2xl font-bold tracking-tight text-[#2F3432] sm:text-3xl lg:text-4xl">
        Editorial Policy &amp; Data Verification
      </h1>
      <p className="mt-2 text-xs text-slate-500">Last reviewed: 10 April 2026</p>

      <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700 sm:p-8 sm:text-base">
        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">1. Authoritative Primary Sources Only</h2>
          <p className="mt-2">
            Every pay band, enhancement multiplier, pension bracket, and tax threshold on NHSStaffCalculator.co.uk is sourced from official UK publications—specifically NHS Employers (Agenda for Change Handbook &amp; Pay Circulars), NHS Business Services Authority (NHSBSA), Scottish Public Pensions Agency (SPPA), GOV.UK, and HMRC. We never fabricate pay points or guess unconfirmed thresholds.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">2. Jurisdiction &amp; Tax-Year Separation</h2>
          <p className="mt-2">
            Because NHS pay and Income Tax are devolved across the United Kingdom, our datasets explicitly separate England, Wales, Scotland, and Northern Ireland. Where local circular implementation (such as Northern Ireland HSC executive sign-off) differs in timing, we state this clearly and provide manual salary overrides.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">3. Automated Verification &amp; Review Cadence</h2>
          <p className="mt-2">
            All core payroll, tax, National Insurance, pension, shift, and employment formulas are backed by automated unit tests and reviewed at each UK tax year boundary (6 April) as well as whenever national NHS pay circulars are published.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">4. Transparency &amp; Independence</h2>
          <p className="mt-2">
            Advertising placements are visually separated from interactive calculator controls and results, and never influence calculation outputs or editorial recommendations.
          </p>
        </section>
      </div>
    </div>
  );
}
