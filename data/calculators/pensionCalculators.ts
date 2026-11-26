import type { CalculatorDefinition } from '@/types/calculator';

export const PENSION_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-pension-calculator',
    title: 'NHS Pension Calculator (2026/2027)',
    shortTitle: 'NHS Pension Calculator',
    category: 'nhs-pension-calculators',
    iconName: 'ShieldCheck',
    metaTitle: 'NHS Pension Calculator 2026/2027 | Contributions & 1/54th CARE Accrual',
    metaDescription:
      'Calculate your 2026/2027 NHS Pension contribution rate, employer contribution, Net Pay tax relief, and projected 2015 CARE Scheme annual pension accrued.',
    shortDescription:
      'Estimate your 2026/27 member tier, employer contribution, tax relief, and annual 1/54th CARE retirement pension accrued.',
    intro:
      'Calculate your 2026/2027 NHS Pension Scheme employee and employer contributions, Net Pay tax relief, and projected 2015 CARE Scheme pension earned.',
    isPopular: true,
    isFeatured: true,
    howToUse: [
      'Choose England/Wales, Scotland (SPPA), or Northern Ireland to load the matching 2026/27 pension tier table.',
      'Enter your actual annual pensionable pay (basic pro-rata pay + HCAS + standard unsocial hours) and planned years of scheme membership.',
    ],
    howItWorks: [
      'Matches your actual pensionable pay to the 2026/27 NHSBSA or SPPA contribution tier, computes the 1/54th CARE annual pension earned each year, and models cumulative un-revalued pension over your chosen years.',
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
    assumptions: [
      'Models the 2015 CARE Scheme (1/54th accrual rate).',
      'Projected multi-year total is shown in today’s money before CPI + 1.5% active revaluation.',
    ],
    limitations: [
      'Does not include legacy 1995/2008 final salary pots or Added Years / ERRBO contracts.',
      'Does not calculate Annual Allowance or Lifetime Lump Sum commutation.',
    ],
    faqs: [
      {
        question: 'How is the 2015 NHS CARE pension calculated each year?',
        answer:
          'You accrue an annual pension equal to 1/54th of your total pensionable earnings in each scheme year (1 April to 31 March). That pot is revalued by CPI + 1.5% every April while you remain active.',
      },
      {
        question: 'Does the 23.7% employer contribution go into a cash pot?',
        answer:
          'No. Because the NHS Pension Scheme is a defined benefit scheme, employer and employee contributions fund the scheme as a whole while your retirement benefit is guaranteed by the 1/54th formula.',
      },
    ],
    relatedCalculators: [
      'nhs-pension-contribution-calculator',
      'nhs-pension-tax-relief-calculator',
      'nhs-pension-take-home-pay-calculator',
      'nhs-pay-calculator',
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
    metaTitle: 'NHS Pension Contribution Calculator 2026/2027 | Tier & Cliff Checker',
    metaDescription:
      'Check your exact 2026/27 NHSBSA or SPPA pension contribution percentage, monthly deduction, and headroom before crossing into the next whole-salary tier.',
    shortDescription:
      'Find your exact 2026/27 pension tier percentage, monthly deduction, and how close you are to the next contribution bracket.',
    intro:
      'Check which 2026/2027 NHS Pension contribution tier applies to your actual pensionable pay and how much headroom remains before the next tier threshold.',
    howToUse: [
      'Select your UK nation (England/Wales, Scotland SPPA, or Northern Ireland).',
      'Enter your actual annual basic salary plus any pensionable London HCAS and annual unsocial hours enhancements.',
    ],
    howItWorks: [
      'Sums your pensionable pay components, looks up the exact 2026/27 bracket, and computes both the monthly deduction and the exact pound distance to the next tier threshold.',
    ],
    payrollContext:
      'Because NHS pension tiers apply across your entire pensionable pay once crossed, even £100 of extra unsocial hours or a step increment near a threshold can lift your contribution rate by 1.3% to 1.8%.',
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
    assumptions: ['Uses 2026/27 NHSBSA (England/Wales) and SPPA Circular 2026/03 (Scotland) brackets.'],
    limitations: ['Mid-year tier reassessments can vary slightly by local payroll software rules.'],
    faqs: [
      {
        question: 'Can salary sacrifice keep me in a lower NHS pension tier?',
        answer:
          'Salary sacrifice (such as NHS Fleet cars or Cycle to Work) reduces pensionable pay, which can lower your pension tier—but it also slightly reduces your 1/54th CARE pension accrual.',
      },
    ],
    relatedCalculators: [
      'nhs-pension-calculator',
      'nhs-pension-tax-relief-calculator',
      'nhs-salary-sacrifice-calculator',
      'nhs-part-time-pay-calculator',
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
  {
    slug: 'nhs-pension-tax-relief-calculator',
    title: 'NHS Pension Tax Relief Calculator (2026/2027)',
    shortTitle: 'NHS Pension Tax Relief Calculator',
    category: 'nhs-pension-calculators',
    iconName: 'BadgePercent',
    metaTitle: 'NHS Pension Tax Relief Calculator 2026/2027 | Net Pay Tax Savings',
    metaDescription:
      'See how much Income Tax you save through NHS Pension Net Pay tax relief in 2026/2027 and calculate the true net out-of-pocket cost of your contributions.',
    shortDescription:
      'Calculate automatic Net Pay Income Tax relief at 19%–48% and find the true out-of-pocket cost of your NHS pension.',
    intro:
      'Discover how much Income Tax your NHS Pension contributions save automatically each month under HMRC Net Pay rules in 2026/2027.',
    howToUse: [
      'Select your UK nation so the right England/Wales/NI or Scottish Income Tax bands apply.',
      'Enter your annual pensionable gross salary (or pick an AfC band) to compare your tax bill with and without the NHS Pension Scheme.',
    ],
    howItWorks: [
      'Calculates your Income Tax with zero pension deductions versus your Income Tax after deducting your 2026/27 NHS Pension contribution, isolating the exact tax relief gained.',
    ],
    payrollContext:
      'Unlike Relief at Source private pensions where higher-rate taxpayers must claim extra relief via Self Assessment, the NHS Pension Scheme uses a Net Pay Arrangement—delivering full 20%, 40%, 42%, or 45% tax relief directly on your payslip.',
    example: {
      scenarioTitle: 'Band 7 Top Point (£56,515) in England',
      inputsSummary: ['Pensionable Salary: £56,515', 'Member Tier: 10.7% (£6,047.11/yr)'],
      outputsSummary: [
        { label: 'Gross Pension Contribution', value: '£6,047.11 / yr' },
        { label: 'Income Tax Saved (40% + 20% slices)', value: '£2,379.44 / yr' },
        { label: 'True Net Cost to Take-Home Pay', value: '£3,667.67 / yr (£305.64/mo)' },
        { label: 'Effective Tax Relief Rate', value: '39.3%' },
      ],
      explanation:
        'Almost all of the £6,047.11 pension deduction relieves 40% higher-rate tax, meaning £503.93/month of pension saving only reduces take-home pay by £305.64/month.',
    },
    assumptions: ['Assumes standard 1257L Personal Allowance and Net Pay Arrangement.'],
    limitations: ['Annual Allowance tax charges (£60,000 standard limit) are outside the scope of this payslip estimator.'],
    faqs: [
      {
        question: 'Do I need to complete a Self Assessment tax return to claim NHS pension tax relief?',
        answer:
          'No. Because the NHS Pension Scheme deducts contributions before Income Tax is calculated (Net Pay), higher-rate and additional-rate relief is already applied automatically through PAYE.',
      },
    ],
    relatedCalculators: [
      'nhs-pension-take-home-pay-calculator',
      'nhs-pension-calculator',
      'nhs-tax-calculator',
      'nhs-pension-contribution-calculator',
    ],
    relatedGuides: ['nhs-pension-contributions-explained'],
    officialSources: [
      {
        title: 'Tax on Your Private/Workplace Pension Contributions',
        publisher: 'GOV.UK',
        url: 'https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief',
        description: 'Official guidance on Net Pay Arrangement tax relief.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-pension-take-home-pay-calculator',
    title: 'NHS Pension Take Home Pay Calculator (2026/2027)',
    shortTitle: 'NHS Pension Take Home Pay Calculator',
    category: 'nhs-pension-calculators',
    iconName: 'Scale',
    metaTitle: 'NHS Pension Take Home Pay Calculator 2026/27 | Opt-In vs Opt-Out',
    metaDescription:
      'Compare your 2026/27 NHS monthly take-home pay opted into the NHS Pension Scheme versus opted out, including tax relief and employer contributions.',
    shortDescription:
      'Side-by-side Opt-In vs Opt-Out simulator showing exact monthly take-home difference, extra tax paid, and employer pension forfeited.',
    intro:
      'Compare your exact 2026/2027 NHS take-home pay with and without NHS Pension membership before making any decision on opting in or out.',
    howToUse: [
      'Select your UK nation, NHS salary (or Band/Step), HCAS zone, and any Student Loan plan.',
      'Review the side-by-side comparison showing Net Pay Opted In, Net Pay Opted Out, and the extra Income Tax you would pay if you opted out.',
    ],
    howItWorks: [
      'Runs the complete 2026/27 payroll calculation twice—once with pension active and once opted out—highlighting the net payslip difference alongside the 23.7% (or 22.5% Scotland) employer contribution.',
    ],
    payrollContext:
      'Opting out of the NHS Pension Scheme never increases your take-home pay by the full contribution percentage because HMRC immediately taxes the released pay at your marginal Income Tax rate.',
    example: {
      scenarioTitle: 'Band 5 Entry (£32,073) in England: Opt-In vs Opt-Out',
      inputsSummary: ['Gross Pay: £32,073', 'Pension Tier: 8.3%', 'Tax Rate: 20%'],
      outputsSummary: [
        { label: 'Monthly Net Pay (Opted In)', value: '£2,041.43 / mo' },
        { label: 'Monthly Net Pay (Opted Out)', value: '£2,218.90 / mo' },
        { label: 'Monthly Take-Home Difference', value: '£177.47 / mo' },
        { label: 'Employer Contribution Forfeited', value: '£633.44 / mo (23.7%)' },
      ],
      explanation:
        'Although the gross pension deduction is £221.84/month, opting out only adds £177.47/month to your bank account while forfeiting £633.44/month of employer backing and life cover.',
    },
    assumptions: ['Assumes standard 1257L tax code and single primary NHS employment.'],
    limitations: ['Informational comparison only; consult an FCA-regulated financial adviser before opting out of a defined benefit pension.'],
    faqs: [
      {
        question: 'Does opting out of the NHS pension change my National Insurance?',
        answer:
          'No. Employee National Insurance is calculated on gross pay regardless of whether you are in the NHS Pension Scheme, so opting out does not save or cost National Insurance.',
      },
    ],
    relatedCalculators: [
      'nhs-pension-calculator',
      'nhs-pension-tax-relief-calculator',
      'nhs-take-home-pay-calculator',
      'nhs-pay-calculator',
    ],
    relatedGuides: ['nhs-pension-contributions-explained'],
    officialSources: [
      {
        title: 'Leaving or Opting Out of the NHS Pension Scheme',
        publisher: 'NHSBSA',
        url: 'https://www.nhsbsa.nhs.uk/member-hub/leaving-or-taking-break-scheme',
        description: 'Official information on opting out and benefits lost.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
];
