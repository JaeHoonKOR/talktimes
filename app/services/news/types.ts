/**
 * RSS 피드에서 가져온 원본 뉴스 항목의 인터페이스
 */
export interface RawNewsItem {
  title: string;
  link: string;
  pubDate: string;
  creator?: string;
  content?: string;
  contentSnippet?: string;
  categories?: string[];
  isoDate?: string;
  guid?: string;
  // RSS 피드마다 다른 추가 필드들이 있을 수 있음
  [key: string]: any;
}

/**
 * 클라이언트에게 제공될 정제된 뉴스 항목 인터페이스
 */
export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  imageUrl?: string;
  isRead?: boolean;
  isSaved?: boolean;
}

/**
 * AI가 생성한 뉴스 요약 인터페이스
 */
export interface NewsSummary {
  id: string;
  originalNewsIds: string[];
  category: string;
  title: string;
  summary: string;
  keywords: string[];
  createdAt: string;
}

/**
 * RSS 피드 소스 인터페이스
 */
export interface RssSource {
  id: string;
  name: string;
  url: string;
  category: string;
  language: string;
  isActive: boolean;
}

/**
 * 뉴스 필터링 옵션 인터페이스
 */
export interface NewsFilterOptions {
  categories?: string[];
  sources?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  limit?: number;
} 