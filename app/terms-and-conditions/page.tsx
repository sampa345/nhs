import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildPageMetadata,
  buildWebPageNode,
  canonicalUrl,
  SITE_CONFIG,
} from '@/lib/seo/config';
import { GOVERNANCE_CONTENT_DATES } from '@/lib/seo/routes';

export const metadata = buildPageMetadata({
  title: 'Terms and Conditions | NHS Staff Calculator',
  description:
    'Terms and Conditions governing use of the free UK NHS salary, pension, and employment calculators on NHSStaffCalculator.co.uk.',
  path: '/terms-and-conditions/',
});

export default function TermsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
  ];

  const path = '/terms-and-conditions/';
  const pageUrl = canonicalUrl(path);
  const schemaGraph = buildJsonLdGraph(
    buildWebPageNode({
      path,
      title: 'Terms and Conditions | NHS Staff Calculator',
      description:
        'Terms and Conditions governing use of the free UK NHS salary, pension, and employment calculators on NHSStaffCalculator.co.uk.',
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
        Terms and Conditions
      </h1>
      <p className="mt-2 text-xs text-slate-500">Last updated: 10 April 2026</p>

      <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700 sm:p-8 sm:text-base">
        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing {SITE_CONFIG.domain}, you agree to these Terms and Conditions. If you do not agree, please discontinue use of the website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">2. Informational Estimates Only</h2>
          <p className="mt-2">
            All calculators, tables, and guides are provided strictly for general informational and estimation purposes. They do not constitute regulated financial, pension, tax, payroll, or legal advice. Always confirm official figures with your NHS Trust payroll office, NHSBSA, SPPA, HSC Pension Service, or HMRC.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">3. Independent Status</h2>
          <p className="mt-2">
            NHS Staff Calculator is an independent website and is not affiliated with, endorsed by, or operated by the NHS, NHS England, NHS Scotland, NHS Wales, HSC Northern Ireland, or any government body.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">4. Limitation of Liability</h2>
          <p className="mt-2">
            While we take reasonable care to keep 2026/2027 datasets accurate and up to date, NHSStaffCalculator.co.uk accepts no liability for financial decisions or losses arising from reliance on estimated calculator outputs.
          </p>
        </section>
      </div>
    </div>
  );
}
