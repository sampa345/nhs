'use client';

import { useState } from 'react';
import { calculateNhsPension2026_2027 } from '@/lib/calculations/pension';
import { calculateFullNhsPay2026_2027 } from '@/lib/calculations/fullPay';
import { getPensionTiersForJurisdiction } from '@/lib/tax-years/2026-2027/pension';
import { formatGBP, formatPercent, roundMoney } from '@/lib/formatting/currency';
import { validatePositiveNumber } from '@/lib/validation/inputs';
import type { UkJurisdiction } from '@/types/payroll';
import {
  BreakdownTable,
  CalculatorCardLayout,
  JurisdictionSelect,
  KpiGrid,
  NumberField,
} from '../CalculatorFields';

export function PensionCalculatorsWidget({ slug }: { slug: string }) {
  const [jurisdiction, setJurisdiction] = useState<UkJurisdiction>('england');
  const [salaryStr, setSalaryStr] = useState<string>('39043');
  const [unsocialAnnualStr, setUnsocialAnnualStr] = useState<string>('0');
  const [yearsStr, setYearsStr] = useState<string>('20');

  const salaryVal = validatePositiveNumber(salaryStr, 'Annual pensionable salary', 0, 500000);
  const unsocialVal = validatePositiveNumber(unsocialAnnualStr, 'Annual pensionable unsocial pay', 0, 100000);
  const yearsVal = validatePositiveNumber(yearsStr, 'Years of membership', 1, 50);

  const totalPensionablePay = roundMoney(salaryVal.value + (slug === 'nhs-pension-contribution-calculator' ? unsocialVal.value : 0));
  const pensionRes = calculateNhsPension2026_2027(totalPensionablePay, jurisdiction);

  const optedIn = calculateFullNhsPay2026_2027({
    fullTimeBasicSalary: totalPensionablePay,
    jurisdiction,
    pensionOptIn: true,
  });

  const optedOut = calculateFullNhsPay2026_2027({
    fullTimeBasicSalary: totalPensionablePay,
    jurisdiction,
    pensionOptIn: false,
  });

  const taxSavedAnnual = roundMoney(optedOut.incomeTax - optedIn.incomeTax);
  const netCostAnnual = roundMoney(pensionRes.annualEmployeeContribution - taxSavedAnnual);

  const handleReset = () => {
    setJurisdiction('england');
    setSalaryStr('39043');
    setUnsocialAnnualStr('0');
    setYearsStr('20');
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
