/**
 * 키워드 관련 상수 정의
 * - 여러 컴포넌트에서 재사용되는 카테고리 및 추천 키워드 데이터
 * - 컴포넌트 간 일관성 유지를 위해 중앙 관리
 */

import React from 'react';

// 카테고리 정의 (색상 규칙 적용)
export const CATEGORIES = [
  { 
    name: '테크/IT', 
    icon: 'tech', 
    color: 'bg-[#F59E0B]/20 text-[#F59E0B] font-medium border-[#F59E0B]/30',
    bgColor: '#F59E0B' 
  },
  { 
    name: '경제/금융', 
    icon: 'finance', 
    color: 'bg-[#10B981]/20 text-[#10B981] font-medium border-[#10B981]/30',
    bgColor: '#10B981'
  },
  { 
    name: '정치/사회', 
    icon: 'politics', 
    color: 'bg-[#3B82F6]/20 text-[#3B82F6] font-medium border-[#3B82F6]/30',
    bgColor: '#3B82F6'
  },
  { 
    name: '문화/예술', 
    icon: 'culture', 
    color: 'bg-[#4B5563]/20 text-[#4B5563] font-medium border-[#4B5563]/30',
    bgColor: '#4B5563'
  },
  { 
    name: '과학/의학', 
    icon: 'science', 
    color: 'bg-[#10B981]/20 text-[#10B981] font-medium border-[#10B981]/30',
    bgColor: '#10B981'
  },
  { 
    name: '스포츠', 
    icon: 'sports', 
    color: 'bg-[#EF4444]/20 text-[#EF4444] font-medium border-[#EF4444]/30',
    bgColor: '#EF4444'
  },
  { 
    name: '엔터테인먼트', 
    icon: 'entertainment', 
    color: 'bg-[#8B5CF6]/20 text-[#8B5CF6] font-medium border-[#8B5CF6]/30',
    bgColor: '#8B5CF6'
  },
  { 
    name: '라이프스타일', 
    icon: 'lifestyle', 
    color: 'bg-[#10B981]/20 text-[#10B981] font-medium border-[#10B981]/30',
    bgColor: '#10B981'
  },
  { 
    name: '일반', 
    icon: 'general', 
    color: 'bg-[#6B7280]/20 text-[#6B7280] font-medium border-[#6B7280]/30',
    bgColor: '#6B7280'
  } // 기본 카테고리
];

// SVG 아이콘 맵핑 - 이모지 대신 사용
export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  tech: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  ),
  finance: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  politics: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  culture: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
  science: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  ),
  sports: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      <path d="M2 12h20"></path>
    </svg>
  ),
  entertainment: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  ),
  lifestyle: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
  ),
  general: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  )
};

// 추천 키워드 데이터
export const SUGGESTED_KEYWORDS: Record<string, string[]> = {
  '테크/IT': ['AI', '블록체인', '메타버스', '클라우드', '사이버보안', '스타트업'],
  '경제/금융': ['주식', '부동산', '암호화폐', '금리', '인플레이션', '투자'],
  '정치/사회': ['선거', '정책', '사회이슈', '국제관계', '법률', '복지'],
  '문화/예술': ['전시회', '공연', '영화', '음악', '문학', '디자인'],
  '과학/의학': ['의료기술', '신약', '우주', '환경', '연구', '바이오'],
  '스포츠': ['축구', '야구', '올림픽', '프로스포츠', 'e스포츠', '피트니스'],
  '엔터테인먼트': ['드라마', 'K-POP', '예능', '게임', '웹툰', '유튜브'],
  '라이프스타일': ['건강', '요리', '여행', '패션', '뷰티', '육아'],
  '일반': ['최신뉴스', '헤드라인', '핫이슈', '속보', '데일리', '주간']
}; 