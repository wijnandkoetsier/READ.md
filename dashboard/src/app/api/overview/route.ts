import { NextRequest, NextResponse } from 'next/server';
import { getMockOverview } from '@/lib/mock/data';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const currentStart = searchParams.get('cs');
  const currentEnd = searchParams.get('ce');
  const previousStart = searchParams.get('ps');
  const previousEnd = searchParams.get('pe');

  if (!currentStart || !currentEnd || !previousStart || !previousEnd) {
    return NextResponse.json({ error: 'Missing date parameters' }, { status: 400 });
  }

  const data = getMockOverview(currentStart, currentEnd, previousStart, previousEnd);
  return NextResponse.json(data);
}
