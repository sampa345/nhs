'use client';

import { useState } from 'react';
import {
  getAfcScalesForJurisdiction,
  getStandardWeeklyHours,
} from '@/lib/tax-years/2026-2027/salaryData';
import { calculateFullNhsPay2026_2027 } from '@/lib/calculations/fullPay';
import { calculateBasicHourlyRate } from '@/lib/calculations/shiftsAndOvertime';
import { calculateAnnualLeaveEntitlement } from '@/lib/calculations/employment';
import { formatGBP, formatPercent, roundMoney } from '@/lib/formatting/currency';
import { validatePositiveNumber } from '@/lib/validation/inputs';
import type {
  AfcBandId,
  HcasZone,
  PayFrequency,
  StudentLoanPlan,
  UkJurisdiction,
} from '@/types/payroll';
import {
  BandAndStepSelect,
  BreakdownTable,
  CalculatorCardLayout,
  HcasSelect,
  JurisdictionSelect,
  KpiGrid,
  NumberField,
  StudentLoanSelect,
  WarningList,
} from '../CalculatorFields';

export function PayCalculatorsWidget({ slug }: { slug: string }) {
  const [jurisdiction, setJurisdiction] = useState<UkJurisdiction>('england');
  const [bandId, setBandId] = useState<AfcBandId>('band-5');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [useCustomSalary, setUseCustomSalary] = useState<boolean>(false);
  const [customSalaryStr, setCustomSalaryStr] = useState<string>('32073');
  const [hcasZone, setHcasZone] = useState<HcasZone>('none');
  const [weeklyHoursStr, setWeeklyHoursStr] = useState<string>(
    slug === 'nhs-part-time-pay-calculator' ? '22.5' : '37.5'
  );
  const [pensionOptIn, setPensionOptIn] = useState<boolean>(true);
  const [studentLoanPlan, setStudentLoanPlan] = useState<StudentLoanPlan>('none');
  const [hasPostgrad, setHasPostgrad] = useState<boolean>(false);
  const [taxCode, setTaxCode] = useState<string>('1257L');
  const [unsocialMonthlyStr, setUnsocialMonthlyStr] = useState<string>('0');
  const [sacrificeMonthlyStr, setSacrificeMonthlyStr] = useState<string>('0');
  const [payFrequency, setPayFrequency] = useState<PayFrequency>('monthly');
  const [payRisePctStr, setPayRisePctStr] = useState<string>('5');
  const [targetBandId, setTargetBandId] = useState<AfcBandId>('band-6');
  const [targetStepIndex, setTargetStepIndex] = useState<number>(0);
  const [includeBankWtr, setIncludeBankWtr] = useState<boolean>(false);
  const [serviceYearsStr, setServiceYearsStr] = useState<string>('5');

  const scales = getAfcScalesForJurisdiction(jurisdiction);
  const activeBand = scales.find((b) => b.bandId === bandId) ?? scales[3];
  const safeStepIdx = Math.min(stepIndex, activeBand.points.length - 1);
  const bandSalary = activeBand.points[safeStepIdx].annualSalary;
  const standardHours = getStandardWeeklyHours(jurisdiction);

  const salaryVal = validatePositiveNumber(customSalaryStr, 'Annual salary', 0, 500000);
  const hoursVal = validatePositiveNumber(weeklyHoursStr, 'Contracted hours', 1, 60);
  const unsocialVal = validatePositiveNumber(unsocialMonthlyStr, 'Monthly unsocial pay', 0, 10000);
  const sacrificeVal = validatePositiveNumber(sacrificeMonthlyStr, 'Monthly salary sacrifice', 0, 5000);
  const riseVal = validatePositiveNumber(payRisePctStr, 'Pay rise %', 0, 100);
  const serviceVal = validatePositiveNumber(serviceYearsStr, 'Years of NHS service', 0, 50);

  const fullTimeBasicSalary = useCustomSalary ? salaryVal.value : bandSalary;
  const contractedHours =
    slug === 'nhs-part-time-pay-calculator' || slug === 'nhs-pay-calculator' || slug === 'nhs-take-home-pay-calculator'
      ? hoursVal.value
      : standardHours;

  const handleJurisdictionChange = (next: UkJurisdiction) => {
    setJurisdiction(next);
    if (slug !== 'nhs-part-time-pay-calculator') {
      setWeeklyHoursStr(String(getStandardWeeklyHours(next)));
    }
    if (next !== 'england' && hcasZone !== 'none') {
      setHcasZone('none');
    }
  };

  const handleReset = () => {
    setJurisdiction('england');
    setBandId('band-5');
    setStepIndex(0);
    setUseCustomSalary(false);
    setCustomSalaryStr('32073');
    setHcasZone('none');
    setWeeklyHoursStr(slug === 'nhs-part-time-pay-calculator' ? '22.5' : '37.5');
    setPensionOptIn(true);
    setStudentLoanPlan('none');
    setHasPostgrad(false);
    setTaxCode('1257L');
    setUnsocialMonthlyStr('0');
    setSacrificeMonthlyStr('0');
    setPayFrequency('monthly');
    setPayRisePctStr('5');
    setTargetBandId('band-6');
    setTargetStepIndex(0);
    setIncludeBankWtr(false);
    setServiceYearsStr('5');
  };

  const payResult = calculateFullNhsPay2026_2027({
    fullTimeBasicSalary,
    jurisdiction,
    contractedWeeklyHours: contractedHours,
    hcasZone,
    additionalUnsocialAnnualPay: slug === 'nhs-take-home-pay-calculator' ? unsocialVal.value * 12 : 0,
    salarySacrificeAnnual: slug === 'nhs-take-home-pay-calculator' ? sacrificeVal.value * 12 : 0,
    pensionOptIn,
    studentLoanPlan,
    hasPostgraduateLoan: hasPostgrad,
    taxCode: slug === 'nhs-take-home-pay-calculator' || slug === 'nhs-salary-after-tax-calculator' ? taxCode : '1257L',
  });

  // Specialized view: Band Comparison Calculator
  if (slug === 'nhs-band-calculator') {
    const targetBand = scales.find((b) => b.bandId === targetBandId) ?? scales[4];
    const safeTargetStep = Math.min(targetStepIndex, targetBand.points.length - 1);
    const targetSalary = targetBand.points[safeTargetStep].annualSalary;

    const currentFull = calculateFullNhsPay2026_2027({
      fullTimeBasicSalary: bandSalary,
      jurisdiction,
      hcasZone,
      pensionOptIn: true,
    });
    const targetFull = calculateFullNhsPay2026_2027({
      fullTimeBasicSalary: targetSalary,
      jurisdiction,
      hcasZone,
      pensionOptIn: true,
    });

    const grossDiff = roundMoney(targetFull.totalGrossPay - currentFull.totalGrossPay);
    const netMonthlyDiff = roundMoney(targetFull.netPayMonthly - currentFull.netPayMonthly);

    return (
      <CalculatorCardLayout title="NHS Band & Step Comparison (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: `${activeBand.bandLabel} Gross Salary (incl. HCAS)`,
                value: formatGBP(currentFull.totalGrossPay),
                sublabel: `${formatGBP(currentFull.netPayMonthly)}/mo estimated net`,
                highlight: true,
              },
              {
                label: `Promotion to ${targetBand.bandLabel}`,
                value: `${grossDiff >= 0 ? '+' : ''}${formatGBP(grossDiff)}`,
                sublabel: `${netMonthlyDiff >= 0 ? '+' : ''}${formatGBP(netMonthlyDiff)}/mo net difference`,
              },
            ]}
          />
          <BreakdownTable
            title={`All ${jurisdiction.replace('-', ' ').toUpperCase()} Agenda for Change Bands (2026/27)`}
            rows={scales.map((b) => {
              const entry = b.points[0].annualSalary;
              const top = b.points[b.points.length - 1].annualSalary;
              const hourlyEntry = calculateBasicHourlyRate(entry, jurisdiction);
              return {
                label: `${b.bandLabel} — ${b.typicalRoles.split(',')[0]}`,
                value:
                  entry === top
                    ? `${formatGBP(entry, false)} (${formatGBP(hourlyEntry)}/hr)`
                    : `${formatGBP(entry, false)} – ${formatGBP(top, false)}`,
              };
            })}
          />
          <WarningList warnings={currentFull.warnings} />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />
        <BandAndStepSelect
          jurisdiction={jurisdiction}
          bandId={bandId}
          stepIndex={safeStepIdx}
          onBandChange={(b) => { setBandId(b); setStepIndex(0); }}
          onStepChange={setStepIndex}
        />
        <HcasSelect value={hcasZone} onChange={setHcasZone} />
        <div className="border-t border-slate-200 pt-3">
          <p className="mb-2 text-xs font-semibold text-slate-600">Compare Against Target Band</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="target-band-select" className="block text-xs font-semibold text-[#2F3432]">
                Target Band
              </label>
              <select
                id="target-band-select"
                value={targetBandId}
                onChange={(e) => { setTargetBandId(e.target.value as AfcBandId); setTargetStepIndex(0); }}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432]"
              >
                {scales.map((b) => (
                  <option key={b.bandId} value={b.bandId}>{b.bandLabel}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="target-step-select" className="block text-xs font-semibold text-[#2F3432]">
                Target Step
              </label>
              <select
                id="target-step-select"
                value={safeTargetStep}
                onChange={(e) => setTargetStepIndex(Number(e.target.value))}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432]"
              >
                {targetBand.points.map((pt, idx) => (
                  <option key={pt.stepName} value={idx}>
                    {pt.stepName} (£{pt.annualSalary.toLocaleString('en-GB')})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CalculatorCardLayout>
    );
  }

  // Specialized view: Hourly Pay Calculator
  if (slug === 'nhs-hourly-pay-calculator') {
    const basicHourly = calculateBasicHourlyRate(fullTimeBasicSalary, jurisdiction);
    const nightSatMult = bandId === 'band-2' ? 1.41 : bandId === 'band-3' ? 1.35 : 1.3;
    const sunBhMult = bandId === 'band-2' ? 1.83 : bandId === 'band-3' ? 1.69 : 1.6;
    const wtrFactor = includeBankWtr ? 1.1207 : 1;

    return (
      <CalculatorCardLayout title="NHS Hourly & Shift Rate Calculator (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: includeBankWtr ? 'Basic Hourly + 12.07% Bank WTR' : 'Basic Hourly Rate',
                value: formatGBP(roundMoney(basicHourly * wtrFactor)),
                sublabel: `Based on ${standardHours}h standard week`,
                highlight: true,
              },
              {
                label: 'Overtime Rate (1.5x)',
                value: formatGBP(roundMoney(basicHourly * 1.5)),
                sublabel: `Public Holiday 2.0x: ${formatGBP(roundMoney(basicHourly * 2))}/hr`,
              },
            ]}
          />
          <BreakdownTable
            title="Hourly Rate Schedule by Shift Type"
            rows={[
              { label: 'Standard Daytime Basic Rate', value: `${formatGBP(basicHourly)} / hr` },
              {
                label: `Weeknight (8pm–6am) & Saturday (+${Math.round((nightSatMult - 1) * 100)}%)`,
                value: `${formatGBP(roundMoney(basicHourly * nightSatMult))} / hr`,
              },
              {
                label: `Sunday & Bank Holiday (+${Math.round((sunBhMult - 1) * 100)}%)`,
                value: `${formatGBP(roundMoney(basicHourly * sunBhMult))} / hr`,
              },
              { label: 'Section 3 Overtime (1.5x)', value: `${formatGBP(roundMoney(basicHourly * 1.5))} / hr` },
              { label: 'Public Holiday Overtime (2.0x)', value: `${formatGBP(roundMoney(basicHourly * 2.0))} / hr` },
              ...(includeBankWtr
                ? [
                    {
                      label: 'Bank WTR Rolled-Up Holiday Addition (+12.07% on Basic)',
                      value: `+${formatGBP(roundMoney(basicHourly * 0.1207))} / hr`,
                      tone: 'positive' as const,
                    },
                  ]
                : []),
            ]}
          />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />
        <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={useCustomSalary}
            onChange={(e) => setUseCustomSalary(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#149777]"
          />
          <span>Enter custom annual salary instead of AfC Band</span>
        </label>
        {useCustomSalary ? (
          <NumberField
            id="custom-salary-hourly"
            label="Full-Time Annual Basic Salary"
            prefix="£"
            value={customSalaryStr}
            onChange={setCustomSalaryStr}
            error={salaryVal.error}
          />
        ) : (
          <BandAndStepSelect
            jurisdiction={jurisdiction}
            bandId={bandId}
            stepIndex={safeStepIdx}
            onBandChange={(b) => { setBandId(b); setStepIndex(0); }}
            onStepChange={setStepIndex}
          />
        )}
        <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={includeBankWtr}
            onChange={(e) => setIncludeBankWtr(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#149777]"
          />
          <span>Include 12.07% NHS Bank WTR rolled-up holiday pay</span>
        </label>
      </CalculatorCardLayout>
    );
  }

  // Specialized view: Gross Salary Converter + Uplift Comparison
  if (slug === 'nhs-salary-calculator') {
    const baseGross = roundMoney(fullTimeBasicSalary + payResult.hcasAllowance);
    const upliftedGross = roundMoney(baseGross * (1 + riseVal.value / 100));
    const basicHourly = calculateBasicHourlyRate(fullTimeBasicSalary, jurisdiction);
    const dailyRate = roundMoney(baseGross / 260.714);

    return (
      <CalculatorCardLayout title="NHS Gross Salary & Pay Rise Converter (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'Current Annual Gross Pay',
                value: formatGBP(baseGross),
                sublabel: `${formatGBP(roundMoney(baseGross / 12))}/month before deductions`,
                highlight: true,
              },
              {
                label: `With +${riseVal.value}% Comparison Uplift`,
                value: formatGBP(upliftedGross),
                sublabel: `+${formatGBP(roundMoney(upliftedGross - baseGross))}/yr gross increase`,
              },
            ]}
          />
          <BreakdownTable
            title="Gross Salary Across Every Pay Period"
            rows={[
              { label: 'Annual Gross Salary', value: formatGBP(baseGross) },
              { label: 'Monthly Gross (÷ 12)', value: formatGBP(roundMoney(baseGross / 12)) },
              { label: 'Four-Weekly Gross (÷ 13)', value: formatGBP(roundMoney(baseGross / 13)) },
              { label: 'Weekly Gross (÷ 52.1429)', value: formatGBP(roundMoney(baseGross / 52.1429)) },
              { label: 'Daily Gross (5-day week)', value: formatGBP(dailyRate) },
              { label: `Basic Hourly Rate (${standardHours}h week)`, value: `${formatGBP(basicHourly)} / hr` },
            ]}
          />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />
        <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={useCustomSalary}
            onChange={(e) => setUseCustomSalary(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#149777]"
          />
          <span>Custom salary (Doctors, Dentists, VSM)</span>
        </label>
        {useCustomSalary ? (
          <NumberField
            id="custom-salary-input"
            label="Annual Basic Salary"
            prefix="£"
            value={customSalaryStr}
            onChange={setCustomSalaryStr}
            error={salaryVal.error}
          />
        ) : (
          <BandAndStepSelect
            jurisdiction={jurisdiction}
            bandId={bandId}
            stepIndex={safeStepIdx}
            onBandChange={(b) => { setBandId(b); setStepIndex(0); }}
            onStepChange={setStepIndex}
          />
        )}
        <HcasSelect value={hcasZone} onChange={setHcasZone} />
        <NumberField
          id="pay-rise-pct"
          label="Compare Pay Rise / Promotion Uplift (%)"
          suffix="%"
          value={payRisePctStr}
          onChange={setPayRisePctStr}
          max={100}
          error={riseVal.error}
        />
      </CalculatorCardLayout>
    );
  }

  // Specialized view: Part-Time Pro-Rata Calculator
  if (slug === 'nhs-part-time-pay-calculator') {
    const fte = Math.min(1, hoursVal.value / standardHours);
    const ftReference = calculateFullNhsPay2026_2027({
      fullTimeBasicSalary,
      jurisdiction,
      contractedWeeklyHours: standardHours,
      hcasZone,
      pensionOptIn,
      studentLoanPlan,
      hasPostgraduateLoan: hasPostgrad,
    });
    const leaveRes = calculateAnnualLeaveEntitlement(serviceVal.value, hoursVal.value, jurisdiction);

    return (
      <CalculatorCardLayout title="NHS Part-Time Pro-Rata WTE Calculator (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: `Pro-Rata Monthly Net Pay (${(fte * 100).toFixed(1)}% WTE)`,
                value: formatGBP(payResult.netPayMonthly),
                sublabel: `Actual Gross: ${formatGBP(payResult.totalGrossPay)}/yr`,
                highlight: true,
              },
              {
                label: 'Part-Time Pension Tier (Actual Pay)',
                value: pensionOptIn ? formatPercent(payResult.pensionRate, 1) : 'Opted Out',
                sublabel: pensionOptIn
                  ? `Full-time tier would be ${formatPercent(ftReference.pensionRate, 1)}`
                  : 'No pension deducted',
              },
            ]}
          />
          <BreakdownTable
            title="Part-Time Salary & Leave Breakdown"
            rows={[
              { label: 'Full-Time Equivalent (1.0 WTE) Salary', value: formatGBP(fullTimeBasicSalary) },
              { label: `Actual Pro-Rata Gross Pay (${hoursVal.value}h / ${standardHours}h)`, value: formatGBP(payResult.totalGrossPay) },
              { label: 'NHS Pension Contribution', value: `-${formatGBP(payResult.pensionContribution)}`, tone: 'deduction' },
              { label: 'Income Tax', value: `-${formatGBP(payResult.incomeTax)}`, tone: 'deduction' },
              { label: 'National Insurance', value: `-${formatGBP(payResult.nationalInsurance)}`, tone: 'deduction' },
              { label: 'Pro-Rata Annual Leave + Bank Holidays', value: `${leaveRes.proRataTotalHours} hrs (${leaveRes.proRataTotalDays} days)`, tone: 'positive' },
              { label: 'Annual Net Take-Home Pay', value: formatGBP(payResult.netPayAnnual), tone: 'total' },
            ]}
          />
          <WarningList warnings={payResult.warnings} />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />
        <BandAndStepSelect
          jurisdiction={jurisdiction}
          bandId={bandId}
          stepIndex={safeStepIdx}
          onBandChange={(b) => { setBandId(b); setStepIndex(0); }}
          onStepChange={setStepIndex}
        />
        <NumberField
          id="part-time-hours"
          label={`Contracted Weekly Hours (Full-Time = ${standardHours}h)`}
          suffix="hrs/wk"
          value={weeklyHoursStr}
          onChange={setWeeklyHoursStr}
          min={1}
          max={standardHours}
          error={hoursVal.error}
        />
        <NumberField
          id="part-time-service"
          label="Continuous NHS Service (for Leave)"
          suffix="years"
          value={serviceYearsStr}
          onChange={setServiceYearsStr}
          error={serviceVal.error}
        />
        <HcasSelect value={hcasZone} onChange={setHcasZone} />
        <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={pensionOptIn}
            onChange={(e) => setPensionOptIn(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#149777]"
          />
          <span>Member of NHS Pension Scheme</span>
        </label>
        <StudentLoanSelect
          plan={studentLoanPlan}
          onPlanChange={setStudentLoanPlan}
          hasPostgrad={hasPostgrad}
          onPostgradChange={setHasPostgrad}
        />
      </CalculatorCardLayout>
    );
  }

  // Default & Specialized Pay Calculators: nhs-pay-calculator, nhs-take-home-pay-calculator, nhs-salary-after-tax-calculator
  const primaryNet =
    payFrequency === 'four-weekly'
      ? payResult.netPayFourWeekly
      : payFrequency === 'weekly'
        ? payResult.netPayWeekly
        : payFrequency === 'annual'
          ? payResult.netPayAnnual
          : payResult.netPayMonthly;

  const periodSuffix =
    payFrequency === 'four-weekly'
      ? '/ 4 wks'
      : payFrequency === 'weekly'
        ? '/ wk'
        : payFrequency === 'annual'
          ? '/ yr'
          : '/ mo';

  const netKeptPct =
    payResult.totalGrossPay > 0 ? payResult.netPayAnnual / payResult.totalGrossPay : 0;

  return (
    <CalculatorCardLayout
      title={
        slug === 'nhs-take-home-pay-calculator'
          ? 'NHS Net Payslip Estimator (2026/2027)'
          : slug === 'nhs-salary-after-tax-calculator'
            ? 'NHS Salary After Tax Waterfall (2026/2027)'
            : 'NHS Pay & Take-Home Estimator (2026/2027)'
      }
      onReset={handleReset}
      results={
        <>
          <KpiGrid
            items={[
              {
                label: `Estimated Net Take-Home (${payFrequency})`,
                value: `${formatGBP(primaryNet)} ${periodSuffix}`,
                sublabel: `Annual Net: ${formatGBP(payResult.netPayAnnual)} (${formatPercent(netKeptPct, 1)} kept)`,
                highlight: true,
              },
              {
                label:
                  slug === 'nhs-salary-after-tax-calculator'
                    ? 'Effective & Marginal Tax Rate'
                    : 'Total Gross Annual Pay',
                value:
                  slug === 'nhs-salary-after-tax-calculator'
                    ? `${formatPercent(payResult.effectiveTaxRate, 1)} eff · ${formatPercent(payResult.marginalTaxRate, 0)} marg`
                    : formatGBP(payResult.totalGrossPay),
                sublabel:
                  slug === 'nhs-salary-after-tax-calculator'
                    ? `Personal Allowance: ${formatGBP(payResult.personalAllowance)}`
                    : `Effective Net Hourly: ${formatGBP(payResult.effectiveHourlyRate)}/hr`,
              },
            ]}
          />

          <BreakdownTable
            title="Annual & Monthly Payslip Breakdown"
            rows={[
              { label: 'Pro-Rata Basic Salary', value: formatGBP(payResult.proRataSalary) },
              ...(payResult.hcasAllowance > 0
                ? [{ label: 'London Weighting (HCAS)', value: formatGBP(payResult.hcasAllowance) }]
                : []),
              ...(payResult.unsocialHoursPay > 0
                ? [{ label: 'Unsocial Hours Supplement', value: formatGBP(payResult.unsocialHoursPay) }]
                : []),
              ...(payResult.salarySacrificeAmount > 0
                ? [
                    {
                      label: 'Salary Sacrifice Deduction',
                      value: `-${formatGBP(payResult.salarySacrificeAmount)}`,
                      tone: 'deduction' as const,
                    },
                  ]
                : []),
              {
                label: `NHS Pension (${formatPercent(payResult.pensionRate, 1)})`,
                value: `-${formatGBP(payResult.pensionContribution)}`,
                tone: 'deduction',
              },
              {
                label: `Income Tax (PA: ${formatGBP(payResult.personalAllowance, false)})`,
                value: `-${formatGBP(payResult.incomeTax)}`,
                tone: 'deduction',
              },
              {
                label: 'Employee National Insurance',
                value: `-${formatGBP(payResult.nationalInsurance)}`,
                tone: 'deduction',
              },
              ...(payResult.studentLoanRepayment + payResult.postgraduateLoanRepayment > 0
                ? [
                    {
                      label: 'Student & Postgrad Loan Repayments',
                      value: `-${formatGBP(payResult.studentLoanRepayment + payResult.postgraduateLoanRepayment)}`,
                      tone: 'deduction' as const,
                    },
                  ]
                : []),
              { label: 'Estimated Annual Net Pay', value: formatGBP(payResult.netPayAnnual), tone: 'total' },
              { label: 'Estimated Monthly Net Pay', value: formatGBP(payResult.netPayMonthly), tone: 'positive' },
            ]}
          />

          {payResult.incomeTaxBreakdown.length > 0 && (
            <BreakdownTable
              title="Income Tax Band-by-Band Breakdown"
              rows={payResult.incomeTaxBreakdown.map((b) => ({
                label: `${b.bandName} (${Math.round(b.rate * 100)}% on ${formatGBP(b.taxableAmount)})`,
                value: formatGBP(b.taxAmount),
              }))}
            />
          )}

          <WarningList warnings={payResult.warnings} />
        </>
      }
    >
      <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />

      <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={useCustomSalary}
          onChange={(e) => setUseCustomSalary(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-[#149777]"
        />
        <span>Enter custom annual salary (e.g. Doctor / Dentist)</span>
      </label>

      {useCustomSalary ? (
        <NumberField
          id="custom-salary-main"
          label="Full-Time Annual Basic Salary"
          prefix="£"
          value={customSalaryStr}
          onChange={setCustomSalaryStr}
          error={salaryVal.error}
        />
      ) : (
        <BandAndStepSelect
          jurisdiction={jurisdiction}
          bandId={bandId}
          stepIndex={safeStepIdx}
          onBandChange={(b) => { setBandId(b); setStepIndex(0); }}
          onStepChange={setStepIndex}
        />
      )}

      <HcasSelect value={hcasZone} onChange={setHcasZone} />

      {slug !== 'nhs-salary-after-tax-calculator' && (
        <NumberField
          id="contracted-hours-main"
          label={`Contracted Weekly Hours (Full-Time = ${standardHours}h)`}
          suffix="hrs/wk"
          value={weeklyHoursStr}
          onChange={setWeeklyHoursStr}
          min={1}
          max={60}
          error={hoursVal.error}
        />
      )}

      {slug === 'nhs-take-home-pay-calculator' && (
        <>
          <NumberField
            id="unsocial-monthly"
            label="Estimated Monthly Unsocial Hours Pay"
            prefix="£"
            suffix="/ mo"
            value={unsocialMonthlyStr}
            onChange={setUnsocialMonthlyStr}
            error={unsocialVal.error}
          />
          <NumberField
            id="sacrifice-monthly"
            label="Monthly Salary Sacrifice (Fleet Car / Cycle)"
            prefix="£"
            suffix="/ mo"
            value={sacrificeMonthlyStr}
            onChange={setSacrificeMonthlyStr}
            error={sacrificeVal.error}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="tax-code-input" className="block text-xs font-semibold text-[#2F3432]">
                HMRC Tax Code
              </label>
              <input
                id="tax-code-input"
                type="text"
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value)}
                placeholder="1257L"
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 font-mono text-sm uppercase text-[#2F3432] focus:border-[#149777] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="pay-frequency-select" className="block text-xs font-semibold text-[#2F3432]">
                Pay Frequency
              </label>
              <select
                id="pay-frequency-select"
                value={payFrequency}
                onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432]"
              >
                <option value="monthly">Monthly (12/yr)</option>
                <option value="four-weekly">Four-Weekly (13/yr)</option>
                <option value="weekly">Weekly (52/yr)</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>
        </>
      )}

      <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={pensionOptIn}
          onChange={(e) => setPensionOptIn(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-[#149777]"
        />
        <span>Enrolled in NHS Pension Scheme (Net Pay relief)</span>
      </label>

      <StudentLoanSelect
        plan={studentLoanPlan}
        onPlanChange={setStudentLoanPlan}
        hasPostgrad={hasPostgrad}
        onPostgradChange={setHasPostgrad}
      />
    </CalculatorCardLayout>
  );
}
