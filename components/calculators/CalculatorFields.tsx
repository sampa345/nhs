import { AlertCircle, RotateCcw } from 'lucide-react';
import {
  getAfcScalesForJurisdiction,
  HCAS_RULES_2026_2027,
} from '@/lib/tax-years/2026-2027/salaryData';
import { STUDENT_LOAN_PLANS_2026_2027 } from '@/lib/tax-years/2026-2027/studentLoan';
import { ACTIVE_TAX_YEAR } from '@/lib/tax-years/2026-2027';
import type { AfcBandId, HcasZone, StudentLoanPlan, UkJurisdiction } from '@/types/payroll';

export function CalculatorCardLayout({
  title,
  onReset,
  children,
  results,
}: {
  title: string;
  onReset: () => void;
  children: React.ReactNode;
  results: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-display text-base font-bold text-[#2F3432] sm:text-lg">
            {title}
          </h2>
          <p className="text-xs text-slate-500">
            Active configuration: {ACTIVE_TAX_YEAR.label} ({ACTIVE_TAX_YEAR.period})
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#149777] whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-slate-200 p-5 sm:p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="space-y-4">{children}</div>
        </div>
        <div className="bg-[#F3F4F6]/60 p-5 sm:p-6 lg:col-span-7">
          <div className="space-y-5">{results}</div>
        </div>
      </div>
    </div>
  );
}

export function JurisdictionSelect({
  value,
  onChange,
  id = 'jurisdiction-select',
}: {
  value: UkJurisdiction;
  onChange: (val: UkJurisdiction) => void;
  id?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#2F3432]">
        UK Nation / NHS Jurisdiction
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as UkJurisdiction)}
        className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432] focus:border-[#149777] focus:outline-none"
      >
        <option value="england">England (NHS Employers · 37.5h)</option>
        <option value="wales">Wales (NHS Wales · 37.5h)</option>
        <option value="scotland">Scotland (NHS Scotland · 36h)</option>
        <option value="northern-ireland">Northern Ireland (HSCNI · 37.5h parity)</option>
      </select>
    </div>
  );
}

export function BandAndStepSelect({
  jurisdiction,
  bandId,
  stepIndex,
  onBandChange,
  onStepChange,
}: {
  jurisdiction: UkJurisdiction;
  bandId: AfcBandId;
  stepIndex: number;
  onBandChange: (band: AfcBandId) => void;
  onStepChange: (idx: number) => void;
}) {
  const scales = getAfcScalesForJurisdiction(jurisdiction);
  const activeBand = scales.find((b) => b.bandId === bandId) ?? scales[3];
  const safeStep = Math.min(stepIndex, activeBand.points.length - 1);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor="afc-band-select" className="block text-xs font-semibold text-[#2F3432]">
          Agenda for Change Band
        </label>
        <select
          id="afc-band-select"
          value={bandId}
          onChange={(e) => onBandChange(e.target.value as AfcBandId)}
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432] focus:border-[#149777] focus:outline-none"
        >
          {scales.map((b) => (
            <option key={b.bandId} value={b.bandId}>
              {b.bandLabel}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="afc-step-select" className="block text-xs font-semibold text-[#2F3432]">
          Pay Step / Point
        </label>
        <select
          id="afc-step-select"
          value={safeStep}
          onChange={(e) => onStepChange(Number(e.target.value))}
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432] focus:border-[#149777] focus:outline-none"
        >
          {activeBand.points.map((pt, idx) => (
            <option key={pt.stepName} value={idx}>
              {pt.stepName} (£{pt.annualSalary.toLocaleString('en-GB')})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function HcasSelect({
  value,
  onChange,
}: {
  value: HcasZone;
  onChange: (val: HcasZone) => void;
}) {
  return (
    <div>
      <label htmlFor="hcas-zone-select" className="block text-xs font-semibold text-[#2F3432]">
        London Weighting / HCAS
      </label>
      <select
        id="hcas-zone-select"
        value={value}
        onChange={(e) => onChange(e.target.value as HcasZone)}
        className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432] focus:border-[#149777] focus:outline-none"
      >
        {(Object.keys(HCAS_RULES_2026_2027) as HcasZone[]).map((zone) => (
          <option key={zone} value={zone}>
            {HCAS_RULES_2026_2027[zone].label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function StudentLoanSelect({
  plan,
  onPlanChange,
  hasPostgrad,
  onPostgradChange,
}: {
  plan: StudentLoanPlan;
  onPlanChange: (p: StudentLoanPlan) => void;
  hasPostgrad: boolean;
  onPostgradChange: (v: boolean) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="student-loan-select" className="block text-xs font-semibold text-[#2F3432]">
          Student Loan Plan
        </label>
        <select
          id="student-loan-select"
          value={plan}
          onChange={(e) => onPlanChange(e.target.value as StudentLoanPlan)}
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432] focus:border-[#149777] focus:outline-none"
        >
          {(Object.keys(STUDENT_LOAN_PLANS_2026_2027) as StudentLoanPlan[]).map((k) => {
            const cfg = STUDENT_LOAN_PLANS_2026_2027[k];
            return (
              <option key={k} value={k}>
                {cfg.label}
                {cfg.annualThreshold > 0 ? ` (£${cfg.annualThreshold.toLocaleString('en-GB')}+)` : ''}
              </option>
            );
          })}
        </select>
      </div>

      <label className="flex min-h-[40px] cursor-pointer items-center gap-2.5 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={hasPostgrad}
          onChange={(e) => onPostgradChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-[#149777] focus:ring-[#149777]"
        />
        <span>Include Postgraduate Loan (6% above £21,000)</span>
      </label>
    </div>
  );
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 1000000,
  step = 'any',
  prefix,
  suffix,
  helperText,
  error,
}: {
  id: string;
  label: string;
  value: number | string;
  onChange: (val: string) => void;
  min?: number;
  max?: number;
  step?: string;
  prefix?: string;
  suffix?: string;
  helperText?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#2F3432]">
        {label}
      </label>
      <div className="relative mt-1.5 flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 text-sm font-medium text-slate-500">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={`h-11 w-full rounded-lg border bg-white font-mono text-sm tabular-nums text-[#2F3432] focus:outline-none ${
            prefix ? 'pl-8' : 'pl-3'
          } ${suffix ? 'pr-14' : 'pr-3'} ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-slate-200 focus:border-[#149777]'
          }`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 text-xs text-slate-500">
            {suffix}
          </span>
        )}
      </div>
      {error ? (
        <p role="alert" className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : (
        helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
}

export function KpiGrid({
  items,
}: {
  items: { label: string; value: string; sublabel?: string; highlight?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-xl border p-4 ${
            item.highlight
              ? 'border-[#149777] bg-[#149777] text-white'
              : 'border-slate-200 bg-white text-[#2F3432]'
          }`}
        >
          <p className={`text-xs font-medium ${item.highlight ? 'text-white/85' : 'text-slate-500'}`}>
            {item.label}
          </p>
          <p
            className={`mt-1 font-mono text-xl font-bold tabular-nums sm:text-2xl ${
              item.highlight ? 'text-white' : 'text-[#2F3432]'
            }`}
          >
            {item.value}
          </p>
          {item.sublabel && (
            <p className={`mt-1 text-xs ${item.highlight ? 'text-white/85' : 'text-slate-500'}`}>
              {item.sublabel}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function BreakdownTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string; tone?: 'default' | 'deduction' | 'positive' | 'total' }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr
                key={row.label}
                className={row.tone === 'total' ? 'bg-[#F3F4F6] font-semibold text-[#2F3432]' : ''}
              >
                <td className="px-4 py-3 text-slate-700">{row.label}</td>
                <td
                  className={`px-4 py-3 text-right font-mono tabular-nums whitespace-nowrap ${
                    row.tone === 'deduction'
                      ? 'text-slate-700'
                      : row.tone === 'positive'
                        ? 'font-semibold text-[#149777]'
                        : 'font-semibold text-[#2F3432]'
                  }`}
                >
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function WarningList({ warnings }: { warnings: string[] }) {
  if (!warnings.length) return null;
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900">
      <ul className="space-y-1">
        {warnings.map((w) => (
          <li key={w} className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden="true" />
            <span>{w}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
