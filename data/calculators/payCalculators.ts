import type { CalculatorDefinition } from '@/types/calculator';

export const PAY_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-pay-calculator',
    title: 'NHS Pay Calculator 2026/27',
    shortTitle: 'NHS Pay Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'Calculator',
    metaTitle: 'NHS Pay Calculator 2026/27 – Calculate Your NHS Salary',
    metaDescription:
      'Use our NHS Pay Calculator for 2026/27 to estimate your NHS salary, monthly take-home pay, tax, National Insurance and pension deductions.',
    shortDescription:
      'All-in-one 2026/2027 NHS salary and net take-home pay calculator supporting AfC bands, London HCAS, pension tiers, and UK nations.',
    intro:
      'Use our free NHS pay calculator to estimate your gross salary and monthly take-home pay across England, Wales, Scotland, and Northern Ireland. Built as an accurate pay calculator NHS staff can rely on, this updated NHS pay calculator 2026/27 tool reflects the 3.3% Agenda for Change uplift effective 1 April 2026 alongside London weighting, NHS Pension tiers, Income Tax, National Insurance, and Student Loans.',
    isPopular: true,
    isFeatured: true,
    calculatorSectionHeading: 'Calculate Your NHS Take-Home Pay',
    calculatorSectionDescription:
      'Configure your UK nation, Agenda for Change band, contracted hours, and deductions below using our 2026/27 NHS take home pay calculator.',
    howToUseHeading: 'How to Use the NHS Pay Calculator',
    howToUse: [
      'Choose your UK nation (England, Wales, Scotland, or Northern Ireland) so the NHS pay calculator applies the right 2026/27 Agenda for Change pay scales, standard weekly hours (37.5h vs 36h), pension tiers, and HMRC or Scottish tax bands.',
      'Select your Agenda for Change pay band and increment point—or switch to Custom Salary if you are a resident doctor, consultant, dentist, or VSM employee.',
      'Add your contracted weekly hours, London HCAS zone, monthly unsocial hours pay, salary sacrifice deduction, NHS Pension status, HMRC tax code, Student Loan plan, and preferred pay frequency view.',
    ],
    referenceTableHeading: 'NHS Pay Bands and Salary Rates for 2026/27',
    referenceTableIntro: [
      'Agenda for Change (AfC) covers most non-medical NHS staff across Bands 2 to 9, with each band divided into Entry, Intermediate, and Top pay points based on years of experience and pay progression milestones. In England for 2026/27, full-time salaries span from £25,272 at Band 2 up to £129,783 at the top of Band 9 (plus High Cost Area Supplements for Inner London, Outer London, and Fringe sites).',
      'The table below summarises the NHS pay calculator 2026/27 England basic salary ranges across all Agenda for Change bands before overtime, unsocial hours, or London weighting:',
    ],
    referenceTable: {
      caption: 'NHS Pay Scales 2026/27 — England Agenda for Change Bands 2–9 (37.5h/wk, Outside London)',
      headers: ['Pay Band', 'Entry Point', 'Intermediate Point', 'Top Point'],
      rows: [
        ['Band 2', '£25,272', '—', '£25,272'],
        ['Band 3', '£25,760', '—', '£27,476'],
        ['Band 4', '£28,392', '—', '£31,157'],
        ['Band 5', '£32,073', '£34,592', '£39,043'],
        ['Band 6', '£39,959', '£42,170', '£48,117'],
        ['Band 7', '£49,387', '£51,930', '£56,515'],
        ['Band 8a', '£57,528', '£60,417', '£64,750'],
        ['Band 8b', '£66,582', '£70,896', '£77,368'],
        ['Band 8c', '£79,504', '£84,346', '£91,609'],
        ['Band 8d', '£94,356', '£100,140', '£108,814'],
        ['Band 9', '£112,782', '£119,578', '£129,783'],
      ],
    },
    referenceTableLink: {
      label: 'Compare Bands 2–9 side by side and calculate promotions with our NHS Band Calculator',
      href: '/nhs-band-calculator/',
    },
    takeHomeSectionHeading: 'How Much Will I Take Home After Tax and Pension?',
    takeHomeParagraphs: [
      'Your gross NHS salary—made up of pro-rata basic pay, any London High Cost Area Supplement, and regular unsocial hours enhancements—is only the starting point. Monthly take-home pay depends on four statutory and scheme deductions: NHS Pension contributions (5.2% to 12.5% in England and Wales, or 5.7% to 12.7% in Scotland), Income Tax after your Personal Allowance (£12,570 on a 1257L tax code), Class 1 National Insurance (8% main rate and 2% above £50,270), and any Student Loan plan.',
      'Because NHS Pension deductions are taken under a Net Pay Arrangement, they lower your taxable pay before Income Tax is calculated—reducing your real pension cost by 20% for basic-rate taxpayers or 40% to 48% for higher earners.',
    ],
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
    payRiseSection: {
      heading: 'NHS Pay Rise 2026/27 – How Does It Affect Your Salary?',
      paragraphs: [
        'According to NHS Employers, the 2026/27 pay award for Agenda for Change staff in England and Wales is a 3.3% consolidated uplift across all pay points, effective from 1 April 2026. Because the award is consolidated, it increases basic annual salary, London HCAS caps, hourly rates, Section 2 unsocial hours earnings, and 1/54th CARE pension accrual simultaneously.',
        'Acting as an NHS pay rise 2026/27 calculator, this page applies the uplifted April 2026 pay scales automatically—helping you see how much of the 3.3% award reaches your monthly bank account after Income Tax, National Insurance, Student Loans, and any change in NHS Pension tier.',
      ],
    },
    howItWorksHeading: 'How Is NHS Pay Calculated?',
    howItWorks: [
      'In this NHS pay calculator 2026/27 engine, pro-rata basic pay is calculated by scaling your full-time Agenda for Change salary by your contracted weekly hours relative to 37.5 hours in England, Wales, and Northern Ireland (or 36.0 hours in NHS Scotland). If you work part-time, both your basic pay and any High Cost Area Supplement are scaled proportionally.',
      'London High Cost Area Supplements (Inner London 20%, Outer London 15%, and Fringe 5%) are bounded by official 2026/27 minimum and maximum caps before being added to pensionable earnings. Any regular monthly unsocial hours pay is also included in pensionable pay.',
      'From gross pensionable pay, your NHS Pension tier contribution is deducted under a Net Pay Arrangement before Income Tax is assessed. Class 1 National Insurance (8% main rate, 2% upper rate) and Student Loan repayments are calculated on gross NIable pay after any salary sacrifice.',
    ],
    payrollContext:
      'For 2026/2027, England and Wales Agenda for Change salaries incorporate the 3.3% uplift effective 1 April 2026, while NHS Scotland operates a 36-hour standard working week with distinct STAC pay points and SPPA pension tiers. Custom tax codes such as 1257L, BR, D0, or K-codes can be tested directly in the inputs panel.',
    assumptions: [
      'Defaults to standard 1257L HMRC tax code and Category A Employee National Insurance unless another code is entered.',
      'Paid Section 3 overtime above full-time hours is excluded from pensionable pay, whereas regular Section 2 unsocial hours enhancements are pensionable.',
      'Salary sacrifice deductions (such as NHS Fleet cars or Cycle to Work) lower gross taxable, NIable, student loan, and pensionable pay together.',
    ],
    limitations: [
      'Does not automatically add Trust-specific Recruitment and Retention Premia (RRP) unless entered via Custom Salary.',
      'Resident doctors, SAS doctors, and consultants should switch to Custom Salary to enter their exact nodal point and clinical excellence awards.',
      'One-off back-pay or bonus months can cause temporary PAYE tax or Student Loan spikes that reconcile over the tax year.',
    ],
    faqHeading: 'Frequently Asked Questions About NHS Pay',
    faqs: [
      {
        question: 'Does this NHS Pay Calculator include the 2026/27 pay rise?',
        answer:
          'Yes. England and Wales scales reflect the 3.3% consolidated 2026/27 Agenda for Change award effective 1 April 2026, and Scotland reflects the 2026/27 STAC pay circular with its 36-hour standard full-time week—making it an accurate NHS pay rise 2026/27 calculator.',
      },
      {
        question: 'How accurate is a take home pay calculator NHS staff use for part-time shifts?',
        answer:
          'This take home pay calculator NHS tool scales both your pro-rata basic salary and London HCAS to your contracted hours (such as 22.5 or 30 hours) and matches your NHS Pension tier on actual pensionable pay rather than full-time equivalent salary, closely matching ESR payslips.',
      },
      {
        question: 'How do monthly unsocial hours and salary sacrifice affect take-home pay?',
        answer:
          'Monthly unsocial hours enhancements increase your gross pensionable pay—raising Income Tax, NI, Student Loans, and potentially your NHS Pension tier—while salary sacrifice reduces gross pay before tax, NI, Student Loan, and pension calculations.',
      },
      {
        question: 'Why are my Northern Ireland results labelled as parity?',
        answer:
          'Northern Ireland HSC pay normally mirrors UK PRB parity recommendations (3.3%), though formal payout timing depends on Department of Health NI executive sign-off. You can switch to Custom Salary to test a transitional figure at any time.',
      },
    ],
    relatedCalculators: [
      'nhs-salary-calculator',
      'nhs-band-calculator',
      'nhs-pension-calculator',
      'nhs-unsocial-hours-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained', 'nhs-pension-contributions-explained'],
    officialSources: [
      {
        title: 'NHS Employers – 2026/27 Pay Scales',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/articles/pay-scales-202627',
        description: 'Official 2026/27 Agenda for Change pay scales reflecting the 3.3% uplift from 1 April 2026.',
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
    slug: 'nhs-salary-calculator',
    title: 'NHS Salary Calculator (2026/2027)',
    shortTitle: 'NHS Salary Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'TrendingUp',
    metaTitle: 'NHS Salary Calculator 2026/27 | NHS Staff Calculator',
    metaDescription:
      'Convert any 2026/27 NHS Agenda for Change or custom salary into annual, monthly, 4-weekly, weekly, daily, and hourly gross pay—plus uplift comparisons.',
    shortDescription:
      'Compare gross NHS salary across pay periods and simulate the impact of a pay rise, increment step, or band promotion.',
    intro:
      'Convert your NHS annual salary across monthly, four-weekly, weekly, daily, and hourly periods—and model what a pay award or band promotion adds to your gross earnings.',
    howToUse: [
      'Select your UK nation (England, Wales, Scotland, or Northern Ireland) so standard annual hours (37.5h/week rUK vs 36h/week Scotland) are applied accurately.',
      'Choose an Agenda for Change pay point from Band 2 to Band 9, or enable Custom Salary to enter a medical, dental, or senior manager salary.',
      'Add any London High Cost Area Supplement and adjust the Pay Rise / Promotion Comparison slider to benchmark an uplift percentage.',
    ],
    howItWorks: [
      'Annual gross salary (including optional London HCAS weighting) is divided by 12 for monthly gross pay, 13 for four-weekly bank/weekly payroll equivalents, 52.1429 (365 ÷ 7) for weekly gross pay, and 260.714 for daily gross pay.',
      'Your basic hourly rate is derived strictly from annual salary divided by standard annual hours: 1,955.36 hours in England, Wales, and Northern Ireland (37.5h × 52.1429 weeks) or 1,877.14 hours in NHS Scotland (36.0h × 52.1429 weeks).',
      'When comparing an uplift percentage, both the baseline gross breakdown and uplifted gross breakdown are shown side by side so you can evaluate pay awards, increment jumps, or job offers cleanly.',
    ],
    payrollContext:
      'When comparing job offers across NHS England and NHS Scotland, always check both the headline salary and the standard weekly working hours (37.5h vs 36h), as the hourly rate gap can be significantly larger than the annual difference.',
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
    referenceTable: {
      caption: '2026/27 Gross Salary & Hourly Rate Comparison (England 37.5h vs Scotland 36h)',
      headers: ['Pay Point', 'England Annual', 'England Hourly', 'Scotland Annual', 'Scotland Hourly'],
      rows: [
        ['Band 3 Entry', '£25,760', '£13.17/hr', '£29,103', '£15.50/hr'],
        ['Band 5 Entry', '£32,073', '£16.40/hr', '£34,544', '£18.40/hr'],
        ['Band 5 Top', '£39,043', '£19.97/hr', '£43,039', '£22.93/hr'],
        ['Band 6 Entry', '£39,959', '£20.44/hr', '£43,231', '£23.03/hr'],
        ['Band 6 Top', '£48,117', '£24.61/hr', '£52,679', '£28.06/hr'],
        ['Band 7 Top', '£56,515', '£28.90/hr', '£61,466', '£32.74/hr'],
      ],
    },
    assumptions: [
      'All figures shown are gross earnings before Income Tax, Class 1 National Insurance, and NHS Pension deductions.',
      'NHS payroll uses 52.1429 weeks (365 ÷ 7) per year to derive weekly and basic hourly pay rates.',
    ],
    limitations: [
      'Does not calculate net take-home deductions; use the NHS Pay Calculator to model payslip tax, NI, and pension impact.',
      'Does not include variable shift enhancements or overtime unless simulated via a Custom Salary figure.',
    ],
    faqs: [
      {
        question: 'How many weeks are in an NHS payroll year?',
        answer:
          'NHS payroll calculates weekly and hourly rates using 52.1429 weeks (365 ÷ 7) rather than 52 flat weeks, ensuring consistent annualised pay across leap-year and standard-year calendars.',
      },
      {
        question: 'Does London HCAS increase my NHS basic hourly rate for overtime?',
        answer:
          'No. Although London High Cost Area Supplements increase your total annual and monthly gross salary, Agenda for Change overtime and unsocial hours multipliers are calculated on basic salary excluding HCAS.',
      },
      {
        question: 'Why is the NHS Scotland hourly rate higher than England for the same band?',
        answer:
          'NHS Scotland operates both higher STAC pay points and a shorter 36.0-hour standard full-time working week (1,877.14 hours/year vs 1,955.36 hours/year in England), lifting the basic hourly rate substantially.',
      },
    ],
    relatedCalculators: [
      'nhs-pay-calculator',
      'nhs-band-calculator',
      'nhs-unsocial-hours-calculator',
      'nhs-tax-calculator',
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
    slug: 'nhs-band-calculator',
    title: 'NHS Band Calculator (2026/2027)',
    shortTitle: 'NHS Band Calculator',
    category: 'nhs-pay-calculators',
    iconName: 'Layers',
    metaTitle: 'NHS Band Calculator 2026/27 | NHS Staff Calculator',
    metaDescription:
      'Compare all 2026/27 NHS Agenda for Change bands 2–9 and pay points across England, Wales, Scotland, and NI, including London HCAS and net promotion gains.',
    shortDescription:
      'Interactive Band 2–9 comparison tool showing Entry, Intermediate, and Top pay points, London HCAS tiers, and hourly rates side by side.',
    intro:
      'Explore and compare all NHS Agenda for Change pay bands from Band 2 to Band 9 for 2026/2027, including increment steps, hourly rates, and London weighting.',
    isPopular: true,
    howToUse: [
      'Select your UK nation (England, Wales, Scotland, or Northern Ireland) and High Cost Area Supplement (Outside London, Inner London, Outer London, or Fringe).',
      'Choose your current NHS pay band and step to view its annual gross pay, monthly net take-home, and full progression ladder.',
      'Select a target band and step (for example Band 5 Top to Band 6 Entry) to calculate both the gross promotion jump and estimated net monthly change after pension and tax.',
    ],
    howItWorks: [
      'Retrieves the official 2026/27 Agenda for Change salary table for your selected nation, applies High Cost Area Supplement rules (including Inner London £5,794–£8,746, Outer London £4,870–£6,137, and Fringe £1,346–£2,270 caps), and calculates your basic hourly rate.',
      'For promotion comparisons, it runs both your current pay point and target pay point through the full 2026/27 NHS Pension, Income Tax, and National Insurance engine so you can see the genuine take-home gain—especially when a promotion crosses an NHS Pension tier cliff or the 40%/42% Higher Rate tax threshold.',
    ],
    payrollContext:
      'When promoted from the top of one band to the entry point of the next band (for example Band 5 Top to Band 6 Entry), Agenda for Change pay progression rules ensure your basic salary steps onto the next band above your existing pay, unlocking further annual increments.',
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
    referenceTable: {
      caption: '2026/27 NHS England Pay Progression Ladders & London HCAS Caps',
      headers: ['Band', '2026/27 Entry', '2026/27 Top', 'Inner London (+20% Cap)', 'Outer London (+15% Cap)'],
      rows: [
        ['Band 2', '£25,272', '£25,272', '+£5,794 (min)', '+£4,870 (min)'],
        ['Band 3', '£25,760', '£27,476', '+£5,794 (min)', '+£4,870 (min)'],
        ['Band 4', '£28,392', '£31,157', '+£5,794 – £6,231', '+£4,870 (min)'],
        ['Band 5', '£32,073', '£39,043', '+£6,415 – £7,809', '+£4,870 – £5,856'],
        ['Band 6', '£39,959', '£48,117', '+£7,992 – £8,746', '+£5,994 – £6,137'],
        ['Band 7', '£49,387', '£56,515', '+£8,746 (max)', '+£6,137 (max)'],
        ['Band 8a', '£57,528', '£64,750', '+£8,746 (max)', '+£6,137 (max)'],
      ],
    },
    assumptions: [
      'Reflects full-time basic annual salaries (37.5 hours/week in rUK, 36.0 hours/week in Scotland).',
      'Net monthly comparison assumes standard 1257L tax code and active 2015 NHS Pension membership.',
    ],
    limitations: [
      'Local transitional pay protection arrangements can vary when moving roles with regular unsocial hours.',
      'Band 1 is closed to new starters and omitted; Very Senior Managers (VSM) and medical staff are paid outside AfC bands.',
    ],
    faqs: [
      {
        question: 'How long does it take to reach the top of Band 5 or Band 6?',
        answer:
          'Under Agenda for Change, Band 5 normally moves from Entry to Intermediate after 2 years and to Top after 4 years; Bands 6 and 7 typically reach Intermediate after 2 years and Top after 5 years, subject to satisfactory appraisal.',
      },
      {
        question: 'Why does my net pay barely rise when moving between certain pay steps?',
        answer:
          'NHS Pension contribution tiers apply across your whole pensionable salary once crossed. Moving past £35,155 (from 8.3% to 9.8%) or £52,778 (from 9.8% to 10.7%) in England/Wales can absorb part of an increment until further pay rises offset the higher pension tier.',
      },
      {
        question: 'How do London HCAS minimum and maximum caps work across bands?',
        answer:
          'Inner London adds 20% of basic salary (minimum £5,794, maximum £8,746 in 2026/27), Outer London adds 15% (£4,870–£6,137), and Fringe adds 5% (£1,346–£2,270). Lower bands benefit from the floor while Band 6 Top and above hit the ceiling.',
      },
    ],
    relatedCalculators: [
      'nhs-pay-calculator',
      'nhs-salary-calculator',
      'nhs-pension-calculator',
      'nhs-tax-calculator',
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
];
