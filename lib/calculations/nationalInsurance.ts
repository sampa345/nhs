import { NI_2026_2027 } from '@/lib/tax-years/2026-2027/nationalInsurance';
import { roundMoney } from '@/lib/formatting/currency';

export interface NationalInsuranceOutput {
  annualNI: number;
  monthlyNI: number;
  weeklyNI: number;
  earningsAtMainRate: number;
  earningsAtUpperRate: number;
  effectiveNIRate: number;
}

/**
 * Calculates Class 1 Employee National Insurance (Category A) for 2026/2027.
 * Note: NHS Pension contributions do NOT reduce NIable pay; salary sacrifice DOES reduce NIable pay.
 */
export function calculateNationalInsurance2026_2027(niableAnnualIncome: number): NationalInsuranceOutput {
  const income = Math.max(0, niableAnnualIncome);

  if (income <= NI_2026_2027.primaryThresholdAnnual) {
    return {
      annualNI: 0,
      monthlyNI: 0,
      weeklyNI: 0,
      earningsAtMainRate: 0,
      earningsAtUpperRate: 0,
      effectiveNIRate: 0,
    };
  }

  const earningsAtMainRate = Math.max(
    0,
    Math.min(income, NI_2026_2027.upperEarningsLimitAnnual) - NI_2026_2027.primaryThresholdAnnual
  );
  const earningsAtUpperRate = Math.max(0, income - NI_2026_2027.upperEarningsLimitAnnual);

  const mainNI = earningsAtMainRate * NI_2026_2027.mainRate;
  const upperNI = earningsAtUpperRate * NI_2026_2027.upperRate;
  const annualNI = roundMoney(mainNI + upperNI);

  return {
    annualNI,
    monthlyNI: roundMoney(annualNI / 12),
    weeklyNI: roundMoney(annualNI / 52),
    earningsAtMainRate: roundMoney(earningsAtMainRate),
    earningsAtUpperRate: roundMoney(earningsAtUpperRate),
    effectiveNIRate: income > 0 ? roundMoney((annualNI / income) * 1000) / 1000 : 0,
  };
}
