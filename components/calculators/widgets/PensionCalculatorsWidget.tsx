'use client';

import { useState } from 'react';
import { calculateNhsPension2026_2027 } from '@/lib/calculations/pension';
import { calculateFullNhsPay2026_2027 } from '@/lib/calculations/fullPay';
import { getPensionTiersForJurisdiction } from '@/lib/tax-years/2026-2027/pension';
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
} from '../CalculatorFields';

export function PensionCalculatorsWidget({ slug }: { slug: string }) {
  const [jurisdiction, setJurisdiction] = useState<UkJurisdiction>('england');
  const [salaryStr, setSalaryStr] = useState<string>('39043');
  const [unsocialAnnualStr, setUnsocialAnnualStr] = useState<string>('0');
  const [yearsStr, setYearsStr] = useState<string>('20');
  const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>('none');
  const [hasPostgrad, setHasPostgrad] = useState<boolean>(false);

  const salaryVal = validatePositiveNumber(salaryStr, 'Annual pensionable salary', 0, 500000);
  const unsocialVal = validatePositiveNumber(unsocialAnnualStr, 'Annual pensionable unsocial pay', 0, 100000);
  const yearsVal = validatePositiveNumber(yearsStr, 'Years of membership', 1, 50);

  const totalPensionablePay = roundMoney(salaryVal.value + (slug === 'nhs-pension-contribution-calculator' ? unsocialVal.value : 0));
  const pensionRes = calculateNhsPension2026_2027(totalPensionablePay, jurisdiction);

  const optedIn = calculateFullNhsPay2026_2027({
    fullTimeBasicSalary: totalPensionablePay,
    jurisdiction,
    pensionOptIn: true,
    studentLoanPlan,
    hasPostgraduateLoan: hasPostgrad,
  });

  const optedOut = calculateFullNhsPay2026_2027({
    fullTimeBasicSalary: totalPensionablePay,
    jurisdiction,
    pensionOptIn: false,
    studentLoanPlan,
    hasPostgraduateLoan: hasPostgrad,
  });

  const taxSavedAnnual = roundMoney(optedOut.incomeTax - optedIn.incomeTax);
  const netCostAnnual = roundMoney(pensionRes.annualEmployeeContribution - taxSavedAnnual);
  const effectiveReliefRate =
    pensionRes.annualEmployeeContribution > 0
      ? taxSavedAnnual / pensionRes.annualEmployeeContribution
      : 0;
  const takeHomeMonthlyDiff = roundMoney(optedOut.netPayMonthly - optedIn.netPayMonthly);

  const handleReset = () => {
    setJurisdiction('england');
    setSalaryStr('39043');
    setUnsocialAnnualStr('0');
    setYearsStr('20');
    setStudentLoanPlan('none');
    setHasPostgrad(false);
  };

  if (slug === 'nhs-pension-contribution-calculator') {
    const tiers = getPensionTiersForJurisdiction(jurisdiction);
    return (
      <CalculatorCardLayout title="NHS Pension Tier & Contribution Checker (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'Matched Member Contribution Tier',
                value: formatPercent(pensionRes.memberRate, 1),
                sublabel: `${formatGBP(pensionRes.monthlyEmployeeContribution)}/month gross deduction`,
                highlight: true,
              },
              {
                label: 'Headroom to Next Tier',
                value:
                  pensionRes.headroomToNextTier !== null
                    ? formatGBP(pensionRes.headroomToNextTier)
                    : 'Top Tier Reached',
                sublabel:
                  pensionRes.nextTierRate !== null
                    ? `Next bracket rate: ${formatPercent(pensionRes.nextTierRate, 1)}`
                    : 'Maximum member tier',
              },
            ]}
          />
          <BreakdownTable
            title={`2026/2027 ${jurisdiction === 'scotland' ? 'SPPA Scotland' : 'NHSBSA England & Wales'} Tiers`}
            rows={tiers.map((t) => ({
              label: t.label + (t.label === pensionRes.matchedTier.label ? ' (Your Tier)' : ''),
              value: formatPercent(t.rate, 1),
              tone: t.label === pensionRes.matchedTier.label ? ('positive' as const) : ('default' as const),
            }))}
          />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={setJurisdiction} />
        <NumberField
          id="pen-contrib-salary"
          label="Actual Annual Basic Pay (+ HCAS)"
          prefix="£"
          value={salaryStr}
          onChange={setSalaryStr}
          error={salaryVal.error}
        />
        <NumberField
          id="pen-contrib-unsocial"
          label="Annual Pensionable Unsocial Hours Pay"
          prefix="£"
          value={unsocialAnnualStr}
          onChange={setUnsocialAnnualStr}
          helperText="Standard overtime above full-time hours is excluded."
          error={unsocialVal.error}
        />
      </CalculatorCardLayout>
    );
  }

  if (slug === 'nhs-pension-tax-relief-calculator') {
    return (
      <CalculatorCardLayout title="NHS Pension Net Pay Tax Relief Calculator (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'Annual Income Tax Saved via Pension',
                value: formatGBP(taxSavedAnnual),
                sublabel: `Effective relief rate: ${formatPercent(effectiveReliefRate, 1)}`,
                highlight: true,
              },
              {
                label: 'True Net Cost to Take-Home Pay',
                value: `${formatGBP(roundMoney(netCostAnnual / 12))} / mo`,
                sublabel: `Gross deduction is ${formatGBP(pensionRes.monthlyEmployeeContribution)}/mo`,
              },
            ]}
          />
          <BreakdownTable
            title="Tax Relief Comparison (Opted In vs No Pension)"
            rows={[
              { label: 'Gross Annual Pension Contribution', value: formatGBP(pensionRes.annualEmployeeContribution) },
              { label: 'Income Tax Without Pension', value: formatGBP(optedOut.incomeTax) },
              { label: 'Income Tax With NHS Pension', value: formatGBP(optedIn.incomeTax) },
              { label: 'Automatic Net Pay Tax Relief Saved', value: `+${formatGBP(taxSavedAnnual)}`, tone: 'positive' },
              { label: 'Net Annual Out-of-Pocket Cost', value: formatGBP(netCostAnnual), tone: 'total' },
            ]}
          />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={setJurisdiction} />
        <NumberField
          id="pen-relief-salary"
          label="Actual Annual Pensionable Pay"
          prefix="£"
          value={salaryStr}
          onChange={setSalaryStr}
          error={salaryVal.error}
        />
      </CalculatorCardLayout>
    );
  }

  if (slug === 'nhs-pension-take-home-pay-calculator') {
    return (
      <CalculatorCardLayout title="Opt-In vs Opt-Out Take-Home Comparison (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'Monthly Net Pay (Opted In)',
                value: formatGBP(optedIn.netPayMonthly),
                sublabel: `Builds ${formatGBP(pensionRes.annualCarePensionAccrued)}/yr CARE pension`,
                highlight: true,
              },
              {
                label: 'Monthly Cash Gain If Opted Out',
                value: `+${formatGBP(takeHomeMonthlyDiff)} / mo`,
                sublabel: `Forfeits ${formatGBP(pensionRes.monthlyEmployerContribution)}/mo employer contribution`,
              },
            ]}
          />
          <BreakdownTable
            title="Side-by-Side Monthly Payslip Impact"
            rows={[
              { label: 'Gross Monthly Pay', value: formatGBP(roundMoney(totalPensionablePay / 12)) },
              { label: 'Employee Pension (Opted In)', value: `-${formatGBP(pensionRes.monthlyEmployeeContribution)}`, tone: 'deduction' },
              { label: 'Monthly Tax (Opted In vs Opted Out)', value: `${formatGBP(roundMoney(optedIn.incomeTax / 12))} vs ${formatGBP(roundMoney(optedOut.incomeTax / 12))}` },
              { label: 'Monthly NI (Unchanged)', value: formatGBP(roundMoney(optedIn.nationalInsurance / 12)) },
              { label: 'Employer Pension Contribution Forfeited if Opt-Out', value: `${formatGBP(pensionRes.monthlyEmployerContribution)} / mo`, tone: 'positive' },
              { label: 'Net Monthly Difference', value: `${formatGBP(takeHomeMonthlyDiff)} / mo`, tone: 'total' },
            ]}
          />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={setJurisdiction} />
        <NumberField
          id="pen-thp-salary"
          label="Annual Pensionable Salary"
          prefix="£"
          value={salaryStr}
          onChange={setSalaryStr}
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

  // Default: nhs-pension-calculator (2015 CARE Scheme Estimator)
  const projectedCarePension = roundMoney(pensionRes.annualCarePensionAccrued * yearsVal.value);

  return (
    <CalculatorCardLayout title="NHS 2015 CARE Pension Estimator (2026/2027)" onReset={handleReset} results={
      <>
        <KpiGrid
          items={[
            {
              label: 'Annual CARE Pension Accrued (1/54th)',
              value: `${formatGBP(pensionRes.annualCarePensionAccrued)} / yr`,
              sublabel: `${yearsVal.value}-yr base total: ${formatGBP(projectedCarePension)}/yr (before CPI+1.5%)`,
              highlight: true,
            },
            {
              label: `Member Tier (${formatPercent(pensionRes.memberRate, 1)})`,
              value: `${formatGBP(pensionRes.monthlyEmployeeContribution)} / mo`,
              sublabel: `Net cost after tax relief: ${formatGBP(roundMoney(netCostAnnual / 12))}/mo`,
            },
          ]}
        />
        <BreakdownTable
          title="2026/2027 NHS Pension Summary"
          rows={[
            { label: 'Actual Pensionable Pay', value: formatGBP(pensionRes.pensionablePay) },
            { label: `Employee Contribution (${formatPercent(pensionRes.memberRate, 1)})`, value: formatGBP(pensionRes.annualEmployeeContribution) },
            { label: 'Income Tax Saved (Net Pay Relief)', value: formatGBP(taxSavedAnnual), tone: 'positive' },
            { label: 'True Net Annual Member Cost', value: formatGBP(netCostAnnual) },
            { label: `Employer Contribution (${formatPercent(pensionRes.employerRate, 1)})`, value: formatGBP(pensionRes.annualEmployerContribution) },
            { label: `Projected Base CARE Pension (${yearsVal.value} Years)`, value: `${formatGBP(projectedCarePension)} / yr`, tone: 'total' },
          ]}
        />
      </>
    }>
      <JurisdictionSelect value={jurisdiction} onChange={setJurisdiction} />
      <NumberField
        id="pen-main-salary"
        label="Actual Annual Pensionable Salary"
        prefix="£"
        value={salaryStr}
        onChange={setSalaryStr}
        error={salaryVal.error}
      />
      <NumberField
        id="pen-main-years"
        label="Projected Years in 2015 CARE Scheme"
        suffix="years"
        value={yearsStr}
        onChange={setYearsStr}
        min={1}
        max={50}
        error={yearsVal.error}
      />
    </CalculatorCardLayout>
  );
}
