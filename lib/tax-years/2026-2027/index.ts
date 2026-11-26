export * from './incomeTax';
export * from './nationalInsurance';
export * from './pension';
export * from './studentLoan';
export * from './salaryData';
export * from './statutoryPay';

export const ACTIVE_TAX_YEAR = {
  id: '2026-2027' as const,
  label: '2026/2027 Tax Year',
  period: '6 April 2026 – 5 April 2027',
  nhsPayYear: '1 April 2026 – 31 March 2027',
};
