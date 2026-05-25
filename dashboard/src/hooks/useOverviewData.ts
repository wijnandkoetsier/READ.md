'use client';

import { useQuery } from '@tanstack/react-query';
import type { OverviewResponse, BreakdownResponse, PeriodKey } from '@/types/dashboard';
import { getPeriodRanges } from '@/lib/date-utils';

async function fetchOverview(
  cs: string, ce: string, ps: string, pe: string
): Promise<OverviewResponse> {
  const params = new URLSearchParams({ cs, ce, ps, pe });
  const res = await fetch(`/api/overview?${params}`);
  if (!res.ok) throw new Error('Failed to fetch overview');
  return res.json();
}

async function fetchBreakdown(cs: string, ce: string): Promise<BreakdownResponse> {
  const params = new URLSearchParams({ cs, ce });
  const res = await fetch(`/api/breakdown?${params}`);
  if (!res.ok) throw new Error('Failed to fetch breakdown');
  return res.json();
}

export function useOverviewData(period: PeriodKey) {
  const ranges = getPeriodRanges(period);
  const { cs, ce, ps, pe } = {
    cs: ranges.current.start,
    ce: ranges.current.end,
    ps: ranges.previous.start,
    pe: ranges.previous.end,
  };

  const overview = useQuery({
    queryKey: ['overview', cs, ce, ps, pe],
    queryFn: () => fetchOverview(cs, ce, ps, pe),
    staleTime: 2 * 60 * 1000,
  });

  const breakdown = useQuery({
    queryKey: ['breakdown', cs, ce],
    queryFn: () => fetchBreakdown(cs, ce),
    staleTime: 2 * 60 * 1000,
  });

  return { overview, breakdown, ranges };
}
