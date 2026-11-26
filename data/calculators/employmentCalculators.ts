import type { CalculatorDefinition } from '@/types/calculator';

export const EMPLOYMENT_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-annual-leave-calculator',
    title: 'NHS Annual Leave Calculator (2026/2027)',
    shortTitle: 'NHS Annual Leave Calculator',
    category: 'nhs-employment-calculators',
    iconName: 'CalendarCheck',
    metaTitle: 'NHS Annual Leave Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Agenda for Change annual leave in days and hours, covering 5-year and 10-year service jumps and part-time pro-rata rules.',
    shortDescription:
      'Calculate Section 13 NHS annual leave in days and hours by length of service, contracted hours, and UK nation (37.5h vs 36h).',
    intro:
      'Work out your exact NHS Agenda for Change annual leave entitlement in both days and hours—including 5-year and 10-year service uplifts, part-time pro-rata scaling, and mid-year starters.',
    isPopular: true,
    isFeatured: true,
    howToUse: [
      'Select your UK nation (England, Wales, and NI use a 37.5-hour / 7.5h-day model; Scotland uses a 36.0-hour / 7.2h-day model).',
      'Enter your total years of continuous reckonable NHS service to match the 0–4, 5–9, or 10+ year leave band.',
      'Enter your contracted weekly hours and months worked in the current leave year (1 April to 31 March) to calculate pro-rata annual leave and bank holiday hours.',
    ],
    howItWorks: [
      'Maps your reckonable NHS service to Agenda for Change Section 13 tiers: 27 days + 8 bank holidays under 5 years, 29 days + 8 bank holidays after 5 years, and 33 days + 8 bank holidays after 10 years.',
      'Converts full-time days into annual hours using 7.5 hours per day in England, Wales, and Northern Ireland (or 7.2 hours per day in Scotland’s 36-hour week), then multiplies by your Whole Time Equivalent (WTE) ratio and months worked ÷ 12.',
    ],
    payrollContext:
      'Most NHS Trusts manage annual leave in hours rather than days for clinical shift staff so that 11.5-hour or 12-hour long days deduct accurately from the combined annual leave and bank holiday pot.',
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
    referenceTable: {
      caption: 'NHS Section 13 Full-Time Annual Leave Entitlements (England 37.5h vs Scotland 36h)',
      headers: ['NHS Service Length', 'Base Days + BH', 'Total Days', 'England Hours (7.5h/d)', 'Scotland Hours (7.2h/d)'],
      rows: [
        ['On appointment (< 5 yrs)', '27 + 8 days', '35 days', '262.5 hrs', '252.0 hrs'],
        ['After 5 years service', '29 + 8 days', '37 days', '277.5 hrs', '266.4 hrs'],
        ['After 10 years service', '33 + 8 days', '41 days', '307.5 hrs', '295.2 hrs'],
      ],
    },
    assumptions: [
      'Uses the standard 8 General Public Holidays model (England/Wales); local Trusts in Scotland and Northern Ireland may allocate 9–10 public holidays.',
      'Leave year runs from 1 April to 31 March under standard Agenda for Change rules.',
    ],
    limitations: [
      'Some Trusts round calculated annual leave hours up to the nearest 0.5 hour on ESR or HealthRoster.',
      'Does not include local buy/sell annual leave schemes or carried-over leave from the previous leave year.',
    ],
    faqs: [
      {
        question: 'When does my extra NHS annual leave kick in at 5 or 10 years?',
        answer:
          'Under Agenda for Change Section 13, your increased entitlement starts from your 5-year or 10-year continuous service anniversary date, pro-rated for the remaining complete months or days of that leave year.',
      },
      {
        question: 'How does NHS annual leave work if I work part-time (e.g., 22.5 or 30 hours)?',
        answer:
          'Both your base annual leave AND your 8 Bank Holiday days are combined and multiplied by your WTE ratio (contracted hours ÷ 37.5, or ÷ 36 in Scotland). If a Bank Holiday falls on a day you would normally work and you take it off, you deduct those shift hours from your combined pot.',
      },
      {
        question: 'Does previous NHS service count towards my 5-year or 10-year leave jump?',
        answer:
          'Yes. Under Section 13, aggregate reckonable service across NHS employers normally counts towards the 5-year and 10-year annual leave thresholds even if there was a break in service—unlike continuous service rules for redundancy or maternity pay.',
      },
    ],
    relatedCalculators: [
      'nhs-bank-holiday-pay-calculator',
      'nhs-sick-pay-calculator',
      'nhs-maternity-pay-calculator',
      'nhs-pay-calculator',
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
    slug: 'nhs-sick-pay-calculator',
    title: 'NHS Sick Pay Calculator (2026/2027)',
    shortTitle: 'NHS Sick Pay Calculator',
    category: 'nhs-employment-calculators',
    iconName: 'HeartPulse',
    metaTitle: 'NHS Sick Pay Calculator 2026/27 | NHS Staff Calculator',
    metaDescription:
      'Estimate 2026/27 NHS Agenda for Change Section 14 Occupational Sick Pay (OSP) full-pay and half-pay months, plus Statutory Sick Pay interaction.',
    shortDescription:
      'Calculate Section 14 Occupational Sick Pay full-pay and half-pay months by NHS service length, plus SSP interaction.',
    intro:
      'Check how many months of full pay and half pay you qualify for under NHS Agenda for Change Section 14 Occupational Sick Pay (OSP) and estimate your absence income.',
    howToUse: [
      'Select your length of continuous NHS service band (from Year 1 up to 5+ years of service).',
      'Enter your actual annual gross salary (including regular pensionable allowances) and planned sickness absence duration in weeks.',
      'Review how many weeks are paid at Full Pay, Half Pay + SSP (capped at full normal pay), and Statutory Sick Pay only.',
    ],
    howItWorks: [
      'Maps your service band to Agenda for Change Section 14 OSP allowances: 1 month full + 2 months half (Year 1), 2+2 months (Year 2), 4+4 months (Year 3), 5+5 months (Years 4–5), and 6+6 months (After 5 years).',
      'Converts full-pay and half-pay months into calendar weeks, then adds Statutory Sick Pay (2026/27 default £123.25/week) during half-pay weeks—capping the combined weekly payment at 100% of your normal weekly pay in line with Section 14.4.',
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
    referenceTable: {
      caption: 'NHS Agenda for Change Section 14 Occupational Sick Pay Tiers',
      headers: ['Length of NHS Service', 'Full Pay Allowance', 'Half Pay Allowance', 'Total Paid OSP Period'],
      rows: [
        ['During 1st year of service', '1 Month', '2 Months', '3 Months'],
        ['During 2nd year of service', '2 Months', '2 Months', '4 Months'],
        ['During 3rd year of service', '4 Months', '4 Months', '8 Months'],
        ['During 4th & 5th years', '5 Months', '5 Months', '10 Months'],
        ['After 5 years of service', '6 Months', '6 Months', '12 Months'],
      ],
    },
    assumptions: [
      'Assumes full Section 14 OSP allowance is available with zero prior sickness absences in the rolling 12-month lookback period.',
      'Uses the 2026/27 Statutory Sick Pay weekly reference (£123.25/wk) unless adjusted in the inputs.',
    ],
    limitations: [
      'Any sick leave taken during the preceding 12 months is deducted from your remaining OSP allowance under Section 14 rolling rules.',
      'Does not model special injury allowance, phased return-to-work pay top-ups, or Trust discretion to extend sick pay.',
    ],
    faqs: [
      {
        question: 'Does NHS sick pay include unsocial hours enhancements?',
        answer:
          'Yes for eligible staff: under Section 14, sickness absence pay is normally based on what you would have received had you been at work (including regular unsocial hours enhancements), subject to AfC pay-band rules and Trust reference periods.',
      },
      {
        question: 'How does the rolling 12-month NHS sick pay calculation work?',
        answer:
          'Every day you are off sick, HR counts backwards 12 months from the first day of your current absence. Any paid sickness days already used in that 12-month window are subtracted from your full-pay and half-pay allowances.',
      },
      {
        question: 'Do NHS Pension deductions continue while on half sick pay?',
        answer:
          'Yes. You pay your normal NHS Pension percentage on the actual sick pay you receive during full pay and half pay, while your employer continues funding based on assumed unreduced pay so your 1/54th CARE pension accrual is protected during paid sick leave.',
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
    metaTitle: 'NHS Maternity Pay Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Occupational Maternity Pay (OMP) and Statutory Maternity Pay (£194.32/wk SMP) week-by-week across your full 52-week maternity leave.',
    shortDescription:
      'Week-by-week 52-week maternity schedule modelling 8 weeks Full Pay, 18 weeks Half Pay + £194.32 SMP, and 13 weeks SMP.',
    intro:
      'Plan your 2026/2027 NHS maternity leave income across all 52 weeks—modelling NHS Occupational Maternity Pay (OMP) alongside the £194.32/week Statutory Maternity Pay (SMP) rate.',
    howToUse: [
      'Enter your annual average NHS gross salary (normally assessed during the 8-week qualifying period prior to the 15th week before your expected week of childbirth).',
      'Toggle whether you have at least 12 months continuous NHS service (for Occupational Maternity Pay) and 26 weeks with your current Trust (for SMP).',
      'Review your week-by-week gross income across Weeks 1–8, Weeks 9–26, Weeks 27–39, and Weeks 40–52 unpaid leave.',
    ],
    howItWorks: [
      'For staff qualifying for both OMP and SMP, Weeks 1–8 pay 100% Full Pay (inclusive of SMP), Weeks 9–26 pay 50% Half Pay plus £194.32/week SMP (capped so combined pay never exceeds 100% normal weekly pay), Weeks 27–39 pay £194.32/week SMP, and Weeks 40–52 are unpaid.',
      'If you have under 12 months continuous NHS service but meet the 26-week Trust and £129/week Lower Earnings Limit tests, the calculator models statutory SMP-only (6 weeks at 90% of average weekly earnings followed by 33 weeks at £194.32/week).',
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
    referenceTable: {
      caption: '2026/27 NHS Occupational Maternity Pay (OMP) vs Statutory SMP Schedule',
      headers: ['Maternity Period', 'NHS OMP + SMP (12m+ Service)', 'Statutory SMP Only (<12m Service)'],
      rows: [
        ['Weeks 1 – 6', '100% Full Pay (incl. SMP)', '90% of Average Weekly Earnings'],
        ['Weeks 7 – 8', '100% Full Pay (incl. SMP)', '£194.32/wk (or 90% if lower)'],
        ['Weeks 9 – 26', '50% Half Pay + £194.32/wk SMP', '£194.32/wk (or 90% if lower)'],
        ['Weeks 27 – 39', '£194.32/wk SMP Only', '£194.32/wk (or 90% if lower)'],
        ['Weeks 40 – 52', 'Unpaid Additional Leave', 'Unpaid Additional Leave'],
      ],
    },
    assumptions: [
      'Assumes you intend to return to NHS employment for at least 3 months post-maternity leave to retain the occupational portion of OMP.',
      'Uses the official 2026/27 SMP weekly rate of £194.32 and Lower Earnings Limit of £129.00/week.',
    ],
    limitations: [
      'Annual leave and public holidays continue accruing during maternity leave (often worth 4–6 weeks extra pay/leave on return) and are not added to this cash schedule.',
      'Keep in Touch (KIT) day payments and Trust equal-monthly pay averaging requests are not modelled automatically.',
    ],
    faqs: [
      {
        question: 'Can I choose to spread my NHS maternity pay evenly across all months?',
        answer:
          'Many NHS Trusts allow you to average your Occupational Maternity Pay evenly across your paid maternity months on request to payroll, smoothing out the income drop in Weeks 27–39.',
      },
      {
        question: 'Do I lose my NHS maternity pay if I change Trusts or do not return?',
        answer:
          'Under Section 15, you must return to work for the NHS (with the same or another NHS employer) for at least 3 months after maternity leave to keep Occupational Maternity Pay; otherwise the Trust can reclaim the occupational element above SMP.',
      },
      {
        question: 'Does unpaid maternity leave (Weeks 40–52) count towards my NHS Pension?',
        answer:
          'During paid maternity leave (Weeks 1–39), you pay pension contributions only on what you earn while your employer funds pension accrual on full normal pay. During unpaid leave (Weeks 40–52), you can elect to pay arrears on return if you wish those weeks to count.',
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
    metaTitle: 'NHS Paternity Pay Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Occupational Paternity Pay (2 weeks full pay) or Statutory Paternity Pay (£194.32/wk) under Agenda for Change Section 15 rules.',
    shortDescription:
      'Check eligibility for 2 weeks NHS Full Pay paternity leave versus 2026/27 Statutory Paternity Pay (£194.32/wk).',
    intro:
      'Estimate your 2026/2027 NHS paternity leave pay—comparing NHS Occupational Paternity Pay (full pay) against Statutory Paternity Pay (£194.32/week).',
    howToUse: [
      'Enter your annual gross NHS salary (including regular pensionable enhancements where applicable) and choose 1 week or 2 weeks of leave.',
      'Select whether you have at least 12 months continuous NHS service (for NHS Occupational Paternity Pay) and 26 weeks with your current Trust (for SPP).',
      'Compare your full-pay entitlement against the 2026/27 Statutory Paternity Pay baseline (£194.32/week).',
    ],
    howItWorks: [
      'Checks Agenda for Change Section 15 qualifying criteria: employees with 12+ months continuous NHS service earn 2 weeks at 100% full average weekly pay (inclusive of SPP).',
      'Employees under 12 months NHS service who meet the 26-week Trust and £129/week Lower Earnings Limit rules receive Statutory Paternity Pay at £194.32/week (or 90% of average weekly earnings if lower).',
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
    referenceTable: {
      caption: '2026/27 NHS Paternity Pay Comparison by Qualifying Service',
      headers: ['Leave Tier', 'Qualifying Service', 'Weekly Gross Rate', '2-Week Band 5 Example (£34,592)'],
      rows: [
        ['NHS Occupational Paternity Pay', '12+ months continuous NHS', '100% Full Weekly Pay', '£1,326.82 gross'],
        ['Statutory Paternity Pay (SPP)', '26+ weeks Trust (≥ £129/wk)', '£194.32/wk (or 90% AWE)', '£388.64 gross'],
      ],
    },
    assumptions: [
      'Based on Agenda for Change Section 15 new parent provisions and 2026/27 GOV.UK £194.32/week SPP rates.',
      'Earnings are assumed to exceed the £129.00/week Lower Earnings Limit.',
    ],
    limitations: [
      'Shared Parental Leave (ShPL) transfers and Neonatal Care Leave rules are not modelled in this 1–2 week paternity tool.',
      'Does not calculate net take-home tax/NI deductions on your weekly pay.',
    ],
    faqs: [
      {
        question: 'Can NHS paternity leave be split into two separate 1-week blocks?',
        answer:
          'Following UK statutory paternity leave updates, employees can normally take their 2 weeks of paternity leave either as one 2-week block or two separate 1-week blocks within 52 weeks of birth or placement.',
      },
      {
        question: 'Do I qualify for NHS full-pay paternity leave if I recently moved Trusts?',
        answer:
          'If you moved between NHS Trusts without a break in service and have 12+ months continuous NHS service by the expected week of childbirth, Section 15 Occupational Paternity Pay normally carries across under continuous NHS service rules.',
      },
      {
        question: 'Can I take Shared Parental Leave on top of NHS paternity leave?',
        answer:
          'Yes. If the mother or primary adopter curtails their maternity/adoption leave, eligible partners can access NHS Occupational Shared Parental Pay under Section 15 on similar enhanced terms.',
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
    metaTitle: 'NHS Redundancy Pay Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Section 16 redundancy pay using 1 month per year of service, £23k floor, £80k ceiling, 24-month cap, and £30k tax-free rules.',
    shortDescription:
      'Section 16 contractual redundancy calculator applying the 24-month cap, £23,000 floor, £80,000 ceiling, and £30,000 HMRC tax exemption.',
    intro:
      'Estimate your NHS Agenda for Change Section 16 contractual redundancy entitlement, including the £23,000 earnings floor, £80,000 cap, 24-month maximum, and £30,000 HMRC tax-free allowance.',
    howToUse: [
      'Enter your actual annual basic salary (or your actual part-time pro-rata basic salary if working under 37.5 hours/week).',
      'Enter your total complete years of continuous reckonable NHS service (minimum 2 complete years / 104 weeks required to qualify).',
      'Review your gross redundancy entitlement, the £30,000 HMRC tax-free band, and any taxable excess above £30,000.',
    ],
    howItWorks: [
      'Checks the minimum 2 complete years of reckonable NHS service test, then applies Agenda for Change Section 16 salary bounds: any reference salary below £23,000 is lifted to £23,000, while salaries above £80,000 are capped at £80,000 (pro-rated if part-time).',
      'Multiplies one month of capped reference salary (reference salary ÷ 12) by complete years of reckonable service, capped at a maximum of 24 months pay. Under HMRC termination rules, the first £30,000 of genuine redundancy pay is Income Tax and NI free.',
    ],
    payrollContext:
      'Unlike UK statutory redundancy which caps weekly pay and scales by age, NHS Section 16 contractual redundancy pays one full month of reference pay per complete year of reckonable service up to 24 months.',
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
    referenceTable: {
      caption: 'NHS Section 16 Redundancy Reference Bounds & Tax Treatment',
      headers: ['Rule Component', 'AfC Section 16 / HMRC Threshold', 'Payroll Effect'],
      rows: [
        ['Minimum Service', '2 complete years (104 weeks)', 'Required to qualify for Section 16'],
        ['Multiplier', '1 month pay per complete year', 'Maximum payout capped at 24 months'],
        ['Salary Floor', '£23,000 (WTE / pro-rata)', 'Salaries under £23k lifted to floor'],
        ['Salary Ceiling', '£80,000 (WTE / pro-rata)', 'Salaries above £80k capped at ceiling'],
        ['HMRC Exemption', 'First £30,000', 'Tax-free; excess taxed at marginal rate'],
      ],
    },
    assumptions: [
      'Models Agenda for Change Section 16 contractual redundancy terms (England/Wales framework).',
      'Assumes redundancy payment rather than Payment in Lieu of Notice (PILON), which is separately taxable.',
    ],
    limitations: [
      'NHS England Mutually Agreed Resignation Schemes (MARS) operate separate local caps and lower multipliers.',
      'Does not calculate early pension access costs or actuarial reductions for staff aged 55+ taking early retirement on redundancy.',
    ],
    faqs: [
      {
        question: 'Does NHS Scotland use the £80,000 redundancy salary cap?',
        answer:
          'NHS Scotland operates distinct statutory/policy protections against compulsory redundancy ("no compulsory redundancy" policy in Scottish health boards) and separate severance terms; always check Scottish Workforce circular rules.',
      },
      {
        question: 'Do I pay National Insurance on NHS redundancy pay over £30,000?',
        answer:
          'Employee Class 1 National Insurance is not deducted on genuine redundancy payments even above £30,000, though Income Tax applies to the excess above £30,000 (and employers pay Class 1A NI on the excess).',
      },
      {
        question: 'Can I return to work for another NHS Trust after receiving NHS redundancy pay?',
        answer:
          'Under Section 16, if you take up another NHS post within 4 weeks (or receive a suitable alternative offer before termination), your right to redundancy pay can be forfeited or subject to clawback rules for higher-paid staff.',
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
