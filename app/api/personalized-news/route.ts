import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 맞춤형 뉴스 API 라우트
 * 
 * 데이터 흐름 검증:
 * 1. 클라이언트에서 요청 수신:
 *    - GET: 로그인 상태에 따라 맞춤형 또는 일반 뉴스 반환
 *    - POST: 키워드 기반 뉴스 검색 (요청 body에 keywords 배열 필요)
 * 
 * 2. 백엔드 연결:
 *    - BACKEND_URL 환경변수로 백엔드 서버 주소 설정
 *    - ENABLE_BACKEND 환경변수로 백엔드 연결 활성화 여부 제어
 *    - 백엔드 연결 실패 시 폴백 데이터 사용
 * 
 * 3. 응답 구조:
 *    - success: 요청 성공 여부
 *    - data.news: 뉴스 데이터 배열
 *    - data.keywords: 검색에 사용된 키워드 배열
 *    - data.message: 사용자에게 표시할 메시지
 *    - error: 오류 메시지 (요청 실패 시)
 * 
 * 4. 오류 처리:
 *    - 백엔드 연결 실패 시 폴백 데이터 반환
 *    - 타임아웃 15초로 설정
 */

// 백엔드 연결 활성화
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';
const ENABLE_BACKEND = process.env.ENABLE_BACKEND === 'false' ? 'false' : 'true'; // 환경 변수가 명시적으로 'false'가 아니면 활성화

// 테스트용 기본 뉴스 데이터
const fallbackNews = [
  {
    id: '1',
    title: '삼성전자, 새로운 인공지능 반도체 개발 발표',
    excerpt: '삼성전자가 차세대 인공지능 반도체 개발 계획을 발표했습니다. 이번 기술은 기존 대비 전력 효율이 40% 향상되었으며...',
    category: '기술',
    imageUrl: 'https://via.placeholder.com/800x450?text=Samsung+AI+Chip',
    publishedAt: new Date().toISOString(),
    source: '테크뉴스'
  },
  {
    id: '2',
    title: '한국은행, 기준금리 동결 결정',
    excerpt: '한국은행 금융통화위원회가 기준금리를 현 수준에서 동결하기로 결정했습니다. 이는 글로벌 경제 불확실성과...',
    category: '경제',
    imageUrl: 'https://via.placeholder.com/800x450?text=Bank+of+Korea',
    publishedAt: new Date().toISOString(),
    source: '경제일보'
  },
  {
    id: '3',
    title: '손흥민, 시즌 20호 골 달성',
    excerpt: '토트넘 홋스퍼의 손흥민 선수가 이번 시즌 리그 20호 골을 기록했습니다. 이로써 3시즌 연속 20골 이상을...',
    category: '스포츠',
    imageUrl: 'https://via.placeholder.com/800x450?text=Son+Heung-min',
    publishedAt: new Date().toISOString(),
    source: '스포츠뉴스'
  }
];

// 키워드 기반 필터링을 위한 가상 뉴스 데이터베이스
const allNewsData = [
  ...fallbackNews,
  {
    id: '4',
    title: '애플, 차세대 M3 칩 탑재 맥북 출시',
    excerpt: '애플이 M3 프로세서를 탑재한 새로운 맥북 라인업을 공개했습니다. 전작 대비 성능이 35% 개선되었으며...',
    category: '기술',
    imageUrl: 'https://via.placeholder.com/800x450?text=Apple+M3+MacBook',
    publishedAt: new Date().toISOString(),
    source: '애플인사이더'
  },
  {
    id: '5',
    title: '테슬라, 완전 자율주행 기능 업데이트 발표',
    excerpt: '테슬라가 4분기에 완전 자율주행 기능 업데이트를 실시한다고 발표했습니다. 이번 업데이트는 도심 주행 성능을...',
    category: '기술',
    imageUrl: 'https://via.placeholder.com/800x450?text=Tesla+FSD',
    publishedAt: new Date().toISOString(),
    source: '모빌리티포스트'
  },
  {
    id: '6',
    title: '네이버, 생성형 AI 서비스 출시',
    excerpt: '네이버가 한국어에 최적화된 생성형 AI 서비스를 정식 출시했습니다. 국내 데이터로 훈련된 이 모델은...',
    category: '기술',
    imageUrl: 'https://via.placeholder.com/800x450?text=Naver+AI',
    publishedAt: new Date().toISOString(),
    source: 'IT뉴스'
  },
  {
    id: '7',
    title: '비트코인, 7만 달러 돌파',
    excerpt: '비트코인이 역대 최고가를 갱신하며 7만 달러를 돌파했습니다. 전문가들은 이번 상승세가 기관 투자자들의...',
    category: '경제',
    imageUrl: 'https://via.placeholder.com/800x450?text=Bitcoin',
    publishedAt: new Date().toISOString(),
    source: '크립토데일리'
  },
  {
    id: '8',
    title: '기획재정부, 경기 부양책 발표',
    excerpt: '기획재정부가 50조원 규모의 경기 부양책을 발표했습니다. 이번 대책은 중소기업 지원과 일자리 창출에...',
    category: '경제',
    imageUrl: 'https://via.placeholder.com/800x450?text=Economic+Policy',
    publishedAt: new Date().toISOString(),
    source: '경제뉴스'
  },
];

// 키워드 기반 뉴스 필터링 함수
function filterNewsByKeywords(keywords: string[]) {
  if (!keywords || keywords.length === 0) return allNewsData;
  
  // 키워드가 제목이나 내용에 포함된 뉴스 필터링
  return allNewsData.filter(news => {
    return keywords.some(keyword => 
      news.title.toLowerCase().includes(keyword.toLowerCase()) || 
      news.excerpt.toLowerCase().includes(keyword.toLowerCase())
    );
  });
}

export async function GET(req: NextRequest) {
  try {
    // 사용자 세션 가져오기
    const session = await getServerSession();
    
    // 백엔드 연결 시도
    try {
      // 로그인 여부에 따라 다른 엔드포인트 호출
      const endpoint = session && session.user 
        ? `${BACKEND_URL}/api/news/personalized` 
        : `${BACKEND_URL}/api/news/latest?limit=10`;
      
      // 백엔드 API 호출
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session?.user ? `Bearer ${(session as any).accessToken}` : '',
        },
        // 타임아웃 설정 증가
        signal: AbortSignal.timeout(15000)
      });
      
      if (!response.ok) {
        throw new Error('백엔드 API 응답 오류');
      }
      
      const data = await response.json();
      
      // 로그인하지 않은 경우 일반 뉴스를 맞춤형 뉴스 형식으로 변환
      if (!session || !session.user) {
        const responseObj = NextResponse.json({
          success: true,
          data: {
            news: data.data?.news || [],
            message: "로그인하면 맞춤형 뉴스를 제공해 드립니다."
          }
        });
        
        // 캐시 헤더 추가
        responseObj.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
        return responseObj;
      }
      
      const responseObj = NextResponse.json(data);
      // 인증된 사용자는 짧은 캐시 시간 설정
      responseObj.headers.set('Cache-Control', 'private, max-age=30, stale-while-revalidate=60');
      return responseObj;
    } catch (fetchError) {
      console.error('백엔드 연결 실패:', fetchError);
      
      // 백엔드 연결 실패 시 폴백 데이터 사용
      const responseObj = NextResponse.json({
        success: true,
        data: {
          news: fallbackNews,
          message: session && session.user 
            ? "맞춤형 뉴스 서버에 연결할 수 없습니다. 기본 뉴스를 표시합니다." 
            : "뉴스 서버에 연결할 수 없습니다. 기본 뉴스를 표시합니다."
        }
      });
      
      // 오류 응답에도 캐시 헤더 추가 (짧은 시간)
      responseObj.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
      return responseObj;
    }
  } catch (error) {
    console.error('API 라우트 처리 중 오류 발생:', error);
    
    // 어떤 오류가 발생하더라도 빈 응답 대신 폴백 데이터 반환
    return NextResponse.json({
      success: true,
      data: {
        news: fallbackNews,
        message: "서버 연결에 문제가 있습니다. 기본 뉴스를 표시합니다."
      }
    }, { status: 500 });
  }
}

// POST 메서드로 키워드 기반 뉴스 조회
export async function POST(req: NextRequest) {
  try {
    // 요청 데이터 파싱
    const body = await req.json();
    
    // 입력 검증
    if (!body.keywords || !Array.isArray(body.keywords)) {
      return NextResponse.json({ 
        success: false, 
        error: "유효하지 않은 키워드 형식입니다." 
      }, { status: 400 });
    }
    
    // 키워드 길이 제한
    const keywords = body.keywords
      .filter((kw: any) => typeof kw === 'string' && kw.trim().length > 0)
      .map((kw: string) => kw.trim())
      .slice(0, 10); // 최대 10개로 제한
    
    if (keywords.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: "최소 하나 이상의 유효한 키워드가 필요합니다." 
      }, { status: 400 });
    }
    
    // 사용자 세션 확인
    const session = await getServerSession();
    
    try {
      // 백엔드 연결 시도 - 항상 시도하도록 설정
      if (ENABLE_BACKEND === 'true') {
        const endpoint = `${BACKEND_URL}/api/news/search`;
        
        console.log(`백엔드 API 호출 시도: ${endpoint}`, { 
          keywords,
          backendUrl: BACKEND_URL,
          enableBackend: ENABLE_BACKEND,
          isAuthenticated: !!session?.user
        });
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': session?.user ? `Bearer ${(session as any).accessToken}` : '',
          },
          body: JSON.stringify({ keywords }),
          signal: AbortSignal.timeout(15000)
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('백엔드 응답 성공:', data);
          
          const responseObj = NextResponse.json(data);
          // 검색 결과는 짧은 시간 캐싱
          responseObj.headers.set('Cache-Control', 'private, max-age=60, stale-while-revalidate=120');
          return responseObj;
        } else {
          console.error('백엔드 응답 실패:', await response.text());
          throw new Error('백엔드 API 응답 오류');
        }
      }
      
      // 백엔드 연결 실패 또는 비활성화된 경우 로컬에서 키워드 필터링
      console.log('로컬 필터링 사용');
      const filteredNews = filterNewsByKeywords(keywords);
      
      // 검색 결과가 없는 경우
      if (filteredNews.length === 0) {
        return NextResponse.json({
          success: true,
          data: {
            news: [],
            keywords,
            message: "입력하신 키워드에 맞는 뉴스를 찾을 수 없습니다. 다른 키워드를 시도해보세요."
          }
        });
      }
      
      // 검색 결과 반환
      const responseObj = NextResponse.json({
        success: true,
        data: {
          news: filteredNews,
          keywords,
          message: `${filteredNews.length}개의 관련 뉴스를 찾았습니다.`
        }
      });
      
      // 로컬 검색 결과도 캐싱
      responseObj.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      return responseObj;
      
    } catch (error) {
      console.error('뉴스 검색 중 오류 발생:', error);
      
      // 오류 발생 시 빈 결과 대신 기본 뉴스 반환
      return NextResponse.json({
        success: false,
        data: {
          news: fallbackNews,
          keywords,
          message: "뉴스 검색 중 오류가 발생했습니다. 기본 뉴스를 표시합니다."
        }
      }, { status: 500 });
    }
  } catch (error) {
    console.error('POST 요청 처리 중 오류 발생:', error);
    return NextResponse.json({ 
      success: false, 
      error: "요청 처리 중 오류가 발생했습니다." 
    }, { status: 500 });
  }
} 