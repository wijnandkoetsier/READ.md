'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, Check } from 'lucide-react';
import { PERIOD_OPTIONS, type PeriodKey } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface PeriodSelectorProps {
  period: PeriodKey;
  label: string;
  compareLabel: string;
  onPeriodChange: (p: PeriodKey) => void;
}

export function PeriodSelector({ period, label, compareLabel, onPeriodChange }: PeriodSelectorProps) {
  const current = PERIOD_OPTIONS.find((o) => o.key === period)!;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button className="h-auto py-1.5 px-3 flex flex-col items-end gap-0 max-w-[200px] rounded-lg border border-border bg-background hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        }
      >
        <span className="flex items-center gap-1 text-xs font-semibold">
          {current.shortLabel}
          <ChevronDown className="size-3 opacity-70" />
        </span>
        <span className="text-[10px] font-normal text-muted-foreground truncate max-w-full">
          {compareLabel}
        </span>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl pb-safe">
        <SheetHeader className="mb-4">
          <SheetTitle>Selecteer periode</SheetTitle>
        </SheetHeader>
        <div className="space-y-1 pb-2">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onPeriodChange(opt.key)}
              className={cn(
                'w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors',
                period === opt.key
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              )}
            >
              <span className="font-medium text-sm">{opt.label}</span>
              {period === opt.key && <Check className="size-4" />}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
