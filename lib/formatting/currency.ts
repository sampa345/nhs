const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const gbpWholeFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatGBP(value: number, showDecimals = true): string {
  if (!Number.isFinite(value)) return '£0.00';
  return showDecimals ? gbpFormatter.format(value) : gbpWholeFormatter.format(value);
}

export function formatPercent(rateDecimal: number, decimals = 1): string {
  if (!Number.isFinite(rateDecimal)) return '0%';
  return `${(rateDecimal * 100).toFixed(decimals)}%`;
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
