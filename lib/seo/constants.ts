export const SITE_CONFIG = {
  name: 'NHS Staff Calculator',
  domain: 'https://NHSStaffCalculator.co.uk',
  email: 'hello@nhsstaffcalculator.co.uk',
  taxYearLabel: '2026/2027',
  disclaimerText:
    'NHS Staff Calculator is an independent informational website and is not affiliated with or endorsed by the NHS. Calculator results are estimates and should not be treated as official payroll, pension, tax, or employment advice.',
} as const;

export function normalizeTrailingSlash(path: string): string {
  if (!path || path === '/') return '/';
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function canonicalUrl(path: string): string {
  const normalized = normalizeTrailingSlash(path);
  return `${SITE_CONFIG.domain}${normalized}`;
}
