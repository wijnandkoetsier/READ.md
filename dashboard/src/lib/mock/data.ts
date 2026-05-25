import { eachDayOfInterval, isWeekend, format, parse } from 'date-fns';
import type { OverviewResponse, BreakdownResponse, OverviewKPIs, DailyDataPoint } from '@/types/dashboard';

function seeded(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function dailyRevenue(date: Date): number {
  const s = date.getTime() / 86400000;
  const base = isWeekend(date) ? 2100 : 1550;
  return base + (seeded(s) - 0.5) * 500;
}

function dailySessions(date: Date): number {
  const s = date.getTime() / 86400000;
  const base = isWeekend(date) ? 540 : 410;
  return Math.round(base + (seeded(s + 7) - 0.5) * 90);
}

function dailyCost(date: Date): number {
  const s = date.getTime() / 86400000;
  return 85 + seeded(s + 13) * 50;
}

function aggregatePeriod(
  start: string,
  end: string,
  factor: number
): { kpis: OverviewKPIs; series: DailyDataPoint[] } {
  const days = eachDayOfInterval({
    start: parse(start, 'yyyy-MM-dd', new Date()),
    end: parse(end, 'yyyy-MM-dd', new Date()),
  });

  let rev = 0, tx = 0, sess = 0, cost = 0;
  const series: DailyDataPoint[] = [];

  for (const day of days) {
    const r = dailyRevenue(day) * factor;
    const s = dailySessions(day);
    const c = dailyCost(day) * factor;
    const t = Math.round(s * 0.028 * (0.85 + seeded(day.getTime() / 86400000 + 3) * 0.3));
    rev += r; sess += s; cost += c; tx += t;
    series.push({
      date: format(day, 'yyyy-MM-dd'),
      revenue: Math.round(r),
      prevRevenue: 0,
      cost: Math.round(c),
      transactions: t,
      sessions: s,
    });
  }

  return {
    kpis: {
      totalRevenue: Math.round(rev),
      totalCost: Math.round(cost),
      totalTransactions: tx,
      sessions: sess,
      roas: cost > 0 ? rev / cost : 0,
      conversionRate: sess > 0 ? (tx / sess) * 100 : 0,
      avgOrderValue: tx > 0 ? rev / tx : 0,
    },
    series,
  };
}

export function getMockOverview(
  currentStart: string,
  currentEnd: string,
  previousStart: string,
  previousEnd: string,
): OverviewResponse {
  const curr = aggregatePeriod(currentStart, currentEnd, 1.0);
  const prev = aggregatePeriod(previousStart, previousEnd, 0.83);

  // Merge prevRevenue into series by day index
  const series: DailyDataPoint[] = curr.series.map((d, i) => ({
    ...d,
    prevRevenue: prev.series[i]?.revenue ?? 0,
  }));

  return { current: curr.kpis, previous: prev.kpis, dailySeries: series };
}

const SOURCE_SPLITS = [
  { sourceMedium: 'google / cpc', revShare: 0.37, sessShare: 0.33 },
  { sourceMedium: 'facebook / cpc', revShare: 0.21, sessShare: 0.17 },
  { sourceMedium: 'google / organic', revShare: 0.25, sessShare: 0.30 },
  { sourceMedium: '(direct) / (none)', revShare: 0.10, sessShare: 0.13 },
  { sourceMedium: 'email / newsletter', revShare: 0.07, sessShare: 0.07 },
];

const PRODUCTS = [
  { name: 'Winterjas Premium', revShare: 0.18, avgPrice: 189 },
  { name: 'Kasjmier Trui', revShare: 0.15, avgPrice: 119 },
  { name: 'Chelsea Laarzen', revShare: 0.14, avgPrice: 149 },
  { name: 'Leren Riem Bruin', revShare: 0.12, avgPrice: 49 },
  { name: 'Canvas Rugzak', revShare: 0.12, avgPrice: 99 },
  { name: 'Spijkerbroek Slim Fit', revShare: 0.10, avgPrice: 79 },
  { name: 'Poloshirt Classic', revShare: 0.09, avgPrice: 59 },
  { name: 'Wollen Sjaal', revShare: 0.10, avgPrice: 39 },
];

export function getMockBreakdown(
  currentStart: string,
  currentEnd: string,
): BreakdownResponse {
  const days = eachDayOfInterval({
    start: parse(currentStart, 'yyyy-MM-dd', new Date()),
    end: parse(currentEnd, 'yyyy-MM-dd', new Date()),
  });

  let totalRev = 0, totalTx = 0, totalSess = 0;
  for (const day of days) {
    const s = dailySessions(day);
    const r = dailyRevenue(day);
    const t = Math.round(s * 0.028);
    totalRev += r; totalSess += s; totalTx += t;
  }

  const sourceMedium = SOURCE_SPLITS.map(({ sourceMedium, revShare, sessShare }) => {
    const revenue = Math.round(totalRev * revShare);
    const sessions = Math.round(totalSess * sessShare);
    const transactions = Math.round(totalTx * revShare);
    return {
      sourceMedium,
      revenue,
      transactions,
      sessions,
      conversionRate: sessions > 0 ? (transactions / sessions) * 100 : 0,
    };
  });

  const dayCount = days.length;
  const products = PRODUCTS.map(({ name, revShare, avgPrice }) => {
    const revenue = Math.round(totalRev * revShare);
    const quantity = Math.round((revenue / avgPrice) * (0.9 + seeded(name.length) * 0.2));
    const transactions = Math.round(quantity * 0.82);
    return { name, revenue, quantity, transactions, avgPrice };
  }).sort((a, b) => b.revenue - a.revenue);

  return { sourceMedium, products };
}
