import {
  PERSONAL_ALLOWANCE_2026_2027,
  PERSONAL_ALLOWANCE_TAPER_THRESHOLD,
  RUK_TAX_BANDS_2026_2027,
  SCOTLAND_TAX_BANDS_2026_2027,
} from '@/lib/tax-years/2026-2027/incomeTax';
import { roundMoney } from '@/lib/formatting/currency';
import { parseTaxCode } from '@/lib/validation/inputs';
import type { TaxBandBreakdownItem, UkJurisdiction } from '@/types/payroll';

export interface IncomeTaxInput {
  /** Adjusted net income after Net Pay pension contributions and salary sacrifice */
  taxableGrossIncome: number;
  jurisdiction: UkJurisdiction;
  taxCode?: string;
}

export interface IncomeTaxOutput {
  personalAllowance: number;
  taxableSlice: number;
  totalTax: number;
  breakdown: TaxBandBreakdownItem[];
  marginalRate: number;
  warnings: string[];
}

export function calculateIncomeTax2026_2027(input: IncomeTaxInput): IncomeTaxOutput {
  const warnings: string[] = [];
  const income = Math.max(0, input.taxableGrossIncome);

  let baseAllowance = PERSONAL_ALLOWANCE_2026_2027;
  let useScottishBands = input.jurisdiction === 'scotland';
  let flatRate: number | undefined;

  if (input.taxCode && input.taxCode.trim() !== '') {
    const parsed = parseTaxCode(input.taxCode, PERSONAL_ALLOWANCE_2026_2027);
    if (!parsed.isValid && parsed.note) {
      warnings.push(parsed.note);
    } else if (parsed.note) {
      warnings.push(parsed.note);
    }
    baseAllowance = parsed.personalAllowance;
    flatRate = parsed.flatRate;
    if (parsed.isScottishPrefix) {
      useScottishBands = true;
    }
  }

  if (flatRate !== undefined) {
    const totalTax = roundMoney(income * flatRate);
    return {
      personalAllowance: 0,
      taxableSlice: roundMoney(income),
      totalTax,
      breakdown: [
        {
          bandName: `Flat tax code (${Math.round(flatRate * 100)}%)`,
          taxableAmount: roundMoney(income),
          rate: flatRate,
          taxAmount: totalTax,
        },
      ],
      marginalRate: flatRate,
      warnings,
    };
  }

  // Standard Personal Allowance taper (£1 lost per £2 over £100,000)
  let effectiveAllowance = baseAllowance;
  if (baseAllowance > 0 && income > PERSONAL_ALLOWANCE_TAPER_THRESHOLD) {
    const reduction = (income - PERSONAL_ALLOWANCE_TAPER_THRESHOLD) / 2;
    effectiveAllowance = Math.max(0, baseAllowance - reduction);
    warnings.push(
      'Adjusted net income exceeds £100,000: Personal Allowance is tapered by £1 for every £2 over £100,000.'
    );
  }

  const taxableSlice = Math.max(0, income - effectiveAllowance);

  // If Personal Allowance was tapered, the top/additional rate threshold remains fixed at £125,140 total income
  // so taxable-slice width for the upper bands shrinks when effectiveAllowance drops below £12,570.
  const bands = useScottishBands ? SCOTLAND_TAX_BANDS_2026_2027 : RUK_TAX_BANDS_2026_2027;
  const paLoss = Math.max(0, PERSONAL_ALLOWANCE_2026_2027 - effectiveAllowance);

  const breakdown: TaxBandBreakdownItem[] = [];
  let totalTax = 0;
  let marginalRate = 0;

  if (taxableSlice === 0) {
    return {
      personalAllowance: roundMoney(effectiveAllowance),
      taxableSlice: 0,
      totalTax: 0,
      breakdown: [
        {
          bandName: 'Personal Allowance (0%)',
          taxableAmount: roundMoney(income),
          rate: 0,
          taxAmount: 0,
        },
      ],
      marginalRate: 0,
      warnings,
    };
  }

  for (const band of bands) {
    // Adjust upper ceiling when PA is tapered so top/additional rate still kicks in at £125,140 gross adjusted net income
    const isTopCeiling = band.max !== null && (useScottishBands ? band.max === 112570 : band.max === 125140);
    const bandMin = band.min;
    const bandMax =
      band.max === null
        ? null
        : isTopCeiling
          ? Math.max(bandMin, band.max - paLoss)
          : band.max;

    // Also adjust top band start if previous band ceiling shifted down
    const adjustedMin =
      band.max === null && paLoss > 0
        ? Math.max(0, bandMin - paLoss)
        : bandMin;

    if (taxableSlice <= adjustedMin) break;

    const upper = bandMax === null ? taxableSlice : Math.min(taxableSlice, bandMax);
    const amountInBand = Math.max(0, upper - adjustedMin);

    if (amountInBand > 0) {
      const taxInBand = roundMoney(amountInBand * band.rate);
      totalTax += taxInBand;
      marginalRate = band.rate;
      breakdown.push({
        bandName: band.name,
        taxableAmount: roundMoney(amountInBand),
        rate: band.rate,
        taxAmount: taxInBand,
      });
    }
  }

  return {
    personalAllowance: roundMoney(effectiveAllowance),
    taxableSlice: roundMoney(taxableSlice),
    totalTax: roundMoney(totalTax),
    breakdown,
    marginalRate,
    warnings,
  };
}
