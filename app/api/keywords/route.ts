import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from "../auth/[...nextauth]/route";

// 임시 데이터 저장소 (실제 환경에서는 데이터베이스 사용)
let keywords = [
  { id: 1, keyword: '인공지능', category: '테크/IT' },
  { id: 2, keyword: '블록체인', category: '테크/IT' },
  { id: 3, keyword: '경제위기', category: '경제/금융' },
];

export async function GET() {
  // 사용자 세션 확인 (인증)
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
  }

  // 실제 환경에서는 사용자 ID 기반으로 필터링
  return NextResponse.json(keywords);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    // 유효성 검사
    if (!data.keyword || !data.category) {
      return NextResponse.json(
        { error: '키워드와 카테고리가 필요합니다' }, 
        { status: 400 }
      );
    }

    // 새 키워드 생성 (데이터베이스 대신 메모리 사용)
    const newKeyword = {
      id: Date.now(),
      keyword: data.keyword,
      category: data.category
    };

    keywords.push(newKeyword);
    
    return NextResponse.json(newKeyword, { status: 201 });
  } catch (error) {
    console.error('POST 에러:', error);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다' }, 
      { status: 500 }
    );
  }
} 