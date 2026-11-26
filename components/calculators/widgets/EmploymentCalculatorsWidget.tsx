'use client';

import { useState } from 'react';
import {
  calculateAnnualLeaveEntitlement,
  calculateMaternityPay,
  calculatePaternityPay,
  calculateRedundancyPay,
  calculateSickPay,
} from '@/lib/calculations/employment';
import { getStandardWeeklyHours } from '@/lib/tax-years/2026-2027/salaryData';
import { formatGBP, roundMoney } from '@/lib/formatting/currency';
import { validatePositiveNumber } from '@/lib/validation/inputs';
import type { UkJurisdiction } from '@/types/payroll';
import {
  BreakdownTable,
  CalculatorCardLayout,
  JurisdictionSelect,
  KpiGrid,
  NumberField,
  WarningList,
} from '../CalculatorFields';

export function EmploymentCalculatorsWidget({ slug }: { slug: string }) {
  const [jurisdiction, setJurisdiction] = useState<UkJurisdiction>('england');
  const [yearsServiceStr, setYearsServiceStr] = useState<string>('6');
  const [weeklyHoursStr, setWeeklyHoursStr] = useState<string>(
    slug === 'nhs-holiday-entitlement-calculator' ? '23' : '37.5'
  );
  const [monthsWorkedStr, setMonthsWorkedStr] = useState<string>('12');
  const [shiftLengthStr, setShiftLengthStr] = useState<string>('11.5');
  const [annualSalaryStr, setAnnualSalaryStr] = useState<string>('36000');
  const [sickBand, setSickBand] = useState<'year-1' | 'year-2' | 'year-3' | 'year-4-5' | 'year-5-plus'>('year-3');
  const [absenceWeeksStr, setAbsenceWeeksStr] = useState<string>('16');
  const [sspRateStr, setSspRateStr] = useState<string>('123.25');
  const [has12mNhs, setHas12mNhs] = useState<boolean>(true);
  const [has26wTrust, setHas26wTrust] = useState<boolean>(true);
  const [paternityWeeks, setPaternityWeeks] = useState<1 | 2>(2);
  const [redundancyYearsStr, setRedundancyYearsStr] = useState<string>('12');

  const standardHours = getStandardWeeklyHours(jurisdiction);
  const yearsVal = validatePositiveNumber(yearsServiceStr, 'Years of NHS service', 0, 50);
  const hoursVal = validatePositiveNumber(weeklyHoursStr, 'Contracted weekly hours', 1, standardHours);
  const monthsVal = validatePositiveNumber(monthsWorkedStr, 'Months in leave year', 1, 12);
  const shiftLenVal = validatePositiveNumber(shiftLengthStr, 'Shift length', 1, 24);
  const salaryVal = validatePositiveNumber(annualSalaryStr, 'Annual gross salary', 0, 500000);
  const absenceVal = validatePositiveNumber(absenceWeeksStr, 'Absence weeks', 1, 52);
  const sspVal = validatePositiveNumber(sspRateStr, 'Weekly SSP rate', 0, 500);
  const redYearsVal = validatePositiveNumber(redundancyYearsStr, 'Complete years of service', 0, 50);

  const handleJurisdictionChange = (next: UkJurisdiction) => {
    setJurisdiction(next);
    if (slug !== 'nhs-holiday-entitlement-calculator') {
      setWeeklyHoursStr(String(getStandardWeeklyHours(next)));
    }
  };

  const handleReset = () => {
    setJurisdiction('england');
    setYearsServiceStr('6');
    setWeeklyHoursStr(slug === 'nhs-holiday-entitlement-calculator' ? '23' : '37.5');
    setMonthsWorkedStr('12');
    setShiftLengthStr('11.5');
    setAnnualSalaryStr('36000');
    setSickBand('year-3');
    setAbsenceWeeksStr('16');
    setSspRateStr('123.25');
    setHas12mNhs(true);
    setHas26wTrust(true);
    setPaternityWeeks(2);
    setRedundancyYearsStr('12');
  };

  // 1 & 2: Annual Leave & Holiday Entitlement
  if (slug === 'nhs-annual-leave-calculator' || slug === 'nhs-holiday-entitlement-calculator') {
    const leave = calculateAnnualLeaveEntitlement(
      yearsVal.value,
      hoursVal.value,
      jurisdiction,
      monthsVal.value
    );
    const shiftsCovered =
      shiftLenVal.value > 0 ? roundMoney(leave.proRataTotalHours / shiftLenVal.value) : 0;

    return (
      <CalculatorCardLayout
        title={
          slug === 'nhs-holiday-entitlement-calculator'
            ? 'NHS Part-Time & Bank Holiday Hours Calculator'
            : 'NHS Annual Leave Entitlement Calculator'
        }
        onReset={handleReset}
        results={
          <>
            <KpiGrid
              items={[
                {
                  label: 'Total Annual Leave + Bank Holiday Hours',
                  value: `${leave.proRataTotalHours} hrs`,
                  sublabel: `${leave.proRataTotalDays} standard days (${(leave.fteRatio * 100).toFixed(1)}% WTE)`,
                  highlight: true,
                },
                {
                  label:
                    slug === 'nhs-holiday-entitlement-calculator'
                      ? `Shifts Covered (${shiftLenVal.value}h Shifts)`
                      : 'Mid-Year Pro-Rata Accrual',
                  value:
                    slug === 'nhs-holiday-entitlement-calculator'
                      ? `${shiftsCovered} shifts`
                      : `${leave.accruedHoursForMonthsWorked} hrs`,
                  sublabel:
                    slug === 'nhs-holiday-entitlement-calculator'
                      ? `Bank Holiday pot alone: ${leave.proRataBankHolidayHours} hrs`
                      : `For ${monthsVal.value} months in current leave year`,
                },
              ]}
            />
            <BreakdownTable
              title={`Section 13 Entitlement — ${leave.tierLabel}`}
              rows={[
                { label: 'Full-Time Base Leave + Bank Holidays', value: `${leave.fullTimeBaseDays} + ${leave.fullTimeBankHolidays} days` },
                { label: 'Pro-Rata Core Annual Leave Hours', value: `${leave.proRataAnnualLeaveHours} hrs (${leave.proRataAnnualLeaveDays} days)` },
                { label: 'Pro-Rata Bank Holiday Hours', value: `${leave.proRataBankHolidayHours} hrs (${leave.proRataBankHolidayDays} days)` },
                { label: 'Total Pro-Rata Leave Pot', value: `${leave.proRataTotalHours} hrs`, tone: 'total' },
              ]}
            />
          </>
        }
      >
        <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />
        <NumberField
          id="leave-service-years"
          label="Continuous NHS Reckonable Service"
          suffix="years"
          value={yearsServiceStr}
          onChange={setYearsServiceStr}
          error={yearsVal.error}
        />
        <NumberField
          id="leave-weekly-hours"
          label={`Contracted Weekly Hours (Full-Time = ${standardHours}h)`}
          suffix="hrs/wk"
          value={weeklyHoursStr}
          onChange={setWeeklyHoursStr}
          min={1}
          max={standardHours}
          error={hoursVal.error}
        />
        {slug === 'nhs-annual-leave-calculator' ? (
          <NumberField
            id="leave-months"
            label="Months Worked in Leave Year (1–12)"
            suffix="months"
            value={monthsWorkedStr}
            onChange={setMonthsWorkedStr}
            min={1}
            max={12}
            error={monthsVal.error}
          />
        ) : (
          <NumberField
            id="leave-shift-len"
            label="Typical Shift Length (to count shifts off)"
            suffix="hrs/shift"
            value={shiftLengthStr}
            onChange={setShiftLengthStr}
            min={1}
            max={24}
            error={shiftLenVal.error}
          />
        )}
      </CalculatorCardLayout>
    );
  }

  // 3: Sick Pay Calculator
  if (slug === 'nhs-sick-pay-calculator') {
    const sick = calculateSickPay(salaryVal.value, sickBand, absenceVal.value, sspVal.value);
    return (
      <CalculatorCardLayout title="NHS Section 14 Occupational Sick Pay (OSP) Calculator" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'Maximum OSP Allowance',
                value: `${sick.fullPayMonths}m Full + ${sick.halfPayMonths}m Half`,
                sublabel: sick.tierLabel,
                highlight: true,
              },
              {
                label: `Estimated Gross Pay (${absenceVal.value} Weeks)`,
                value: formatGBP(sick.totalEstimatedAbsencePay),
                sublabel: `Normal weekly gross: ${formatGBP(sick.weeklyGrossPay)}/wk`,
              },
            ]}
          />
          <BreakdownTable
            title="Sick Pay Rate Breakdown"
            rows={[
              { label: 'Full Pay Monthly / Weekly Rate', value: `${formatGBP(sick.monthlyGrossPay)} / mo (${formatGBP(sick.weeklyGrossPay)} / wk)` },
              { label: 'Half Pay Alone (Monthly / Weekly)', value: `${formatGBP(sick.halfPayMonthly)} / mo (${formatGBP(sick.halfPayWeekly)} / wk)` },
              { label: 'Half Pay + SSP Combined Weekly (Capped at Full Pay)', value: `${formatGBP(sick.halfPayPlusSspWeeklyCapped)} / wk`, tone: 'positive' },
              { label: 'Estimated Total for Planned Absence', value: formatGBP(sick.totalEstimatedAbsencePay), tone: 'total' },
            ]}
          />
        </>
      }>
        <NumberField id="sick-salary" label="Annual Gross NHS Salary" prefix="£" value={annualSalaryStr} onChange={setAnnualSalaryStr} error={salaryVal.error} />
        <div>
          <label htmlFor="sick-service-band" className="block text-xs font-semibold text-[#2F3432]">
            Completed Continuous NHS Service
          </label>
          <select
            id="sick-service-band"
            value={sickBand}
            onChange={(e) => setSickBand(e.target.value as typeof sickBand)}
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432]"
          >
            <option value="year-1">During 1st year (1m Full + 2m Half)</option>
            <option value="year-2">During 2nd year (2m Full + 2m Half)</option>
            <option value="year-3">During 3rd year (4m Full + 4m Half)</option>
            <option value="year-4-5">During 4th &amp; 5th years (5m Full + 5m Half)</option>
            <option value="year-5-plus">After 5 years (6m Full + 6m Half)</option>
          </select>
        </div>
        <NumberField id="sick-weeks" label="Planned / Estimated Absence Duration" suffix="weeks" value={absenceWeeksStr} onChange={setAbsenceWeeksStr} error={absenceVal.error} />
        <NumberField
          id="sick-ssp"
          label="Weekly Statutory Sick Pay (SSP) Rate"
          prefix="£"
          suffix="/ wk"
          value={sspRateStr}
          onChange={setSspRateStr}
          helperText="Editable weekly SSP reference rate."
          error={sspVal.error}
        />
      </CalculatorCardLayout>
    );
  }

  // 4: Maternity Pay Calculator
  if (slug === 'nhs-maternity-pay-calculator') {
    const mat = calculateMaternityPay(salaryVal.value, has12mNhs, has26wTrust);
    return (
      <CalculatorCardLayout title="NHS Maternity Pay (OMP + SMP) Schedule (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: 'Total 39-Week Paid Maternity Gross',
                value: formatGBP(mat.total39WeekGrossPay),
                sublabel: `Average weekly earnings: ${formatGBP(mat.averageWeeklyEarnings)}/wk`,
                highlight: true,
              },
              {
                label: 'Average Monthly Gross (Over 9 Months)',
                value: `${formatGBP(mat.monthlyAverageOver39Weeks)} / mo`,
                sublabel: `Over 52 weeks: ${formatGBP(mat.monthlyAverageOver52Weeks)}/mo`,
              },
            ]}
          />
          <BreakdownTable
            title="52-Week NHS Maternity Pay Timeline (2026/2027 SMP = £194.32/wk)"
            rows={[
              {
                label: mat.eligibleForOmp ? 'Weeks 1–8: Full Pay (incl. SMP)' : 'Weeks 1–6: 90% AWE (SMP Only)',
                value: `${formatGBP(mat.weeks1To8Weekly)} / wk`,
              },
              {
                label: mat.eligibleForOmp ? 'Weeks 9–26: Half Pay + £194.32 SMP' : 'Weeks 7–39: Standard SMP (£194.32)',
                value: `${formatGBP(mat.weeks9To26Weekly)} / wk`,
              },
              { label: 'Weeks 27–39: Statutory Maternity Pay (SMP)', value: `${formatGBP(mat.weeks27To39Weekly)} / wk` },
              { label: 'Weeks 40–52: Unpaid Maternity Leave', value: '£0.00 / wk' },
              { label: 'Total 39-Week Gross Maternity Pay', value: formatGBP(mat.total39WeekGrossPay), tone: 'total' },
            ]}
          />
          {!mat.eligibleForOmp && (
            <WarningList warnings={['Without 12 months continuous NHS service, NHS Occupational Maternity Pay (OMP) does not apply; statutory SMP or Maternity Allowance applies instead.']} />
          )}
        </>
      }>
        <NumberField id="mat-salary" label="Average Annual Gross NHS Earnings" prefix="£" value={annualSalaryStr} onChange={setAnnualSalaryStr} error={salaryVal.error} />
        <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={has12mNhs}
            onChange={(e) => setHas12mNhs(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#149777]"
          />
          <span>12+ months continuous NHS service (OMP eligible)</span>
        </label>
        <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={has26wTrust}
            onChange={(e) => setHas26wTrust(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#149777]"
          />
          <span>26+ weeks with current Trust (SMP eligible)</span>
        </label>
      </CalculatorCardLayout>
    );
  }

  // 5: Paternity Pay Calculator
  if (slug === 'nhs-paternity-pay-calculator') {
    const pat = calculatePaternityPay(salaryVal.value, paternityWeeks, has12mNhs, has26wTrust);
    const sppOnly = calculatePaternityPay(salaryVal.value, paternityWeeks, false, true);

    return (
      <CalculatorCardLayout title="NHS Paternity Pay Calculator (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: `Total ${paternityWeeks}-Week Paternity Gross Pay`,
                value: formatGBP(pat.totalGrossPaternityPay),
                sublabel: pat.eligibleForOccupationalFullPay
                  ? 'Occupational Full Pay (Section 15)'
                  : pat.eligibleForSpp
                    ? 'Statutory Paternity Pay (SPP)'
                    : 'Not eligible for SPP/Occupational pay',
                highlight: true,
              },
              {
                label: 'Weekly Paternity Pay Rate',
                value: `${formatGBP(pat.weeklyPay)} / wk`,
                sublabel: `2026/27 Statutory SPP rate: ${formatGBP(sppOnly.weeklyPay)}/wk`,
              },
            ]}
          />
          <BreakdownTable
            title="Occupational vs Statutory Paternity Comparison"
            rows={[
              { label: 'NHS Occupational Paternity Pay (≥12m service)', value: formatGBP(roundMoney((salaryVal.value / 52.1429) * paternityWeeks)) },
              { label: 'Statutory Paternity Pay Only (2026/27 £194.32/wk)', value: formatGBP(sppOnly.totalGrossPaternityPay) },
              { label: 'Your Eligible Total', value: formatGBP(pat.totalGrossPaternityPay), tone: 'total' },
            ]}
          />
        </>
      }>
        <NumberField id="pat-salary" label="Annual Gross NHS Salary" prefix="£" value={annualSalaryStr} onChange={setAnnualSalaryStr} error={salaryVal.error} />
        <div>
          <span className="block text-xs font-semibold text-[#2F3432]">Paternity Leave Duration</span>
          <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
            {([1, 2] as const).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setPaternityWeeks(w)}
                className={`min-h-[38px] rounded-md px-3 text-xs font-medium transition-colors ${
                  paternityWeeks === w ? 'bg-white text-[#149777] shadow-xs' : 'text-slate-600'
                }`}
              >
                {w} {w === 1 ? 'Week' : 'Weeks'}
              </button>
            ))}
          </div>
        </div>
        <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={has12mNhs} onChange={(e) => setHas12mNhs(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#149777]" />
          <span>12+ months continuous NHS service (Full Pay)</span>
        </label>
        <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={has26wTrust} onChange={(e) => setHas26wTrust(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#149777]" />
          <span>26+ weeks with current Trust (SPP)</span>
        </label>
      </CalculatorCardLayout>
    );
  }

  // 6: Redundancy Pay Calculator
  const red = calculateRedundancyPay(salaryVal.value, redYearsVal.value);
  const warnings: string[] = [];
  if (!red.eligible) warnings.push('Minimum 2 complete years of continuous reckonable NHS service is required under Section 16.');
  if (red.appliedFloor) warnings.push('AfC Section 16 notional minimum earnings floor of £23,000 applied.');
  if (red.appliedCeiling) warnings.push('AfC Section 16 maximum earnings ceiling of £80,000 applied.');

  return (
    <CalculatorCardLayout title="NHS Section 16 Contractual Redundancy Calculator" onReset={handleReset} results={
      <>
        <KpiGrid
          items={[
            {
              label: 'Estimated Contractual Redundancy Pay',
              value: formatGBP(red.totalRedundancyPay),
              sublabel: `${red.cappedMonthsPay} months pay (${red.completeYearsCounted} complete yrs)`,
              highlight: true,
            },
            {
              label: 'HMRC Tax-Free Portion',
              value: formatGBP(red.taxFreePortion),
              sublabel: red.taxablePortion > 0 ? `Taxable excess: ${formatGBP(red.taxablePortion)}` : '100% within £30,000 tax-free limit',
            },
          ]}
        />
        <BreakdownTable
          title="Section 16 Redundancy Breakdown"
          rows={[
            { label: 'Reference Salary (after £23k floor / £80k cap)', value: formatGBP(red.effectiveReferenceSalary) },
            { label: 'Months of Pay Counted (Max 24)', value: `${red.cappedMonthsPay} months` },
            { label: 'Tax-Free Compensation (First £30,000)', value: formatGBP(red.taxFreePortion), tone: 'positive' },
            { label: 'Taxable Portion Above £30,000', value: formatGBP(red.taxablePortion) },
            { label: 'Total Gross Redundancy Payout', value: formatGBP(red.totalRedundancyPay), tone: 'total' },
          ]}
        />
        <WarningList warnings={warnings} />
      </>
    }>
      <NumberField id="red-salary" label="Actual Annual Basic Salary" prefix="£" value={annualSalaryStr} onChange={setAnnualSalaryStr} error={salaryVal.error} />
      <NumberField
        id="red-years"
        label="Complete Years of Reckonable NHS Service"
        suffix="years"
        value={redundancyYearsStr}
        onChange={setRedundancyYearsStr}
        helperText="Minimum 2 years; capped at 24 years (24 months pay)."
        error={redYearsVal.error}
      />
    </CalculatorCardLayout>
  );
}
