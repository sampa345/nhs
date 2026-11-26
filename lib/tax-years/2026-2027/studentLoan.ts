import type { DatasetMetadata, StudentLoanPlan } from '@/types/payroll';

export const STUDENT_LOAN_METADATA_2026_2027: DatasetMetadata = {
  taxYear: '2026/2027 (6 April 2026 – 5 April 2027)',
  jurisdiction: 'United Kingdom (SLC / HMRC PAYE)',
  officialSource: 'GOV.UK Student Loan Repayment Guidance 2026/27',
  sourceUrl: 'https://www.gov.uk/repaying-your-student-loan/what-you-pay',
  effectiveDate: '2026-04-06',
  lastVerifiedDate: '2026-04-06',
  assumptions: [
    'Repayments are calculated on gross earnings subject to Class 1 National Insurance (NHS pension contributions do not reduce student loan repayment income, though salary sacrifice does).',
    'Postgraduate Loan (6% above £21,000) is deducted concurrently alongside any undergraduate plan.',
  ],
};

export interface StudentLoanConfig {
  id: StudentLoanPlan;
  label: string;
  description: string;
  annualThreshold: number;
  monthlyThreshold: number;
  rate: number;
}

export const STUDENT_LOAN_PLANS_2026_2027: Record<StudentLoanPlan, StudentLoanConfig> = {
  none: {
    id: 'none',
    label: 'No Student Loan',
    description: 'No undergraduate loan repayments',
    annualThreshold: 0,
    monthlyThreshold: 0,
    rate: 0,
  },
  'plan-1': {
    id: 'plan-1',
    label: 'Plan 1',
    description: 'England/Wales pre-2012 & Northern Ireland',
    annualThreshold: 26900,
    monthlyThreshold: 2241.67,
    rate: 0.09,
  },
  'plan-2': {
    id: 'plan-2',
    label: 'Plan 2',
    description: 'England/Wales Sept 2012 – July 2023',
    annualThreshold: 29385,
    monthlyThreshold: 2448.75,
    rate: 0.09,
  },
  'plan-4': {
    id: 'plan-4',
    label: 'Plan 4',
    description: 'Scotland (SAAS)',
    annualThreshold: 33795,
    monthlyThreshold: 2816.25,
    rate: 0.09,
  },
  'plan-5': {
    id: 'plan-5',
    label: 'Plan 5',
    description: 'England from August 2023 onwards',
    annualThreshold: 25000,
    monthlyThreshold: 2083.33,
    rate: 0.09,
  },
};

export const POSTGRADUATE_LOAN_2026_2027 = {
  label: 'Postgraduate Loan (Master’s / Doctoral)',
  annualThreshold: 21000,
  monthlyThreshold: 1750,
  rate: 0.06,
} as const;
