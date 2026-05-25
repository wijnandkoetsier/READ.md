import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/format';
import type { SourceMediumRow } from '@/types/dashboard';

interface SourceMediumTableProps {
  data?: SourceMediumRow[];
  isLoading: boolean;
}

const SOURCE_COLORS: Record<string, string> = {
  'google / cpc': 'bg-blue-500',
  'facebook / cpc': 'bg-sky-500',
  'google / organic': 'bg-emerald-500',
  '(direct) / (none)': 'bg-slate-400',
  'email / newsletter': 'bg-amber-500',
};

function getColor(source: string): string {
  return SOURCE_COLORS[source] ?? 'bg-violet-500';
}

export function SourceMediumTable({ data, isLoading }: SourceMediumTableProps) {
  const totalRevenue = data?.reduce((s, r) => s + r.revenue, 0) ?? 0;

  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-sm font-semibold">Bron / Medium</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {isLoading || !data ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {data.map((row) => {
              const share = totalRevenue > 0 ? (row.revenue / totalRevenue) * 100 : 0;
              return (
                <div key={row.sourceMedium} className="rounded-xl py-2.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block size-2 rounded-full ${getColor(row.sourceMedium)}`} />
                      <span className="text-xs font-medium">{row.sourceMedium}</span>
                    </div>
                    <span className="text-xs font-semibold">{formatCurrency(row.revenue)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getColor(row.sourceMedium)}`}
                      style={{ width: `${share}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{formatNumber(row.sessions)} sessies</span>
                    <span>{formatNumber(row.transactions)} tx · {formatPercent(row.conversionRate)} conv.</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
