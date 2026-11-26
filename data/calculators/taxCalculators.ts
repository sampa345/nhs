import type { CalculatorDefinition } from '@/types/calculator';

export const TAX_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-tax-calculator',
    title: 'NHS Tax Calculator (2026/2027)',
    shortTitle: 'NHS Tax Calculator',
    category: 'nhs-tax-calculators',
    iconName: 'Receipt',
    metaTitle: 'NHS Tax Calculator 2026/27 | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Income Tax across England, Wales, NI, and Scotland’s 6-band system—handling Personal Allowance taper, tax codes, and pension relief.',
    shortDescription:
      'Detailed band-by-band UK and Scottish Income Tax calculator for NHS staff, handling £100k+ allowance taper and Net Pay pension relief.',
    intro:
      'Break down your exact 2026/2027 NHS Income Tax bill across every HMRC or Scottish Income Tax band—accounting for your Personal Allowance, tax code, and pension relief.',
    isPopular: true,
    howToUse: [
      'Select England/Wales/Northern Ireland or Scotland so the exact 2026/27 UK (3-band) or Scottish (6-band) Income Tax schedule is loaded.',
      'Enter your annual gross NHS earnings and toggle whether you contribute to the NHS Pension Scheme (which automatically lowers taxable pay under Net Pay rules).',
      'Optionally override the default 1257L tax code (for example BR, D0, or adjusted codes) to view your band-by-band tax breakdown.',
    ],
    howItWorks: [
      'First deducts your 2026/27 NHS Pension contribution from gross pay under a Net Pay Arrangement, producing your Adjusted Net Income before Income Tax bands are applied.',
      'Applies your Personal Allowance (£12,570 under 1257L), tapering it by £1 for every £2 of taxable income over £100,000 until it reaches £0 at £125,140. Income above the allowance is then taxed slice by slice at 20%/40%/45% in England, Wales, and NI—or 19%/20%/21%/42%/45%/48% in Scotland.',
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
    referenceTable: {
      caption: '2026/27 Income Tax Bands: England/Wales/NI vs Scotland (Assuming £12,570 Personal Allowance)',
      headers: ['rUK Income Band', 'rUK Rate', 'Scottish Income Band', 'Scottish Rate'],
      rows: [
        ['Up to £12,570', '0% (PA)', 'Up to £12,570', '0% (PA)'],
        ['£12,571 – £50,270', '20% Basic', '£12,571 – £16,537', '19% Starter'],
        ['£50,271 – £125,140', '40% Higher', '£16,538 – £29,526', '20% Basic'],
        ['Over £125,140', '45% Additional', '£29,527 – £43,662', '21% Intermediate'],
        ['—', '—', '£43,663 – £75,000', '42% Higher'],
        ['—', '—', '£75,001 – £125,140', '45% Advanced'],
        ['—', '—', 'Over £125,140', '48% Top'],
      ],
    },
    assumptions: [
      'Uses 2026/2027 HMRC and Scottish Parliament Income Tax thresholds.',
      'NHS Pension deductions reduce taxable income under Net Pay rules before Income Tax is computed.',
    ],
    limitations: [
      'Does not model savings interest, dividend income, Gift Aid extensions, or Marriage Allowance transfers.',
      'Does not include Class 1 National Insurance or Student Loans; use the NHS Pay Calculator for a full payslip deduction summary.',
    ],
    faqs: [
      {
        question: 'Why does a 1257L tax code give £12,570 tax-free?',
        answer:
          'Multiply the numeric portion of a standard L-suffix tax code by 10 to find your annual tax-free Personal Allowance (£12,570 for 1257L in 2026/27).',
      },
      {
        question: 'Why do Scottish NHS staff pay more Income Tax on Band 6 and Band 7 salaries?',
        answer:
          'In 2026/27, Scotland’s 42% Higher Rate starts at £43,663 gross equivalent (whereas England’s 40% Higher Rate starts at £50,270), alongside 45% Advanced and 48% Top bands for senior clinicians.',
      },
      {
        question: 'What happens to my NHS Income Tax when taxable income passes £100,000?',
        answer:
          'Your £12,570 Personal Allowance shrinks by £1 for every £2 earned over £100,000, creating a 60% effective marginal tax rate in England (and 67.5% in Scotland) between £100,000 and £125,140—which NHS Pension contributions help reduce.',
      },
    ],
    relatedCalculators: [
      'nhs-pay-calculator',
      'nhs-national-insurance-calculator',
      'nhs-pension-calculator',
      'nhs-salary-sacrifice-calculator',
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
    metaTitle: 'NHS National Insurance Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 Class 1 Employee National Insurance (8% main rate, 2% upper rate) on NHS pay across annual, monthly, and weekly pay periods.',
    shortDescription:
      'Calculate Class 1 Employee National Insurance at 8% (£12,570–£50,270) and 2% (above £50,270) plus salary sacrifice NI savings.',
    intro:
      'Calculate your 2026/2027 Class 1 Employee National Insurance contributions across annual, monthly, and weekly pay periods.',
    howToUse: [
      'Enter your total gross annual NHS earnings (including London HCAS, unsocial hours enhancements, and paid overtime, all of which are NIable).',
      'Optionally enter any annual salary sacrifice amount (such as an NHS Fleet lease car or Cycle to Work) to isolate how much Class 1 NI you save.',
      'Inspect your NIable slices across the 0% Primary Threshold, 8% Main Rate, and 2% Upper Earnings rate.',
    ],
    howItWorks: [
      'Under 2026/27 HMRC Category A rules, earnings up to the £12,570 Primary Threshold (£1,048/month or £242/week) attract 0% employee NI. Earnings between £12,570 and the £50,270 Upper Earnings Limit (£4,189/month) are charged at 8%.',
      'Any earnings above £50,270 attract the 2% Upper Rate. Crucially, unlike Income Tax, NHS Pension contributions do not lower NIable pay—whereas contractual salary sacrifice reduces gross pay before NI is calculated.',
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
    referenceTable: {
      caption: '2026/27 HMRC Class 1 Employee National Insurance Thresholds (Category A)',
      headers: ['NI Threshold Band', 'Annual', 'Monthly', 'Weekly', 'Employee Rate'],
      rows: [
        ['Lower Earnings Limit (LEL)', '£6,708', '£559', '£129', '0% (qualifying year)'],
        ['Primary Threshold (PT)', '£12,570', '£1,048', '£242', '0% up to PT'],
        ['Main Rate Band (PT to UEL)', '£12,570 – £50,270', '£1,048 – £4,189', '£242 – £967', '8%'],
        ['Upper Earnings Limit (above UEL)', 'Over £50,270', 'Over £4,189', 'Over £967', '2%'],
      ],
    },
    assumptions: [
      'Assumes standard Category A Employee National Insurance under UK State Pension Age.',
      'Assumes single aggregated NHS payroll contract assessed evenly across the tax year.',
    ],
    limitations: [
      'Employees above State Pension Age (Category C) pay 0% employee National Insurance.',
      'PAYE calculates NI strictly per pay period (monthly or weekly), so large single-month overtime or back-pay spikes are not averaged across the year.',
    ],
    faqs: [
      {
        question: 'If I work two NHS jobs (e.g. substantive + separate Trust bank), is NI calculated differently?',
        answer:
          'If you work for two completely separate employers, each employer applies the £242/week (£1,048/month) Primary Threshold independently—though separate contracts under the same NHS Trust payroll are normally aggregated.',
      },
      {
        question: 'Does NHS Pension contribution reduce my National Insurance?',
        answer:
          'No. NHS Pension contributions lower your taxable pay for Income Tax relief, but Class 1 National Insurance is assessed on gross pay before NHS Pension deductions.',
      },
      {
        question: 'How does overtime affect National Insurance in a busy month?',
        answer:
          'Because NI is assessed per pay period rather than cumulatively over the year, overtime paid in a single month is charged 8% up to £4,189/month and only 2% on the slice above £4,189/month—with no automatic end-of-year refund.',
      },
    ],
    relatedCalculators: [
      'nhs-tax-calculator',
      'nhs-salary-sacrifice-calculator',
      'nhs-pay-calculator',
      'nhs-student-loan-calculator',
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
    metaTitle: 'NHS Salary Sacrifice Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate real net cost and tax, NI, and Student Loan savings on NHS Fleet cars or Cycle to Work in 2026/27—plus transparent 1/54th CARE pension impact.',
    shortDescription:
      'Calculate net monthly cost after Income Tax, NI, and Student Loan savings—plus transparent warning on CARE pension impact.',
    intro:
      'See the real net cost of an NHS salary sacrifice scheme—such as an NHS Fleet lease car or Cycle to Work—after Income Tax, National Insurance, and Student Loan savings in 2026/2027.',
    howToUse: [
      'Select your UK nation (England, Wales, Scotland, or Northern Ireland) and enter your gross annual NHS salary before sacrifice.',
      'Enter your monthly gross salary sacrifice deduction (such as an NHS Fleet EV lease, Cycle to Work, or home electronics scheme) and select any Student Loan plan.',
      'Compare your before-and-after payslip breakdown alongside the annual 1/54th CARE pension accrual impact.',
    ],
    howItWorks: [
      'Runs the complete 2026/27 NHS payslip model twice—once before salary sacrifice and once after subtracting the gross annual sacrifice from pensionable, taxable, NIable, and student-loanable pay.',
      'Isolates your Income Tax saved, Class 1 NI saved (8% or 2%), Student Loan reduction (9% or 6%), any NHS Pension tier change, and the exact 1/54th CARE retirement pension reduction (sacrifice ÷ 54 per year).',
    ],
    payrollContext:
      'NHS employees must be cautious with large salary sacrifice deductions (such as lease cars): because salary sacrifice reduces contractual pensionable pay, it lowers your 1/54th CARE pension earned in that year—though occasionally it can also drop your earnings below a pension contribution tier cliff.',
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
    referenceTable: {
      caption: '2026/27 Approximate Marginal Relief & CARE Impact per £100/mo Gross Sacrifice (England)',
      headers: ['Earnings Band', 'Tax + NI Saved', 'With Plan 2 Loan', '1/54th CARE Pension Reduction'],
      rows: [
        ['Basic Rate (20% Tax + 8% NI)', '£28.00 / mo', '£37.00 / mo', '£22.22 / yr accrued pension'],
        ['Higher Rate (40% Tax + 2% NI)', '£42.00 / mo', '£51.00 / mo', '£22.22 / yr accrued pension'],
        ['£100k–£125k Taper (60% + 2% NI)', '£62.00 / mo', '£71.00 / mo', '£22.22 / yr accrued pension'],
      ],
    },
    assumptions: [
      'Assumes benefit is Benefit-in-Kind exempt (such as Cycle to Work) or shows pre-BiK sacrifice cost; electric car BiK tax should be checked alongside.',
      'Models active 2015 NHS CARE Scheme membership.',
    ],
    limitations: [
      'Salary sacrifice cannot reduce hourly pay below the UK National Minimum or Living Wage.',
      'Lower pensionable pay during the 8-week maternity reference period can also reduce NHS Occupational Maternity Pay and SMP.',
    ],
    faqs: [
      {
        question: 'Does an NHS Fleet electric car affect my NHS Pension?',
        answer:
          'Yes. Because NHS Fleet Solutions uses salary sacrifice, it lowers your pensionable pay under the 2015 CARE scheme by the gross sacrifice amount—reducing your guaranteed 1/54th annual pension accrual for each year of the lease.',
      },
      {
        question: 'Can salary sacrifice reduce my Student Loan repayments?',
        answer:
          'Yes. Unlike normal NHS Pension deductions, contractual salary sacrifice lowers gross pay before Student Loan repayments are calculated—saving 9% (or 15% with a Postgraduate Loan) above your plan threshold.',
      },
      {
        question: 'Does salary sacrifice affect my NHS maternity or sick pay?',
        answer:
          'Yes. Because NHS Occupational Maternity Pay, SMP, and Occupational Sick Pay are calculated on post-sacrifice average weekly earnings, taking out a large lease car before the maternity qualifying weeks reduces maternity pay.',
      },
    ],
    relatedCalculators: [
      'nhs-pension-contribution-calculator',
      'nhs-national-insurance-calculator',
      'nhs-pay-calculator',
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
    metaTitle: 'NHS Student Loan Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Student Loan repayments for Plan 1 (£26,900), Plan 2 (£29,385), Plan 4 (£33,795), Plan 5 (£25,000), and Postgrad Loans (£21,000).',
    shortDescription:
      'Calculate PAYE Student Loan and concurrent Postgraduate Loan repayments across all 2026/27 thresholds using gross NIable NHS pay.',
    intro:
      'Estimate your 2026/2027 monthly and annual NHS Student Loan and Postgraduate Loan deductions using the updated April 2026 repayment thresholds.',
    howToUse: [
      'Enter your total annual gross NHS earnings (including basic pay, London HCAS, unsocial hours, and paid overtime, minus any salary sacrifice).',
      'Select your undergraduate loan plan (Plan 1, Plan 2, Plan 4 Scotland, or Plan 5) and toggle Postgraduate Loan if you hold a Master’s or Doctoral loan.',
      'Check your annual, monthly, and weekly repayments alongside the monthly threshold above which PAYE deductions begin.',
    ],
    howItWorks: [
      'Applies 9% on gross NIable income above the official 2026/27 threshold for Plans 1 (£26,900), 2 (£29,385), 4 (£33,795), and 5 (£25,000), plus a concurrent 6% above £21,000 for Postgraduate Loans.',
      'Crucially, NHS Pension contributions are NOT subtracted before Student Loan deductions are assessed—only genuine salary sacrifice schemes reduce repayment income.',
    ],
    payrollContext:
      'Many NHS clinicians are surprised to see Student Loan deductions calculated on gross pay before NHS Pension contributions are taken off. Only salary sacrifice lowers student loan repayment income.',
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
    referenceTable: {
      caption: '2026/27 UK Student Loan & Postgraduate Repayment Thresholds (PAYE)',
      headers: ['Loan Plan', 'Annual Threshold', 'Monthly Threshold', 'Weekly Threshold', 'Rate'],
      rows: [
        ['Plan 1 (pre-2012 E&W / NI)', '£26,900', '£2,241.67', '£517.30', '9%'],
        ['Plan 2 (2012–2023 E&W)', '£29,385', '£2,448.75', '£565.09', '9%'],
        ['Plan 4 (Scotland)', '£33,795', '£2,816.25', '£649.90', '9%'],
        ['Plan 5 (Aug 2023+ England)', '£25,000', '£2,083.33', '£480.76', '9%'],
        ['Postgraduate Loan', '£21,000', '£1,750.00', '£403.84', '6%'],
      ],
    },
    assumptions: [
      'Assumes steady monthly PAYE earnings across the tax year; payroll rounds each monthly deduction down to the nearest pound.',
      'Calculated on gross NIable pay prior to NHS Pension deductions.',
    ],
    limitations: [
      'Does not project total remaining loan balance, accruing RPI/CPI interest, or 25/30/40-year write-off dates.',
      'Does not model HMRC Direct Debit switch-over in the final 2 years before payoff.',
    ],
    faqs: [
      {
        question: 'Why did my Student Loan deduction jump in a month when I worked overtime?',
        answer:
          'PAYE calculates Student Loan repayments independently each pay period against 1/12th of the annual threshold (for example £2,448.75/month on Plan 2). A large overtime month triggers a 9% deduction on the spike, even if your annual pay sits below the threshold.',
      },
      {
        question: 'Do NHS Pension contributions reduce my Student Loan repayments?',
        answer:
          'No. Although NHS Pension contributions reduce taxable pay for Income Tax, HMRC calculates Student Loan deductions on gross NIable pay before pension deductions.',
      },
      {
        question: 'What if I have both a Plan 2 undergraduate loan and a Postgraduate Loan?',
        answer:
          'Both repayments run concurrently through NHS payroll: 6% above £21,000 for the Postgraduate Loan and 9% above £29,385 for Plan 2, giving a 15% combined deduction rate on earnings above £29,385.',
      },
    ],
    relatedCalculators: [
      'nhs-pay-calculator',
      'nhs-salary-sacrifice-calculator',
      'nhs-national-insurance-calculator',
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
