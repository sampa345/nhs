import type { CalculatorDefinition } from '@/types/calculator';

export const EMPLOYMENT_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-annual-leave-calculator',
    title: 'NHS Annual Leave Calculator (2026/2027)',
    shortTitle: 'NHS Annual Leave Calculator',
    category: 'nhs-employment-calculators',
    iconName: 'CalendarCheck',
    metaTitle: 'NHS Annual Leave Calculator 2026/2027 | Days, Hours & Part-Time',
    metaDescription:
      'Calculate your NHS Agenda for Change annual leave entitlement in days and hours for 2026/2027, including 5-year and 10-year service jumps and part-time pro-rata rules.',
    shortDescription:
      'Calculate Section 13 NHS annual leave in days and hours by length of service, contracted hours, and UK nation (37.5h vs 36h).',
    intro:
      'Work out your exact NHS Agenda for Change annual leave entitlement in both days and hours—including 5-year and 10-year service uplifts, part-time pro-rata scaling, and mid-year starters.',
    isFeatured: true,
    howToUse: [
      'Select your UK nation (England/Wales/NI 37.5h standard week or Scotland 36h standard week).',
      'Enter your total years of continuous NHS reckonable service, contracted weekly hours, and months worked in the current leave year.',
    ],
    howItWorks: [
      'Maps continuous NHS service to Section 13 tiers (27+8 days under 5 years, 29+8 days after 5 years, 33+8 days after 10 years), converts to hours (× 7.5h or × 7.2h), and scales pro-rata by your WTE ratio.',
    ],
    payrollContext:
      'Most NHS Trusts manage annual leave in hours rather than days for clinical shift staff so that 11.5-hour or 12-hour long days deduct accurately from the annual pot.',
    example: {
      scenarioTitle: 'Band 5 Nurse with 6 Years NHS Service Working 30 Hours/Week (England)',
      inputsSummary: ['Service: 6 years (29 + 8 days tier)', 'Hours: 30h / week (0.80 WTE)', 'Leave Year: 12 months'],
      outputsSummary: [
        { label: 'Pro-Rata Annual Leave Hours', value: '174.00 hrs (23.2 days)' },
        { label: 'Pro-Rata Bank Holiday Hours', value: '48.00 hrs (6.4 days)' },
        { label: 'Total Leave Hours Pot', value: '222.00 hrs / yr' },
      ],
      explanation: 'At 0.80 WTE with 6 years service, the combined 37 full-time days (277.5h) pro-rate cleanly to 222.00 hours.',
    },
    assumptions: ['Uses 8 standard general public holidays (England/Wales model); Scotland/NI Trusts may allocate 9–10 public holidays locally.'],
    limitations: ['Some Trusts round leave hours up to the nearest 0.5 hour on ESR/HealthRoster.'],
    faqs: [
      {
        question: 'When does my extra NHS annual leave kick in at 5 or 10 years?',
        answer:
          'Under Agenda for Change Section 13, your increased entitlement starts from your 5-year or 10-year continuous service anniversary date, pro-rated for the remainder of that leave year.',
      },
    ],
    relatedCalculators: [
      'nhs-holiday-entitlement-calculator',
      'nhs-part-time-pay-calculator',
      'nhs-bank-holiday-pay-calculator',
      'nhs-sick-pay-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Section 13: Annual Leave and General Public Holidays',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official AfC leave tiers and hours conversion formulas.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-holiday-entitlement-calculator',
    title: 'NHS Holiday Entitlement Calculator (2026/2027)',
    shortTitle: 'NHS Holiday Entitlement Calculator',
    category: 'nhs-employment-calculators',
    iconName: 'CalendarRange',
    metaTitle: 'NHS Holiday Entitlement Calculator 2026/2027 | Bank Holidays & Hours',
    metaDescription:
      'Calculate your exact NHS Bank Holiday hours and shift-based holiday entitlement, whether you work part-time, compressed hours, or 11.5-hour long days.',
    shortDescription:
      'Focused on part-time Bank Holiday pro-rata hours and how many actual shifts your NHS leave pot covers.',
    intro:
      'Calculate your exact NHS Bank Holiday allowance in hours and see how many shifts your annual holiday pot covers based on your shift length.',
    howToUse: [
      'Select your UK nation, continuous service tier, and contracted weekly hours.',
      'Enter your typical shift length (e.g. 7.5 hours, 10 hours, or 11.5 hours) and local Trust public holiday count (default 8).',
    ],
    howItWorks: [
      'Separates your core annual leave from your pro-rata Bank Holiday hours so part-time staff whose normal day off falls on a Monday never lose public holiday entitlement.',
    ],
    payrollContext:
      'If a Bank Holiday falls on a day you do not normally work, your pro-rata Bank Holiday hours remain in your allowance to take on another working day—while if you are rostered off on a Bank Holiday you usually work, those hours are deducted from your Bank Holiday pot.',
    example: {
      scenarioTitle: 'Part-Time Ward Nurse (23h/week, 11.5h shifts, <5 Years Service)',
      inputsSummary: ['Contracted: 23h/week (2 × 11.5h shifts)', 'Service: <5 years (27 + 8 days)'],
      outputsSummary: [
        { label: 'Core Annual Leave Hours', value: '124.20 hrs' },
        { label: 'Pro-Rata Bank Holiday Hours', value: '36.80 hrs' },
        { label: 'Total Shifts Off Per Year', value: '14.0 full 11.5h shifts' },
      ],
      explanation: 'Converting days into 161.00 total hours shows the nurse can book exactly 14 full 11.5-hour shifts off across the leave year.',
    },
    assumptions: ['Standard daily divisor is 7.5h (England/Wales/NI) or 7.2h (Scotland).'],
    limitations: ['Additional non-standard Bank Holidays (e.g. royal proclamations) are added separately by Trusts.'],
    faqs: [
      {
        question: 'Why do part-time NHS staff get fewer Bank Holiday hours if they always work Mondays?',
        answer:
          'Part-time staff receive the exact pro-rata share of all Bank Holidays; if your normal Monday shift falls on a Bank Holiday and you take it off, you deduct 7.5h (or shift length) from your pro-rata Bank Holiday pot—requiring top-up from core annual leave if Mondays exceed your pro-rata share.',
      },
    ],
    relatedCalculators: [
      'nhs-annual-leave-calculator',
      'nhs-bank-holiday-pay-calculator',
      'nhs-part-time-pay-calculator',
      'nhs-pay-calculator',
    ],
    relatedGuides: ['nhs-unsocial-hours-pay-explained'],
    officialSources: [
      {
        title: 'Part-Time Public Holiday Calculations (Section 13)',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Guidance on equitable Bank Holiday hours for part-time staff.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-sick-pay-calculator',
    title: 'NHS Sick Pay Calculator (2026/2027)',
    shortTitle: 'NHS Sick Pay Calculator',
    category: 'nhs-employment-calculators',
    iconName: 'HeartPulse',
    metaTitle: 'NHS Sick Pay Calculator 2026/2027 | Occupational OSP & SSP',
    metaDescription:
      'Estimate your NHS Agenda for Change Section 14 Occupational Sick Pay (OSP) full-pay and half-pay duration plus Statutory Sick Pay (SSP) in 2026/2027.',
    shortDescription:
      'Calculate Section 14 Occupational Sick Pay full-pay and half-pay months by NHS service length, plus SSP interaction.',
    intro:
      'Check how many months of full pay and half pay you qualify for under NHS Agenda for Change Section 14 Occupational Sick Pay (OSP) and estimate your absence income.',
    howToUse: [
      'Select your completed length of continuous NHS service (from Year 1 up to 5+ years).',
      'Enter your annual gross salary and planned absence length in weeks (plus optional SSP weekly rate adjustment if needed).',
    ],
    howItWorks: [
      'Matches your service band to Section 14 OSP allowances (1+2 months up to 6+6 months), models Full Pay weeks, Half Pay + SSP (capped at normal full pay), and SSP-only weeks thereafter.',
    ],
    payrollContext:
      'Under Agenda for Change Section 14.4, when you receive Half Pay alongside Statutory Sick Pay (SSP), the combined weekly total cannot exceed your normal full weekly pay.',
    example: {
      scenarioTitle: 'Band 5 Staff Nurse (Year 3 of Service) on 20-Week Absence',
      inputsSummary: ['Salary: £34,592', 'Service: During 3rd Year (4m Full + 4m Half)', 'Absence: 20 weeks'],
      outputsSummary: [
        { label: 'Full Pay Allowance', value: '4 Months (£2,882.67/mo)' },
        { label: 'Half Pay + SSP Weekly', value: '£455.02 / wk' },
        { label: 'Estimated 20-Week Gross Pay', value: '£12,729.01' },
      ],
      explanation: 'The first ~17.3 weeks are paid at full salary (£663.41/wk), with remaining weeks paid at half pay plus SSP.',
    },
    assumptions: ['Assumes full OSP entitlement with no prior sickness absences within the rolling 12-month lookback period.'],
    limitations: ['Previous sick leave in the past 12 months reduces remaining OSP months under rolling Section 14 rules.'],
    faqs: [
      {
        question: 'Does NHS sick pay include unsocial hours enhancements?',
        answer:
          'Yes for eligible staff: under Section 14, sickness absence pay is normally based on what you would have received had you been at work (including regular unsocial hours enhancements), though rules vary slightly for Band 1–2 or temporary absences.',
      },
    ],
    relatedCalculators: [
      'nhs-maternity-pay-calculator',
      'nhs-annual-leave-calculator',
      'nhs-pay-calculator',
      'nhs-tax-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Section 14: Sickness Absence (Occupational Sick Pay)',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official Section 14 OSP service tiers and rolling 12-month rules.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-maternity-pay-calculator',
    title: 'NHS Maternity Pay Calculator (2026/2027)',
    shortTitle: 'NHS Maternity Pay Calculator',
    category: 'nhs-employment-calculators',
    iconName: 'Baby',
    metaTitle: 'NHS Maternity Pay Calculator 2026/2027 | OMP & £194.32 SMP',
    metaDescription:
      'Calculate your 2026/2027 NHS Occupational Maternity Pay (OMP) and Statutory Maternity Pay (SMP at £194.32/wk) week-by-week over 52 weeks.',
    shortDescription:
      'Week-by-week 52-week maternity schedule modelling 8 weeks Full Pay, 18 weeks Half Pay + £194.32 SMP, and 13 weeks SMP.',
    intro:
      'Plan your 2026/2027 NHS maternity leave income across all 52 weeks—modelling NHS Occupational Maternity Pay (OMP) alongside the £194.32/week Statutory Maternity Pay (SMP) rate.',
    howToUse: [
      'Enter your average annual gross NHS earnings (usually measured over the 8-week qualifying reference period prior to the 15th week before due date).',
      'Confirm whether you have at least 12 months continuous NHS service (for OMP) and 26 weeks with your current Trust (for SMP).',
    ],
    howItWorks: [
      'Models Weeks 1–8 at 100% Full Pay, Weeks 9–26 at 50% Half Pay plus £194.32/week SMP (capped at full pay), Weeks 27–39 at £194.32/week SMP, and Weeks 40–52 unpaid—or SMP-only if under 12 months NHS service.',
    ],
    payrollContext:
      'For the 2026/2027 tax year, the GOV.UK standard Statutory Maternity Pay (SMP) weekly rate is £194.32 (or 90% of average weekly earnings if lower), with a Lower Earnings Limit of £129.00/week.',
    example: {
      scenarioTitle: 'Band 6 Nurse (£42,170) Eligible for Both NHS OMP and SMP (2026/27)',
      inputsSummary: ['Annual Salary: £42,170 (£808.74/wk)', '12+ Months NHS Service: Yes', '26+ Weeks Employer: Yes'],
      outputsSummary: [
        { label: 'Weeks 1–8 (Full Pay)', value: '£808.74 / wk' },
        { label: 'Weeks 9–26 (Half Pay + SMP)', value: '£598.69 / wk' },
        { label: 'Weeks 27–39 (SMP Only)', value: '£194.32 / wk' },
        { label: 'Total 39-Week Gross Pay', value: '£19,772.50' },
      ],
      explanation: 'Half pay (£404.37) plus £194.32 SMP equals £598.69/week—below full pay, so both are paid in full during Weeks 9–26.',
    },
    assumptions: ['Assumes employee intends to return to NHS employment for at least 3 months post-leave to retain OMP.'],
    limitations: ['Annual leave continues to accrue during maternity leave and is not added to this cash figure.'],
    faqs: [
      {
        question: 'Can I choose to spread my NHS maternity pay evenly across all months?',
        answer:
          'Many NHS Trusts allow you to average your Occupational Maternity Pay evenly across your paid maternity months on request to payroll, smoothing out the drop in Weeks 27–39.',
      },
    ],
    relatedCalculators: [
      'nhs-paternity-pay-calculator',
      'nhs-annual-leave-calculator',
      'nhs-sick-pay-calculator',
      'nhs-pay-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Section 15: Leave and Pay for New Parents',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official Agenda for Change OMP qualifying rules and schedule.',
      },
      {
        title: 'Statutory Maternity Pay Rates 2026/27',
        publisher: 'GOV.UK',
        url: 'https://www.gov.uk/maternity-pay-leave/pay',
        description: '2026/27 SMP £194.32/week rate and LEL threshold.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-paternity-pay-calculator',
    title: 'NHS Paternity Pay Calculator (2026/2027)',
    shortTitle: 'NHS Paternity Pay Calculator',
    category: 'nhs-employment-calculators',
    iconName: 'Users',
    metaTitle: 'NHS Paternity Pay Calculator 2026/2027 | Occupational vs SPP',
    metaDescription:
      'Calculate your 2026/2027 NHS Occupational Paternity Pay (2 weeks full pay) or Statutory Paternity Pay (£194.32/week) under Agenda for Change Section 15.',
    shortDescription:
      'Check eligibility for 2 weeks NHS Full Pay paternity leave versus 2026/27 Statutory Paternity Pay (£194.32/wk).',
    intro:
      'Estimate your 2026/2027 NHS paternity leave pay—comparing NHS Occupational Paternity Pay (full pay) against Statutory Paternity Pay (£194.32/week).',
    howToUse: [
      'Enter your annual gross NHS salary and choose 1 or 2 weeks of paternity leave.',
      'Indicate whether you meet the 12-month NHS continuous service test (for full occupational pay) or 26-week Trust service test (for SPP).',
    ],
    howItWorks: [
      'Applies full average weekly earnings if you have 12+ months continuous NHS service, or £194.32/week (capped at 90% AWE) if eligible for Statutory Paternity Pay only.',
    ],
    payrollContext:
      'Under Agenda for Change Section 15, eligible partners with 12 months continuous NHS service receive two weeks of Occupational Paternity Leave at full pay (inclusive of SPP) rather than dropping to £194.32/week.',
    example: {
      scenarioTitle: 'Band 5 Nurse (£34,592) Taking 2 Weeks NHS Paternity Leave',
      inputsSummary: ['Salary: £34,592', 'Leave: 2 Weeks', '12+ Months NHS Service: Yes'],
      outputsSummary: [
        { label: 'Occupational Weekly Rate (Full Pay)', value: '£663.41 / wk' },
        { label: 'Total 2-Week Gross Pay', value: '£1,326.82' },
        { label: 'Statutory SPP Comparison (if <12m)', value: '£388.64 (2 × £194.32)' },
      ],
      explanation: 'Having 12 months NHS service lifts 2-week paternity pay from £388.64 statutory minimum to £1,326.82 full pay.',
    },
    assumptions: ['Based on Agenda for Change Section 15 new parent provisions.'],
    limitations: ['Shared Parental Leave transfers are not modelled in this 1–2 week paternity tool.'],
    faqs: [
      {
        question: 'Can NHS paternity leave be split into two separate 1-week blocks?',
        answer:
          'Following UK statutory paternity leave updates, employees can normally take their 2 weeks of paternity leave either as one 2-week block or two separate 1-week blocks within 52 weeks of birth or placement.',
      },
    ],
    relatedCalculators: [
      'nhs-maternity-pay-calculator',
      'nhs-annual-leave-calculator',
      'nhs-pay-calculator',
      'nhs-tax-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Statutory Paternity Pay and Leave 2026/27',
        publisher: 'GOV.UK',
        url: 'https://www.gov.uk/paternity-pay-leave/pay',
        description: 'Official 2026/27 £194.32/week SPP threshold and flexibility rules.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-redundancy-pay-calculator',
    title: 'NHS Redundancy Pay Calculator (2026/2027)',
    shortTitle: 'NHS Redundancy Pay Calculator',
    category: 'nhs-employment-calculators',
    iconName: 'ShieldAlert',
    metaTitle: 'NHS Redundancy Pay Calculator 2026/2027 | Section 16 Rules',
    metaDescription:
      'Calculate NHS Agenda for Change Section 16 contractual redundancy pay using 1 month per year of reckonable service, £23k floor, £80k ceiling, and £30k tax-free rules.',
    shortDescription:
      'Section 16 contractual redundancy calculator applying the 24-month cap, £23,000 floor, £80,000 ceiling, and £30,000 HMRC tax exemption.',
    intro:
      'Estimate your NHS Agenda for Change Section 16 contractual redundancy entitlement, including the £23,000 earnings floor, £80,000 cap, 24-month maximum, and £30,000 HMRC tax-free allowance.',
    howToUse: [
      'Enter your actual annual basic salary (or pro-rata actual pay if part-time).',
      'Enter your total complete years of continuous reckonable NHS service (minimum 2 complete years required).',
    ],
    howItWorks: [
      'Applies the AfC Section 16 reference salary floor (£23,000) and ceiling (£80,000), multiplies monthly reference salary by complete years of service (capped at 24 months), and splits the payout into the £30,000 tax-free band and taxable excess.',
    ],
    payrollContext:
      'Unlike statutory redundancy which caps weekly pay and scales by age, NHS Section 16 redundancy pays one full month of reference pay per complete year of reckonable service up to 24 months.',
    example: {
      scenarioTitle: 'Band 7 Manager (£51,930) with 12 Complete Years NHS Service',
      inputsSummary: ['Actual Annual Salary: £51,930', 'Complete Years Service: 12'],
      outputsSummary: [
        { label: 'Entitlement (12 Months Pay)', value: '£51,930.00' },
        { label: 'Tax-Free Portion (First £30k)', value: '£30,000.00' },
        { label: 'Taxable Portion (Above £30k)', value: '£21,930.00' },
      ],
      explanation:
        'Under HMRC rules, the first £30,000 is tax-free while the remaining £21,930 is subject to Income Tax at your marginal rate.',
    },
    assumptions: ['Assumes voluntary/compulsory redundancy under Agenda for Change Section 16 (Scotland variations may apply locally).'],
    limitations: ['Does not apply to NHS England Mutually Agreed Resignation Schemes (MARS), which use different caps.'],
    faqs: [
      {
        question: 'Does NHS Scotland use the £80,000 redundancy salary cap?',
        answer:
          'NHS Scotland operates distinct statutory/policy protections against compulsory redundancy ("no compulsory redundancy" policy in Scottish health boards) and separate severance terms; always check Scottish Workforce circular rules.',
      },
    ],
    relatedCalculators: [
      'nhs-tax-calculator',
      'nhs-pension-calculator',
      'nhs-pay-calculator',
      'nhs-annual-leave-calculator',
    ],
    relatedGuides: ['nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Section 16: Redundancy Pay',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official Section 16 floor, ceiling, and 24-month cap rules.',
      },
      {
        title: 'Tax on Termination & Redundancy Payments',
        publisher: 'GOV.UK',
        url: 'https://www.gov.uk/termination-payments-and-tax-when-you-leave-a-job',
        description: 'HMRC £30,000 tax-free redundancy exemption rules.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
];
