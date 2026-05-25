import { KPICard } from '@/components/ui/KPICard';
import { formatCurrency, formatNumber, formatPercent, formatROAS } from '@/lib/format';
import type { OverviewKPIs } from '@/types/dashboard';
import { ShoppingCart, Euro, MousePointerClick, Users, TrendingUp, BarChart2, Wallet } from 'lucide-react';

interface KPIGridProps {
  current?: OverviewKPIs;
  previous?: OverviewKPIs;
  isLoading: boolean;
}

export function KPIGrid({ current, previous, isLoading }: KPIGridProps) {
  const kpis = [
    {
      title: 'Totale Omzet',
      value: current ? formatCurrency(current.totalRevenue) : '—',
      current: current?.totalRevenue ?? 0,
      previous: previous?.totalRevenue ?? 0,
      icon: Euro,
      accentColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    },
    {
      title: 'Totale Kosten',
      value: current ? formatCurrency(current.totalCost) : '—',
      current: current?.totalCost ?? 0,
      previous: previous?.totalCost ?? 0,
      icon: Wallet,
      invertDelta: true,
      accentColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
    },
    {
      title: 'Transacties',
      value: current ? formatNumber(current.totalTransactions) : '—',
      current: current?.totalTransactions ?? 0,
      previous: previous?.totalTransactions ?? 0,
      icon: ShoppingCart,
      accentColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    },
    {
      title: 'Sessies',
      value: current ? formatNumber(current.sessions) : '—',
      current: current?.sessions ?? 0,
      previous: previous?.sessions ?? 0,
      icon: Users,
      accentColor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
    },
    {
      title: 'ROAS',
      value: current ? formatROAS(current.roas) : '—',
      current: current?.roas ?? 0,
      previous: previous?.roas ?? 0,
      icon: TrendingUp,
      accentColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    },
    {
      title: 'Conversieratio',
      value: current ? formatPercent(current.conversionRate) : '—',
      current: current?.conversionRate ?? 0,
      previous: previous?.conversionRate ?? 0,
      icon: MousePointerClick,
      accentColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
    },
    {
      title: 'Gem. Orderwaarde',
      value: current ? formatCurrency(current.avgOrderValue) : '—',
      current: current?.avgOrderValue ?? 0,
      previous: previous?.avgOrderValue ?? 0,
      icon: BarChart2,
      accentColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} isLoading={isLoading} />
      ))}
    </div>
  );
}
