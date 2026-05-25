import { BarChart3 } from 'lucide-react';
import type { PeriodKey } from '@/types/dashboard';
import { PeriodSelector } from './PeriodSelector';

interface DashboardHeaderProps {
  period: PeriodKey;
  label: string;
  compareLabel: string;
  onPeriodChange: (p: PeriodKey) => void;
}

export function DashboardHeader({ period, label, compareLabel, onPeriodChange }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="rounded-xl bg-primary p-1.5 shrink-0">
            <BarChart3 className="size-4 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-tight">Marketing</p>
            <p className="text-[11px] text-muted-foreground leading-tight truncate">{label}</p>
          </div>
        </div>
        <PeriodSelector
          period={period}
          label={label}
          compareLabel={compareLabel}
          onPeriodChange={onPeriodChange}
        />
      </div>
    </header>
  );
}
