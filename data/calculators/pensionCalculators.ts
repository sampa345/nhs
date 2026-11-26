import type { CalculatorDefinition } from '@/types/calculator';

export const PENSION_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-pension-calculator',
    title: 'NHS Pension Calculator (2026/2027)',
    shortTitle: 'NHS Pension Calculator',
    category: 'nhs-pension-calculators',
    iconName: 'ShieldCheck',
    metaTitle: 'NHS Pension Calculator 2026/27 | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Pension contributions, employer funding, Net Pay tax relief, and projected 2015 CARE Scheme 1/54th annual retirement pension accrued.',
    shortDescription:
      'Estimate your 2026/27 member tier, employer contribution, tax relief, and annual 1/54th CARE retirement pension accrued.',
    intro:
      'Calculate your 2026/2027 NHS Pension Scheme employee and employer contributions, Net Pay tax relief, and projected 2015 CARE Scheme pension earned.',
    isPopular: true,
    isFeatured: true,
    howToUse: [
      'Choose England/Wales, Scotland (SPPA), or Northern Ireland to load the official 2026/27 pension tier schedule and employer funding rate.',
      'Enter your actual annual pensionable pay—combining pro-rata basic salary, London HCAS, and regular Section 2 unsocial hours enhancements.',
      'Set your planned years of active 2015 CARE Scheme membership to inspect annual employee cost, HMRC Net Pay tax relief, and projected retirement pension accrued.',
    ],
    howItWorks: [
      'Matches your actual annual pensionable pay against the 2026/27 NHSBSA (5.2%–12.5%), SPPA Circular 2026/03 (5.7%–12.7%), or HSC Northern Ireland tier brackets. Your contribution percentage is applied across your entire pensionable salary and deducted before Income Tax under Net Pay Arrangement rules.',
      'For retirement benefits, the 2015 NHS CARE (Career Average Revalued Earnings) Scheme credits 1/54th of your annual pensionable earnings into your guaranteed annual pension pot each scheme year (1 April to 31 March).',
      'Employer contributions (23.7% in England and Wales, 22.5% in Scotland, and 23.2% in Northern Ireland) are shown separately so you can see the total scheme funding backing your guaranteed index-linked pension.',
    ],
    payrollContext:
      'Under the 2015 NHS CARE Scheme, every year of pensionable earnings builds 1/54th of that pay as a guaranteed annual pension in retirement—revalued annually by CPI + 1.5% while you remain an active member.',
    example: {
      scenarioTitle: 'Band 6 Top Point (£48,117) Contributing for 20 Years (England)',
      inputsSummary: ['Pensionable Pay: £48,117', 'Jurisdiction: England (9.8% tier)', 'Years: 20'],
      outputsSummary: [
        { label: 'Annual Employee Contribution', value: '£4,715.47 (£392.96/mo)' },
        { label: 'Annual Employer Contribution (23.7%)', value: '£11,403.73' },
        { label: 'Annual CARE Pension Earned (1/54th)', value: '£891.06 / yr' },
        { label: '20-Year Base CARE Pension (before revaluation)', value: '£17,821.11 / yr' },
      ],
      explanation:
        'Each year of £48,117 pensionable pay earns £891.06 of guaranteed annual retirement income, before CPI + 1.5% annual Treasury Order revaluation.',
    },
    referenceTable: {
      caption: '2026/27 NHSBSA Employee Contribution Tiers & 1/54th Accrual Examples (England & Wales)',
      headers: ['Tier', 'Actual Pensionable Pay', 'Member Rate', 'Sample CARE Accrual (1/54th)'],
      rows: [
        ['Tier 1', 'Up to £13,259', '5.2%', '£222/yr at £12,000 pay'],
        ['Tier 2', '£13,260 – £28,854', '6.5%', '£468/yr at £25,272 pay'],
        ['Tier 3', '£28,855 – £35,155', '8.3%', '£594/yr at £32,073 pay'],
        ['Tier 4', '£35,156 – £52,778', '9.8%', '£891/yr at £48,117 pay'],
        ['Tier 5', '£52,779 – £67,668', '10.7%', '£1,047/yr at £56,515 pay'],
        ['Tier 6', '£67,669 and above', '12.5%', '£1,389/yr at £75,000 pay'],
      ],
    },
    assumptions: [
      'Models the 2015 CARE Scheme using the 1/54th annual accrual rate across active service.',
      'Multi-year projections are displayed in constant today’s money before CPI + 1.5% annual active revaluation.',
      'Net cost assumes standard 20% UK basic-rate or 40% higher-rate Net Pay tax relief depending on taxable pay.',
    ],
    limitations: [
      'Does not include legacy 1995 or 2008 final salary pension segments, Added Years, or ERRBO early retirement contracts.',
      'Does not calculate HMRC Annual Allowance tapering or lump-sum commutation (exchanging annual pension for tax-free cash).',
    ],
    faqs: [
      {
        question: 'How is the 2015 NHS CARE pension calculated each year?',
        answer:
          'You accrue an annual pension equal to 1/54th of your total pensionable earnings in each scheme year (1 April to 31 March). That pot is revalued by CPI + 1.5% every April while you remain an active member.',
      },
      {
        question: 'Does the 23.7% employer contribution go into a cash pot?',
        answer:
          'No. Because the NHS Pension Scheme is an unfunded defined-benefit scheme, employer and employee contributions fund current scheme pensions while your retirement benefit is guaranteed by the 1/54th formula.',
      },
      {
        question: 'How much Income Tax relief do I get on NHS Pension deductions?',
        answer:
          'Because NHS Payroll deducts pension contributions under a Net Pay Arrangement, you receive tax relief automatically at your highest marginal tax rate—20% for basic-rate taxpayers and 40% (or 42%/45%/48% in Scotland) for higher earners.',
      },
      {
        question: 'Are overtime and unsocial hours pensionable in the NHS Pension Scheme?',
        answer:
          'Regular Section 2 unsocial hours enhancements up to full-time contracted hours are pensionable and add to your 1/54th CARE pension, whereas Section 3 paid overtime above full-time hours (37.5h or 36h) is non-pensionable.',
      },
    ],
    relatedCalculators: [
      'nhs-pension-contribution-calculator',
      'nhs-pay-calculator',
      'nhs-tax-calculator',
      'nhs-salary-sacrifice-calculator',
    ],
    relatedGuides: ['nhs-pension-contributions-explained', 'nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'NHS Pension Scheme Member Hub',
        publisher: 'NHSBSA',
        url: 'https://www.nhsbsa.nhs.uk/member-hub',
        description: 'Official 2015 CARE Scheme rules and 2026/27 contribution tiers.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-pension-contribution-calculator',
    title: 'NHS Pension Contribution Calculator (2026/2027)',
    shortTitle: 'NHS Pension Contribution Calculator',
    category: 'nhs-pension-calculators',
    iconName: 'Percent',
    metaTitle: 'NHS Pension Contribution Calculator | NHS Staff Calculator',
    metaDescription:
      'Check your exact 2026/27 NHSBSA or SPPA pension contribution percentage, monthly deduction, and headroom before crossing into the next salary tier.',
    shortDescription:
      'Find your exact 2026/27 pension tier percentage, monthly deduction, and how close you are to the next contribution bracket.',
    intro:
      'Check which 2026/2027 NHS Pension contribution tier applies to your actual pensionable pay and how much headroom remains before the next tier threshold.',
    howToUse: [
      'Select your UK nation (England/Wales NHSBSA, Scotland SPPA, or Northern Ireland HSC) to load the right 2026/27 contribution brackets.',
      'Enter your actual annual pro-rata basic salary along with any pensionable London HCAS and annual unsocial hours enhancements.',
      'Review your matched percentage, monthly and annual deduction, and the exact pound distance remaining before hitting the next tier cliff.',
    ],
    howItWorks: [
      'Totals your actual pensionable earnings (basic pay plus HCAS and regular Section 2 unsocial enhancements, rather than whole-time equivalent) and locates the matching 2026/27 contribution bracket.',
      'Unlike Income Tax brackets which tax only the slice above a threshold, NHS Pension contribution rates are whole-salary tiers: crossing a tier boundary by even £1 increases the percentage applied to your entire pensionable pay.',
      'The calculator also computes the remaining headroom in pounds to the next tier ceiling so you can spot cliff edges caused by increment steps, extra unsocial shifts, or salary sacrifice.',
    ],
    payrollContext:
      'Because NHS pension tiers apply across your entire pensionable pay once crossed, even £100 of extra unsocial hours or a step increment near a threshold (such as £35,155 or £52,778 in England) can lift your contribution rate by 0.9% to 1.8%.',
    example: {
      scenarioTitle: 'Band 5 Intermediate (£34,592) with £1,200 Unsocial Pay (England)',
      inputsSummary: ['Basic Pay: £34,592', 'Pensionable Unsocial Pay: £1,200', 'Total Pensionable: £35,792'],
      outputsSummary: [
        { label: 'Matched 2026/27 Tier', value: '9.8% (£35,156 – £52,778)' },
        { label: 'Monthly Deduction', value: '£292.30 / mo' },
        { label: 'Headroom to 10.7% Tier', value: '£16,986.00' },
      ],
      explanation:
        'Without unsocial hours (£34,592), this employee sits in the 8.3% tier; adding £1,200 of pensionable unsocial pay crosses £35,156 into the 9.8% tier.',
    },
    referenceTable: {
      caption: '2026/27 NHS Scotland (SPPA Circular 2026/03) vs England/Wales Tier Thresholds',
      headers: ['Scotland Pensionable Pay', 'SPPA Rate', 'England/Wales Pay', 'NHSBSA Rate'],
      rows: [
        ['Up to £13,330', '5.7%', 'Up to £13,259', '5.2%'],
        ['£13,331 – £27,940', '6.4%', '£13,260 – £28,854', '6.5%'],
        ['£27,941 – £33,062', '7.0%', '£28,855 – £35,155', '8.3%'],
        ['£33,063 – £41,482', '8.7%', '£35,156 – £52,778', '9.8%'],
        ['£41,483 – £43,502', '9.8%', '£52,779 – £67,668', '10.7%'],
        ['£43,503 – £52,879', '10.5%', '£67,669+', '12.5%'],
        ['£52,880 – £57,223', '11.2%', '—', '—'],
      ],
    },
    assumptions: [
      'Uses 2026/27 NHSBSA (England/Wales) and SPPA Circular 2026/03 (Scotland) member contribution tiers.',
      'Part-time staff are tiered on actual pensionable earnings, not whole-time equivalent (WTE) salary.',
    ],
    limitations: [
      'Mid-year tier reassessments for variable unsocial hours can vary slightly depending on local Trust ESR configuration.',
      'Does not project tax-free cash lump sums or 1995/2008 legacy scheme protections.',
    ],
    faqs: [
      {
        question: 'Can salary sacrifice keep me in a lower NHS pension tier?',
        answer:
          'Salary sacrifice (such as NHS Fleet lease cars or Cycle to Work) reduces pensionable pay, which can drop you below a tier boundary—but it also slightly reduces your 1/54th CARE pension accrual for that year.',
      },
      {
        question: 'Are part-time NHS staff assessed on full-time or actual pay for pension tiers?',
        answer:
          'Since April 2024, NHSBSA and SPPA assess all part-time staff on their actual annualised pensionable pay rather than whole-time equivalent salary, preventing lower-hour staff from paying higher-band contribution percentages.',
      },
      {
        question: 'What happens if an increment or unsocial pay pushes me over a pension cliff?',
        answer:
          'Crossing a tier boundary raises your deduction rate across all pensionable pay, not just the excess. Because pension contributions receive Income Tax relief, the net take-home impact is 20% to 40% smaller than the gross deduction jump.',
      },
    ],
    relatedCalculators: [
      'nhs-pension-calculator',
      'nhs-salary-sacrifice-calculator',
      'nhs-pay-calculator',
      'nhs-tax-calculator',
    ],
    relatedGuides: ['nhs-pension-contributions-explained'],
    officialSources: [
      {
        title: 'NHSBSA Member Contribution Tiers 2026/27',
        publisher: 'NHSBSA',
        url: 'https://www.nhsbsa.nhs.uk/member-hub/cost-being-scheme',
        description: 'Official 2026/27 tier boundaries effective 1 April 2026.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
];
