import { NextResponse } from 'next/server';
import { getAISummaries, getLatestNews } from '../news';

// 정적 생성 설정 (ISR)
export const revalidate = 3600; // 1시간마다 재검증

export async function GET() {
  try {
    const [news, summaries] = await Promise.all([
      getLatestNews(),
      getAISummaries()
    ]);

    return NextResponse.json({ 
      news,
      summaries,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching news data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
} 