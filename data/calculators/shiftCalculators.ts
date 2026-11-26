import type { CalculatorDefinition } from '@/types/calculator';

export const SHIFT_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'nhs-overtime-calculator',
    title: 'NHS Overtime Calculator (2026/2027)',
    shortTitle: 'NHS Overtime Calculator',
    category: 'nhs-shift-calculators',
    iconName: 'Timer',
    metaTitle: 'NHS Overtime Calculator 2026/27 | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Section 3 overtime pay at 1.5x standard and 2.0x public holiday rates, including part-time rules and Band 8b+ TOIL checks.',
    shortDescription:
      'Agenda for Change Section 3 overtime calculator supporting 1.5x, 2.0x public holidays, part-time plain-time rules, and Band 8b+ TOIL checks.',
    intro:
      'Estimate your gross NHS overtime earnings under Agenda for Change Section 3 for standard overtime (1.5x), public holiday overtime (2.0x), and part-time additional hours.',
    isPopular: true,
    isFeatured: true,
    howToUse: [
      'Select your UK nation (37.5h standard week in England, Wales, and NI; 36.0h in Scotland), your Agenda for Change band, and salary step.',
      'Enter your contracted weekly hours—if you work part-time, extra hours up to the full-time threshold are allocated at plain time (1.0x) first.',
      'Enter your standard overtime hours (1.5x) and public holiday overtime hours (2.0x), and optionally enable the 12.07% Working Time Regulations (WTR) toggle for bank shifts.',
    ],
    howItWorks: [
      'First checks Agenda for Change Section 3 eligibility: staff in Bands 2 to 8a are eligible for paid overtime, whereas Bands 8b, 8c, 8d, and Band 9 receive Time Off in Lieu (TOIL) instead of overtime payments.',
      'Computes your basic hourly rate excluding London HCAS (37.5h × 52.1429 = 1,955.36 hours/year in rUK, or 1,877.14 hours/year in Scotland). For part-time staff, additional hours up to 37.5h/week (or 36h in Scotland) are paid at 1.0x plain time (pensionable, and eligible for Section 2 unsocial hours if worked unsocially).',
      'Hours worked above the full-time weekly threshold earn 1.5x time-and-a-half on standard days, Saturdays, Sundays, and nights, or 2.0x double time on General Public Holidays.',
    ],
    payrollContext:
      'Under Agenda for Change Section 3, overtime payments are calculated strictly on basic hourly pay excluding High Cost Area Supplements (London weighting) and are normally non-pensionable.',
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
    referenceTable: {
      caption: '2026/27 England AfC Section 3 Overtime Hourly Rates (Excl. HCAS)',
      headers: ['Pay Point', 'Basic Hourly (1.0x)', 'Standard Overtime (1.5x)', 'Public Holiday (2.0x)'],
      rows: [
        ['Band 2 Single Point', '£12.92', '£19.39', '£25.85'],
        ['Band 3 Top Point', '£14.05', '£21.08', '£28.10'],
        ['Band 5 Entry', '£16.40', '£24.60', '£32.81'],
        ['Band 5 Top', '£19.97', '£29.95', '£39.93'],
        ['Band 6 Entry', '£20.44', '£30.65', '£40.87'],
        ['Band 7 Top', '£28.90', '£43.35', '£57.81'],
      ],
    },
    assumptions: [
      'Applies Agenda for Change Section 3 multipliers (1.5x standard, 2.0x public holiday) on basic pay excluding London HCAS.',
      'Optional 12.07% Working Time Regulations (WTR) uplift models rolled-up annual leave pay where applicable for bank shifts.',
    ],
    limitations: [
      'Many Trusts offer fixed local bank hourly rates or enhanced escalation rates that differ from standard Section 3 overtime.',
      'Does not calculate Income Tax, NI, or Student Loan deductions on overtime spikes—enter extra income in the NHS Pay Calculator to model net payslip impact.',
    ],
    faqs: [
      {
        question: 'Are Band 8b, 8c, 8d, or Band 9 staff paid for overtime?',
        answer:
          'Under Agenda for Change Section 3, staff in Bands 8b to 9 are not eligible for paid overtime and instead receive Time Off in Lieu (TOIL).',
      },
      {
        question: 'Is NHS overtime pensionable?',
        answer:
          'No. Paid overtime above full-time weekly hours (37.5h, or 36h in Scotland) is not pensionable. Plain-time extra hours worked by part-time staff up to full-time hours are pensionable.',
      },
      {
        question: 'Do part-time NHS staff get 1.5x overtime for every extra shift?',
        answer:
          'Not immediately. Under Section 3, part-time employees are paid plain time (1.0x, plus Section 2 unsocial hours if applicable) for additional hours up to 37.5 hours/week (36 hours in Scotland), and 1.5x overtime only once total weekly hours exceed full-time.',
      },
    ],
    relatedCalculators: [
      'nhs-unsocial-hours-calculator',
      'nhs-bank-holiday-pay-calculator',
      'nhs-pay-calculator',
      'nhs-salary-calculator',
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
    slug: 'nhs-unsocial-hours-calculator',
    title: 'NHS Unsocial Hours Calculator (2026/2027)',
    shortTitle: 'NHS Unsocial Hours Calculator',
    category: 'nhs-shift-calculators',
    iconName: 'SunMoon',
    metaTitle: 'NHS Unsocial Hours Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Section 2 unsocial hours pay across days, nights, Saturdays, Sundays, and bank holidays—with blended hourly rate and annual uplift.',
    shortDescription:
      'Full monthly roster builder combining daytime, night, Saturday, Sunday, and bank holiday hours into one blended hourly rate and enhancement total.',
    intro:
      'Build your monthly NHS shift pattern across standard days, nights, Saturdays, Sundays, and bank holidays to see your total Section 2 enhancement and blended hourly rate.',
    isPopular: true,
    isFeatured: true,
    howToUse: [
      'Choose your UK nation (England, Wales, Scotland, or Northern Ireland), Agenda for Change pay band, and increment step.',
      'Enter your monthly hours worked across each roster category: standard daytime, weekday nights (8pm–6am), Saturdays, Sundays, and Bank Holidays.',
      'Inspect your total gross shift pay, Section 2 enhancement breakdown, annualised unsocial uplift, and effective blended hourly rate.',
    ],
    howItWorks: [
      'Derives your basic hourly rate excluding London HCAS, then applies Agenda for Change Section 2 unsocial hours multipliers by pay band: Band 2 receives +41% for nights/Saturdays and +83% for Sundays/Bank Holidays; Band 3 receives +35% and +69%; Bands 4–9 receive +30% and +60%.',
      'Combines basic hours pay with each shift enhancement tier separately, then annualises the regular enhancement so you can see how much extra pensionable income your shift pattern generates over a full year.',
    ],
    payrollContext:
      'Section 2 unsocial hours enhancements are pensionable—so regular night and weekend rosters increase both your monthly take-home pay and your 1/54th CARE pension accrual (while potentially lifting you into a higher NHS Pension tier).',
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
    referenceTable: {
      caption: 'NHS Agenda for Change Section 2 Unsocial Hours Multipliers (2026/27)',
      headers: ['Pay Band', 'Weekday Nights (8pm–6am)', 'Saturday Shifts', 'Sunday & Bank Holidays'],
      rows: [
        ['Band 2', '+41% (1.41x)', '+41% (1.41x)', '+83% (1.83x)'],
        ['Band 3', '+35% (1.35x)', '+35% (1.35x)', '+69% (1.69x)'],
        ['Band 4 – Band 9', '+30% (1.30x)', '+30% (1.30x)', '+60% (1.60x)'],
      ],
    },
    assumptions: [
      'Excludes London High Cost Area Supplements from the hourly enhancement base per Section 2 terms.',
      'Models rostered Section 2 shifts within standard contracted hours (rather than Section 3 overtime).',
    ],
    limitations: [
      'Annual leave and sickness unsocial hours averaging (CAP) depends on your Trust’s local 3-month or 12-week reference period.',
      'Does not calculate payroll tax or NI deductions; plug the annualised enhancement into the NHS Pay Calculator for net figures.',
    ],
    faqs: [
      {
        question: 'Do I still receive unsocial hours pay while on annual leave?',
        answer:
          'Yes. Under Agenda for Change Section 13.9, staff who regularly receive unsocial hours enhancements are entitled to average unsocial hours pay during annual leave based on a local reference period.',
      },
      {
        question: 'Why do Band 2 and Band 3 get higher unsocial hours percentages than Band 5?',
        answer:
          'When Agenda for Change unsocial hours rules were harmonised, Bands 2 and 3 retained higher percentage multipliers (+41%/+83% and +35%/+69%) to protect take-home pay for lower-paid clinical support staff.',
      },
      {
        question: 'How does the 4-hour rule work on NHS night shifts?',
        answer:
          'Under Section 2, if a weekday night shift includes at least 4 hours between 8pm and 6am (and more than half the shift falls in those hours), or for any hours worked between 8pm and 6am where applicable, the night enhancement rate applies across the eligible hours per Trust roster policy.',
      },
    ],
    relatedCalculators: [
      'nhs-overtime-calculator',
      'nhs-bank-holiday-pay-calculator',
      'nhs-pay-calculator',
      'nhs-pension-contribution-calculator',
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
    metaTitle: 'NHS Bank Holiday Pay Calculator | NHS Staff Calculator',
    metaDescription:
      'Calculate 2026/27 NHS Bank Holiday pay—comparing Section 2 rostered rates (+83% Band 2, +69% Band 3, +60% Bands 4–9) and lieu hours vs 2.0x overtime.',
    shortDescription:
      'Compare rostered Bank Holiday pay (+60% to +83% plus day off in lieu) versus 2.0x Public Holiday overtime.',
    intro:
      'Calculate your 2026/2027 NHS Bank Holiday shift earnings whether you are working a rostered shift (with a day in lieu) or authorised 2.0x public holiday overtime.',
    howToUse: [
      'Select your UK nation, Agenda for Change pay band, and salary step.',
      'Enter the total Bank Holiday shift hours worked (for example 7.5h, 11.5h, or 12.0h).',
      'Switch between Rostered Shift (Section 2 enhancement plus leave hours returned in lieu) and Extra Overtime Shift (Section 3 double time 2.0x) to compare payouts.',
    ],
    howItWorks: [
      'For rostered shifts under Agenda for Change Section 2, pays basic hourly pay plus +83% (Band 2), +69% (Band 3), or +60% (Bands 4–9) and logs the equivalent shift hours as retained in your annual leave pot to take as time off in lieu.',
      'For authorised overtime above full-time contracted hours under Section 3 (Bands 2–8a), calculates 2.0x double time without additional leave in lieu.',
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
    referenceTable: {
      caption: '2026/27 England Bank Holiday Hourly Rates: Rostered (Section 2) vs Overtime (Section 3)',
      headers: ['Pay Point', 'Basic Hourly', 'Rostered (+Enhancement)', 'Overtime (2.0x)'],
      rows: [
        ['Band 2 Single Point', '£12.92', '£23.65 (+83%)', '£25.85'],
        ['Band 3 Top Point', '£14.05', '£23.75 (+69%)', '£28.10'],
        ['Band 5 Entry', '£16.40', '£26.24 (+60%)', '£32.81'],
        ['Band 5 Top', '£19.97', '£31.95 (+60%)', '£39.93'],
        ['Band 6 Top', '£24.61', '£39.37 (+60%)', '£49.22'],
        ['Band 7 Top', '£28.90', '£46.24 (+60%)', '£57.81'],
      ],
    },
    assumptions: [
      'Excludes London HCAS when multiplying basic hourly pay for Bank Holiday enhancements or overtime.',
      'Assumes Band 2–8a eligibility where Section 3 2.0x overtime is selected.',
    ],
    limitations: [
      'Scotland and Northern Ireland observe slightly different national public holiday allocations (9–10 days in some localities vs 8 in England/Wales).',
      'Local Trust bank-shift escalation rates may differ from standard AfC rostered or overtime rates.',
    ],
    faqs: [
      {
        question: 'Do I get double time AND a day off in lieu for working an NHS Bank Holiday?',
        answer:
          'No. Rostered Bank Holiday shifts pay basic time + Section 2 enhancement (+60% to +83%) plus you keep your Bank Holiday hours to take on another day. Double time (2.0x) applies only when the shift is worked as authorised Section 3 overtime.',
      },
      {
        question: 'Is NHS Bank Holiday enhancement pay pensionable?',
        answer:
          'Yes when worked as part of your rostered Section 2 contracted hours. If worked as Section 3 2.0x overtime above full-time weekly hours, the overtime payment is non-pensionable.',
      },
      {
        question: 'What happens if a Bank Holiday falls on my normal day off?',
        answer:
          'Your annual leave allowance includes your pro-rata share of all 8 annual General Public Holidays (England/Wales). Whether a Bank Holiday falls on your rest day or a shift, those hours remain in your combined leave pot.',
      },
    ],
    relatedCalculators: [
      'nhs-annual-leave-calculator',
      'nhs-unsocial-hours-calculator',
      'nhs-overtime-calculator',
      'nhs-pay-calculator',
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
