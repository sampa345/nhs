import type { CalculatorDefinition } from '@/types/calculator';

export const PAY_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-pay-calculator',
    title: 'NHS Pay Calculator (2026/2027)',
    shortTitle: 'NHS Pay Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'Calculator',
    metaTitle: 'NHS Pay Calculator 2026/2027 | UK Agenda for Change & Take-Home',
    metaDescription:
      'Calculate your 2026/2027 NHS pay across England, Scotland, Wales, and Northern Ireland. Includes Agenda for Change bands 2–9, HCAS, pension, tax, NI, and loans.',
    shortDescription:
      'All-in-one 2026/2027 NHS salary and net take-home pay calculator supporting AfC bands, London HCAS, pension tiers, and UK nations.',
    intro:
      'Estimate your gross NHS salary and net take-home pay for the 2026/2027 tax year across England, Wales, Scotland, and Northern Ireland.',
    isPopular: true,
    isFeatured: true,
    howToUse: [
      'Choose your UK nation (England, Wales, Scotland, or Northern Ireland) so the correct 2026/27 pay scales, standard weekly hours, pension tiers, and tax bands are applied.',
      'Select your Agenda for Change pay band and pay point—or switch to Custom Salary if you are a doctor, dentist, or medical/VSM colleague.',
      'Add any High Cost Area Supplement (London weighting), contracted weekly hours, NHS Pension membership, and Student Loan plan.',
    ],
    howItWorks: [
      'Pro-rata basic pay is derived by scaling the full-time Agenda for Change salary by your contracted hours relative to 37.5 hours (or 36 hours in Scotland).',
      'London HCAS is applied within official 2026/27 minimum and maximum caps and scaled pro-rata for part-time contracts.',
      'NHS Pension contributions are deducted first under a Net Pay Arrangement for Income Tax relief, followed by UK/Scottish Income Tax, Class 1 National Insurance, and Student Loans.',
    ],
    payrollContext:
      'For 2026/2027, England and Wales Agenda for Change salaries incorporate the 3.3% uplift effective 1 April 2026, while NHS Scotland operates a 36-hour standard working week with distinct STAC pay points and SPPA pension tiers.',
    example: {
      scenarioTitle: 'Band 5 Nurse (England Entry Point, Outside London)',
      inputsSummary: [
        'Jurisdiction: England (37.5h/week)',
        'Pay Point: Band 5 Entry (£32,073)',
        'NHS Pension: Opted In (8.3% tier)',
        'Student Loan: Plan 2',
      ],
      outputsSummary: [
        { label: 'Gross Annual Pay', value: '£32,073.00' },
        { label: 'NHS Pension (8.3%)', value: '£2,662.06 / yr' },
        { label: 'Income Tax & NI', value: '£4,913.83 / yr' },
        { label: 'Student Loan (Plan 2)', value: '£241.92 / yr' },
        { label: 'Estimated Monthly Net Pay', value: '£2,021.27 / mo' },
      ],
      explanation:
        'Pension contributions lower taxable income from £32,073 to £29,410.94 before 20% Income Tax is applied, while NI (8%) and Plan 2 Student Loan (9%) are assessed on gross pay above their respective thresholds.',
    },
    assumptions: [
      'Assumes standard 1257L tax code and Category A National Insurance unless specified.',
      'Overtime is excluded from pensionable pay; standard unsocial enhancements are pensionable.',
    ],
    limitations: [
      'Does not model Trust-specific local recruitment and retention premia (RRP) unless entered via custom salary or supplements.',
      'Medical and dental staff should select Custom Salary to enter their exact nodal point and supplements.',
    ],
    faqs: [
      {
        question: 'Does this NHS Pay Calculator include the 2026/27 pay rise?',
        answer:
          'Yes. England and Wales scales reflect the 3.3% 2026/27 Agenda for Change award effective 1 April 2026, and Scotland reflects the 2026/27 STAC pay circular.',
      },
      {
        question: 'Why are my Northern Ireland results labelled as parity?',
        answer:
          'Northern Ireland HSC pay normally mirrors UK PRB parity recommendations (3.3%), though formal payout timing depends on Department of Health NI executive sign-off. You can override the salary manually at any time.',
      },
    ],
    relatedCalculators: [
      'nhs-take-home-pay-calculator',
      'nhs-band-calculator',
      'nhs-pension-calculator',
      'nhs-unsocial-hours-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained', 'nhs-pension-contributions-explained'],
    officialSources: [
      {
        title: 'NHS Employers Agenda for Change Pay Scales',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official AfC terms, pay bands, and HCAS thresholds.',
      },
      {
        title: 'Income Tax & National Insurance Rates 2026/27',
        publisher: 'GOV.UK / HMRC',
        url: 'https://www.gov.uk/income-tax-rates',
        description: 'UK statutory tax bands and Personal Allowance rules.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-take-home-pay-calculator',
    title: 'NHS Take Home Pay Calculator (2026/2027)',
    shortTitle: 'NHS Take Home Pay Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'Wallet',
    metaTitle: 'NHS Take Home Pay Calculator 2026/2027 | Net Monthly Payslip',
    metaDescription:
      'Estimate your net NHS take-home pay per month, 4 weeks, or week in 2026/2027. Supports custom HMRC tax codes, salary sacrifice, unsocial hours, and student loans.',
    shortDescription:
      'Detailed payslip simulator with custom HMRC tax code support, salary sacrifice, unsocial supplements, and 4-weekly or monthly frequency.',
    intro:
      'Simulate your actual 2026/2027 NHS payslip after Income Tax, National Insurance, NHS Pension contributions, salary sacrifice, and Student Loan deductions.',
    isPopular: true,
    howToUse: [
      'Enter your gross annual salary or pick your Agenda for Change Band and Step.',
      'Enter your HMRC tax code from your latest NHS payslip (for example 1257L, S1257L, BR, or 0T).',
      'Add monthly unsocial hours pay, salary sacrifice deductions (such as NHS Fleet car lease), and choose monthly or 4-weekly pay frequency.',
    ],
    howItWorks: [
      'Salary sacrifice is subtracted from gross pay before Income Tax, National Insurance, Student Loans, and CARE pensionable pay are assessed.',
      'Your tax code sets your tax-free Personal Allowance (or applies a flat rate such as BR 20% or D0 40% for second jobs/bank contracts).',
    ],
    payrollContext:
      'Many NHS Trusts pay monthly on a fixed calendar date, while some bank roles pay weekly or four-weekly. Switching pay frequency lets you check the exact cash landing in your bank each pay run.',
    example: {
      scenarioTitle: 'Band 6 Senior Nurse with Unsocial Hours & Salary Sacrifice',
      inputsSummary: [
        'England Band 6 Intermediate (£42,170)',
        'Average Unsocial Hours: £350/month (£4,200/yr)',
        'Salary Sacrifice (Cycle/Car): £250/month (£3,000/yr)',
        'Tax Code: 1257L | Pension: Opted In',
      ],
      outputsSummary: [
        { label: 'Total Gross Pay', value: '£46,370.00 / yr' },
        { label: 'Pensionable Pay (after sacrifice)', value: '£43,370.00 / yr' },
        { label: 'NHS Pension (9.8%)', value: '£4,250.26 / yr' },
        { label: 'Estimated Monthly Net Pay', value: '£2,638.79 / mo' },
      ],
      explanation:
        'Salary sacrifice reduces taxable and NIable pay by £3,000, saving tax and NI alongside the Net Pay tax relief on the 9.8% NHS pension deduction.',
    },
    assumptions: [
      'Assumes Category A employee National Insurance.',
      'Assumes uniform earnings across 12 pay periods when estimating annual tax.',
    ],
    limitations: [
      'Does not model cumulative PAYE mid-year tax code adjustments or unpaid leave deductions.',
    ],
    faqs: [
      {
        question: 'What happens if I enter a BR tax code for an NHS Bank role?',
        answer:
          'A BR tax code applies a flat 20% Income Tax deduction from the first pound earned because your Personal Allowance is already used on your main substantive NHS post.',
      },
      {
        question: 'Why does my actual NHS payslip vary slightly from month to month?',
        answer:
          'Unsocial hours enhancements, overtime, and bank shifts are often paid one month in arrears, which can push a single month’s PAYE deductions slightly higher or lower.',
      },
    ],
    relatedCalculators: [
      'nhs-pay-calculator',
      'nhs-salary-after-tax-calculator',
      'nhs-salary-sacrifice-calculator',
      'nhs-pension-take-home-pay-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained', 'nhs-pension-contributions-explained'],
    officialSources: [
      {
        title: 'Tax Codes Explained',
        publisher: 'GOV.UK / HMRC',
        url: 'https://www.gov.uk/tax-codes',
        description: 'Official guide to 1257L, BR, D0, K, and S-prefix Scottish tax codes.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-salary-calculator',
    title: 'NHS Salary Calculator (2026/2027)',
    shortTitle: 'NHS Salary Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'TrendingUp',
    metaTitle: 'NHS Salary Calculator 2026/2027 | Gross Pay, Uplift & Period Converter',
    metaDescription:
      'Convert any NHS Agenda for Change or medical salary into annual, monthly, 4-weekly, weekly, daily, and hourly gross figures—and model custom pay rise percentages.',
    shortDescription:
      'Compare gross NHS salary across pay periods and simulate the impact of a pay rise, increment step, or band promotion.',
    intro:
      'Convert your NHS annual salary across monthly, weekly, daily, and hourly periods—and model what a pay award or band promotion adds to your gross earnings.',
    howToUse: [
      'Select your UK nation and either pick an Agenda for Change pay point or enter a custom annual salary (ideal for doctors, dentists, or VSM roles).',
      'Optionally adjust the "Pay Rise / Promotion Comparison (%)" slider to compare your current salary against an uplifted figure.',
    ],
    howItWorks: [
      'Annual gross salary (including optional London HCAS) is divided by 12 for monthly, 13 for four-weekly, 52.1429 for weekly, and standard annual hours (1,955.36h in rUK or 1,877.14h in Scotland) for hourly figures.',
    ],
    payrollContext:
      'When comparing job offers across NHS England and NHS Scotland, always check both the headline salary and the standard weekly working hours (37.5h vs 36h), as the hourly rate gap can be larger than the annual difference.',
    example: {
      scenarioTitle: 'Band 5 Top Point (£39,043) Comparing +5% Uplift or Promotion',
      inputsSummary: ['Base Salary: £39,043', 'Jurisdiction: England (37.5h/week)', 'Comparison Uplift: +5.0%'],
      outputsSummary: [
        { label: 'Current Monthly Gross', value: '£3,253.58' },
        { label: 'Current Basic Hourly Rate', value: '£19.97 / hr' },
        { label: 'Uplifted Annual Gross (+5%)', value: '£40,995.15' },
        { label: 'Annual Gross Gain', value: '+£1,952.15' },
      ],
      explanation: 'A 5% gross uplift on Band 5 Top adds £162.68 per month before tax and pension deductions.',
    },
    assumptions: ['Gross figures are before Income Tax, National Insurance, and NHS Pension deductions.'],
    limitations: ['Does not include variable shift allowances unless added manually in the Take Home Pay calculator.'],
    faqs: [
      {
        question: 'How many weeks are in an NHS payroll year?',
        answer:
          'NHS payroll calculates weekly and hourly rates using 52.1429 weeks (365 ÷ 7) rather than 52 flat weeks, ensuring leap-adjusted consistency across annual salaries.',
      },
    ],
    relatedCalculators: [
      'nhs-pay-calculator',
      'nhs-band-calculator',
      'nhs-hourly-pay-calculator',
      'nhs-salary-after-tax-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Agenda for Change Pay Circulars',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/articles/pay-scales-202627',
        description: 'Official 2026/27 AfC salary scales and hours guidance.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-salary-after-tax-calculator',
    title: 'NHS Salary After Tax Calculator (2026/2027)',
    shortTitle: 'NHS Salary After Tax Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'FileSpreadsheet',
    metaTitle: 'NHS Salary After Tax Calculator 2026/2027 | Deduction Breakdown',
    metaDescription:
      'See exactly how much of your NHS salary you keep after Income Tax, National Insurance, NHS Pension, and Student Loan deductions in 2026/2027.',
    shortDescription:
      'Clear gross-to-net waterfall breakdown showing your effective tax rate, marginal rate, tax-free allowance, and net percentage kept.',
    intro:
      'Break down any NHS salary into tax-free Personal Allowance, taxable slices across every UK or Scottish band, National Insurance, and net pay retained.',
    howToUse: [
      'Enter any annual NHS salary (or choose an Agenda for Change Band) and select England/Wales/NI or Scotland.',
      'Toggle NHS Pension and Student Loan options to see how each deduction affects your taxable income and marginal tax rate.',
    ],
    howItWorks: [
      'Calculates your effective Personal Allowance (including the £1-for-£2 taper above £100,000), maps taxable earnings slice-by-slice across 2026/27 tax brackets, and displays the percentage of gross pay kept.',
    ],
    payrollContext:
      'Higher-earning NHS consultants, Band 8d directors, and Band 9 executives earning above £100,000 face an effective 60%–67.5% marginal tax trap because every £2 earned above £100,000 removes £1 of tax-free Personal Allowance.',
    example: {
      scenarioTitle: 'Band 7 Top Point (£56,515) in England',
      inputsSummary: ['Gross Salary: £56,515', 'Jurisdiction: England', 'NHS Pension: Opted In (10.7%)'],
      outputsSummary: [
        { label: 'NHS Pension (10.7%)', value: '£6,047.11' },
        { label: 'Taxable Income after Pension', value: '£50,467.89' },
        { label: 'Total Income Tax', value: '£7,619.16' },
        { label: 'Employee National Insurance', value: '£3,140.90' },
        { label: 'Net Pay Retained', value: '£39,707.83 (70.3%)' },
      ],
      explanation:
        'Deducting the £6,047.11 NHS Pension contribution pulls taxable income down almost entirely out of the 40% Higher Rate tax band.',
    },
    assumptions: ['Uses 2026/2027 HMRC and Scottish Government Income Tax brackets.'],
    limitations: ['Assumes all income is non-savings, non-dividend employment income.'],
    faqs: [
      {
        question: 'What is the difference between effective tax rate and marginal tax rate?',
        answer:
          'Your effective tax rate is total Income Tax divided by total gross pay, whereas your marginal tax rate is the percentage charged on your next £1 of earnings.',
      },
    ],
    relatedCalculators: [
      'nhs-tax-calculator',
      'nhs-take-home-pay-calculator',
      'nhs-national-insurance-calculator',
      'nhs-pay-calculator',
    ],
    relatedGuides: ['nhs-pension-contributions-explained', 'nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'UK Income Tax Rates & Personal Allowances',
        publisher: 'GOV.UK',
        url: 'https://www.gov.uk/income-tax-rates',
        description: 'Official 2026/27 Personal Allowance and tax rate thresholds.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-band-calculator',
    title: 'NHS Band Calculator (2026/2027)',
    shortTitle: 'NHS Band Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'Layers',
    metaTitle: 'NHS Band Calculator 2026/2027 | Compare Bands 2–9 & Pay Steps',
    metaDescription:
      'Compare every NHS Agenda for Change pay band and increment point for 2026/2027 across England, Scotland, Wales, and Northern Ireland with HCAS.',
    shortDescription:
      'Interactive Band 2–9 comparison tool showing Entry, Intermediate, and Top pay points, London HCAS tiers, and hourly rates side by side.',
    intro:
      'Explore and compare all NHS Agenda for Change pay bands from Band 2 to Band 9 for 2026/2027, including increment steps, hourly rates, and London weighting.',
    isPopular: true,
    howToUse: [
      'Select your UK nation and High Cost Area Supplement (Outside London, Inner London, Outer London, or Fringe).',
      'Choose a primary band to inspect its full progression ladder—and optionally select a target band (e.g., Band 5 Top to Band 6 Entry) to measure the promotion jump.',
    ],
    howItWorks: [
      'Looks up official 2026/27 pay points for your chosen jurisdiction, applies HCAS caps, and computes both gross and estimated post-pension/tax monthly difference between bands.',
    ],
    payrollContext:
      'When promoted from the top of one band to the entry point of the next band (for example Band 5 Top to Band 6 Entry), Agenda for Change pay protection rules ensure your basic salary increases rather than drops.',
    example: {
      scenarioTitle: 'Promoting from Band 5 Top to Band 6 Entry (England, Outside London)',
      inputsSummary: ['Current: Band 5 Top (£39,043)', 'Target: Band 6 Entry (£39,959)'],
      outputsSummary: [
        { label: 'Annual Gross Increase', value: '+£916.00 / yr' },
        { label: 'Monthly Gross Increase', value: '+£76.33 / mo' },
        { label: 'Band 6 Top Ceiling', value: '£48,117.00 / yr' },
      ],
      explanation:
        'Stepping from Band 5 Top into Band 6 Entry adds £916 initially, while unlocking future progression up to £48,117 at Top of Band 6.',
    },
    assumptions: ['Reflects full-time basic annual salaries (37.5h rUK / 36h Scotland).'],
    limitations: ['Local transitional pay protection arrangements can vary when moving with unsocial hours.'],
    faqs: [
      {
        question: 'How long does it take to reach the top of Band 5 or Band 6?',
        answer:
          'Under Agenda for Change, Band 5 normally moves from Entry to Intermediate after 2 years and to Top after 4 years; Bands 6 and 7 typically reach Intermediate after 2 years and Top after 5 years, subject to satisfactory appraisal.',
      },
    ],
    relatedCalculators: [
      'nhs-pay-calculator',
      'nhs-salary-calculator',
      'nhs-hourly-pay-calculator',
      'nhs-part-time-pay-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'NHS Pay Progression Framework',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/articles/pay-progression',
        description: 'Guidance on step progression timelines in Agenda for Change.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-hourly-pay-calculator',
    title: 'NHS Hourly Pay Calculator (2026/2027)',
    shortTitle: 'NHS Hourly Pay Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'Clock',
    metaTitle: 'NHS Hourly Pay Calculator 2026/2027 | Basic, Unsocial & Bank Rates',
    metaDescription:
      'Calculate your exact 2026/2027 NHS hourly rate across Bands 2–9, including basic hourly pay, night/weekend enhancements, 1.5x overtime, and 12.07% bank holiday rollup.',
    shortDescription:
      'Calculate basic, night, Saturday, Sunday, overtime, and NHS Bank (with 12.07% WTR holiday pay) hourly rates.',
    intro:
      'Find your exact 2026/2027 NHS basic hourly rate alongside enhanced hourly rates for nights, weekends, bank holidays, overtime, and Bank shifts.',
    isPopular: true,
    howToUse: [
      'Select your UK nation (England/Wales/NI 37.5h week or Scotland 36h week) and your pay band and step (or enter a custom annual salary).',
      'Optionally toggle the 12.07% Working Time Regulations (WTR) rolled-up holiday pay option used by many NHS Bank contracts.',
    ],
    howItWorks: [
      'Divides annual basic salary by 52.1429 weeks × standard weekly hours (1,955.36 hours in England/Wales/NI; 1,877.14 hours in Scotland), then applies Section 2 and Section 3 multipliers.',
    ],
    payrollContext:
      'NHS Scotland’s move to a 36-hour standard working week increases the effective hourly rate by 4.17% relative to a 37.5-hour week at the same annual salary.',
    example: {
      scenarioTitle: 'England Band 5 Entry (£32,073) Hourly Rates',
      inputsSummary: ['Salary: £32,073', 'Band 5 (+30% / +60%)', 'Standard Week: 37.5h'],
      outputsSummary: [
        { label: 'Basic Hourly Rate', value: '£16.40 / hr' },
        { label: 'Night / Saturday (+30%)', value: '£21.32 / hr' },
        { label: 'Sunday / Bank Holiday (+60%)', value: '£26.24 / hr' },
        { label: 'Overtime (1.5x)', value: '£24.60 / hr' },
      ],
      explanation: 'All Section 2 and Section 3 rates use basic hourly pay excluding London HCAS.',
    },
    assumptions: ['Uses standard NHS payroll divisor of 365/7 weeks per year.'],
    limitations: ['Trust internal bank rates sometimes use a fixed band midpoint rather than your substantive step.'],
    faqs: [
      {
        question: 'What is the 12.07% NHS Bank holiday pay addition?',
        answer:
          'Workers on zero-hours NHS Bank agreements receive statutory annual leave (5.6 weeks out of 46.4 working weeks = 12.07%), often paid as a rolled-up 12.07% addition on top of the bank hourly rate.',
      },
    ],
    relatedCalculators: [
      'nhs-part-time-pay-calculator',
      'nhs-overtime-calculator',
      'nhs-unsocial-hours-calculator',
      'nhs-band-calculator',
    ],
    relatedGuides: ['nhs-unsocial-hours-pay-explained', 'nhs-overtime-rates-explained'],
    officialSources: [
      {
        title: 'NHS Employers Agenda for Change Hourly Rate Calculation',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Standard working week hours and enhancement rules.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-part-time-pay-calculator',
    title: 'NHS Part-Time Pay Calculator (2026/2027)',
    shortTitle: 'NHS Part-Time Pay Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'PieChart',
    metaTitle: 'NHS Part-Time Pay Calculator 2026/2027 | Pro-Rata WTE & Net Pay',
    metaDescription:
      'Calculate your pro-rata NHS part-time salary, FTE percentage, actual pension tier, pro-rata annual leave hours, and monthly take-home pay in 2026/2027.',
    shortDescription:
      'Pro-rata WTE calculator showing part-time gross pay, reduced NHS pension tier impact, pro-rata annual leave hours, and net monthly pay.',
    intro:
      'Work out your exact pro-rata NHS salary, Whole-Time Equivalent (WTE) ratio, pension contribution tier, and take-home pay for any part-time weekly hours.',
    howToUse: [
      'Select your UK nation, pay band, and step (or enter a full-time equivalent salary).',
      'Set your contracted weekly hours (for example 22.5 hours = 0.60 WTE, or 30 hours = 0.80 WTE) and years of NHS service for leave estimation.',
    ],
    howItWorks: [
      'Multiplies full-time salary and HCAS by your WTE fraction (contracted hours ÷ 37.5h, or ÷ 36h in Scotland), then checks which NHS Pension tier your actual part-time earnings fall into.',
    ],
    payrollContext:
      'Because NHS Pension contribution tiers are assessed on actual annual pensionable pay—not Whole-Time Equivalent—working part-time often drops you into a lower pension contribution percentage, boosting your net hourly take-home pay.',
    example: {
      scenarioTitle: 'Band 6 Top Point Working 22.5 Hours/Week (0.60 WTE, England)',
      inputsSummary: ['Full-Time Salary: £48,117', 'Contracted Hours: 22.5h / week (0.60 WTE)', 'Service: 5+ years'],
      outputsSummary: [
        { label: 'Actual Pro-Rata Gross Pay', value: '£28,870.20 / yr' },
        { label: 'NHS Pension Tier (Actual Pay)', value: '8.3% (instead of 9.8% FT)' },
        { label: 'Pro-Rata Annual Leave + BH', value: '166.5 hrs / yr' },
        { label: 'Estimated Monthly Net Pay', value: '£1,852.66 / mo' },
      ],
      explanation:
        'Working 22.5 hours lowers actual pensionable pay from £48,117 (9.8% tier) to £28,870.20 (8.3% tier), saving 1.5 percentage points on pension deductions.',
    },
    assumptions: ['Pro-rata annual leave includes bank holidays rounded per standard Trust practice.'],
    limitations: ['Variable additional plain-time hours can change your actual pension tier at year-end assessment.'],
    faqs: [
      {
        question: 'Do part-time NHS staff pay pension contributions based on full-time salary?',
        answer:
          'No. Following reforms implemented across the NHS Pension Scheme, part-time member contribution tiers are based on your actual pensionable earnings, not your Whole-Time Equivalent (WTE) salary.',
      },
    ],
    relatedCalculators: [
      'nhs-pay-calculator',
      'nhs-annual-leave-calculator',
      'nhs-pension-contribution-calculator',
      'nhs-hourly-pay-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained', 'nhs-pension-contributions-explained'],
    officialSources: [
      {
        title: 'Part-Time Staff Pension Contributions',
        publisher: 'NHSBSA',
        url: 'https://www.nhsbsa.nhs.uk/member-hub/cost-being-scheme',
        description: 'Official confirmation that actual pay determines contribution tier.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
];
