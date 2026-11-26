export type UkJurisdiction = 'england' | 'wales' | 'scotland' | 'northern-ireland';

export type TaxYearId = '2026-2027';

export type StaffGroup = 'afc' | 'medical-dental' | 'custom';

export type AfcBandId =
  | 'band-2'
  | 'band-3'
  | 'band-4'
  | 'band-5'
  | 'band-6'
  | 'band-7'
  | 'band-8a'
  | 'band-8b'
  | 'band-8c'
  | 'band-8d'
  | 'band-9';

export type HcasZone = 'none' | 'inner-london' | 'outer-london' | 'fringe';

export type StudentLoanPlan = 'none' | 'plan-1' | 'plan-2' | 'plan-4' | 'plan-5';

export type PayFrequency = 'annual' | 'monthly' | 'four-weekly' | 'weekly';

export interface DatasetMetadata {
  taxYear: string;
  jurisdiction: string;
  officialSource: string;
  sourceUrl: string;
  effectiveDate: string;
  lastVerifiedDate: string;
  assumptions: string[];
}

export interface TaxBand {
  name: string;
  min: number;
  max: number | null;
  rate: number;
}

export interface PensionTier {
  min: number;
  max: number | null;
  rate: number;
  label: string;
}

export interface AfcPayPoint {
  stepName: string;
  yearsExperience: string;
  annualSalary: number;
}

export interface AfcBandScale {
  bandId: AfcBandId;
  bandLabel: string;
  typicalRoles: string;
  standardWeeklyHours: number;
  points: AfcPayPoint[];
}

export interface UnsocialHoursRate {
  nightAndSaturdayEnhancement: number;
  sundayAndBankHolidayEnhancement: number;
}

export interface TaxBandBreakdownItem {
  bandName: string;
  taxableAmount: number;
  rate: number;
  taxAmount: number;
}

export interface FullPayCalculationResult {
  grossBaseSalary: number;
  proRataSalary: number;
  hcasAllowance: number;
  unsocialHoursPay: number;
  overtimePay: number;
  totalGrossPay: number;
  pensionablePay: number;
  pensionContribution: number;
  pensionRate: number;
  employerPensionContribution: number;
  employerPensionRate: number;
  salarySacrificeAmount: number;
  taxableIncome: number;
  personalAllowance: number;
  incomeTax: number;
  incomeTaxBreakdown: TaxBandBreakdownItem[];
  nationalInsurance: number;
  studentLoanRepayment: number;
  postgraduateLoanRepayment: number;
  totalDeductions: number;
  netPayAnnual: number;
  netPayMonthly: number;
  netPayFourWeekly: number;
  netPayWeekly: number;
  effectiveHourlyRate: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  warnings: string[];
}
