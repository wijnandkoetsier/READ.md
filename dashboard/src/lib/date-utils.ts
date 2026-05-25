import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subWeeks,
  subMonths,
  subYears,
  addDays,
} from 'date-fns';
import { nl } from 'date-fns/locale';
import type { PeriodKey, PeriodRanges } from '@/types/dashboard';

export function getPeriodRanges(periodKey: PeriodKey, today: Date = new Date()): PeriodRanges {
  const yesterday = addDays(today, -1);

  switch (periodKey) {
    case 'this-month': {
      const start = startOfMonth(today);
      const end = yesterday;
      const yoyStart = subYears(start, 1);
      const yoyEnd = subYears(end, 1);
      return {
        current: { start: fmt(start), end: fmt(end) },
        previous: { start: fmt(yoyStart), end: fmt(yoyEnd) },
        label: `${fmtShort(start)} – ${fmtShort(end)}`,
        compareLabel: `vs. ${fmtShort(yoyStart)} – ${fmtShort(yoyEnd, true)}`,
      };
    }
    case 'this-week': {
      const start = startOfWeek(today, { weekStartsOn: 1 });
      const end = yesterday;
      const yoyStart = subYears(start, 1);
      const yoyEnd = subYears(end, 1);
      return {
        current: { start: fmt(start), end: fmt(end) },
        previous: { start: fmt(yoyStart), end: fmt(yoyEnd) },
        label: `${fmtShort(start)} – ${fmtShort(end)}`,
        compareLabel: `vs. ${fmtShort(yoyStart)} – ${fmtShort(yoyEnd, true)}`,
      };
    }
    case 'last-week': {
      const start = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
      const end = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
      const yoyStart = subYears(start, 1);
      const yoyEnd = subYears(end, 1);
      return {
        current: { start: fmt(start), end: fmt(end) },
        previous: { start: fmt(yoyStart), end: fmt(yoyEnd) },
        label: `${fmtShort(start)} – ${fmtShort(end)}`,
        compareLabel: `vs. ${fmtShort(yoyStart)} – ${fmtShort(yoyEnd, true)}`,
      };
    }
    case 'last-month': {
      const start = startOfMonth(subMonths(today, 1));
      const end = endOfMonth(subMonths(today, 1));
      const yoyStart = subYears(start, 1);
      const yoyEnd = subYears(end, 1);
      return {
        current: { start: fmt(start), end: fmt(end) },
        previous: { start: fmt(yoyStart), end: fmt(yoyEnd) },
        label: `${fmtShort(start)} – ${fmtShort(end)}`,
        compareLabel: `vs. ${format(yoyStart, 'MMMM yyyy', { locale: nl })}`,
      };
    }
  }
}

function fmt(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

function fmtShort(date: Date, withYear = false): string {
  return format(date, withYear ? 'd MMM yyyy' : 'd MMM', { locale: nl });
}
