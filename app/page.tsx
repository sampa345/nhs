import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import {
  ALL_CALCULATORS,
  getCalculatorsByCategory,
  getFeaturedCalculators,
  getPopularCalculators,
} from '@/data/calculators';
import { BLOG_ARTICLES } from '@/data/articles';
import { CalculatorSearch } from '@/components/shared/CalculatorSearch';
import { DynamicIcon } from '@/components/shared/IconMap';
import { FaqAccordion } from '@/components/shared/FaqAccordion';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { ExpandableAboutSection } from '@/components/shared/ExpandableAboutSection';
import { AdSlot } from '@/components/shared/AdSlot';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildFaqNode,
  buildJsonLdGraph,
  buildPageMetadata,
  buildWebPageNode,
  SCHEMA_IDS,
} from '@/lib/seo/config';

export const metadata = buildPageMetadata({
  title: 'Free NHS Pay & Salary Calculators (2026/2027) | NHS Staff Calculator',
  description:
    'Calculate your NHS take-home pay, pension contributions, overtime, shift enhancements, annual leave, and tax for 2026/2027 across England, Scotland, Wales, and NI.',
  path: '/',
});

const HOMEPAGE_FAQS = [
  {
    question: 'Are all calculators on NHSStaffCalculator.co.uk free to use?',
    answer:
      'Yes. All 26 NHS salary, pension, shift, employment, and tax calculators are completely free to use with no registration or personal financial data collection.',
  },
  {
    question: 'Which tax year and NHS pay scales are used?',
    answer:
      'Calculators are configured for the 2026/2027 UK tax year (6 April 2026 to 5 April 2027) alongside 2026/2027 Agenda for Change pay scales, NHSBSA and SPPA pension tiers, and GOV.UK statutory rates.',
  },
  {
    question: 'Do the calculators work for England, Scotland, Wales, and Northern Ireland?',
    answer:
      'Yes. You can switch between England, Wales, Scotland (including Scotland’s 36-hour standard working week, STAC pay points, SPPA pension tiers, and Scottish Income Tax bands), and Northern Ireland.',
  },
  {
    question: 'How is NHS take-home pay calculated after pension, tax, and National Insurance?',
    answer:
      'Gross pay (basic salary plus any High Cost Area Supplement and unsocial hours) first has your NHS Pension Scheme contribution deducted under a Net Pay Arrangement before Income Tax is calculated, while Class 1 National Insurance (8% between £12,570 and £50,270, 2% above) and Student Loan repayments are assessed on gross NIable pay.',
  },
  {
    question: 'What is the 2026/2027 NHS Band 5 starting salary?',
    answer:
      'For 2026/2027, the full-time Band 5 Entry Point basic salary is £32,073 in England (37.5-hour week) and £34,544 in NHS Scotland (36-hour week), excluding any London High Cost Area Supplement or unsocial hours enhancements.',
  },
  {
    question: 'Is NHS Staff Calculator officially affiliated with the NHS?',
    answer:
      'No. NHS Staff Calculator is an independent informational platform. Results are transparent estimates designed to help staff understand their payslips, pensions, and entitlements.',
  },
];

const CATEGORY_ICON_STYLES = [
  'bg-emerald-50 text-[#149777]',
  'bg-sky-50 text-[#0074BA]',
  'bg-amber-50 text-amber-600',
  'bg-teal-50 text-teal-700',
  'bg-indigo-50 text-indigo-600',
  'bg-cyan-50 text-cyan-700',
  'bg-orange-50 text-orange-600',
  'bg-blue-50 text-[#0074BA]',
];

const FEATURED_PREVIEWS: Record<
  string,
  {
    badgeLabel: string;
    primaryFigure: string;
    regionLabel: string;
    metrics: { label: string; value: string }[];
  }
> = {
  'nhs-pay-calculator': {
    badgeLabel: '2026/27 Verified',
    primaryFigure: '£32,073 / yr',
    regionLabel: 'England, Band 5 Entry',
    metrics: [
      { label: 'England 37.5h', value: '£32,073' },
      { label: 'Scotland 36h', value: '£34,544' },
      { label: 'Net / Month', value: '~£2,115' },
    ],
  },
  'nhs-pension-calculator': {
    badgeLabel: 'NHSBSA & SPPA',
    primaryFigure: '5.2% – 12.5%',
    regionLabel: 'UK Member Tiers',
    metrics: [
      { label: 'Employer Rate', value: '23.7%' },
      { label: 'CARE Accrual', value: '1 / 54th' },
      { label: 'Tax Relief', value: 'Net Pay' },
    ],
  },
  'nhs-unsocial-hours-calculator': {
    badgeLabel: 'AfC Section 2',
    primaryFigure: '+30% to +83%',
    regionLabel: 'Nights, Sat, Sun & BH',
    metrics: [
      { label: 'Band 2 Sun/BH', value: '+83%' },
      { label: 'Band 4–9 Night', value: '+30%' },
      { label: 'Band 4–9 Sun', value: '+60%' },
    ],
  },
  'nhs-overtime-calculator': {
    badgeLabel: 'AfC Section 3',
    primaryFigure: '1.5x – 2.0x',
    regionLabel: 'Bands 2–8a Authorised',
    metrics: [
      { label: 'Standard OT', value: '1.5x Basic' },
      { label: 'Bank Hol OT', value: '2.0x Basic' },
      { label: 'Bank WTR', value: '+12.07%' },
    ],
  },
};

export default function HomePage() {
  const popularCalculators = getPopularCalculators();
  const featuredCalculators = getFeaturedCalculators();

  const payCalcs = getCalculatorsByCategory('nhs-pay-calculators');
  const pensionCalcs = getCalculatorsByCategory('nhs-pension-calculators');
  const shiftCalcs = getCalculatorsByCategory('nhs-shift-calculators');
  const employmentAndTaxCalcs = [
    ...getCalculatorsByCategory('nhs-employment-calculators'),
    ...getCalculatorsByCategory('nhs-tax-calculators'),
  ];

  // Combine 5 category hubs + top 7 popular tools into a balanced 12-item (3x4) browse grid matching the screenshot
  const browseTiles = [
    ...CATEGORIES.map((cat) => ({
      href: `/${cat.slug}/`,
      title: cat.title.replace(' Calculators', ''),
      subtitle: `${getCalculatorsByCategory(cat.slug).length} calculators`,
      iconName: cat.iconName,
    })),
    ...popularCalculators.slice(0, 7).map((calc) => ({
      href: `/${calc.slug}/`,
      title: calc.shortTitle,
      subtitle: 'Direct tool',
      iconName: calc.iconName,
    })),
  ];

  return (
    <div className="bg-white pb-12">
      <JsonLd
        data={buildJsonLdGraph(
          buildWebPageNode({
            path: '/',
            title: 'Free NHS Pay & Salary Calculators (2026/2027) | NHS Staff Calculator',
            description:
              'Calculate your NHS take-home pay, pension contributions, overtime, shift enhancements, annual leave, and tax for 2026/2027 across England, Scotland, Wales, and NI.',
            pageType: 'WebPage',
            aboutId: SCHEMA_IDS.organization,
          }),
          buildFaqNode(HOMEPAGE_FAQS, '/')
        )}
      />
      {/* Emerald Hero Banner matching screenshot */}
      <section className="bg-[#149777] px-4 pb-10 pt-5 text-white sm:px-6 sm:pb-12 sm:pt-7">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0E7A60] px-3.5 py-1 text-xs font-medium text-white">
            <MapPin className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            <span>United Kingdom · 2026/2027 Tax Year</span>
          </div>

          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Free NHS Pay &amp; Salary Calculators
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
            Calculate your NHS take-home pay, pension contributions, overtime, shift payments and employment entitlements
          </p>

          <div className="mt-6">
            <CalculatorSearch />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Clean breathing space / unobtrusive ad placement */}
        <div className="pt-8">
          <AdSlot placement="between-sections" />
        </div>

        {/* 4-column Category & Popular Tools Grid ("Browse calculators by category") */}
        <section aria-labelledby="categories-heading" className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="categories-heading" className="font-display text-base font-bold text-[#2F3432] sm:text-lg">
              Browse calculators by category
            </h2>
            <Link
              href="/nhs-pay-calculators/"
              className="inline-flex min-h-[44px] items-center text-xs font-semibold text-[#0074BA] hover:underline sm:min-h-0 sm:text-sm"
            >
              View all {ALL_CALCULATORS.length} tools
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {browseTiles.map((tile, idx) => (
              <Link
                key={tile.href}
                href={tile.href}
                className="group flex items-center gap-3.5 rounded-lg p-1.5 transition-colors hover:bg-slate-50"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                    CATEGORY_ICON_STYLES[idx % CATEGORY_ICON_STYLES.length]
                  }`}
                >
                  <DynamicIcon name={tile.iconName} className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#2F3432] group-hover:text-[#149777]">
                    {tile.title}
                  </p>
                  <p className="text-xs text-slate-500">{tile.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 2-Column Featured Calculators ("Featured Calculators" with amber border & corner tag) */}
        <section aria-labelledby="featured-heading" className="mt-12">
          <h2 id="featured-heading" className="font-display text-base font-bold text-[#2F3432] sm:text-lg">
            Featured Calculators
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            {featuredCalculators.slice(0, 4).map((calc) => {
              const preview = FEATURED_PREVIEWS[calc.slug] ?? {
                badgeLabel: '2026/27 Verified',
                primaryFigure: '2026/27 UK',
                regionLabel: 'All UK Nations',
                metrics: [
                  { label: 'Tax Year', value: '2026/27' },
                  { label: 'Jurisdictions', value: '4 Nations' },
                  { label: 'Privacy', value: 'Local' },
                ],
              };

              return (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}/`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded border border-amber-300 bg-white p-4 pt-6 transition-shadow hover:shadow-md"
                >
                  <span className="absolute left-0 top-0 rounded-br bg-[#F59E0B] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    FEATURED
                  </span>

                  <div>
                    {/* 3-panel snapshot strip echoing the 3-image showcase in the screenshot */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {preview.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="min-w-0 rounded-sm border border-slate-100 bg-slate-50 px-1.5 py-2.5 text-center sm:px-2.5 sm:py-3"
                        >
                          <p className="truncate text-[10px] font-medium text-slate-500 sm:text-[11px]">
                            {metric.label}
                          </p>
                          <p className="mt-0.5 truncate font-mono text-[11px] font-bold tabular-nums text-[#2F3432] sm:text-sm">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <h3 className="mt-3.5 font-display text-base font-bold text-[#2F3432] group-hover:text-[#149777]">
                      {calc.shortTitle}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                      {calc.shortDescription}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded bg-sky-50 px-1.5 py-0.5 font-semibold text-[#0074BA]">
                        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                        <span>{preview.badgeLabel}</span>
                      </span>
                      <span className="text-slate-500">{preview.regionLabel}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
                    <span className="font-mono text-sm font-bold tabular-nums text-[#149777]">
                      {preview.primaryFigure}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0074BA] group-hover:underline">
                      <span>Open calculator</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Split Dual-CTA Card (Yellow CTA left, Blue CTA right — matching screenshot) */}
        <section aria-label="Featured actions" className="mt-10 rounded-lg border border-slate-200 bg-white shadow-xs">
          <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="flex items-center gap-5 p-5 sm:p-8">
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#149777] sm:flex">
                <Calculator className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-lg font-bold text-[#2F3432] sm:text-xl">
                  Calculate your 2026/27 take-home pay
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Check monthly net salary across England, Scotland, Wales &amp; NI with pension and tax deductions.
                </p>
                <Link
                  href="/nhs-pay-calculator/"
                  className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#FFC800] px-5 py-2 text-xs font-bold text-[#2F3432] transition-colors hover:bg-[#f2be00] sm:text-sm"
                >
                  <span>Open Pay Calculator</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-5 p-5 sm:p-8">
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-[#0074BA] sm:flex">
                <BookOpen className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-lg font-bold text-[#0074BA] sm:text-xl">
                  NHS Pay &amp; Pension Guides
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Read clear, verified guides on Agenda for Change pay bands, Section 2 unsocial hours, and NHS pension tiers.
                </p>
                <Link
                  href="/blog/"
                  className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#0074BA] px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#00619c] sm:text-sm"
                >
                  <span>Explore blog</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Column Soft-Gray Quick Links (links to all 26 calculators cleanly with pipe separators) */}
        <section aria-labelledby="quick-links-heading" className="mt-10">
          <h2 id="quick-links-heading" className="font-display text-base font-bold text-[#2F3432] sm:text-lg">
            Quick links
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: `${payCalcs.length} tools in NHS Pay`,
                items: payCalcs,
              },
              {
                title: `${pensionCalcs.length} tools in NHS Pension`,
                items: pensionCalcs,
              },
              {
                title: `${shiftCalcs.length} tools in Shifts & Overtime`,
                items: shiftCalcs,
              },
              {
                title: `${employmentAndTaxCalcs.length} tools in Leave & Tax`,
                items: employmentAndTaxCalcs,
              },
            ].map((group) => (
              <div key={group.title} className="rounded bg-[#F3F4F6] p-4">
                <h3 className="text-sm font-bold text-[#2F3432]">{group.title}</h3>
                <p className="mt-2 text-xs leading-7 text-slate-600 sm:leading-relaxed">
                  {group.items.map((calc, index) => (
                    <span key={calc.slug}>
                      {index > 0 && <span className="mx-1 text-slate-400">|</span>}
                      <Link
                        href={`/${calc.slug}/`}
                        className="inline-block py-0.5 hover:text-[#149777] hover:underline sm:py-0"
                      >
                        {calc.shortTitle}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Expandable "About ..." section matching screenshot's Show more pattern */}
        <ExpandableAboutSection>
          {/* How NHS Staff Calculator Works */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-lg font-bold text-[#2F3432]">
              How NHS Staff Calculator Works
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <p className="font-mono text-xs font-bold text-[#149777]">01. Choose Nation &amp; Contract</p>
                <p className="mt-1 text-sm font-semibold text-[#2F3432]">Jurisdiction-Aware Rules</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Select England, Wales, Scotland, or Northern Ireland to load the right pay scales, working hours, pension tiers, and Income Tax bands.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-[#149777]">02. Instant Local Calculation</p>
                <p className="mt-1 text-sm font-semibold text-[#2F3432]">Zero Data Collection</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  All calculations execute directly in your browser using centralised 2026/2027 payroll logic. No payslip or personal information leaves your device.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-[#149777]">03. Transparent Breakdown</p>
                <p className="mt-1 text-sm font-semibold text-[#2F3432]">Line-by-Line Clarity</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Inspect every tax band slice, pension percentage, National Insurance threshold, and official NHS Employers or GOV.UK source reference.
                </p>
              </div>
            </div>
          </div>

          {/* Latest NHS Guides */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-[#2F3432]">
                Latest NHS Pay &amp; Pension Guides
              </h3>
              <Link
                href="/blog/"
                className="inline-flex min-h-[44px] items-center text-xs font-semibold text-[#0074BA] hover:underline sm:min-h-0"
              >
                View blog →
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {BLOG_ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}/`}
                  className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-[#149777]"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <Image
                      src={article.featuredImage.src}
                      alt={article.featuredImage.alt}
                      width={article.featuredImage.width}
                      height={article.featuredImage.height}
                      sizes="(max-width: 768px) 100vw, 540px"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-500">
                      {article.categoryLabel} · {article.readTime} · Updated {article.lastUpdated}
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-[#2F3432] group-hover:text-[#149777]">
                      {article.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Why Use & Trust Information */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-display text-base font-bold text-[#2F3432]">
                Why Use NHS Staff Calculator?
              </h3>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#149777]" aria-hidden="true" />
                  <span>Dedicated UK NHS datasets covering England, Wales, Scotland, and Northern Ireland.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#149777]" aria-hidden="true" />
                  <span>Handles Scotland’s 36-hour working week, SPPA pension tiers, and six Scottish Income Tax bands.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#149777]" aria-hidden="true" />
                  <span>Distinguishes between AfC Section 2 unsocial hours, Section 3 overtime, and bank shifts.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#149777]" aria-hidden="true" />
                <h3 className="font-display text-base font-bold text-[#2F3432]">
                  Trust, Methodology &amp; Independence
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Every formula is cross-checked against publications from NHS Employers, NHSBSA, SPPA, GOV.UK, and HMRC.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-[#0074BA]">
                <Link href="/editorial-policy/" className="inline-flex min-h-[36px] items-center hover:underline sm:min-h-0">Editorial Policy</Link>
                <Link href="/disclaimer/" className="inline-flex min-h-[36px] items-center hover:underline sm:min-h-0">Disclaimer</Link>
                <Link href="/about/" className="inline-flex min-h-[36px] items-center hover:underline sm:min-h-0">About NHS Staff Calculator</Link>
              </div>
            </div>
          </div>

          <DisclaimerBanner />

          <FaqAccordion faqs={HOMEPAGE_FAQS} />
        </ExpandableAboutSection>
      </div>
    </div>
  );
}
