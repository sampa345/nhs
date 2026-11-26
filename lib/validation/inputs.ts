export function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function validatePositiveNumber(
  raw: string | number,
  fieldLabel: string,
  min = 0,
  max = 1_000_000
): { valid: boolean; value: number; error?: string } {
  const num = typeof raw === 'number' ? raw : Number(raw);
  if (raw === '' || Number.isNaN(num)) {
    return { valid: false, value: min, error: `Please enter a valid number for ${fieldLabel}.` };
  }
  if (num < min) {
    return { valid: false, value: min, error: `${fieldLabel} cannot be less than ${min}.` };
  }
  if (num > max) {
    return { valid: false, value: max, error: `${fieldLabel} cannot exceed ${max.toLocaleString('en-GB')}.` };
  }
  return { valid: true, value: num };
}

export function parseTaxCode(
  codeRaw: string,
  defaultAllowance: number
): {
  personalAllowance: number;
  flatRate?: number;
  isScottishPrefix: boolean;
  isValid: boolean;
  note?: string;
} {
  const cleaned = codeRaw.trim().toUpperCase();
  if (!cleaned) {
    return { personalAllowance: defaultAllowance, isScottishPrefix: false, isValid: true };
  }

  const isScottishPrefix = cleaned.startsWith('S');
  const core = isScottishPrefix || cleaned.startsWith('C') ? cleaned.slice(1) : cleaned;

  if (core === 'BR') {
    return { personalAllowance: 0, flatRate: 0.2, isScottishPrefix, isValid: true, note: 'Basic Rate (20%) on all earnings.' };
  }
  if (core === 'D0') {
    return { personalAllowance: 0, flatRate: 0.4, isScottishPrefix, isValid: true, note: 'Higher Rate (40%) on all earnings.' };
  }
  if (core === 'D1') {
    return { personalAllowance: 0, flatRate: 0.45, isScottishPrefix, isValid: true, note: 'Additional Rate (45%) on all earnings.' };
  }
  if (core === '0T') {
    return { personalAllowance: 0, isScottishPrefix, isValid: true, note: 'Zero Personal Allowance (0T code).' };
  }
  if (core === 'NT') {
    return { personalAllowance: 0, flatRate: 0, isScottishPrefix, isValid: true, note: 'No tax deducted (NT code).' };
  }

  const match = core.match(/^(\d{1,5})[LMNTY]$/);
  if (match) {
    const digits = Number(match[1]);
    return { personalAllowance: digits * 10, isScottishPrefix, isValid: true };
  }

  const kMatch = core.match(/^K(\d{1,5})$/);
  if (kMatch) {
    const digits = Number(kMatch[1]);
    return {
      personalAllowance: -(digits * 10),
      isScottishPrefix,
      isValid: true,
      note: 'K tax code adds untaxed benefits/underpayments to taxable pay.',
    };
  }

  return {
    personalAllowance: defaultAllowance,
    isScottishPrefix,
    isValid: false,
    note: 'Unrecognised tax code format; using standard 1257L allowance (£12,570).',
  };
}
