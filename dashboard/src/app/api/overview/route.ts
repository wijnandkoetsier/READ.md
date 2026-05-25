import { NextRequest, NextResponse } from 'next/server';
import { getBeddenreusOverview } from '@/lib/beddenreus/data';
import type { PeriodKey } from '@/types/dashboard';

const VALID_PERIODS: PeriodKey[] = ['this-month', 'this-week', 'last-week', 'last-month'];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const period = searchParams.get('period') as PeriodKey | null;

  if (!period || !VALID_PERIODS.includes(period)) {
    return NextResponse.json({ error: 'Invalid or missing period parameter' }, { status: 400 });
  }

  const data = getBeddenreusOverview(period);
  return NextResponse.json(data);
}
