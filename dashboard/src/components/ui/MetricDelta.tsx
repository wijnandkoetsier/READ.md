import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricDeltaProps {
  value: number;
  inverted?: boolean;
  className?: string;
}

export function MetricDelta({ value, inverted = false, className }: MetricDeltaProps) {
  const isPositive = inverted ? value < 0 : value > 0;
  const isNeutral = Math.abs(value) < 0.1;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 text-xs font-medium',
        isNeutral ? 'text-muted-foreground' : isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500',
        className
      )}
    >
      {isNeutral ? (
        <Minus className="size-3" />
      ) : isPositive ? (
        <TrendingUp className="size-3" />
      ) : (
        <TrendingDown className="size-3" />
      )}
      {isNeutral ? '—' : `${value > 0 ? '+' : ''}${value.toFixed(1)}%`}
    </span>
  );
}
