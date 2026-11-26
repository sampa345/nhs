import type { BlogArticle } from '@/types/seo';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'nhs-pay-bands-explained',
    title: 'NHS Pay Bands Explained (2026/2027): Agenda for Change Across the UK',
    metaTitle: 'NHS Pay Bands Explained 2026/2027 | England, Scotland, Wales & NI',
    metaDescription:
      'Complete 2026/2027 guide to NHS Agenda for Change pay bands 2 to 9 across England, Scotland, Wales, and Northern Ireland, including pay progression and London HCAS.',
    excerpt:
      'How NHS Agenda for Change pay bands work in 2026/2027, pay step progression timelines, London Weighting (HCAS), and key differences across UK nations.',
    publishedDate: '2026-04-06',
    lastUpdated: '2026-04-10',
    readTime: '7 min read',
    categoryLabel: 'NHS Pay & Progression',
    authorNote:
      'Prepared by the NHS Staff Calculator Editorial Team for informational guidance only. This article is not official NHS Employers or payroll advice.',
    featuredImage: {
      src: '/images/guides/nhs-pay-bands-explained-2026-2027.jpg',
      alt: 'NHS stethoscope beside a salary progression chart illustrating 2026/2027 Agenda for Change pay bands in a UK hospital setting',
      width: 1376,
      height: 768,
      caption: '2026/2027 NHS Agenda for Change pay bands cover staff across England, Scotland, Wales, and Northern Ireland.',
    },
    intro:
      'Whether you are applying for your first NHS role, moving into a specialist Band 6 post, or comparing pay across UK nations, understanding Agenda for Change (AfC) pay bands helps you plan your career and verify your payslip.',
    sections: [
      {
        id: 'what-is-afc',
        heading: 'What Is the NHS Agenda for Change Pay System?',
        paragraphs: [
          'Agenda for Change is the national pay and terms framework covering the majority of non-medical NHS staff across the UK, including nurses, midwives, paramedics, allied health professionals, healthcare assistants, scientists, and administrative teams. Doctors and dentists are paid under separate Medical and Dental contracts.',
          'Jobs are evaluated using the NHS Job Evaluation Scheme and assigned to a pay band from Band 2 through to Band 9 (Band 1 is closed to new entrants). Each band contains structured pay points—typically Entry, Intermediate, and Top—that staff progress through after completing set years of reckonable experience and meeting appraisal requirements.',
        ],
      },
      {
        id: 'england-2026-2027-scales',
        heading: '2026/2027 Agenda for Change Pay Scales (England & Scotland Comparison)',
        paragraphs: [
          'For 2026/2027 (effective 1 April 2026), NHS England implemented a 3.3% consolidated uplift across Agenda for Change pay points based on a 37.5-hour standard week. NHS Scotland operates a separate STAC framework featuring distinct pay points and a reduced 36-hour standard working week.',
        ],
        table: {
          caption: '2026/2027 NHS Agenda for Change Entry & Top Salaries (Basic Full-Time)',
          headers: ['Pay Band', 'England Entry (37.5h)', 'England Top (37.5h)', 'Scotland Entry (36h)', 'Scotland Top (36h)'],
          rows: [
            ['Band 2', '£25,272', '£25,272', '£26,696', '£28,988'],
            ['Band 3', '£25,760', '£27,476', '£29,103', '£31,409'],
            ['Band 4', '£28,392', '£31,157', '£31,537', '£34,303'],
            ['Band 5', '£32,073', '£39,043', '£34,544', '£43,039'],
            ['Band 6', '£39,959', '£48,117', '£43,231', '£52,679'],
            ['Band 7', '£49,387', '£56,515', '£52,845', '£61,466'],
            ['Band 8a', '£57,528', '£64,750', '£65,125', '£70,303'],
            ['Band 8b', '£66,582', '£77,368', '£76,888', '£82,251'],
            ['Band 9', '£112,782', '£129,783', '£127,521', '£133,044'],
          ],
        },
      },
      {
        id: 'london-hcas',
        heading: 'High Cost Area Supplements (London Weighting)',
        paragraphs: [
          'Staff working in eligible NHS Trusts in and around London receive a High Cost Area Supplement (HCAS) on top of basic pay. For 2026/2027, Inner London pays 20% of basic salary (minimum £5,794, maximum £8,746), Outer London pays 15% (minimum £4,870, maximum £6,137), and the London Fringe pays 5% (minimum £1,346, maximum £2,270).',
          'HCAS is pensionable and subject to Income Tax and National Insurance, but it is excluded when calculating Section 2 unsocial hours enhancements or Section 3 overtime rates.',
        ],
      },
    ],
    exampleBox: {
      title: 'Example: Newly Qualified Band 5 Nurse in Inner London (2026/27)',
      summary: 'A full-time Band 5 nurse on the England Entry Point (£32,073) working in an Inner London Trust.',
      steps: [
        'Basic annual salary (37.5h/week): £32,073.00',
        'Inner London HCAS (20% of £32,073, within £5,794–£8,746 caps): £6,414.60',
        'Total gross pensionable salary before unsocial hours: £38,487.60',
      ],
    },
    relatedCalculators: ['nhs-band-calculator', 'nhs-pay-calculator', 'nhs-take-home-pay-calculator'],
    relatedCategory: 'nhs-pay-calculators',
    relatedArticles: ['nhs-pension-contributions-explained', 'nhs-unsocial-hours-pay-explained'],
    officialSources: [
      {
        title: 'NHS Terms and Conditions of Service Handbook',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
      },
      {
        title: 'NHS Scotland Agenda for Change Pay Circulars',
        publisher: 'NHS Scotland Publications',
        url: 'https://www.publications.scot.nhs.uk/',
      },
    ],
  },
  {
    slug: 'nhs-pension-contributions-explained',
    title: 'NHS Pension Contributions Explained (2026/2027): Tiers, Tax Relief & Take-Home Pay',
    metaTitle: 'NHS Pension Contributions Explained 2026/27 | NHSBSA & SPPA Tiers',
    metaDescription:
      'Learn how 2026/2027 NHS Pension Scheme contribution tiers work in England, Wales, Scotland, and Northern Ireland, plus Net Pay tax relief and 1/54th CARE accrual.',
    excerpt:
      'A practical breakdown of 2026/2027 NHSBSA and SPPA pension brackets, why part-time staff pay on actual earnings, and how tax relief lowers your net cost.',
    publishedDate: '2026-04-06',
    lastUpdated: '2026-04-10',
    readTime: '6 min read',
    categoryLabel: 'NHS Pensions',
    authorNote:
      'Prepared by the NHS Staff Calculator Editorial Team for informational guidance only. This article does not constitute regulated financial or pension advice.',
    featuredImage: {
      src: '/images/guides/nhs-pension-contributions-explained-2026-2027.jpg',
      alt: 'Wooden retirement savings bank next to a medical stethoscope on a bright desk representing NHS Pension Scheme planning',
      width: 1376,
      height: 768,
      caption: 'NHS Pension Scheme contributions receive automatic Net Pay tax relief at your highest marginal Income Tax rate.',
    },
    intro:
      'The NHS Pension Scheme remains one of the most valuable workplace pensions in the UK, yet contribution tiers and "cliff-edge" thresholds often confuse staff when pay awards or unsocial hours push earnings into a higher tier.',
    sections: [
      {
        id: 'pension-tiers-2026-2027',
        heading: '2026/2027 NHS Pension Member Contribution Tiers',
        paragraphs: [
          'From 1 April 2026, England and Wales member contribution boundaries were uplifted in line with CPI (3.8%) so routine pay awards are less likely to push staff unexpectedly into a higher bracket. Scotland operates separate SPPA member contribution tiers under SPPA Circular 2026/03.',
          'Crucially, NHS pension tiers use a whole-salary approach: once your actual annual pensionable pay enters a tier, that percentage applies to all of your pensionable earnings—not just the slice above the threshold.',
        ],
        table: {
          caption: 'England & Wales NHS Pension Contribution Tiers (2026/2027)',
          headers: ['Actual Annual Pensionable Pay', 'Member Rate', 'Employer Rate'],
          rows: [
            ['Up to £13,259', '5.2%', '23.7%'],
            ['£13,260 to £28,854', '6.5%', '23.7%'],
            ['£28,855 to £35,155', '8.3%', '23.7%'],
            ['£35,156 to £52,778', '9.8%', '23.7%'],
            ['£52,779 to £67,668', '10.7%', '23.7%'],
            ['£67,669 and above', '12.5%', '23.7%'],
          ],
        },
      },
      {
        id: 'tax-relief-net-pay',
        heading: 'Why Your Net Cost Is Lower Than Your Headline Percentage',
        paragraphs: [
          'NHS Pension contributions are deducted via a Net Pay Arrangement before Income Tax is calculated. If you are a basic-rate taxpayer (20% in England, Wales, and Northern Ireland) paying 8.3% into your pension, each £100 contributed only reduces your take-home pay by £80 because you avoid £20 in Income Tax.',
          'For higher-rate taxpayers (40% in England/Wales/NI, or 42% in Scotland), the effective net cost is even lower—£60 or £58 per £100 contributed—though remember that pension contributions do not reduce Class 1 National Insurance or Student Loan repayments.',
        ],
      },
    ],
    exampleBox: {
      title: 'Example: Band 5 Top Point (£39,043) in England',
      summary: 'A full-time Band 5 clinician in England earning £39,043 pensionable pay in 2026/27.',
      steps: [
        'Tier matched (£35,156 – £52,778): 9.8% member contribution rate',
        'Annual gross pension deduction: £3,826.21 (£318.85/month)',
        'Income Tax saved at 20% Net Pay relief: £765.24/year (£63.77/month)',
        'True net take-home cost of pension: £3,060.97/year (£255.08/month)',
        '2015 CARE pension earned for the year (1/54th): £723.02/year for life in retirement',
      ],
    },
    relatedCalculators: [
      'nhs-pension-calculator',
      'nhs-pension-contribution-calculator',
      'nhs-pension-tax-relief-calculator',
      'nhs-pension-take-home-pay-calculator',
    ],
    relatedCategory: 'nhs-pension-calculators',
    relatedArticles: ['nhs-pay-bands-explained', 'nhs-unsocial-hours-pay-explained'],
    officialSources: [
      {
        title: 'Cost of Being in the Scheme (Member Contributions)',
        publisher: 'NHS Business Services Authority (NHSBSA)',
        url: 'https://www.nhsbsa.nhs.uk/member-hub/cost-being-scheme',
      },
      {
        title: 'SPPA NHS Pension Scheme Scotland Contributions',
        publisher: 'Scottish Public Pensions Agency',
        url: 'https://pensions.gov.scot/nhs',
      },
    ],
  },
  {
    slug: 'nhs-unsocial-hours-pay-explained',
    title: 'NHS Unsocial Hours Pay Explained: Nights, Saturdays, Sundays & Bank Holidays',
    metaTitle: 'NHS Unsocial Hours Pay Explained 2026/27 | Section 2 Rates by Band',
    metaDescription:
      'How NHS Agenda for Change Section 2 unsocial hours enhancements work for night shifts, Saturdays, Sundays, and bank holidays across Bands 2 to 9.',
    excerpt:
      'Exact Section 2 enhancement percentages by pay band, what hours qualify as night shifts, and why HCAS is excluded from shift calculations.',
    publishedDate: '2026-04-06',
    lastUpdated: '2026-04-10',
    readTime: '6 min read',
    categoryLabel: 'Shifts & Enhancements',
    authorNote:
      'Prepared by the NHS Staff Calculator Editorial Team for informational guidance only. Always verify local Trust rostering interpretations with your payroll department.',
    featuredImage: {
      src: '/images/guides/nhs-unsocial-hours-pay-explained-2026-2027.jpg',
      alt: 'NHS nurse checking a digital staff roster tablet at a hospital ward desk during a night shift',
      width: 1376,
      height: 768,
      caption: 'Section 2 unsocial hours enhancements boost basic pay for qualifying night, weekend, and bank holiday shifts.',
    },
    intro:
      'For ward nurses, paramedics, radiographers, and healthcare support workers, unsocial hours enhancements can add hundreds of pounds to monthly take-home pay—and boost annual pensionable earnings.',
    sections: [
      {
        id: 'section-2-rates',
        heading: 'Agenda for Change Section 2 Enhancement Rates',
        paragraphs: [
          'Section 2 of the NHS Terms and Conditions Handbook sets percentage enhancements for standard contracted hours worked outside normal daytime Monday–Friday patterns. Night shifts cover hours between 8:00 pm and 6:00 am Monday to Friday, Saturdays cover midnight to midnight, and Sundays/Public Holidays cover midnight to midnight.',
        ],
        table: {
          caption: 'Section 2 Unsocial Hours Enhancement Rates by Band',
          headers: ['Pay Band', 'Weeknights (8pm–6am) & Saturdays', 'Sundays & Public Holidays'],
          rows: [
            ['Band 2', 'Time + 41% (1.41x)', 'Time + 83% (1.83x)'],
            ['Band 3', 'Time + 35% (1.35x)', 'Time + 69% (1.69x)'],
            ['Bands 4 to 9', 'Time + 30% (1.30x)', 'Time + 60% (1.60x)'],
          ],
        },
      },
      {
        id: 'key-rules',
        heading: 'Important Rules on Basic Pay, HCAS & Pensionability',
        paragraphs: [
          'First, Section 2 enhancements are calculated strictly on your basic hourly rate—London High Cost Area Supplements (HCAS) are excluded before multiplying. Second, unsocial hours enhancements on standard contracted hours are pensionable, meaning they count towards your 1/54th CARE pension accrual and can affect your pension contribution tier.',
        ],
      },
    ],
    exampleBox: {
      title: 'Example: Band 3 HCA Working 4 Night Shifts & 2 Sundays per Month',
      summary: 'England Band 3 Top Point (£27,476 -> £14.05/hour basic) in 2026/27.',
      steps: [
        '4 weekday night shifts (11.5h unsocial each = 46h) at +35%: 46 × £14.05 × 0.35 = £226.21 extra',
        '2 Sunday shifts (11.5h each = 23h) at +69%: 23 × £14.05 × 0.69 = £222.97 extra',
        'Total monthly unsocial hours enhancement: £449.18 gross',
      ],
    },
    relatedCalculators: [
      'nhs-unsocial-hours-calculator',
      'nhs-night-shift-pay-calculator',
      'nhs-weekend-pay-calculator',
      'nhs-bank-holiday-pay-calculator',
    ],
    relatedCategory: 'nhs-shift-calculators',
    relatedArticles: ['nhs-overtime-rates-explained', 'nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Section 2: Maintaining Round-the-Clock Services (Unsocial Hours)',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
      },
    ],
  },
  {
    slug: 'nhs-overtime-rates-explained',
    title: 'NHS Overtime Rates Explained: Section 3 Rules, Part-Time Pay & TOIL',
    metaTitle: 'NHS Overtime Rates Explained 2026/27 | 1.5x, 2.0x & Part-Time Rules',
    metaDescription:
      'How NHS Agenda for Change Section 3 overtime works in 2026/27: 1.5x standard overtime, 2.0x public holiday overtime, part-time plain time rules, and Band 8b+ TOIL.',
    excerpt:
      'Understand when 1.5x or 2.0x NHS overtime applies, why part-time staff receive plain time up to 37.5h/36h, and how bank shifts differ from overtime.',
    publishedDate: '2026-04-06',
    lastUpdated: '2026-04-10',
    readTime: '5 min read',
    categoryLabel: 'Overtime & Bank Shifts',
    authorNote:
      'Prepared by the NHS Staff Calculator Editorial Team for informational guidance only. Local Trust bank rates can vary.',
    featuredImage: {
      src: '/images/guides/nhs-overtime-rates-explained-2026-2027.jpg',
      alt: 'NHS lanyard, clinician wristwatch, digital shift clock, and timesheet clipboard on a clinic desk',
      width: 1376,
      height: 768,
      caption: 'Section 3 overtime applies once weekly hours exceed full-time contractual hours (37.5h in E/W/NI or 36h in Scotland).',
    },
    intro:
      'Working extra shifts in the NHS can be remunerated either as Agenda for Change overtime, plain-time additional hours (for part-time staff), or separate NHS Bank shifts. Knowing which rule applies avoids surprises on payday.',
    sections: [
      {
        id: 'section-3-overtime',
        heading: 'Standard NHS Overtime Rules (Bands 2 to 8a)',
        paragraphs: [
          'Under Agenda for Change Section 3, staff in Bands 2 to 8a who work authorised hours above full-time weekly hours (37.5 hours in England, Wales, and Northern Ireland, or 36 hours in Scotland) are normally eligible for paid overtime—unless they elect to take Time Off in Lieu (TOIL).',
          'Standard overtime is paid at time-and-a-half (1.5x basic hourly rate), while overtime worked on general public holidays is paid at double time (2.0x basic hourly rate). Senior staff in Bands 8b to 9 are not eligible for paid overtime and receive TOIL instead.',
        ],
      },
      {
        id: 'part-time-vs-bank',
        heading: 'Part-Time Plain Time & NHS Bank Shifts',
        paragraphs: [
          'If you work part-time (for example, 30 hours per week), any extra hours you work up to the standard full-time threshold (37.5h, or 36h in Scotland) are paid at plain time (1.0x) plus any applicable unsocial hours enhancements, and those hours are pensionable. Only hours above full-time qualify for 1.5x overtime.',
          'By contrast, shifts booked through a Trust’s internal staff bank or NHS Professionals are usually paid at set bank hourly rates (plus 12.07% rolled-up holiday pay under Working Time Regulations where applicable) rather than contractual Section 3 overtime.',
        ],
      },
    ],
    exampleBox: {
      title: 'Example: Part-Time Band 5 Nurse (30h/week) Working 10 Extra Hours',
      summary: 'England Band 5 Intermediate Point (£34,592 -> £17.69/hour basic) in 2026/27.',
      steps: [
        'First 7.5 extra hours (bringing weekly total from 30h to 37.5h): 7.5 × £17.69 = £132.68 (plain time, pensionable)',
        'Remaining 2.5 extra hours (above 37.5h): 2.5 × £17.69 × 1.5 = £66.34 (overtime, non-pensionable)',
        'Total gross extra pay: £199.02',
      ],
    },
    relatedCalculators: [
      'nhs-overtime-calculator',
      'nhs-hourly-pay-calculator',
      'nhs-part-time-pay-calculator',
      'nhs-bank-holiday-pay-calculator',
    ],
    relatedCategory: 'nhs-shift-calculators',
    relatedArticles: ['nhs-unsocial-hours-pay-explained', 'nhs-pay-bands-explained'],
    officialSources: [
      {
        title: 'Section 3: Overtime Payments',
        publisher: 'NHS Employers',
        url: 'https://www.nhsemployers.org/publications/tchandbook',
      },
    ],
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
