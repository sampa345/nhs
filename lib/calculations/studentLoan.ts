import {
  POSTGRADUATE_LOAN_2026_2027,
  STUDENT_LOAN_PLANS_2026_2027,
} from '@/lib/tax-years/2026-2027/studentLoan';
import { roundMoney } from '@/lib/formatting/currency';
import type { StudentLoanPlan } from '@/types/payroll';

export interface StudentLoanCalculationResult {
  undergraduatePlan: StudentLoanPlan;
  undergraduateThreshold: number;
  annualUndergraduateRepayment: number;
  monthlyUndergraduateRepayment: number;
  hasPostgraduateLoan: boolean;
  postgraduateThreshold: number;
  annualPostgraduateRepayment: number;
  monthlyPostgraduateRepayment: number;
  totalAnnualRepayment: number;
  totalMonthlyRepayment: number;
}

export function calculateStudentLoan2026_2027(
  niableAnnualIncome: number,
  plan: StudentLoanPlan,
  hasPostgraduateLoan = false
): StudentLoanCalculationResult {
  const income = Math.max(0, niableAnnualIncome);
  const config = STUDENT_LOAN_PLANS_2026_2027[plan];

  const annualUndergraduateRepayment =
    plan === 'none' || income <= config.annualThreshold
      ? 0
      : roundMoney((income - config.annualThreshold) * config.rate);

  const annualPostgraduateRepayment =
    !hasPostgraduateLoan || income <= POSTGRADUATE_LOAN_2026_2027.annualThreshold
      ? 0
      : roundMoney((income - POSTGRADUATE_LOAN_2026_2027.annualThreshold) * POSTGRADUATE_LOAN_2026_2027.rate);

  const totalAnnualRepayment = roundMoney(annualUndergraduateRepayment + annualPostgraduateRepayment);

  return {
    undergraduatePlan: plan,
    undergraduateThreshold: config.annualThreshold,
    annualUndergraduateRepayment,
    monthlyUndergraduateRepayment: roundMoney(annualUndergraduateRepayment / 12),
    hasPostgraduateLoan,
    postgraduateThreshold: POSTGRADUATE_LOAN_2026_2027.annualThreshold,
    annualPostgraduateRepayment,
    monthlyPostgraduateRepayment: roundMoney(annualPostgraduateRepayment / 12),
    totalAnnualRepayment,
    totalMonthlyRepayment: roundMoney(totalAnnualRepayment / 12),
  };
}
