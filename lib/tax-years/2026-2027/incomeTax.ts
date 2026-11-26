import type { DatasetMetadata, TaxBand } from '@/types/payroll';

export const INCOME_TAX_METADATA_2026_2027: Record<'rUK' | 'scotland', DatasetMetadata> = {
  rUK: {
    taxYear: '2026/2027 (6 April 2026 – 5 April 2027)',
    jurisdiction: 'England, Wales & Northern Ireland',
    officialSource: 'GOV.UK / HMRC Income Tax Rates and Personal Allowances',
    sourceUrl: 'https://www.gov.uk/income-tax-rates',
    effectiveDate: '2026-04-06',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'Standard Personal Allowance of £12,570 (tax code 1257L equivalent) unless a custom tax code is entered.',
      'Personal Allowance reduces by £1 for every £2 of adjusted net income above £100,000, reaching £0 at £125,140.',
      'NHS Pension Scheme employee contributions are deducted under a Net Pay Arrangement before Income Tax is calculated.',
    ],
  },
  scotland: {
    taxYear: '2026/2027 (6 April 2026 – 5 April 2027)',
    jurisdiction: 'Scotland (Scottish Income Tax)',
    officialSource: 'mygov.scot / HMRC Scottish Income Tax Rates and Bands',
    sourceUrl: 'https://www.gov.uk/scottish-income-tax',
    effectiveDate: '2026-04-06',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'Applies to non-savings, non-dividend employment income for taxpayers resident in Scotland.',
      'UK-wide Personal Allowance of £12,570 and the £100,000 taper rule still apply.',
      'NHS Pension Scheme (Scotland) contributions reduce taxable income before Scottish tax bands are applied.',
    ],
  },
};

export const PERSONAL_ALLOWANCE_2026_2027 = 12570;
export const PERSONAL_ALLOWANCE_TAPER_THRESHOLD = 100000;

/**
 * Bands expressed as taxable income ABOVE the Personal Allowance (where allowance = £12,570).
 * Keeping band widths relative to taxable income ensures the £100k+ Personal Allowance taper works accurately.
 */
export const RUK_TAX_BANDS_2026_2027: TaxBand[] = [
  { name: 'Basic rate', min: 0, max: 37700, rate: 0.2 },
  { name: 'Higher rate', min: 37700, max: 125140, rate: 0.4 },
  { name: 'Additional rate', min: 125140, max: null, rate: 0.45 },
];

export const SCOTLAND_TAX_BANDS_2026_2027: TaxBand[] = [
  { name: 'Starter rate', min: 0, max: 3967, rate: 0.19 }, // £12,571 to £16,537
  { name: 'Basic rate', min: 3967, max: 16956, rate: 0.2 }, // £16,538 to £29,526
  { name: 'Intermediate rate', min: 16956, max: 31092, rate: 0.21 }, // £29,527 to £43,662
  { name: 'Higher rate', min: 31092, max: 62430, rate: 0.42 }, // £43,663 to £75,000
  { name: 'Advanced rate', min: 62430, max: 112570, rate: 0.45 }, // £75,001 to £125,140
  { name: 'Top rate', min: 112570, max: null, rate: 0.48 }, // Over £125,140 (note: threshold above PA is adjusted automatically when PA=0)
];
