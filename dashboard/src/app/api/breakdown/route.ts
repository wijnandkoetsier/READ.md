import { NextRequest, NextResponse } from 'next/server';
import { getMockBreakdown } from '@/lib/mock/data';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const currentStart = searchParams.get('cs');
  const currentEnd = searchParams.get('ce');

  if (!currentStart || !currentEnd) {
    return NextResponse.json({ error: 'Missing date parameters' }, { status: 400 });
  }

  const data = getMockBreakdown(currentStart, currentEnd);
  return NextResponse.json(data);
}
