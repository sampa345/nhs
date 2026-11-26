import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/lib/seo/config';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = buildPageMetadata({
  title: 'About NHS Staff Calculator | Independent UK NHS Payroll Tools',
  description:
    'Learn about NHSStaffCalculator.co.uk—an independent informational calculator platform built to help UK NHS staff understand pay, pensions, shifts, and leave.',
  path: '/about/',
});

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-display text-3xl font-bold tracking-tight text-[#2F3432] sm:text-4xl">
        About NHS Staff Calculator
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
        NHSStaffCalculator.co.uk is an independent UK informational platform dedicated to helping NHS staff—including nurses, doctors, healthcare assistants, allied health professionals, administrative staff, and bank workers—estimate their pay, pension contributions, shift enhancements, leave, and tax deductions.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 sm:text-base">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-[#2F3432]">Why We Built This Platform</h2>
          <p className="mt-3">
            UK NHS payslips combine devolved Agenda for Change pay awards, London High Cost Area Supplements, Section 2 unsocial hours multipliers, tiered Net Pay pension deductions, Class 1 National Insurance, and Student Loan plans. Generic UK salary calculators frequently miss these NHS-specific rules—such as excluding HCAS from shift enhancements or assessing part-time pension tiers on actual earnings rather than whole-time equivalent salary.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-[#2F3432]">UK-Wide Accuracy &amp; Privacy</h2>
          <p className="mt-3">
            Our centralised 2026/2027 calculation engine separates England, Wales, Scotland (including Scotland’s 36-hour working week, SPPA pension tiers, and Scottish Income Tax bands), and Northern Ireland. All calculations run strictly inside your browser so no salary or personal details are ever transmitted or stored on external servers.
          </p>
        </section>

        <DisclaimerBanner />

        <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold text-[#0074BA]">
          <Link href="/editorial-policy/" className="hover:underline">Read our Editorial Policy →</Link>
          <Link href="/nhs-pay-calculator/" className="hover:underline">Try the NHS Pay Calculator →</Link>
        </div>
      </div>
    </div>
  );
}
