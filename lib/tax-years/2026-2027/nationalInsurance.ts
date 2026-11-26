import type { DatasetMetadata } from '@/types/payroll';

export const NATIONAL_INSURANCE_METADATA_2026_2027: DatasetMetadata = {
  taxYear: '2026/2027 (6 April 2026 – 5 April 2027)',
  jurisdiction: 'United Kingdom (England, Wales, Scotland & Northern Ireland)',
  officialSource: 'GOV.UK / HMRC National Insurance Contributions Rates & Thresholds',
  sourceUrl: 'https://www.gov.uk/national-insurance-rates-letters',
  effectiveDate: '2026-04-06',
  lastVerifiedDate: '2026-04-06',
  assumptions: [
    'Assumes standard Category A employee National Insurance contributions.',
    'NHS Pension Scheme contributions do not reduce National Insuranceable earnings (unlike salary sacrifice arrangements).',
    'Salary sacrifice deductions (e.g., NHS Fleet Solutions, Cycle to Work) reduce gross pay subject to Class 1 NI.',
  ],
};

export const NI_2026_2027 = {
  lowerEarningsLimitAnnual: 6708,
  lowerEarningsLimitMonthly: 559,
  lowerEarningsLimitWeekly: 129,
  primaryThresholdAnnual: 12570,
  primaryThresholdMonthly: 1048,
  primaryThresholdWeekly: 242,
  upperEarningsLimitAnnual: 50270,
  upperEarningsLimitMonthly: 4189,
  upperEarningsLimitWeekly: 967,
  mainRate: 0.08,
  upperRate: 0.02,
} as const;
