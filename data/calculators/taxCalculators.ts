import type { CalculatorDefinition } from '@/types/calculator';

export const TAX_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-tax-calculator',
    title: 'NHS Tax Calculator (2026/2027)',
    shortTitle: 'NHS Tax Calculator',
    category: 'nhs-tax-calculators',
    iconName: 'Receipt',
    metaTitle: 'NHS Tax Calculator 2026/2027 | UK & Scottish Income Tax Bands',
    metaDescription:
      'Calculate your 2026/2027 NHS Income Tax across England, Wales, Northern Ireland, and Scotland’s 6-band system, including Personal Allowance taper and pension tax relief.',
    shortDescription:
      'Detailed band-by-band UK and Scottish Income Tax calculator for NHS staff, handling £100k+ allowance taper and Net Pay pension relief.',
    intro:
      'Break down your exact 2026/2027 NHS Income Tax bill across every HMRC or Scottish Income Tax band—accounting for your Personal Allowance, tax code, and pension relief.',
    howToUse: [
      'Select England/Wales/Northern Ireland or Scotland to apply the correct 2026/27 tax brackets.',
      'Enter your annual gross NHS income, choose whether NHS Pension deductions apply, and optionally override your HMRC tax code.',
    ],
    howItWorks: [
      'Subtracts NHS Pension contributions from gross pay first under Net Pay rules, applies your effective Personal Allowance (tapering £1 per £2 over £100,000), and calculates tax slice by slice.',
    ],
    payrollContext:
      'Scottish NHS staff pay 19% Starter, 20% Basic, 21% Intermediate, 42% Higher (starting at £43,663), 45% Advanced, and 48% Top rate tax in 2026/27—differing materially from the £50,270 Higher Rate threshold in England, Wales, and Northern Ireland.',
    example: {
      scenarioTitle: 'Band 7 Entry (£49,387 in England vs £52,845 in Scotland)',
      inputsSummary: ['England Band 7 Entry: £49,387 (9.8% pension)', 'Taxable Pay: £44,547.07'],
      outputsSummary: [
        { label: 'Personal Allowance (0%)', value: '£12,570.00' },
        { label: 'Basic Rate Slice (20%)', value: '£31,977.07 -> £6,395.41 tax' },
        { label: 'Higher Rate Slice (40%)', value: '£0.00' },
        { label: 'Total Income Tax', value: '£6,395.41 / yr (£532.95/mo)' },
      ],
      explanation: 'Pension deductions keep taxable pay below the £50,270 England Higher Rate threshold.',
    },
    assumptions: ['Uses 2026/2027 HMRC and Scottish Parliament Income Tax thresholds.'],
    limitations: ['Does not model savings interest, dividend income, or Marriage Allowance transfers.'],
    faqs: [
      {
        question: 'Why does a 1257L tax code give £12,570 tax-free?',
        answer:
          'Multiply the numeric portion of a standard L-suffix tax code by 10 to find your annual tax-free Personal Allowance (£12,570 for 1257L in 2026/27).',
      },
    ],
    relatedCalculators: [
      'nhs-salary-after-tax-calculator',
      'nhs-national-insurance-calculator',
      'nhs-pension-tax-relief-calculator',
      'nhs-pay-calculator',
    ],
    relatedGuides: ['nhs-pension-contributions-explained', 'nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Income Tax Rates and Personal Allowances',
        publisher: 'GOV.UK',
        url: 'https://www.gov.uk/income-tax-rates',
        description: 'Official 2026/27 UK tax thresholds.',
      },
      {
        title: 'Scottish Income Tax Rates and Bands',
        publisher: 'GOV.UK / mygov.scot',
        url: 'https://www.gov.uk/scottish-income-tax',
        description: 'Official 2026/27 Scottish Income Tax thresholds.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-national-insurance-calculator',
    title: 'NHS National Insurance Calculator (2026/2027)',
    shortTitle: 'NHS National Insurance Calculator',
    category: 'nhs-tax-calculators',
    iconName: 'Landmark',
    metaTitle: 'NHS National Insurance Calculator 2026/2027 | Class 1 Employee NI',
    metaDescription:
      'Calculate your 2026/2027 Class 1 Employee National Insurance (8% main rate, 2% upper rate) on NHS pay, including salary sacrifice NI reductions.',
    shortDescription:
      'Calculate Class 1 Employee National Insurance at 8% (£12,570–£50,270) and 2% (above £50,270) plus salary sacrifice NI savings.',
    intro:
      'Calculate your 2026/2027 Class 1 Employee National Insurance contributions across annual, monthly, and weekly pay periods.',
    howToUse: [
      'Enter your gross annual NHS earnings (including HCAS, unsocial hours, and overtime, which are all NIable).',
      'Optionally enter any annual salary sacrifice deductions (such as NHS Fleet car lease or Cycle to Work) to see how much NI you save.',
    ],
    howItWorks: [
      'Charges 0% up to the £12,570 Primary Threshold, 8% on earnings between £12,570 and £50,270, and 2% on earnings above £50,270.',
    ],
    payrollContext:
      'Unlike Income Tax, NHS Pension Scheme contributions do not lower your Class 1 National Insurance bill—only genuine salary sacrifice schemes reduce NIable pay.',
    example: {
      scenarioTitle: 'Band 6 Top Point (£48,117) with No Salary Sacrifice',
      inputsSummary: ['Gross NIable Pay: £48,117', 'Primary Threshold: £12,570', 'Upper Earnings Limit: £50,270'],
      outputsSummary: [
        { label: 'Earnings at 8% Main Rate', value: '£35,547.00' },
        { label: 'Earnings at 2% Upper Rate', value: '£0.00' },
        { label: 'Annual National Insurance', value: '£2,843.76' },
        { label: 'Monthly National Insurance', value: '£236.98 / mo' },
      ],
      explanation: 'All earnings above £12,570 sit within the 8% main Class 1 bracket.',
    },
    assumptions: ['Assumes Category A Employee NI under State Pension Age.'],
    limitations: ['Employees above State Pension Age (Category C) pay 0% employee NI.'],
    faqs: [
      {
        question: 'If I work two NHS jobs (e.g. substantive + separate Trust bank), is NI calculated differently?',
        answer:
          'If you work for two completely separate employers, each employer applies the £242/week (£1,048/month) Primary Threshold independently—though separate contracts under the same NHS Trust payroll are normally aggregated.',
      },
    ],
    relatedCalculators: [
      'nhs-tax-calculator',
      'nhs-salary-sacrifice-calculator',
      'nhs-salary-after-tax-calculator',
      'nhs-take-home-pay-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'National Insurance Rates and Categories',
        publisher: 'GOV.UK',
        url: 'https://www.gov.uk/national-insurance-rates-letters',
        description: 'Official 2026/27 Class 1 Primary Threshold (£12,570) and UEL (£50,270).',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-salary-sacrifice-calculator',
    title: 'NHS Salary Sacrifice Calculator (2026/2027)',
    shortTitle: 'NHS Salary Sacrifice Calculator',
    category: 'nhs-tax-calculators',
    iconName: 'Car',
    metaTitle: 'NHS Salary Sacrifice Calculator 2026/2027 | Fleet Cars & Cycle to Work',
    metaDescription:
      'Calculate real net cost and tax, NI, and Student Loan savings on NHS Fleet Solutions lease cars, Cycle to Work, or technology salary sacrifice in 2026/2027.',
    shortDescription:
      'Calculate net monthly cost after Income Tax, NI, and Student Loan savings—plus transparent warning on CARE pension impact.',
    intro:
      'See the real net cost of an NHS salary sacrifice scheme—such as an NHS Fleet lease car or Cycle to Work—after Income Tax, National Insurance, and Student Loan savings in 2026/2027.',
    howToUse: [
      'Select your UK nation and enter your gross annual NHS salary before sacrifice.',
      'Enter the monthly gross salary sacrifice amount (and any Student Loan plan) to compare before and after take-home pay.',
    ],
    howItWorks: [
      'Runs the 2026/27 payslip model with and without the sacrifice deduction, isolating exact Income Tax saved, National Insurance saved, Student Loan reduction, and CARE pension accrual impact.',
    ],
    payrollContext:
      'NHS employees must be cautious with large salary sacrifice deductions (such as lease cars): because salary sacrifice reduces contractual pensionable pay, it can reduce your 1/54th CARE pension earned in that year—though occasionally it can also drop your earnings into a lower pension tier.',
    example: {
      scenarioTitle: 'Band 6 Entry (£39,959) with £350/Month Gross Lease Sacrifice (England)',
      inputsSummary: ['Gross Salary: £39,959', 'Monthly Sacrifice: £350 (£4,200/yr)', 'Plan 2 Student Loan: Yes'],
      outputsSummary: [
        { label: 'Gross Annual Sacrifice', value: '£4,200.00' },
        { label: 'Tax + NI + Student Loan Saved', value: '£1,500.28 / yr' },
        { label: 'Net Take-Home Reduction (with pension tier change)', value: '£189.03 / mo' },
        { label: 'CARE Pension Accrual Reduced By', value: '£77.78 / yr retirement pension' },
      ],
      explanation:
        'Tax, NI, and Student Loan relief covers over a third of the £350/month gross cost, while lower pensionable pay trims CARE accrual by £77.78/year.',
    },
    assumptions: ['Assumes benefit is exempt from Benefit-in-Kind or excludes EV BiK tax charge (which should be checked separately for electric vehicles).'],
    limitations: ['Salary sacrifice cannot reduce hourly pay below the UK National Minimum/Living Wage.'],
    faqs: [
      {
        question: 'Does an NHS Fleet electric car affect my NHS Pension?',
        answer:
          'Yes. Because NHS Fleet Solutions uses salary sacrifice, it lowers your pensionable pay under the 2015 CARE scheme by the gross sacrifice amount—meaning slightly less pension built for each year of the lease.',
      },
    ],
    relatedCalculators: [
      'nhs-pension-contribution-calculator',
      'nhs-national-insurance-calculator',
      'nhs-take-home-pay-calculator',
      'nhs-student-loan-calculator',
    ],
    relatedGuides: ['nhs-pension-contributions-explained'],
    officialSources: [
      {
        title: 'Salary Sacrifice & Your NHS Pension',
        publisher: 'NHSBSA',
        url: 'https://www.nhsbsa.nhs.uk/member-hub',
        description: 'Guidance on how salary sacrifice interacts with CARE pensionable pay.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-student-loan-calculator',
    title: 'NHS Student Loan Calculator (2026/2027)',
    shortTitle: 'NHS Student Loan Calculator',
    category: 'nhs-tax-calculators',
    iconName: 'GraduationCap',
    metaTitle: 'NHS Student Loan Calculator 2026/2027 | Plans 1, 2, 4, 5 & Postgrad',
    metaDescription:
      'Calculate your 2026/2027 NHS Student Loan repayments for Plan 1 (£26,900), Plan 2 (£29,385), Plan 4 (£33,795), Plan 5 (£25,000), and Postgraduate Loans (£21,000).',
    shortDescription:
      'Calculate PAYE Student Loan and concurrent Postgraduate Loan repayments across all 2026/27 thresholds using gross NIable NHS pay.',
    intro:
      'Estimate your 2026/2027 monthly and annual NHS Student Loan and Postgraduate Loan deductions using the updated April 2026 repayment thresholds.',
    howToUse: [
      'Enter your total annual gross NHS earnings (including London HCAS, unsocial hours, and overtime, minus any salary sacrifice).',
      'Select your undergraduate loan plan (Plan 1, 2, 4, or 5) and toggle Postgraduate Loan if you also hold a Master’s or Doctoral loan.',
    ],
    howItWorks: [
      'Applies 9% above the 2026/27 plan threshold (Plan 1: £26,900, Plan 2: £29,385, Plan 4: £33,795, Plan 5: £25,000) and 6% above £21,000 for Postgraduate Loans—without subtracting NHS Pension contributions.',
    ],
    payrollContext:
      'Many NHS clinicians are surprised to see Student Loan deductions calculated on gross pay before NHS Pension contributions are taken off. Only salary sacrifice reduces student loan repayment income.',
    example: {
      scenarioTitle: 'Band 5 Top (£39,043) with Plan 2 + Postgraduate Loan (2026/27)',
      inputsSummary: ['Gross Pay: £39,043', 'Plan 2 Threshold: £29,385 (9%)', 'Postgrad Threshold: £21,000 (6%)'],
      outputsSummary: [
        { label: 'Plan 2 Repayment (9%)', value: '£869.22 / yr (£72.44/mo)' },
        { label: 'Postgraduate Repayment (6%)', value: '£1,082.58 / yr (£90.22/mo)' },
        { label: 'Combined Loan Deduction', value: '£1,951.80 / yr (£162.65/mo)' },
      ],
      explanation: 'Having both loans means a combined 15% marginal deduction rate on income above £29,385.',
    },
    assumptions: ['Assumes regular monthly PAYE earnings rather than single-month overtime spikes (though payroll assesses each pay period separately).'],
    limitations: ['Does not project loan balance write-off dates or interest rates.'],
    faqs: [
      {
        question: 'Why did my Student Loan deduction jump in a month when I worked overtime?',
        answer:
          'PAYE calculates Student Loan repayments independently each pay period against 1/12th of the annual threshold (for example £2,448.75/month on Plan 2). A large overtime month triggers 9% deduction on the spike, even if your annual pay is lower.',
      },
    ],
    relatedCalculators: [
      'nhs-take-home-pay-calculator',
      'nhs-salary-sacrifice-calculator',
      'nhs-pay-calculator',
      'nhs-tax-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Repaying Your Student Loan: Thresholds 2026/27',
        publisher: 'GOV.UK',
        url: 'https://www.gov.uk/repaying-your-student-loan/what-you-pay',
        description: 'Official 2026/27 Plan 1, 2, 4, 5, and Postgraduate thresholds.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
];
