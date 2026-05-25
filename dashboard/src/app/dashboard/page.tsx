'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { usePeriod } from '@/hooks/usePeriod';
import { useOverviewData } from '@/hooks/useOverviewData';
import { getPeriodRanges } from '@/lib/date-utils';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { KPIGrid } from '@/components/overview/KPIGrid';
import { RevenueChart } from '@/components/overview/RevenueChart';
import { SourceMediumTable } from '@/components/overview/SourceMediumTable';
import { ProductsTable } from '@/components/overview/ProductsTable';

function Dashboard() {
  const { period, setPeriod, hydrated } = usePeriod();
  const ranges = getPeriodRanges(period);
  const { overview, breakdown } = useOverviewData(period);

  if (!hydrated) return null;

  const isLoading = overview.isLoading || breakdown.isLoading;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        period={period}
        label={ranges.label}
        compareLabel={ranges.compareLabel}
        onPeriodChange={setPeriod}
      />
      <main className="px-4 pt-4 pb-8 space-y-4">
        <KPIGrid
          current={overview.data?.current}
          previous={overview.data?.previous}
          isLoading={isLoading}
        />
        <RevenueChart
          data={overview.data?.dailySeries}
          isLoading={isLoading}
        />
        <SourceMediumTable
          data={breakdown.data?.sourceMedium}
          isLoading={isLoading}
        />
        <ProductsTable
          data={breakdown.data?.products}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

const queryClient = new QueryClient();

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
