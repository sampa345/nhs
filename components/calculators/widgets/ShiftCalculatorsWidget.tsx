'use client';

import { useState } from 'react';
import {
  getAfcScalesForJurisdiction,
  getStandardWeeklyHours,
  UNSOCIAL_HOURS_RATES_AFC,
} from '@/lib/tax-years/2026-2027/salaryData';
import {
  calculateBasicHourlyRate,
  calculateOvertimePay,
  calculateUnsocialHoursPay,
} from '@/lib/calculations/shiftsAndOvertime';
import { formatGBP, roundMoney } from '@/lib/formatting/currency';
import { validatePositiveNumber } from '@/lib/validation/inputs';
import type { AfcBandId, UkJurisdiction } from '@/types/payroll';
import {
  BandAndStepSelect,
  BreakdownTable,
  CalculatorCardLayout,
  JurisdictionSelect,
  KpiGrid,
  NumberField,
  WarningList,
} from '../CalculatorFields';

export function ShiftCalculatorsWidget({ slug }: { slug: string }) {
  const [jurisdiction, setJurisdiction] = useState<UkJurisdiction>('england');
  const [bandId, setBandId] = useState<AfcBandId>('band-5');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [contractedHoursStr, setContractedHoursStr] = useState<string>('37.5');
  const [stdOvertimeStr, setStdOvertimeStr] = useState<string>('8');
  const [bhOvertimeStr, setBhOvertimeStr] = useState<string>('0');
  const [includeBankWtr, setIncludeBankWtr] = useState<boolean>(false);

  const [nightShiftsCountStr, setNightShiftsCountStr] = useState<string>('6');
  const [nightHoursPerShiftStr, setNightHoursPerShiftStr] = useState<string>('10');
  const [satHoursStr, setSatHoursStr] = useState<string>('11.5');
  const [sunHoursStr, setSunHoursStr] = useState<string>('11.5');
  const [dayHoursStr, setDayHoursStr] = useState<string>('90');
  const [bhHoursStr, setBhHoursStr] = useState<string>('11.5');
  const [bhMode, setBhMode] = useState<'rostered' | 'overtime'>('rostered');

  const scales = getAfcScalesForJurisdiction(jurisdiction);
  const activeBand = scales.find((b) => b.bandId === bandId) ?? scales[3];
  const safeStep = Math.min(stepIndex, activeBand.points.length - 1);
  const annualBasicSalary = activeBand.points[safeStep].annualSalary;
  const standardHours = getStandardWeeklyHours(jurisdiction);

  const contractedVal = validatePositiveNumber(contractedHoursStr, 'Contracted weekly hours', 1, 60);
  const stdOtVal = validatePositiveNumber(stdOvertimeStr, 'Standard overtime hours', 0, 200);
  const bhOtVal = validatePositiveNumber(bhOvertimeStr, 'Public holiday overtime hours', 0, 100);
  const nightCountVal = validatePositiveNumber(nightShiftsCountStr, 'Night shifts per month', 0, 31);
  const nightPerShiftVal = validatePositiveNumber(nightHoursPerShiftStr, 'Unsocial hours per night shift', 0, 14);
  const satVal = validatePositiveNumber(satHoursStr, 'Saturday hours', 0, 200);
  const sunVal = validatePositiveNumber(sunHoursStr, 'Sunday hours', 0, 200);
  const dayVal = validatePositiveNumber(dayHoursStr, 'Daytime hours', 0, 300);
  const bhVal = validatePositiveNumber(bhHoursStr, 'Bank Holiday hours', 0, 100);

  const handleJurisdictionChange = (next: UkJurisdiction) => {
    setJurisdiction(next);
    setContractedHoursStr(String(getStandardWeeklyHours(next)));
  };

  const handleReset = () => {
    setJurisdiction('england');
    setBandId('band-5');
    setStepIndex(0);
    setContractedHoursStr('37.5');
    setStdOvertimeStr('8');
    setBhOvertimeStr('0');
    setIncludeBankWtr(false);
    setNightShiftsCountStr('6');
    setNightHoursPerShiftStr('10');
    setSatHoursStr('11.5');
    setSunHoursStr('11.5');
    setDayHoursStr('90');
    setBhHoursStr('11.5');
    setBhMode('rostered');
  };

  // 1. Overtime Calculator
  if (slug === 'nhs-overtime-calculator') {
    const ot = calculateOvertimePay({
      annualBasicSalary,
      bandId,
      jurisdiction,
      contractedWeeklyHours: contractedVal.value,
      standardOvertimeHours: stdOtVal.value,
      publicHolidayOvertimeHours: bhOtVal.value,
      includeBankWtrRollup: includeBankWtr,
    });

    return (
      <CalculatorCardLayout title="NHS Section 3 Overtime Calculator (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: ot.eligibleForPaidOvertime ? 'Total Gross Overtime Pay' : 'Eligibility Status',
                value: ot.eligibleForPaidOvertime ? formatGBP(ot.totalOvertimePay) : 'TOIL Only',
                sublabel: ot.eligibleForPaidOvertime
                  ? `Basic hourly rate: ${formatGBP(ot.basicHourlyRate)}/hr`
                  : 'Band 8b–9 normally receive Time Off in Lieu',
                highlight: true,
              },
              {
                label: 'Overtime 1.5x Hourly Rate',
                value: ot.eligibleForPaidOvertime ? `${formatGBP(roundMoney(ot.basicHourlyRate * 1.5))}/hr` : 'N/A',
                sublabel: `Public Holiday 2.0x: ${formatGBP(roundMoney(ot.basicHourlyRate * 2.0))}/hr`,
              },
            ]}
          />
          <BreakdownTable
            title="Overtime Calculation Breakdown"
            rows={[
              { label: 'Basic Hourly Rate (excl. HCAS)', value: `${formatGBP(ot.basicHourlyRate)} / hr` },
              ...(ot.partTimePlainTimeHours > 0
                ? [
                    {
                      label: `Part-Time Plain Time (${ot.partTimePlainTimeHours}h at 1.0x — pensionable)`,
                      value: formatGBP(ot.plainTimePay),
                    },
                  ]
                : []),
              {
                label: `Standard Overtime (${ot.standardOvertimePaidHours}h at 1.5x)`,
                value: formatGBP(ot.standardOvertimePay),
              },
              {
                label: `Public Holiday Overtime (${ot.publicHolidayOvertimePaidHours}h at 2.0x)`,
                value: formatGBP(ot.publicHolidayOvertimePay),
              },
              ...(ot.wtrHolidayPay > 0
                ? [{ label: 'Bank WTR Holiday Addition (+12.07%)', value: formatGBP(ot.wtrHolidayPay) }]
                : []),
              { label: 'Total Gross Extra Pay', value: formatGBP(ot.totalOvertimePay), tone: 'total' },
            ]}
          />
          <WarningList warnings={[ot.eligibilityNote]} />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />
        <BandAndStepSelect
          jurisdiction={jurisdiction}
          bandId={bandId}
          stepIndex={safeStep}
          onBandChange={(b) => { setBandId(b); setStepIndex(0); }}
          onStepChange={setStepIndex}
        />
        <NumberField
          id="ot-contracted"
          label={`Contracted Weekly Hours (Full-Time = ${standardHours}h)`}
          suffix="hrs/wk"
          value={contractedHoursStr}
          onChange={setContractedHoursStr}
          min={1}
          max={standardHours}
          error={contractedVal.error}
        />
        <NumberField
          id="ot-std-hours"
          label="Extra Standard Hours Worked (Mon–Sun)"
          suffix="hours"
          value={stdOvertimeStr}
          onChange={setStdOvertimeStr}
          error={stdOtVal.error}
        />
        <NumberField
          id="ot-bh-hours"
          label="Extra Public / Bank Holiday Overtime Hours (2.0x)"
          suffix="hours"
          value={bhOvertimeStr}
          onChange={setBhOvertimeStr}
          error={bhOtVal.error}
        />
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={includeBankWtr}
            onChange={(e) => setIncludeBankWtr(e.target.checked)}
            className="h-4 w-4 shrink-0 rounded border-slate-300 text-[#149777]"
          />
          <span>Add 12.07% WTR Bank Holiday Pay (Bank shifts only)</span>
        </label>
      </CalculatorCardLayout>
    );
  }

  // 2. Bank Holiday Pay Calculator
  if (slug === 'nhs-bank-holiday-pay-calculator') {
    const basicHourly = calculateBasicHourlyRate(annualBasicSalary, jurisdiction);
    const rateSet = UNSOCIAL_HOURS_RATES_AFC[bandId];
    const rosteredEnhancement = roundMoney(bhVal.value * basicHourly * rateSet.sundayAndBankHolidayEnhancement);
    const basicPay = roundMoney(bhVal.value * basicHourly);
    const rosteredTotal = roundMoney(basicPay + rosteredEnhancement);
    const overtimeTotal = roundMoney(bhVal.value * basicHourly * 2);

    return (
      <CalculatorCardLayout title="NHS Bank Holiday Pay Calculator (2026/2027)" onReset={handleReset} results={
        <>
          <KpiGrid
            items={[
              {
                label: bhMode === 'rostered' ? 'Rostered Bank Holiday Shift Pay' : '2.0x Bank Holiday Overtime Pay',
                value: formatGBP(bhMode === 'rostered' ? rosteredTotal : overtimeTotal),
                sublabel:
                  bhMode === 'rostered'
                    ? `Includes +${formatGBP(rosteredEnhancement)} enhancement + ${bhVal.value}h in lieu`
                    : `Paid at double time (${formatGBP(roundMoney(basicHourly * 2))}/hr)`,
                highlight: true,
              },
              {
                label: 'Enhancement / Overtime Rate',
                value:
                  bhMode === 'rostered'
                    ? `+${Math.round(rateSet.sundayAndBankHolidayEnhancement * 100)}%`
                    : '2.0x (Double Time)',
                sublabel: `Basic hourly rate: ${formatGBP(basicHourly)}/hr`,
              },
            ]}
          />
          <BreakdownTable
            title="Rostered Section 2 vs Section 3 Overtime Comparison"
            rows={[
              { label: `Basic Pay (${bhVal.value}h)`, value: formatGBP(basicPay) },
              {
                label: `Rostered Enhancement (+${Math.round(rateSet.sundayAndBankHolidayEnhancement * 100)}%)`,
                value: `+${formatGBP(rosteredEnhancement)}`,
              },
              { label: 'Total Rostered Gross Pay (+ Hours Kept in Lieu)', value: formatGBP(rosteredTotal), tone: 'positive' },
              { label: 'Alternative: Authorised Overtime (2.0x, No Lieu)', value: formatGBP(overtimeTotal) },
            ]}
          />
        </>
      }>
        <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />
        <BandAndStepSelect
          jurisdiction={jurisdiction}
          bandId={bandId}
          stepIndex={safeStep}
          onBandChange={(b) => { setBandId(b); setStepIndex(0); }}
          onStepChange={setStepIndex}
        />
        <NumberField
          id="bh-hours"
          label="Bank Holiday Hours Worked"
          suffix="hours"
          value={bhHoursStr}
          onChange={setBhHoursStr}
          error={bhVal.error}
        />
        <div>
          <span id="bh-classification-label" className="block text-xs font-semibold text-[#2F3432]">Shift Classification</span>
          <div role="group" aria-labelledby="bh-classification-label" className="mt-1.5 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              aria-pressed={bhMode === 'rostered'}
              onClick={() => setBhMode('rostered')}
              className={`min-h-[44px] rounded-md px-2 py-1.5 text-xs font-medium leading-tight transition-colors sm:px-3 ${
                bhMode === 'rostered' ? 'bg-white text-[#149777] shadow-xs' : 'text-slate-600'
              }`}
            >
              Rostered (Section 2)
            </button>
            <button
              type="button"
              aria-pressed={bhMode === 'overtime'}
              onClick={() => setBhMode('overtime')}
              className={`min-h-[44px] rounded-md px-2 py-1.5 text-xs font-medium leading-tight transition-colors sm:px-3 ${
                bhMode === 'overtime' ? 'bg-white text-[#149777] shadow-xs' : 'text-slate-600'
              }`}
            >
              Overtime (2.0x)
            </button>
          </div>
        </div>
      </CalculatorCardLayout>
    );
  }

  // 5. Combined Unsocial Hours Calculator
  const totalNightHours = roundMoney(nightCountVal.value * nightPerShiftVal.value);
  const fullUnsocial = calculateUnsocialHoursPay({
    annualBasicSalary,
    bandId,
    jurisdiction,
    standardDayHoursPerMonth: dayVal.value,
    weekdayNightHoursPerMonth: totalNightHours,
    saturdayHoursPerMonth: satVal.value,
    sundayHoursPerMonth: sunVal.value,
    bankHolidayHoursPerMonth: bhVal.value,
  });

  return (
    <CalculatorCardLayout title="NHS Full Roster Unsocial Hours Calculator (2026/2027)" onReset={handleReset} results={
      <>
        <KpiGrid
          items={[
            {
              label: 'Monthly Unsocial Hours Enhancement',
              value: `+${formatGBP(fullUnsocial.totalMonthlyEnhancement)} / mo`,
              sublabel: `Annualised enhancement: +${formatGBP(fullUnsocial.annualisedEnhancement)}/yr`,
              highlight: true,
            },
            {
              label: 'Blended Hourly Rate',
              value: `${formatGBP(fullUnsocial.effectiveBlendedHourlyRate)} / hr`,
              sublabel: `Basic hourly rate: ${formatGBP(fullUnsocial.basicHourlyRate)}/hr`,
            },
          ]}
        />
        <BreakdownTable
          title="Monthly Roster Pay Breakdown"
          rows={[
            { label: 'Basic Pay for All Hours Entered', value: formatGBP(fullUnsocial.basicPayForHours) },
            { label: `Weekday Night Enhancement (+${Math.round(fullUnsocial.nightSaturdayRateDecimal * 100)}%)`, value: `+${formatGBP(fullUnsocial.nightEnhancementPay)}` },
            { label: `Saturday Enhancement (+${Math.round(fullUnsocial.nightSaturdayRateDecimal * 100)}%)`, value: `+${formatGBP(fullUnsocial.saturdayEnhancementPay)}` },
            { label: `Sunday Enhancement (+${Math.round(fullUnsocial.sundayBankHolidayRateDecimal * 100)}%)`, value: `+${formatGBP(fullUnsocial.sundayEnhancementPay)}` },
            { label: `Bank Holiday Enhancement (+${Math.round(fullUnsocial.sundayBankHolidayRateDecimal * 100)}%)`, value: `+${formatGBP(fullUnsocial.bankHolidayEnhancementPay)}` },
            { label: 'Total Monthly Gross Shift Pay', value: formatGBP(fullUnsocial.totalMonthlyGrossShiftPay), tone: 'total' },
          ]}
        />
      </>
    }>
      <JurisdictionSelect value={jurisdiction} onChange={handleJurisdictionChange} />
      <BandAndStepSelect
        jurisdiction={jurisdiction}
        bandId={bandId}
        stepIndex={safeStep}
        onBandChange={(b) => { setBandId(b); setStepIndex(0); }}
        onStepChange={setStepIndex}
      />
      <NumberField id="uh-day" label="Standard Daytime Hours / Month" suffix="hrs" value={dayHoursStr} onChange={setDayHoursStr} error={dayVal.error} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NumberField id="uh-nights" label="Night Shifts / Month" suffix="shifts" value={nightShiftsCountStr} onChange={setNightShiftsCountStr} error={nightCountVal.error} />
        <NumberField id="uh-night-len" label="Unsocial Hrs / Night" suffix="hrs" value={nightHoursPerShiftStr} onChange={setNightHoursPerShiftStr} error={nightPerShiftVal.error} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NumberField id="uh-sat" label="Saturday Hours / Mo" suffix="hrs" value={satHoursStr} onChange={setSatHoursStr} error={satVal.error} />
        <NumberField id="uh-sun" label="Sunday Hours / Mo" suffix="hrs" value={sunHoursStr} onChange={setSunHoursStr} error={sunVal.error} />
      </div>
      <NumberField id="uh-bh" label="Bank Holiday Hours / Month" suffix="hrs" value={bhHoursStr} onChange={setBhHoursStr} error={bhVal.error} />
    </CalculatorCardLayout>
  );
}
