import type { CalculatorDefinition } from '@/types/calculator';

export const SHIFT_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-overtime-calculator',
    title: 'NHS Overtime Calculator (2026/2027)',
    shortTitle: 'NHS Overtime Calculator',
    category: 'nhs-shift-calculators',
    iconName: 'Timer',
    metaTitle: 'NHS Overtime Calculator 2026/2027 | 1.5x, 2.0x & Part-Time Rules',
    metaDescription:
      'Calculate your 2026/2027 NHS Section 3 overtime pay at 1.5x and 2.0x public holiday rates, including part-time plain-time thresholds and Band 8b+ TOIL rules.',
    shortDescription:
      'Agenda for Change Section 3 overtime calculator supporting 1.5x, 2.0x public holidays, part-time plain-time rules, and Band 8b+ TOIL checks.',
    intro:
      'Estimate your gross NHS overtime earnings under Agenda for Change Section 3 for standard overtime (1.5x), public holiday overtime (2.0x), and part-time additional hours.',
    isPopular: true,
    isFeatured: true,
    howToUse: [
      'Select your UK nation, pay band, and pay step (basic salary excluding London HCAS).',
      'Enter your contracted weekly hours (if part-time, extra hours up to 37.5h or 36h Scotland are paid at plain time 1.0x first).',
      'Enter your extra standard overtime hours and any public holiday overtime hours.',
    ],
    howItWorks: [
      'Checks eligibility under Section 3 (Bands 2–8a paid overtime; Bands 8b–9 TOIL), allocates part-time plain-time hours up to full-time hours, and applies 1.5x / 2.0x multipliers to remaining overtime hours.',
    ],
    payrollContext:
      'Under Agenda for Change Section 3, overtime payments are calculated on basic hourly pay excluding High Cost Area Supplements (London weighting) and are normally non-pensionable.',
    example: {
      scenarioTitle: 'Full-Time Band 5 Intermediate (£34,592) Working 12 Overtime Hours',
      inputsSummary: ['Contracted: 37.5h/wk', 'Standard Overtime: 8 hours (1.5x)', 'Public Holiday Overtime: 4 hours (2.0x)'],
      outputsSummary: [
        { label: 'Basic Hourly Rate', value: '£17.69 / hr' },
        { label: '8h Standard Overtime (1.5x)', value: '£212.28' },
        { label: '4h Public Holiday Overtime (2.0x)', value: '£141.52' },
        { label: 'Total Gross Overtime Pay', value: '£353.80' },
      ],
      explanation: 'All 12 hours exceed full-time 37.5 hours and qualify immediately for 1.5x and 2.0x Section 3 overtime rates.',
    },
    assumptions: ['Applies Agenda for Change Section 3 rules; optional 12.07% bank WTR toggle available for bank shifts.'],
    limitations: ['Trusts may offer enhanced local bank rates that exceed standard Section 3 overtime.'],
    faqs: [
      {
        question: 'Are Band 8b, 8c, 8d, or Band 9 staff paid for overtime?',
        answer:
          'Under Agenda for Change Section 3, staff in Bands 8b to 9 are not eligible for paid overtime and instead receive Time Off in Lieu (TOIL).',
      },
      {
        question: 'Is NHS overtime pensionable?',
        answer:
          'No. Paid overtime above full-time weekly hours (37.5h, or 36h in Scotland) is not pensionable. Plain-time extra hours worked by part-time staff up to full-time are pensionable.',
      },
    ],
    relatedCalculators: [
      'nhs-night-shift-pay-calculator',
      'nhs-weekend-pay-calculator',
      'nhs-unsocial-hours-calculator',
      'nhs-hourly-pay-calculator',
    ],
    relatedGuides: ['nhs-overtime-rates-explained', 'nhs-unsocial-hours-pay-explained'],
    officialSources: [
      {
        title: 'Section 3: Overtime Payments',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official AfC overtime eligibility and multiplier rules.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-night-shift-pay-calculator',
    title: 'NHS Night Shift Pay Calculator (2026/2027)',
    shortTitle: 'NHS Night Shift Pay Calculator',
    category: 'nhs-shift-calculators',
    iconName: 'Moon',
    metaTitle: 'NHS Night Shift Pay Calculator 2026/2027 | 8pm–6am Enhancement',
    metaDescription:
      'Calculate your 2026/2027 NHS night shift pay and Section 2 unsocial hours enhancements (+41% Band 2, +35% Band 3, +30% Bands 4–9) for 8pm–6am shifts.',
    shortDescription:
      'Calculate basic pay plus Section 2 night shift enhancements (+41% Band 2, +35% Band 3, +30% Bands 4–9) per shift and per month.',
    intro:
      'Work out your exact 2026/2027 NHS night shift pay—comparing basic daytime pay against your Section 2 night enhancement for hours between 8:00 pm and 6:00 am.',
    howToUse: [
      'Select your UK nation, Agenda for Change pay band, and salary point.',
      'Enter the number of night shifts you work per month and the qualifying unsocial hours per night shift (typically 10–11.5 hours excluding unpaid breaks).',
    ],
    howItWorks: [
      'Applies the official Section 2 night multiplier (+41% for Band 2, +35% for Band 3, +30% for Bands 4–9) to your basic hourly rate.',
    ],
    payrollContext:
      'Night shift enhancements apply to hours worked between 8:00 pm and 6:00 am Monday to Friday. If part of a night shift falls on a Saturday or Sunday, Sunday hours earn the higher Sunday rate (+60% to +83%).',
    example: {
      scenarioTitle: 'Band 5 Nurse (Top Point £39,043) Working 6 Night Shifts/Month',
      inputsSummary: ['Band 5 Top (£19.97/hr basic)', '6 night shifts × 10 unsocial hours = 60 hours/month', 'Rate: +30%'],
      outputsSummary: [
        { label: 'Enhanced Night Hourly Rate', value: '£25.96 / hr' },
        { label: 'Basic Pay for 60 Hours', value: '£1,198.20' },
        { label: 'Night Shift Enhancement (+30%)', value: '+£359.46 / mo' },
        { label: 'Total Monthly Night Shift Pay', value: '£1,557.66' },
      ],
      explanation: 'Working 6 night shifts adds £359.46 gross per month (£4,313.52 per year) on top of basic pay.',
    },
    assumptions: ['Assumes weekday night hours (Monday 8pm – Friday 6am); Sunday night portions earn the Sunday rate.'],
    limitations: ['Unpaid meal breaks must be excluded from qualifying hours entered.'],
    faqs: [
      {
        question: 'Do all hours of a 12-hour NHS night shift get the night enhancement?',
        answer:
          'Only hours between 8:00 pm and 6:00 am qualify as night hours unless your shift starts or finishes inside rules that trigger whole-shift eligibility under local/Section 2 time-overlap rules (more than half the shift inside unsocial hours).',
      },
    ],
    relatedCalculators: [
      'nhs-unsocial-hours-calculator',
      'nhs-weekend-pay-calculator',
      'nhs-overtime-calculator',
      'nhs-pay-calculator',
    ],
    relatedGuides: ['nhs-unsocial-hours-pay-explained'],
    officialSources: [
      {
        title: 'Section 2: Unsocial Hours Payments',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official 8pm–6am night shift enhancement rules.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-weekend-pay-calculator',
    title: 'NHS Weekend Pay Calculator (2026/2027)',
    shortTitle: 'NHS Weekend Pay Calculator',
    category: 'nhs-shift-calculators',
    iconName: 'CalendarDays',
    metaTitle: 'NHS Weekend Pay Calculator 2026/2027 | Saturday & Sunday Rates',
    metaDescription:
      'Estimate your 2026/2027 NHS Saturday and Sunday shift enhancements across Bands 2 to 9 under Agenda for Change Section 2.',
    shortDescription:
      'Separate Saturday (+30%/+35%/+41%) and Sunday (+60%/+69%/+83%) shift pay calculator for 2026/2027 NHS rosters.',
    intro:
      'Calculate how much extra you earn from Saturday and Sunday NHS shifts in 2026/2027 using official Agenda for Change Section 2 weekend multipliers.',
    howToUse: [
      'Select your UK nation, pay band, and salary step.',
      'Enter your rostered Saturday hours per month and Sunday hours per month.',
    ],
    howItWorks: [
      'Applies Saturday enhancement (+41% Band 2, +35% Band 3, +30% Bands 4–9) and Sunday enhancement (+83% Band 2, +69% Band 3, +60% Bands 4–9) separately to your basic hourly rate.',
    ],
    payrollContext:
      'Weekend enhancements apply across all 24 hours from midnight to midnight on Saturdays and Sundays for standard contracted hours, and count as pensionable pay.',
    example: {
      scenarioTitle: 'Band 2 HCA (£25,272) Working 1 Saturday & 1 Sunday Shift (11.5h each)',
      inputsSummary: ['Band 2 (£12.92/hr basic)', 'Saturday: 11.5h (+41%)', 'Sunday: 11.5h (+83%)'],
      outputsSummary: [
        { label: 'Saturday Enhancement (+41%)', value: '+£60.92' },
        { label: 'Sunday Enhancement (+83%)', value: '+£123.32' },
        { label: 'Total Weekend Enhancement', value: '+£184.24' },
      ],
      explanation: 'One full weekend shift pattern adds £184.24 gross on top of basic pay at Band 2.',
    },
    assumptions: ['Assumes rostered standard hours rather than overtime above 37.5h/36h.'],
    limitations: ['Excludes HCAS as required by Section 2 rules.'],
    faqs: [
      {
        question: 'Why is Sunday pay higher than Saturday pay in the NHS?',
        answer:
          'Agenda for Change Section 2 classifies Sundays and Public Holidays in the higher enhancement tier (+60% for Bands 4–9, rising to +83% for Band 2), compared with +30% to +41% for Saturdays and weekday nights.',
      },
    ],
    relatedCalculators: [
      'nhs-unsocial-hours-calculator',
      'nhs-night-shift-pay-calculator',
      'nhs-bank-holiday-pay-calculator',
      'nhs-overtime-calculator',
    ],
    relatedGuides: ['nhs-unsocial-hours-pay-explained'],
    officialSources: [
      {
        title: 'Section 2: Weekend Shift Enhancements',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official Saturday and Sunday enhancement tables.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-unsocial-hours-calculator',
    title: 'NHS Unsocial Hours Calculator (2026/2027)',
    shortTitle: 'NHS Unsocial Hours Calculator',
    category: 'nhs-shift-calculators',
    iconName: 'SunMoon',
    metaTitle: 'NHS Unsocial Hours Calculator 2026/2027 | Full Roster Enhancement',
    metaDescription:
      'Calculate total monthly and annual NHS Section 2 unsocial hours pay across weekday shifts, nights, Saturdays, Sundays, and bank holidays.',
    shortDescription:
      'Full monthly roster builder combining daytime, night, Saturday, Sunday, and bank holiday hours into one blended hourly rate and enhancement total.',
    intro:
      'Build your monthly NHS shift pattern across standard days, nights, Saturdays, Sundays, and bank holidays to see your total Section 2 enhancement and blended hourly rate.',
    isFeatured: true,
    howToUse: [
      'Choose your UK nation, pay band, and salary step.',
      'Enter your monthly hours for each shift type: standard daytime, weekday nights (8pm–6am), Saturdays, Sundays, and Bank Holidays.',
    ],
    howItWorks: [
      'Calculates basic pay across all hours entered, adds each Section 2 enhancement tier separately, and computes both your annualised unsocial uplift and your blended hourly rate.',
    ],
    payrollContext:
      'Section 2 unsocial hours enhancements are pensionable—so regular night and weekend rosters increase both your monthly take-home pay and your 1/54th CARE pension accrual.',
    example: {
      scenarioTitle: 'Band 5 Entry (£32,073) Monthly Mixed Ward Roster',
      inputsSummary: ['Day: 90h', 'Night: 34.5h (+30%)', 'Saturday: 11.5h (+30%)', 'Sunday: 11.5h (+60%)'],
      outputsSummary: [
        { label: 'Basic Pay (147.5h)', value: '£2,419.00' },
        { label: 'Total Unsocial Enhancement', value: '+£339.48 / mo' },
        { label: 'Total Gross Shift Pay', value: '£2,758.48 / mo' },
        { label: 'Blended Hourly Rate', value: '£18.70 / hr' },
      ],
      explanation: 'Mixing 3 nights and 1 weekend per month lifts the effective hourly rate from £16.40 to £18.70.',
    },
    assumptions: ['Excludes London HCAS from enhancement base per Section 2 terms.'],
    limitations: ['Sickness or annual leave unsocial hours average pay (CAP) varies by Trust 3-month reference period.'],
    faqs: [
      {
        question: 'Do I still receive unsocial hours pay while on annual leave?',
        answer:
          'Yes. Under Agenda for Change Section 13.9, staff who regularly receive unsocial hours enhancements are entitled to average unsocial hours pay during annual leave based on a local reference period.',
      },
    ],
    relatedCalculators: [
      'nhs-night-shift-pay-calculator',
      'nhs-weekend-pay-calculator',
      'nhs-bank-holiday-pay-calculator',
      'nhs-pay-calculator',
    ],
    relatedGuides: ['nhs-unsocial-hours-pay-explained', 'nhs-overtime-rates-explained'],
    officialSources: [
      {
        title: 'Section 2: Unsocial Hours & Section 13.9 Leave Pay',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Handbook rules on unsocial shifts and holiday pay averaging.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'nhs-bank-holiday-pay-calculator',
    title: 'NHS Bank Holiday Pay Calculator (2026/2027)',
    shortTitle: 'NHS Bank Holiday Pay Calculator',
    category: 'nhs-shift-calculators',
    iconName: 'Sparkles',
    metaTitle: 'NHS Bank Holiday Pay Calculator 2026/2027 | Rostered vs Overtime',
    metaDescription:
      'Calculate NHS Bank Holiday pay for 2026/2027—comparing Section 2 rostered enhancements (+83% Band 2, +69% Band 3, +60% Bands 4–9) against 2.0x overtime.',
    shortDescription:
      'Compare rostered Bank Holiday pay (+60% to +83% plus day off in lieu) versus 2.0x Public Holiday overtime.',
    intro:
      'Calculate your 2026/2027 NHS Bank Holiday shift earnings whether you are working a rostered shift (with a day in lieu) or authorised 2.0x public holiday overtime.',
    howToUse: [
      'Select your UK nation, pay band, and salary step.',
      'Enter the number of Bank Holiday hours worked and choose whether the shift is part of your standard rostered week (Section 2) or extra overtime above full-time (Section 3).',
    ],
    howItWorks: [
      'Under Section 2 rostered rules, pays basic rate plus +83% (Band 2), +69% (Band 3), or +60% (Bands 4–9) and flags your statutory hours back in lieu. Under Section 3 overtime, calculates 2.0x double time.',
    ],
    payrollContext:
      'Working a rostered Bank Holiday in the NHS does not reduce your annual public holiday entitlement—your hours worked on the bank holiday remain in your annual leave pot to be taken another day.',
    example: {
      scenarioTitle: 'Band 5 Top (£39,043) Working an 11.5h Rostered Bank Holiday',
      inputsSummary: ['Band 5 Top (£19.97/hr basic)', 'Shift: 11.5h Rostered Bank Holiday (+60%)'],
      outputsSummary: [
        { label: 'Basic Pay (11.5h)', value: '£229.66' },
        { label: 'Bank Holiday Enhancement (+60%)', value: '+£137.79' },
        { label: 'Total Shift Gross Pay', value: '£367.45' },
        { label: 'Leave Hours Returned to Pot', value: '11.5 hours in lieu' },
      ],
      explanation: 'Rostered staff earn +60% enhancement (£31.95/hr) and retain their bank holiday leave hours.',
    },
    assumptions: ['Excludes London HCAS when multiplying basic hourly pay.'],
    limitations: ['Scotland and Northern Ireland observe slightly different national public holiday calendars (9–10 days in some localities vs 8 in England/Wales).'],
    faqs: [
      {
        question: 'Do I get double time AND a day off in lieu for working an NHS Bank Holiday?',
        answer:
          'No. Rostered Bank Holiday shifts pay basic time + Section 2 enhancement (+60% to +83%) plus you keep your Bank Holiday hours to take on another day. Double time (2.0x) applies only when the shift is worked as authorised Section 3 overtime.',
      },
    ],
    relatedCalculators: [
      'nhs-holiday-entitlement-calculator',
      'nhs-unsocial-hours-calculator',
      'nhs-overtime-calculator',
      'nhs-weekend-pay-calculator',
    ],
    relatedGuides: ['nhs-unsocial-hours-pay-explained', 'nhs-overtime-rates-explained'],
    officialSources: [
      {
        title: 'Section 2 & Section 13: Public Holidays',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
        description: 'Official NHS public holiday pay and leave-in-lieu rules.',
      },
    ],
    lastUpdated: '2026-04-10',
  },
];
