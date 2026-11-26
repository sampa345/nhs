import type { DatasetMetadata, PensionTier, UkJurisdiction } from '@/types/payroll';

export const PENSION_METADATA_2026_2027: Record<'england-wales' | 'scotland' | 'northern-ireland', DatasetMetadata> = {
  'england-wales': {
    taxYear: '2026/2027 (1 April 2026 – 31 March 2027)',
    jurisdiction: 'England & Wales (NHSBSA)',
    officialSource: 'NHS Business Services Authority (NHSBSA) Member Contributions 2026/27',
    sourceUrl: 'https://www.nhsbsa.nhs.uk/member-hub/cost-being-scheme',
    effectiveDate: '2026-04-01',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'Contributions are assessed on actual annual pensionable pay (not whole-time equivalent) and apply to the entire pensionable earnings.',
      '2015 CARE Scheme accrual rate is 1/54th of pensionable earnings each year.',
      'Employer contribution rate is 23.7% (comprising 20.6% core + 3.1% scheme funding/admin levy).',
    ],
  },
  scotland: {
    taxYear: '2026/2027 (1 April 2026 – 31 March 2027)',
    jurisdiction: 'Scotland (SPPA Circular 2026/03)',
    officialSource: 'Scottish Public Pensions Agency (SPPA) NHS Scotland Member Contributions',
    sourceUrl: 'https://pensions.gov.scot/nhs',
    effectiveDate: '2026-04-01',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'SPPA Continuing Member tiers apply whole-salary contribution percentages based on actual pensionable pay.',
      '2015 CARE Scheme accrual rate is 1/54th of pensionable earnings each year.',
      'Employer contribution rate in NHS Scotland is 22.5%.',
    ],
  },
  'northern-ireland': {
    taxYear: '2026/2027 (1 April 2026 – 31 March 2027)',
    jurisdiction: 'Northern Ireland (HSC Pension Service)',
    officialSource: 'HSC Pension Service / Department of Health NI',
    sourceUrl: 'https://hscpensions.hscni.net/',
    effectiveDate: '2026-04-01',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'HSC Pension Scheme tiers closely align with England & Wales 2026/27 member contribution structure subject to local DoH NI confirmation.',
      'Employer contribution rate is modelled at 23.2% / aligned statutory rate; check your HSC payslip for local employer rate notices.',
    ],
  },
};

export const ENGLAND_WALES_PENSION_TIERS_2026_2027: PensionTier[] = [
  { min: 0, max: 13259, rate: 0.052, label: 'Tier 1 (Up to £13,259)' },
  { min: 13260, max: 28854, rate: 0.065, label: 'Tier 2 (£13,260 – £28,854)' },
  { min: 28855, max: 35155, rate: 0.083, label: 'Tier 3 (£28,855 – £35,155)' },
  { min: 35156, max: 52778, rate: 0.098, label: 'Tier 4 (£35,156 – £52,778)' },
  { min: 52779, max: 67668, rate: 0.107, label: 'Tier 5 (£52,779 – £67,668)' },
  { min: 67669, max: null, rate: 0.125, label: 'Tier 6 (£67,669 and above)' },
];

export const SCOTLAND_PENSION_TIERS_2026_2027: PensionTier[] = [
  { min: 0, max: 13330, rate: 0.057, label: 'Tier 1 (Up to £13,330)' },
  { min: 13331, max: 27940, rate: 0.064, label: 'Tier 2 (£13,331 – £27,940)' },
  { min: 27941, max: 33062, rate: 0.07, label: 'Tier 3 (£27,941 – £33,062)' },
  { min: 33063, max: 41482, rate: 0.087, label: 'Tier 4 (£33,063 – £41,482)' },
  { min: 41483, max: 43502, rate: 0.098, label: 'Tier 5 (£41,483 – £43,502)' },
  { min: 43503, max: 52879, rate: 0.105, label: 'Tier 6 (£43,503 – £52,879)' },
  { min: 52880, max: 57223, rate: 0.112, label: 'Tier 7 (£52,880 – £57,223)' },
  { min: 57224, max: 80025, rate: 0.116, label: 'Tier 8 (£57,224 – £80,025)' },
  { min: 80026, max: null, rate: 0.127, label: 'Tier 9 (£80,026 and above)' },
];

export const EMPLOYER_PENSION_RATES_2026_2027: Record<UkJurisdiction, number> = {
  england: 0.237,
  wales: 0.237,
  scotland: 0.225,
  'northern-ireland': 0.232,
};

export function getPensionTiersForJurisdiction(jurisdiction: UkJurisdiction): PensionTier[] {
  if (jurisdiction === 'scotland') {
    return SCOTLAND_PENSION_TIERS_2026_2027;
  }
  return ENGLAND_WALES_PENSION_TIERS_2026_2027;
}
