import {
  AFC_ANNUAL_LEAVE_TIERS,
  AFC_OCCUPATIONAL_SICK_PAY_TIERS,
  STATUTORY_PAY_2026_2027,
} from '@/lib/tax-years/2026-2027/statutoryPay';
import { getStandardWeeklyHours } from '@/lib/tax-years/2026-2027/salaryData';
import { roundMoney } from '@/lib/formatting/currency';
import type { UkJurisdiction } from '@/types/payroll';

export interface AnnualLeaveResult {
  tierLabel: string;
  fullTimeBaseDays: number;
  fullTimeBankHolidays: number;
  fullTimeTotalDays: number;
  fteRatio: number;
  proRataAnnualLeaveDays: number;
  proRataBankHolidayDays: number;
  proRataTotalDays: number;
  proRataAnnualLeaveHours: number;
  proRataBankHolidayHours: number;
  proRataTotalHours: number;
  accruedHoursForMonthsWorked: number;
}

export function calculateAnnualLeaveEntitlement(
  yearsContinuousService: number,
  contractedWeeklyHours: number,
  jurisdiction: UkJurisdiction,
  monthsInLeaveYear = 12
): AnnualLeaveResult {
  const fullTimeHours = getStandardWeeklyHours(jurisdiction);
  const dailyHours = fullTimeHours / 5; // 7.5h (37.5/5) or 7.2h (36/5)
  const years = Math.max(0, yearsContinuousService);

  const tier =
    AFC_ANNUAL_LEAVE_TIERS.find((t) => years >= t.minYears && years <= t.maxYears) ??
    AFC_ANNUAL_LEAVE_TIERS[AFC_ANNUAL_LEAVE_TIERS.length - 1];

  const fteRatio = Math.min(1, Math.max(0.05, contractedWeeklyHours / fullTimeHours));
  const fullTimeTotalDays = tier.baseDays + tier.bankHolidays;

  const proRataAnnualLeaveHours = roundMoney(tier.baseDays * dailyHours * fteRatio);
  const proRataBankHolidayHours = roundMoney(tier.bankHolidays * dailyHours * fteRatio);
  const proRataTotalHours = roundMoney(proRataAnnualLeaveHours + proRataBankHolidayHours);

  const proRataAnnualLeaveDays = roundMoney(tier.baseDays * fteRatio);
  const proRataBankHolidayDays = roundMoney(tier.bankHolidays * fteRatio);
  const proRataTotalDays = roundMoney(proRataAnnualLeaveDays + proRataBankHolidayDays);

  const fractionOfYear = Math.min(12, Math.max(1, monthsInLeaveYear)) / 12;
  const accruedHoursForMonthsWorked = roundMoney(proRataTotalHours * fractionOfYear);

  return {
    tierLabel: tier.label,
    fullTimeBaseDays: tier.baseDays,
    fullTimeBankHolidays: tier.bankHolidays,
    fullTimeTotalDays,
    fteRatio: roundMoney(fteRatio),
    proRataAnnualLeaveDays,
    proRataBankHolidayDays,
    proRataTotalDays,
    proRataAnnualLeaveHours,
    proRataBankHolidayHours,
    proRataTotalHours,
    accruedHoursForMonthsWorked,
  };
}

export interface SickPayResult {
  tierLabel: string;
  fullPayMonths: number;
  halfPayMonths: number;
  monthlyGrossPay: number;
  weeklyGrossPay: number;
  halfPayMonthly: number;
  halfPayWeekly: number;
  sspWeeklyRate: number;
  halfPayPlusSspWeeklyCapped: number;
  totalEstimatedAbsencePay: number;
}

export function calculateSickPay(
  annualGrossSalary: number,
  serviceBand: 'year-1' | 'year-2' | 'year-3' | 'year-4-5' | 'year-5-plus',
  plannedAbsenceWeeks: number,
  sspWeeklyOverride: number = STATUTORY_PAY_2026_2027.sspWeeklyDefault
): SickPayResult {
  const tier =
    AFC_OCCUPATIONAL_SICK_PAY_TIERS.find((t) => t.yearBand === serviceBand) ??
    AFC_OCCUPATIONAL_SICK_PAY_TIERS[0];

  const salary = Math.max(0, annualGrossSalary);
  const monthlyGrossPay = roundMoney(salary / 12);
  const weeklyGrossPay = roundMoney(salary / 52.1429);
  const halfPayMonthly = roundMoney(monthlyGrossPay / 2);
  const halfPayWeekly = roundMoney(weeklyGrossPay / 2);

  // Under AfC Section 14, half pay + SSP cannot exceed normal full pay
  const sspWeekly = weeklyGrossPay >= STATUTORY_PAY_2026_2027.lowerEarningsLimitWeekly ? sspWeeklyOverride : 0;
  const halfPayPlusSspWeeklyCapped = roundMoney(Math.min(weeklyGrossPay, halfPayWeekly + sspWeekly));

  const fullPayWeeks = tier.fullPayMonths * 4.333;
  const halfPayWeeks = tier.halfPayMonths * 4.333;
  const weeks = Math.max(0, plannedAbsenceWeeks);

  const weeksAtFull = Math.min(weeks, fullPayWeeks);
  const weeksAtHalf = Math.min(Math.max(0, weeks - fullPayWeeks), halfPayWeeks);
  const weeksAtSspOnly = Math.min(Math.max(0, weeks - fullPayWeeks - halfPayWeeks), Math.max(0, 28 - fullPayWeeks - halfPayWeeks));

  const totalEstimatedAbsencePay = roundMoney(
    weeksAtFull * weeklyGrossPay +
      weeksAtHalf * halfPayPlusSspWeeklyCapped +
      weeksAtSspOnly * sspWeekly
  );

  return {
    tierLabel: tier.label,
    fullPayMonths: tier.fullPayMonths,
    halfPayMonths: tier.halfPayMonths,
    monthlyGrossPay,
    weeklyGrossPay,
    halfPayMonthly,
    halfPayWeekly,
    sspWeeklyRate: sspWeekly,
    halfPayPlusSspWeeklyCapped,
    totalEstimatedAbsencePay,
  };
}

export interface MaternityPayResult {
  eligibleForOmp: boolean;
  eligibleForSmp: boolean;
  averageWeeklyEarnings: number;
  weeks1To8Weekly: number;
  weeks9To26Weekly: number;
  weeks27To39Weekly: number;
  weeks40To52Weekly: number;
  total39WeekGrossPay: number;
  monthlyAverageOver39Weeks: number;
  monthlyAverageOver52Weeks: number;
}

export function calculateMaternityPay(
  annualGrossSalary: number,
  has12MonthsNhsService: boolean,
  has26WeeksEmployerService: boolean
): MaternityPayResult {
  const awe = roundMoney(Math.max(0, annualGrossSalary) / 52.1429);
  const smpStandard = STATUTORY_PAY_2026_2027.smpStandardWeekly;
  const eligibleForSmp = has26WeeksEmployerService && awe >= STATUTORY_PAY_2026_2027.lowerEarningsLimitWeekly;
  const eligibleForOmp = has12MonthsNhsService;

  if (!eligibleForOmp && !eligibleForSmp) {
    return {
      eligibleForOmp: false,
      eligibleForSmp: false,
      averageWeeklyEarnings: awe,
      weeks1To8Weekly: 0,
      weeks9To26Weekly: 0,
      weeks27To39Weekly: 0,
      weeks40To52Weekly: 0,
      total39WeekGrossPay: 0,
      monthlyAverageOver39Weeks: 0,
      monthlyAverageOver52Weeks: 0,
    };
  }

  if (!eligibleForOmp) {
    // SMP-only schedule: 6 weeks at 90% AWE, 33 weeks at £194.32 (or 90% AWE if lower)
    const first6 = roundMoney(awe * 0.9);
    const next33 = roundMoney(Math.min(smpStandard, first6));
    const total = roundMoney(first6 * 6 + next33 * 33);
    return {
      eligibleForOmp: false,
      eligibleForSmp: true,
      averageWeeklyEarnings: awe,
      weeks1To8Weekly: first6,
      weeks9To26Weekly: next33,
      weeks27To39Weekly: next33,
      weeks40To52Weekly: 0,
      total39WeekGrossPay: total,
      monthlyAverageOver39Weeks: roundMoney(total / 9),
      monthlyAverageOver52Weeks: roundMoney(total / 12),
    };
  }

  // NHS OMP + SMP schedule:
  // Weeks 1–8: Full Pay (inclusive of SMP)
  // Weeks 9–26: Half Pay + SMP (capped at Full Pay)
  // Weeks 27–39: SMP only (if eligible for SMP; otherwise £0 / Maternity Allowance externally)
  const weeks1To8Weekly = awe;
  const smpComponent = eligibleForSmp ? Math.min(smpStandard, awe * 0.9) : 0;
  const weeks9To26Weekly = roundMoney(Math.min(awe, awe * 0.5 + smpComponent));
  const weeks27To39Weekly = roundMoney(smpComponent);
  const total39WeekGrossPay = roundMoney(
    weeks1To8Weekly * 8 + weeks9To26Weekly * 18 + weeks27To39Weekly * 13
  );

  return {
    eligibleForOmp: true,
    eligibleForSmp,
    averageWeeklyEarnings: awe,
    weeks1To8Weekly: roundMoney(weeks1To8Weekly),
    weeks9To26Weekly,
    weeks27To39Weekly,
    weeks40To52Weekly: 0,
    total39WeekGrossPay,
    monthlyAverageOver39Weeks: roundMoney(total39WeekGrossPay / 9),
    monthlyAverageOver52Weeks: roundMoney(total39WeekGrossPay / 12),
  };
}

export interface PaternityPayResult {
  eligibleForOccupationalFullPay: boolean;
  eligibleForSpp: boolean;
  leaveWeeks: number;
  weeklyPay: number;
  totalGrossPaternityPay: number;
}

export function calculatePaternityPay(
  annualGrossSalary: number,
  leaveWeeks: 1 | 2,
  has12MonthsNhsService: boolean,
  has26WeeksEmployerService: boolean
): PaternityPayResult {
  const awe = roundMoney(Math.max(0, annualGrossSalary) / 52.1429);
  const eligibleForOccupationalFullPay = has12MonthsNhsService;
  const eligibleForSpp = has26WeeksEmployerService && awe >= STATUTORY_PAY_2026_2027.lowerEarningsLimitWeekly;

  let weeklyPay = 0;
  if (eligibleForOccupationalFullPay) {
    weeklyPay = awe;
  } else if (eligibleForSpp) {
    weeklyPay = roundMoney(Math.min(STATUTORY_PAY_2026_2027.sppStandardWeekly, awe * 0.9));
  }

  return {
    eligibleForOccupationalFullPay,
    eligibleForSpp,
    leaveWeeks,
    weeklyPay,
    totalGrossPaternityPay: roundMoney(weeklyPay * leaveWeeks),
  };
}

export interface RedundancyPayResult {
  eligible: boolean;
  completeYearsCounted: number;
  cappedMonthsPay: number;
  effectiveReferenceSalary: number;
  appliedFloor: boolean;
  appliedCeiling: boolean;
  totalRedundancyPay: number;
  taxFreePortion: number;
  taxablePortion: number;
}

export function calculateRedundancyPay(
  annualActualSalary: number,
  completeYearsService: number
): RedundancyPayResult {
  const years = Math.floor(Math.max(0, completeYearsService));
  if (years < STATUTORY_PAY_2026_2027.afcRedundancyMinYears) {
    return {
      eligible: false,
      completeYearsCounted: years,
      cappedMonthsPay: 0,
      effectiveReferenceSalary: roundMoney(annualActualSalary),
      appliedFloor: false,
      appliedCeiling: false,
      totalRedundancyPay: 0,
      taxFreePortion: 0,
      taxablePortion: 0,
    };
  }

  const cappedMonthsPay = Math.min(years, STATUTORY_PAY_2026_2027.afcRedundancyMaxMonths);
  const salary = Math.max(0, annualActualSalary);
  const appliedFloor = salary < STATUTORY_PAY_2026_2027.afcRedundancyFloor;
  const appliedCeiling = salary > STATUTORY_PAY_2026_2027.afcRedundancyCeiling;

  const effectiveReferenceSalary = Math.min(
    STATUTORY_PAY_2026_2027.afcRedundancyCeiling,
    Math.max(STATUTORY_PAY_2026_2027.afcRedundancyFloor, salary)
  );

  const monthlyReference = effectiveReferenceSalary / 12;
  const totalRedundancyPay = roundMoney(monthlyReference * cappedMonthsPay);
  const taxFreePortion = roundMoney(
    Math.min(totalRedundancyPay, STATUTORY_PAY_2026_2027.hmrcTaxFreeRedundancyLimit)
  );
  const taxablePortion = roundMoney(Math.max(0, totalRedundancyPay - taxFreePortion));

  return {
    eligible: true,
    completeYearsCounted: years,
    cappedMonthsPay,
    effectiveReferenceSalary: roundMoney(effectiveReferenceSalary),
    appliedFloor,
    appliedCeiling,
    totalRedundancyPay,
    taxFreePortion,
    taxablePortion,
  };
}
