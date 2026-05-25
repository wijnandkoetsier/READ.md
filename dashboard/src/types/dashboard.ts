export type PeriodKey = 'this-month' | 'this-week' | 'last-week' | 'last-month';

export interface DateRange {
  start: string; // YYYY-MM-DD
  end: string;
}

export interface PeriodRanges {
  current: DateRange;
  previous: DateRange;
  label: string;
  compareLabel: string;
}

export interface OverviewKPIs {
  totalCost: number;
  totalRevenue: number;
  totalTransactions: number;
  sessions: number;
  roas: number;
  conversionRate: number;
  avgOrderValue: number;
}

export interface DailyDataPoint {
  date: string;
  revenue: number;
  prevRevenue: number;
  cost: number;
  transactions: number;
  sessions: number;
}

export interface OverviewResponse {
  current: OverviewKPIs;
  previous: OverviewKPIs;
  dailySeries: DailyDataPoint[];
}

export interface SourceMediumRow {
  sourceMedium: string;
  revenue: number;
  transactions: number;
  sessions: number;
  conversionRate: number;
}

export interface ProductRow {
  name: string;
  revenue: number;
  quantity: number;
  transactions: number;
  avgPrice: number;
}

export interface BreakdownResponse {
  sourceMedium: SourceMediumRow[];
  products: ProductRow[];
}

export const PERIOD_OPTIONS: { key: PeriodKey; label: string; shortLabel: string }[] = [
  { key: 'this-month', label: 'Huidige maand t/m gisteren', shortLabel: 'Deze maand' },
  { key: 'this-week', label: 'Huidige week t/m gisteren', shortLabel: 'Deze week' },
  { key: 'last-week', label: 'Vorige week', shortLabel: 'Vorige week' },
  { key: 'last-month', label: 'Vorige maand', shortLabel: 'Vorige maand' },
];
