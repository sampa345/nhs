import assert from 'node:assert/strict';
import { calculateIncomeTax2026_2027 } from '../../lib/calculations/incomeTax';
import { calculateNationalInsurance2026_2027 } from '../../lib/calculations/nationalInsurance';
import { calculateNhsPension2026_2027 } from '../../lib/calculations/pension';
import { calculateStudentLoan2026_2027 } from '../../lib/calculations/studentLoan';
import {
  calculateBasicHourlyRate,
  calculateOvertimePay,
  calculateUnsocialHoursPay,
} from '../../lib/calculations/shiftsAndOvertime';
import {
  calculateAnnualLeaveEntitlement,
  calculateMaternityPay,
  calculatePaternityPay,
  calculateRedundancyPay,
  calculateSickPay,
} from '../../lib/calculations/employment';
import { calculateFullNhsPay2026_2027 } from '../../lib/calculations/fullPay';

// 1. Income Tax (England vs Scotland)
{
  const eng = calculateIncomeTax2026_2027({ taxableGrossIncome: 35000, jurisdiction: 'england' });
  // (35000 - 12570) * 0.20 = 4486
  assert.equal(eng.totalTax, 4486);
  assert.equal(eng.personalAllowance, 12570);

  const scot = calculateIncomeTax2026_2027({ taxableGrossIncome: 35000, jurisdiction: 'scotland' });
  // Starter: 3967 * 0.19 = 753.73
  // Basic: (16956 - 3967) * 0.20 = 2597.80
  // Intermediate: (22430 - 16956) * 0.21 = 1149.54
  // Total = 4501.07
  assert.equal(scot.totalTax, 4501.07);

  // £110,000 PA taper check: PA loses (110000 - 100000)/2 = 5000 => PA = 7570
  const high = calculateIncomeTax2026_2027({ taxableGrossIncome: 110000, jurisdiction: 'england' });
  assert.equal(high.personalAllowance, 7570);
}

// 2. National Insurance 2026/27
{
  const ni = calculateNationalInsurance2026_2027(32073);
  // (32073 - 12570) * 0.08 = 1560.24
  assert.equal(ni.annualNI, 1560.24);

  const niHigh = calculateNationalInsurance2026_2027(60000);
  // (50270 - 12570) * 0.08 + (60000 - 50270) * 0.02 = 3016 + 194.60 = 3210.60
  assert.equal(niHigh.annualNI, 3210.6);
}

// 3. NHS Pension 2026/27 (England vs Scotland)
{
  const penEng = calculateNhsPension2026_2027(32073, 'england');
  // 28,855 to 35,155 => 8.3%
  assert.equal(penEng.memberRate, 0.083);
  assert.equal(penEng.annualEmployeeContribution, 2662.06);
  assert.equal(penEng.employerRate, 0.237);

  const penScot = calculateNhsPension2026_2027(34544, 'scotland');
  // Scotland 33,063 to 41,482 => 8.7%
  assert.equal(penScot.memberRate, 0.087);
  assert.equal(penScot.employerRate, 0.225);
}

// 4. Student Loan 2026/27
{
  const loan = calculateStudentLoan2026_2027(39043, 'plan-2', true);
  // Plan 2: (39043 - 29385) * 0.09 = 869.22
  // Postgrad: (39043 - 21000) * 0.06 = 1082.58
  assert.equal(loan.annualUndergraduateRepayment, 869.22);
  assert.equal(loan.annualPostgraduateRepayment, 1082.58);
}

// 5. Shifts & Overtime
{
  const hourly = calculateBasicHourlyRate(32073, 'england');
  assert.ok(hourly > 16.3 && hourly < 16.5);

  const unsocial = calculateUnsocialHoursPay({
    annualBasicSalary: 32073,
    bandId: 'band-5',
    jurisdiction: 'england',
    standardDayHoursPerMonth: 100,
    weekdayNightHoursPerMonth: 20,
    saturdayHoursPerMonth: 10,
    sundayHoursPerMonth: 10,
    bankHolidayHoursPerMonth: 0,
  });
  assert.equal(unsocial.nightSaturdayRateDecimal, 0.3);
  assert.equal(unsocial.sundayBankHolidayRateDecimal, 0.6);
  assert.ok(unsocial.totalMonthlyEnhancement > 0);

  const seniorOt = calculateOvertimePay({
    annualBasicSalary: 70896,
    bandId: 'band-8b',
    jurisdiction: 'england',
    contractedWeeklyHours: 37.5,
    standardOvertimeHours: 10,
    publicHolidayOvertimeHours: 0,
  });
  assert.equal(seniorOt.eligibleForPaidOvertime, false);
  assert.equal(seniorOt.totalOvertimePay, 0);

  const partTimeOt = calculateOvertimePay({
    annualBasicSalary: 32073,
    bandId: 'band-5',
    jurisdiction: 'england',
    contractedWeeklyHours: 30,
    standardOvertimeHours: 10,
    publicHolidayOvertimeHours: 0,
  });
  // First 7.5 hours plain time, remaining 2.5 hours at 1.5x
  assert.equal(partTimeOt.partTimePlainTimeHours, 7.5);
  assert.equal(partTimeOt.standardOvertimePaidHours, 2.5);
}

// 6. Employment Entitlements
{
  const leave = calculateAnnualLeaveEntitlement(6, 37.5, 'england');
  assert.equal(leave.fullTimeBaseDays, 29);
  assert.equal(leave.fullTimeBankHolidays, 8);
  assert.equal(leave.proRataTotalHours, 277.5);

  const sick = calculateSickPay(36000, 'year-5-plus', 4);
  assert.equal(sick.fullPayMonths, 6);
  assert.equal(sick.halfPayMonths, 6);

  const mat = calculateMaternityPay(36000, true, true);
  assert.equal(mat.eligibleForOmp, true);
  assert.ok(mat.weeks1To8Weekly > mat.weeks9To26Weekly);

  const pat = calculatePaternityPay(36000, 2, true, true);
  assert.equal(pat.eligibleForOccupationalFullPay, true);

  const red = calculateRedundancyPay(40000, 30);
  // Capped at 24 months pay => 40000 * 2 = 80000
  assert.equal(red.cappedMonthsPay, 24);
  assert.equal(red.totalRedundancyPay, 80000);
  assert.equal(red.taxFreePortion, 30000);
  assert.equal(red.taxablePortion, 50000);
}

// 7. Full Pay Integration
{
  const full = calculateFullNhsPay2026_2027({
    fullTimeBasicSalary: 32073,
    jurisdiction: 'england',
    hcasZone: 'inner-london',
    pensionOptIn: true,
    studentLoanPlan: 'plan-2',
  });
  // Inner London 20% of 32073 = 6414.60 (within 5794 - 8746)
  assert.equal(full.hcasAllowance, 6414.6);
  assert.equal(full.totalGrossPay, 38487.6);
  assert.ok(full.netPayAnnual > 0 && full.netPayAnnual < full.totalGrossPay);
}

console.log('All 2026/2027 NHS payroll and UK tax calculation tests passed.');
