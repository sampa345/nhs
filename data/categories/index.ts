import type { CategoryDefinition, CategorySlug } from '@/types/calculator';

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'nhs-pay-calculators',
    title: 'NHS Pay Calculators',
    metaTitle: 'NHS Pay Calculators 2026/27 | Salary, Take-Home & Band Tools',
    metaDescription:
      'Explore our free NHS pay calculators for 2026/27 to estimate your Agenda for Change salary, take-home pay, hourly earnings, and part-time pro-rata income.',
    shortDescription:
      'Estimate gross salary, net take-home pay, hourly rates, band progression, and part-time pro-rata earnings across all four UK nations.',
    intro:
      'Explore our free NHS pay calculators to estimate your salary, take-home pay, hourly earnings and part-time income for the 2026/2027 tax year.',
    explanationTitle: 'Understanding NHS Pay & Agenda for Change in 2026/2027',
    explanationParagraphs: [
      'Most non-medical NHS staff in the United Kingdom—including nurses, midwives, allied health professionals, healthcare assistants, pharmacists, and administrative teams—are paid under the Agenda for Change (AfC) pay system. Each band from Band 2 to Band 9 contains set pay points based on reckonable service and experience.',
      'Pay structures differ across England, Wales, Scotland, and Northern Ireland because health is a devolved matter. For example, NHS Scotland operates a 36-hour standard working week from April 2026 alongside separate STAC pay points and Scottish Income Tax bands, whereas England, Wales, and Northern Ireland use a 37.5-hour standard week.',
      'Your final take-home pay also depends on High Cost Area Supplements (London weighting), NHS Pension Scheme member tier rates, Income Tax, Class 1 National Insurance, and any Student Loan repayments.',
    ],
    keyHighlights: [
      { label: '2026/27 AfC Uplift', detail: 'Includes 3.3% England/Wales pay scales and Scotland 2026/27 STAC figures.' },
      { label: 'Devolved Accuracy', detail: 'Supports England, Wales, Scotland (36h week), and Northern Ireland.' },
      { label: 'London Weighting', detail: 'Applies Inner London, Outer London, and Fringe HCAS caps accurately.' },
    ],
    faqs: [
      {
        question: 'Are NHS pay calculators updated for the 2026/2027 tax year?',
        answer:
          'Yes. All calculators in this hub use the 2026/2027 tax year (6 April 2026 to 5 April 2027) Income Tax bands, National Insurance thresholds, Student Loan thresholds, and 2026/2027 Agenda for Change pay scales.',
      },
      {
        question: 'Why does my NHS take-home pay differ in Scotland compared to England?',
        answer:
          'NHS Scotland has different Agenda for Change pay points, a 36-hour standard working week, distinct SPPA NHS Pension contribution tiers, and six Scottish Income Tax bands set by the Scottish Parliament.',
      },
      {
        question: 'Do these calculators work for NHS doctors and dentists?',
        answer:
          'While pay band selectors are built for Agenda for Change staff, our NHS Pay and NHS Salary calculators include a custom salary option so medical and dental staff can model their exact gross and take-home pay.',
      },
    ],
    relatedCategories: ['nhs-pension-calculators', 'nhs-shift-calculators', 'nhs-tax-calculators'],
    relatedGuides: ['nhs-pay-bands-explained', 'nhs-pension-contributions-explained'],
    iconName: 'PoundSterling',
  },
  {
    slug: 'nhs-pension-calculators',
    title: 'NHS Pension Calculators',
    metaTitle: 'NHS Pension Calculators 2026/27 | Contributions, Tax Relief & Net Pay',
    metaDescription:
      'Calculate your 2026/27 NHS Pension Scheme contribution tier, employer contribution, Net Pay tax relief, and monthly take-home pay impact.',
    shortDescription:
      'Check your 2026/27 NHSBSA or SPPA pension tier, calculate tax relief savings, and compare opting in versus opting out.',
    intro:
      'Calculate your 2026/2027 NHS Pension Scheme contribution percentage, CARE pension accrual, income tax relief, and real take-home pay cost.',
    explanationTitle: 'How the 2015 NHS Pension Scheme Works in 2026/2027',
    explanationParagraphs: [
      'The NHS Pension Scheme is a Career Average Revalued Earnings (CARE) defined benefit scheme. Every year you contribute, you earn an annual pension equal to 1/54th of your pensionable earnings, revalued annually by CPI plus 1.5% while active in the scheme.',
      'Your member contribution rate is determined by your actual annual pensionable pay—not your whole-time equivalent salary—which ensures part-time staff pay a fair percentage based on real earnings. Because NHS pension contributions use a Net Pay Arrangement, deductions are taken before Income Tax is calculated, lowering the true out-of-pocket cost.',
      'For 2026/2027, England and Wales member contribution tiers range from 5.2% to 12.5% (with a 23.7% employer contribution), while NHS Scotland SPPA tiers range from 5.7% to 12.7% (with a 22.5% employer contribution).',
    ],
    keyHighlights: [
      { label: 'Actual Pay Tiers', detail: 'Assesses part-time staff on actual pensionable pay, not WTE.' },
      { label: 'Net Pay Tax Relief', detail: 'Automatically models 19%–48% Income Tax savings at source.' },
      { label: 'CARE Accrual', detail: 'Shows your annual 1/54th guaranteed pension earned each year.' },
    ],
    faqs: [
      {
        question: 'Is my NHS pension deducted before or after tax?',
        answer:
          'NHS Pension Scheme contributions are deducted under a Net Pay Arrangement before Income Tax is calculated, giving you automatic tax relief at your highest marginal tax rate. However, contributions do not reduce National Insurance or Student Loan repayments.',
      },
      {
        question: 'Does overtime count towards my NHS pension?',
        answer:
          'Standard overtime worked above full-time hours (37.5h, or 36h in Scotland) is not pensionable. However, additional plain-time hours worked by part-time staff up to full-time hours are normally pensionable.',
      },
      {
        question: 'What happens if I cross a pension tier threshold mid-year?',
        answer:
          'Unlike Income Tax bands, NHS pension tiers apply to your entire pensionable salary once you enter a higher bracket. Our Pension Contribution Calculator shows your headroom to the next tier cliff.',
      },
    ],
    relatedCategories: ['nhs-pay-calculators', 'nhs-tax-calculators', 'nhs-employment-calculators'],
    relatedGuides: ['nhs-pension-contributions-explained', 'nhs-pay-bands-explained'],
    iconName: 'ShieldCheck',
  },
  {
    slug: 'nhs-shift-calculators',
    title: 'NHS Shift & Overtime Calculators',
    metaTitle: 'NHS Shift & Overtime Calculators 2026/27 | Nights, Weekends & Bank Holidays',
    metaDescription:
      'Estimate NHS Section 2 unsocial hours enhancements for night shifts, Saturdays, Sundays, bank holidays, and Section 3 overtime rates for 2026/27.',
    shortDescription:
      'Calculate Agenda for Change Section 2 unsocial hours pay for nights, weekends, and bank holidays plus Section 3 overtime.',
    intro:
      'Estimate your extra pay for NHS night shifts, weekend shifts, bank holidays, unsocial hours rosters, and authorised overtime in 2026/2027.',
    explanationTitle: 'Agenda for Change Section 2 Unsocial Hours vs Section 3 Overtime',
    explanationParagraphs: [
      'NHS shift workers frequently confuse unsocial hours enhancements (Agenda for Change Section 2) with overtime (Section 3). Unsocial hours enhancements apply to standard contracted hours worked at night (between 8:00 pm and 6:00 am), on Saturdays, on Sundays, or on public holidays.',
      'Enhancement percentages depend on your pay band: Band 2 receives +41% for nights/Saturdays and +83% for Sundays/Bank Holidays; Band 3 receives +35% and +69%; and Bands 4 to 9 receive +30% and +60%. Crucially, Section 2 enhancements are calculated on basic hourly pay excluding London HCAS.',
      'Paid overtime under Section 3 applies to hours worked beyond full-time weekly hours (37.5 hours, or 36 hours in Scotland) for Bands 2 to 8a, typically at 1.5x basic pay (or 2.0x on public holidays). Staff in Bands 8b to 9 generally receive Time Off in Lieu (TOIL).',
    ],
    keyHighlights: [
      { label: 'Section 2 Enhancements', detail: 'Exact Band 2 (+41%/+83%), Band 3 (+35%/+69%), and Band 4–9 (+30%/+60%) multipliers.' },
      { label: 'Part-Time Overtime Rule', detail: 'Applies plain-time (1.0x) up to full-time hours before 1.5x overtime begins.' },
      { label: 'Bank Staff Option', detail: 'Includes optional 12.07% Working Time Regulations (WTR) rolled-up holiday pay.' },
    ],
    faqs: [
      {
        question: 'What hours count as NHS night shift unsocial hours?',
        answer:
          'Under Agenda for Change Section 2, any standard rostered hours worked between 8:00 pm and 6:00 am Monday to Friday qualify for the night shift enhancement—provided your shift meets local minimum qualifying rules (normally more than half an hour in the unsocial window).',
      },
      {
        question: 'Is London Weighting (HCAS) included when calculating hourly overtime or unsocial rates?',
        answer:
          'No. Under NHS Agenda for Change terms, both Section 2 unsocial hours enhancements and Section 3 overtime multipliers are calculated using your basic hourly rate excluding High Cost Area Supplements.',
      },
      {
        question: 'Do part-time NHS staff get 1.5x overtime immediately?',
        answer:
          'Under AfC Section 3, part-time staff working extra hours up to the standard full-time working week (37.5 hours in England/Wales/NI or 36 hours in Scotland) are paid at plain time (1.0x), and those hours are pensionable. Overtime at 1.5x only starts once total weekly hours exceed full-time.',
      },
    ],
    relatedCategories: ['nhs-pay-calculators', 'nhs-employment-calculators', 'nhs-pension-calculators'],
    relatedGuides: ['nhs-unsocial-hours-pay-explained', 'nhs-overtime-rates-explained'],
    iconName: 'Clock',
  },
  {
    slug: 'nhs-employment-calculators',
    title: 'NHS Employment Calculators',
    metaTitle: 'NHS Employment Calculators 2026/27 | Leave, Sick, Maternity & Redundancy',
    metaDescription:
      'Calculate NHS annual leave in days and hours, bank holiday entitlement, occupational sick pay, maternity pay (OMP), paternity pay, and redundancy pay.',
    shortDescription:
      'Work out your Agenda for Change annual leave, pro-rata bank holidays, sick pay, maternity/paternity schedules, and redundancy pay.',
    intro:
      'Calculate your NHS employment entitlements under the Agenda for Change Terms and Conditions Handbook, including annual leave, sick pay, maternity, paternity, and redundancy.',
    explanationTitle: 'NHS Terms & Conditions Handbook Entitlements (Sections 13–16)',
    explanationParagraphs: [
      'Beyond base pay, NHS Agenda for Change employment provides structured statutory and occupational benefits linked to your length of continuous NHS service (reckonable service). Moving between NHS Trusts without a break normally preserves your continuous service.',
      'Annual leave rises from 27 days (plus 8 bank holidays) on appointment, to 29 days after 5 years, and 33 days after 10 years—converted into hours for shift and part-time staff. Occupational Sick Pay and Occupational Maternity Pay follow clearly defined full-pay and half-pay schedules combined with statutory payments.',
      'Our 2026/2027 employment calculators also apply updated UK statutory rates effective April 2026, including the £194.32/week standard Statutory Maternity Pay (SMP) and Statutory Paternity Pay (SPP) rate.',
    ],
    keyHighlights: [
      { label: 'Hours & Days Conversion', detail: 'Accurate pro-rata leave and bank holiday hours for shift patterns.' },
      { label: '2026/27 Statutory Rates', detail: 'Incorporates £194.32/week SMP/SPP and £129.00/week LEL.' },
      { label: 'Section 16 Redundancy', detail: 'Applies 24-month cap, £23,000 floor, £80,000 ceiling, and £30,000 tax-free threshold.' },
    ],
    faqs: [
      {
        question: 'Does previous service at another NHS Trust count towards annual leave and sick pay?',
        answer:
          'Yes. Under Agenda for Change, reckonable service across previous NHS employers generally counts towards your annual leave entitlement, occupational sick pay, and occupational maternity pay, subject to break-in-service rules.',
      },
      {
        question: 'How is NHS part-time bank holiday entitlement calculated?',
        answer:
          'Part-time staff receive a pro-rata share of the 8 general public holidays (multiplied by 7.5 hours in England/Wales/NI or 7.2 hours in Scotland) added to their annual leave hours pot, regardless of which days of the week they normally work.',
      },
      {
        question: 'Are NHS redundancy payments tax-free?',
        answer:
          'Under HMRC rules, the first £30,000 of genuine statutory and contractual redundancy compensation is normally free of Income Tax and National Insurance. Any balance above £30,000 is subject to Income Tax.',
      },
    ],
    relatedCategories: ['nhs-pay-calculators', 'nhs-pension-calculators', 'nhs-tax-calculators'],
    relatedGuides: ['nhs-pay-bands-explained', 'nhs-pension-contributions-explained'],
    iconName: 'Briefcase',
  },
  {
    slug: 'nhs-tax-calculators',
    title: 'NHS Tax Calculators',
    metaTitle: 'NHS Tax Calculators 2026/27 | Income Tax, NI, Salary Sacrifice & Loans',
    metaDescription:
      'Estimate your 2026/27 UK or Scottish Income Tax, Class 1 National Insurance, NHS salary sacrifice savings, and Student Loan repayments.',
    shortDescription:
      'Break down UK & Scottish Income Tax bands, Employee National Insurance, salary sacrifice savings, and Student Loan plans.',
    intro:
      'Understand exactly what leaves your NHS payslip each month in 2026/2027 across Income Tax, National Insurance, salary sacrifice schemes, and Student Loans.',
    explanationTitle: 'How UK Tax, National Insurance & Deductions Work on an NHS Payslip',
    explanationParagraphs: [
      'Your NHS payslip deductions interact in a specific order. First, any salary sacrifice schemes—such as an NHS Fleet Solutions lease car or Cycle to Work—reduce your gross pay for Income Tax, National Insurance, and Student Loans (note that salary sacrifice can also reduce CARE pensionable pay).',
      'Next, NHS Pension contributions are deducted under a Net Pay Arrangement, reducing your taxable pay for Income Tax—but not reducing earnings subject to Class 1 National Insurance or Student Loan repayments.',
      'Finally, Income Tax is calculated using either Rest of UK bands (England, Wales, Northern Ireland) or Scotland’s six-band system, while Employee National Insurance is charged at 8% between £12,570 and £50,270 and 2% above £50,270.',
    ],
    keyHighlights: [
      { label: 'rUK & Scottish Tax', detail: 'Models England/Wales/NI (20%/40%/45%) and Scotland (19%–48%).' },
      { label: 'PA Taper Support', detail: 'Handles £100,000+ Personal Allowance reduction accurately.' },
      { label: 'All Student Loan Plans', detail: 'Includes Plan 1, Plan 2, Plan 4 (Scotland), Plan 5, and Postgrad 6%.' },
    ],
    faqs: [
      {
        question: 'Does NHS salary sacrifice affect my NHS pension?',
        answer:
          'Yes, in most cases. Because salary sacrifice reduces your contractual gross pay, it also reduces your pensionable pay under the 2015 CARE Scheme—meaning slightly lower annual pension accrual alongside your tax and NI savings.',
      },
      {
        question: 'Why do I pay National Insurance on my NHS pension contributions?',
        answer:
          'HMRC allows Net Pay pension schemes like the NHS Pension Scheme to receive full Income Tax relief at source, but employee Class 1 National Insurance is still assessed on gross pay before pension deductions.',
      },
      {
        question: 'Can I have both an undergraduate Student Loan and a Postgraduate Loan deducted?',
        answer:
          'Yes. If you hold both (for example Plan 2 and a Master’s Postgraduate Loan), HMRC deducts 9% above your undergraduate plan threshold and 6% above the £21,000 Postgraduate Loan threshold simultaneously.',
      },
    ],
    relatedCategories: ['nhs-pay-calculators', 'nhs-pension-calculators', 'nhs-shift-calculators'],
    relatedGuides: ['nhs-pension-contributions-explained', 'nhs-pay-bands-explained'],
    iconName: 'Receipt',
  },
];

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
