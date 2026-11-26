import {
  getStandardWeeklyHours,
  HCAS_RULES_2026_2027,
} from '@/lib/tax-years/2026-2027/salaryData';
import { calculateIncomeTax2026_2027 } from './incomeTax';
import { calculateNationalInsurance2026_2027 } from './nationalInsurance';
import { calculateNhsPension2026_2027 } from './pension';
import { calculateStudentLoan2026_2027 } from './studentLoan';
import { roundMoney } from '@/lib/formatting/currency';
import type {
  FullPayCalculationResult,
  HcasZone,
  StudentLoanPlan,
  UkJurisdiction,
} from '@/types/payroll';

export interface FullPayInput {
  /** Full-time equivalent basic annual salary */
  fullTimeBasicSalary: number;
  jurisdiction: UkJurisdiction;
  contractedWeeklyHours?: number;
  hcasZone?: HcasZone;
  additionalUnsocialAnnualPay?: number;
  additionalOvertimeAnnualPay?: number;
  pensionOptIn?: boolean;
  pensionableOvertime?: boolean;
  salarySacrificeAnnual?: number;
  studentLoanPlan?: StudentLoanPlan;
  hasPostgraduateLoan?: boolean;
  taxCode?: string;
}

export function calculateHcasAllowance(
  proRataBasicSalary: number,
  hcasZone: HcasZone,
  fteRatio: number
): number {
  if (hcasZone === 'none') return 0;
  const rule = HCAS_RULES_2026_2027[hcasZone];
  // Calculate full-time HCAS first to apply min/max caps, then pro-rata by FTE
  const fullTimeBasic = fteRatio > 0 ? proRataBasicSalary / fteRatio : proRataBasicSalary;
  const uncappedFtHcas = fullTimeBasic * rule.rate;
  const cappedFtHcas = Math.min(rule.max, Math.max(rule.min, uncappedFtHcas));
  return roundMoney(cappedFtHcas * fteRatio);
}

export function calculateFullNhsPay2026_2027(input: FullPayInput): FullPayCalculationResult {
  const warnings: string[] = [];
  const standardHours = getStandardWeeklyHours(input.jurisdiction);
  const weeklyHours = Math.max(1, input.contractedWeeklyHours ?? standardHours);
  const fteRatio = Math.min(1, weeklyHours / standardHours);

  if (weeklyHours > standardHours) {
    warnings.push(
      `Hours above ${standardHours}h/week are normally treated as overtime rather than basic contracted hours.`
    );
  }

  const grossBaseSalary = roundMoney(Math.max(0, input.fullTimeBasicSalary));
  const proRataSalary = roundMoney(grossBaseSalary * fteRatio);
  const hcasAllowance = calculateHcasAllowance(proRataSalary, input.hcasZone ?? 'none', fteRatio);

  if (input.jurisdiction !== 'england' && (input.hcasZone ?? 'none') !== 'none') {
    warnings.push('High Cost Area Supplements (London weighting) normally apply to eligible Trusts in and around London (England).');
  }

  const unsocialHoursPay = roundMoney(Math.max(0, input.additionalUnsocialAnnualPay ?? 0));
  const overtimePay = roundMoney(Math.max(0, input.additionalOvertimeAnnualPay ?? 0));
  const totalGrossPay = roundMoney(proRataSalary + hcasAllowance + unsocialHoursPay + overtimePay);

  const salarySacrificeAmount = roundMoney(
    Math.min(totalGrossPay, Math.max(0, input.salarySacrificeAnnual ?? 0))
  );
  const grossAfterSacrifice = roundMoney(Math.max(0, totalGrossPay - salarySacrificeAmount));

  // Pensionable pay: Pro-rata basic + HCAS + unsocial hours (overtime excluded by default unless part-time plain time)
  const rawPensionablePay = roundMoney(
    Math.max(0, proRataSalary + hcasAllowance + unsocialHoursPay - salarySacrificeAmount)
  );
  const pensionOptIn = input.pensionOptIn ?? true;

  const pensionResult = pensionOptIn
    ? calculateNhsPension2026_2027(rawPensionablePay, input.jurisdiction)
    : null;

  const pensionContribution = pensionResult ? pensionResult.annualEmployeeContribution : 0;
  const pensionRate = pensionResult ? pensionResult.memberRate : 0;
  const employerPensionContribution = pensionResult ? pensionResult.annualEmployerContribution : 0;
  const employerPensionRate = pensionResult ? pensionResult.employerRate : 0;

  if (salarySacrificeAmount > 0 && pensionOptIn) {
    warnings.push(
      'Salary sacrifice reduces pensionable pay under CARE rules unless your scheme excludes that benefit, which can slightly reduce pension accrual.'
    );
  }

  // Net Pay Arrangement: Pension contributions reduce taxable income for Income Tax,
  // but do NOT reduce earnings subject to Class 1 NI or Student Loan repayments.
  const taxableIncome = roundMoney(Math.max(0, grossAfterSacrifice - pensionContribution));

  const taxResult = calculateIncomeTax2026_2027({
    taxableGrossIncome: taxableIncome,
    jurisdiction: input.jurisdiction,
    taxCode: input.taxCode,
  });

  const niResult = calculateNationalInsurance2026_2027(grossAfterSacrifice);
  const loanResult = calculateStudentLoan2026_2027(
    grossAfterSacrifice,
    input.studentLoanPlan ?? 'none',
    input.hasPostgraduateLoan ?? false
  );

  const totalDeductions = roundMoney(
    pensionContribution +
      taxResult.totalTax +
      niResult.annualNI +
      loanResult.totalAnnualRepayment +
      salarySacrificeAmount
  );

  const netPayAnnual = roundMoney(Math.max(0, totalGrossPay - totalDeductions));
  const annualContractedHours = weeklyHours * (365 / 7);

  return {
    grossBaseSalary,
    proRataSalary,
    hcasAllowance,
    unsocialHoursPay,
    overtimePay,
    totalGrossPay,
    pensionablePay: rawPensionablePay,
    pensionContribution,
    pensionRate,
    employerPensionContribution,
    employerPensionRate,
    salarySacrificeAmount,
    taxableIncome,
    personalAllowance: taxResult.personalAllowance,
    incomeTax: taxResult.totalTax,
    incomeTaxBreakdown: taxResult.breakdown,
    nationalInsurance: niResult.annualNI,
    studentLoanRepayment: loanResult.annualUndergraduateRepayment,
    postgraduateLoanRepayment: loanResult.annualPostgraduateRepayment,
    totalDeductions,
    netPayAnnual,
    netPayMonthly: roundMoney(netPayAnnual / 12),
    netPayFourWeekly: roundMoney(netPayAnnual / 13),
    netPayWeekly: roundMoney(netPayAnnual / 52),
    effectiveHourlyRate: annualContractedHours > 0 ? roundMoney(netPayAnnual / annualContractedHours) : 0,
    effectiveTaxRate: totalGrossPay > 0 ? roundMoney((taxResult.totalTax / totalGrossPay) * 1000) / 1000 : 0,
    marginalTaxRate: taxResult.marginalRate,
    warnings: [...warnings, ...taxResult.warnings],
  };
}
