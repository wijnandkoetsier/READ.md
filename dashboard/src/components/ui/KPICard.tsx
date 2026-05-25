import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MetricDelta } from '@/components/ui/MetricDelta';
import { deltaPercent } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  current: number;
  previous: number;
  icon: LucideIcon;
  invertDelta?: boolean;
  isLoading?: boolean;
  accentColor?: string;
}

export function KPICard({
  title,
  value,
  current,
  previous,
  icon: Icon,
  invertDelta = false,
  isLoading = false,
  accentColor = 'bg-primary/10 text-primary',
}: KPICardProps) {
  const delta = deltaPercent(current, previous);

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardContent className="p-4">
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-7 w-28 mb-2" />
          <Skeleton className="h-3 w-16" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground leading-tight">{title}</p>
          <span className={cn('rounded-lg p-1.5', accentColor)}>
            <Icon className="size-3.5" />
          </span>
        </div>
        <p className="text-2xl font-bold tracking-tight mb-1">{value}</p>
        <MetricDelta value={delta} inverted={invertDelta} />
      </CardContent>
    </Card>
  );
}
