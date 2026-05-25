import type { PeriodKey } from '@/types/dashboard';
import type { OverviewResponse, BreakdownResponse } from '@/types/dashboard';

const MAY_DAYS = Array.from({ length: 24 }, (_, i) => {
  const d = new Date(2026, 4, i + 1);
  return d.toISOString().slice(0, 10);
});

const MAY_YOY_DAYS = Array.from({ length: 24 }, (_, i) => {
  const d = new Date(2025, 4, i + 1);
  return d.toISOString().slice(0, 10);
});

const mayRevenue = [4672, 7075.29, 4357.95, 4420.95, 4068.10, 6172.80, 5520.40, 6028.58, 5787.34, 6967.72, 5556.95, 6012.18, 4196.94, 3521.45, 5353.75, 5315.85, 8800.28, 5361.60, 6844.25, 7296.75, 11229.15, 9751.45, 5909.85, 5448.06];
const mayRevenueYoY = [3233.11, 2632.70, 4804.65, 6298.65, 4593.48, 3424.00, 6926.80, 5246.26, 3722.60, 3889.01, 3092.60, 3437.40, 4261.60, 3463.09, 1553.25, 2484.89, 2366.36, 3426.82, 5987.05, 4040.15, 3396.80, 4706.50, 5373.16, 5530.95];
const mayGadsCost = [391.64, 549.23, 837.84, 846.82, 763.55, 888.49, 650.49, 688.27, 668.11, 843.32, 760.16, 747.56, 726.69, 1168.17, 953.16, 705.53, 1017.10, 896.36, 733.42, 938.15, 1138.61, 1069.14, 730.53, 928.71];

function calcKPIs(revenue: number, cost: number, transactions: number, sessions: number) {
  return {
    totalRevenue: revenue,
    totalCost: cost,
    totalTransactions: transactions,
    sessions,
    roas: cost > 0 ? revenue / cost : 0,
    conversionRate: sessions > 0 ? (transactions / sessions) * 100 : 0,
    avgOrderValue: transactions > 0 ? revenue / transactions : 0,
  };
}

function syntheticDailySeries(
  days: string[],
  totalRevenue: number,
  totalCost: number,
  totalTransactions: number,
  totalSessions: number,
  yoyRevTotals: number[]
): OverviewResponse['dailySeries'] {
  const n = days.length;
  const weights = Array.from({ length: n }, () => 1 + Math.random() * 0.5);
  const wSum = weights.reduce((a, b) => a + b, 0);
  return days.map((date, i) => ({
    date,
    revenue: (weights[i] / wSum) * totalRevenue,
    prevRevenue: yoyRevTotals[i] ?? (weights[i] / wSum) * totalRevenue * 0.8,
    cost: (weights[i] / wSum) * totalCost,
    transactions: Math.round((weights[i] / wSum) * totalTransactions),
    sessions: Math.round((weights[i] / wSum) * totalSessions),
  }));
}

const OVERVIEWS: Record<PeriodKey, OverviewResponse> = {
  'this-month': {
    current: calcKPIs(145669.64, 26064.40, 403, 55217),
    previous: calcKPIs(97891.88, 24196.55, 278, 57536),
    dailySeries: MAY_DAYS.map((date, i) => ({
      date,
      revenue: mayRevenue[i],
      prevRevenue: mayRevenueYoY[i],
      cost: mayGadsCost[i],
      transactions: Math.round(mayRevenue[i] / (145669.64 / 403)),
      sessions: Math.round(mayRevenue[i] / (145669.64 / 55217)),
    })),
  },
  'this-week': {
    current: calcKPIs(46479.51, 7192.57, 120, 12486),
    previous: calcKPIs(29034.61, 5823.44, 81, 13813),
    dailySeries: (() => {
      const days = ['2026-05-19', '2026-05-20', '2026-05-21', '2026-05-22', '2026-05-23', '2026-05-24'];
      const yoyDays = ['2025-05-19', '2025-05-20', '2025-05-21', '2025-05-22', '2025-05-23', '2025-05-24'];
      const idxOffset = 18;
      return days.map((date, i) => ({
        date,
        revenue: mayRevenue[idxOffset + i] ?? 0,
        prevRevenue: mayRevenueYoY[idxOffset + i] ?? 0,
        cost: mayGadsCost[idxOffset + i] ?? 0,
        transactions: Math.round((mayRevenue[idxOffset + i] ?? 0) / (145669.64 / 403)),
        sessions: Math.round((mayRevenue[idxOffset + i] ?? 0) / (145669.64 / 55217)),
      }));
    })(),
  },
  'last-week': {
    current: calcKPIs(38562.05, 8007.59, 108, 17546),
    previous: calcKPIs(20993.41, 7748.04, 66, 16663),
    dailySeries: (() => {
      const days = ['2026-05-12', '2026-05-13', '2026-05-14', '2026-05-15', '2026-05-16', '2026-05-17', '2026-05-18'];
      const idxOffset = 11;
      return days.map((date, i) => ({
        date,
        revenue: mayRevenue[idxOffset + i] ?? 0,
        prevRevenue: mayRevenueYoY[idxOffset + i] ?? 0,
        cost: mayGadsCost[idxOffset + i] ?? 0,
        transactions: Math.round((mayRevenue[idxOffset + i] ?? 0) / (145669.64 / 403)),
        sessions: Math.round((mayRevenue[idxOffset + i] ?? 0) / (145669.64 / 55217)),
      }));
    })(),
  },
  'last-month': {
    current: calcKPIs(157214.42, 36867.94, 505, 63440),
    previous: calcKPIs(131268.19, 29537.95, 383, 75779),
    dailySeries: (() => {
      const n = 30;
      const weights = [0.9, 1.1, 0.95, 1.05, 1.2, 1.15, 0.85, 1.0, 1.1, 0.9, 0.95, 1.05, 1.0, 0.85, 0.9, 1.1, 1.2, 1.15, 0.95, 1.0, 1.05, 0.9, 0.85, 1.1, 1.0, 0.95, 1.15, 1.2, 1.05, 1.0];
      const wSum = weights.reduce((a, b) => a + b, 0);
      return Array.from({ length: n }, (_, i) => {
        const date = `2026-04-${String(i + 1).padStart(2, '0')}`;
        const w = weights[i] / wSum;
        const yoyW = weights[(i + 3) % n] / wSum;
        return {
          date,
          revenue: w * 157214.42,
          prevRevenue: yoyW * 131268.19,
          cost: w * 36867.94,
          transactions: Math.round(w * 505),
          sessions: Math.round(w * 63440),
        };
      });
    })(),
  },
};

const BREAKDOWN: BreakdownResponse = {
  sourceMedium: [
    { sourceMedium: 'google / cpc', revenue: 76560.80, transactions: 224, sessions: 16754, conversionRate: (224 / 16754) * 100 },
    { sourceMedium: 'google / organic', revenue: 19457.75, transactions: 66, sessions: 10274, conversionRate: (66 / 10274) * 100 },
    { sourceMedium: '(direct) / (none)', revenue: 18167.67, transactions: 46, sessions: 7049, conversionRate: (46 / 7049) * 100 },
    { sourceMedium: 'tran / email', revenue: 8252.02, transactions: 3, sessions: 585, conversionRate: (3 / 585) * 100 },
    { sourceMedium: 'com / email', revenue: 4371.39, transactions: 12, sessions: 1413, conversionRate: (12 / 1413) * 100 },
    { sourceMedium: 'chatgpt.com / (not set)', revenue: 3271.75, transactions: 9, sessions: 265, conversionRate: (9 / 265) * 100 },
    { sourceMedium: 'bing / cpc', revenue: 2906.70, transactions: 6, sessions: 255, conversionRate: (6 / 255) * 100 },
    { sourceMedium: 'googlemijnbedrijf / organic', revenue: 2783.75, transactions: 8, sessions: 2936, conversionRate: (8 / 2936) * 100 },
    { sourceMedium: 'bing / organic', revenue: 1759.80, transactions: 5, sessions: 283, conversionRate: (5 / 283) * 100 },
    { sourceMedium: 'meta / ads', revenue: 1716.85, transactions: 5, sessions: 12189, conversionRate: (5 / 12189) * 100 },
  ],
  products: [
    { name: 'Essential by Emma Matras', revenue: 29991.60, quantity: 124, transactions: 98, avgPrice: 29991.60 / 124 },
    { name: 'Box Lowen Vlak met Gestoffeerd Matras', revenue: 14110.00, quantity: 40, transactions: 32, avgPrice: 14110.00 / 40 },
    { name: 'Maxi Easy Pocket 300 en 400 Matras', revenue: 9355.10, quantity: 55, transactions: 44, avgPrice: 9355.10 / 55 },
    { name: 'Maxi Plus Pure 200 en 300 Matras', revenue: 8774.00, quantity: 32, transactions: 26, avgPrice: 8774.00 / 32 },
    { name: 'Box Lowen Pro Vlak met Gestoffeerd Matras', revenue: 8404.80, quantity: 12, transactions: 10, avgPrice: 8404.80 / 12 },
    { name: 'Emma One Second Life Matras', revenue: 4358.00, quantity: 22, transactions: 18, avgPrice: 4358.00 / 22 },
    { name: 'Emma One Matras', revenue: 4018.80, quantity: 12, transactions: 10, avgPrice: 4018.80 / 12 },
    { name: 'Opbergbed Mani met Gestoffeerd Matras', revenue: 3821.60, quantity: 4, transactions: 4, avgPrice: 3821.60 / 4 },
    { name: 'Opbergbed Sunna', revenue: 3625.34, quantity: 5, transactions: 5, avgPrice: 3625.34 / 5 },
    { name: 'Opbergbox Nox met Topmatras', revenue: 2904.45, quantity: 3, transactions: 3, avgPrice: 2904.45 / 3 },
    { name: 'Box Lowen Plus Vlak zonder Matras', revenue: 2672.00, quantity: 8, transactions: 7, avgPrice: 2672.00 / 8 },
    { name: 'Relax Hybrid Plus Matras', revenue: 2552.80, quantity: 9, transactions: 8, avgPrice: 2552.80 / 9 },
  ],
};

export function getBeddenreusOverview(period: PeriodKey): OverviewResponse {
  return OVERVIEWS[period];
}

export function getBeddenreusBreakdown(): BreakdownResponse {
  return BREAKDOWN;
}
