export function formatCurrency(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 10000) {
    return new Intl.NumberFormat('nl-NL', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat('nl-NL').format(Math.round(value));
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatROAS(value: number): string {
  return `${value.toFixed(1)}x`;
}

export function deltaPercent(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
