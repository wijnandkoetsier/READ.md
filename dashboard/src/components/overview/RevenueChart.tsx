'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/format';
import { format, parse } from 'date-fns';
import { nl } from 'date-fns/locale';
import type { DailyDataPoint } from '@/types/dashboard';

interface RevenueChartProps {
  data?: DailyDataPoint[];
  isLoading: boolean;
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number; dataKey: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const date = parse(label ?? '', 'yyyy-MM-dd', new Date());
  return (
    <div className="bg-background border border-border rounded-xl p-3 shadow-lg text-xs space-y-1">
      <p className="font-semibold text-foreground">
        {format(date, 'EEEE d MMM', { locale: nl })}
      </p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className={p.dataKey === 'revenue' ? 'text-primary' : 'text-muted-foreground'}>
            {p.dataKey === 'revenue' ? 'Dit jaar' : 'Vorig jaar'}
          </span>
          <span className="font-medium">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function RevenueChart({ data, isLoading }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-sm font-semibold">Omzet per dag</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        {isLoading || !data ? (
          <Skeleton className="h-44 w-full rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height={176}>
            <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => format(parse(v, 'yyyy-MM-dd', new Date()), 'd MMM', { locale: nl })}
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={(v) => formatCurrency(v, true)}
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="prevRevenue"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                fill="none"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#revGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        <div className="flex items-center gap-4 mt-2 px-2">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="inline-block w-5 border-t-2 border-primary" />
            Dit jaar
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="inline-block w-5 border-t-2 border-muted-foreground border-dashed" />
            Vorig jaar
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
