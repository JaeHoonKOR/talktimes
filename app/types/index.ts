/**
 * 애플리케이션 공통 타입 정의
 * 
 * 컴포넌트 간 데이터 흐름 검증을 위한 타입 문서화:
 * - 각 컴포넌트의 props 타입을 명확히 정의하여 프롭스 누락 방지
 * - API 응답 타입을 정의하여 데이터 구조 일관성 유지
 * - 상태 관리 타입을 통해 컴포넌트 간 상태 공유 표준화
 */

// 공통 타입 정의
export interface Keyword {
  id?: number | string;
  keyword: string;
  category: string;
}

export interface Topic {
  title: string;
  icon: ({ className }: { className: string }) => React.ReactNode;
}

/**
 * 뉴스 아이템 타입
 * 주의: 외부 링크가 필요한 경우 url 속성이 아닌 id를 사용하여
 * 내부 라우트(예: /news/${id})로 연결해야 함
 */
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  publishedAt: string;
  source: string;
  matchingKeywords?: string[];
}

export interface NewsResponse {
  success: boolean;
  data: {
    news: NewsItem[];
    keywords?: string[];
    message?: string;
  };
  error?: string;
}

export interface AISummary {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  source: string;
  originalUrl?: string;
}

// 컴포넌트 Props 타입들
export interface TopicSelectorProps {
  topics: Topic[];
  onTopicsSelected: (topics: string[]) => void;
  selectedTopics?: string[];
}

/**
 * KeywordManager 컴포넌트 Props
 * 
 * 데이터 흐름 중요 사항:
 * - onSettingsComplete: 맞춤형 뉴스 요청을 시작하기 위한 필수 콜백
 *   이 콜백이 누락되면 "맞춤형 뉴스 받기 시작하기" 버튼이 작동하지 않음
 */
export interface KeywordManagerProps {
  onKeywordsUpdate?: (keywords: Keyword[]) => void;
  onSettingsComplete?: (keywords: Keyword[]) => void;
  selectedTopics?: string[];
}

export interface NewsletterSignupProps {
  selectedKeywords: Keyword[];
  selectedTopics: string[];
}

// API 응답 타입들
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * 맞춤형 뉴스 상태 타입
 * 
 * 데이터 흐름 주의사항:
 * - news 배열: 뉴스 아이템 목록
 * - keywords 배열: 현재 필터링에 사용된 키워드 목록
 * - isLoading: UI에 로딩 상태 표시 여부 결정
 * - error: 오류 발생 시 메시지 (null이 아닐 때만 표시)
 * - message: 성공/정보 메시지 (null이 아닐 때만 표시)
 */
export interface PersonalizedNewsState {
  news: NewsItem[];
  keywords: string[];
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

// 유틸리티 타입들
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface ComponentWithClassName {
  className?: string;
} 