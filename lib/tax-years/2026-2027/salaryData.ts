import type {
  AfcBandId,
  AfcBandScale,
  DatasetMetadata,
  HcasZone,
  UkJurisdiction,
  UnsocialHoursRate,
} from '@/types/payroll';

export const SALARY_DATA_METADATA_2026_2027: Record<UkJurisdiction, DatasetMetadata> = {
  england: {
    taxYear: '2026/2027 (1 April 2026 – 31 March 2027)',
    jurisdiction: 'England (NHS Employers AfC)',
    officialSource: 'NHS Employers Agenda for Change Pay Circular 2026/27 (3.3% uplift)',
    sourceUrl: 'https://www.nhsemployers.org/articles/pay-scales-202627',
    effectiveDate: '2026-04-01',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'Standard full-time working week is 37.5 hours (1,950 hours per year / 52.143 weeks).',
      'Basic salary figures exclude High Cost Area Supplements (HCAS), overtime, and unsocial hours enhancements.',
    ],
  },
  wales: {
    taxYear: '2026/2027 (1 April 2026 – 31 March 2027)',
    jurisdiction: 'Wales (NHS Wales)',
    officialSource: 'Welsh Government / NHS Wales 2026/27 AfC Pay Award (3.3% + Real Living Wage floor)',
    sourceUrl: 'https://www.gov.wales/nhs-wales-pay',
    effectiveDate: '2026-04-01',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'Standard full-time working week is 37.5 hours.',
      'Modelled on the accepted 3.3% Welsh Government AfC uplift; lowest pay points reflect Real Living Wage alignment.',
      'Check your local NHS Wales payroll notice for any subsequent structural step adjustments.',
    ],
  },
  scotland: {
    taxYear: '2026/2027 (1 April 2026 – 31 March 2027)',
    jurisdiction: 'Scotland (NHS Scotland STAC)',
    officialSource: 'NHS Scotland Agenda for Change Pay Circular 2026/27 (36-hour week)',
    sourceUrl: 'https://www.publications.scot.nhs.uk/',
    effectiveDate: '2026-04-01',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'Standard full-time working week in NHS Scotland is 36.0 hours from April 2026.',
      'Hourly rates reflect the 36-hour standard working week.',
    ],
  },
  'northern-ireland': {
    taxYear: '2026/2027 (1 April 2026 – 31 March 2027)',
    jurisdiction: 'Northern Ireland (HSCNI)',
    officialSource: 'HSC Northern Ireland / Department of Health NI Pay Parity Reference',
    sourceUrl: 'https://www.health-ni.gov.uk/',
    effectiveDate: '2026-04-01',
    lastVerifiedDate: '2026-04-06',
    assumptions: [
      'HSC Northern Ireland pay scales are modelled on UK PRB parity (3.3% framework); implementation depends on local DoH NI circular release.',
      'Standard full-time working week is 37.5 hours. Use custom salary override if your Trust pays a transitional local figure.',
    ],
  },
};

export const ENGLAND_AFC_SCALES_2026_2027: AfcBandScale[] = [
  {
    bandId: 'band-2',
    bandLabel: 'Band 2',
    typicalRoles: 'Healthcare Assistant, Clinical Support Worker, Domestic Assistant',
    standardWeeklyHours: 37.5,
    points: [{ stepName: 'Single Pay Point', yearsExperience: 'All years', annualSalary: 25272 }],
  },
  {
    bandId: 'band-3',
    bandLabel: 'Band 3',
    typicalRoles: 'Senior Healthcare Assistant, Pharmacy Assistant, Emergency Care Support',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 25760 },
      { stepName: 'Top Point', yearsExperience: '2+ years', annualSalary: 27476 },
    ],
  },
  {
    bandId: 'band-4',
    bandLabel: 'Band 4',
    typicalRoles: 'Nursing Associate, Assistant Practitioner, Medical Secretary',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–3 years', annualSalary: 28392 },
      { stepName: 'Top Point', yearsExperience: '3+ years', annualSalary: 31157 },
    ],
  },
  {
    bandId: 'band-5',
    bandLabel: 'Band 5',
    typicalRoles: 'Registered Nurse, Midwife, Physiotherapist, Radiographer, Paramedic',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 32073 },
      { stepName: 'Intermediate Point', yearsExperience: '2–4 years', annualSalary: 34592 },
      { stepName: 'Top Point', yearsExperience: '4+ years', annualSalary: 39043 },
    ],
  },
  {
    bandId: 'band-6',
    bandLabel: 'Band 6',
    typicalRoles: 'Senior Nurse, Specialist Practitioner, Experienced Midwife, Senior AHP',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 39959 },
      { stepName: 'Intermediate Point', yearsExperience: '2–5 years', annualSalary: 42170 },
      { stepName: 'Top Point', yearsExperience: '5+ years', annualSalary: 48117 },
    ],
  },
  {
    bandId: 'band-7',
    bandLabel: 'Band 7',
    typicalRoles: 'Ward Manager, Advanced Nurse Practitioner, Team Lead, Clinical Specialist',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 49387 },
      { stepName: 'Intermediate Point', yearsExperience: '2–5 years', annualSalary: 51930 },
      { stepName: 'Top Point', yearsExperience: '5+ years', annualSalary: 56515 },
    ],
  },
  {
    bandId: 'band-8a',
    bandLabel: 'Band 8a',
    typicalRoles: 'Matron, Principal Pharmacist, Clinical Service Manager',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 57528 },
      { stepName: 'Intermediate Point', yearsExperience: '2–5 years', annualSalary: 60417 },
      { stepName: 'Top Point', yearsExperience: '5+ years', annualSalary: 64750 },
    ],
  },
  {
    bandId: 'band-8b',
    bandLabel: 'Band 8b',
    typicalRoles: 'Head of Nursing, Lead Clinical Scientist, Senior Operations Manager',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 66582 },
      { stepName: 'Intermediate Point', yearsExperience: '2–5 years', annualSalary: 70896 },
      { stepName: 'Top Point', yearsExperience: '5+ years', annualSalary: 77368 },
    ],
  },
  {
    bandId: 'band-8c',
    bandLabel: 'Band 8c',
    typicalRoles: 'Deputy Director of Nursing, Consultant Allied Health Professional',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 79504 },
      { stepName: 'Intermediate Point', yearsExperience: '2–5 years', annualSalary: 84346 },
      { stepName: 'Top Point', yearsExperience: '5+ years', annualSalary: 91609 },
    ],
  },
  {
    bandId: 'band-8d',
    bandLabel: 'Band 8d',
    typicalRoles: 'Associate Director, Chief Pharmacist, Lead Clinical Director',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 94356 },
      { stepName: 'Intermediate Point', yearsExperience: '2–5 years', annualSalary: 100140 },
      { stepName: 'Top Point', yearsExperience: '5+ years', annualSalary: 108814 },
    ],
  },
  {
    bandId: 'band-9',
    bandLabel: 'Band 9',
    typicalRoles: 'Director of Finance, Chief Nurse (Executive Level), Managing Director',
    standardWeeklyHours: 37.5,
    points: [
      { stepName: 'Entry Point', yearsExperience: '0–2 years', annualSalary: 112782 },
      { stepName: 'Intermediate Point', yearsExperience: '2–5 years', annualSalary: 119578 },
      { stepName: 'Top Point', yearsExperience: '5+ years', annualSalary: 129783 },
    ],
  },
];

export const SCOTLAND_AFC_SCALES_2026_2027: AfcBandScale[] = [
  {
    bandId: 'band-2',
    bandLabel: 'Band 2',
    typicalRoles: 'Healthcare Support Worker, Clinical Support Assistant',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 26696 },
      { stepName: 'Point 2', yearsExperience: 'Top', annualSalary: 28988 },
    ],
  },
  {
    bandId: 'band-3',
    bandLabel: 'Band 3',
    typicalRoles: 'Senior Healthcare Support Worker, Phlebotomist',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 29103 },
      { stepName: 'Point 2', yearsExperience: 'Top', annualSalary: 31409 },
    ],
  },
  {
    bandId: 'band-4',
    bandLabel: 'Band 4',
    typicalRoles: 'Assistant Practitioner, Associate Nurse',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 31537 },
      { stepName: 'Point 2', yearsExperience: 'Top', annualSalary: 34303 },
    ],
  },
  {
    bandId: 'band-5',
    bandLabel: 'Band 5',
    typicalRoles: 'Registered Nurse, Midwife, Allied Health Professional',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 34544 },
      { stepName: 'Point 2', yearsExperience: 'Intermediate', annualSalary: 36911 },
      { stepName: 'Point 3', yearsExperience: 'Top', annualSalary: 43039 },
    ],
  },
  {
    bandId: 'band-6',
    bandLabel: 'Band 6',
    typicalRoles: 'Senior Charge Nurse (Deputy), Specialist Nurse, Senior AHP',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 43231 },
      { stepName: 'Point 2', yearsExperience: 'Intermediate', annualSalary: 45135 },
      { stepName: 'Point 3', yearsExperience: 'Top', annualSalary: 52679 },
    ],
  },
  {
    bandId: 'band-7',
    bandLabel: 'Band 7',
    typicalRoles: 'Senior Charge Nurse, Team Lead, Advanced Nurse Practitioner',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 52845 },
      { stepName: 'Point 2', yearsExperience: 'Intermediate', annualSalary: 54863 },
      { stepName: 'Point 3', yearsExperience: 'Top', annualSalary: 61466 },
    ],
  },
  {
    bandId: 'band-8a',
    bandLabel: 'Band 8a',
    typicalRoles: 'Clinical Nurse Manager, Principal Pharmacist',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 65125 },
      { stepName: 'Point 2', yearsExperience: 'Top', annualSalary: 70303 },
    ],
  },
  {
    bandId: 'band-8b',
    bandLabel: 'Band 8b',
    typicalRoles: 'Head of Service, Lead Clinician',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 76888 },
      { stepName: 'Point 2', yearsExperience: 'Top', annualSalary: 82251 },
    ],
  },
  {
    bandId: 'band-8c',
    bandLabel: 'Band 8c',
    typicalRoles: 'Associate Director, Consultant AHP',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 90808 },
      { stepName: 'Point 2', yearsExperience: 'Top', annualSalary: 97338 },
    ],
  },
  {
    bandId: 'band-8d',
    bandLabel: 'Band 8d',
    typicalRoles: 'Divisional Director, Chief Pharmacist',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 107810 },
      { stepName: 'Point 2', yearsExperience: 'Top', annualSalary: 112426 },
    ],
  },
  {
    bandId: 'band-9',
    bandLabel: 'Band 9',
    typicalRoles: 'Executive Board Director',
    standardWeeklyHours: 36,
    points: [
      { stepName: 'Point 1', yearsExperience: 'Entry', annualSalary: 127521 },
      { stepName: 'Point 2', yearsExperience: 'Top', annualSalary: 133044 },
    ],
  },
];

export const HCAS_RULES_2026_2027: Record<
  HcasZone,
  { label: string; rate: number; min: number; max: number }
> = {
  none: { label: 'Outside London (Standard)', rate: 0, min: 0, max: 0 },
  'inner-london': { label: 'Inner London (20%, £5,794 – £8,746)', rate: 0.2, min: 5794, max: 8746 },
  'outer-london': { label: 'Outer London (15%, £4,870 – £6,137)', rate: 0.15, min: 4870, max: 6137 },
  fringe: { label: 'London Fringe (5%, £1,346 – £2,270)', rate: 0.05, min: 1346, max: 2270 },
};

export const UNSOCIAL_HOURS_RATES_AFC: Record<AfcBandId, UnsocialHoursRate> = {
  'band-2': { nightAndSaturdayEnhancement: 0.41, sundayAndBankHolidayEnhancement: 0.83 },
  'band-3': { nightAndSaturdayEnhancement: 0.35, sundayAndBankHolidayEnhancement: 0.69 },
  'band-4': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
  'band-5': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
  'band-6': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
  'band-7': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
  'band-8a': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
  'band-8b': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
  'band-8c': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
  'band-8d': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
  'band-9': { nightAndSaturdayEnhancement: 0.3, sundayAndBankHolidayEnhancement: 0.6 },
};

export function getAfcScalesForJurisdiction(jurisdiction: UkJurisdiction): AfcBandScale[] {
  if (jurisdiction === 'scotland') {
    return SCOTLAND_AFC_SCALES_2026_2027;
  }
  return ENGLAND_AFC_SCALES_2026_2027;
}

export function getStandardWeeklyHours(jurisdiction: UkJurisdiction): number {
  return jurisdiction === 'scotland' ? 36 : 37.5;
}
