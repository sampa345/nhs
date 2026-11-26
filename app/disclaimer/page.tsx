import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildPageMetadata,
  buildWebPageNode,
  canonicalUrl,
} from '@/lib/seo/config';

export const metadata = buildPageMetadata({
  title: 'Disclaimer | NHS Staff Calculator',
  description:
    'Important independence and accuracy disclaimer for NHSStaffCalculator.co.uk calculators and UK payroll guides.',
  path: '/disclaimer/',
});

export default function DisclaimerPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Disclaimer', href: '/disclaimer/' },
  ];

  const path = '/disclaimer/';
  const pageUrl = canonicalUrl(path);
  const schemaGraph = buildJsonLdGraph(
    buildWebPageNode({
      path,
      title: 'Disclaimer | NHS Staff Calculator',
      description:
        'Important independence and accuracy disclaimer for NHSStaffCalculator.co.uk calculators and UK payroll guides.',
      pageType: 'WebPage',
      dateModified: '2026-04-10',
      breadcrumbId: `${pageUrl}#breadcrumb`,
    }),
    buildBreadcrumbNode(breadcrumbs, path)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <JsonLd data={schemaGraph} />
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-display text-3xl font-bold tracking-tight text-[#2F3432] sm:text-4xl">
        Disclaimer
      </h1>
      <p className="mt-2 text-xs text-slate-500">Last updated: 10 April 2026</p>

      <div className="mt-6">
        <DisclaimerBanner />
      </div>

      <div className="mt-6 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700 sm:p-8 sm:text-base">
        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">No Official NHS Affiliation</h2>
          <p className="mt-2">
            NHS Staff Calculator (NHSStaffCalculator.co.uk) is an independent informational tool. We are not operated by, affiliated with, endorsed by, or approved by the National Health Service (NHS), NHS England, the Department of Health and Social Care, NHS Employers, NHSBSA, SPPA, or HSC Northern Ireland.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">Why Actual Payslips May Differ</h2>
          <p className="mt-2">
            Individual NHS payslips can vary due to local Trust recruitment and retention premia (RRP), cumulative PAYE tax code adjustments, backdated pay arrears, union subscriptions, attachment of earnings orders, local bank shift tariffs, or mid-year pension tier reassessments.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">Not Financial or Tax Advice</h2>
          <p className="mt-2">
            Nothing on this site constitutes regulated financial, pension, or tax advice. Before making major pension decisions (such as opting out of the NHS Pension Scheme or entering large salary sacrifice agreements), consider consulting an FCA-regulated financial adviser or your Trust pensions officer.
          </p>
        </section>
      </div>
    </div>
  );
}
