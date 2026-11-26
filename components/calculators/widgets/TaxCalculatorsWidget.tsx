'use client';

import { useState } from 'react';
import { calculateFullNhsPay2026_2027 } from '@/lib/calculations/fullPay';
import { calculateNationalInsurance2026_2027 } from '@/lib/calculations/nationalInsurance';
import { calculateStudentLoan2026_2027 } from '@/lib/calculations/studentLoan';
import { calculateNhsPension2026_2027 } from '@/lib/calculations/pension';
import { formatGBP, formatPercent, roundMoney } from '@/lib/formatting/currency';
import { validatePositiveNumber } from '@/lib/validation/inputs';
import type { StudentLoanPlan, UkJurisdiction } from '@/types/payroll';
import {
  BreakdownTable,
  CalculatorCardLayout,
  JurisdictionSelect,
  KpiGrid,
  NumberField,
  StudentLoanSelect,
  WarningList,
} from '../CalculatorFields';

export function TaxCalculatorsWidget({ slug }: { slug: string }) {
  const [jurisdiction, setJurisdiction] = useState<UkJurisdiction>('england');
  const [salaryStr, setSalaryStr] = useState<string>('48117');
  const [taxCode, setTaxCode] = useState<string>('1257L');
  const [pensionOptIn, setPensionOptIn] = useState<boolean>(true);
  const [sacrificeMonthlyStr, setSacrificeMonthlyStr] = useState<string>('350');
  const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>('plan-2');
  const [hasPostgrad, setHasPostgrad] = useState<boolean>(false);

  const salaryVal = validatePositiveNumber(salaryStr, 'Annual gross NHS income', 0, 500000);
  const sacrificeVal = validatePositiveNumber(sacrificeMonthlyStr, 'Monthly salary sacrifice', 0, 5000);
  const annualSacrifice = roundMoney(sacrificeVal.value * 12);

  const handleReset = () => {
    setJurisdiction('england');
    setSalaryStr('48117');
    setTaxCode('1257L');
    setPensionOptIn(true);
    setSacrificeMonthlyStr('350');
    setStudentLoanPlan('plan-2');
    setHasPostgrad(false);
  };

  // 1. NHS Income Tax Calculator
  if (slug === 'nhs-tax-calculator') {
    const res = calculateFullNhsPay2026_2027({
      fullTimeBasicSalary: salaryVal.value,
      jurisdiction,
      pensionOptIn,
      taxCode,
    });

    return (
      <CalculatorCardLayout title="NHS Income Tax Band Breakdown (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'Annual Income Tax',
                value: formatGBP(res.incomeTax),
                sublabel: `${formatGBP(roundMoney(res.incomeTax / 12))}/month · Effective ${formatPercent(res.effectiveTaxRate, 1)}`,
                highlight: true,
              },
              {
                label: 'Taxable Income (After Pension & PA)',
                value: formatGBP(Math.max(0, res.taxableIncome - res.personalAllowance)),
                sublabel: `Personal Allowance: ${formatGBP(res.personalAllowance)} · Marginal ${formatPercent(res.marginalTaxRate, 0)}`,
              },
            ]}
          />
          <BreakdownTable
            title={jurisdiction === 'scotland' ? 'Scottish Income Tax Bands (2026/27)' : 'UK Income Tax Bands (2026/27)'}
            rows={[
              { label: 'Gross NHS Earnings', value: formatGBP(res.totalGrossPay) },
              { label: `NHS Pension Net Pay Deduction (${formatPercent(res.pensionRate, 1)})`, value: `-${formatGBP(res.pensionContribution)}`, tone: 'deduction' },
              { label: 'Tax-Free Personal Allowance', value: formatGBP(res.personalAllowance) },
              ...res.incomeTaxBreakdown.map((b) => ({
                label: `${b.bandName} (${Math.round(b.rate * 100)}% on ${formatGBP(b.taxableAmount)})`,
                value: formatGBP(b.taxAmount),
              })),
              { label: 'Total Annual Income Tax', value: formatGBP(res.incomeTax), tone: 'total' },
            ]}
          />
          <WarningList warnings={res.warnings} />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={setJurisdiction} />
        <NumberField id="tax-salary" label="Annual Gross NHS Income" prefix="£" value={salaryStr} onChange={setSalaryStr} error={salaryVal.error} />
        <div>
          <label htmlFor="tax-code-field" className="block text-xs font-semibold text-[#2F3432]">
            HMRC Tax Code
          </label>
          <input
            id="tax-code-field"
            type="text"
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value)}
            placeholder="1257L"
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 font-mono text-base uppercase text-[#2F3432] focus:border-[#149777] focus:outline-none sm:text-sm"
          />
        </div>
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <input type="checkbox" checked={pensionOptIn} onChange={(e) => setPensionOptIn(e.target.checked)} className="h-4 w-4 shrink-0 rounded border-slate-300 text-[#149777]" />
          <span>Deduct NHS Pension before Income Tax (Net Pay)</span>
        </label>
      </CalculatorCardLayout>
    );
  }

  // 2. NHS National Insurance Calculator
  if (slug === 'nhs-national-insurance-calculator') {
    const niBefore = calculateNationalInsurance2026_2027(salaryVal.value);
    const niAfter = calculateNationalInsurance2026_2027(Math.max(0, salaryVal.value - annualSacrifice));
    const niSaved = roundMoney(niBefore.annualNI - niAfter.annualNI);

    return (
      <CalculatorCardLayout title="NHS Class 1 National Insurance Calculator (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'Annual Employee National Insurance',
                value: formatGBP(niAfter.annualNI),
                sublabel: `${formatGBP(niAfter.monthlyNI)}/mo · ${formatGBP(niAfter.weeklyNI)}/wk`,
                highlight: true,
              },
              {
                label: 'Salary Sacrifice NI Saving',
                value: formatGBP(niSaved),
                sublabel: `Effective NI rate: ${formatPercent(niAfter.effectiveNIRate, 1)}`,
              },
            ]}
          />
          <BreakdownTable
            title="2026/2027 Class 1 NI Threshold Breakdown"
            rows={[
              { label: '0% up to Primary Threshold (£12,570)', value: '£0.00' },
              { label: `8% Main Rate on ${formatGBP(niAfter.earningsAtMainRate)} (£12,570 – £50,270)`, value: formatGBP(roundMoney(niAfter.earningsAtMainRate * 0.08)) },
              { label: `2% Upper Rate on ${formatGBP(niAfter.earningsAtUpperRate)} (Over £50,270)`, value: formatGBP(roundMoney(niAfter.earningsAtUpperRate * 0.02)) },
              { label: 'Total Annual Employee NI', value: formatGBP(niAfter.annualNI), tone: 'total' },
            ]}
          />
        </>
      }>
        <NumberField id="ni-salary" label="Annual Gross NIable NHS Pay" prefix="£" value={salaryStr} onChange={setSalaryStr} helperText="Includes basic pay, HCAS, unsocial hours, and overtime (NHS pension does not reduce NI)." error={salaryVal.error} />
        <NumberField id="ni-sacrifice" label="Optional Monthly Salary Sacrifice" prefix="£" suffix="/ mo" value={sacrificeMonthlyStr} onChange={setSacrificeMonthlyStr} error={sacrificeVal.error} />
      </CalculatorCardLayout>
    );
  }

  // 3. NHS Salary Sacrifice Calculator
  if (slug === 'nhs-salary-sacrifice-calculator') {
    const before = calculateFullNhsPay2026_2027({
      fullTimeBasicSalary: salaryVal.value,
      jurisdiction,
      pensionOptIn,
      studentLoanPlan,
      hasPostgraduateLoan: hasPostgrad,
    });
    const after = calculateFullNhsPay2026_2027({
      fullTimeBasicSalary: salaryVal.value,
      jurisdiction,
      pensionOptIn,
      salarySacrificeAnnual: annualSacrifice,
      studentLoanPlan,
      hasPostgraduateLoan: hasPostgrad,
    });

    const taxSaved = roundMoney(before.incomeTax - after.incomeTax);
    const niSaved = roundMoney(before.nationalInsurance - after.nationalInsurance);
    const loanSaved = roundMoney(
      before.studentLoanRepayment + before.postgraduateLoanRepayment - (after.studentLoanRepayment + after.postgraduateLoanRepayment)
    );
    const netMonthlyCost = roundMoney(before.netPayMonthly - after.netPayMonthly);
    const pensionBefore = calculateNhsPension2026_2027(before.pensionablePay, jurisdiction);
    const pensionAfter = calculateNhsPension2026_2027(after.pensionablePay, jurisdiction);
    const careLoss = pensionOptIn
      ? roundMoney(pensionBefore.annualCarePensionAccrued - pensionAfter.annualCarePensionAccrued)
      : 0;

    return (
      <CalculatorCardLayout title="NHS Salary Sacrifice & CARE Pension Impact (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'True Net Monthly Cost',
                value: `${formatGBP(netMonthlyCost)} / mo`,
                sublabel: `Gross sacrifice: ${formatGBP(sacrificeVal.value)}/mo`,
                highlight: true,
              },
              {
                label: 'Annual Tax + NI + Loan Saved',
                value: formatGBP(roundMoney(taxSaved + niSaved + loanSaved)),
                sublabel: pensionOptIn ? `CARE pension reduced by ${formatGBP(careLoss)}/yr` : 'Pension not enrolled',
              },
            ]}
          />
          <BreakdownTable
            title="Annual Salary Sacrifice Savings & Pension Impact"
            rows={[
              { label: 'Gross Annual Salary Sacrifice', value: formatGBP(annualSacrifice) },
              { label: 'Income Tax Saved', value: `+${formatGBP(taxSaved)}`, tone: 'positive' },
              { label: 'National Insurance Saved', value: `+${formatGBP(niSaved)}`, tone: 'positive' },
              ...(loanSaved > 0 ? [{ label: 'Student Loan Repayment Saved', value: `+${formatGBP(loanSaved)}`, tone: 'positive' as const }] : []),
              ...(pensionOptIn ? [{ label: 'NHS Pension Contribution Difference', value: formatGBP(roundMoney(before.pensionContribution - after.pensionContribution)) }] : []),
              { label: 'Annual Net Take-Home Reduction', value: formatGBP(roundMoney(before.netPayAnnual - after.netPayAnnual)), tone: 'total' },
            ]}
          />
          <WarningList warnings={after.warnings} />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={setJurisdiction} />
        <NumberField id="sac-salary" label="Annual Gross NHS Salary (Before Sacrifice)" prefix="£" value={salaryStr} onChange={setSalaryStr} error={salaryVal.error} />
        <NumberField id="sac-amount" label="Monthly Gross Salary Sacrifice (Fleet / Cycle)" prefix="£" suffix="/ mo" value={sacrificeMonthlyStr} onChange={setSacrificeMonthlyStr} error={sacrificeVal.error} />
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <input type="checkbox" checked={pensionOptIn} onChange={(e) => setPensionOptIn(e.target.checked)} className="h-4 w-4 shrink-0 rounded border-slate-300 text-[#149777]" />
          <span>Enrolled in 2015 NHS CARE Pension Scheme</span>
        </label>
        <StudentLoanSelect plan={studentLoanPlan} onPlanChange={setStudentLoanPlan} hasPostgrad={hasPostgrad} onPostgradChange={setHasPostgrad} />
      </CalculatorCardLayout>
    );
  }

  // 4. NHS Student Loan Calculator
  const loanRes = calculateStudentLoan2026_2027(salaryVal.value, studentLoanPlan, hasPostgrad);

  return (
    <CalculatorCardLayout title="NHS Student & Postgraduate Loan Calculator (2026/2027)" onReset={handleReset} results={
      <>
        <KpiGrid
          items={[
            {
              label: 'Monthly PAYE Loan Repayment',
              value: `${formatGBP(loanRes.totalMonthlyRepayment)} / mo`,
              sublabel: `Annual repayment: ${formatGBP(loanRes.totalAnnualRepayment)}/yr`,
              highlight: true,
            },
            {
              label: 'Undergraduate Threshold (9%)',
              value: loanRes.undergraduateThreshold > 0 ? formatGBP(loanRes.undergraduateThreshold, false) : 'None Selected',
              sublabel: hasPostgrad ? 'Postgraduate threshold: £21,000 (6%)' : 'No Postgraduate Loan',
            },
          ]}
        />
        <BreakdownTable
          title="2026/2027 Student Loan Breakdown"
          rows={[
            { label: 'Gross NIable NHS Earnings', value: formatGBP(salaryVal.value) },
            { label: `Undergraduate Loan (${studentLoanPlan.toUpperCase()})`, value: `${formatGBP(loanRes.annualUndergraduateRepayment)} / yr (${formatGBP(loanRes.monthlyUndergraduateRepayment)}/mo)` },
            { label: 'Postgraduate Loan (6% above £21,000)', value: `${formatGBP(loanRes.annualPostgraduateRepayment)} / yr (${formatGBP(loanRes.monthlyPostgraduateRepayment)}/mo)` },
            { label: 'Total Monthly Loan Deduction', value: `${formatGBP(loanRes.totalMonthlyRepayment)} / mo`, tone: 'total' },
          ]}
        />
      </>
    }>
      <NumberField
        id="sl-salary"
        label="Annual Gross NIable NHS Pay"
        prefix="£"
        value={salaryStr}
        onChange={setSalaryStr}
        helperText="NHS Pension deductions do not reduce Student Loan repayment income."
        error={salaryVal.error}
      />
      <StudentLoanSelect
        plan={studentLoanPlan}
        onPlanChange={setStudentLoanPlan}
        hasPostgrad={hasPostgrad}
        onPostgradChange={setHasPostgrad}
      />
    </CalculatorCardLayout>
  );
}
