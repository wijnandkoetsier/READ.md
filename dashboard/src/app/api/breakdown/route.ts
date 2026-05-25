import { NextRequest, NextResponse } from 'next/server';
import { getBeddenreusBreakdown } from '@/lib/beddenreus/data';

export async function GET(_request: NextRequest) {
  const data = getBeddenreusBreakdown();
  return NextResponse.json(data);
}
