import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';
import { authOptions } from "../../auth/[...nextauth]/route";

// 상위 라우트의 키워드 배열 참조 (데이터베이스 대신 메모리 사용)
let keywords = [
  { id: 1, keyword: '인공지능', category: '테크/IT' },
  { id: 2, keyword: '블록체인', category: '테크/IT' },
  { id: 3, keyword: '경제위기', category: '경제/금융' },
];

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);

    // ID로 키워드 찾기
    const keywordIndex = keywords.findIndex(k => k.id === id);

    if (keywordIndex === -1) {
      return NextResponse.json(
        { error: '키워드를 찾을 수 없습니다' }, 
        { status: 404 }
      );
    }

    // 키워드 삭제 (데이터베이스 대신 메모리 사용)
    keywords = keywords.filter(k => k.id !== id);

    return NextResponse.json({ message: '키워드가 삭제되었습니다' });
  } catch (error) {
    console.error('DELETE 에러:', error);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다' }, 
      { status: 500 }
    );
  }
} 