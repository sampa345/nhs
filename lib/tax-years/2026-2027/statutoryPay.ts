import type { DatasetMetadata } from '@/types/payroll';

export const STATUTORY_AND_EMPLOYMENT_METADATA_2026_2027: DatasetMetadata = {
  taxYear: '2026/2027 (6 April 2026 – 5 April 2027)',
  jurisdiction: 'United Kingdom (NHS Terms & Conditions of Service Handbook + GOV.UK)',
  officialSource: 'NHS Employers Terms & Conditions Handbook (Sections 13–16) & GOV.UK Statutory Rates',
  sourceUrl: 'https://www.nhsemployers.org/publications/tchandbook',
  effectiveDate: '2026-04-06',
  lastVerifiedDate: '2026-04-06',
  assumptions: [
    'Annual leave (Section 13), Occupational Sick Pay (Section 14), Occupational Maternity Pay (Section 15), and Contractual Redundancy (Section 16) apply to Agenda for Change staff.',
    'Statutory Maternity Pay (SMP) and Statutory Paternity Pay (SPP) standard weekly rate for 2026/27 is £194.32/week (or 90% of average weekly earnings if lower).',
    'Lower Earnings Limit for statutory qualifying benefits is £129.00/week in 2026/27.',
  ],
};

export const STATUTORY_PAY_2026_2027 = {
  smpStandardWeekly: 194.32,
  sppStandardWeekly: 194.32,
  lowerEarningsLimitWeekly: 129.0,
  /** Statutory Sick Pay (SSP) 2026/27 reference; users can override if personal circumstances differ */
  sspWeeklyDefault: 123.25,
  afcRedundancyFloor: 23000,
  afcRedundancyCeiling: 80000,
  afcRedundancyMaxMonths: 24,
  afcRedundancyMinYears: 2,
  hmrcTaxFreeRedundancyLimit: 30000,
} as const;

export const AFC_ANNUAL_LEAVE_TIERS = [
  { minYears: 0, maxYears: 4.99, label: 'On appointment (Under 5 years)', baseDays: 27, bankHolidays: 8 },
  { minYears: 5, maxYears: 9.99, label: 'After 5 years of NHS service', baseDays: 29, bankHolidays: 8 },
  { minYears: 10, maxYears: 99, label: 'After 10 years of NHS service', baseDays: 33, bankHolidays: 8 },
] as const;

export const AFC_OCCUPATIONAL_SICK_PAY_TIERS = [
  { yearBand: 'year-1', label: 'During 1st year of service', fullPayMonths: 1, halfPayMonths: 2 },
  { yearBand: 'year-2', label: 'During 2nd year of service', fullPayMonths: 2, halfPayMonths: 2 },
  { yearBand: 'year-3', label: 'During 3rd year of service', fullPayMonths: 4, halfPayMonths: 4 },
  { yearBand: 'year-4-5', label: 'During 4th & 5th years of service', fullPayMonths: 5, halfPayMonths: 5 },
  { yearBand: 'year-5-plus', label: 'After 5 years of service', fullPayMonths: 6, halfPayMonths: 6 },
] as const;
