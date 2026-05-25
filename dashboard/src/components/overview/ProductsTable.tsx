import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatNumber } from '@/lib/format';
import type { ProductRow } from '@/types/dashboard';

interface ProductsTableProps {
  data?: ProductRow[];
  isLoading: boolean;
}

export function ProductsTable({ data, isLoading }: ProductsTableProps) {
  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-sm font-semibold">Top Producten</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        {isLoading || !data ? (
          <div className="px-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-4 pb-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              <span>Product</span>
              <span className="text-right">Omzet</span>
              <span className="text-right">Stuks</span>
            </div>
            {data.map((row, idx) => (
              <div
                key={row.name}
                className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-4 py-2.5 items-center border-t border-border/50 first:border-0"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground tabular-nums w-4">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-medium leading-tight line-clamp-1">{row.name}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground pl-6">
                    {formatNumber(row.transactions)} transacties · gem. {formatCurrency(row.avgPrice)}
                  </p>
                </div>
                <span className="text-xs font-semibold tabular-nums text-right">
                  {formatCurrency(row.revenue)}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums text-right">
                  {formatNumber(row.quantity)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
