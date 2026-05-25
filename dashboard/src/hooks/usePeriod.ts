'use client';

import { useState, useEffect } from 'react';
import type { PeriodKey } from '@/types/dashboard';

const STORAGE_KEY = 'dashboard-period';

export function usePeriod() {
  const [period, setPeriodState] = useState<PeriodKey>('this-month');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as PeriodKey | null;
    if (saved) setPeriodState(saved);
    setHydrated(true);
  }, []);

  function setPeriod(p: PeriodKey) {
    setPeriodState(p);
    localStorage.setItem(STORAGE_KEY, p);
  }

  return { period, setPeriod, hydrated };
}
