import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ContactForm } from '@/components/shared/ContactForm';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildPageMetadata, SITE_CONFIG } from '@/lib/seo/config';

export const metadata = buildPageMetadata({
  title: 'Contact Us | NHS Staff Calculator',
  description:
    'Contact NHSStaffCalculator.co.uk with feedback on our 2026/2027 NHS calculators, dataset corrections, or accessibility suggestions.',
  path: '/contact/',
});

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact/' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-display text-3xl font-bold tracking-tight text-[#2F3432] sm:text-4xl">
        Contact NHS Staff Calculator
      </h1>
      <p className="mt-3 text-base leading-relaxed text-slate-600">
        Spotted a new NHS pay circular update, a regional variation, or an accessibility issue? Let us know using the form below or email{' '}
        <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-[#0074BA] hover:underline">
          {SITE_CONFIG.email}
        </a>
        .
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <div className="space-y-4 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-600">
            <h2 className="font-display text-base font-bold text-[#2F3432]">
              Before You Message Us
            </h2>
            <p className="mt-2">
              Please do not send personal payslips, National Insurance numbers, or ESR employee records. Because we are an independent informational tool, we cannot resolve individual Trust payroll disputes or provide regulated tax/pension advice.
            </p>
          </div>
          <DisclaimerBanner compact />
        </div>
      </div>
    </div>
  );
}
