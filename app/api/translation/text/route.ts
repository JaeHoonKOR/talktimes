import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const { text, targetLang } = await req.json();

    if (!text) {
      return NextResponse.json(
        { success: false, message: '번역할 텍스트가 필요합니다.' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/translation/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ text, targetLang }),
    });

    if (!response.ok) {
      throw new Error('번역 서버 오류');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('번역 API 오류:', error);
    return NextResponse.json(
      {
        success: false,
        message: '번역 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 