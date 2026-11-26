import {
  getStandardWeeklyHours,
  UNSOCIAL_HOURS_RATES_AFC,
} from '@/lib/tax-years/2026-2027/salaryData';
import { roundMoney } from '@/lib/formatting/currency';
import type { AfcBandId, UkJurisdiction } from '@/types/payroll';

/** Standard annual hours under NHS AfC: 52.142857 weeks * weeklyHours (e.g. 1955.36 for 37.5h, or 52.143 * 37.5) */
export function calculateBasicHourlyRate(
  annualBasicSalary: number,
  jurisdiction: UkJurisdiction
): number {
  const weeklyHours = getStandardWeeklyHours(jurisdiction);
  const annualHours = weeklyHours * (365 / 7); // NHS Payroll standard 52.142857 weeks
  return roundMoney(Math.max(0, annualBasicSalary) / annualHours);
}

export interface UnsocialShiftBreakdownInput {
  annualBasicSalary: number;
  bandId: AfcBandId;
  jurisdiction: UkJurisdiction;
  standardDayHoursPerMonth: number;
  weekdayNightHoursPerMonth: number;
  saturdayHoursPerMonth: number;
  sundayHoursPerMonth: number;
  bankHolidayHoursPerMonth: number;
}

export interface UnsocialShiftBreakdownOutput {
  basicHourlyRate: number;
  nightSaturdayRateDecimal: number;
  sundayBankHolidayRateDecimal: number;
  nightSaturdayHourlyRate: number;
  sundayBankHolidayHourlyRate: number;
  basicPayForHours: number;
  nightEnhancementPay: number;
  saturdayEnhancementPay: number;
  sundayEnhancementPay: number;
  bankHolidayEnhancementPay: number;
  totalMonthlyEnhancement: number;
  totalMonthlyGrossShiftPay: number;
  annualisedEnhancement: number;
  effectiveBlendedHourlyRate: number;
}

export function calculateUnsocialHoursPay(
  input: UnsocialShiftBreakdownInput
): UnsocialShiftBreakdownOutput {
  const basicHourlyRate = calculateBasicHourlyRate(input.annualBasicSalary, input.jurisdiction);
  const rates = UNSOCIAL_HOURS_RATES_AFC[input.bandId];

  const totalHours =
    Math.max(0, input.standardDayHoursPerMonth) +
    Math.max(0, input.weekdayNightHoursPerMonth) +
    Math.max(0, input.saturdayHoursPerMonth) +
    Math.max(0, input.sundayHoursPerMonth) +
    Math.max(0, input.bankHolidayHoursPerMonth);

  const basicPayForHours = roundMoney(totalHours * basicHourlyRate);
  const nightEnhancementPay = roundMoney(
    Math.max(0, input.weekdayNightHoursPerMonth) * basicHourlyRate * rates.nightAndSaturdayEnhancement
  );
  const saturdayEnhancementPay = roundMoney(
    Math.max(0, input.saturdayHoursPerMonth) * basicHourlyRate * rates.nightAndSaturdayEnhancement
  );
  const sundayEnhancementPay = roundMoney(
    Math.max(0, input.sundayHoursPerMonth) * basicHourlyRate * rates.sundayAndBankHolidayEnhancement
  );
  const bankHolidayEnhancementPay = roundMoney(
    Math.max(0, input.bankHolidayHoursPerMonth) * basicHourlyRate * rates.sundayAndBankHolidayEnhancement
  );

  const totalMonthlyEnhancement = roundMoney(
    nightEnhancementPay + saturdayEnhancementPay + sundayEnhancementPay + bankHolidayEnhancementPay
  );
  const totalMonthlyGrossShiftPay = roundMoney(basicPayForHours + totalMonthlyEnhancement);

  return {
    basicHourlyRate,
    nightSaturdayRateDecimal: rates.nightAndSaturdayEnhancement,
    sundayBankHolidayRateDecimal: rates.sundayAndBankHolidayEnhancement,
    nightSaturdayHourlyRate: roundMoney(basicHourlyRate * (1 + rates.nightAndSaturdayEnhancement)),
    sundayBankHolidayHourlyRate: roundMoney(basicHourlyRate * (1 + rates.sundayAndBankHolidayEnhancement)),
    basicPayForHours,
    nightEnhancementPay,
    saturdayEnhancementPay,
    sundayEnhancementPay,
    bankHolidayEnhancementPay,
    totalMonthlyEnhancement,
    totalMonthlyGrossShiftPay,
    annualisedEnhancement: roundMoney(totalMonthlyEnhancement * 12),
    effectiveBlendedHourlyRate: totalHours > 0 ? roundMoney(totalMonthlyGrossShiftPay / totalHours) : basicHourlyRate,
  };
}

export interface OvertimeInput {
  annualBasicSalary: number;
  bandId: AfcBandId;
  jurisdiction: UkJurisdiction;
  contractedWeeklyHours: number;
  standardOvertimeHours: number; // Mon-Sat 1.5x
  publicHolidayOvertimeHours: number; // Sun/BH 2.0x (note: Section 3 defines public holidays at 2.0x; Sundays generally 1.5x or 2.0x depending on overtime rules—let's label explicitly!)
  includeBankWtrRollup?: boolean; // Optional 12.07% WTR for bank shifts
}

export interface OvertimeOutput {
  basicHourlyRate: number;
  eligibleForPaidOvertime: boolean;
  partTimePlainTimeHours: number;
  standardOvertimePaidHours: number;
  publicHolidayOvertimePaidHours: number;
  plainTimePay: number;
  standardOvertimePay: number;
  publicHolidayOvertimePay: number;
  wtrHolidayPay: number;
  totalOvertimePay: number;
  eligibilityNote: string;
}

export function calculateOvertimePay(input: OvertimeInput): OvertimeOutput {
  const basicHourlyRate = calculateBasicHourlyRate(input.annualBasicSalary, input.jurisdiction);
  const fullTimeHours = getStandardWeeklyHours(input.jurisdiction);
  const seniorNonEligibleBands: AfcBandId[] = ['band-8b', 'band-8c', 'band-8d', 'band-9'];
  const eligibleForPaidOvertime = !seniorNonEligibleBands.includes(input.bandId);

  const stdOt = Math.max(0, input.standardOvertimeHours);
  const bhOt = Math.max(0, input.publicHolidayOvertimeHours);

  if (!eligibleForPaidOvertime) {
    return {
      basicHourlyRate,
      eligibleForPaidOvertime: false,
      partTimePlainTimeHours: 0,
      standardOvertimePaidHours: 0,
      publicHolidayOvertimePaidHours: 0,
      plainTimePay: 0,
      standardOvertimePay: 0,
      publicHolidayOvertimePay: 0,
      wtrHolidayPay: 0,
      totalOvertimePay: 0,
      eligibilityNote:
        'Under Agenda for Change Section 3, staff in Band 8b–9 are not normally eligible for paid overtime and instead receive Time Off in Lieu (TOIL).',
    };
  }

  // Part-time rule: extra hours up to standard full-time weekly hours (37.5h or 36h Scotland) are paid at plain time (1.0x)
  // Assuming user enters monthly overtime; weekly gap * 4.333 or direct weekly toggle. We model weekly gap cleanly if contracted < full-time.
  const weeklyGap = Math.max(0, fullTimeHours - Math.max(0, input.contractedWeeklyHours));
  const partTimePlainTimeHours = Math.min(stdOt, weeklyGap);
  const standardOvertimePaidHours = Math.max(0, stdOt - partTimePlainTimeHours);

  const plainTimePay = roundMoney(partTimePlainTimeHours * basicHourlyRate);
  const standardOvertimePay = roundMoney(standardOvertimePaidHours * basicHourlyRate * 1.5);
  const publicHolidayOvertimePay = roundMoney(bhOt * basicHourlyRate * 2.0);
  const subtotal = roundMoney(plainTimePay + standardOvertimePay + publicHolidayOvertimePay);
  const wtrHolidayPay = input.includeBankWtrRollup ? roundMoney(subtotal * 0.1207) : 0;

  return {
    basicHourlyRate,
    eligibleForPaidOvertime: true,
    partTimePlainTimeHours: roundMoney(partTimePlainTimeHours),
    standardOvertimePaidHours: roundMoney(standardOvertimePaidHours),
    publicHolidayOvertimePaidHours: roundMoney(bhOt),
    plainTimePay,
    standardOvertimePay,
    publicHolidayOvertimePay,
    wtrHolidayPay,
    totalOvertimePay: roundMoney(subtotal + wtrHolidayPay),
    eligibilityNote:
      weeklyGap > 0
        ? `Part-time hours up to ${fullTimeHours}h/week are paid at plain time (1.0x) before 1.5x overtime rates apply.`
        : 'Standard full-time Agenda for Change Section 3 overtime rates applied (1.5x Mon–Sun / 2.0x Public Holidays).',
  };
}
