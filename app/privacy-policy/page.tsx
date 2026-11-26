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

export const metadata = buildPageMetadata({
  title: 'Privacy Policy | NHS Staff Calculator',
  description:
    'Read the Privacy Policy for NHSStaffCalculator.co.uk, explaining client-side calculation privacy, cookies, and Google AdSense data practices.',
  path: '/privacy-policy/',
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy-policy/' },
  ];

  const path = '/privacy-policy/';
  const pageUrl = canonicalUrl(path);
  const schemaGraph = buildJsonLdGraph(
    buildWebPageNode({
      path,
      title: 'Privacy Policy | NHS Staff Calculator',
      description:
        'Read the Privacy Policy for NHSStaffCalculator.co.uk, explaining client-side calculation privacy, cookies, and Google AdSense data practices.',
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
        Privacy Policy
      </h1>
      <p className="mt-2 text-xs text-slate-500">Last updated: 10 April 2026</p>

      <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700 sm:p-8 sm:text-base">
        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">1. Calculator Data Privacy</h2>
          <p className="mt-2">
            All salary, pension, tax, shift, and employment entitlement calculations on NHSStaffCalculator.co.uk run locally inside your web browser. We do not collect, transmit, store, or sell the salary figures, tax codes, or personal financial inputs you type into our calculators.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">2. Information You Voluntarily Provide</h2>
          <p className="mt-2">
            If you contact us via email ({SITE_CONFIG.email}) or our Contact page, we only use your name, email address, and message to respond to your enquiry. Please avoid submitting sensitive personal records such as National Insurance numbers or ESR payroll statements.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">3. Cookies, Analytics &amp; Advertising</h2>
          <p className="mt-2">
            We may use standard essential cookies, privacy-conscious web analytics, and third-party advertising networks such as Google AdSense. Google and its partners may use cookies to serve relevant advertisements based on prior visits where consent has been granted under UK GDPR and PECR rules. You can manage cookie preferences in your browser settings or via Google’s Ad Settings.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[#2F3432]">4. Your Rights Under UK GDPR</h2>
          <p className="mt-2">
            Under UK data protection law, you have the right to request access to, correction of, or deletion of any personal contact data you have shared with us. Contact {SITE_CONFIG.email} with any privacy queries.
          </p>
        </section>
      </div>
    </div>
  );
}
