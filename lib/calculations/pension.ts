import {
  EMPLOYER_PENSION_RATES_2026_2027,
  getPensionTiersForJurisdiction,
} from '@/lib/tax-years/2026-2027/pension';
import { roundMoney } from '@/lib/formatting/currency';
import type { PensionTier, UkJurisdiction } from '@/types/payroll';

export interface PensionCalculationResult {
  pensionablePay: number;
  matchedTier: PensionTier;
  memberRate: number;
  annualEmployeeContribution: number;
  monthlyEmployeeContribution: number;
  employerRate: number;
  annualEmployerContribution: number;
  monthlyEmployerContribution: number;
  /** 2015 CARE Scheme builds 1/54th of pensionable earnings per year */
  annualCarePensionAccrued: number;
  headroomToNextTier: number | null;
  nextTierRate: number | null;
}

export function calculateNhsPension2026_2027(
  actualAnnualPensionablePay: number,
  jurisdiction: UkJurisdiction
): PensionCalculationResult {
  const pay = Math.max(0, actualAnnualPensionablePay);
  const tiers = getPensionTiersForJurisdiction(jurisdiction);

  let matchedIndex = tiers.length - 1;
  for (let i = 0; i < tiers.length; i++) {
    const t = tiers[i];
    if (pay >= t.min && (t.max === null || pay <= t.max)) {
      matchedIndex = i;
      break;
    }
  }

  const matchedTier = tiers[matchedIndex];
  const nextTier = matchedIndex < tiers.length - 1 ? tiers[matchedIndex + 1] : null;
  const headroomToNextTier = matchedTier.max !== null ? roundMoney(Math.max(0, matchedTier.max - pay)) : null;

  const employerRate = EMPLOYER_PENSION_RATES_2026_2027[jurisdiction];
  const annualEmployeeContribution = roundMoney(pay * matchedTier.rate);
  const annualEmployerContribution = roundMoney(pay * employerRate);
  const annualCarePensionAccrued = roundMoney(pay / 54);

  return {
    pensionablePay: roundMoney(pay),
    matchedTier,
    memberRate: matchedTier.rate,
    annualEmployeeContribution,
    monthlyEmployeeContribution: roundMoney(annualEmployeeContribution / 12),
    employerRate,
    annualEmployerContribution,
    monthlyEmployerContribution: roundMoney(annualEmployerContribution / 12),
    annualCarePensionAccrued,
    headroomToNextTier,
    nextTierRate: nextTier ? nextTier.rate : null,
  };
}
